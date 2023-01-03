import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails, newReview } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import { Fragment } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Tab } from '@headlessui/react'
import { clearErrors } from '../../actions/userAction'
import { addItemsToCart } from '../../actions/cartAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NEW_REVIEV_RESET } from '../../constants/productConstants'

function Singleproduct() {
    const dispatch = useDispatch()
    const params = useParams()
    const { product, error } = useSelector((state) => state.productDetails)
    const { user } = useSelector((state) => state.user)
    const { success, error: reviewerror } = useSelector((state) => state.newReview)

    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState()
    const [rating, setRating] = useState()

    const increaseQuantity = () => {
        if (product?.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity))
        toast.success("Item added to cart", {
            position: "top-center",
            autoClose: 1500,
        });
    }

    const submitReview = () => {
        const myform = new FormData()

        myform.set("rating", rating)
        myform.set("comment", comment)
        myform.set("productId", params.id)
        dispatch(newReview(myform))

    }

    useEffect(() => {
        dispatch(getProductDetails(params.id))
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 1500,
            });
            dispatch(clearErrors())
        }
        if (reviewerror) {
            toast.error(reviewerror, {
                position: "top-right",
                autoClose: 1500,
            });
            dispatch(clearErrors())
        }
        if (success) {
            toast.success("Review Submitted Successfully", {
                position: "top-right",
                autoClose: 1500,
            });
            dispatch({ type: NEW_REVIEV_RESET })
        }
    }, [params.id, dispatch, error, reviewerror, success])

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    {/* Product */}
                    <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                        {/* Product image */}
                        <div className="lg:col-span-4 lg:row-end-1">
                            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                                {
                                    product?.images?.map((item) => {
                                        return (

                                            <img src={item.url} alt="" className="object-cover object-center" />
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* Product details */}
                        <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                            <div className="flex flex-col-reverse">
                                <div className="mt-4">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product?.name}</h1>

                                    <h2>
                                        Product information
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {product?.category?.category}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="sr-only">Reviews</h3>
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating, i) => (
                                            <StarIcon
                                                key={i}
                                                className={(
                                                    product?.ratings > rating ? 'text-yellow-400' : 'text-gray-300'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    {/* <p>{product?.ratings}</p> */}
                                    <p className="sr-only">{product?.ratings} out of 5 stars</p>
                                </div>
                            </div>

                            <p className="mt-6 text-gray-500">{product?.description}</p>

                            {
                                product?.Stock < 1 ? <p className="mt-6 text-gray-500">Ships in 3–4 weeks</p> : <p className="mt-6 text-gray-500">In stock</p>
                            }

                            {
                                product?.Stock < 1 ? "" : <div>

                                    <button onClick={decreaseQuantity}> - </button>
                                    <input readOnly type="number" value={quantity} />
                                    <button onClick={increaseQuantity}> + </button>
                                </div>
                            }

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                <span
                                    type="button"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Pay ₹{product?.price}
                                </span>

                            </div>

                            {
                                product?.Stock < 1 ? "" :
                                    <button
                                        onClick={addToCartHandler}
                                        type="button"
                                        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Add to cart
                                    </button>
                            }

                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                                <div className="prose prose-sm mt-4 text-gray-500">
                                    <ul role="list">
                                        <li>200+ SVG icons in 3 unique styles</li>
                                        <li>200+ SVG icons in 3 unique styles</li>
                                        <li>200+ SVG icons in 3 unique styles</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <h3 className="text-sm font-medium text-gray-900">License</h3>
                                <p className="mt-4 text-sm text-gray-500">
                                    For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.
                                    <a href='/' className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Read full license
                                    </a>
                                </p>
                            </div>

                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <h3 className="text-sm font-medium text-gray-900">Share</h3>
                                <ul role="list" className="mt-4 flex items-center space-x-6">
                                    <li>
                                        <a href="/" className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Share on Facebook</span>
                                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Share on Instagram</span>
                                            <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/" className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Share on Twitter</span>
                                            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Reviews section */}
                        <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                            <Tab.Group as="div">
                                <div className="border-b border-gray-200">
                                    <Tab.List className="-mb-px flex space-x-8">
                                        <Tab
                                            className={({ selected }) =>
                                            (
                                                selected
                                                    ? 'border-indigo-600 text-indigo-600'
                                                    : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                                                'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                                            )
                                            }
                                        >
                                            Customer Reviews
                                        </Tab>
                                    </Tab.List>
                                </div>

                                <Tab.Panels>
                                    <Tab.Panel className="-mb-10">
                                        <h3 className="sr-only">Customer Reviews</h3>
                                        {
                                            user ?
                                                <div className="flex items-start space-x-4">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            className="inline-block h-10 w-10 rounded-full"
                                                            src={user?.avatar?.url}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div>
                                                            <div className="border-b border-gray-200 focus-within:border-indigo-600">
                                                                <label htmlFor="comment" className="sr-only">
                                                                    Add your rating
                                                                </label>
                                                                <textarea
                                                                    rows={3}
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                    className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                                                                    placeholder="Add your comment..."
                                                                />
                                                            </div>
                                                            <label >
                                                                Add your rating
                                                            </label>
                                                            <input type="number" onChange={(e) => setRating(e.target.value)} value={rating} className='border-2' min={0} max={5} />
                                                            <div className="flex justify-between pt-2">
                                                                <div className="flex-shrink-0">
                                                                    <button
                                                                        onClick={submitReview}
                                                                        type="submit"
                                                                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                                    >
                                                                        Post
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                ""
                                        }

                                        {product?.reviews?.map((review, reviewIdx) => (
                                            <div key={review.id} className="flex space-x-4 text-sm text-gray-500">
                                                <div className="flex-none py-10">
                                                    {/* <img src={review.avatarSrc} alt="" className="h-10 w-10 rounded-full bg-gray-100" /> */}
                                                </div>
                                                <div className={(reviewIdx === 0 ? '' : 'border-t border-gray-200', 'py-10')}>
                                                    <h3 className="font-medium text-gray-900">{review.name}</h3>
                                                    <p>
                                                        {/* <time dateTime={review.datetime}>{review.date}</time> */}
                                                    </p>

                                                    <div className="mt-4 flex items-center">
                                                        {[0, 1, 2, 3, 4].map((rating) => (
                                                            <StarIcon
                                                                key={rating}
                                                                className={(
                                                                    review.rating > rating ? 'text-yellow-400' : 'text-gray-300'

                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="sr-only">{review.rating} out of 5 stars</p>

                                                    <div
                                                        className="prose prose-sm mt-4 max-w-none text-gray-500"
                                                        dangerouslySetInnerHTML={{ __html: review.comment }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>


            <>


            </>

        </>
    )
}

export default Singleproduct
