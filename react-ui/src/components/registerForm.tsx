import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { registerSchema } from "../validation/registerValidation";
import classes from "../styles/styles.module.css";
import { instance } from "../api/api";
import { registerUser } from "../interfaces/interfaces";

const RegisterForm = () => {
  const navigate = useNavigate()
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
            navigate('/Login')
            console.log(res);
          })
          .catch((err) => {
            alert(err.response.data.message);
            console.log(err);
          });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, touched, errors, values, isValid, dirty }) => (
        <div>
          <Container className={classes.container}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className={classes.text__center}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <div id="emailConfirm" className={classes.text__center__error}>
                    {errors.email}
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  className={classes.text__center}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <div id="name" className={classes.text__center__error}>
                    {errors.name}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  className={classes.text__center}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <div id="passwordConfirm" className={classes.text__center__error}>
                    {errors.password}
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  className={classes.text__center}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div
                    id="passwordConfirmation"
                    className={classes.text__center__error}
                  >
                    {errors.confirmPassword}
                  </div>
                )}
              </Form.Group>
              <div className={classes.align__center}>
                <Button
                  variant="dark"
                  type="submit"
                  disabled={!(isValid && dirty)}
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
