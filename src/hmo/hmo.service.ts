import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hmo } from './entities/hmo.entity';
import { HealthcarePlan } from './entities/healthcare-plan.entity';
import { AccountTier } from './entities/account-tier.entity';
import { Hospital } from './entities/hospital.entity';
import { PlanSubscription } from './entities/plan-subscription.entity';
import { PreAuthRequest } from './entities/pre-auth-request.entity';
import { ProviderEnrollment } from './entities/provider-enrollment.entity';
import { CreateHmoDto } from './dto/create-hmo.dto';
import { UpdateHmoDto } from './dto/update-hmo.dto';
import { CreateHealthcarePlanDto } from './dto/create-healthcare-plan.dto';
import { UpdateHealthcarePlanDto } from './dto/update-healthcare-plan.dto';
import { CreateAccountTierDto } from './dto/create-account-tier.dto';
import { UpdateAccountTierDto } from './dto/update-account-tier.dto';
import { HmoQueryDto, HmosQueryDto, AccountTierQueryDto, HealthcarePlanQueryDto } from './dto/hmo-query.dto';
import { DashboardQueryDto } from './dto/dashboard-query.dto';
import { EnrollmentQueryDto } from './dto/enrollment-query.dto';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import { EnrollmentResponseDto, EnrollmentData } from './dto/enrollment-response.dto';
import { ProcessStatus, Status } from '../utils/types';

@Injectable()
export class HmoService {
  constructor(
    @InjectRepository(Hmo)
    private readonly hmoRepository: Repository<Hmo>,
    @InjectRepository(HealthcarePlan)
    private readonly healthcarePlanRepository: Repository<HealthcarePlan>,
    @InjectRepository(AccountTier)
    private readonly accountTierRepository: Repository<AccountTier>,
    @InjectRepository(Hospital)
    private readonly hospitalRepository: Repository<Hospital>,
    @InjectRepository(PlanSubscription)
    private readonly planSubscriptionRepository: Repository<PlanSubscription>,
    @InjectRepository(PreAuthRequest)
    private readonly preAuthRequestRepository: Repository<PreAuthRequest>,
    @InjectRepository(ProviderEnrollment)
    private readonly providerEnrollmentRepository: Repository<ProviderEnrollment>,
  ) {}

  // HMO Management
  async createHmo(createHmoDto: CreateHmoDto): Promise<Hmo> {
    const hmo = this.hmoRepository.create({
      ...createHmoDto,
      status: ProcessStatus.PENDING,
      accountStatus: Status.DORMANT,
    });
    return this.hmoRepository.save(hmo);
  }

