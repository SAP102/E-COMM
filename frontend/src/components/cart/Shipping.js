import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Country, State } from 'country-state-city'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';


function Sahipping() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault()
        if (phoneNo.length < 10 || phoneNo.length > 10) {
            toast.error("Phone Number should be 10 digits long", {
                position: "top-right",
                autoClose: 1500,
            })
            return;
        }
        dispatch(
            saveShippingInfo({
                address,
                city,
                state,
                country,
                pinCode,
                phoneNo
            })
        )
        navigate("/order/confirmorder")

    }
    return (

        <>
            <div className="bg-white px-4 py-16 pl-[17%] shadow sm:rounded-lg ">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Chekout Information</h3>
                        <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <div className="grid grid-cols-6 gap-6">

                            <div className="col-span-6 sm:col-span-4">
                                <label htmlFor="Phone-Number" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="number"
                                    name="Phone-Number"
                                    id="Phone-Number"
                                    value={phoneNo}
                                    required onChange={(e) => setPhoneNo(e.target.value)}
                                    className="mt-1 block w-[50%] h-8 rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lh-[2 rem]"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Country
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="mt-1 block w-[50%] rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option>country</option>
                                    {Country &&
                                        Country.getAllCountries().map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            {
                                country &&
                                <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        State
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        required
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="mt-1 block w-[50%] rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="">State</option>
                                        {State &&
                                            State.getStatesOfCountry(country).map((item) => (

                                                <option key={item.isoCode} value={item.isoCode}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            }

                            <div className="col-span-6">
                                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                    Street address
                                </label>
                                <textarea
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    value={address}
                                    required onChange={(e) => setAddress(e.target.value)}
                                    className="mt-1 block w-[40%] rounded-md border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={city}
                                    required onChange={(e) => setCity(e.target.value)}
                                    className="mt-1 blockw-[50%] h-8 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                    ZIP / Postal code
                                </label>
                                <input
                                    type="text"
                                    name="postal-code"
                                    id="postal-code"
                                    value={pinCode}
                                    required onChange={(e) => setPinCode(e.target.value)}
                                    className="mt-1 block w-[50%] h-8 border-2  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>


                        </div>
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <button
                                onClick={shippingSubmit}
                                type="submit"
                                className="mt-8 flex w-[51%] items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                continue
                            </button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Sahipping
