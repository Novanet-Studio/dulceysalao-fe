<script lang="ts" setup>
import { GetAddressByIdAndType } from '~/graphql/queries';
import { AddressType } from '~/config/constants';
import { PaymentReportError } from '~/errors';
import services from '~/services';

interface State {
  card: Square.Card | null;
}

interface CheckBillingResponse {
  addressLine1: string;
  locality: string;
  postalCode: string;
  country: string;
}

const { SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID } = useRuntimeConfig().public;

const graphql = useStrapiGraphQL();
const auth = useAuthStore();
const cart = useCartStore();
const productStore = useProductStore();
const checkout = useCheckoutStore();
const invoice = useInvoiceStore();

const state = reactive<State & Record<any, any>>({
  card: null,
  isLoading: false,
  cardButtonDisabled: false,
});

const isLoadingCard = ref(false);
const btnRef = ref(null);

const checkBilling = async (): Promise<CheckBillingResponse> => {
  const defaultResponse = {
    addressLine1: 'no aplicable',
    locality: 'no aplicable',
    postalCode: '0000',
    country: 'VE',
  };

  try {
    const body = {
      id: +auth.user.id,
      type: AddressType.Billing,
    };

    const { data } = await graphql<any>(GetAddressByIdAndType, body);
    const isDataAnArray =
      data?.addresses && Array.isArray(data.addresses?.data);
    const isDataValid = data?.addresses?.data.length;

    if (!data.addresses || (isDataAnArray && !isDataValid)) {
      return defaultResponse;
    }

    const { address } = data?.addresses?.data[0]?.attributes;

    return {
      addressLine1: address.address || defaultResponse.addressLine1,
      locality: address.city || defaultResponse.locality,
      postalCode: address.zipCode || defaultResponse.postalCode,
      country: address.country || defaultResponse.country,
    };
  } catch (error) {
    console.log('error checking billing: ', error);
    return defaultResponse;
  }
};

const createPayment = async (paymentBody: any, products: Product[]) => {
  try {
    const { data } = (await services.generatePayment(paymentBody)) as {
      data: Ref<any>;
    };

    if (data.value.status !== 'COMPLETED') {
      useToast().add({
        icon: 'i-ph-warning',
        title: 'Error',
        description: 'El pago no se realizó',
        color: 'red',
      });
      state.isLoading = false;
      return;
    }

    useToast().add({
      icon: 'i-ph-check',
      title: '¡Éxito!',
      description: 'El pago se ha realizado con éxito',
      color: 'green',
    });

    const invoiceItems: CartItem[] = cart.cartItems.filter((item) => {
      return products.find((product) => product.id === item.id);
    });

    const response = await invoice.createVisaInvoice(data.value, invoiceItems);

    if (!response?.data?.createInvoice?.data?.id) {
      useToast().add({
        icon: 'i-ph-warning',
        title: 'Error',
        description: 'Hubo un problema al generar la factura',
        color: 'red',
      });
      state.isLoading = false;
      return;
    }

    await productStore.update();

    useToast().add({
      icon: 'i-ph-check',
      title: '¡Éxito!',
      description: 'Tu recibo fue creado, puedes revisarlo en tus pedidos',
      color: 'green',
    });

    await invoice.sendVisaEmail(invoiceItems, data.value);
  } catch (error) {
    console.log('createPayment: ', error);
    if (error instanceof PaymentReportError) {
      useToast().add({
        icon: 'i-ph-warning',
        title: 'Error',
        description: 'Hubo un error en el pago, por favor intenta nuevamente',
        color: 'red',
      });
      return;
    }
  }
};

const makePayment = async (tokenResult: Square.TokenResult) => {
  try {
    state.isLoading = true;
    state.cardButtonDisabled = true;

    const idempotencyKey = crypto.randomUUID();

    if (tokenResult.status !== 'OK') {
      useToast().add({
        icon: 'i-ph-warning',
        title: 'Error',
        description:
          'Hubo un problema al iniciar el proceso de compra, inténtalo nuevamente',
        color: 'red',
      });
      return;
    }

    const payment = {
      idempotencyKey,
      locationId: SQUARE_LOCATION_ID,
      sourceId: tokenResult.token,
      customerId: auth.user?.customerId ?? '',
      amountMoney: {
        amount: cart.amount * 100,
        currency: 'USD',
      },
      buyerEmailAddress: auth.user.email,
      shippingAddress: {
        addressLine1: `${checkout.address}`,
        home: checkout.home,
        locality: checkout.city,
        postalCode: checkout.zipCode,
        country: 'VE',
        phone: checkout.phone,
      },
      billingAddress: {},
      note: checkout.fullName,
    };

    const billing = await checkBilling();
    payment.billingAddress = billing;
    await createPayment(payment, cart.cartItems as unknown as Product[]);
  } catch (err) {
    console.log(err);
  } finally {
    state.isLoading = false;
    state.cardButtonDisabled = false;
  }
};

const loadSquareCard = async () => {
  try {
    isLoadingCard.value = true;
    const payments = Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID);

    const card = await payments.card();
    await card.attach('#card-container');

    // @ts-ignore
    btnRef.value.$el.addEventListener('click', async () => {
      const tokenResult = await card.tokenize();
      makePayment(tokenResult);
    });
  } catch (error) {
    useToast().add({
      icon: 'i-ph-warning',
      title: 'Error',
      description:
        'Hubo un error con el formulario de la tarjeta, por favor recarga la página',
      color: 'red',
    });
    console.error('error: ', { error });
  } finally {
    isLoadingCard.value = false;
  }
};

onBeforeMount(async () => {
  await loadSquareCard();
});
</script>

<template>
  <div class="my-12">
    <form id="payment-form">
      <div class="animate-pulse my-8" v-if="isLoadingCard">
        <div class="w-full h-12 bg-gray-200 rounded-md"></div>
      </div>
      <div id="card-container"></div>
      <div class="visa__terms-wrapper">
        <p class="visa__text">
          Al realizar esta compra usted acepta
          <a href="#" class="visa__link">nuestros términos y condiciones</a>.
        </p>

        <UButton
          class="!bg-color-1 hover:!bg-color-1-700"
          ref="btnRef"
          label="Pagar"
          block
          size="lg"
          :disabled="state.cardButtonDisabled"
        >
          <template #leading>
            <AppLoader v-if="state.isLoading" />
          </template>
        </UButton>
      </div>
    </form>
    <div id="payment-status-container"></div>
  </div>
</template>

<style scoped>
.visa__terms-wrapper {
  @apply text-[#707070];
}

.visa__text {
  @apply text-xs mb-8 text-center lg:text-sm;
}

.visa__link {
  @apply text-color-8 font-semibold;
}
</style>
