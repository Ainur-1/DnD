import { useAuthReducer } from "@/features/auth";
import { ReactNode } from "react";
import { Navigate, Outlet, useLocation, } from "react-router-dom";

interface PrivateRouteProps {
    children?: ReactNode,
    redirectPath?: string
}

export default function PrivateRoute({redirectPath, children}: PrivateRouteProps) {
    const { state } = useAuthReducer();
    const location = useLocation();
    if (!state.isAuthenticated) {
        return <Navigate to={`${redirectPath ?? '/login'}?return_uri=${location.pathname}`} replace={true} />
    }

    return children ?? <Outlet/>
}