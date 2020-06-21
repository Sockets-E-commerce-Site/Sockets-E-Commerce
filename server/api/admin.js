const {User} = require('../db/models')

module.exports = async function(req, res, next) {
  const error = res
    .status(403)
    .send({error: {status: 403, message: 'Access denied.'}})

  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  })

  if (!user.isAdmin) {
    next(error)
  } else {
    next()
  }

  if (!req.user) {
    next(error)
  }
}
