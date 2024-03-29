import { HttpException, ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
  	const ctx = host.switchToHttp();
  	const request = ctx.getRequest();
  	const response = ctx.getResponse();

  	const message = exception.message.message;

  	const errorResponse = {
  		data: {
  			error: message
  		},
  		message: "请求失败",
  		code: 1,
  		url: request.originalUrl
  	}

  	const status = 
  		exception instanceof HttpException
  			? exception.getStatus()
  			: HttpStatus.INTERNAL_SERVER_ERROR;

  	// 设置返回的状态码、请求头、发送错误信息
  	response.status(status);
  	response.header('Content-Type', 'application/json; charset=utf-8'); 
  	response.send(errorResponse);
  }
}
