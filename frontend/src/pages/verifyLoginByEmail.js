import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { localBackendLink,onlineBackendLink } from "../utils/links";
export const VerificationPage = () => {
    const [isError, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Get the current URL
        const currentUrl = window.location.href;

        // Extract the parameters from the URL
        const urlParams = new URLSearchParams(currentUrl);

        // Get the values of the parameters
        const key = urlParams.get('k');
        const email = urlParams.get('email');
        console.log(key,email)
        // Make an API request to verify the user
        axios.get(`${localBackendLink}/verifyOtp?k=${key}&email=${email}`)
            .then(response => {
                // Handle the response from the backend (if needed)
                console.log('Backend response:', response.data);
                const token = response.data.token;
                localStorage.setItem("token", token);
                navigate('/events');
            })
            .catch(error => {
                // Handle any errors (if needed)
                console.error('Error:', error);
                setError(true);
            });
    }, [navigate]);

    return (
        <div >
            {!isError ? (
                <span className="loading loading-spinner loading-lg"></span>
            ) : (
                <div>
                    <h1>Oops! Something Went Wrong</h1>
                    <p>We're sorry, but there seems to be an error with the link you've followed.</p>
                    <p>Please try the following:</p>
                    <ul>
                        <li>Double-check the URL to make sure it's correct.</li>
                        <li>Return to the <a href="/">homepage</a>.</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

