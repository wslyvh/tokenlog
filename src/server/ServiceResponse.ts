export interface ServiceResponse<T = undefined> { 
    code: number;
    message: string;
    data: T | undefined;
}