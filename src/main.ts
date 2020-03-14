import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { TransformInterceptor } from "./interceptors/transform.interceptor";
import * as bodyParser from "body-parser";
// import * as express from "express";
// import * as path from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  // app.use(express.static(path.join(__dirname, 'build')));
  // app.get('/', (req, res) => {
	//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
	// });
  app.useGlobalFilters(new HttpExceptionFilter()); // 使用全局异常捕获filter
  app.useGlobalInterceptors(new TransformInterceptor()); // 使用全局响应拦截器
  app.use(bodyParser.json({limit: '50mb'})); // 解决request entity too large问题
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  await app.listen(23000);
}
bootstrap();
