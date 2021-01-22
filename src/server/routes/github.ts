import { Router } from "express";
import { GithubController } from "server/controllers/GithubController";
import { GithubService } from "server/service/GithubService";

export const register = (router: Router) => {
    const service = new GithubService();
    const controller = new GithubController(service);

    router.get("/github", controller.GetBacklogs.bind(controller));
    router.get("/github/:owner", controller.GetOwner.bind(controller));
    router.get("/github/:owner/:repo", controller.GetBacklog.bind(controller));
    router.get("/github/:owner/:repo/settings", controller.GetBacklogSettings.bind(controller));
    router.get("/github/:owner/:repo/items", controller.GetBacklogItems.bind(controller));
    router.get("/github/:owner/:repo/votes", controller.GetBacklogVotes.bind(controller));
};