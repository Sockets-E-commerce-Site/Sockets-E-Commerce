import React from 'react'

/*
functional child Product component connected to the parent SingleProduct component which lists all details related to each individual product
*/

export default function Product(props) {
  const {
    id,
    invQuantity,
    title,
    description,
    photo,
    price,
    category
  } = props.product

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="md:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={photo}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {title}
            </h1>
            <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Qty Available: {invQuantity}
            </p>
            <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Category: {category}
            </p>
            <p className="leading-relaxed">Description: {description}</p>
            <p className="title-font font-medium text-2xl text-gray-900">
              ${price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
