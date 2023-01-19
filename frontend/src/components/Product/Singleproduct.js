import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails, newReview } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import { Fragment } from 'react'
import { Disclosure, Tab } from '@headlessui/react'
import { clearErrors } from '../../actions/userAction'
import { addItemsToCart } from '../../actions/cartAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckIcon, HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { NEW_REVIEV_RESET } from '../../constants/productConstants'
import Dropdwon from '../layout/dropdown/Dropdown'
import { StarIcon } from '@heroicons/react/20/solid'

function Singleproduct() {

    const products = {
        details: [
            {
                name: 'Features',
                items: [
                    'Multiple strap configurations',
                    'Spacious interior with top zip',
                    'Leather handle and tabs',
                    'Interior dividers',
                    'Stainless strap loops',
                    'Double stitched construction',
                    'Water-resistant',
                ],
            }, {
                name: 'Features',
                items: [
                    'Multiple strap configurations',
                    'Spacious interior with top zip',
                    'Leather handle and tabs',
                    'Interior dividers',
                    'Stainless strap loops',
                    'Double stitched construction',
                    'Water-resistant',
                ],
            }, {
                name: 'Features',
                items: [
                    'Multiple strap configurations',
                    'Spacious interior with top zip',
                    'Leather handle and tabs',
                    'Interior dividers',
                    'Stainless strap loops',
                    'Double stitched construction',
                    'Water-resistant',
                ],
            }, {
                name: 'Features',
                items: [
                    'Multiple strap configurations',
                    'Spacious interior with top zip',
                    'Leather handle and tabs',
                    'Interior dividers',
                    'Stainless strap loops',
                    'Double stitched construction',
                    'Water-resistant',
                ],
            },
        ],
    }

    const dispatch = useDispatch()
    const params = useParams()
    const { product, error } = useSelector((state) => state.productDetails)
    const { user } = useSelector((state) => state.user)
    const { success, error: reviewerror } = useSelector((state) => state.newReview)

    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState()
    const [selected, setSelected] = useState()

    const checkUserRating = product?.reviews && product?.reviews.find((val) => {
        return val.name === user?.name
    })

    useEffect(() => {
        setSelected(
            checkUserRating?._id ?
                {
                    id: checkUserRating?.rating,
                    name: `${checkUserRating?.rating} star`,
                    avatar:
                        <>
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                    key={rating}
                                    className={(
                                        checkUserRating.rating > rating ? 'text-yellow-400 w-[20px]' : 'text-gray-300 w-[20px]'

                                    )}
                                    aria-hidden="true"
                                />
                            ))}
                        </>
                } :
                {
                    id: 1,
                    name: "1 star",
                    avatar:
                        <StarIcon
                            className="text-yellow-400 w-[20px]"
                            aria-hidden="true"
                        />
                }
        )
    }, [product?.review, checkUserRating])

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
        myform.set("rating", selected.id)
        myform.set("comment", comment)
        myform.set("productId", params.id)
        dispatch(newReview(myform))
        setComment('')
        setSelected(selected)
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
            <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    {/* Product */}
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/*  Image gallery */}
                        <Tab.Group as="div" className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                                <Tab.List className="grid grid-cols-4 gap-6">
                                    {product?.images?.map((image) => (
                                        <Tab
                                            key={image?.id}
                                            className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className="sr-only"> Image </span>
                                                    <span className="absolute inset-0 overflow-hidden rounded-md">
                                                        <img src={image?.url} alt="" className="h-full w-full object-cover object-center" />
                                                    </span>
                                                    <span
                                                        className={(
                                                            selected ? 'ring-indigo-500' : 'ring-transparent',
                                                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </Tab>
                                    ))}
                                </Tab.List>
                            </div>
                            <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                                {product?.images?.map((image) => (
                                    <Tab.Panel key={image?.id}>
                                        <img
                                            src={image?.url}
                                            className="h-full w-full object-cover object-center sm:rounded-lg"
                                        />
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>
                        {/* Product details */}
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product?.name}</h1>
                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900">₹{product?.price}</p>
                            </div>
                            {/* Reviews */}
                            <div className="mt-3">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center w-[30%]">
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
                                    <p className="sr-only">{product?.ratings} out of 5 stars</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>
                                <div
                                    className="space-y-6 text-base text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: product?.description }}
                                />
                            </div>
                            {
                                product?.Stock < 1 ?
                                    <div className="mt-6 flex items-center">
                                        <p className="ml-2 text-sm text-gray-500">Ships in 3–4 weeks</p>
                                    </div>
                                    :
                                    <div className="mt-6 flex items-center">
                                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                                        <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                                    </div>
                            }
                            {
                                product?.Stock < 1 ? "" : <div>
                                    <button onClick={() => decreaseQuantity()}> ------------ </button>
                                    <input readOnly type="number" value={quantity} />
                                    <button onClick={() => increaseQuantity()}> ++++++++++++ </button>
                                </div>
                            }
                            <div className="mt-6">
                                {
                                    product?.Stock < 1 === product?.Stock < 1 &&
                                    <div className="mt-10 flex">
                                        <button
                                            type="button"
                                            onClick={addToCartHandler}
                                            className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                        >
                                            Add to bag
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                        >
                                            <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                            <span className="sr-only">Add to favorites</span>
                                        </button>
                                    </div>
                                }
                            </div>
                            <section aria-labelledby="details-heading" className="mt-12">
                                <h2 id="details-heading" className="sr-only">
                                    Additional details
                                </h2>
                                <div className="divide-y divide-gray-200 border-t">
                                    {products.details.map((detail) => (
                                        <Disclosure as="div" key={detail.name}>
                                            {({ open }) => (
                                                <>
                                                    <h3>
                                                        <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                                            <span
                                                                className={(
                                                                    open ? 'text-indigo-600' : 'text-gray-900',
                                                                    'text-sm font-medium'
                                                                )}
                                                            >
                                                                Features
                                                            </span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon
                                                                        className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <PlusIcon
                                                                        className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                                                        <ul role="list">
                                                            {detail.items.map((item) => (
                                                                <li key={item}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                    <hr />
                    {/* Add Reviews section */}
                    {
                        user ?
                            <div className="flex items-start w-[30%] space-x-4">
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
                                        <Dropdwon selected={selected} setSelected={setSelected} />
                                        {/* <input type="number" onChange={(e) => setSelected(e.target.value)} value={rating} className='border-2' min={0} max={5} /> */}
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
                            <div className="p-3 text-center m-2 bg-[#E5EBEC]">
                                Plese Login to add review
                            </div>
                    }
                    {/* Reviews section */}
                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                            <h2 className="text-lg font-medium text-gray-900">Recent reviews</h2>
                            <div className="mt-6 space-y-10 divide-y divide-gray-200 border-t border-b border-gray-200 pb-10">
                                {product?.reviews?.length > 0 ? product?.reviews?.map((review, reviewIdx) => (
                                    <div key={review.id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
                                        <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                                            <div className="flex items-center xl:col-span-1">
                                                <div className="w-[30%] flex items-center">
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
                                                <p className="ml-3 text-sm text-gray-700">
                                                    {review.rating}
                                                    <span className="sr-only"> out of 5 stars</span>
                                                </p>
                                            </div>
                                            <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                                                <h3 className="text-sm font-medium text-gray-900">Comment</h3>
                                                <p className="mt-3 space-y-6 text-sm text-gray-500">{!review?.comment ? review?.comment : "No any comment"}</p>
                                                {/* <div
                                                    className="mt-3 space-y-6 text-sm text-gray-500"
                                                    dangerouslySetInnerHTML={{ __html: review.comment ? review.comment : "fghjk,l." }}
                                                /> */}
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                                            <p className="font-medium text-gray-900">{review.name}</p>
                                        </div>
                                    </div>
                                )) : <div className="p-3 text-center m-2 bg-[#E5EBEC]">
                                    review Not at
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </main>
        </>
    )
}

export default Singleproduct
