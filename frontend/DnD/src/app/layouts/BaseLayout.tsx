import { Route, Routes } from "react-router-dom";
import { UseProviders } from "../providers";
import { SignInPage, SignUpPage } from "@/pages/sign-in";
import "./baseCss.module.css";
import { AppBar } from "@/widgets/navbar";
import LiveGameSessionPage from "@/pages/game";
import SuggesItemForm from "@/widgets/game/ui/SuggesItemForm";

function BaseLayout() {
    return (
      <UseProviders>
        <AppBar/> 
        <Routes>
            <Route path="/sign-in" element={<SignInPage/>}/>
            <Route path="/sign-up" element={<SignUpPage/>}/>
            <Route path="/form" element={<SuggesItemForm characterId={"sdfds"} loadInventory={true}/>}/>
            <Route /*element={<PrivateRoute/>}*/>
              <Route path="/game" element={<LiveGameSessionPage/>} />
            </Route>
        </Routes>
      </UseProviders>
    );
  }
  
export default BaseLayout;