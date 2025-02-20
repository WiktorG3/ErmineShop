"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            navigate("/")
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold p-4">Welcome to your Dashboard</h1>
            <button
                onClick={() => {
                    localStorage.removeItem("jwt")
                    navigate("/")
                }}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
            >
                Logout
            </button>
        </div>
    )
}