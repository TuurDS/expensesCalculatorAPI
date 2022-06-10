const { sequelize, User, Posts} = require('./models')
const express = require('express')
const user = require('./models/user')

const app = express()
app.use(express.json())

app.post('/user', async(req,res) => {
    const {name,role} = req.body
    try {
        const user = await User.create({name, role})
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/user', async (req,res) => {
    try {
        const user = await User.findAll();

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json(err)
    }
    }
)

app.get('/user/:uuid', async (req,res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: {uuid},
            include:"posts"
        });

        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
    }
)

app.post('/posts', async(req,res) => {
    const { userUuid, body} = req.body
    try {
        const user = await User.findOne({ where: {uuid: userUuid}})
        const post = await Posts.create({body, userId: user.id})
        return res.json(post)

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.get('/posts', async (req,res) => {
    try {
        const posts = await Posts.findAll({ include:['user']});

        return res.json(posts)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
    }
)

app.delete('/user/:uuid', async (req,res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({where: {uuid}});
        await user.destroy()
        return res.json({message: 'User deleted!'})
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.put('/user/:uuid', async (req,res) => {
    const uuid = req.params.uuid
    const {name,role} = req.body
    try {
        const user = await User.findOne({where: {uuid}});
        user.name = name
        user.role = role

        await user.save()

        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

app.listen( {port:5000}, async () => {
    console.log('server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database Connected!')
})
