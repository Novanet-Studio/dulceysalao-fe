import services from '~/services';
import config from '~/config/config.json';
import { LoginQuery, RegisterQuery } from '~/graphql/mutations';

type StrapiUser = {
  id: number | null;
  username?: string;
  email?: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
} | null;

type User = StrapiUser & {
  customerId: string;
};

export const useAuthStore = defineStore(
  config.store.auth,
  () => {
    const strapiToken = useStrapiToken();
    const { setToken, fetchUser } = useStrapiAuth();
    const graphql = useStrapiGraphQL();

    const cart = useCartStore();
    const product = useProductStore();
    const router = useRouter();

    const token = ref('');
    const user = reactive<User>({
      id: null,
      customerId: '',
    });

    const authenticated = ref(false);

    async function login(
      identifier: string,
      password: string
    ): Promise<boolean> {
      const { data } = await graphql<LoginRequest>(LoginQuery, {
        identifier,
        password,
      });

      if (!data) {
        useToast().add({
          icon: 'i-ph-warning',
          title: 'Oops!',
          description: 'Email o contraseña incorrectos',
          color: 'red',
        });
        return false;
      }

      setToken(data.login.jwt);
      authenticated.value = true;
      token.value = data.login.jwt;
      Object.assign(user, data.login.user);

      useToast().add({
        icon: 'i-ph-check',
        title: '¡Éxito!',
        description: '¡Inicio de sesión exitoso!',
      });

      return true;
    }

    async function register(user: Partial<User>): Promise<boolean> {
      const { data } = await graphql<RegisterRequest>(RegisterQuery, user);

      if (!data) {
        useToast().add({
          icon: 'i-ph-warning',
          title: 'Oops!',
          description: 'Correo electrónico ya registrado',
          color: 'red',
        });
        return false;
      }

      setToken(data.register.jwt);
      authenticated.value = true;
      Object.assign(user, data.register.user);

      useToast().add({
        icon: 'i-ph-check',
        title: '¡Éxito!',
        description: 'El registro fue exitoso',
      });

      return true;
    }

    async function refresh() {
      const userData = await fetchUser();

      if (!userData?.value?.id) return;

      token.value = strapiToken.value;
      authenticated.value = true;
      Object.assign(user, userData.value);
    }

    async function createCustomer(user: string, email: string) {
      try {
        const idempotencyKey = crypto.randomUUID();
        const data = {
          idempotencyKey,
          givenName: user,
          emailAddress: email,
        };

        const { data: result } = await services.createCustomer(data);

        return result;
      } catch (error) {
        throw new Error('Failed to create customer');
      }
    }

    function logout() {
      $reset();
      cart.$reset();
      product.$reset();
      router.push({
        path: '/',
        force: true,
      });

      useToast().add({
        icon: 'i-ph-check',
        title: 'La sesión se cerró correctamente',
      });
    }

    function $reset() {
      token.value = '';
      authenticated.value = false;
      Object.assign(user, { id: 0, customerId: '' });
    }

    return {
      token,
      user,
      authenticated,
      login,
      register,
      refresh,
      createCustomer,
      $reset,
      logout,
    };
  },
  { persist: true }
);
