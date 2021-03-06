const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error(
      '<h3>Access denied. No gray-busting products for you.<h3>'
    )
    error.status = 401
    next(error)
  }
}

module.exports = {
  isAdminMiddleware
}
