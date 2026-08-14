import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
const RouterApp = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Detalhes" element={<Detalhes/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default RouterApp;