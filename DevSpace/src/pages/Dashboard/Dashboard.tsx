import { useGetDeveloperDetailsQuery } from "../../features/currentUser/userAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ResponsiveAppBar from "../../components/AppBar/AppBar";
import { Grid } from "@mui/material";

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
}

interface IData {
  currentUser: Object;
}

function Dashboard() {
  let email = localStorage.getItem("email");
  useGetDeveloperDetailsQuery(email);

  const currentUser: any = useSelector(
    (state: RootState) =>
      state.fetchUserDetails.queries[`getDeveloperDetails(\"${email}\")`]
        ?.data as IData["currentUser"]
  );

  let currentUserDetails = currentUser?.currentUser as ICurrentUser;

  console.log(currentUserDetails);

  return (
    <>
      <ResponsiveAppBar />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>DevSpace</h1>
        </Grid>
        <Grid item xs={2}>
          <h1>DevSpace</h1>
        </Grid>
        <Grid item xs={2}>
          <h1>DevSpace</h1>
        </Grid>
        <Grid item xs={2}>
          <h1>DevSpace</h1>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
