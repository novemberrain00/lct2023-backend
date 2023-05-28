import {pool} from "../db.js";
import fs from 'fs';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import * as pdf from 'html-pdf';
import { pdfTemplate } from "./report.js";

const getIndustries = async (req, res) => {
    pool.query('SELECT * FROM industries', (err, result) => {
        if (err) {
            console.error(err);
            return res.send('Что-то пошло не так');
        }
        return res.send(JSON.stringify({result: result.rows}));
    });
};

const getIndustry = async (req, res) => {
    pool.query('SELECT * FROM industries WHERE id = $1', [req.query.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.send('Что-то пошло не так');
        }
        return res.send(JSON.stringify({result: result.rows}));

    });
};

const getSubindustries = async (req, res) => {
    pool.query('SELECT * FROM subindustries WHERE industry_id = $1', [req.query.id], (err, result) => {
        if (err) {
            console.error(err);
            return res.send('Что-то пошло не так');
        }
        return res.send(JSON.stringify({result: result.rows}));

    });
};

const getHardware = async (req, res) => {
    pool.query('SELECT * FROM hardware', (err, result) => {
        if (err) {
            return res.send('Что-то пошло не так');
        }
        return res.send(JSON.stringify({result: result.rows}));

    });
};

const getHardwareById = async (req, res) => {
    pool.query('SELECT * FROM hardware WHERE id = $1', [req.query.id], (err, result) => {
        if (err) {
            return res.send('Что-то пошло не так');
        }
        return res.send(JSON.stringify({result: result.rows}));

    });
}

const generateReportFile = async (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    pdf.create(pdfTemplate(req.body), {}).toFile(`${__dirname}/report.pdf`, (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
};

const getReportFile = (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    res.sendFile(`${__dirname}/report.pdf`);
}

export {
    getIndustries,
    getSubindustries, 
    getIndustry, 
    getHardware, 
    getHardwareById,
    generateReportFile,
    getReportFile
};