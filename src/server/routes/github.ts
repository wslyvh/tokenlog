import { Router } from 'express';
import { GithubController } from 'server/controllers/GithubController';
import { MongoRepository } from 'server/repository/MongoRepository';
import { GithubService } from 'server/service/GithubService';

export const register = (router: Router) => {
  const repository = new MongoRepository();
  const service = new GithubService(repository);
  const controller = new GithubController(service);

  router.get('/github', controller.GetBacklogs.bind(controller));
  router.get('/github/:owner', controller.GetOwner.bind(controller));
  router.get('/github/:owner/:repo', controller.GetBacklog.bind(controller));
  router.get('/github/:owner/:repo/items', controller.GetBacklogItems.bind(controller));
  router.get('/github/:owner/:repo/votes', controller.GetBacklogVotes.bind(controller));
};
