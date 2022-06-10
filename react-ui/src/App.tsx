import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
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
    </BrowserRouter>
  );
}

export default App;
