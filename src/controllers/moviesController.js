const models = require('../database/models');
const sequelize = models.sequelize;
const { validationResult } = require('express-validator');

const Movies = models.Movie


const moviesController = {
    detail: async (req, res) => {
        try{
            await models.Movie.findByPk(req.params.id,{
                include: [{association: 'genres'}, {association: 'actors'}]
            })
            .then(movie => {
                if(!movie){
                    return res.send('No se ecnontró')
                }
                res.render('moviesDetail', {movie});
            });
        }
        catch(error){
            return res.send('Ha ocurrido un error')
        }      
    },
    add: function (req, res) {
        res.render('moviesAdd')
    },
    create: async function (req, res) {
        let resultValidation = validationResult(req)
        if(resultValidation.errors.length > 0){
            return res.render('index', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        try{
            await models.Movie.create(req.body)
            res.redirect('/')
        }
        catch (error){
            console.log(error)
            return res.send('Ha ocurrido un error!')
        }
    },
    edit: async function(req, res) {
        try{
            const Movie = await models.Movie.findByPk(req.params.id, {
                include: [{association: 'genres'}]
            })
            const data = {
                Movie
            }
            return res.render('moviesEdit',data)
        }
        catch (error){
            return res.render(error)
        }
    },
    update: async function (req,res) {
        await models.Movie.update(req.body, {where: {id: req.params.id}})
        res.redirect('/')
    },
    destroy: async function (req, res) {
        try{
            await models.Movie.destroy({where: {id: req.params.id}})
            return res.redirect('/')
        }
        catch(error){
            return res.send(error)
        }
    }
}

module.exports = moviesController;