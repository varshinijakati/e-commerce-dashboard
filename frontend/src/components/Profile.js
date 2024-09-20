import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Profile=()=>{

    const [info, setInfo] = useState("")
    const [error, setError] = useState(null);
    const params =  useParams()

    useEffect(()=>{
        getDetails()
    },[params.id])

    const getDetails = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            console.log("Retrieved token:", token); // Debug log
            let result = await fetch(`http://localhost:5000/user/${params.id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
            });

            if (!result.ok) {
                throw new Error(`HTTP error! Status: ${result.status}`);
            }

            result = await result.json();
            console.log("User details:", result); // Debug log
            setInfo(result);
        } catch (error) {
            console.error("Error fetching user details:", error);
            setError("Failed to fetch user details.");
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            {info ? (
                <ul className="profile">
                    <li>Name: {info.name}</li>
                    <li>Email: {info.email}</li>
                </ul>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    )
}
export default Profile