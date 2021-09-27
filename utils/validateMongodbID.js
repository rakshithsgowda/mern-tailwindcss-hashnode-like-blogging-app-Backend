const mongoose = require('mongoose')

const validateMongodbId = (id) => {
  const isvalid = mongoose.Types.ObjectId.isValid(id)
  if (!isvalid) throw new Error('User id is not valid or found')
}
module.exports = validateMongodbId
