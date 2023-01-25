const router = require('express').Router()
const { SECRET } = require('../util/config')
const { Op } = require('sequelize')

const {Blog} = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
    const author = await Blog.findAll({
       attributes: ['author',[sequelize.fn('COUNT', sequelize.col('author')), 'articles'],[sequelize.fn('SUM', sequelize.col('likes')), 'likes']],
       group: ['author' ],
       order: [
        ['likes', 'DESC']
       ]
    })
    res.json(author)
})


module.exports= router