import { useAuthReducer } from "@/features/auth";
import { SignUpForm } from "@/widgets/sign-in";
import { Container } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import TeamTitle from "./TeamTitle";
import ChangePageTitle from "@/shared/ui/changePageTitle";

export default function SignUpPage() {
    const { state } = useAuthReducer();
    const navigate = useNavigate();

    const redirectToLogin = () => navigate('/sign-in');

    if (state.isAuthenticated) {
        return <Navigate to="/"/>
    }

    return <>
        <ChangePageTitle title="Регистрация"/>
        <Container component="main" maxWidth="xs">
            <TeamTitle/>
            <SignUpForm afterSuccessfulSignUp={redirectToLogin}/>
        </Container>
    </>
}