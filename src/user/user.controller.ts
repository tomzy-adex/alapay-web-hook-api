import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuditLog } from '../utils/decorators/audit-log.decorator';
import { AuditInterceptor } from 'src/audit-log/audit-interceptor.service';

@ApiTags('User')
@UseInterceptors(AuditInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({
    summary: 'Get user profile',
    description: 'Retrieves the profile information for the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @AuditLog('Get', 'User')
  async getAdminById(@Query('adminId') id: string) {
    return await this.userService.getUserById(id);
  }
  @Post('validate-customer')
  @ApiOperation({
    summary: 'Validate customer',
    description: 'Validates the customer information provided',
  })
  @ApiResponse({
    status: 200,
    description: 'Customer validated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid customer data',
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found',
  })
  @AuditLog('Post', 'User')
  async validateCustomer(@Body() xml: string) {
    return await this.userService.validateCustomer(xml);
  }

  @Post('process-payment')
  @ApiOperation({
    summary: 'Process notification',
    description:
      'Processes incoming notifications and handles them accordingly',
  })
  @ApiResponse({
    status: 200,
    description: 'Notification processed successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid notification data',
  })
  // @AuditLog('Post', 'User')
  async processNotification(@Body() notificationData: any) {
    return await this.userService.processNotification(notificationData);
  }
}
