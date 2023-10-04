import strapiMapper from 'smapper';
import { GetCategories } from '~/graphql/queries';
import type { Ref } from 'vue';

interface Params {
  ordered?: boolean;
}

interface Result {
  categories: Ref<Category[]>;
  categoriesResult: Ref<Category[]>;
  categoryActive: Ref<string>;
  isLoading: Ref<boolean>;
  filterByCategory: (categoryId: string, selector?: string) => void;
  removeFilters: () => void;
}

export default function useCategory(params?: Params): Result {
  const categories = useState<Category[]>('categories', () => []);
  const categoriesResult = useState<Category[]>('categoriesResult', () => []);
  const categoryActive = useState('categoryActive', () => '');
  const isLoading = useState<boolean>('isCategoriesLoading', () => false);

  const graphql = useStrapiGraphQL();
  const { $notify } = useNuxtApp();

  const getCategories = async () => {
    try {
      isLoading.value = true;
      const response = await graphql<CategoriesRequest>(GetCategories);

      if (params?.ordered) {
        const ordered = response.data.categories.data.sort(
          (a: CategoriesData, b: CategoriesData) => Number(a.id) - Number(b.id)
        );
        categories.value = strapiMapper<Category[]>(ordered);
        categoriesResult.value = strapiMapper<Category[]>(ordered);
        return;
      }

      categories.value = strapiMapper(response.data.categories.data);
      categoriesResult.value = strapiMapper(response.data.categories.data);
    } catch (error) {
      console.log(error);
      $notify({
        group: '',
        title: 'Error',
        text: 'Hubo un error al intentar cargar las categorias',
      });
      categories.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const filterByCategory = (categoryId: string, selector = '') => {
    categoryActive.value = categoryId;
    categoriesResult.value = categories.value.filter(
      (category) => category.id === categoryId
    );

    if (!selector) return;

    setTimeout(() => {
      document.querySelector(selector)?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 1000);
  };

  const removeFilters = () => {
    categoryActive.value = '';
    categoriesResult.value = categories.value;
    // getCategories();
  };

  onMounted(() => {
    getCategories();
  });

  return {
    categories,
    categoryActive,
    categoriesResult,
    isLoading,
    filterByCategory,
    removeFilters,
  };
}
