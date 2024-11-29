const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path'); // Adicione isso

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (como o HTML e o CSS)
app.use(express.static(path.join(__dirname))); // Adicione isso

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3R1C4ribeiro987',
    database: 'banco_paper'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Altere isso
});

// Rota para registro
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) throw err;
        res.send('Usuário registrado com sucesso!');
    });
});

// Rota de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                res.send('Login bem-sucedido!');
            } else {
                res.send('Senha incorreta.');
            }
        } else {
            res.send('Usuário não encontrado.');
        }
    });
});

// Rota de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                console.log('Login bem-sucedido, redirecionando para:', 'https://greenplacekika.vercel.app/');
                return res.redirect('https://greenplacekika.vercel.app/');
            } else {
                res.send('Senha incorreta.');
            }
        } else {
            res.send('Usuário não encontrado.');
        }
    });
});




app.get('/pagina-destino', (req, res) => {
    res.send('<h1>Bem-vindo à página de destino!</h1>');
});



app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

