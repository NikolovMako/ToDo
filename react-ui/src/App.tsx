import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Todo from "./components/toDo";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Layout from "./layout/Layout";
import { getUserMe } from "./store/users/actions";
import LoadingSpinner from "./components/loadingSpinner";

function App() {
  const auth = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.ui.loading);
  console.log(isLoading);
  const dispatch = useAppDispatch();
  const session = auth.sessionChecked;
  useEffect(() => {
    if (!session) {
      dispatch(getUserMe());
    }
  }, [dispatch, session]);

  if (auth.authenticated) {
    return (
      <BrowserRouter>
        {isLoading ? (
          <Layout>
            <LoadingSpinner />
          </Layout>
        ) : (
          <Routes>
            <Route path="/*" element={<Navigate to="/Todo" />} />
            <Route
              path="/Todo"
              element={
                <Layout>
                  <Todo />
                </Layout>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      {isLoading ? (
        <Layout>
          <LoadingSpinner />
        </Layout>
      ) : (
        <Routes>
          <Route path="/*" element={<Navigate to="/Login" />} />
          <Route
            path="/Register"
            element={
              <Layout>
                <RegisterForm />
              </Layout>
            }
          />
          <Route
            path="/Login"
            element={
              <Layout>
                <LoginForm />
              </Layout>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
