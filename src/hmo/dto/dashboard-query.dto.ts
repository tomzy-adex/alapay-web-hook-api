import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class DashboardQueryDto {
  @ApiProperty({
    description: 'Admin ID of the user making the request',
    example: 'd3b07384-d9a0-4f5c-a3dd-9b3786cb1df0',
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  adminId: string;

  @ApiProperty({
    description: 'Start date for analytics (YYYY-MM-DD)',
    example: '2024-01-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'End date for analytics (YYYY-MM-DD)',
    example: '2024-01-31',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
