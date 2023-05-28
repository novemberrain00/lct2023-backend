import {Router} from "express";
import {
    getIndustries, 
    getSubindustries,
    getIndustry, 
    getHardware, 
    getHardwareById,
    generateReportFile,
    getReportFile,
} from "../controllers/industryController.js";

const industriesRouter = new Router();

industriesRouter.get('/subindustries', (req, res) => getSubindustries(req, res));
industriesRouter.get('/industry', (req, res) => getIndustry(req, res));
industriesRouter.get('/hardware', (req, res) => getHardware(req, res));
industriesRouter.get('/hardware-by-id', (req, res) => getHardwareById(req, res));
industriesRouter.get('/all', (req, res) => getIndustries(req, res));
industriesRouter.post('/generate-report', (req, res) => generateReportFile(req, res));
industriesRouter.get('/get-report', (req, res) => getReportFile(req, res));

export {industriesRouter};