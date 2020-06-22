import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createProduct} from '../../store/products'

class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      invQuantity: '',
      photo: '',
      category: '',
      price: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const {title, description, invQuantity, photo, category, price} = this.state
    this.props.createProduct({
      title,
      description,
      invQuantity,
      photo,
      category,
      price
    })
  }

  render() {
    const {title, description, invQuantity, photo, category, price} = this.state
    return (
      <div>
        <div className="flex mx-auto items-center justify-center shadow-lg mt-6 mx-8 mb-4 max-w-lg">
          <form
            className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
            onSubmit={this.handleSubmit}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <label
                  className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 "
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  placeholder="Title"
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <label
                  className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 "
                  htmlFor="title"
                >
                  Price
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  placeholder="Title"
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <label
                  className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 "
                  htmlFor="invQuantity"
                >
                  invQuantity
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  name="invQuantity"
                  value={invQuantity}
                  onChange={this.handleChange}
                  placeholder="invQuantity"
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <label
                  className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 "
                  htmlFor="title"
                >
                  Photo
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="photo"
                  value={photo}
                  onChange={this.handleChange}
                  placeholder="photo"
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <label
                  className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 "
                  htmlFor="title"
                >
                  Category
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="category"
                  value={category}
                  onChange={this.handleChange}
                  placeholder="category"
                  required
                />
              </div>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-48 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  placeholder="Type Your Comment"
                  required
                />
              </div>
              <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto" />
              <button
                type="submit"
                className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  createProduct: productInfo => dispatch(createProduct(productInfo))
})

export default connect(null, mapDispatch)(AddProduct)
