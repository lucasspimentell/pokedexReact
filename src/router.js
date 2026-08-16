import {BrowserRouter,Routes,Route} from "react-router-dom";
import Favoritos from "./pages/Favoritos";
import Home from "./pages/Home";
import Detalhes from "./pages/Detalhes";
const RouterApp = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Detalhes" element={<Detalhes/>}/>
            <Route path="/Favoritos" element={<Favoritos/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default RouterApp;