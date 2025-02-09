import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../Store/Store";

export default function AuthGuard(){
    const {user} = useAppSelector(state => state.account);
    const location = useLocation();

    if (!user) {
        return <Navigate to={"/login"} state={{from: location}}></Navigate>
    }
    return <Outlet></Outlet>
}
