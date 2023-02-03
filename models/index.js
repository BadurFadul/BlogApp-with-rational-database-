const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./ReadinList')
const Sessions = require('./sessions')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings'})
Blog.belongsToMany(User, { through: ReadingList, as: 'readings'})

module.exports = {
    Blog,
    User,
    ReadingList,
    Sessions
}