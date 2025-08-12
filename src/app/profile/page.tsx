"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [data, setData] = useState("nothing");
    const [isLoading, setIsLoading] = useState(true);
    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            const response = await axios.get("/api/users/logout");
            
            if (response.status === 200) {
                // Redirect to login page after successful logout
                router.push("/login");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("An error occurred during logout");
        } finally {
            setIsLoggingOut(false);
        }
    };
    // const getUserDetails = async () => {
    //     const response = await axios.get("/api/users/me");
    //     if (response.status !== 200) {
    //         throw new Error("Failed to fetch user details");
    //     }
    //     console.log("User details fetched successfully");
    //     console.log(response.data);
    //     setData(response.data.data._id);
    // }
    const getUserDetails = async () => {
    try {
        setIsLoading(true);
        const response = await axios.get("/api/users/me");
        console.log("Full response:", response);
        console.log("Response data:", response.data);
        console.log("Response status:", response.status);
        
        if (response.status !== 200) {
            throw new Error("Failed to fetch user details");
        }

        // Handle different possible response structures
        let userId = null;
        
        if (response.data) {
            // Check for user object with _id (this is your actual structure)
            if (response.data.user && response.data.user._id) {
                userId = response.data.user._id;
            }
            // Check for user object with id
            else if (response.data.user && response.data.user.id) {
                userId = response.data.user.id;
            }
            // Check for nested data structure
            else if (response.data.data && response.data.data._id) {
                userId = response.data.data._id;
            }
            // Check for direct _id property
            else if (response.data._id) {
                userId = response.data._id;
            }
            // Check for id property instead of _id
            else if (response.data.id) {
                userId = response.data.id;
            }
            // Check for nested id
            else if (response.data.data && response.data.data.id) {
                userId = response.data.data.id;
            }
        }

        if (userId) {
            setData(userId);
            toast.success("User details fetched successfully");
        } else {
            console.error("No user ID found in response:", response.data);
            toast.error("No user ID found in response");
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to fetch user details");
    } finally {
        setIsLoading(false);
    }
};

    // Automatically fetch user details when component mounts
    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with logout button */}
                <div className="bg-white shadow rounded-lg mb-6">
                    <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                        <h2 className="text-lg text-gray-700">
                            User ID: {isLoading ? (
                                <span className="text-gray-500">Loading...</span>
                            ) : data === "nothing" ? (
                                <span className="text-red-500">Not found</span>
                            ) : (
                                <Link href={`/profile/${data}`}>{data}</Link>
                            )}
                        </h2>
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoggingOut ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging out...
                                </>
                            ) : (
                                <>
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                    Logout
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Profile content */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-8">
                        <div className="text-center">
                            <div className="mb-4">
                                <div className="mx-auto h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
                                    <svg className="h-10 w-10 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to your profile!</h2>
                            <p className="text-gray-600">Your profile details will be displayed here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