  async getAllHmos(query: HmosQueryDto) {
    const { adminId, hmoId, page = 1, limit = 10, search, sortBy, sortOrder } = query;
    
    const queryBuilder = this.hmoRepository.createQueryBuilder('hmo')
      .leftJoinAndSelect('hmo.plans', 'plans')
      .leftJoinAndSelect('hmo.accountTiers', 'accountTiers')
      .leftJoinAndSelect('hmo.hospitals', 'hospitals');

    if (hmoId) {
      queryBuilder.andWhere('hmo.id = :hmoId', { hmoId });
    }

    if (search) {
      queryBuilder.andWhere(
        '(hmo.name ILIKE :search OR hmo.email ILIKE :search OR hmo.phoneNumber ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (sortBy) {
      queryBuilder.orderBy(`hmo.${sortBy}`, (sortOrder as 'ASC' | 'DESC') || 'ASC');
    } else {
      queryBuilder.orderBy('hmo.createdAt', 'DESC');
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [hmos, total] = await queryBuilder.getManyAndCount();

    return {
      data: hmos,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getHmoById(id: string, query: HmoQueryDto): Promise<Hmo> {
    const { adminId } = query;
    
    const hmo = await this.hmoRepository.findOne({
      where: { id },
      relations: ['plans', 'accountTiers', 'hospitals', 'organizations', 'providerClaims'],
    });

    if (!hmo) {
      throw new NotFoundException(`HMO with ID ${id} not found`);
    }

    return hmo;
  }

  async updateHmo(id: string, updateHmoDto: UpdateHmoDto): Promise<Hmo> {
    const hmo = await this.getHmoById(id, { adminId: '', hmoId: id });
    
    Object.assign(hmo, updateHmoDto);
    return this.hmoRepository.save(hmo);
  }

  async deleteHmo(id: string): Promise<void> {
    const hmo = await this.getHmoById(id, { adminId: '', hmoId: id });
    await this.hmoRepository.remove(hmo);
  }

  // Healthcare Plans Management
  async createHealthcarePlan(hmoId: string, createPlanDto: CreateHealthcarePlanDto): Promise<HealthcarePlan> {
    const hmo = await this.getHmoById(hmoId, { adminId: '', hmoId });
    
    const plan = this.healthcarePlanRepository.create({
      ...createPlanDto,
      hmo,
    });
    
    return this.healthcarePlanRepository.save(plan);
  }

  async getHealthcarePlans(hmoId: string, query: HmoQueryDto) {
    const { adminId, search, sortBy, sortOrder } = query;
    const page = 1;
    const limit = 10;
    
    const queryBuilder = this.healthcarePlanRepository.createQueryBuilder('plan')
      .leftJoinAndSelect('plan.hmo', 'hmo')
      .where('hmo.id = :hmoId', { hmoId });

    if (search) {
      queryBuilder.andWhere(
        '(plan.name ILIKE :search OR plan.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (sortBy) {
      queryBuilder.orderBy(`plan.${sortBy}`, (sortOrder as 'ASC' | 'DESC') || 'ASC');
    } else {
      queryBuilder.orderBy('plan.createdAt', 'DESC');
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [plans, total] = await queryBuilder.getManyAndCount();

    return {
      data: plans,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getHealthcarePlanById(hmoId: string, planId: string, query: HealthcarePlanQueryDto): Promise<HealthcarePlan> {
    const { adminId } = query;
    
    const plan = await this.healthcarePlanRepository.findOne({
      where: { id: planId, hmo: { id: hmoId } },
      relations: ['hmo', 'subscriptions'],
    });

    if (!plan) {
      throw new NotFoundException(`Healthcare plan with ID ${planId} not found for HMO ${hmoId}`);
    }

    return plan;
  }

  async updateHealthcarePlan(hmoId: string, planId: string, updatePlanDto: UpdateHealthcarePlanDto): Promise<HealthcarePlan> {
    const plan = await this.getHealthcarePlanById(hmoId, planId, { adminId: '', hmoId, planId });
    
    Object.assign(plan, updatePlanDto);
    return this.healthcarePlanRepository.save(plan);
  }

  async deleteHealthcarePlan(hmoId: string, planId: string): Promise<void> {
    const plan = await this.getHealthcarePlanById(hmoId, planId, { adminId: '', hmoId, planId });
    await this.healthcarePlanRepository.remove(plan);
  }

  // Account Tiers Management
  async createAccountTier(hmoId: string, createAccountTierDto: CreateAccountTierDto): Promise<AccountTier> {
    const hmo = await this.getHmoById(hmoId, { adminId: '', hmoId });
    
    const accountTier = this.accountTierRepository.create({
      ...createAccountTierDto,
      hmo,
    });
    
    return this.accountTierRepository.save(accountTier);
  }

  async getAccountTiers(hmoId: string, query: HmoQueryDto) {
    const { adminId, search, sortBy, sortOrder } = query;
    const page = 1;
    const limit = 10;
    
    const queryBuilder = this.accountTierRepository.createQueryBuilder('tier')
      .leftJoinAndSelect('tier.hmo', 'hmo')
      .where('hmo.id = :hmoId', { hmoId });

    if (search) {
      queryBuilder.andWhere(
        '(tier.name ILIKE :search OR tier.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (sortBy) {
      queryBuilder.orderBy(`tier.${sortBy}`, (sortOrder as 'ASC' | 'DESC') || 'ASC');
    } else {
      queryBuilder.orderBy('tier.createdAt', 'DESC');
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [tiers, total] = await queryBuilder.getManyAndCount();

    return {
      data: tiers,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAccountTierById(hmoId: string, tierId: string, query: AccountTierQueryDto): Promise<AccountTier> {
    const { adminId } = query;
    
    const tier = await this.accountTierRepository.findOne({
      where: { id: tierId, hmo: { id: hmoId } },
      relations: ['hmo'],
    });

    if (!tier) {
      throw new NotFoundException(`Account tier with ID ${tierId} not found for HMO ${hmoId}`);
    }

    return tier;
  }

  async updateAccountTier(hmoId: string, tierId: string, updateAccountTierDto: UpdateAccountTierDto): Promise<AccountTier> {
    const tier = await this.getAccountTierById(hmoId, tierId, { adminId: '', hmoId, accountTierId: tierId });
    
    Object.assign(tier, updateAccountTierDto);
    return this.accountTierRepository.save(tier);
  }

  async deleteAccountTier(hmoId: string, tierId: string): Promise<void> {
    const tier = await this.getAccountTierById(hmoId, tierId, { adminId: '', hmoId, accountTierId: tierId });
    await this.accountTierRepository.remove(tier);
  }

  // Dashboard and Analytics
  async getDashboard(hmoId: string, query: DashboardQueryDto): Promise<DashboardResponseDto> {
    const { adminId, startDate, endDate } = query;
    
    // Verify HMO exists
    await this.getHmoById(hmoId, { adminId, hmoId });

    // Get basic counts
    const totalPlans = await this.healthcarePlanRepository.count({
      where: { hmo: { id: hmoId } },
    });

    const totalAccountTiers = await this.accountTierRepository.count({
      where: { hmo: { id: hmoId } },
    });

    const totalHospitals = await this.hospitalRepository
      .createQueryBuilder('hospital')
      .innerJoin('hospital.hmos', 'hmo')
      .where('hmo.id = :hmoId', { hmoId })
      .getCount();

    // Get subscription statistics
    const subscriptionStats = await this.planSubscriptionRepository
      .createQueryBuilder('subscription')
      .leftJoin('subscription.plan', 'plan')
      .leftJoin('plan.hmo', 'hmo')
      .where('hmo.id = :hmoId', { hmoId })
      .andWhere(startDate ? 'subscription.createdAt >= :startDate' : '1=1', { startDate })
      .andWhere(endDate ? 'subscription.createdAt <= :endDate' : '1=1', { endDate })
      .select([
        'COUNT(subscription.id) as totalSubscriptions',
        'COUNT(CASE WHEN subscription.status = :activeStatus THEN 1 END) as activeSubscriptions',
        'COUNT(CASE WHEN subscription.status = :inactiveStatus THEN 1 END) as inactiveSubscriptions',
      ])
      .setParameter('activeStatus', Status.ACTIVE)
      .setParameter('inactiveStatus', Status.DORMANT)
      .getRawOne();

    // Get pre-auth request statistics
    const preAuthStats = await this.preAuthRequestRepository
      .createQueryBuilder('preAuth')
      .leftJoin('preAuth.hmo', 'hmo')
      .where('hmo.id = :hmoId', { hmoId })
      .andWhere(startDate ? 'preAuth.createdAt >= :startDate' : '1=1', { startDate })
      .andWhere(endDate ? 'preAuth.createdAt <= :endDate' : '1=1', { endDate })
      .select([
        'COUNT(preAuth.id) as totalRequests',
        'COUNT(CASE WHEN preAuth.status = :approvedStatus THEN 1 END) as approvedRequests',
        'COUNT(CASE WHEN preAuth.status = :rejectedStatus THEN 1 END) as rejectedRequests',
        'COUNT(CASE WHEN preAuth.status = :pendingStatus THEN 1 END) as pendingRequests',
      ])
      .setParameter('approvedStatus', ProcessStatus.APPROVED)
      .setParameter('rejectedStatus', ProcessStatus.REJECTED)
      .setParameter('pendingStatus', ProcessStatus.PENDING)
      .getRawOne();

    return {
      hmoId,
      summary: {
        totalPlans,
        totalAccountTiers,
        totalHospitals,
        totalSubscriptions: parseInt(subscriptionStats?.totalSubscriptions || '0'),
        activeSubscriptions: parseInt(subscriptionStats?.activeSubscriptions || '0'),
        inactiveSubscriptions: parseInt(subscriptionStats?.inactiveSubscriptions || '0'),
      },
      preAuthRequests: {
        total: parseInt(preAuthStats?.totalRequests || '0'),
        approved: parseInt(preAuthStats?.approvedRequests || '0'),
        rejected: parseInt(preAuthStats?.rejectedRequests || '0'),
        pending: parseInt(preAuthStats?.pendingRequests || '0'),
      },
      recentActivity: {
        // This would typically include recent subscriptions, claims, etc.
        lastUpdated: new Date(),
      },
    };
  }

  // Enrollment Management
  async getEnrollments(hmoId: string, query: EnrollmentQueryDto): Promise<EnrollmentResponseDto> {
    const { adminId, page = 1, limit = 10, status, startDate, endDate } = query;
    
    // Verify HMO exists
    await this.getHmoById(hmoId, { adminId, hmoId });

    const queryBuilder = this.providerEnrollmentRepository.createQueryBuilder('enrollment')
      .leftJoin('enrollment.hmo', 'hmo')
      .leftJoinAndSelect('enrollment.provider', 'provider')
      .where('hmo.id = :hmoId', { hmoId });

    if (status) {
      queryBuilder.andWhere('enrollment.status = :status', { status });
    }

    if (startDate) {
      queryBuilder.andWhere('enrollment.createdAt >= :startDate', { startDate });
    }

    if (endDate) {
      queryBuilder.andWhere('enrollment.createdAt <= :endDate', { endDate });
    }

    queryBuilder.orderBy('enrollment.createdAt', 'DESC');

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [enrollments, total] = await queryBuilder.getManyAndCount();

    const enrollmentData: EnrollmentData[] = enrollments.map(enrollment => ({
      id: enrollment.id,
      name: enrollment.provider?.name || '',
      email: enrollment.provider?.email || '',
      phoneNumber: enrollment.provider?.phone || '',
      enrolleeNo: enrollment.id, // Using enrollment ID as enrollee number
      status: enrollment.status as Status,
      planName: 'Provider Plan', // Default plan name
      planType: 'Provider', // Default plan type
      startDate: enrollment.startDate,
      endDate: enrollment.endDate,
      dependentsCount: 0, // Default value
      lastPaymentDate: enrollment.createdAt, // Using creation date as last payment
      nextPaymentDate: enrollment.endDate, // Using end date as next payment
    }));

    return {
      data: enrollmentData,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Hospital Management
  async getHospitals(hmoId: string, query: HmoQueryDto) {
    const { adminId, search, sortBy, sortOrder } = query;
    const page = 1;
    const limit = 10;
    
    const queryBuilder = this.hospitalRepository.createQueryBuilder('hospital')
      .innerJoin('hospital.hmos', 'hmo')
      .where('hmo.id = :hmoId', { hmoId });

    if (search) {
      queryBuilder.andWhere(
        '(hospital.name ILIKE :search OR hospital.address ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (sortBy) {
      queryBuilder.orderBy(`hospital.${sortBy}`, (sortOrder as 'ASC' | 'DESC') || 'ASC');
    } else {
      queryBuilder.orderBy('hospital.createdAt', 'DESC');
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [hospitals, total] = await queryBuilder.getManyAndCount();

    return {
      data: hospitals,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async associateHospital(hmoId: string, hospitalId: string): Promise<void> {
    const hmo = await this.getHmoById(hmoId, { adminId: '', hmoId });
    const hospital = await this.hospitalRepository.findOne({
      where: { id: hospitalId },
      relations: ['hmos'],
    });

    if (!hospital) {
      throw new NotFoundException(`Hospital with ID ${hospitalId} not found`);
    }

    if (!hospital.hmos) {
      hospital.hmos = [];
    }

    const isAlreadyAssociated = hospital.hmos.some(h => h.id === hmoId);
    if (isAlreadyAssociated) {
      throw new BadRequestException(`Hospital is already associated with this HMO`);
    }

    hospital.hmos.push(hmo);
    await this.hospitalRepository.save(hospital);
  }

  async removeHospitalAssociation(hmoId: string, hospitalId: string): Promise<void> {
    const hmo = await this.getHmoById(hmoId, { adminId: '', hmoId });
    const hospital = await this.hospitalRepository.findOne({
      where: { id: hospitalId },
      relations: ['hmos'],
    });

    if (!hospital) {
      throw new NotFoundException(`Hospital with ID ${hospitalId} not found`);
    }

    if (!hospital.hmos) {
      throw new BadRequestException(`Hospital is not associated with this HMO`);
    }

    hospital.hmos = hospital.hmos.filter(h => h.id !== hmoId);
    await this.hospitalRepository.save(hospital);
  }
}
