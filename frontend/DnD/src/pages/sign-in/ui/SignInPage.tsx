import { useAuthReducer } from "@/features/auth";
import { SignInForm } from "@/widgets/sign-in";
import { Container } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import TeamTitle from "./TeamTitle";
import ChangePageTitle from "@/shared/ui/changePageTitle";

export default function SignInPage() {
    const { state } = useAuthReducer();
    const navigate = useNavigate();
    const location = useLocation();

    function redirectAfterSignIn() {
        const urlParams = new URLSearchParams(location.search);
        const returnUri = urlParams.get('return_uri');
        if(returnUri) {
            navigate(returnUri);
        }
        else {
            navigate('/my-characters');
        }
    }

    if (state.isAuthenticated) {
        return <Navigate to="/my-characters"/>
    }

    return <>
        <ChangePageTitle title="Логин"/>
        <Container component="main" maxWidth="xs">
            <TeamTitle/>
            <SignInForm afterSuccessfulSignIn={redirectAfterSignIn}/>
        </Container>
    </>
}