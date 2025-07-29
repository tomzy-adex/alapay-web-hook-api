import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as isUuid, v4 } from 'uuid';
import { parseStringPromise, Builder } from 'xml2js';
import { UserRepository } from './repositories/user.repository';
import { ProcessStatus, Status } from '../utils/types';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string) {
    console.log('ID is here now:', id);

    try {
      if (!isUuid(id)) {
        throw new BadRequestException(`Invalid UUID format for ID: ${id}`);
      }

      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return {
        success: true,
        message: 'User retrieved successfully',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async validateCustomer(xml: string): Promise<string> {
    try {
      console.log('XML is here now:', xml);

      const parsed = await parseStringPromise(xml, { explicitArray: false });
      const request = parsed.CustomerInformationRequest;

      const {
        MerchantReference,
        CustReference,
        Amount,
        ThirdPartyCode,
        ServiceUrl,
        ServiceUsername,
        ServicePassword,
        PaymentItemCode,
        RequestReference,
        TerminalId,
        FtpUsername,
      } = request;

      // Simulate fetching customer data (replace with actual logic if needed)
      const customer = await this.getUserById(CustReference);

      if (customer.data.status !== ProcessStatus.APPROVED) {
        const errorResponse = {
          CustomerInformationResponse: {
            MerchantReference,
            CustReference,
            Customers: {
              Customer: {
                Status: '1',
                ErrorMessage: `Customer with reference ${CustReference} is not approved`,
              },
            },
          },
        };

        const builder = new Builder({ headless: true });
        return builder.buildObject(errorResponse);
      }
      if (customer.data.accountStatus !== Status.ACTIVE) {
        const errorResponse = {
          CustomerInformationResponse: {
            MerchantReference,
            CustReference,
            Customers: {
              Customer: {
                Status: '1',
                ErrorMessage: `Customer with reference ${CustReference} is not active`,
              },
            },
          },
        };

        const builder = new Builder({ headless: true });
        return builder.buildObject(errorResponse);
      }

      const customerData = {
        CustomerInformationResponse: {
          MerchantReference,
          CustReference,
          Customers: {
            Customer: {
              Status: '0',
              CustomerReference: CustReference,
              CustomerReferenceAlternate: '',
              FirstName: customer.data.firstName,
              LastName: customer.data.lastName,
              Email: customer.data.email,
              Phone: customer.data.phoneNumber,
              ThirdPartyCode: ThirdPartyCode || '',
              Amount: parseFloat(Amount).toFixed(2),
              ServiceUrl: ServiceUrl || '',
              ServiceUsername: ServiceUsername || '',
              ServicePassword: ServicePassword || '',
              PaymentItemCode: PaymentItemCode || '',
              RequestReference: RequestReference || '',
              TerminalId: TerminalId || '',
              FtpUsername: FtpUsername || '',
            },
          },
        },
      };

      const builder = new Builder({ headless: true });
      return builder.buildObject(customerData);
    } catch (error) {
      const errorResponse = {
        CustomerInformationResponse: {
          MerchantReference: '',
          CustReference: '',
          Customers: {
            Customer: {
              Status: '1',
              ErrorMessage: error.message || 'An error occurred',
            },
          },
        },
      };

      const builder = new Builder({ headless: true });
      return builder.buildObject(errorResponse);
    }
  }

  async processNotification(
    xml: string,
  ): Promise<{ statusCode: number; body: string }> {
    try {
      console.log('XML is here now:', xml);

      const parsed = await parseStringPromise(xml, { explicitArray: false });
      const request = parsed.PaymentNotificationRequest;
      const payment = request.Payments?.Payment;
      const paymentItem = payment?.PaymentItems?.PaymentItem;

      const { CustReference, Amount, PaymentReference, ReceiptNo } = payment;

      // Simulate fetching customer data (replace with actual logic if needed)
      const customer = await this.getUserById(CustReference);
      try {
        if (customer.data.status !== ProcessStatus.APPROVED) {
          throw new ForbiddenException(
            `Customer with reference ${CustReference} is not approved`,
          );
        }
        if (customer.data.accountStatus !== Status.ACTIVE) {
          throw new ForbiddenException(
            `Customer with reference ${CustReference} is not active`,
          );
        }

        // Simulate saving the payment or performing logic
        if (parseFloat(Amount) <= 0) {
          throw new ForbiddenException('Invalid payment data received');
        }
      } catch (error) {
        const errorResponse = {
          PaymentNotificationResponse: {
            Payments: {
              Payment: {
                PaymentLogId: PaymentReference || '',
                Status: '1',
                ErrorMessage: error.message || 'An error occurred',
              },
            },
          },
        };

        const builder = new Builder({ headless: true });
        return {
          statusCode: 403,
          body: builder.buildObject(errorResponse),
        };
      }

      payment.PaymentReference = v4();
      payment.PaymentDate = new Date().toISOString();
      payment.CustomerName =
        customer.data.firstName + ' ' + customer.data.lastName;
      payment.ReceiptNo = ReceiptNo || '';
      payment.PaymentStatus = '0';
      payment.PaymentCurrency = 'NGN';
      paymentItem.ItemAmount = parseFloat(Amount).toFixed(2);

      const confirmation = {
        PaymentNotificationResponse: {
          Payments: {
            Payment: {
              PaymentLogId: PaymentReference,
              Status: '0',
            },
          },
        },
      };

      const builder = new Builder({ headless: true });
      return {
        statusCode: 200,
        body: builder.buildObject(confirmation),
      };
    } catch (error) {
      const errorResponse = {
        PaymentNotificationResponse: {
          Payments: {
            Payment: {
              PaymentLogId: '',
              Status: '1',
              ErrorMessage: error.message || 'An error occurred',
            },
          },
        },
      };

      const builder = new Builder({ headless: true });
      return {
        statusCode: 500,
        body: builder.buildObject(errorResponse),
      };
    }
  }
}
