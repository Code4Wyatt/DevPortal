import { useState, useEffect } from "react";
import AppBar from "../../components/AppBar/AppBar";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Grid, Typography, Avatar, createTheme } from "@mui/material";
import "./style.scss";

// use params
// fetch profile details
// display in editable text fields in a form
// submit form sends put request to devs id updating fields

// add project component, seperate put needed possibly
const EditProfile = () => {
  const [data, setData] = useState("");
  const [developer, setDeveloper] = useState<any>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const fetchDeveloper = async () => {
      let id = params.currentUserId;
      let response = await fetch(`http://localhost:8000/developer/${id}`);
      let data = await response.json();
      console.log(data.developer);
      setDeveloper(data);
    };
    fetchDeveloper();
  }, []);
  return (
    <>
      <AppBar />
      <Grid container position="relative" className="container">
        <Grid
          item
          className="developer__page-developer-details"
          style={{
            height: "530px",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
          }}
          sx={{
            width: { xs: "90%", sm: "90%", lg: "70%", xl: "70%" },
            marginLeft: { xs: "5%", sm: "5%", lg: "15%" },
          }}
        >
          <form
            onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
            className="form"
            style={{ display: "block" }}
          >
            <input
              {...register("firstName")}
              style={{ width: "20%", marginTop: "10px", marginBottom: "10px" }}
              placeholder="First name"
            />
            <select {...register("category", { required: true })}>
              <option value="">Select...</option>
              <option value="A">Option A</option>
              <option value="B">Option B</option>
            </select>
            <textarea {...register("aboutYou")} placeholder="About you" />
            <p>{data}</p>
            <input type="submit" />
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default EditProfile;
