import { Router } from "express";
import { BacklogController } from "server/controllers/BacklogController";

export const register = (router: Router) => {
    const controller = new BacklogController();
    
    // BACKLOG CONTROLLER
    // Page routes = /
    // API routes =
    // GET /backlogs                            => Get all backlogs (that have votes) => homepage 

    // GITHUB CONTROLLER (id = org+repo)
    // Page routes = /org/repo
    // API routes =
    // GET /github/owner                        => Get all backlogs (repos) by owner => org page 
    // GET /github/owner/repo                   => Get backlog (repo) by id (owner+repo) => repo page 
    // GET /github/owner/repo/settings          => Get backlog settings
    // GET /github/owner/repo/items?filter      => Get product backlog items (Github issues)
    // GET /github/owner/repo/votes?filter      => Get all votes by backlog ID && state === open

    // DISCOURSE CONTROLLER (id = uri)
    // Page routes = /discourse/id
    // API routes =
    // GET /discourse/owner                     => Get all backlogs (categories) by owner => https://forum.pokt.network/categories.json (incl. sub-categories)
    // GET /discourse/owner/cat                 => Get backlog by forum category => repo page 
    // GET /discourse/owner/cat/settings        => Get backlog settings => where to store these?
    // GET /discourse/owner/cat/topics?filter   => Get product backlog items (forum topics)
    // GET /discourse/owner/cat/votes??filter   => Get all votes by backlog ID && state === open


    router.get("/owner", controller.GetOwners);
    router.get("/owner/:id", controller.GetOwner);
    router.get("/owner/:id/:backlog", controller.GetBacklog);
    router.get("/owner/:id/:backlog/settings", controller.GetBacklogSettings);
    router.get("/owner/:id/:backlog/items", controller.GetBacklogItems);
    router.get("/owner/:id/:backlog/votes", controller.GetBacklogVotes);
};