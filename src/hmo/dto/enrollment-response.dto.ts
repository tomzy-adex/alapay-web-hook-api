import { Status } from '../../utils/types';

export class EnrollmentResponseDto {
  data: EnrollmentData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class EnrollmentData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  enrolleeNo: string;
  status: Status;
  planName: string;
  planType: string;
  startDate: Date;
  endDate: Date;
  dependentsCount: number;
  lastPaymentDate: Date;
  nextPaymentDate: Date;
}
