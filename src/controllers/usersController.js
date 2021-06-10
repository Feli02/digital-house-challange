const models = require('../database/models');
const sequelize = models.sequelize;
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

const Users = models.User

const userController = {
    login: (req,res) => {
        res.render('login')
    },
    register: (req,res) => {
        res.render('register')
    },
    storeUser: async function(req,res) {
        let resultValidation = validationResult(req)
        if(resultValidation.errors.length > 0){
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        let emailDB = await models.User.findOne({ where: { email: req.body.email } })
        
        if(emailDB){
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado!'
                    }
                },
                oldData: req.body
            })
        }
        try{
            await models.User.create({
                name: req.body.name,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                rol: 0
            })
            return res.redirect('/ingresar')
        }
        catch(error){
            console.log(error)
            return res.send('Ha ocurrido un error!')
        }
    },
    profile: (req,res) => {
        res.render("profile", {
            user: req.session.userLogged
		})
    },
    loguearse: async (req, res) => {
        let userLogin = await models.User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (userLogin) {
            let PasswordCompare = bcryptjs.compareSync(req.body.password, userLogin.password);
            if (PasswordCompare) {
                delete userLogin.password;
                req.session.userLogged = userLogin;

                if (req.body.remember_user) {
                    res.cookie('email', req.body.email, {
                        maxAge: (1000 * 60) * 60
                    })
                }
                return await res.render('profile',{
                    user: req.session.userLogged
                });
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Credenciales invalidas'
                    }
                }
            });
        }
        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra este usuario en nuestra base de datos'
                }
            }
        });

    },
    logout:  (req,res)=>{
		res.clearCookie('user');
		req.session.destroy();
		return res.redirect('/');
    },
    eliminar: async (req,res)=>{
        let usuario = await Users.findOne({
            where: {
                id: req.params.id
            } })
        
        await Users.destroy({where: {id: req.params.id}, force: true})
        
        
        res.clearCookie('user');
        req.session.destroy();
        res.redirect("/")
    },
    edit: async function(req,res){
        try{
            const userEdit = await models.User.findByPk(req.params.id)
            const data = {
                userEdit
            }
            return res.render('userEdit',data)
        }
        catch (error){
            return res.render(error)
        }
    },
    update: async function(req,res){
        let userLogin = await models.User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (userLogin) {
            return res.render('userEdit', {
                errors: {
                    email: {
                        msg: 'El mail ingresado ya está registrado en la base de datos'
                    }
                }
            });
        }
        let PasswordCompare = bcryptjs.compareSync(req.body.old_password, userLogin.password);
        if (PasswordCompare) {
            req.session.userLogged = userLogin
            await models.User.update(req.body, {where: {id: req.params.id}})
            res.redirect('profile')

        }
        return res.render('userEdit', {
            errors: {
                old_password: {
                    msg: 'Tu anterior contraseña es errónea'
                }
            }
        });
    }
}

module.exports = userController;

