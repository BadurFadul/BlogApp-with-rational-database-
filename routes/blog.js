const router = require('express').Router()
const { Op } = require('sequelize')
const { tokenExtractor } = require('../util/middleware')
const { tokenValidator } = require('../util/middleware')


const {Blog} = require('../models')
const {User} = require('../models')

const blogfinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/',  async (req, res) => {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId']},
      include: {
        model: User
      },
      where: {
       [Op.or]: {
        title: {
          [Op.substring]: req.query.search ? req.query.search: ''
        },
        author: {
          [Op.substring]: req.query.search ? req.query.search: ''
        }
       }
      },
      order: [
        ['likes', 'DESC']
      ]
    })
    res.json(blogs)
  })


  router.get('/:id', blogfinder, async (req, res) => {
    if(req.blog) {
      res.json(req.blog)
    } else {
      res.status(404).send({ error: 'provided id does not exits' })
    }
    
  })


  router.post('/',tokenExtractor,tokenValidator, async (req, res) => {
    try{
      const user = await User.findByPk(req.decodedToken.id)
      if(!User || User.disabled == true) {
        res.status(401).json({
          errorMessage: 'Missing or Invalid Token'
        })
      }

      if (User.disabled) {
        return res.status(403).send({ error: "Session expired, please log in again."})
      }
      const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
      res.json(blog)
    } catch (error) {
      return res.status(400).send({ error })
    }
  })

  router.delete('/:id', blogfinder, async (req, res) => {
    if(req.blog) {
      await req.blog.destroy()
    }
    res.status(400).end()

  })

  router.put('/:id', blogfinder, async (req, res) => {
    if(req.blog) {
      req.blog.likes = req.body.likes
      await req.blog.save()
      res.json(req.blog)
    }
    res.status(404).send({ error: 'error id doesnt exits' })

  })


  module.exports = router