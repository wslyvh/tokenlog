import { Request, Response } from "express";
import { BacklogService } from "server/service/BacklogService";

export class GithubController { 

    private service: BacklogService;
    
    constructor(backlogService: BacklogService) {
        this.service = backlogService;
    }

    public async GetBacklogs(req: Request, res: Response) {
        try {
            const data = await this.service.GetBacklogs();

            res.status(200).send({ code: 200, message: '', data: data });
        } catch (e) {
            res.status(500).send({ code: 500, message: `Unable to get backlogs` });
        }
    }

    public async GetOwner(req: Request, res: Response) {
        try {
            const data = await this.service.GetOwner(req.params.owner);
            
            res.status(200).send({ code: 200, message: '', data: data });
        } catch (e) {
            res.status(500).send({ code: 500, message: `Unable to get owner ${req.params.owner}` });
        }
    }

    public async GetBacklog(req: Request, res: Response) {
        try {
            const data = await this.service.GetBacklog(req.params.owner, req.params.repo);
            
            res.status(200).send({ code: 200, message: '', data: data });
        } catch (e) {
            res.status(500).send({ code: 500, message: `Unable to get backlog ${req.params.owner}/${req.params.repo}` });
        }
    }

    public async GetBacklogItems(req: Request, res: Response) {
        try {
            const data = await this.service.GetBacklogItems(req.params.owner, req.params.repo);
            
            res.status(200).send({ code: 200, message: '', data: data });
        } catch (e) {
            res.status(500).send({ code: 500, message: `Unable to get backlog items ${req.params.owner}/${req.params.repo}` });
        }
    }

    public async GetBacklogVotes(req: Request, res: Response) {
        try {
            const data = await this.service.GetBacklogVotes(req.params.owner, req.params.repo);
            
            res.status(200).send({ code: 200, message: '', data: data });
        } catch (e) {
            res.status(500).send({ code: 500, message: `Unable to get backlog votes ${req.params.owner}/${req.params.repo}` });
        }
    }
}