import { Formik } from "formik";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { registerSchema } from "../validation/registerValidation";
import classes from "../styles/styles.module.css";
import { instance } from "../api/api";
import { registerUser } from "../interfaces/interfaces";

const RegisterForm = () => {
  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={(values: registerUser) => {
        instance
          .post("/register", values)
          .then(async (res) => {
            alert(res.data.message);
            console.log(res);
          })
          .catch((err) => {
            alert(err.response.data.message);
            console.log(err);
          });
      }}
    >
      {(props) => (
        <div>
          <Container className={classes.container}>
            <Form onSubmit={props.handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className={classes.text__center}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                />
                {props.errors.email && props.touched.email && (
                  <div id="emailConfirm" className={classes.text__center}>
                    {props.errors.email}
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  className={classes.text__center}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                />
                {props.errors.name && props.touched.name && (
                  <div id="name" className={classes.text__center}>
                    {props.errors.name}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  className={classes.text__center}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                />
                {props.errors.password && props.touched.password && (
                  <div id="passwordConfirm" className={classes.text__center}>
                    {props.errors.password}
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  className={classes.text__center}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.confirmPassword}
                />
                {props.errors.confirmPassword && props.touched.confirmPassword && (
                  <div
                    id="passwordConfirmation"
                    className={classes.text__center}
                  >
                    {props.errors.confirmPassword}
                  </div>
                )}
              </Form.Group>
              <div className={classes.align__center}>
                <Button
                  variant="dark"
                  type="submit"
                  disabled={!(props.isValid && props.dirty)}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Container>
        </div>
      )}
    </Formik>
  );
};

export default RegisterForm;
