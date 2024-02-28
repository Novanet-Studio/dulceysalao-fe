export default function useAppAuth() {
  const router = useRouter();
  const token = useStrapiToken();
  const authStore = useAuthStore();
  const { setToken, setUser } = useStrapiAuth();

  onMounted(async () => {
    if (!authStore.token && (!authStore.user?.id || !authStore.authenticated)) {
      await authStore.refresh();
      return;
    }

    if (!token.value && authStore.token) {
      setToken(authStore.token);
      return;
    }

    if (!token.value && !authStore.token) {
      useToast().add({
        icon: 'i-ph-warning',
        title: 'Sesión expirada',
        description:
          'Tu sesión ha expirado. Por favor inicia sesión nuevamente',
        color: 'orange',
      });
      router.push('/');
      return;
    }
  });
}
