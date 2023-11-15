// import React, { useState, useEffect } from 'react';
import React from 'react';

const Profile = () => {
    // const [user, setUser] = useState({
    //     Name: '',
    //     Email: '',
    //     CreatedAt: '',
    // });

    // // Function to fetch and update user information
    // const fetchUserInfo = async () => {
    //     try {
    //         const response = await fetch('http://localhost:5000/api/auth/getuser', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the JWT token in the Authorization header
    //             },
    //         });

    //         if (response.ok) {
    //             const userData = await response.json();
    //             setUser(userData);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user information', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchUserInfo();
    // }, []); // Fetch user information when the component mounts

    return (
        <>
            <h2>Your Profile</h2>
            <div>
                <h6>Name : </h6>
                <h6>Email : </h6>
                <div className="conatiner">
                    <h6>Gender : </h6>
                <input className="form-check-input mt-3 mx-2" type="radio" name="gender" id="male" />
                <label className="form-check-label mt-3 mx-2" htmlFor="male"><b>Male</b>
                </label>
                <input className="form-check-input mt-3 mx-2" type="radio" name="gender" id="female" />
                <label className="form-check-label mt-3 mx-2" htmlFor="female"><b>Female</b>
                </label>
                </div>
            </div>
        </>
    );
};

export default Profile;
