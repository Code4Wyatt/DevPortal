import React from "react";
import "./style.scss";
import { Typography } from "@mui/material";

const ExperienceListItem = () => {
  return (
    <div className="experience-list-item">
      <div className="company-info">
        <img
          src="https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png"
          alt="company logo"
          className="company-logo"
        />

        <Typography className="company-name">Spotify</Typography>
        <Typography className="company-location">Remote</Typography>

        <Typography className="company-duration">2005 - 2023</Typography>
        <div className="company-responsibilities">
          <Typography className="company-responsibility">
            {" "}
            - Blah blah blah
          </Typography>
          <Typography className="company-responsibility">
            {" "}
            - Blah blah blah
          </Typography>
          <Typography className="company-responsibility">
            {" "}
            - Blah blah blah
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ExperienceListItem;
