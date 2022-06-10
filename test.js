const { sequelize, user} = require('./models')
const express = require('express')

const app = express()
app.use(express.json())

app.post('/user', async(req,res) => {
    const {name,role} = req.body
    console.log(user);
    try {
        const users = await user.create({name, role})
        return res.json(users)
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
