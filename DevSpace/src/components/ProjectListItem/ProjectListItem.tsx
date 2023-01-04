import React from "react";
import "./style.scss";
import { Grid, Typography, Button, Box, createTheme } from "@mui/material";
import Javascript from "../../assets/icons/javascript/javascript-original.svg";
import Java from "../../assets/icons/java/java-original.svg";
import ReactIcon from "../../assets/icons/React.svg";
import Docker from "../../assets/icons/docker/docker-original.svg";

interface Project {
  projectName: string;
  projectDescription: string;
  projectLink: string;
  gitHubRepoLink: string;
  technologiesUsed: Array<string>;
}

const ProjectListItem = (projectProps: Project) => {
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

  return (
      <Grid container spacing={2} sx={{ margin: '5px', height: '170px', width: '95%', position: 'relative', left: '1%'}} className='project-list-item'>
        <Box
          component="img"
          sx={{
            height: {xs: '80px', lg: '150px'},
            width: {xs: '80px' ,lg: '200px'},
            position: 'relative',
            left: '20px',
            top: '10px'            
          }}
          alt="Project Image Preview"
          src="https://cdn.dribbble.com/users/808342/screenshots/14930079/media/56de2ce055bbdbf7ec8a0515c6489448.jpg?compress=1&resize=400x300"
        />
        <Grid item  sx={{ width: {xs: '60%', lg: '30%'}, position: 'relative', bottom: {xs: '10px'}, right: {xs: '10px'}}}>
          <Typography marginLeft={5} marginBottom={1}>
            {projectProps.projectName}
          </Typography>
          <Typography marginLeft={5} color="grey" width="100%" sx={{ fontSize: {xs: '10px'}}}>
            {projectProps.projectDescription}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{display: {lg: 'flex'}, position: 'relative', top: {xs: '-40px', lg: '20px'}, bottom: {lg: '200px'}, left: '5%'}}>
          <Button sx={{ backgroundColor: 'purple', color: 'white', height: '10px', fontSize: {xs: '10px'}, position: {xs: 'absolute', lg: 'relative'}, bottom: {xs: '-5px', lg: '20px'}, left: {xs: '10px', lg: '110%'} }}>
            View Demo
          </Button>
          <Button sx={{ backgroundColor: 'blue', color: 'white', height: '10px', fontSize: {xs: '10px'}, position: {xs: 'absolute',lg: 'relative'}, bottom: {xs: '-30px', lg: '0px'}, left: {xs: '10px', lg: '90%'} }}>
           GitHub
          </Button>
        </Grid>
        <Grid item display="flex" sx={{ zIndex: 1, position: 'absolute', bottom: {xs: '10px', lg: '30px'}, left: {xs: '50%', lg: '85%'}}}>
          <img src={Javascript} className="languageLogo" />
          <img src={Java} className="languageLogo" />
          <img src={ReactIcon} className="languageLogo" />
          <img src={Docker} className="languageLogo" />
        </Grid>
      </Grid>
  );
};

export default ProjectListItem;
