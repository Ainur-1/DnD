import { Route, Routes } from "react-router-dom";
import { UseProviders } from "../providers";
import { SignInPage, SignUpPage } from "@/pages/sign-in";
import "./baseCss.module.css";
import { AppBar } from "@/widgets/navbar";
import LiveGameSessionPage from "@/pages/game";
import { MyCharactersPage } from "@/pages/characters";
import { PartiesPage } from "@/pages/parties";
import { CreateCharacterPage } from "@/pages/character-create";
import PrivateRoute from "@/widgets/private-route";

function BaseLayout() {
    return (
      <UseProviders>
        <AppBar/> 
        <Routes>
            <Route path="/sign-in" element={<SignInPage/>}/>
            <Route path="/sign-up" element={<SignUpPage/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path="/my-characters">
                <Route index path="" element={<MyCharactersPage/>} />
                <Route path="create" element={<CreateCharacterPage/>}/>
              </Route>
              <Route path="/my-parties" element={<PartiesPage/>} />
              <Route path="/game/:partyId" element={<LiveGameSessionPage/>} />
            </Route>
        </Routes>
      </UseProviders>
    );
  }
  
export default BaseLayout;