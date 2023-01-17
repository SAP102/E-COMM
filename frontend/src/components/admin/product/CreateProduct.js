import React from 'react'
import Sidebar from '../Sidebar'

function CreateProduct() {
  return (
    <div className="flex min-h-[640px]">
      <div className="flex w-64 flex-col">
        <Sidebar />
      </div >
      <div className="w-full">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-medium  leading-6 text-gray-900">Create Product</h3>

          <div>
            <label htmlFor="name">Product Name</label>
            <input type="text" className='border-2' />
          </div>
          <div>
            <label htmlFor="name">
              description
            </label>
            <textarea type="" className='border-2' />
          </div>
        </div>
        <div>
          <label>
            Price
          </label>
          <input type="number" className='border-2' />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Categoery
          </label>
          <select
            id="location"
            name="location"
            className="mt-1 block w-[20%] rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue="Canada"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
