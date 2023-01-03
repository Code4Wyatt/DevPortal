import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface IDeveloper {
  firstName: string;
  lastName: string;
  email: string;
  statement: string;
  location: string;
  profileImage: string;
  languages: [];
  projects: [];
  linkedIn: string;
  gitHub: string;
}

const DevCard: React.FunctionComponent<IDeveloper> = (props: IDeveloper) => {
  return (
    <Card
      sx={{
        padding: 2,
        border: "1px solid blue",
        background: "#141859",
        height: "100px",
        width: "250px",
        color: "white",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item display="flex">
            <Avatar
              alt="Remy Sharp"
              src={props.profileImage}
              sx={{ marginRight: "10px" }}
            />
            <Typography>
              {props.firstName} {props.lastName}
            </Typography>
          </Grid>
          <Grid item display="column">
            <Typography>
              {props.location}
            </Typography>
            <Typography>
              {props.firstName}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DevCard;
