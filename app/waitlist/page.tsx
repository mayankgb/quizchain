"use client"

import { ChangeEvent, useState } from "react"
import { toast } from "sonner"
import { addUserToWaitlist } from "../actions/waitlist"

export default function Waitlist() {
    const [userEmail, setUserEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value)
        return
    }

    async function handleSubmit() {
        if (!userEmail || !userEmail.includes('@')) {
            toast.error("Please enter a valid email address")
            return
        }

        setIsSubmitting(true)
        const toastId = toast.loading("Adding you to our waitlist...")

        try {
            const newUser = await addUserToWaitlist(userEmail)

            if (newUser.status > 200) {
                toast.error(newUser.message)
            } else {
                toast.success(newUser.message)
                setUserEmail("")
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            toast.dismiss(toastId)
            setIsSubmitting(false)
        }
        
        return
    }

    return (
        <div className="min-h-screen bg-[#FAF7FF] flex flex-col items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Join the <span className="text-purple-700">QuizChain</span> Waitlist
                    </h1>
                    <p className="text-gray-600">
                        Be among the first to access our Solana-powered quiz platform and start earning rewards.
                    </p>
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input 
                        id="email"
                        type="email" 
                        placeholder="your@email.com" 
                        value={userEmail}
                        onChange={handleInput}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                </div>

                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full cursor-pointer px-6 py-3 bg-purple-700 text-white font-medium rounded-full hover:bg-purple-800 transition-colors disabled:bg-purple-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Submitting..." : "Join Waitlist"}
                </button>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        By joining our waitlist, you'll get early access and exclusive rewards when we launch.
                    </p>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
                <div className="flex items-center space-x-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Be the first to experience QuizChain</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Receive special launch bonuses</span>
                </div>
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>No spam, we promise</span>
                </div>
            </div>

            <div className="mt-12">
                <a href="/" className="text-purple-700 hover:text-purple-900 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Homepage
                </a>
            </div>
        </div>
    )
}