import { Request } from 'express';
export declare const BASE_LOG_PATH = "./logs";
export declare enum LogSeverity {
    danger = "danger",
    servere = "severe",
    moderate = "moderate",
    info = "info"
}
export interface SaveLogOptions {
    userId?: number;
    data: string;
    severity: LogSeverity;
    penTestSuspcion?: boolean;
    req?: Request;
    ip?: string;
    url?: string;
}
export declare function saveInternalErrorLog(req: Request, error: any, options?: {
    penTestSuspcion?: boolean;
    severity?: LogSeverity;
}): Promise<void>;
export declare function saveLog(options: SaveLogOptions): {
    fileName: string;
    basePath: string;
};
