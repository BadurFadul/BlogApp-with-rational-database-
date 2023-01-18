require('dotenv').config()
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3001

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  });

  class Blog extends Model {}
  Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue:0
    }
  }, {
    sequelize,
    underscored:true,
    timestamps: false,
    modelName: 'blog'
  })

  app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
  })

  app.get('/api/blogs/:id', async (req, res) => {
    const blogs = await Blog.findByPk(req.params.id)
    if(blogs) {
      res.json(blogs)
    } else {
      res.status(400).end()
    }
    
  })

  app.use(express.json())

  app.post('/api/blogs', async (req, res) => {
    try{
      const blog = await Blog.create(req.body)
      return res.json(blog)
    } catch (error) {
      return res.status(400).json({error})
    }
  })


  app.delete('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if(blog) {
      await blog.destroy()
    }
    res.status(400).end()

  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  /*const getblogs = async () => {
    try {
        await sequelize.authenticate()
        try{
            const blogs = await sequelize.query("SELECT * FROM blogs", {
                type: QueryTypes.SELECT
            })
            console.log(blogs)
            sequelize.close()
        } catch (error) {
            console.error('error blogs')
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
  }
  getblogs();*/


  

