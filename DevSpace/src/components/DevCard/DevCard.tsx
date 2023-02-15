import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ReactLogo from "../../assets/icons/React.png";
import TypeScriptLogo from "../../assets/icons/typescript/typescript-original.svg";
import JavaScriptLogo from "../../assets/icons/javascript/javascript-original.svg";
import JavaLogo from "../../assets/icons/java/java-original.svg";
import KotlinLogo from "../../assets/icons/kotlin/kotlin-original.svg";
import ReactNativeLogo from "../../assets/icons/ReactNative.png";
import SwiftLogo from "../../assets/icons/swift/swift-original.svg";
import RubyLogo from "../../assets/icons/ruby/ruby-original.svg";
import './style.scss';

interface IDeveloper {
  _id: string;
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
  experienceLevel?: string;
}

interface LanguageIconProps {
  language: string;
}

const DevCard: React.FunctionComponent<IDeveloper> = (props: IDeveloper) => {
  console.log("devcard", props);
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  function LanguageIcon(props: LanguageIconProps) {
    const { language } = props;
    console.log(language);
    let logo: string | undefined;

    switch (language) {
      case "JavaScript":
        logo = JavaScriptLogo;
        break;
      case "TypeScript":
        logo = TypeScriptLogo;
        break;
      case "React":
        logo = ReactLogo;
        break;
      case "React Native":
        logo = ReactNativeLogo;
        break;
      case "Java":
        logo = JavaLogo;
        break;
      case "Kotlin":
        logo = KotlinLogo;
        break;
      case "Swift":
        logo = SwiftLogo;
        break;
      case "Ruby":
        logo = RubyLogo;
        break;
      default:
        logo = undefined;
    }

    return (
      <img
        src={logo}
        alt={language}
        style={{ height: "20px", marginRight: "5px" }}
      />
    );
  }

  let experienceString = props.experienceLevel;
  let words = experienceString?.split(" ");
  let level = words?.shift();

  return (
    <Card
      sx={{
        padding: 2,
        border: "1px solid blue",
        backgroundColor: "#161948",
        height: "150px",
        width: "250px",
        color: "white",
      }}
      className='devCard'
    >
      <Link
        to={`/developer/${props._id}`}
        style={{ color: "white", textDecoration: "none" }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item display="flex">
              {props.profileImage ? (
                <Avatar
                  alt="Remy Sharp"
                  src={props.profileImage}
                  sx={{ marginRight: "10px" }}
                />
              ) : (
                <Avatar
                  {...stringAvatar(`${props.firstName} ${props.lastName}`)}
                  sx={{ marginRight: "10px" }}
                />
              )}

              <Typography>
                {props.firstName} {props.lastName}
              </Typography>
            </Grid>

            <Grid item display="column">
              <Typography>{props.location}</Typography>
              <Typography>Experience: {level}</Typography>
            </Grid>
          </Grid>
          <Grid item display="flex">
            {props.languages.map((language) => {
              return (
                <>
                  <LanguageIcon key={language} language={language} />
                </>
              );
            })}
          </Grid>
        </CardContent>
      </Link>
    </Card>
  );
};

export default DevCard;
