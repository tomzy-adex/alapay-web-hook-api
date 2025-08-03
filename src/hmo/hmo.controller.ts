import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { HmoService } from './hmo.service';
import { CreateHmoDto } from './dto/create-hmo.dto';
import { UpdateHmoDto } from './dto/update-hmo.dto';
import { CreateHealthcarePlanDto } from './dto/create-healthcare-plan.dto';
import { UpdateHealthcarePlanDto } from './dto/update-healthcare-plan.dto';
import { CreateAccountTierDto } from './dto/create-account-tier.dto';
import { UpdateAccountTierDto } from './dto/update-account-tier.dto';
import { HmoQueryDto, HmosQueryDto, AccountTierQueryDto, HealthcarePlanQueryDto } from './dto/hmo-query.dto';
import { DashboardQueryDto } from './dto/dashboard-query.dto';
import { EnrollmentQueryDto } from './dto/enrollment-query.dto';
import { AdminGuard } from '../utils/guards/admin.guard';

@ApiTags('HMO Management')
@Controller('hmo')
@UseGuards(AdminGuard)
@ApiBearerAuth()
export class HmoController {
  constructor(private readonly hmoService: HmoService) {}

  // HMO Management
  @Post()
  @ApiOperation({ summary: 'Create a new HMO' })
  @ApiResponse({ status: 201, description: 'HMO created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createHmo(@Body() createHmoDto: CreateHmoDto) {
    return this.hmoService.createHmo(createHmoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all HMOs with pagination' })
  @ApiResponse({ status: 200, description: 'HMOs retrieved successfully' })
  async getAllHmos(@Query() query: HmosQueryDto) {
    return this.hmoService.getAllHmos(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get HMO by ID' })
  @ApiResponse({ status: 200, description: 'HMO retrieved successfully' })
  @ApiResponse({ status: 404, description: 'HMO not found' })
  async getHmoById(@Param('id') id: string, @Query() query: HmoQueryDto) {
    return this.hmoService.getHmoById(id, query);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update HMO' })
  @ApiResponse({ status: 200, description: 'HMO updated successfully' })
  @ApiResponse({ status: 404, description: 'HMO not found' })
  async updateHmo(@Param('id') id: string, @Body() updateHmoDto: UpdateHmoDto) {
    return this.hmoService.updateHmo(id, updateHmoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete HMO' })
  @ApiResponse({ status: 204, description: 'HMO deleted successfully' })
  @ApiResponse({ status: 404, description: 'HMO not found' })
  async deleteHmo(@Param('id') id: string) {
    return this.hmoService.deleteHmo(id);
  }

  // Healthcare Plans Management
  @Post(':hmoId/plans')
  @ApiOperation({ summary: 'Create healthcare plan for HMO' })
  @ApiResponse({ status: 201, description: 'Healthcare plan created successfully' })
  async createHealthcarePlan(
    @Param('hmoId') hmoId: string,
    @Body() createPlanDto: CreateHealthcarePlanDto,
  ) {
    return this.hmoService.createHealthcarePlan(hmoId, createPlanDto);
  }

  @Get(':hmoId/plans')
  @ApiOperation({ summary: 'Get all healthcare plans for HMO' })
  @ApiResponse({ status: 200, description: 'Healthcare plans retrieved successfully' })
  async getHealthcarePlans(@Param('hmoId') hmoId: string, @Query() query: HmoQueryDto) {
    return this.hmoService.getHealthcarePlans(hmoId, query);
  }

  @Get(':hmoId/plans/:planId')
  @ApiOperation({ summary: 'Get healthcare plan by ID' })
  @ApiResponse({ status: 200, description: 'Healthcare plan retrieved successfully' })
  async getHealthcarePlanById(
    @Param('hmoId') hmoId: string,
    @Param('planId') planId: string,
    @Query() query: HealthcarePlanQueryDto,
  ) {
    return this.hmoService.getHealthcarePlanById(hmoId, planId, query);
  }

  @Put(':hmoId/plans/:planId')
  @ApiOperation({ summary: 'Update healthcare plan' })
  @ApiResponse({ status: 200, description: 'Healthcare plan updated successfully' })
  async updateHealthcarePlan(
    @Param('hmoId') hmoId: string,
    @Param('planId') planId: string,
    @Body() updatePlanDto: UpdateHealthcarePlanDto,
  ) {
    return this.hmoService.updateHealthcarePlan(hmoId, planId, updatePlanDto);
  }

  @Delete(':hmoId/plans/:planId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete healthcare plan' })
  @ApiResponse({ status: 204, description: 'Healthcare plan deleted successfully' })
  async deleteHealthcarePlan(@Param('hmoId') hmoId: string, @Param('planId') planId: string) {
    return this.hmoService.deleteHealthcarePlan(hmoId, planId);
  }

  // Account Tiers Management
  @Post(':hmoId/account-tiers')
  @ApiOperation({ summary: 'Create account tier for HMO' })
  @ApiResponse({ status: 201, description: 'Account tier created successfully' })
  async createAccountTier(
    @Param('hmoId') hmoId: string,
    @Body() createAccountTierDto: CreateAccountTierDto,
  ) {
    return this.hmoService.createAccountTier(hmoId, createAccountTierDto);
  }

  @Get(':hmoId/account-tiers')
  @ApiOperation({ summary: 'Get all account tiers for HMO' })
  @ApiResponse({ status: 200, description: 'Account tiers retrieved successfully' })
  async getAccountTiers(@Param('hmoId') hmoId: string, @Query() query: HmoQueryDto) {
    return this.hmoService.getAccountTiers(hmoId, query);
  }

  @Get(':hmoId/account-tiers/:tierId')
  @ApiOperation({ summary: 'Get account tier by ID' })
  @ApiResponse({ status: 200, description: 'Account tier retrieved successfully' })
  async getAccountTierById(
    @Param('hmoId') hmoId: string,
    @Param('tierId') tierId: string,
    @Query() query: AccountTierQueryDto,
  ) {
    return this.hmoService.getAccountTierById(hmoId, tierId, query);
  }

  @Put(':hmoId/account-tiers/:tierId')
  @ApiOperation({ summary: 'Update account tier' })
  @ApiResponse({ status: 200, description: 'Account tier updated successfully' })
  async updateAccountTier(
    @Param('hmoId') hmoId: string,
    @Param('tierId') tierId: string,
    @Body() updateAccountTierDto: UpdateAccountTierDto,
  ) {
    return this.hmoService.updateAccountTier(hmoId, tierId, updateAccountTierDto);
  }

  @Delete(':hmoId/account-tiers/:tierId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete account tier' })
  @ApiResponse({ status: 204, description: 'Account tier deleted successfully' })
  async deleteAccountTier(@Param('hmoId') hmoId: string, @Param('tierId') tierId: string) {
    return this.hmoService.deleteAccountTier(hmoId, tierId);
  }

  // Dashboard and Analytics
  @Get(':hmoId/dashboard')
  @ApiOperation({ summary: 'Get HMO dashboard data' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  async getDashboard(@Param('hmoId') hmoId: string, @Query() query: DashboardQueryDto) {
    return this.hmoService.getDashboard(hmoId, query);
  }

  // Enrollment Management
  @Get(':hmoId/enrollments')
  @ApiOperation({ summary: 'Get HMO enrollments' })
  @ApiResponse({ status: 200, description: 'Enrollments retrieved successfully' })
  async getEnrollments(@Param('hmoId') hmoId: string, @Query() query: EnrollmentQueryDto) {
    return this.hmoService.getEnrollments(hmoId, query);
  }

  // Hospital Management
  @Get(':hmoId/hospitals')
  @ApiOperation({ summary: 'Get hospitals associated with HMO' })
  @ApiResponse({ status: 200, description: 'Hospitals retrieved successfully' })
  async getHospitals(@Param('hmoId') hmoId: string, @Query() query: HmoQueryDto) {
    return this.hmoService.getHospitals(hmoId, query);
  }

  @Post(':hmoId/hospitals/:hospitalId')
  @ApiOperation({ summary: 'Associate hospital with HMO' })
  @ApiResponse({ status: 201, description: 'Hospital associated successfully' })
  async associateHospital(@Param('hmoId') hmoId: string, @Param('hospitalId') hospitalId: string) {
    return this.hmoService.associateHospital(hmoId, hospitalId);
  }

  @Delete(':hmoId/hospitals/:hospitalId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove hospital association with HMO' })
  @ApiResponse({ status: 204, description: 'Hospital association removed successfully' })
  async removeHospitalAssociation(@Param('hmoId') hmoId: string, @Param('hospitalId') hospitalId: string) {
    return this.hmoService.removeHospitalAssociation(hmoId, hospitalId);
  }
}
