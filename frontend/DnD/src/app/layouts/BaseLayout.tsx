import { Route, Routes } from "react-router-dom";
import { UseProviders } from "../providers";
import { SignInPage, SignUpPage } from "@/pages/sign-in";
import "./baseCss.module.css";
import { AppBar } from "@/widgets/navbar";
import LiveGameSessionPage from "@/pages/game";
import { MyCharactersPage } from "@/pages/characters";
import UncompletedSessionsPage from "@/pages/uncompletedSessions/ui/UncompletedSessionsPage";

function BaseLayout() {
    return (
      <UseProviders>
        <AppBar/> 
        <Routes>
            <Route path="/sign-in" element={<SignInPage/>}/>
            <Route path="/sign-up" element={<SignUpPage/>}/>
            <Route path="/my-characters" element={<MyCharactersPage/>} />
            <Route path="/parties/active" element={<UncompletedSessionsPage/>} />
            <Route /*element={<PrivateRoute/>}*/>
              <Route path="/game/:partyId" element={<LiveGameSessionPage/>} />
            </Route>
        </Routes>
      </UseProviders>
    );
  }
  
export default BaseLayout;