import "./style.scss";
import { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

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

interface IProject {
  projectName: string;
  projectDescription: string;
  projectLink: string;
  gitHubRepoLink: string;
  technologiesUsed: Array<string>;
}

const Developer: React.FC = () => {
  const params = useParams();
  let [developer, setDeveloper] = useState<any>();
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

  
  useEffect(() => {
    const fetchDeveloper = async () => {
      let id = params.id;
      let response = await fetch(`http://localhost:8000/developer/${id}`);
      let data = await response.json();
      console.log(data)
      setDeveloper(data);
    };
    fetchDeveloper();
  }, []);

  // let experienceSpace = developer?.experienceLevel.indexOf(' ');
  // let firstWord = experienceSpace.substr(0, experienceSpace);
  // const dynamicStyles = {
  //   ...(matchesSM && { position: 'relative', right: '0vw', width: "100%", color: "red", margin: 1 }),
  //   ...(matchesMD && { backgroundColor: "blue" }),
  // };

  // let [developer, setDeveloper] = useState<ICurrentUser>();
  // let email = localStorage.getItem("email");
  // useGetDeveloperDetailsQuery(email);

  // const reload = () => {
  //   window.location.reload();
  // };

  // const currentUser: any = useSelector(
  //   (state: RootState) =>
  //     state.fetchUserDetails.queries[`getDeveloperDetails("${email}")`]
  //       ?.data as IData["currentUser"]
  // );

  // let currentUserDetails = currentUser?.currentUser as ICurrentUser;
  // if (currentUserDetails !== developer) {
  //   setDeveloper(currentUserDetails);
  // }

  // if (developer?.length === 0) {
  //   reload();
  // }

  // console.log(currentUserDetails);
console.log(developer?.projects)
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
            display: "flex",
          }}
          sx={{ width: { xs: '90%', sm: '90%', lg: '70%', xl: '70%'}, marginLeft: { xs: '5%', sm: '5%', lg: '15%' }}}
        >
          <Avatar
            alt="Profile Image"
            src={developer?.profileImage}
            sx={{ height: {xs: "50px", lg: '70px'}, width: {xs: '50px', lg:'70px'}, position: 'relative', left: { xs: "10px", lg: '30px'}, top: { xs: "10px", lg: '25%'} }}
          />
          <Grid item sx={{ position: 'relative', left: { xs: "30px", lg: '60px'}, top: { xs: "10px", lg: '30px'}, width: {xs: "200px", lg: '200px'}}}>
            <Typography sx={{ fontSize: { xs: '14px', lg: '16px'} }}>
              {developer?.firstName} {developer?.lastName}
            </Typography>
            <Typography sx={{ fontSize: { xs: '14px', lg: '16px'}   }}>
              {developer?.location}
            </Typography>
            <Typography sx={{ color: 'grey', fontSize: { xs: '14px', lg: '16px'}  }}>
              {developer?.experienceLevel}
            </Typography>
          </Grid>
          <Grid item sx={{ position: {xs: 'absolute', lg:'relative'}, left: { xs: "35px", lg: '60px'}, top: { xs: "95px", lg: '30px'}, width: {xs: "380px", lg: '500px'}}}>
            <Typography sx={{ fontSize: { xs: '11px', lg: '16px'} }}>
              {developer?.statement}
            </Typography>
          </Grid>
          <Grid item display="flex" sx={{ position: 'absolute', marginTop: '30px', marginRight: '10px', left: { xs: '75%', md: '85%', lg: '79%' }}}>
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
          className="developer__page-developer-details"
          style={{
            height: "100%",
            marginTop: "20px",
            padding: "30px",
            minHeight: "55vh",
          }}
           sx={{ width: { xs: '90%', sm: '90%', lg: '70%', xl: '70%'}, marginLeft: { xs: '5%', sm: '5%', lg: '15%' }}}
        >
          <Typography sx={{ position: 'relative', left: '50px' }}>Projects</Typography>
          {developer?.projects?.map((project: IProject) => {
            
            return (<>
              
              <ProjectListItem
            projectName={project.projectName}
            projectDescription={project.projectDescription}
            projectLink="blah"
            gitHubRepoLink=""
            technologiesUsed={project.technologiesUsed}
          />
            </>)
          })}
          <ProjectListItem
            projectName="DevPortal"
            projectDescription="Application for developers to showcase their projects and experience and connect with employers."
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
          className="developer__page-developer-details"
          style={{
            height: "100%",
            marginTop: "20px",
            padding: "30px",
            minHeight: "55vh",
          }}
           sx={{ width: { xs: '90%', sm: '90%', lg: '70%', xl: '70%'}, marginLeft: { xs: '5%', sm: '5%', lg: '15%' }}}
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
