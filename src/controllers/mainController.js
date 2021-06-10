const models = require('../database/models')
const Movie = models.Movie
const User = models.User



const indexController = {
    show : async function(req,res) {
        try{
            await Movie.findAll()
            .then((resultado) =>{
                let movies = resultado
                return res.render('index', {movies : movies})
            })
        }
        catch (error){
            return res.send(error)
        }
    },
    users: async function(req,res){
        try{
            await User.findAll()
            .then((result) => {
                let users = result
                return res.render('allUsers', {users : users})
            })
        }
        catch(error){
            return res.send(error)
        }
    },
    detailUser: async function(req,res){
        try{
            await models.User.findByPk(req.params.id)
            .then(user => {
                if(!user){
                    return res.send('No se ecnontró')
                }
                res.render('detailUser', {user});
            });
        }
        catch(error){
            return res.send('Ha ocurrido un error')
        }   
    },
    edit: async function(req,res){
        try{
            const Userfind = await models.Movie.findByPk(req.params.id)
            const data = {
                Userfind
            }
            return res.render('userEditAdmin',data)
        }
        catch (error){
            return res.render(error)
        }
    },
    update: async function(req,res){
        await models.User.update(req.body, {where: {id: req.params.id}})
        res.redirect('/')
    },
    destroy: async function(req,res){

    }
}

module.exports = indexController;