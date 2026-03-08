import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtTokenAdapter } from './infrastructure/adapters/jwt.adapter';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    PassportModule,
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    { provide: 'TokenRepository', useClass: JwtTokenAdapter },
  ],
  exports: [PassportModule, JwtModule, 'TokenRepository'],
})
export class SharedModule {}
