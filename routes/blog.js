const router = require('express').Router()
const {Blog} = require('../models')

const blogfinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/',  async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
  })

  router.get('/:id', blogfinder, async (req, res) => {
    if(req.blog) {
      res.json(req.blog)
    } else {
      res.status(404).send({ error: 'provided id does not exits' })
    }
    
  })

  router.post('/', async (req, res) => {
    try{
      const blog = await Blog.create(req.body)
      return res.json(blog)
    } catch (error) {
      return res.status(404).send({ error: 'body does not mach' })
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