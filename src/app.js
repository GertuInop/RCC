const express = require('express');
const mailer = require('./mailer');
const argon2 = require('argon2');
const session = require('express-session');
const bodyParser = require('body-parser');
const pgSession = require('connect-pg-simple')(session);



const createTable = require('./db/setup');
const pool = require('./db/index');
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/event');
const registrationsRouter = require('./routes/registration');



const app = express();
const PORT = 5001;



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        store: new pgSession({ pool: pool, tableName: 'session' }),
        secret: 'my_secret_key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: 'lax'
        }
    })
);



app.use('/usedb', usersRouter);
app.use('/usedb', eventsRouter);
app.use('/usedb', registrationsRouter);



async function initializeApp() {
    try {
        await createTable(pool);

        app.get('/', (req, res) => {
            res.redirect('/events')
        });
        
        app.get('/events', (req, res) => {
            let data = {surname: 'Surname', name: 'Name'}
            res.render('events', data);
        });
        
        app.get('/applications', (req, res) => {
            let data = {surname: 'Surname', name: 'Name'}
            res.render('applications', data);
        });
        
        app.get('/notifications', (req, res) => {
            let data = {surname: 'Surname', name: 'Name'}
            res.render('notifications', data);
        });
        
        app.get('/my_events', (req, res) => {
            let data = {surname: 'Surname', name: 'Name'}
            res.render('my_events', data);
        });

        app.get('/new_event', (req, res) => {
            res.render('new_event');
        });

        app.get('/test', (req, res) => {
            if (req.session.userId) {
                return res.status(401).send('Необходима авторизация');
            } else {
                return res.send('okey');
            }
        });

        app.get('/more', (req, res) => {
            let data = {surname: 'Surname', name: 'Name'}
            res.render('more', data);
        });
        
        app.get('/registration', (req, res) => {
            res.render('registration');
        });

        app.get('/auth', (req, res) => {
            res.render('auth');
        });

        app.post('/auth', async (req, res) => {
            const {email, password} = req.body;

            const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if (user.rows.length === 0)
                return res.status(400).send('Неверное имя пользователя');

            const dbUser = user.rows[0];
            const match = await bcrypt.compare(password, dbUser.password);
            if (!match)
                return res.status(400).send('Неверное имя пользователя или пароль');

            req.session.userId = dbUser.id;
            res.send('Успешный вход');
        })

        app.post('/logout', (req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).send('Ошибка при выходе');
                }
                res.send('Успешный выход');
            });
        });
        
        app.get('/profile/:id', (req, res) => {
            let data = {surname: 'Surname', name: 'Name'}
            res.render('profile', data);
        });
        
        app.get('/profile/:id/change', (req, res) => {
            res.render('change');
        });
        
        app.get('/profile/:id/password_change', (req, res) => {
            res.render('password_change');
        });

        app.get('/events/:id', (req, res) => {
            let data = {surname: 'Surname', name: 'Name'}
            res.render('event_view', data);
        });
        
        app.get('/events/:id/change', (req, res) => {
            let data = {surname: 'Surname', name: 'Name'}
            res.render('change_event', data);
        });



        app.get('/protected', authRequired, (req, res) => {
            res.send('Это защищенная страница. Вы авторизованы!');
        });
        
        function authRequired(req, res, next) {
            if (!req.session.userId) {
                return res.status(401).send('Необходима авторизация');
            }
            next();
        }


        
        app.listen(PORT, () => {
            console.log(`Server is running out on: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing app: ', error.message);
    }
}

initializeApp();





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