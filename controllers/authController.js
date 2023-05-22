import {conn} from "../db.js";
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

    if(user.length === 0) {
        //доделать хэширование паролей если будет время
        //const hash = bcrypt.hashSync(password, 10);
        const regQuery = `INSERT INTO users (name, surname, fathername, inn, password) \
        VALUES ('${name}', '${surname}', '${fathername}', '${inn}', '${password}')`;
        conn.query(regQuery);

        return response.send(JSON.stringify({result: "REGISTERED"}));
    } else {
        return response.send(JSON.stringify({result: "USER_EXIST"}));
    }
};

const login = async (req, res) => {
    conn.query(`SELECT * FROM users WHERE inn = '${req.body.inn}'`, (error, result) => {
        if(result.length > 0 && req.body.password === result[0].password) {
            const token = generateAccessToken(result[0].inn, result[0].job);
            return res.send(JSON.stringify({token}));
        } else {
            return res.send(JSON.stringify({result: 'Неверный логин или пароль'}));
        }
    });
};

const getUser = async (req, res) => {
    console.log(req.query.token);
    const inn = req.query.token? jwt.verify(req.query.token, secret).inn : req.query.inn;
    conn.query(`SELECT * FROM users WHERE inn = '${inn}'`, (error, result) => {
        return res.send(JSON.stringify(result));
    });
}

export {registration, login, getUser};