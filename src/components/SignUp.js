import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({ Name: "", Email: "", Password: "", cPassword: "" });
  const navigate = useNavigate();
  
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { Name, Email, Password } = credentials;
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Name, Email, Password }),
    });
    const json = await response.json();
    console.log(json);
    // Save the auth token and redirect
    navigate("/");
    
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      props.showAlert(":  Account Created Successfully", "success")
    } else {
      props.showAlert(":  Invalid Credentials", "danger")
    }
  }
    
  return (
    <div>
      <div className="container my-5">
        <h2>Create an account to Access iNoteBook.</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name="Name" id="name" onChange={onChange} required aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="Email" id="email" onChange={onChange} required aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="Password" onChange={onChange} required id="password" />
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name="cPassword" onChange={onChange} required id="cpassword" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
      </div>
      );
}

      export default SignUp;
