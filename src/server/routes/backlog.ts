import { Router } from "express";
import { BacklogController } from "server/controllers/BacklogController";

export const register = (router: Router) => {
    const controller = new BacklogController();
    
    router.get("/owner", controller.GetOwners);
    router.get("/owner/:id", controller.GetOwner); 
    router.get("/owner/:id/:backlog", controller.GetBacklog); 
    router.get("/owner/:id/:backlog/settings", controller.GetBacklogSettings);
    router.get("/owner/:id/:backlog/items", controller.GetBacklogItems);
    router.get("/owner/:id/:backlog/votes", controller.GetBacklogVotes);
};