import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Navigate } from "react-router-dom";


type TypeOfPageProps = {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<TypeOfPageProps> = ({children}) => {

  const {token} = useSelector((state: RootState)=>state.authentication);

  return token ?  (children) : <Navigate to="/login" replace/>;

}

export default PrivateRoute
