import React, { useState } from 'react'
import Sidebar from '../Sidebar'

function CreateProduct() {

  const [productinfo, setproductinfo] = useState()

  return (
    <div className="flex min-h-[640px]">
      <div className="flex w-64 flex-col">
        <Sidebar />
      </div >
      <div className="w-full">
      </div>
    </div>
  )
}

export default CreateProduct
