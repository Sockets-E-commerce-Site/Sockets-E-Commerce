import React from 'react'

// individual orders for that User
// shown in Orders Link in navbar

const UsersOrders = props => {
  const {products} = props.order
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <div className="md:flex shadow-lg  mx-6 md:mx-auto my-10 max-w-lg md:max-w-1 h-64">
            <img
              className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6"
              src={product.photo}
            />
            <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
              <h4 className="text-xl text-gray-800 font-medium mr-auto">
                {product.title}
              </h4>
              <h4 className="text-gray-800 font-semibold tracking-tighter">
                ${product.price}
              </h4>
              <h4>{product.description}</h4>
              <h4 className="flex items-center justify-left mt-4 top-auto">
                Qty: {product.productOrder.productQuantity}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UsersOrders
