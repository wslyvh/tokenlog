import { Request, Response } from "express";
import { BacklogService } from "server/service/BacklogService";
import { BaseController } from "./BaseController";

export class GithubController extends BaseController { 
    protected service: BacklogService;

    constructor(service: BacklogService) {
        super();

        console.log("Init GithubController");
        this.service = service;
    }

    public async GetBacklogs(req: Request, res: Response) {
        console.log("GET /");

        try {
            const data = await this.service.GetBacklogs();

            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public async GetOwner(req: Request, res: Response) {
        console.log("GET /:owner", req.params.id);

        try {
            const data = await this.service.GetOwner(req.params.id);
            
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public async GetBacklog(req: Request, res: Response) {
        console.log("GET /:owner/:repo", req.params.id, req.params.backlog);

        try {
            const data = await this.service.GetBacklog(req.params.id, req.params.backlog);
            
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public async GetBacklogSettings(req: Request, res: Response) {
        console.log("GET /:owner/:repo/settings", req.params.id, req.params.backlog);

        try {
            const data = await this.service.GetBacklogSettings(req.params.id, req.params.backlog);

            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public async GetBacklogItems(req: Request, res: Response) {
        console.log("GET /:owner/:repo//items", req.params.id, req.params.backlog);

        try {
            const data = await this.service.GetBacklogItems(req.params.id, req.params.backlog);

            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    public async GetBacklogVotes(req: Request, res: Response) {
        console.log("GET /:owner/:repo/votes", req.params.id, req.params.backlog);

        try {
            const data = await this.service.GetBacklogVotes(req.params.id, req.params.backlog);

            res.status(200).send(data);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}