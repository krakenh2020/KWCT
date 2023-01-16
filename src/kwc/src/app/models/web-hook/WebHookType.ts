export interface WebHookType {
    rowNum:number;
    webHookType: string;
    requestBody: RequestBody;
    
}

export interface RequestBody {
    id: string;
    topic: string;
    message: string;
}