export type RequestResult = 'loading' | 'success' | 'error';
export class ServerRequest {
    id: string;
    requestResult: RequestResult;
}