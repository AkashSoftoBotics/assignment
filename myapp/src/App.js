import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from "./Home";
import Login from "./Login";
import Navigation from "./Navigation";
import Register from "./Register";
const App=()=>{
   
    return(<>
   <BrowserRouter>
   <Navigation/>
   <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login/home" element={<Home />}/>   
          
    </Routes>
   </BrowserRouter>
    </>)
}

export default App;