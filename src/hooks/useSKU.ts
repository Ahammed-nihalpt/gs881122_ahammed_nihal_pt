import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useSKU = () => {
  return useSelector((state: RootState) => state.skus);
};

export default useSKU;
