import { ServiceResponse } from "server/ServiceResponse";

export class BaseService {
    constructor() {
        console.log("Init BaseService");
    }

    protected BadRequest<T>(): ServiceResponse<T> {
        return { code: 400, message: 'Bad Request', data: undefined }
    }
}