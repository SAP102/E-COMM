import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors, resetPassword } from "../../actions/userAction"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { error, isAuthenticated } = useSelector((state) => state.forgotPassword)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = () => {
        dispatch(resetPassword(params.token, password, confirmPassword))
    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 1500,
            });
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            toast.success("Password Reset successfully", {
                position: "top-right",
                autoClose: 1500,
            });
            navigate("/login")
        }
    }, [dispatch, error, isAuthenticated, navigate])

    return (
        <>
        
            {/* <div className="fixed inset-0 z-10 overflow-y-auto ">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-7">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className='mb-4'>
                                <input id="email-address" name="email" value={password}
                                    onChange={(e) => setPassword(e.target.value)} type="password" required className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4" placeholder="Enter Password" />
                            </div>
                            <div className='mb-4'>
                                <input id="Name" name="name" value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} type="password" required className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter Confirm Password" />
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                onClick={() => updatePasswordSubmit()}
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer /> */}
        </>
    )
}

export default ResetPassword
