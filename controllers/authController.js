import {pool} from "../db.js";
//import bcrypt from "bcrypt";
import {secret} from "../config.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (inn, job) => {
    const payload = {
        inn,
        job 
    };

    return jwt.sign(payload, secret, {expiresIn: '24h'});
};

const registration = async (req, response) => {
    const {
        name, 
        surname, 
        fathername, 
        inn, 
        // email, 
        // website, 
        // company_name, 
        // industry, 
        // country, 
        // city, 
        // job,
        password
    } = req.body;

    const user = await fetch(`http://localhost:8000/auth/user?inn=${inn}`)
    .then(response => response.json())
    .then(result => result);

    console.log(user);
    if(user.length === 0) {
        //доделать хэширование паролей если будет время
        //const hash = bcrypt.hashSync(password, 10);
        const regQuery = `INSERT INTO users (name, surname, fathername, inn, password) \
        VALUES ($1, $2, $3, $4, $5)`;
        pool.query(regQuery, [name, surname, fathername, inn, password]);

        return response.send(JSON.stringify({result: "REGISTERED"}));
    } else {
        return response.send(JSON.stringify({result: "USER_EXIST"}));
    }
};

const login = async (req, res) => {
    pool.query(`SELECT * FROM users WHERE inn = $1`, [req.body.inn], (error, result) => {
        if(result.rows.length > 0 && req.body.password === result.rows[0].password) {
            const token = generateAccessToken(result.rows[0].inn, result.rows[0].job);
            return res.send(JSON.stringify({token}));
        } else {
            return res.send(JSON.stringify({result: 'Неверный логин или пароль'}));
        }
    });
};

const getUser = async (req, res) => {
    const inn = req.query.token? jwt.verify(req.query.token, secret).inn : req.query.inn;
    pool.query(`SELECT * FROM users WHERE inn = $1`,[inn], (error, result) => {
        return res.send(JSON.stringify(result.rows));
    });
}

export {registration, login, getUser};