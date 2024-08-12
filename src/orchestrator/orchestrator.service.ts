import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class OrchestratorService implements OnModuleInit {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderServiceClient: ClientProxy,
    @Inject('PRODUCT_SERVICE')
    private readonly productServiceClient: ClientProxy,
    @Inject('PAYMENT_SERVICE')
    private readonly paymentServiceClient: ClientProxy,
    @Inject('KITCHEN_SERVICE')
    private readonly kitchenServiceClient: ClientProxy,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationServiceClient: ClientProxy,
  ) { }

  async onModuleInit() {
    await Promise.all([
      this.orderServiceClient.connect(),
      this.productServiceClient.connect(),
      this.paymentServiceClient.connect(),
      this.kitchenServiceClient.connect(),
      this.notificationServiceClient.connect(),
    ]);
  }

  @EventPattern('orderCreated')
  async handleOrderCreated(data: any) {
    console.log('Order Created Event Received:', data);
    // const { orderId } = data;
    // const productsAvailable = await this.productServiceClient
    //   .send({ cmd: 'checkAvailability' }, { orderId })
    //   .toPromise();

    // if (productsAvailable) {
    //   const paymentProcessed = await this.paymentServiceClient
    //     .send({ cmd: 'processPayment' }, { orderId })
    //     .toPromise();

    //   if (paymentProcessed) {
    //     await this.kitchenServiceClient
    //       .emit({ cmd: 'startPreparation' }, { orderId })
    //       .toPromise();
    //     await this.kitchenServiceClient
    //       .send({ cmd: 'orderReady' }, { orderId })
    //       .toPromise();
    //     await this.notificationServiceClient
    //       .emit({ cmd: 'notifyCustomer' }, { orderId })
    //       .toPromise();
    //   } else {
    //     await this.orderServiceClient
    //       .emit({ cmd: 'cancelOrder' }, { orderId })
    //       .toPromise();
    //   }
    // } else {
    //   await this.orderServiceClient
    //     .emit({ cmd: 'cancelOrder' }, { orderId })
    //     .toPromise();
    // }
  }
}
