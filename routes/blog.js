const router = require('express').Router()
const {Blog} = require('../models')
const {User} = require('../models')

const blogfinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/',  async (req, res) => {
    const blogs = await Blog.findAll({
      //attributes: { exclude: ['userId']},
      include: {
        model: User
      }
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

  const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      console.log(SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
  }

  router.post('/',tokenExtractor, async (req, res) => {
    try{
      const user = await User.findByPk(req.decodedToken.id)
      const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
      res.json(blog)
    } catch (error) {
      return res.status(404).send({ error })
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