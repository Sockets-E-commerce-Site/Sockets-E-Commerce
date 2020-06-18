const router = require('express').Router()
const {Product, User, ProductOrder, Order} = require('../db/models')

module.exports = router

router.put('/edit', async (req, res, next) => {
  try {
    const {userId, productId, productQuantity} = req.body
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
