import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeService } from './employee/employee.service';
import { CatsController } from './cat.controller';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '134351350Nozomi',
      database: 'aki',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }), EmployeeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
