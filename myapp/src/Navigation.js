import React from "react";
import { Link } from "react-router-dom";
const Navigation=()=>{
    return<>
    <ul className="flex">
        <li>
            <Link to='/login'>Login</Link>
        </li>
        <li>
            <Link to='/register'>Register</Link>
        </li>
    </ul>
    </>
}
export default Navigation;