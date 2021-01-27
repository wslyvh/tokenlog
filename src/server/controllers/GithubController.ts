import { Request, Response } from 'express';
import { BacklogService } from 'server/service/BacklogService';

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
      let type: 'ISSUE' | 'PR' = 'ISSUE';
      let state: 'OPEN' | 'CLOSED' | 'MERGED' = 'OPEN';
      let sort: 'CREATED_AT' | 'UPDATED_AT' | 'COMMENTS' | 'TOP' = 'CREATED_AT';
      let order: 'ASC' | 'DESC' = 'DESC';
      let page: number = 1;
      let size: number = 20;

      const upperType = req.query.type?.toString().toUpperCase();
      if (upperType === 'ISSUE' || upperType === 'PR') {
        type = upperType as 'ISSUE' | 'PR';
      }
      const upperState = req.query.state?.toString().toUpperCase();
      if (upperState === 'OPEN' || upperState === 'CLOSED' || upperState === 'MERGED') {
        state = upperState as 'OPEN' | 'CLOSED' | 'MERGED';
      }
      const upperSort = req.query.sort?.toString().toUpperCase();
      if (upperSort === 'CREATED_AT' || upperSort === 'UPDATED_AT' || upperSort === 'COMMENTS' || upperSort === 'TOP') {
        sort = upperSort as 'CREATED_AT' | 'UPDATED_AT' | 'COMMENTS' | 'TOP';
      }
      const upperOrder = req.query.order?.toString().toUpperCase();
      if (upperOrder === 'ASC' || upperOrder === 'DESC') {
        order = upperOrder as 'ASC' | 'DESC';
      }
      if (req.query.page && !isNaN(Number(req.query.page))) {
        page = Number(req.query.page);
      }
      if (req.query.size && !isNaN(Number(req.query.size))) {
        size = Number(req.query.size);
      }

      const data = await this.service.GetBacklogItems(req.params.owner, req.params.repo, type, state, sort, order, page, size);

      res.status(200).send({ code: 200, message: '', data: data });
    } catch (e) {
      res
        .status(500)
        .send({ code: 500, message: `Unable to get backlog items ${req.params.owner}/${req.params.repo}` });
    }
  }

  public async GetBacklogVotes(req: Request, res: Response) {
    try {
      let state: 'ALL' | 'OPEN' | 'CLOSED' = 'ALL';
      let address = '';
      let numbers = new Array<number>();

      const upperState = req.query.state?.toString().toUpperCase();
      if (upperState === 'ALL' || upperState === 'OPEN' || upperState === 'CLOSED') {
        state = upperState as 'ALL' | 'OPEN' | 'CLOSED';
      }
      if (req.query.address) {
        address = req.query.address.toString();
      }
      if (req.query.numbers) {
        numbers = req.query.numbers
          .toString()
          .split(',')
          .filter((i) => !isNaN(parseInt(i)))
          .map((i) => Number(i));
      }

      const data = await this.service.GetBacklogVotes(req.params.owner, req.params.repo, state, address, numbers);

      res.status(200).send({ code: 200, message: '', data: data });
    } catch (e) {
      res
        .status(500)
        .send({ code: 500, message: `Unable to get backlog votes ${req.params.owner}/${req.params.repo}` });
    }
  }
}
