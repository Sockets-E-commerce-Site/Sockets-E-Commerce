import React from 'react'

// individual orders for that User
// shown in Orders Link in navbar

const UsersOrders = props => {
  const {products} = props.order
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h1>{product.title}</h1>
          <h1>{product.price}</h1>
          <h1>{product.productOrder.productQuantity}</h1>
        </div>
      ))}
    </div>
  )
}

export default UsersOrders
