import { Body, Controller, Delete, Get, Inject, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { JwtGuard } from "../guards/jwt-guard";
import { ManagerOnly, RolesGuard } from "../guards/role.guards";

@UseGuards(JwtGuard, RolesGuard)
@Controller('referral')
export class ReferralController {
  constructor(@Inject('DB_SERVICE') private readonly dbService: ClientProxy) {}

  @Post('createReferral')
  public async createReferral(@Req() req, @Body() data) {
    console.log('Creating a new referral');
    data.referrerId = req.user.userId;
    data.create_date = new Date();
    const cmd = { cmd: 'createReferral' };
    console.log(data);
    try {
      return this.dbService.send(cmd, data);
    } catch (e) {
      throw e;
    }
  }

  @Patch('updateReferral')
  public async updateReferral(@Req() req, @Body() data) {
    console.log('Updating an existing referral');
    const cmd = { cmd: 'updateReferral' };
    try {
      return this.dbService.send(cmd, data);
    } catch (e) {
      throw e;
    }
  }

  @Delete('deleteReferral')
  public async deleteReferral(@Query('id') id: number) {
    console.log('Delete an existing referral');
    const cmd = { cmd: 'deleteReferral' };
    const data = { id };
    return this.dbService.send(cmd, data);
  }

  @Get('getReferral')
  public async getReferral(@Query('id') id: number) {
    console.log('Fetch an existing referral (by id)');
    const cmd = { cmd: 'getReferral' };
    const data = { id };
    return this.dbService.send(cmd, data);
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

  @ManagerOnly()
  @Get('getUnreadReferral')
  public async getUnreadReferral(@Req() req) {
    const cmd = { cmd: 'getUnreadReferral' };
    return this.dbService.send(cmd, req.user.userId);
  }

  @Post('readReferral')
  public async readReferral(@Req() req, @Body() body) {
    const cmd = { cmd: 'readReferral' };
    this.dbService.emit(cmd, body.id);
  }
}
