const express = require('express');
const path = require('path'); // Import path module for file path operations
const mongoose = require('mongoose');
const user = require('./user.controller');
const app = express();
const port = 3000;

app.use(express.json());
mongoose.connect('mongodb+srv://dcerdassan:DaniTek.2001@learningudemy.p4qd6hp.mongodb.net/?retryWrites=true&w=majority&appName=LearningUdemy');

app.get('/users', user.list);
app.post('/users', user.create);
app.put('/users/:id', user.update);
app.patch('/users/:id', user.update);
app.delete('/users/:id', user.destroy);

app.use(express.static('app'))

app.get('/', (req, res) => {
    console.log(__dirname); 
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
    res.status(404).send('Esta pagina no existe');
});

app.listen(port, () => {
    console.log('Arrancando');
});
