require('dotenv').config()
const { Sequelize, Model, DataTypes, QueryTypes } = require('sequelize')
const express = require('express')
const app = express()

//const PORT = process.env.PORT || 3001

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  });

 /* class Blog extends Model {}
  Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
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

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })*/

  const getblogs = async () => {
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
  getblogs();


  

