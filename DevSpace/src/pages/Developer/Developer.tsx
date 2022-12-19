import "./style.scss";
import AppBar from "../../components/AppBar/AppBar";
import { useState } from "react";
import { useGetDeveloperDetailsQuery } from "../../features/currentUser/userAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Grid, Typography, Avatar } from "@mui/material";
import ProjectsList from "../../components/ProjectsList/ProjectsList";

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
  length: number;
}

interface IData {
  currentUser: Object;
}

const Developer: React.FC = () => {
  let [developer, setDeveloper] = useState<ICurrentUser>();
  let email = localStorage.getItem("email");
  useGetDeveloperDetailsQuery(email);

  const reload = () => {
    window.location.reload();
  };

  const currentUser: any = useSelector(
    (state: RootState) =>
      state.fetchUserDetails.queries[`getDeveloperDetails("${email}")`]
        ?.data as IData["currentUser"]
  );

  let currentUserDetails = currentUser?.currentUser as ICurrentUser;
  if (currentUserDetails !== developer) {
    setDeveloper(currentUserDetails);
  }

  if (developer?.length === 0) {
    reload();
  }

  console.log(currentUserDetails);
  return (
    <>
      <AppBar />
      <Grid container spacing={1} marginLeft={51} marginRight={51} width="80%">
        <Grid
          item
          xs={8}
          className="developer__page-developer-details"
          style={{
            height: "130px",
            marginTop: "20px",
            padding: "30px",
            display: "flex",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={developer?.profileImage}
            sx={{ height: "70px", width: "70px" }}
          />
          <Grid item xs={4}>
            <Typography sx={{ marginLeft: "30px" }}>
              {developer?.firstName} {developer?.lastName}
            </Typography>
            <Typography sx={{ marginLeft: "30px" }}>
              {developer?.location}
            </Typography>
            <Typography sx={{ marginLeft: "30px" }}>
              Experience Level: Junior
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={8}
          className="developer__page-developer-details"
          style={{
            height: "130px",
            marginTop: "20px",
              padding: "30px",
            minHeight: '55vh'
          }}
        >
          <Typography>Projects</Typography>
                  <ProjectsList />
        </Grid>
        <Grid
          item
          xs={8}
          className="developer__page-developer-details"
          style={{
            height: "130px",
            marginTop: "20px",
              padding: "30px",
            minHeight: '55vh'
          }}
        >
          <Typography>Experience</Typography>
                  Yer Maw
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </>
  );
};

export default Developer;
