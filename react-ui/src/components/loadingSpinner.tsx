import Spinner from "react-bootstrap/Spinner";
import classes from "../styles/styles.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.align__center}>
      <Spinner animation="border" className={classes.spinner__size} />
    </div>
  );
};

export default LoadingSpinner;
