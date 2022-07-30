import React from "react";
import { Button } from "react-bootstrap";
const Register=()=>{
    return<>
    <form>
        <label>Enter Your Name</label><br/>
        <input type="text" name="name" /><br/>
        
        <label>Enter Your Username</label><br/>
        <input type="text" name="username" /><br/>
        
        <label>Enter Your Password</label><br/>
        <input type="password" name="password" /><br/>
        <label>Enter Confirm Password</label><br/>
        <input type="password" name="cpassword" /><br/>
        <br/><Button type="submit" className="primary">Submit</Button>
    </form>
    </>
}

export default Register;