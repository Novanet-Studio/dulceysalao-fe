import { object, string, minLength, type Output } from 'valibot';
import type { FormSubmitEvent } from '#ui/types';
import { PaymentReportError, SendInvoiceEmailError } from '~/errors';

type Form = {
  name: string;
  lastName: string;
  date: string;
  amount: string;
  confirmation: string;
};

interface Params {
  equalAmountTo: string;
  method: PaymentMethod;
  payment: {
    validation: (form: Form) => boolean;
    message: string;
  };
}

interface UsePaymentForm {
  schema: any;
  state: any;
  isSending: Ref<boolean>;
  hasError: Ref<boolean>;
  submit: (event: FormSubmitEvent<FormData>) => Promise<void>;
}

export default function usePaymentForm({
  equalAmountTo,
  method,
  payment,
}: Params): UsePaymentForm {
  if (!equalAmountTo || !method || !payment?.message || !payment?.validation) {
    throw new Error('usePaymentForm: All parameters are required');
  }

  const isSending = useState('isSending', () => false);
  const hasError = useState('hasError', () => false);

  const cart = useCartStore();
  const invoice = useInvoiceStore();
  const productStore = useProductStore();

  const state = reactive({
    name: '',
    lastName: '',
    date: '',
    amount: '',
    confirmation: '',
  });

  const schema = object({
    name: string([minLength(1, 'Este campo es requerido')]),
    lastName: string([minLength(1, 'Este campo es requerido')]),
    date: string([minLength(1, 'Este campo es requerido')]),
    amount: string(),
    confirmation: string([minLength(1, 'Este campo es requerido')]),
  });

  type FormData = Output<typeof schema>;

  async function submit({ data }: FormSubmitEvent<FormData>) {
    try {
      isSending.value = true;

      if (payment.validation(data)) {
        useToast().add({
          icon: 'i-ph-warning',
          title: 'Error',
          description: payment.message,
          color: 'red',
        });
        return;
      }

      const [valid, invalid] = await productStore.checkStock();

      if (invalid.length) {
        invalid.forEach((product) => {
          useToast().add({
            icon: 'i-ph-warning',
            title: 'Error',
            description: `El producto ${product.name} está agotado o excede la cantidad disponible`,
            color: 'red',
          });
        });

        useToast().add({
          icon: 'i-ph-info',
          title: 'Ayuda',
          description:
            'Puedes ir al carrito y eliminar los productos que están agotados o reducir la cantidad hasta cumplir la cantidad disponible',
          color: 'blue',
        });

        return;
      }

      const paymentData: PaymentObject = {
        orderId: crypto.randomUUID(),
        name: data.name,
        lastname: data.lastName,
        confirmation: data.confirmation,
        amount: equalAmountTo,
        paymentDate: data.date,
      };

      const invoiceItems: CartItem[] = cart.cartItems.filter((item) =>
        valid.find((product) => product.id === item.id)
      );

      await invoice.createInvoiceReport(paymentData, invoiceItems, method);
      await productStore.update();

      useToast().add({
        icon: 'i-ph-check',
        title: '¡Éxito!',
        description: 'La orden ha sido generada, está pendiente de aprobación',
        color: 'green',
      });

      await invoice.sendEmail(invoiceItems, paymentData);
    } catch (error) {
      if (error instanceof PaymentReportError) {
        useToast().add({
          icon: 'i-ph-warning',
          title: 'Error',
          description: 'Hubo un error al reportar tu pago',
          color: 'red',
        });
      }

      if (error instanceof SendInvoiceEmailError) {
        useToast().add({
          icon: 'i-ph-warning',
          title: 'Error',
          description: 'Hubo un error al enviar el correo electrónico',
          color: 'red',
        });
      }
    } finally {
      isSending.value = false;
    }
  }

  return {
    isSending,
    state,
    schema,
    submit,
  };
}
