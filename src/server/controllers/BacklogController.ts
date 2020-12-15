import { Request, Response } from "express";
import { BaseController } from "./BaseController";

export class BacklogController extends BaseController { 
    constructor() {
        super();
        console.log("Init BacklogController");
    }

    public GetOwners(req: Request, res: Response) {
        console.log("GET /owner");

        try {
            const data = {
                owners: []
            }
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public GetOwner(req: Request, res: Response) {
        console.log("GET /owner/:id", req.params.id);

        try {
            const data = {
                owner: req.params.id,
                backlogs: []
            }
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public GetBacklog(req: Request, res: Response): void {
        console.log("GET /owner/:id/:backlog", req.params.id, req.params.backlog);

        try {
            const data = {
                owner: req.params.id,
                backlog: req.params.backlog,
            }
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public GetBacklogSettings(req: Request, res: Response): void {
        console.log("GET /owner/:id/:backlog/settings", req.params.id, req.params.backlog);

        try {
            const data = {
                owner: req.params.id,
                backlog: req.params.backlog,
                settings: {}
            }
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public GetBacklogItems(req: Request, res: Response): void {
        console.log("GET /owner/:id/:backlog/items", req.params.id, req.params.backlog);

        try {
            const data = {
                owner: req.params.id,
                backlog: req.params.backlog,
                items: []
            }
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public GetBacklogVotes(req: Request, res: Response): void {
        console.log("GET /owner/:id/:backlog/votes", req.params.id, req.params.backlog);

        try {
            const data = {
                owner: req.params.id,
                backlog: req.params.backlog,
                votes: []
            }
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}