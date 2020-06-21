import React, {Component} from 'react'

export default class AddProduct extends Component {
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
  }
  render() {
    return (
      <div className="w-full max-w-6xl min-w-0 mx-auto px-6">
        <div className="flex mt-12 bg-white rounded-md shadow">
          <div className="flex-grow">
            <div className="flex flex-col mx-40 mt-20">
              <div className="flex items-center mb-4">
                <label
                  htmlFor="title"
                  className="w-24 font-semibold text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  className="flex-grow border border-red-200 rounded py-1 px-3"
                  name="title"
                  placeholder="Title"
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="category"
                  className="w-24 font-semibold text-gray-700"
                >
                  category
                </label>
                <input
                  type="text"
                  clasclassNames="flex-grow border border-red-200 rounded py-1 px-3"
                  placeholder="category"
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="price"
                  className="w-24 font-semibold text-gray-700"
                >
                  price
                </label>
                <input
                  type="number"
                  className="flex-grow border border-red-200 rounded py-1 px-3"
                  placeholder="price"
                  name="price"
                  min={1}
                  required
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="invQuantity"
                  className="w-24 font-semibold text-gray-700"
                >
                  invQuantity
                </label>
                <input
                  type="number"
                  className="flex-grow border border-red-200 rounded py-1 px-3"
                  placeholder="invQuantity"
                  min={1}
                  name="invQuantity"
                  required
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="photo"
                  className="w-24 font-semibold text-gray-700"
                >
                  Photo
                </label>
                <input
                  type="text"
                  className="flex-grow border border-red-200 rounded py-1 px-3"
                  placeholder="invQuantity"
                  accept="image/png, image/jpeg"
                  name="photo"
                  min={1}
                  required
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="description"
                  className="w-24 font-semibold text-gray-700"
                />
                <textarea
                  className="flex-grow border border-red-200 rounded py-1 px-3"
                  name="description"
                  id="description"
                  rows="8"
                />
              </div>
              <div className="flex items-center mb-4">
                <button
                  type="button"
                  className="py-1 px-4 bg-red-800 text-red-100 font-semibold hover:bg-red-900 hover:shadow border border-red-200 rounded mr-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="py-1 px-4 bg-white text-red-700 font-semibold hover:shadow border border-red-200 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
