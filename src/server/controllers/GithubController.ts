import { Request, Response } from "express";
import { BacklogService } from "server/service/BacklogService";
import { BaseController } from "./BaseController";


export class GithubController extends BaseController { 

    private service: BacklogService;
    
    constructor(backlogService: BacklogService) {
        super();

        console.log("Init GithubController");
        this.service = backlogService;
    }

    public async GetBacklogs(req: Request, res: Response) {
        try {
            const data = await this.service.GetBacklogs();

            res.status(data.code).send(data);
        } catch (e) {
            res.status(500).send(this.InternalServerError);
        }
    }

    public async GetOwner(req: Request, res: Response) {
        try {
            const data = await this.service.GetOwner(req.params.owner);
            
            res.status(data.code).send(data);
        } catch (e) {
            res.status(500).send(this.InternalServerError);
        }
    }

    public async GetBacklog(req: Request, res: Response) {
        try {
            const data = await this.service.GetBacklog(req.params.owner, req.params.repo);
            
            res.status(data.code).send(data);
        } catch (e) {
            res.status(500).send(this.InternalServerError);
        }
    }

    public async GetBacklogSettings(req: Request, res: Response) {
        try {
            const data = await this.service.GetBacklogSettings(req.params.owner, req.params.repo);
            
            res.status(data.code).send(data);
        } catch (e) {
            res.status(500).send(this.InternalServerError);
        }
    }

    public async GetBacklogItems(req: Request, res: Response) {
        try {
            const data = await this.service.GetBacklogItems(req.params.owner, req.params.repo);
            
            res.status(data.code).send(data);
        } catch (e) {
            res.status(500).send(this.InternalServerError);
        }
    }

    public async GetBacklogVotes(req: Request, res: Response) {
        try {
            const data = await this.service.GetBacklogVotes(req.params.owner, req.params.repo);
            
            res.status(data.code).send(data);
        } catch (e) {
            res.status(500).send(this.InternalServerError);
        }
    }
}