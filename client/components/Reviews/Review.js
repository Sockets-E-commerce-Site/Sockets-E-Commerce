import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedReview} from '../../store/reviews'

class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      rating: '',
      content: '',
      title: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const {rating, title, content} = this.props.review
    this.setState({
      rating,
      title,
      content
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const {productId} = this.props
    const {rating, title, content} = this.state
    this.props.updateReview({rating, title, content}, productId)
    this.setState({editMode: false})
  }

  render() {
    const {editMode, rating, content, title} = this.state
    const {review, user} = this.props
    return (
      <div className="flex mx-auto items-center justify-center shadow-lg mt-6 mx-8 mb-4 max-w-lg">
        {!editMode ? (
          <div>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {user.firstName}
            </h2>
            <h2 className="text-gray-900 title-font font-medium mb-1">
              {review.title}
            </h2>
            <h2>{review.content}</h2>
            <h2 className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Rating: {review.rating}
            </h2>
            {user.id === review.userId ? (
              <button
                type="button"
                onClick={() => this.setState({editMode: true})}
              >
                Edit
              </button>
            ) : null}
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <h1>{user.firstName}</h1>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <label
                  className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 "
                  htmlFor="title"
                />
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  placeholder="title"
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
                />
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                  <label
                    className="uppercase text-gray-700 text-xs font-boldm py-1 px-4 tracking-wide mr-2 "
                    htmlFor="content"
                  />
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="number"
                    name="rating"
                    value={rating}
                    onChange={this.handleChange}
                    placeholder="rating"
                  />
                </div>
                <button type="submit">Update</button>
              </div>
            </div>
          </form>
        )}
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  updateReview: (review, productId) =>
    dispatch(fetchUpdatedReview(review, productId))
})

export default connect(null, mapDispatch)(Review)
