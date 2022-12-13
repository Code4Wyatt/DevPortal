import { useGetDeveloperDetailsQuery } from "../../features/currentUser/userAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ResponsiveAppBar from "../../components/AppBar/AppBar";
import { Container, Grid, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./style.scss";

interface ICurrentUser {
  currentUser: Object;
  companiesFollowing: [];
  createdAt: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  gitHub: string;
  languages: [];
  lastName: string;
  linkedIn: string;
  location: string;
  messages: [];
  profileImage: string;
  projects: [];
  refreshToken: string;
  statement: string;
  updatedAt: string;
  _id: string;
}

interface IData {
  currentUser: Object;
}

function Dashboard() {
  let email = localStorage.getItem("email");
  useGetDeveloperDetailsQuery(email);

  const currentUser: any = useSelector(
    (state: RootState) =>
      state.fetchUserDetails.queries[`getDeveloperDetails(\"${email}\")`]
        ?.data as IData["currentUser"]
  );

  let currentUserDetails = currentUser?.currentUser as ICurrentUser;

  console.log(currentUserDetails);

  return (
    <>
      <ResponsiveAppBar />

      <Grid container spacing={1} marginLeft={25} marginRight={25} width="85%">
        <Grid
          item
          xs={3}
          style={{
            background: "#2E3B55",
            height: "300px",
            marginTop: "20px",
            padding: "30px",
          }}
        >
          <Typography>Welcome, {currentUserDetails?.firstName}</Typography>
          <Typography>
            You have {currentUserDetails?.messages.length} messages
          </Typography>
          <hr style={{ width: "50%", position: "relative", right: "60px" }} />
          {/* <Typography
            variant="h1"
            component="h2"
            className="home__banner-text animate2"
          >
            Discover developers.
          </Typography>
          <Typography
            variant="h1"
            component="h2"
            className="home__banner-subtitle animate"
          >
            Engage with employers.
          </Typography> */}
        </Grid>
        <Grid
          item
          xs={7.8}
          style={{
            background: "#2E3B55",
            height: "300px",
            marginTop: "20px",
            marginLeft: "50px",
            padding: "30px",
          }}
        >
          <Typography variant="h6">Relevant Roles</Typography>
          <Grid container spacing={1} padding={3} >
            <Grid item xs={3} style={{ background: "grey", margin: "5px" }}>
              <h5>React Developer</h5>
            </Grid>
            <Grid item xs={3} style={{ background: "grey", margin: "5px" }}>
              <h5>Front End Developer</h5>
            </Grid>
            <Grid item xs={3} style={{ background: "grey", margin: "5px" }}>
              <h5>Junior React Native Developer</h5>
            </Grid>
            <Grid item xs={3} style={{ background: "grey", margin: "5px" }}>
              <h5>Junior TypeScript Developer</h5>
            </Grid>
            <Grid item xs={3} style={{ background: "grey", margin: "5px" }}>
              <h5>Junior Front End Developer</h5>
            </Grid>
            <Grid item xs={3} style={{ background: "grey", margin: "5px" }}>
              <h5>Android Developer</h5>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={11.16}
          style={{
            background: "#2E3B55",
            height: "300px",
            marginTop: "20px",
            padding: "30px",
          }}
        >
          <Typography variant="h5">Companies Hiring Nearby</Typography>
        </Grid>
        <Grid item xs={12}>
          <h1>DevSpace</h1>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
