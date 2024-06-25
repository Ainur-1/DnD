import { Route, Routes } from "react-router-dom";
import { UseProviders } from "../providers";
import { SignInPage, SignUpPage } from "@/pages/sign-in";
import "./baseCss.module.css";
import PrivateRoute from "@/widgets/private-route";
import { AppBar } from "@/widgets/navbar";

function BaseLayout() {
    return (
      <UseProviders>
        <AppBar/> 
        <Routes>
            <Route path="/sign-in" element={<SignInPage/>}/>
            <Route path="/sign-up" element={<SignUpPage/>}/>
            <Route element={<PrivateRoute/>}>
            </Route>
        </Routes>
      </UseProviders>
    );
  }
  
export default BaseLayout;