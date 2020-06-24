import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/products'
import ProductAdminList from './ProductAdminList'
import ErrorPage from '../Utility/ErrorPage'

class AdminProducts extends Component {
  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const {products} = this.props
    return (
      <div className="md:px-32 py-8 w-full">
        <div className="shadow overflow-hidden rounded border-b border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Title
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Description
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  invQuantity
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Photo
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Category
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Price
                </th>
              </tr>
            </thead>
            {products ? (
              <tbody className="text-gray-700">
                {products.map(product => (
                  <ProductAdminList product={product} key={product.id} />
                ))}
              </tbody>
            ) : (
              <ErrorPage />
            )}
          </table>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})
const mapDispatch = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AdminProducts)
