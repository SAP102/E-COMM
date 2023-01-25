import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import errorcode from "./../../asset/Images/errorcode.svg";
import { clearErrors, loadUser, register } from "../../actions/userAction"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Registeruser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, isAuthenticated, loading } = useSelector((state) => state.user)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const { name, email, password } = data
    const [avatar, setAvatar] = useState()
    const [ERROR, setError] = useState()
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")

    const hendelregister = (e) => {
        e.preventDefault()
        const myform = new FormData()
        myform.set("name", name)
        myform.set("email", email)
        myform.set("password", password)
        myform.set("avatar", avatar)
        dispatch(register(myform))
    }

    const handleData = (event) => {
        if (event.target.name === "avatar") {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(event.target.files[0])
            setError('')
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
            setError('')
        }
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
            toast.success("register successfully", {
                position: "top-right",
                autoClose: 1500,
            });
            setError('')
            dispatch(loadUser())
            navigate("/")
        }

    }, [dispatch, error, isAuthenticated, navigate])


    return (
        <>
            <div className="min-h-[0vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-lg">
                <div className="w-[28rem] space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign Up
                        </h2>
                    </div>
                    <div className="mt-8 space-y-6" >
                        <input type="hidden" name="remember" defaultValue="True" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className='mb-2'>
                                <label htmlFor="Name" className="sr-only">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={handleData}
                                    required
                                    className={
                                        ERROR
                                            ? "appearance-none rounded-none relative block w-full px-3  border border-rose-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-ring-rose-500 focus:z-10 sm:text-sm p-3"
                                            : "appearance-none rounded-none relative block w-full px-3  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm p-3"
                                    }
                                    placeholder="Enter name" />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="email-address" className="sr-only ">Email address</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={handleData}
                                    required
                                    className={
                                        ERROR
                                            ? "appearance-none rounded-none relative block w-full px-3  border border-rose-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-ring-rose-500 focus:z-10 sm:text-sm p-3"
                                            : "appearance-none rounded-none relative block w-full px-3  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm p-3"
                                    }
                                    placeholder="Enter email" />
                            </div>
                            <div className='py-2'>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    name="password"
                                    value={data.password}
                                    onChange={handleData}
                                    required
                                    className={
                                        ERROR
                                            ? "appearance-none rounded-none relative block w-full px-3  border border-rose-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:border-ring-rose-500 focus:z-10 sm:text-sm p-3"
                                            : "appearance-none rounded-none relative block w-full px-3  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm p-3"
                                    } placeholder="Password"
                                />
                            </div>
                            <div className="flex items-center h-24 space-x-6">
                                <div className="shrink-0">
                                    <img className={ERROR ? "h-16 w-16 object-cover rounded-full border border-rose-600" : "h-16 w-16 object-cover rounded-full"} src={avatarPreview} alt="Current profile photo" />
                                </div>
                                <label className="block">
                                    <span className="sr-only">Choose profile photo</span>
                                    <input type="file" name="avatar" accept="image/*" onChange={handleData} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 " />
                                </label>
                            </div>
                        </div>

                        {
                            ERROR ? (
                                <div
                                    className={
                                        !ERROR
                                            ? "opacity-0"
                                            : "text-darkred font-medium text-sm font-Aktiv flex items-center bg-lightred py-[10px] pl-[14px] rounded mb-5"
                                    }
                                >
                                    <img src={errorcode} alt="error" className="mr-3" />
                                    <p>Invalid credentials</p>
                                </div>
                            ) : (
                                ""
                            )
                        }
                        <div>
                            <button onClick={hendelregister} type="submit" className="group relative w-full flex justify-center  px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-3">
                                {
                                    loading ? (
                                        <svg
                                            className="inline mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                    ) :
                                        <div>
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="True">
                                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                            Sign up
                                        </div>

                                }
                            </button>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Registeruser
