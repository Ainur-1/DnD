import { Route, Routes } from "react-router-dom";
import { UseProviders } from "../providers";

function BaseLayout() {
    return (
      <UseProviders> 
        <Routes>
            <Route path="/login"/>
        </Routes>
      </UseProviders>
    );
  }
  
export default BaseLayout;