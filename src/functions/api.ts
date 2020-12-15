import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import serverless from 'serverless-http';
import * as backlogRoutes from "../server/routes/backlog";

const server = express();
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Tokenlog service up and running!');
});

backlogRoutes.register(router);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/.netlify/functions/api', router);

export const handler = serverless(server)
