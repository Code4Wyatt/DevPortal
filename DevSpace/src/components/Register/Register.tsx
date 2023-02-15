import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  makeStyles,
  createStyles,
  Theme,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import AppBar from "../AppBar/AppBar";
import axios from "../../app/api/axios";

const languages = ["JavaScript", "Python", "Java", "C#", "C++", "React", "React Native", "Android", "Swift"];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  statement: string;
  experienceLevel: string;
  location: string;
  profileimage?: string;
  languagesUsed: string[];
}

const Register: React.FC = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    statement: "",
    experienceLevel: "",
    location: "",
    profileimage: "",
    languagesUsed: [],
  });
  const [errors, setErrors] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    statement: "",
    experienceLevel: "",
    location: "",
    profileimage: "",
    languagesUsed: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectExperienceChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setFormData((prevState) => ({
      ...prevState,
      experienceLevel: value,
    }));
  };

  const handleSelectLanguagesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string[];
    setFormData((prevState) => ({
      ...prevState,
      languagesUsed: value,
    }));
  };

  const validateForm = () => {
    const newErrors: FormData = { ...errors };

    if (!formData.firstName) {
      newErrors.firstName = "Required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Required";
    }

    if (!formData.email) {
      newErrors.email = "Required";
    }

    if (!formData.password) {
      newErrors.password = "Required";
    }

    if (!formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Required";
    } else if (formData.password !== formData.passwordConfirmation) {
      newErrors.passwordConfirmation = "Passwords do not match";
    }

    if (!formData.statement) {
      newErrors.statement = "Required";
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = "Required";
    }

    if (!formData.location) {
      newErrors.location = "Required";
    }
   

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
      if (validateForm()) {
      axios
        .post("/auth/developer-register", formData)
        .then((response) => {
          console.log(response);
          setIsSubmitting(false);
        })
        .catch((error) => {
          console.error(error);
          setIsSubmitting(false);
        });
    } else {
      setIsSubmitting(false);
    }
  };

    return (
        <>
            <AppBar />
    <form onSubmit={handleSubmit} noValidate style={{ position: 'relative', left: '20%', width: '50%'}}>
      <FormControl fullWidth error={Boolean(errors.firstName)}>
        <InputLabel htmlFor="firstname">First Name</InputLabel>
        <Input
          id="firstName"
          name="firstName"
          value={formData.firstName}
                  onChange={handleChange}
                  style={{ backgroundColor: 'white'}}
        />
        {errors.firstName && (
          <FormHelperText>{errors.firstName}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth error={Boolean(errors.lastName)}>
        <InputLabel htmlFor="lastname">Last Name</InputLabel>
        <Input
          id="lastName"
          name="lastName"
          value={formData.lastName}
                  onChange={handleChange}
                   style={{ backgroundColor: 'white'}}
        />
        {errors.lastName && <FormHelperText>{errors.lastName}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth error={Boolean(errors.email)}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
                  type="email"
                   style={{ backgroundColor: 'white'}}
        />
        {errors.email && <FormHelperText>{errors.email}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth error={Boolean(errors.password)}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
                  type="password"
                   style={{ backgroundColor: 'white'}}
        />
        {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth error={Boolean(errors.passwordConfirmation)}>
        <InputLabel htmlFor="passwordConfirmation">
          Password Confirmation
        </InputLabel>
        <Input
          id="passwordConfirmation"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          onChange={handleChange}
                  type="password"
                   style={{ backgroundColor: 'white'}}
        />
        {errors.passwordConfirmation && (
          <FormHelperText>{errors.passwordConfirmation}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth error={Boolean(errors.statement)}>
        <TextField
          id="statement"
          name="statement"
          label="Statement"
          value={formData.statement}
          onChange={handleChange}
          multiline
          rows={4}
                  variant="outlined"
                   style={{ backgroundColor: 'white'}}
        />
        {errors.statement && (
          <FormHelperText>{errors.statement}</FormHelperText>
        )}
      </FormControl>
      <FormControl
        className={classes.formControl}
        error={Boolean(errors.experienceLevel)}
      >
        <InputLabel id="experienceLevel-label">Experience Level</InputLabel>
        <Select
          labelId="experiencelevel"
          id="experiencelevel"
          name="experiencelevel"
          value={formData.experienceLevel}
                  onChange={handleSelectExperienceChange}
                   style={{ backgroundColor: 'white'}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Graduate">Graduate</MenuItem>
          <MenuItem value="Junior">Junior</MenuItem>
          <MenuItem value="Mid">Mid</MenuItem>
          <MenuItem value="Senior">Senior</MenuItem>
        </Select>
        {errors.experienceLevel && (
          <FormHelperText>{errors.experienceLevel}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth error={Boolean(errors.location)}>
        <InputLabel htmlFor="location">Location</InputLabel>
        <Input
          id="location"
          name="location"
          value={formData.location}
                  onChange={handleChange}
                   style={{ backgroundColor: 'white'}}
        />
        {errors.location && <FormHelperText>{errors.location}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth error={Boolean(errors.profileimage)}>
        <InputLabel htmlFor="profileimage">Profile Image</InputLabel>
        <Input
          id="profileimage"
          name="profileimage"
          value={formData.profileimage}
          onChange={handleChange}
                  type="file"
                   style={{ backgroundColor: 'white'}}
        />
        {errors.profileimage && (
          <FormHelperText>{errors.profileimage}</FormHelperText>
        )}
          </FormControl>
          <FormControl fullWidth >
  <InputLabel id="languages-label">Programming Languages</InputLabel>
  <Select
    labelId="languages-label"
    id="languages"
    multiple
    value={formData.languagesUsed}
    onChange={handleSelectLanguagesChange}
              style={{ backgroundColor: 'white'}}
  >
    {languages.map((language) => (
      <MenuItem key={language} value={language}>
        {language}
      </MenuItem>
    ))}
  </Select>
</FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        Register
      </Button>
    </form>
        </>
        
  );
};

export default Register;
