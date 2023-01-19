import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, loadUser, register } from "../../actions/userAction"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Registeruser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, isAuthenticated } = useSelector((state) => state.user)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const { name, email, password } = data
    const [avatar, setAvatar] = useState()
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

        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
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
            toast.success("register successfully", {
                position: "top-right",
                autoClose: 1500,
            });
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
                                <input id="Name" name="name" type="text" value={data.name} onChange={handleData} required className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your Name" />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="email-address" className="sr-only ">Email address</label>
                                <input id="email-address" name="email" type="email" value={data.email} onChange={handleData} required className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2" placeholder="Email address" />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" value={data.password} onChange={handleData} required className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                            <div class="flex items-center h-24 space-x-6">
                                <div class="shrink-0">
                                    <img class="h-16 w-16 object-cover rounded-full" src={avatarPreview} alt="Current profile photo" />
                                </div>
                                <label class="block">
                                    <span class="sr-only">Choose profile photo</span>
                                    <input type="file" name="avatar" accept="image/*" onChange={handleData} class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 " />
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <div>
                            <button onClick={hendelregister} type="submit" className="group relative w-full flex justify-center  px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-3">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="True">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign Up
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
