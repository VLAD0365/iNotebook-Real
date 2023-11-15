import React from 'react'
import {  Link,useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();
    const navigate = useNavigate();
    const handleProfileClick = () => {
        // Redirect to login if the user is not authenticated
        if (!localStorage.getItem('token')) {
          navigate('/login');
        } else {
          // Navigate to the profile page if the user is authenticated
          navigate('/profile');
        }
      };
    const handleLogout = () =>{
        localStorage.removeItem('token');
        navigate("/login");
        props.showAlert(":  Logged Out Account Successfully", "success");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/prflie"? "active":""}`} onClick={handleProfileClick} to="/proflie"><i className="bi bi-person-circle fa-lg"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current= "page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex" role="search">
                    <Link className="btn btn-light mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-light mx-1" to="/signup" role="button">Sign-Up</Link>
                    </form>:<button className="btn btn-light" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
