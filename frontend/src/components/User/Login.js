import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, loadUser, login } from "../../actions/userAction"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, isAuthenticated } = useSelector((state) => state.user)
    const [forgotPass, setForgotPass] = useState(false)
    const [ERROR, setError] = useState()
    const [user, setData] = useState({
        email: '',
        password: ''
    })

    const handleData = (e) => {
        setData({ ...user, [e.target.name]: e.target.value })
        setError("")
    }

    const hendelLogin = async (e) => {
        e.preventDefault()
        await dispatch(login(user.email, user.password))
    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 1500,
            });
            setError(error)
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            toast.success("Login successfully", {
                position: "top-right",
                autoClose: 1500,
            });
            setError("")
            dispatch(loadUser())
            navigate("/account")
        }
    }, [dispatch, error, isAuthenticated, navigate])

    return (
        <>
            <div className="min-h-[0vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-lg">
                <div className="w-[28rem] space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <div className="mt-8 space-y-6" >
                        <input type="hidden" name="remember" defaultValue="True" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className='mb-2'>
                                {/* <p htmlFor="email-address"  className="sr-only text-lg relative w-auto text-black">Email address</p> */}
                                <input
                                    name="email"
                                    type="email"
                                    onChange={handleData}
                                    value={user.email}
                                    required
                                    className={
                                        ERROR
                                            ?
                                            // "border-2 border-rose-600 focus:outline-rose-600 focus:ring-rose-600 focus:bg-white focus:border-ring-rose-600"
                                            "appearance-none rounded-none relative block w-full px-3  border border-rose-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-ring-rose-500 focus:z-10 sm:text-sm p-3"
                                            : "appearance-none rounded-none relative block w-full px-3  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm p-3"
                                    }
                                    placeholder="Email address"
                                />
                                <p className="text-[#E52713] text-xs mt-1">{ERROR}</p>
                            </div>
                            <div>
                                {/* <label htmlFor="password" className="sr-only">Password</label> */}
                                <input
                                    name="password"
                                    onChange={handleData}
                                    value={user.password}
                                    required
                                    className={
                                        ERROR
                                            ?
                                            // "border-2 border-rose-600 focus:outline-rose-600 focus:ring-rose-600 focus:bg-white focus:border-ring-rose-600"
                                            "appearance-none rounded-none relative block w-full px-3  border border-rose-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-ring-rose-500 focus:z-10 sm:text-sm p-3"
                                            : "appearance-none rounded-none relative block w-full px-3  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm p-3"
                                    }
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className="text-sm">
                            <button onClick={() => setForgotPass(true)} className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </button>
                        </div>

                        <div>
                            <button onClick={hendelLogin} type="submit" className="group relative w-full flex justify-center  px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-3">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="True">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
            {
                forgotPass && <ForgotPassword forgotPass={forgotPass} setForgotPass={setForgotPass} />
            }
        </>
    )
}

export default Login
