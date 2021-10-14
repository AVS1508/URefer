import { DynamicModule, Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtGuard } from "./jwt-guard";
import { AppController } from "./app.controller";

@Global()
@Module({
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: 'LOGIN_SERVICE',
  //       transport: Transport.TCP,
  //       options: {
  //         host: process.env.login_host,
  //         port: 1234,
  //       },
  //     },
  //   ]),
  // ],
  // controllers: [AppController],
  // exports: [JwtGuard],
})
export class GuardsModule {
  static forRoot(): DynamicModule {
    const loginService = ClientsModule.register([
      {
        name: 'LOGIN_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.login_host,
          port: 1234,
        },
      },
    ]);
    return {
      imports: [loginService],
      module: GuardsModule,
      providers: [JwtGuard],
      exports: [loginService],
      controllers: [AppController],
    };
  }
}
