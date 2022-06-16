import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import classes from "../styles/styles.module.css";
import { logoutUser } from "../store/users/actions";

const NavigationBar = () => {
  const dispatch = useAppDispatch();
  const userLogout = () => {
    dispatch(logoutUser());
  };
  const auth = useAppSelector((state) => state.user);
  console.log(auth);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <NavLink
          style={{ textDecoration: "none" }}
          className={classes.nav__link}
          to={auth?.authenticated ? "/Todo" : "/login"}
          end
        >
          <div>ToDo</div>
        </NavLink>
        {auth.authenticated && (
          <>
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
                    to="/Todo"
                  >
                    TodoList
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    className={({ isActive }) =>
                      isActive ? classes.active : classes.nav__link
                    }
                    end
                    to="/login"
                    onClick={userLogout}
                  >
                    Logout
                  </NavLink>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
        {auth.authenticated === false && (
          <>
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
          </>
        )}
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
