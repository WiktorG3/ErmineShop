"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function AuthCallback() {
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get("token")
        const error = params.get("error");

        if (token) {
            localStorage.setItem("jwt", token);
            navigate("/home");
        } else if (error) {
            console.error("OAuth error:", error);
            navigate(`/login?error=${error}`);
        }
        else if (!token) {
            const urlParams = new URLSearchParams(window.location.search);
            console.log("All URL parameters:", Object.fromEntries(urlParams.entries()));
        } else {
            console.warn("Unknown authentication error");
            navigate("/login?error=unknown");
        }

    }, [])

    return <div>Loading...</div>
}