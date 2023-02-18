import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app/app.module'

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  const configSwagger = new DocumentBuilder()
    .setTitle('My Sources')
    .setDescription('The my-sources API description')
    .setVersion('1.0')
    .addTag('sources')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  const port = config.get('port')
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix)
    Logger.log('Listening at http://localhost:' + port + '/graphql')
    Logger.log(`🚀 Running in ${config.get('environment')} mode`)
  })
}
bootstrap()