export default function useAppAuth() {
  const token = useStrapiToken();
  const { setToken, setUser } = useStrapiAuth();
  const authStore = useAuthStore();

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
      router.push('/auth/login');
      return;
    }
  });
}
