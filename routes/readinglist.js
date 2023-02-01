const router = require('express').Router()
const {ReadingList} = require('../models')


router.post('/', async (req, res) => {
    try{
        const readinglist = await ReadingList.create({
            ...req.body,
            user_id: req.body.userId,
            blog_id: req.body.blogId
        });
        res.json(readinglist)
    }catch (error) {
        return res.status(400).send({ error })
    }
})

router.put('/:id', async (req,res) => {
    const readlist = await ReadingList.findByPk(req.params.id)
    if(readlist) {
        readlist.read =req.body.read
        await readlist.save()
        res.json(readlist)
    }
})

module.exports = router