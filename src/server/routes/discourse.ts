import { Router } from "express";

export const register = (router: Router) => {
    // BACKLOG CONTROLLER
    // Page routes = /
    // API routes =
    // GET /backlogs                            => Get all backlogs (that have votes) => homepage 

    // DISCOURSE CONTROLLER (id = uri)
    // Page routes = /discourse/id
    // API routes =
    // GET /discourse/owner                     => Get all backlogs (categories) by owner => https://forum.pokt.network/categories.json (incl. sub-categories)
    // GET /discourse/owner/cat                 => Get backlog by forum category => repo page 
    // GET /discourse/owner/cat/settings        => Get backlog settings => where to store these?
    // GET /discourse/owner/cat/topics?filter   => Get product backlog items (forum topics)
    // GET /discourse/owner/cat/votes??filter   => Get all votes by backlog ID && state === open
};