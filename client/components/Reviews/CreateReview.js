import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCreatedReview} from '../../store/reviews'

// form
// review from for creating a review for product
class CreateReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      rating: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // ProductID from SingleProduct component from this.props.match.params
  // maybe check form number validations?
  handleSubmit(e) {
    e.preventDefault()
    const {title, content, rating} = this.state
    const {productId} = this.props
    this.props.createdReview({
      title,
      content,
      rating,
      productId
    })
    this.setState({
      title: '',
      content: '',
      rating: ''
    })
  }

  render() {
    const {rating, title, content} = this.state
    return (
      <div>
        <div className="flex mx-auto items-center justify-center shadow-lg mt-6 mx-8 mb-4 max-w-lg">
          <form
            className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
            onSubmit={this.handleSubmit}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                Add a Review
              </h2>
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
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-48 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  type="text"
                  name="content"
                  value={content}
                  onChange={this.handleChange}
                  placeholder="Type Your Comment"
                  required
                />
              </div>
              <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto" />
              <div className="-mr-1">
                <label
                  className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 "
                  htmlFor="rating"
                >
                  Rating
                </label>
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={0.01}
                  name="rating"
                  value={rating}
                  onChange={this.handleChange}
                />
                <button
                  type="submit"
                  className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                >
                  Post Review
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user.id
})

const mapDispatch = dispatch => ({
  createdReview: productInfo => dispatch(fetchCreatedReview(productInfo))
})
export default connect(mapState, mapDispatch)(CreateReview)
