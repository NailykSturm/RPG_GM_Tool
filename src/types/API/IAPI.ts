export interface IAPIResponse<T = any> {
    statusCode: number;
    statusMessage: string;
    message?: string;
    data?: T;
}
