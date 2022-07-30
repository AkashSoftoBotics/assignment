import { useState } from "react";
import React from "react";
// import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Login=()=>{
    const navigation=useNavigate()
    // const [set,setBack]=useState(false);
    const [user,setUser]=useState();
    const [pass,setPass]=useState();
    const data=[{"user":'akash','pass':'123456'},{"user":'akas','pass':'123456'}]
    const validate=()=>{
        return user.length>0 && pass.length>0
    }
    const handle=(event)=>{
        event.preventDefault();
        data.forEach(element => {
            if(element.user===user && element.pass===pass)
            {
                navigation("./home")
            }
        });
    }
    return<>
    <form onSubmit={handle}>
        <label>Username</label><br/>
        <input type='text' name='username' onChange={(event)=>setUser(event.target.value)}/><br/>
        <label>Password</label><br/>
        <input type='password' name='password' onChange={(event)=>setPass(event.target.value)}/><br/>
        <Button type='submit' disabled={!validate}>Login</Button>
    </form>
 
    </>
}

export default Login;