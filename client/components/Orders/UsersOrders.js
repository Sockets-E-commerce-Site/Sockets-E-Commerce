import React from 'react'

// individual orders for that User
// shown in Orders Link in navbar

const UsersOrders = props => {
  const {products} = props.order
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h4>{product.title}</h4>
          <h4>{product.price}</h4>
          <img src={product.photo} />
          <h4>{product.description}</h4>
          <h4>{product.productOrder.productQuantity}</h4>
        </div>
      ))}
    </div>
  )
}

export default UsersOrders
