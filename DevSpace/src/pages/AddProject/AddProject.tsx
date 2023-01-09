import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import "./style.scss";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AppBar from "../../components/AppBar/AppBar";
import "react-toastify/dist/ReactToastify.css";

interface Project {
  projectName: string;
  projectDescription: string;
  projectLink: string;
  technologiesUsed: string[];
}

const AddProject: React.FC = () => {
  let id = useParams().currentUserId;
  let token = localStorage.getItem("token");
  const [project, setProject] = useState<Project>({
    projectName: "",
    projectDescription: "",
    projectLink: "",
    technologiesUsed: [],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setProject({ ...project, [name]: value });
  };

  const handleMultiSelectChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setProject({
      ...project,
      technologiesUsed: event.target.value as string[],
    });
    console.log(project);
  };

  const addProject = async (project: Project) => {
    let response = await fetch(
      `http://localhost:8000/developer/${id}/addproject`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(project),
      }
    );
    if (response.status === 200) {
      console.log("Project added successfully!");
      toast.success("Project added successfully!");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit the project object to the server

    addProject(project);
    console.log(project);
  };

  return (
    <>
      <AppBar />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="edit-form">
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <TextField
            label="Project Name"
            name="projectName"
            value={project.projectName}
            onChange={handleInputChange}
            style={{
              backgroundColor: "white",
              marginTop: "10px",
              width: "300px",
            }}
          />
          <br />
          <TextField
            label="Project Description"
            name="projectDescription"
            value={project.projectDescription}
            onChange={handleInputChange}
            style={{
              backgroundColor: "white",
              marginTop: "10px",
              width: "300px",
              height: "100%",
            }}
          />
          <br />
          <TextField
            label="Project Link"
            name="projectLink"
            value={project.projectLink}
            onChange={handleInputChange}
            style={{
              backgroundColor: "white",
              marginTop: "10px",
              width: "300px",
            }}
          />
          <br />
          <FormControl
            style={{
              backgroundColor: "white",
              marginTop: "10px",
              width: "300px",
            }}
          >
            <InputLabel id="technologiesUsed-label">
              Technologies Used
            </InputLabel>
            <Select
              labelId="technologiesUsed-label"
              id="technologiesUsed"
              multiple
              value={project.technologiesUsed}
              onChange={handleMultiSelectChange}
              inputProps={{
                name: "technologiesUsed",
                id: "technologiesUsed",
              }}
            >
              <MenuItem value="JavaScript">JavaScript</MenuItem>
              <MenuItem value="TypeScript">TypeScript</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="C++">C++</MenuItem>
              <MenuItem value="C#">C#</MenuItem>
              <MenuItem value="Ruby">Ruby</MenuItem>
              <MenuItem value="PHP">PHP</MenuItem>
            </Select>
          </FormControl>
          <br />
          <Button type="submit">Add Project</Button>
        </form>
      </div>
    </>
  );
};

export default AddProject;
