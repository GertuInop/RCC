const express = require('express');
const mailer = require('./mailer');



const app = express();
const PORT = 5001;



app.set('view engine', 'ejs');
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.redirect('/events/surname/name')
})

app.get('/events/:surname/:name', (req, res) => {
    let data = {surname: req.params.surname, name: req.params.name}
    res.render('events', data);
})

app.get('/applications', (req, res) => {
    res.render('applications');
})

app.get('/notifications', (req, res) => {
    res.render('notifications');
})

app.get('/more', (req, res) => {
    res.render('more');
})

app.get('/auth', (req, res) => {
    res.render('auth');
})

app.get('/profile/:id', (req, res) => {
    res.render('profile');
})

app.get('/profile/:id/change', (req, res) => {
    res.render('change');
})

app.get('/events/:id', (req, res) => {
    res.render('event_view');
})



app.listen(PORT, () => {
    console.log(`Server is running out on: http://localhost:${PORT}`);
    console.log(`Main page: http://localhost:${PORT}/events/Surname/Name`);
})



// app.get('/name/:name', (req, res) => {
//     let data = { name: req.params.name, nums: [1, 2, 3] };
//     res.render('ur_name', data);
// })

// app.get('/test', (req, res) => {
//     res.render('test');
// })

// app.post('/test_mail', (req, res) => {
//     const message = {
//         from: process.env.EMAIL,
//         to: req.params.email,
//         subject: 'Регестрация на моём сайте',
//         text: `Вы зарегестрировались на этом сайте
        
//         Ваш логин: ${req.params.email},
//         Ваш пароль: ${req.params.password}`
//     };
// })