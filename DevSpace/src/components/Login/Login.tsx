import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../features/currentUser/userAPI";
import { selectCurrentUser } from "../../features/currentUser/currentUserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useGetDeveloperDetailsQuery } from "../../features/currentUser/userAPI";
import { Grid, Typography, Button } from "@mui/material";
import AppBar from "../AppBar/AppBar";
import "./style.scss";

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [loginType, setLoginType] = useState("");
  const [email, setEmail] = useState("");

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
      setEmail(email);
      await loginUser({ email, password })
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("Successfully signed in!");
      localStorage.setItem("email", loginData.email);
      localStorage.setItem("token", loginData.accessToken);
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
    <>
      {" "}
      <AppBar />
      <Grid item sx={{ position: "relative", left: "0%" }}>
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

        <form onSubmit={onSubmit} style={{ display: "block" }}>
          <Typography
            variant="h2"
            sx={{
              position: "relative",
              left: "5%",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          >
            Login
          </Typography>
          <Grid item display="flex" sx={{ position: "relative", left: "5%" }}>
            <Button onClick={() => setLoginType("developer")}>Developer</Button>
            <Button onClick={() => setLoginType("employer")}>Employer</Button>
          </Grid>
          <input
            style={{ width: "20%", marginTop: "10px", marginBottom: "10px" }}
            {...register("email", { required: true })}
            placeholder="Username"
          />
          <br />
          {errors.email && <span>Username is required</span>}
          <input
            style={{ width: "20%", marginTop: "10px", marginBottom: "30px" }}
            {...register("password", { required: true })}
            placeholder="Password"
          />
          {errors.password && <span>Password is required</span>}
          <br />
          <input
            type="submit"
            style={{
              width: "20%",
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "5px",
              color: "green",
            }}
          />
        </form>
      </Grid>
    </>
  );
};

export default Login;
