const Users = require('./User')

const User = {
    get: async (req, res) => {
        const {id} = req.params
        const user = await Users.findOne({_id: id})
        res.status(200).send(user)
    },
    list: async (req, res) => {
        const users = await Users.find()
        res.status(200).send(users)
    },
    create: async(req, res)=> {
        console.log(req.bod)
        const user = new Users(req.body)
        const savedUser = await user.save()
        res.status(201).send('savedUser._id')
    },
    update: async (req, res) => {
        const {id} = req.params
        const user = await Users.findOne ({_id_: id})
        Object.assign(user, req.body)
        await user.save()
        res.status(204).send('actualizando chanchito')
    },
    destroy: async (req, res) => {
        const {id} = req.params
        const user = await Users.findOne ({_id_: id})
        if(user) {
            user.remove()
        }
        res.status(204).send('eliminando un chanchito')
    }
}

module.exports = User