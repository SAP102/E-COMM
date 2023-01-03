import React from 'react'
import { TrashIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { removeItemsFromCart } from '../../actions/cartAction'
import { useNavigate } from 'react-router-dom'


function ConfirmOrder() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
  const shippingCharge = subtotal > 1000 ? 0 : 100
  const tax = subtotal * 0.18
  const totalPrice = subtotal + shippingCharge + tax

  const removeItems = (id) => {
    dispatch(removeItemsFromCart(id))
  }

  const proceedToPayment = () =>{
    const data = {
      subtotal,
      shippingCharge,
      tax,
      totalPrice
    }

    sessionStorage.setItem("orderInfo", JSON.stringify(data))
    navigate("/process/payment")
  }

  return (
    <>
      <div className="bg-gray-50">
        {/* Mobile menu */}
        <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h1 className="sr-only">Checkout</h1>

            <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <div>
                <div>
                  <h2 className="text-xl font-medium text-gray-900">Contact information</h2>

                  <div className="mt-4">
                    <label htmlFor="email-address" className="block text-lg font-medium text-gray-600">
                      Email address : {user?.email}
                    </label>
                  </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                  <h2 className="text-xl font-medium text-gray-900">Shipping information</h2>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="first-name" className="block text-lg font-medium text-gray-600">
                        First name : {user?.name}
                      </label>

                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-lg font-medium text-gray-600">
                        Address : {shippingInfo.address}
                      </label>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-lg font-medium text-gray-600">
                        City : {shippingInfo.city}
                      </label>

                    </div>

                    <div>
                      <label htmlFor="country" className="block text-lg font-medium text-gray-600">
                        Country : {shippingInfo.country}
                      </label>

                    </div>

                    <div>
                      <label htmlFor="region" className="block text-lg font-medium text-gray-600">
                        State / Province : {shippingInfo.state}
                      </label>

                    </div>

                    <div>
                      <label htmlFor="postal-code" className="block text-lg font-medium text-gray-600">
                        Postal code : {shippingInfo.pinCode}
                      </label>

                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="block text-lg font-medium text-gray-600">
                        Phone No : {shippingInfo.phoneNo}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="mt-10 lg:mt-0">
                <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul className="divide-y divide-gray-200">
                    {cartItems.map((product) => (
                      <li key={product.id} className="flex py-6 px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <img src={product.image} alt="" className="w-20 rounded-md" />
                        </div>

                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm">
                                <p className="font-medium text-gray-700 hover:text-gray-800">
                                  {product.name}
                                </p>
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">Category : {product.category}</p>
                              <p className="mt-1 text-sm text-gray-500">Qty : {product.quantity}</p>
                            </div>

                            <div className="ml-4 flow-root flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => removeItems(product.product)}
                                className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Remove</span>
                                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">₹{product.price * product.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Subtotal</dt>
                      <dd className="text-sm font-medium text-gray-900">₹{subtotal}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Shipping</dt>
                      <dd className="text-sm font-medium text-gray-900">₹{shippingCharge}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-900">₹{tax}</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dt className="text-base font-medium">Total</dt>
                      <dd className="text-base font-medium text-gray-900">₹{totalPrice}</dd>
                    </div>
                  </dl>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <button
                      type="submit"
                      onClick={proceedToPayment}
                      className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Confirm order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}

export default ConfirmOrder
