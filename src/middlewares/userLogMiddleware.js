const models = require("../database/models");

const Users = models.User




async function userLoggedMiddleware(req, res, next) {
    
	res.locals.isLogged = false;

	/*
	let userCookie = req.cookies.user;
	let users = await models.Users.findAll();
    let userFromCookie = users.find( oneUser => oneUser.user == userCookie);
	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}
	if (req.session.userLogged) {
	res.locals.isLogged = true;
	res.locals.userLogged = req.session.userLogged;
	}
	next();
	*/

    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
		res.locals.userRol =  req.session.userLogged.rol
    }

    next();

	
}

module.exports = userLoggedMiddleware;