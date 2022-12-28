import React from "react";
import "./style.scss";
import { Grid, Typography, Box, createTheme } from "@mui/material";

const ExperienceListItem = () => {
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
    <Grid
      container
      spacing={2}
      sx={{
        margin: "5px",
        height: "170px",
        width: "95%",
        position: "relative",
        left: "1%",
      }}
      className="project-list-item"
    >
      <Box
        component="img"
        sx={{
          height: { xs: "40px", lg: "60px" },
          width: { xs: "40px", lg: "60px" },
          position: "relative",
          left: "20px",
          top: "10px",
        }}
        alt="Project Image Preview"
        src="https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png"
      />
      <Grid item display="flex">
        <Grid
          item
          sx={{
            width: { xs: "60%", lg: "30%" },
            position: "relative",
            bottom: { xs: "80px" },
            left: { xs: "20px", lg: "3px" },
            top: { lg: "-10px" },
          }}
        >
          <Typography marginLeft={5} marginBottom={0}>
            Spotify
          </Typography>
          <Typography
            marginLeft={5}
            color="grey"
            width="200px"
            sx={{ fontSize: { xs: "10px" } }}
          >
            Backend Developer
          </Typography>
          <Typography
            marginLeft={5}
            color="grey"
            width="100%"
            sx={{ fontSize: { xs: "10px" } }}
          >
            Remote
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            width: { xs: "60%", lg: "100%" },
            position: "absolute",
            bottom: { xs: "80%" },
            left: { xs: "100px", lg: "80%" },
          }}
        >
          <Typography
            color="lightgrey"
            sx={{
              fontSize: { xs: "10px" },
              position: "relative",
              left: { xs: "70px" },
              bottom: { xs: "10px" },
            }}
          >
            Jan 2000 - Jun 2020
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        sx={{
          width: { xs: "80%", lg: "70%" },
          position: "absolute",
          bottom: { xs: "10px", lg: "20px" },
          left: { xs: "10px", lg: "50px" },
        }}
      >
        <Typography
          marginLeft={5}
          color="lightgrey"
          width="100%"
          sx={{ fontSize: { xs: "9px", lg: "12px" } }}
        >
          - Updated Spotify backend system and song quality using Java.
        </Typography>
        <Typography
          marginLeft={5}
          color="lightgrey"
          width="100%"
          sx={{ fontSize: { xs: "9px", lg: "12px" } }}
        >
          - Contributed to loads of awesome updates that made me the best ever
          employee in the music industry everrr.
        </Typography>
        <Typography
          marginLeft={5}
          color="lightgrey"
          width="100%"
          sx={{ fontSize: { xs: "9px", lg: "12px" } }}
        >
          - Won Spotify Employee of the Day award every day of employment.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ExperienceListItem;
