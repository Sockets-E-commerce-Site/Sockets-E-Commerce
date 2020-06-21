const router = require('express').Router()
const {Product, User, ProductOrder, Order} = require('../db/models')

module.exports = router

// alter product quantity in cart
router.put('/edit', async (req, res, next) => {
  try {
    const {productId, productQuantity} = req.body
    const userId = req.user.id
    const cart = await Order.findOne({
      where: {
        userId,
        status: 'in cart'
      },
      include: Product
    })

    const foundProduct = cart.products.find(product => {
      return product.id === parseInt(productId)
    })

    if (
      productQuantity <= foundProduct.invQuantity &&
      productQuantity > 0 &&
      foundProduct.invQuantity > 0
    ) {
      await foundProduct.productOrder.update(
        {productQuantity: productQuantity},
        {
          returning: true
        }
      )
    }

    const updatedCart = await Order.findOne({
      where: {
        userId,
        status: 'in cart'
      },
      include: Product
    })

    res.json(updatedCart)
  } catch (error) {
    next(error)
  }
})

//checkout and change status from in cart to pending shipping

router.put('/checkout', async (req, res, next) => {
  try {
    const userId = req.user.id
    const finalOrder = await Order.findOne({
      where: {
        userId,
        status: 'in cart'
      }
    })
    if (finalOrder) {
      finalOrder.update({
        status: 'pending shipping'
      })
    }
    res.json(finalOrder)
  } catch (error) {
    next(error)
  }
})
