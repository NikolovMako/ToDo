import { Formik } from "formik";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useAppDispatch } from "../hooks/hooks";
import { loginUser } from "../interfaces/interfaces";
import { loginUserData } from "../store/users/actions";
import classes from "../styles/styles.module.css";
import { loginSchema } from "../validation/loginValidation";

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={async (values: loginUser) => {
        await dispatch(loginUserData(values));
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

export default LoginForm;
