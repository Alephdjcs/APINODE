const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dcerdassan:DaniTek.2001@learningudemy.p4qd6hp.mongodb.net/?retryWrites=true&w=majority&appName=LearningUdemy')

const User = mongoose.model('User', {
    username: String,
    edad: Number,
})

const crear = async () => {
    const user = new User({username: 'chanchito triste', edad: 5})
    const savedUser = await user.save()
    console.log(savedUser)
}

//crear()

const buscarTodo = async () => {
    const users = await User.find()
    console.log(users)
}

const buscar = async () => {
    const user = await User.find({
        username: 'chanchito feliz' })
    console.log(user)
}

//buscar()


const buscarUno = async() => {
    const user = await User.findOne ({
        username: 'chanchito feliz'})
        console.log(user)
}

//buscarUno()

const actualizar =async () => {
    const user = await User.findOne ({username: 'chanchito feliz'})
    console.log(user)
    user.edad = 30
    await user.save()
}

//actualizar()

const eliminar = async () => {
    const user = await User.findOne({ username: 'chanchito feliz' });
    console.log(user);
    
    if (user) {
        await user.remove();
        console.log('User deleted successfully');
    } else {
        console.log('User not found');
    }
}

eliminar()

