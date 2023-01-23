import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Country, State } from 'country-state-city'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import ConfirmStep from '../page/ConfirmStep';


function Sahipping() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { shippingInfo } = useSelector((state) => state.cart);

    const [shippinginfo, setShippingInfo] = useState({
        address: shippingInfo?.address,
        city: shippingInfo?.city,
        state: shippingInfo?.state,
        country: shippingInfo?.country,
        pinCode: shippingInfo?.pinCode,
        phoneNo: shippingInfo?.phoneNo,
        email: shippingInfo?.email,
        fristname: shippingInfo?.fristname,
        lastname: shippingInfo?.lastname
    })

    const hendelchange = (e) => {
        setShippingInfo({ ...shippinginfo, [e.target.name]: e.target.value })
    }
    const shippingSubmit = (e) => {
        e.preventDefault()
        if (shippinginfo.phoneNo.length < 10 || shippinginfo.phoneNo.length > 10) {
            toast.error("Phone Number should be 10 digits long", {
                position: "top-right",
                autoClose: 1500,
            })
            return;
        }
        dispatch(saveShippingInfo({
            address: shippinginfo?.address,
            city: shippinginfo.city,
            state: shippinginfo.state,
            country: shippinginfo.country,
            pinCode: shippinginfo.pinCode,
            phoneNo: shippinginfo.phoneNo,
            email: shippinginfo.email,
            fristname: shippinginfo.fristname,
            lastname: shippinginfo.lastname
        }))
        navigate("/order/confirmorder")
    }
    return (
        <>
            <ConfirmStep />
            <div class="text-gray-600 sm:mt-4 px-[44%]">
                <p class="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
            </div>
            <div className="mt-10 sm:mt-1">
                <div className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div>
                            <div className="shadow overflow-hidden sm:rounded-md pl-[17%]">
                                <div className="px-4 py-5 bg-white sm:p-6 ">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="col-span-1">
                                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First name</label>
                                            <input type="text" name="fristname"
                                                value={shippinginfo?.fristname}
                                                required onChange={(e) => hendelchange(e)} id="first_name" autoComplete="given-name" className="mt-1 bg-gray-500/30 px-3 py-2 rounded-md focus:outline-none" />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last name</label>
                                            <input type="text"
                                                name="lastname"
                                                value={shippingInfo?.lastname}
                                                required onChange={(e) => hendelchange(e)}
                                                id="last_name" autoComplete="family-name" className="mt-1 bg-gray-500/30 px-3 py-2 rounded-md focus:outline-none" />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Email address</label>
                                            <input type="text" name="email"
                                                value={shippinginfo.email}
                                                required onChange={(e) => hendelchange(e)} id="email_address" autoComplete="email" className="mt-1 bg-gray-500/30 px-3 py-2 rounded-md focus:outline-none" />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="number" className="block text-sm font-medium text-gray-700">Mobile No.</label>
                                            <input type="text"
                                                name="phoneNo"
                                                value={shippinginfo.phoneNo}
                                                required onChange={(e) => hendelchange(e)} id="email_address" autoComplete="number" className="mt-1 bg-gray-500/30 px-3 py-2 rounded-md focus:outline-none" />
                                        </div>
                                        <div className="col-span-1 pr-[45%]">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country / Region</label>
                                            <select id="country" name="country"
                                                value={shippinginfo.country}
                                                onChange={(e) => hendelchange(e)}
                                                autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">

                                                {Country &&
                                                    Country.getAllCountries().map((item) => (
                                                        <option key={item.isoCode} value={item.isoCode}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">Street address</label>
                                            <input type="text" name="address"
                                                value={shippinginfo.address}
                                                required onChange={(e) => hendelchange(e)} id="street_address" autoComplete="street-address" className="mt-1 bg-gray-500/30 px-3 py-2 rounded-md focus:outline-none" />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                            <input type="text" name="city" id="city"
                                                value={shippinginfo.city}
                                                required onChange={(e) => hendelchange(e)} className="mt-1 bg-gray-500/30 px-3 py-2 rounded-md focus:outline-none" />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                                            <input type="text" name="state" value={shippinginfo.state}
                                                onChange={(e) => hendelchange(e)} id="state" className="mt-1 bg-gray-500/30 px-3 py-2 rounded-md focus:outline-none" />
                                        </div>
                                        <div className="col-span-1">
                                            <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">ZIP / Postal</label>
                                            <input type="text" id="postal_code" autoComplete="postal-code" name="pinCode"
                                                value={shippingInfo.pinCode}
                                                onChange={(e) => hendelchange(e)} className="mt-1 bg-gray-500/30 px-3 py-2 rounded-md focus:outline-none" />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button type="submit" onClick={shippingSubmit} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sahipping
