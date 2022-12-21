import React from "react";
import "./style.scss";
import { Grid, Typography, Avatar } from "@mui/material";
import Javascript from "../../assets/icons/javascript/javascript-original.svg";
import Java from "../../assets/icons/java/java-original.svg";
import ReactIcon from "../../assets/icons/react/react-original.svg";
import Docker from "../../assets/icons/docker/docker-original.svg";

const ProjectListItem = () => {
  return (
    <div className="project-list-item">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography marginLeft={5}>Unison</Typography>
        </Grid>
        <Grid item xs={4} display="flex">
          <Typography marginRight={3}>View Project</Typography>
          <Typography>View GitHub</Typography>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent={"flex-end"}>
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
