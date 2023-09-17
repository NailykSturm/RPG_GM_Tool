export interface IAPIResponse {
    statusCode: number;
    statusMessage: string;
    message?: string;
    data? : any;
}