import React, { useEffect, useState } from 'react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, forgotPassword } from "../../actions/userAction"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'



function ForgotPassword({setForgotPass,forgotPass}) {
    const dispatch = useDispatch()
    const { error, message} = useSelector((state) => state.forgotPassword)
    const [email , setEmail] = useState("")

    const sendemail = () =>{
    dispatch(forgotPassword(email));
    }

    useEffect(()=>{
        if(error){
            toast.error(error, {
                position: "top-right",
                autoClose: 1500,
            });
            dispatch(clearErrors())
        }
        if (message) {
            toast.success(message, {
                position: "top-right",
                autoClose: 1500,
            });
            setForgotPass(false)
        }
    },[error,dispatch,message,setForgotPass])

    const cancelButtonRef = useRef(null)

  return (
    <>
    <Transition.Root show={forgotPass} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setForgotPass}>
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
                                    {/* <label htmlFor="email-address" >Confirm Password</label> */}
                                    <input id="email-address" name="email"
                                        onChange={(e) => setEmail(e.target.value)} type="email" required className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4" placeholder="Enter Email" />
                                </div>
                                
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                    onClick={sendemail}
                                >
                                    Send
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                    onClick={() => setForgotPass(false)}
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

export default ForgotPassword
