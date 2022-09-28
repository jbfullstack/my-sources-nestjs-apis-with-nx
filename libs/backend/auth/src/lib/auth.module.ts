import { Module } from '@nestjs/common'
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { DataModule } from '@jbhive/data'
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { GqlAuthGuard } from './guards/gql-auth.guards';
import { LogModule } from '@jbhive/log';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LogModule,
    DataModule, 
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt_secret'),
        signOptions: { expiresIn: +configService.get('jwt_expire') },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [],
  providers: [AuthResolver, AuthService, JwtStrategy, GqlAuthGuard],
  exports: [],
})
export class AuthModule {}
