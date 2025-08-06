"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const onLogin = async () => {
        try {
            // TODO: Add login API call here
            console.log("Login attempt:", user);
            
        } catch (error) {
            console.log("Login failed:", error);
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-400">Sign in to your account</p>
                </div>

                {/* Form */}
                <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 space-y-6">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex justify-end">
                        <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                            Forgot your password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={onLogin}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        Sign In
                    </button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-900 text-gray-400">Don&apos;t have an account?</span>
                        </div>
                    </div>

                    {/* Signup Link */}
                    <Link 
                        href="/signup" 
                        className="w-full block text-center py-3 px-4 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
                    >
                        Create Account
                    </Link>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm">
                    Secure login protected by{' '}
                    <span className="text-purple-400">
                        industry-standard encryption
                    </span>
                </p>
            </div>
        </div>
    );
}