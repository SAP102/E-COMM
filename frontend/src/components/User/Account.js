import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UpdatePassword from './UpdatePassword'
import UpdateProfile from './UpdateProfile'

function Account() {
    // const navigate = useNavigate()
    const [updateprofile, setUpdateProfile] = useState(false)
    const [updatepassword, setUpdatePassword] = useState(false)

    const { user } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart)


    return (
        <>

            <div className="p-16 ">
                <div className="p-8 bg-white shadow mt-24 ml-[11%] mr-[11%]">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                            <div>
                                <p className="font-bold text-gray-700 text-xl">22</p>
                                <p className="text-gray-400">Order items</p>
                            </div>
                            <div>
                                <button onClick={() => setUpdateProfile(true)} className="text-white py-2 px-4 uppercase rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5" >
                                    Edit Profile
                                </button>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{cartItems.length}</p>
                                <p className="text-gray-400">Cart Item</p>
                            </div>
                        </div>
                        <div className="relative">
                            <img src={user?.avatar?.url} alt="" className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                            </img>
                        </div>

                        <div className="space-x-5 flex justify-between mt-32 md:mt-3 md:justify-center">
                            <button
                                className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                            >
                                My Order
                            </button>

                            <button
                            onClick={() => setUpdatePassword(true)}
                                className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>

                    <div className="mt-20 text-center border-b pb-12">
                        <h1 className="text-4xl font-medium text-gray-700">{user?.name}</h1>
                        <p className="font-light text-gray-600 mt-3">{user?.email}</p>

                        <p className="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
                        <p className="mt-2 text-gray-500">University of Computer Science</p>
                    </div>

                    <div className="mt-12 flex flex-col justify-center">
                        <p className="text-gray-600 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
                        <button
                            className="text-indigo-500 py-2 px-4  font-medium mt-4"
                        >
                            Show more
                        </button>
                    </div>

                </div>
            </div>
            {
                updateprofile && <UpdateProfile updateprofile={updateprofile} setUpdateProfile={setUpdateProfile} />
            }
            {
                updatepassword && <UpdatePassword updatepassword={updatepassword} setUpdatePassword={setUpdatePassword}/>
            }
        </>
    )
}

export default Account
