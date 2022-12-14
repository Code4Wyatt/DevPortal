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
  experienceLevel: string;
}

const languages = [
  "Java",
  "C",
  "C++",
  "C#",
  "Python",
  "JavaScript",
  "React",
  "React Native",
  "Swift",
  "Go",
  "Kotlin",
  "Java",
  "Rust",
  "Ruby",
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
  const [language, setLanguage] = useState<string>();
  const [experienceLevel, setExperienceLevel] = useState<string>();
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
  console.log(language);
  console.log(experienceLevel);

  useEffect(() => {
    const searchDevelopers = async (
      address: string,
      language?: string,
      experienceLevel?: string
    ) => {
      const queryParams = new URLSearchParams();
      queryParams.set("location", address);
      if (language) {
        queryParams.set("languages", language);
      }
      if (experienceLevel) {
        queryParams.set("experienceLevel", experienceLevel);
      }
      let response = await fetch(
        `http://localhost:8000/developer/search?${queryParams.toString()}`
      );
      let data = await response.json();
      setDeveloperSearchResults(data.developers);
      console.log(developerSearchResults);
    };
    searchDevelopers(address, language, experienceLevel);
  }, [address, language, experienceLevel]);

  console.log(developerSearchResults);

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
                  helperText="Search Locations"
                  {...getInputProps({
                    placeholder: `${location?.description}`,
                  })}
                  sx={{ position: "relative", top: "20%" }}
                />

                <Grid
                  item
                  sx={{ position: "relative", top: "50px", zIndex: "5" }}
                >
                  {loading ? <div>...loading</div> : null}

                  {suggestions &&
                    suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? "#41b6e6"
                          : "#081229",
                        cursor: "pointer",
                        zIndex: 10,
                      };

                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { style })}
                          onClick={() => setAddress(suggestion.description)}
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
            helperText="Search Locations"
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
              defaultValue=""
              helperText="Select programming language"
              sx={{
                position: "relative",
                top: "20%",
                right: "45%",
                borderColor: "white",
                color: "white",
              }}
            >
              {languages.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  onClick={() => setLanguage(option)}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item>
            <TextField
              id="outlined-select-currency"
              select
              label="Experience Level"
              defaultValue=""
              helperText="Select experience level"
              sx={{
                position: "relative",
                top: "20%",
                borderColor: "white",
                color: "white",
              }}
            >
              {experienceLevels.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  onClick={() => setExperienceLevel(option)}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
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
            sx={{ position: "relative", left: "5%" }}
          >
            {developerSearchResults &&
              developerSearchResults?.map((developer, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <DevCard
                    _id={developer._id}
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
                    experienceLevel={developer.experienceLevel}
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
