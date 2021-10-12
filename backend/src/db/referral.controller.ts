import {
  Body,
  Controller,
  Inject,
  NotFoundException,
  Post,
  Patch,
  Delete,
  Get,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices';

@Controller('referral')
export class ReferralController {
  constructor(@Inject('DB_SERVICE') private readonly dbService: ClientProxy) {}

  @Post('createReferral')
  public async createReferral(
    // @Body('id') id: number,
    // @Body('resume_id') resume_id: number,
    // @Body('to_email') to_email: string,
    // @Body('description') description: string,
    // @Body('referee_name') referee_name: string,
    // @Body('is_internal') is_internal: boolean,
    // @Body('position_id') position_id: number,
    // @Body('employee_id') employee_id: number,
    @Body() data,
  ) {
    console.log('Creating a new referral');
    const cmd = { cmd: 'createReferral' };
    // const data = {
    //   id,
    //   resume_id,
    //   to_email,
    //   description,
    //   referee_name,
    //   is_internal,
    //   position_id,
    //   employee_id,
    // };
    const response = this.dbService.send(cmd, data);
    return response;
  }

  @Patch('updateReferral')
  public async updateReferral(
    @Query('id') id: number,
    @Body('resume_id') resume_id?: number,
    @Body('to_email') to_email?: string,
    @Body('description') description?: string,
    @Body('referee_name') referee_name?: string,
    @Body('is_internal') is_internal?: boolean,
    @Body('position_id') position_id?: number,
    @Body('employee_id') employee_id?: number,
  ) {
    console.log('Updating an existing referral');
    const cmd = { cmd: 'updateReferral' };
    const data = {
      id,
      resume_id,
      to_email,
      description,
      referee_name,
      is_internal,
      position_id,
      employee_id,
    };
    const response = this.dbService.send(cmd, data);
    return response;
  }

  @Delete('deleteReferral')
  public async deleteReferral(@Query('id') id: number) {
    console.log('Delete an existing referral');
    const cmd = { cmd: 'deleteReferral' };
    const data = { id };
    const response = this.dbService.send(cmd, data);
    return response;
  }

  @Get('getReferral')
  public async getReferral(@Query('id') id: number) {
    console.log('Fetch an existing referral (by id)');
    const cmd = { cmd: 'getReferral' };
    const data = { id };
    const response = this.dbService.send(cmd, data);
    return response;
  }

  @Get('getReferralsByEmployee')
  public async getReferralsByEmployee(
    @Query('employee_id') employee_id: number,
  ) {
    console.log('Fetch existing referrals (by employee)');
    const cmd = { cmd: 'getReferralsByEmployee' };
    const data = { employee_id };
    const response = this.dbService.send(cmd, data);
    return response;
  }

  @Get('getReferralsByPosition')
  public async getReferralsByPosition(
    @Query('position_id') position_id: number,
  ) {
    console.log('Fetch existing referrals (by position)');
    const cmd = { cmd: 'getReferralsByPosition' };
    const data = { position_id };
    const response = this.dbService.send(cmd, data);
    return response;
  }
}
