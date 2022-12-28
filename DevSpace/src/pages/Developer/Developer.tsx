import "./style.scss";
import { useState } from "react";
import { useGetDeveloperDetailsQuery } from "../../features/currentUser/userAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Grid, Typography, Avatar, createTheme } from "@mui/material";
import ProjectsList from "../../components/ProjectsList/ProjectsList";
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem";
import ResponsiveAppBar from "../../components/AppBar/AppBar";
import LinkedInLogo from "../../assets/icons/linkedin.png";
import GitHubLogo from "../../assets/icons/github.png";
import ExperienceListItem from "../../components/ExperienceListItem/ExperienceListItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.only("md"));

  const dynamicStyles = {
    ...(matchesSM && { position: 'relative', right: '0vw', width: "100%", margin: 1 }),
    ...(matchesMD && { backgroundColor: "blue" }),
  };

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
      <ResponsiveAppBar />
      <Grid container position="relative" className="container">
        <Grid
          item
         
          className="developer__page-developer-details"
          style={{
            height: "130px",
            marginTop: "20px",
            padding: "30px",
            display: "flex",
          }}
          sx={{ ...dynamicStyles }}
        >
          <Avatar
            alt="Profile Image"
            src={developer?.profileImage}
            sx={{ height: "70px", width: "70px" }}
          />
          <Grid item xs={15}>
            <Typography sx={{ marginLeft: { xs: "12%", md: "50%" }, width: { xs: "100%"}, fontSize: '12px' }}>
              {developer?.firstName} {developer?.lastName}
            </Typography>
            <Typography sx={{ marginLeft: { xs: "12%", md: "40%" }, width: { xs: "100%"}, fontSize: '12px' }}>
              {developer?.location}
            </Typography>
            <Typography sx={{ marginLeft: { xs: "12%", md: "50%" }, width: { xs: "100%"}, fontSize: '12px' }}>
              Experience: Junior
            </Typography>
          </Grid>
          <Grid item xs={4} display="flex" sx={{ position: { xs: "absolute"}, right: { xs: "5px", md: ""}}}>
            <a href="http://www.github.com">
              <img src={LinkedInLogo} height="20px" className="socialLogo" />
            </a>
            <a href="">
              <img src={GitHubLogo} height="20px" className="socialLogo" />
            </a>
          </Grid>
        </Grid>
        <Grid
          item
          xs={8}
          className="developer__page-developer-details"
          style={{
            height: "100%",
            marginTop: "20px",
            padding: "30px",
            minHeight: "55vh",
          }}
        >
          <Typography>Projects</Typography>
          <ProjectListItem
            projectName="Unison"
            projectDescription="Social Network for musicians aimed at developing new musical connections and inspiring new music."
            projectLink="blah"
            gitHubRepoLink=""
            technologiesUsed={["Java"]}
          />
          <ProjectListItem
            projectName="DevPortal"
            projectDescription="Application for developers to showcase their projects and experience and connect with employers."
            projectLink="blah"
            gitHubRepoLink=""
            technologiesUsed={["Java"]}
          />
          <ProjectListItem
            projectName="WeChat"
            projectDescription="Chat application with added functionality to send payments."
            projectLink="blah"
            gitHubRepoLink=""
            technologiesUsed={["Java"]}
          />
          <ProjectListItem
            projectName="ADHDone"
            projectDescription="Mobile and web application for managing ADHD symptoms and improving lifestyle."
            projectLink="blah"
            gitHubRepoLink=""
            technologiesUsed={["Java"]}
          />
        </Grid>
        <Grid
          item
          xs={8}
          className="developer__page-developer-details"
          style={{
            height: "100%",
            marginTop: "20px",
            padding: "30px",
            minHeight: "55vh",
          }}
        >
          <Typography>Experience</Typography>
          <ExperienceListItem />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </>
  );
};

export default Developer;
