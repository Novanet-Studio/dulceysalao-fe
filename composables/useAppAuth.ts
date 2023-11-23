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
        title: 'Session expired',
        description: 'Your session has expired. Please login again',
        color: 'orange',
      });
      router.push('/auth/login');
      return;
    }
  });
}
