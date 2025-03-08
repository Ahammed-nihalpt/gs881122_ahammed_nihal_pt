import { useSelector } from 'react-redux';
import { RootState } from '../store';

const usePlanning = () => {
  return useSelector((state: RootState) => state.planning);
};

export default usePlanning;
