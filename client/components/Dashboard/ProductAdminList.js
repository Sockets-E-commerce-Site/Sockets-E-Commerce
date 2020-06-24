import React from 'react'

const ProductAdminList = props => {
  const {title, description, price, invQuality, category, photo} = props.product
  return (
    <tr>
      <td className="w-1/3 text-left py-3 px-4">{title}</td>
      <td className="w-1/3 text-left py-3 px-4">{description}</td>
      <td className="w-1/3 text-left py-3 px-4">{price}</td>
      <td className="w-1/3 text-left py-3 px-4">{invQuality}</td>
      <td className="w-1/3 text-left py-3 px-4">{category}</td>
      <td className="w-1/3 text-left py-3 px-4">{photo}</td>
    </tr>
  )
}

export default ProductAdminList
