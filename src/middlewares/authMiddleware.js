function authMiddleware(req, res, next) {
	if (!req.session.userLogged) {
		return res.redirect('/ingresar');
	}
	next();
}

module.exports = authMiddleware;