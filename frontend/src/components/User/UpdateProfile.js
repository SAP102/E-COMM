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
    const { error, isUpdated } = useSelector((state) => state.profile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")


    const updateProfileSubmit = (e) => {
        e.preventDefault()
        const myform = new FormData()
        myform.set("name", name)
        myform.set("email", email)
        myform.set("avatar", avatar)
        dispatch(updateProfile(myform))
    }

    const updateProfileDataChange = (e) => {
        // setAvatar(e.target.files[0])
        // setAvatarPreview(URL.createObjectURL(e.target.files[0]))
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
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 1500,
            });
            dispatch(clearErrors())
        }
        if (isUpdated) {
            toast.success("Profile Update successfully", {
                position: "top-right",
                autoClose: 1500,
            });
            navigate("/account")
            dispatch(loadUser())
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
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-7">
                                    <div className="rounded-md shadow-sm -space-y-px">
                                        <div className='mb-4'>
                                            <label htmlFor="Name" >Name</label>
                                            <input id="Name" name="name" value={name}
                                                onChange={(e) => setName(e.target.value)} type="text" required className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your Name" />
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="email-address" >Email address</label>
                                            <input id="email-address" name="email" value={email}
                                                onChange={(e) => setEmail(e.target.value)} type="email" required className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4" placeholder="Email address" />
                                        </div>
                                        {/* <div className='mb-2 pt-3'>
                                            <img src={avatarPreview} alt="Avatar Preview" className='w-20 m-auto' />
                                            <input
                                                type="file"
                                                name="avatar"
                                                accept="image/*" onChange={() => updateProfileDataChange()} className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2" />
                                        </div> */}
                                        <div class="flex items-center h-28 space-x-6">
                                            <div class="shrink-0">
                                                <img class="h-16 w-16 object-cover rounded-full" src={avatarPreview} alt="Current profile photo" />
                                            </div>
                                            <label class="block">
                                                <span class="sr-only">Choose profile photo</span>
                                                <input type="file" name="avatar" accept="image/*" onChange={(e) => updateProfileDataChange(e)} class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 " />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                            onClick={updateProfileSubmit}
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
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
