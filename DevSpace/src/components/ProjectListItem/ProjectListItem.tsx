import React from "react";
import "./style.scss";
import { Grid, Typography, Button } from "@mui/material";
import Javascript from "../../assets/icons/javascript/javascript-original.svg";
import Java from "../../assets/icons/java/java-original.svg";
import ReactIcon from "../../assets/icons/react/react-original.svg";
import Docker from "../../assets/icons/docker/docker-original.svg";

interface Project {
  projectName: string;
  projectDescription: string;
    projectLink: string;
    gitHubRepoLink: string;
    technologiesUsed: Array<string>;
}

const ProjectListItem = (projectProps: Project) => {
  return (
    <div className="project-list-item">
      <Grid container spacing={2}>
        <Grid item xs={4} justifyContent={"center"}>
          <Typography marginLeft={5} marginBottom={1}>{projectProps.projectName}</Typography>
          <Typography marginLeft={5} color='grey' width="100%">{projectProps.projectDescription}</Typography>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent={"center"}>
          <Button sx={{ position: 'relative', bottom: '25%'}}>View Project</Button>
          <Button sx={{ position: 'relative', bottom: '25%'}}>View GitHub</Button>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent={"center"}>
          <img src={Javascript} className="languageLogo" />
          <img src={Java} className="languageLogo" />
          <img src={ReactIcon} className="languageLogo" />
          <img src={Docker} className="languageLogo" />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectListItem;
