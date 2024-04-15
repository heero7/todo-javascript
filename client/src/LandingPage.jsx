import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      Landing
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
    </div>
  )
}

export default LandingPage;
