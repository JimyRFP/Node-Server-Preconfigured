import { LogSeverity } from "../logs/logs";
export declare function JSONResponse(data: any, error?: any): string;
export interface SendIErrorOptions {
    severity?: LogSeverity;
    penTestSuspcion?: boolean;
}
export declare function sendIError(req: any, res: any, error?: any, options?: SendIErrorOptions): any;
export declare function WSResponse(isOK: boolean, message?: string, errorMessage?: string, data?: any): string;
