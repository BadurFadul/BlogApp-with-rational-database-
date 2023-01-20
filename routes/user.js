const router = require('express').Router()
const {User, Blog} = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ['userId']}
      }
    })
    res.json(users)
  })
  
  router.post('/', async (req, res) => {
    try {
      const user = await User.create(req.body)
      res.json(user)
    } catch(error) {
      return res.status(400).json({ error })
    }
  })

  router.put('/:username', async (req, res) => {
    const user = await User.findOne({where: {username: req.params.username}})
    if(user) {
        user.username = req.body.username
      await user.save()
      res.json(user.username)
    }
    res.status(404).send({ error: 'error id doesnt exits' })

  })

  module.exports = router
