import store from '@/store';
import { resetIsHiddenSearchBar } from '@/store/reducers/ui';

// 重置搜索栏显示状态
export const checkSearchBarLoader = async () => {
  store.dispatch(resetIsHiddenSearchBar());
  return null;
};
