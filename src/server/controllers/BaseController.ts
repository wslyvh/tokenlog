import { ServiceResponse } from "server/ServiceResponse";

export class BaseController { 
    protected InternalServerError: ServiceResponse<undefined> = {
        code: 500, message: 'Internal Server Error', data: undefined
    }
}