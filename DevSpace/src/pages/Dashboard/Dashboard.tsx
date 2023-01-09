import { useGetDeveloperDetailsQuery } from "../../features/currentUser/userAPI";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import ResponsiveAppBar from "../../components/AppBar/AppBar";
import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./style.scss";
import RepoList from "../../components/RepoList/RepoList";

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

function Dashboard() {
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
  if (currentUserDetails != developer) {
    setDeveloper(currentUserDetails);
  }

  if (developer?.length == 0) {
    reload();
  }

  console.log(currentUserDetails);

  return (
    <>
      <ResponsiveAppBar />

      <Grid container spacing={1} marginLeft={31} marginRight={25} width="80%">
        <Grid
          item
          xs={3}
          style={{
            background: "#46315a32",
            height: "300px",
            marginTop: "20px",
            padding: "30px",
          }}
        >
          {developer ? (
            <Typography> Welcome, {developer?.firstName} </Typography>
          ) : (
            <Typography>Please log in</Typography>
          )}
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
          <Grid container spacing={1} padding={3}>
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
            background: "#2E3B40",
            height: "300px",
            marginTop: "20px",
            padding: "30px",
          }}
        >
          <Typography variant="h5">Companies Hiring Nearby</Typography>
          <Grid
            container
            spacing={1}
            justifyContent="space-evenly"
            style={{ marginTop: "5px" }}
          >
            <Grid item xs={2} style={{ margin: "2px" }}>
              <Card sx={{ maxWidth: 300, maxHeight: 200 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://pbs.twimg.com/media/EyjQfGYU8AEs0xE?format=jpg&name=large"
                    alt="company logo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Microsoft
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={2} style={{ margin: "2px" }}>
              <Card sx={{ maxWidth: 300, maxHeight: 200 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="data:image/png;base64,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"
                    alt="company logo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Capgemini
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={2} style={{ margin: "2px" }}>
              <Card sx={{ maxWidth: 300, maxHeight: 200 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyPWWSnn4AuomXejounLfbztxlmwggAsCMTSYJSNP6lK6y_5tF1oEiiE3rLtqXT2J0ArE&usqp=CAU"
                    alt="company logo"
                    style={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      3 Sided Cube
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={2} style={{ margin: "2px" }}>
              <Card sx={{ maxWidth: 300, maxHeight: 200 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://media-exp1.licdn.com/dms/image/C560BAQFhfxNj8OUHuw/company-logo_200_200/0/1652822994884?e=1678924800&v=beta&t=jFf5__RgiTibft1yrLakWZnBn0dOBBnzCF8Uff6hQuI"
                    alt="company logo"
                    style={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      Areti
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={2} style={{ margin: "2px" }}>
              <Card sx={{ maxWidth: 300, maxHeight: 200 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://media-exp1.licdn.com/dms/image/C4E0BAQFGBHEonlW2IA/company-logo_200_200/0/1658219500289?e=1678924800&v=beta&t=yWCOVrvJ8VZKKdf7Gtkl45_w-OKkFKnRrzETNKom2AU"
                    alt="company logo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      initi8
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <h3></h3>
        </Grid>
        <Grid item xs={6}>
          <h3></h3>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
