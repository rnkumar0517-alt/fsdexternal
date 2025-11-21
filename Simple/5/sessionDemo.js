const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

app.use(cookieParser());
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 1 minute
}));

app.get('/', (req, res) => {
    req.session.views = (req.session.views || 0) + 1;

    if (!req.cookies.user)
        res.cookie('user', 'student', { maxAge: 60000 });

    res.send(`
        <h1>Session Counter</h1>
        <p>Session ID: ${req.sessionID}</p>
        <p>Visits: ${req.session.views}</p>
        <p>Cookie User: ${req.cookies.user}</p>
    `);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});