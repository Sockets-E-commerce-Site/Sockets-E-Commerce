const {User} = require('../db/models')

module.exports = async function(req, res, next) {
  const user = await User.findOne({
    where: {
      id: req.user.id
    }
  })
  if (!user.isAdmin) {
    res.status(403).send({error: {status: 403, message: 'Access denied.'}})
  }
}
