import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';
import { QueryDto } from 'src/config/dto/query.dto';

export class EnrollmentQueryDto extends QueryDto {
  @ApiProperty({
    description: 'Admin ID of the user making the request',
    example: 'd3b07384-d9a0-4f5c-a3dd-9b3786cb1df0',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  adminId: string;

  @ApiProperty({
    description: 'Filter by enrollment status',
    example: 'active',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    description: 'Start date for filtering (YYYY-MM-DD)',
    example: '2024-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'End date for filtering (YYYY-MM-DD)',
    example: '2024-01-31',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
