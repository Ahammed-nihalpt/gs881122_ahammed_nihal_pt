import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useStores = () => {
  return useSelector((state: RootState) => state.stores);
};

export default useStores;
