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
            <link
                href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
                rel="stylesheet"
            />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,maximum-scale=1"
            />
            <div className="max-w-screen-xl bg-white shadow sm:rounded-lg flex justify-center flex-1 mx-auto h-screen overflow-hidden">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <img
                            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                            className="w-32 mx-auto"
                        />
                    </div>
                    <div className="mt-6 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Sign In for templatana
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="my-12 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign up with e-mail
                                </div>
                            </div>
                            <div className="mx-auto max-w-xs">
                                <input
                                    className={
                                        ERROR ? "w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-rose-400 placeholder-gray-500 text-sm focus:outline-none focus:border-rose-500 focus:bg-white"
                                            :
                                            "w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"}
                                    value={data.name}
                                    onChange={handleData}
                                    name="name"
                                    type="text"
                                    placeholder="Enter your Name"
                                />
                                <input
                                    className={
                                        ERROR ? "w-full px-8 py-4 mt-5 rounded-lg font-medium bg-gray-100 border border-rose-400 placeholder-gray-500 text-sm focus:outline-none focus:border-rose-500 focus:bg-white"
                                            :
                                            "w-full px-8 py-4 rounded-lg mt-5 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"}
                                    onChange={handleData}
                                    value={data.email}
                                    name="email"
                                    type="email"
                                    placeholder="Enter your Email"
                                />
                                <input
                                    className={
                                        ERROR ? "w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-rose-400 placeholder-gray-500 text-sm focus:outline-none focus:border-rose-500 focus:bg-white mt-5"
                                            :
                                            "w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"}
                                    onChange={handleData}
                                    value={data.password}
                                    name="password"
                                    type="text"
                                    placeholder="Enter your Password"
                                />
                                <div className="flex items-center h-24 space-x-6">
                                    <div className="shrink-0">
                                        <img className={ERROR ? "h-16 w-16 object-cover rounded-full border border-rose-600" : "h-16 w-16 object-cover rounded-full"} src={avatarPreview} alt="Current profile photo" />
                                    </div>
                                    <label className="block">
                                        <span className="sr-only">Choose profile photo</span>
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleData}
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                                        />
                                    </label>
                                </div>
                                <button
                                    onClick={hendelregister}
                                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    {
                                        loading ? (
                                            <div className="flex justify-center items-center space-x-1 text-sm text-white-700">
                                                <svg
                                                    fill="none"
                                                    className="w-6 h-6 -ml-2 animate-spin"
                                                    viewBox="0 0 32 32"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        clipRule="evenodd"
                                                        d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                    />
                                                </svg>
                                                <div>Loading ...</div>
                                            </div>
                                        ) : (
                                            <>
                                                <svg
                                                    className="w-6 h-6 -ml-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                    <circle cx="8.5" cy={7} r={4} />
                                                    <path d="M20 8v6M23 11h-6" />
                                                </svg>
                                                <span className="ml-3">Sign Up</span>
                                            </>
                                        )
                                    }
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by templatana's
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Terms of Service
                                    </a>
                                    and its
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Privacy Policy
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")'
                        }}
                    />
                </div> */}
            </div>
        </>
    )
}

export default Registeruser
