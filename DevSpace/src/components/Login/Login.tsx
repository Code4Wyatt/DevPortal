import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../features/currentUser/userAPI";
import { selectCurrentUser } from "../../features/currentUser/currentUserSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { useEffect } from "react";
import "./style.scss";
import { useGetDeveloperDetailsQuery } from "../../features/currentUser/userAPI";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const onSubmit = handleSubmit(async (data) => {
    if (data) {
      let email = data.email;
      let password = data.password;
      console.log(email, password);
      await loginUser({ email, password });
    }
  });

  const useFetchUserDetails = async () => {
    let email = localStorage.getItem('email');
    useGetDeveloperDetailsQuery(email);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("Successfully signed in!");
      localStorage.setItem('email', loginData.email);
      localStorage.setItem('token', loginData.accessToken);
      navigate("/dashboard");
    }
    if (loginError) {
      toast.error("Login Error, invalid login details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [isLoginSuccess, loginError]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <input
          {...register("email", { required: true })}
          placeholder="Username"
        />
        {errors.email && <span>Username is required</span>}
        <input
          {...register("password", { required: true })}
          placeholder="Password"
        />
        {errors.password && <span>Password is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
