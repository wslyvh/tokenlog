import { Router, Request, Response} from "express";

export const register = (router: Router) => {
    router.get("/org", (req: Request, res: Response) => {
        console.log("GET /org");

        const data = 'Ok'
        res.status(200).send(data);
    });

    router.get("/org/:org", (req: Request, res: Response) => {
        console.log("GET /org", req.params.org);

        const data = {
            org: req.params.org,
        }
        res.status(200).send(data);
    });

    router.get("/org/:org/:repo", (req: Request, res: Response) => {
        console.log("GET /org/repo", req.params.org, req.params.repo);

        const data = {
            org: req.params.org,
            repo: req.params.repo
        }
        res.status(200).send(data);
    });

    router.get("/org/:org/:repo/settings", (req: Request, res: Response) => {
        console.log("GET /org/repo/settings", req.params.org, req.params.repo);

        const data = {
            org: req.params.org,
            repo: req.params.repo,
            settings: {}
        }
        res.status(200).send(data);
    });

    router.get("/org/:org/:repo/issues", (req: Request, res: Response) => {
        console.log("GET /org/repo/issues", req.params.org, req.params.repo);

        const data = {
            org: req.params.org,
            repo: req.params.repo,
            issues: []
        }
        res.status(200).send(data);
    });

    router.get("/org/:org/:repo/votes", (req: Request, res: Response) => {
        console.log("GET /org/repo/votes", req.params.org, req.params.repo);

        const data = {
            org: req.params.org,
            repo: req.params.repo,
            votes: []
        }
        res.status(200).send(data);
    });
};