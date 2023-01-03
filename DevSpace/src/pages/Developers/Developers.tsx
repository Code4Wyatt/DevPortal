import "./style.scss";
import { useEffect, useState } from "react";
import AppBar from "../../components/AppBar/AppBar";
import DevCard from "../../components/DevCard/DevCard";
import {
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Typography,
  Avatar,
  createTheme,
  withStyles,
} from "@mui/material";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { GridList, GridListTile } from "@material-ui/core";

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

const languages = [
  "Java",
  "C",
  "C++",
  "C#",
  "Python",
  "JavaScript",
  "PHP",
  "Ruby",
  "Swift",
  "Go",
  "Kotlin",
  "Scala",
  "Rust",
  "Objective-C",
  "Perl",
  "TypeScript",
  "R",
  "Matlab",
  "Lisp",
  "Haskell",
  "Erlang",
  "Elixir",
  "Dart",
];

const experienceLevels = [
  "Graduate (0 years)",
  "Junior (1 - 3 years)",
  "Mid (3 - 5 years)",
  "Senior (5 years +)",
];

interface ICoordinates {
  lat: number;
  lng: number;
}

const Developers: React.FC = () => {
  const [allDevelopers, setAllDevelopers] = useState<any[]>();
  const [developerSearchResults, setDeveloperSearchResults] = useState<any[]>();
  const [searchText, setSearchText] = useState("");
  const [matchingLocations, setMatchingLocations] = useState<any[]>([]);
  const [address, setAddress] = useState<string>("");
  const [coordinates, setCoordinates] = useState<ICoordinates>();
  const [location, setLocation] = useState<any>("Please select location");
  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  console.log(location);

  useEffect(() => {
    const fetchAllDevelopers = async () => {
      let response = await fetch(`http://localhost:8000/developer/all`);
      let data = await response.json();
      setAllDevelopers(data.developers);
    };
    fetchAllDevelopers();
  }, []);

  console.log(address);
  useEffect(() => {
    const searchDevelopers = async (address: string) => {
      let location = address;
      let response = await fetch(`http://localhost:8000/developer/search?location=${location}`);
      let data = await response.json();
      setDeveloperSearchResults(data);
      console.log(developerSearchResults);
    }
    searchDevelopers(address);
     }, [address]);

  return (
    <>
      <AppBar />
      <Grid container position="relative" className="container">
        <Grid
          item
          className="developer__page-developer-details"
          style={{
            height: "100px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-around",
          }}
          sx={{
            width: { xs: "90%", sm: "90%", lg: "70%", xl: "70%" },
            marginLeft: { xs: "5%", sm: "5%", lg: "15%" },
          }}
        >
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <TextField
                  {...getInputProps({
                    placeholder: `${location?.description}`,
                  })}
                  sx={{ position: "relative", top: "20%" }}
                />

                <Grid item sx={{ position: "relative", top: "50px", zIndex: '5' }}>
                  {loading ? <div>...loading</div> : null}

                  {suggestions &&
                    suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? "#41b6e6"
                          : "#081229",
                        cursor: "pointer",
                        zIndex: 10
                      };

                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { style })}
                          onClick={() => setLocation(suggestion)}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                </Grid>
              </div>
            )}
          </PlacesAutocomplete>
          <TextField
            id="outlined-basic"
            label="Search Locations"
            variant="outlined"
            sx={{
              position: "relative",
              top: "20%",
              borderColor: "white",
              color: "white",
              display: "none",
            }}
            value={searchText}
          />
          <List>
            {matchingLocations.map((location) => (
              <ListItem key={location.id}>
                <ListItemText primary={location.name} />
              </ListItem>
            ))}
          </List>
          <Grid item>
            <TextField
              id="outlined-select-language"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Select programming language"
              sx={{
                position: "relative",
                top: "20%",
                borderColor: "white",
                color: "white",
              }}
            >
              {languages.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <List>
              {/* {matchingLocations.map((location) => (
          <ListItem key={location.id}>
            <ListItemText primary={location.name} />
          </ListItem>
        ))} */}
            </List>
          </Grid>

          <Grid item>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Select experience level"
              sx={{
                position: "relative",
                top: "20%",
                borderColor: "white",
                color: "white",
              }}
            >
              {experienceLevels.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <List>
              {/* {matchingLocations.map((location) => (
          <ListItem key={location.id}>
            <ListItemText primary={location.name} />
          </ListItem>
        ))} */}
            </List>
          </Grid>
        </Grid>

        <Grid
          item
          className="developer__page-developer-details"
          style={{
            height: "100%",
            marginTop: "20px",
            display: "flex",
          }}
          sx={{
            width: { xs: "90%", sm: "90%", lg: "70%", xl: "70%" },
            marginLeft: { xs: "5%", sm: "5%", lg: "15%" },
          }}
        >
      
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ position: 'relative', left: '5%'}}
          >
            {allDevelopers?.map((developer, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <DevCard
                  firstName={developer.firstName}
                  lastName={developer.lastName}
                  email={developer.email}
                  statement={developer.statement}
                  location={developer.location}
                  profileImage={developer.profileImage}
                  languages={developer.languages}
                  projects={developer.projects}
                  linkedIn={developer.linkedIn}
                  gitHub={developer.gitHub}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Developers;
