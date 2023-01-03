import React, { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RatingStar } from "rating-star";
import { ALL_PRODUCT_REQUEST } from '../../constants/productConstants';
import { Link } from 'react-router-dom';


function Product({ products }) {

  // console.log("🚀 ~ file: Product.js ~ line 4 ~ Product ~ products", products.ratings)

  return (
    <>

      <section aria-labelledby="favorites-heading">
        <div className="mx-auto max-w-7xl py-28 ` px-4 sm:py-[16rem] sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-gray-900">
              Our Favorites
            </h2>
            <Link to="/products" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
              Browse all favorites
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
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
            <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              Browse all favorites
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Product



// item && products.map((product) => {
//   return <Product products={product}/>
// })
// }