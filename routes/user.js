const router = require('express').Router()
const { Op } = require('sequelize')
const {User, Blog, ReadingList} = require('../models')

const userfinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id, )
  next()
}

router.get('/', async (req, res) => {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ['userId']}
      }
    })
    res.json(users)
  })

  router.get('/:id', async (req, res) => {
    let where = {}

    if (req.query.read === "true") {
      where.read = true
    }

    if (req.query.read === "false") {
      where.read = false
    }
    
      const user = await User.findByPk(req.params.id, {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
          model: Blog,
          as: 'readings',
          attributes: { exclude: ['createdAt', 'updatedAt', 'userId']},
          through: {
            attributes: ['read', 'id'],
            where,
          },
        }
      ],
      
    })
    if(user){
      res.json(user)
    } else {
      res.status(400).end()
    }
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
        user.disabled = req.body.disabled
      await user.save()
      res.json(user.username)
    }
    res.status(404).send({ error: 'error id doesnt exits' })

  })

  module.exports = router
