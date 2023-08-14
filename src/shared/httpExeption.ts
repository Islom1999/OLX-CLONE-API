import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response, Request } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        try {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            const request = ctx.getRequest<Request>();
            const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
            const errorResponse = {     
                code: status,
                timestamps: new Date().toLocaleString(),
                path: request.url, 
                method: request.method,
                message: status !== HttpStatus.INTERNAL_SERVER_ERROR ? exception.getResponse().message || exception.message : "Internal Server Error"
            }
            return response.status(status).json(errorResponse);
        } catch (error) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse<Response>();
            const request = ctx.getRequest<Request>();
            const status = HttpStatus.INTERNAL_SERVER_ERROR;
            const errorResponse = {     
                code: 500,
                timestamps: new Date().toLocaleString(),
                path: request.url, 
                method: request.method,
                message: "Internal Server Error"
            }
            return response.status(status).json(errorResponse); 
        }

    }
} 