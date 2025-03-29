import { Routes, Route, Navigate} from "react-router-dom";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import PrivateRoute from "./private-route";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const AllRoutes = () => {

  const {token} = useSelector((state: RootState)=>state.authentication);
  console.log("12345log")

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
      <Route path="/login" element={token ? <Navigate to="/" replace />  : <LoginPage/>} />
    </Routes>
  );
};

export default AllRoutes;
