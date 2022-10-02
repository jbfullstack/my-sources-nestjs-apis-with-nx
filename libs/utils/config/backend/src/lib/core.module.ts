import { Module } from '@nestjs/common'
import { ConfigModule } from "@nestjs/config";
import { configuration } from "./config/configuration";
import { validationSchema } from "./config/validation";
import { GraphQLModule } from "@nestjs/graphql";
import { CoreResolver } from './core.resolver';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { LogModule } from 'libs/utils/log/backend/src';


@Module({
  imports: [
    LogModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    
  ],
  controllers: [],
  providers: [CoreResolver],
  exports: [],
})
export class CoreModule {}
