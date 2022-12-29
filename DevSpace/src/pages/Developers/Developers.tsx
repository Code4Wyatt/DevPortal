import "./style.scss";
import { useEffect, useState } from "react";
import AppBar from "../../components/AppBar/AppBar";
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
} from 'react-places-autocomplete';

interface IDeveloper {
  firstName: string;
  lastName: String;
  email: String;
  password: String;
  statement: string;
  dateOfBirth: Date;
  location: string;
  messages: [];
  companiesFollowing: [];
  profileImage: string;
  languages: [];
  projects: [];
  linkedIn: string;
  gitHub: string;
  refreshToken: string;
  map: Function;
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

interface ICoordinates {
  lat: number,
  lng: number
}

const Developers = () => {
  const [allDevelopers, setAllDevelopers] = useState<any[]>();
  const [searchText, setSearchText] = useState("");
  const [matchingLocations, setMatchingLocations] = useState<any[]>([]);
  const [address, setAddress] = useState<string>();
  const [coordinates, setCoordinates] = useState<ICoordinates>();

 const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };


  useEffect(() => {
    const fetchAllDevelopers = async () => {
      let response = await fetch(`http://localhost:8000/developer/all`);
      let data = await response.json();
      setAllDevelopers(data.developers);
    };
    fetchAllDevelopers();
  }, []);

  console.log(allDevelopers);
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
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
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
              display: 'none'
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
              helperText="Please select programming language"
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
              helperText="Please select your currency"
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
          Search Developers
          {/* {allDevelopers &&
            allDevelopers.map((developer) => {
              return developer.firstName;
            })} */}
        </Grid>
      </Grid>
    </>
  );
};

export default Developers;
