import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "../styles/styles.module.css";

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <NavLink
          style={{ textDecoration: "none" }}
          className={classes.nav__link}
          to="/login"
          end
        >
          <div>ToDo</div>
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link>
              <NavLink
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? classes.active : classes.nav__link
                }
                end
                to="/Login"
              >
                Login
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? classes.active : classes.nav__link
                }
                end
                to="/Register"
              >
                Register
              </NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
