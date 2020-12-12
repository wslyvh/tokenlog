import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import serverless from 'serverless-http';

const server = express();
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log("GET /");
    res.json('Express service up and running!');
    res.status(200).send()
});

router.get('/hello', (req: Request, res: Response) => {
    console.log("GET /hello");
    const data = "Hello Express API"

    res.json(data);
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/.netlify/functions/api', router);

export const handler = serverless(server)
