const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const Review = require('./review')
const ProductOrder = require('./productOrder')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Order, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
})
Order.belongsTo(User)

Order.belongsToMany(Product, {through: ProductOrder})
Product.belongsToMany(Order, {through: ProductOrder})

User.hasMany(Review)
Review.belongsTo(User)
Product.hasMany(Review)
Review.belongsTo(Product)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  Review,
  Product,
  ProductOrder
}
