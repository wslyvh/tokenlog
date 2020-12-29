import { Request, Response } from "express";
import { BacklogService } from "server/service/BacklogService";
import { BaseController } from "./BaseController";

let service: BacklogService;

export class GithubController extends BaseController { 

    constructor(backlogService: BacklogService) {
        super();

        console.log("Init GithubController");
        service = backlogService;
    }

    public async GetBacklogs(req: Request, res: Response) {
        try {
            const data = await service.GetBacklogs();

            res.status(data.code).send(data);
        } catch (e) {
            res.status(500).send(this.InternalServerError);
        }
    }

    public async GetOwner(req: Request, res: Response) {
        try {
            const data = await service.GetOwner(req.params.owner);
            
            res.status(data.code).send(data);
        } catch (e) {
            res.status(500).send(this.InternalServerError);
        }
    }

    public async GetBacklog(req: Request, res: Response) {
        try {
            const data = await service.GetBacklog(req.params.owner, req.params.id);
            
            res.status(data.code).send(data);
        } catch (e) {
            res.status(500).send(this.InternalServerError);
        }
    }

    public async GetBacklogSettings(req: Request, res: Response) {
        try {
            const data = await service.GetBacklogSettings(req.params.owner, req.params.id);
            
            res.status(data.code).send(data);
        } catch (e) {
            res.status(500).send(this.InternalServerError);
        }
    }

    public async GetBacklogItems(req: Request, res: Response) {
        try {
            const data = await service.GetBacklogItems(req.params.owner, req.params.id);
            
            res.status(data.code).send(data);
        } catch (e) {
            res.status(500).send(this.InternalServerError);
        }
    }

    public async GetBacklogVotes(req: Request, res: Response) {
        try {
            const data = await service.GetBacklogVotes(req.params.owner, req.params.id);
            
            res.status(data.code).send(data);
        } catch (e) {
            res.status(500).send(this.InternalServerError);
        }
    }
}