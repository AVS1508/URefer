import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "BACKEND_SERVICE",
        transport: Transport.TCP,
        options: {
          port: 3000,
        },
      },
      {
        name: "DB_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.db_host,
          port: 3001,
        },
      },
    ]),
    JwtModule.register({
      secret: "123456789",
      signOptions: {
        expiresIn: "2 days",
      },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
