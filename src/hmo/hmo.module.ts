import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HmoController } from './hmo.controller';
import { HmoService } from './hmo.service';
import { Hmo } from './entities/hmo.entity';
import { HealthcarePlan } from './entities/healthcare-plan.entity';
import { AccountTier } from './entities/account-tier.entity';
import { Hospital } from './entities/hospital.entity';
import { PlanSubscription } from './entities/plan-subscription.entity';
import { PreAuthRequest } from './entities/pre-auth-request.entity';
import { ProviderEnrollment } from './entities/provider-enrollment.entity';
import { Dependent } from './entities/dependent.entity';
import { ProviderRating } from './entities/provider-rating.entity';
import { ProviderService } from './entities/provider-service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Hmo,
      HealthcarePlan,
      AccountTier,
      Hospital,
      PlanSubscription,
      PreAuthRequest,
      ProviderEnrollment,
      Dependent,
      ProviderRating,
      ProviderService,
    ]),
  ],
  controllers: [HmoController],
  providers: [HmoService],
  exports: [HmoService],
})
export class HmoModule {}
