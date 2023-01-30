import React, { useEffect, useState } from 'react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, updatePassword, loadUser } from "../../actions/userAction"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

function UpdatePassword({ updatepassword, setUpdatePassword }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error, isUpdated, loading } = useSelector((state) => { return state.profile })
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = () => {
        dispatch(updatePassword(oldPassword, newPassword, confirmPassword))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 1500,
            });
            dispatch(clearErrors())
        }
        if (isUpdated === undefined) {
            toast.success("Password Update successfully", {
                position: "top-right",
                autoClose: 1500,
            });
            navigate("/account")
            dispatch(loadUser())
            setUpdatePassword(false)
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, isUpdated, navigate, setUpdatePassword])
    const cancelButtonRef = useRef(null)

    return (
        <>
            <Transition.Root show={updatepassword} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setUpdatePassword}>
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
                                            <input id="Name" name="name" value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)} type="password" required className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter Old Password" />
                                        </div>
                                        <div className='mb-4'>
                                            <input id="email-address" name="email" value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)} type="password" required className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4" placeholder="Enter New Password" />
                                        </div>
                                        <div className='mb-4'>
                                            <input id="email-address" name="email" value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)} type="txt" required className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4" placeholder="Enter Confirm Password" />
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            onClick={() => updatePasswordSubmit()}
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
                                                        <span className="ml-3">Update</span>
                                                    </>
                                                )
                                            }
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            onClick={() => setUpdatePassword(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                    <ToastContainer />
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default UpdatePassword
