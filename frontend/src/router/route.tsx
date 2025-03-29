import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import PrivateRoute from "./private-route";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AllRoutes;
