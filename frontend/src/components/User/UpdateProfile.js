import React, { useEffect, useState } from 'react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const UpdateProfile = ({ setUpdateProfile, updateprofile }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user)
    const { error, isUpdated, loading } = useSelector((state) => state.profile)

    const [data, setData] = useState({
        name: '',
        email: '',
    })
    const { name, email } = data
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")
    const [ERROR, setError] = useState()

    const updateProfileSubmit = (e) => {
        e.preventDefault()
        const myform = new FormData()
        myform.set("name", name)
        myform.set("email", email)
        myform.set("avatar", avatar)
        dispatch(updateProfile(myform))
    }

    const Hendeldata = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        setError('')
    }

    const updateProfileDataChange = (e) => {
        setError('')
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        if (user) {
            setData({ name: user?.name, email: user?.email })
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 1500,
            });
            setError(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            toast.success("Profile Update successfully", {
                position: "top-right",
                autoClose: 1500,
            });
            navigate("/account")
            dispatch(loadUser())
            setError('')
            setUpdateProfile(false)
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, error, isUpdated, user, navigate, setUpdateProfile])

    const cancelButtonRef = useRef(null)
    return (
        <>
            <Transition.Root show={updateprofile} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setUpdateProfile}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-7">
                                    <div className="rounded-md shadow-sm -space-y-px">
                                        <div className='mb-4'>
                                            <label htmlFor="Name" >Name</label>
                                            <input
                                                id="Name"
                                                name="name"
                                                value={data.name}
                                                onChange={(e) => Hendeldata(e)}
                                                type="text"
                                                className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Enter your Name"
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="email-address" >Email address</label>
                                            <input
                                                id="email-address"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => Hendeldata(e)}
                                                type="email"
                                                className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                                                placeholder="Email address"
                                            />
                                        </div>
                                        <div className="flex items-center h-28 space-x-6">
                                            <div className="shrink-0">
                                                <img className="h-16 w-16 object-cover rounded-full" src={avatarPreview} alt="Current profile photo" />
                                            </div>
                                            <label className="block">
                                                <span className="sr-only">Choose profile photo</span>
                                                <input
                                                    type="file"
                                                    name="avatar"
                                                    accept="image/*"
                                                    onChange={(e) => updateProfileDataChange(e)}
                                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            onClick={updateProfileSubmit}
                                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            {
                                                loading ? (
                                                    <div className="flex justify-center items-center space-x-1 text-sm text-white-700">
                                                        <svg fill="none" className="w-6 h-6 -ml-2 animate-spin" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >
                                                            <path clipRule="evenodd" d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z" fill="currentColor" fillRule="evenodd" />
                                                        </svg>
                                                        <div>Loading ...</div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                            <circle cx="8.5" cy={7} r={4} />
                                                            <path d="M20 8v6M23 11h-6" />
                                                        </svg>
                                                        <span className="ml-3">Update</span>
                                                    </>
                                                )
                                            }
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            onClick={() => setUpdateProfile(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                        <ToastContainer />
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default UpdateProfile
