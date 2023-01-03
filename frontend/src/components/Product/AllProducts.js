import React from 'react'
import { getAllProduct } from "../../actions/productAction"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'


function AllProducts({ searchField }) {
    const dispatch = useDispatch()
    const { allProduct, productsCount, resultsPerPage, filteredProductCount } = useSelector(state => state.allProduct)
    
    // function removeDuplicates(originalArray, prop) {
    //     var newArray = [];
    //     var lookupObject = {};

    //     for (var i in originalArray) {
    //         lookupObject[originalArray[i][prop]] = originalArray[i];
    //     }

    //     for (i in lookupObject) {
    //         newArray.push(lookupObject[i]);
    //     }
    //     return newArray;
    // }

    // var uniqueArray = removeDuplicates(allProduct, "category");
    // console.log("🚀 ~ file: AllProducts.js ~ line 39 ~ AllProducts ~ uniqueArray", uniqueArray)

    // const category = uniqueArray?.map(item => {
    //     return item.category
    // })



    const [page, setPage] = useState(1)
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    // const [categorys, setCAtegorys] = useState('')


    const priceHendler = () => {
        dispatch(getAllProduct(page, minPrice, maxPrice))
        // setCAtegorys('')
        setMinPrice()
        setMaxPrice()
    }

    const [product, setProduct] = useState(6)
    useEffect(() => {
        dispatch(getAllProduct(page, minPrice, maxPrice))
    }, [page, minPrice, maxPrice, dispatch])

    return (
        <>
            <div className="bg-white">
                <div>
                    <main className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="border-b border-gray-200 pb-10">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
                            <p className="mt-4 text-base text-gray-500">
                                Checkout out the latest release of Basic Tees, new and improved with four openings!
                            </p>
                        </div>

                        <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-5">
                            <div>
                                <div className="hidden lg:block">
                                    <div className="space-y-10">
                                        <h1>category</h1>
                                        {/* <ul>
                                            {
                                                category.map((item, ind) => {
                                                    return (
                                                        <>
                                                            <div className='flex items-center' >
                                                                <input type="checkbox" value={item} name="" id="" onChange={(e) => setCAtegorys(e.target.value)} />
                                                                <label htmlFor="" className="ml-3 text-sm text-gray-600">
                                                                    {item}
                                                                </label>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                )}
                                        </ul> */}
                                    </div>
                                </div>
                                <hr />
                                <div className='pt-2'>
                                    <h1>price</h1>
                                    <label className="ml-3 text-sm text-gray-600">₹1000 - ₹5000</label>
                                    <label className="ml-3 text-sm text-gray-600">₹5000 - ₹10,000</label>
                                    <label className="ml-3 text-sm text-gray-600">₹5000 - ₹10,000</label>
                                    <input className='border-solid border-2 mb-1' placeholder='0' type="number" value={minPrice} onChange={(e) => { setMinPrice(e.target.value) }} />
                                    <input className='border-solid border-2' placeholder='0' type="number" value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value) }} />
                                </div>
                                <div className='mt-3'>
                                    <button className='pl-[10%] border-solid border-2 outline hover:outline-1' onClick={() => { priceHendler() }} >Go</button>
                                    <button className='ml-[10%] border-solid border-2 outline hover:outline-1' onClick={() => { priceHendler() }} >Clear all</button>
                                </div>

                            </div>

                            {/* Product grid */}
                            <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-4">
                                {/* Replace with your content */}

                                <div className="h-96 rounded-lg px-6 border-4 border-dashed border-gray-200 lg:h-full">
                                    <>
                                        <section aria-labelledby="favorites-heading">
                                            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8 lg:gap-y-8">
                                                {allProduct?.filter((val) => {
                                                    if (searchField === "") {
                                                        return val;
                                                    } else if (val.name.toLowerCase().includes(searchField.toLowerCase())) {
                                                        return val;
                                                    } else if (val?.category.category.toLowerCase().includes(searchField.toLowerCase())) {
                                                        return val;
                                                    } else {
                                                        return false;
                                                    }
                                                }).map((product, ind) => (
                                                    <div key={ind} className="group relative">
                                                        <Link to={`/product/${product._id}`} >

                                                            <div className="overflow-hidden rounded-lg group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-auto">
                                                                <img
                                                                    src={product.images[0].url}
                                                                    alt={product.imageAlt}
                                                                    className="h-96 w-full  overflow-hidden object-cover object-center"
                                                                />
                                                            </div>
                                                            <h3 className="mt-4 text-base font-semibold text-gray-900">
                                                                <a href={product.href}>
                                                                    <span className="absolute inset-0" />
                                                                    {product.name}
                                                                </a>
                                                            </h3>
                                                            <p className="mt-1 text-sm text-gray-500">₹ {product.price}</p>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-6 sm:hidden">
                                                <a href="/" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                                                    Browse all favorites
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </a>
                                            </div>

                                        </section>
                                    </>
                                </div>
                                <div>
                                    {/* <Pagination
                                    activePage={page}
                                    itemsCountPerPage={resultsPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={currentPageNo}
                                    nextPageText="Next"
                                    prevPageText="prev"
                                    firstPageText='1st'
                                    lastPageText="Last"
                                    itemClass='page-item'
                                    linkClass='page-link'
                                    activeClass='pageItemActive'
                                    activeLinkClass='pageLinkActive'
                                    /> */}
                                </div>
                                <nav
                                    className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                                    aria-label="Pagination"
                                >
                                    <div className="hidden sm:block">
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{filteredProductCount}</span> to <span className="font-medium">{resultsPerPage}</span> of{' '}
                                            <span className="font-medium">{productsCount}</span> results page<span className="font-medium">{page}</span>
                                        </p>
                                    </div>

                                    <div className="flex flex-1 justify-between sm:justify-end">

                                        {
                                            resultsPerPage < productsCount && (
                                                <div>
                                                    <button disabled={page === 1 ? true : false}
                                                        onClick={() => {
                                                            setPage(page - 1)
                                                            setProduct(product - 6)
                                                        }} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                        Previous
                                                    </button>

                                                    <button
                                                        disabled={
                                                            product >= productsCount ? true : false
                                                        }
                                                        onClick={() => {
                                                            setPage(page + 1)
                                                            setProduct(product + 6)
                                                        }}
                                                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            )
                                        }

                                    </div>
                                </nav>
                                {/* /End replace */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default AllProducts
