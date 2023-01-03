import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../Sidebar'

function ProductList() {
  const { allProduct } = useSelector(state => state.allProduct)
  console.log("🚀 ~ file: ProductList.js:7 ~ ProductList ~ allProduct", allProduct)
  return (
    <>
      <div className="flex min-h-[640px]">
        <div className="flex w-64 flex-col">
          <Sidebar />
        </div >
        <div className="w-full">
          <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-medium  leading-6 text-gray-900">All Product</h3>
            <div className='flex items-center justify-between w-full mt-9 rounded-lg border-4 border-dashed border-gray-200 p-2'>
              <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                  <h2 className="sr-only">Products</h2>

                  <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {allProduct.map((product) => (
                      <a key={product.id} className="group">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg  xl:aspect-w-7 xl:aspect-h-8">
                          <img
                            src={product.images[0].url}
                            alt={product.imageAlt}
                            className="h-[308px] object-contain group-hover:opacity-75 mx-auto"
                          />
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default ProductList
