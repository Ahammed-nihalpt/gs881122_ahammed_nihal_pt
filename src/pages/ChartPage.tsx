import React, { useEffect, useState } from 'react';
import usePlanning from '../hooks/usePlanning';
import useStores from '../hooks/useStores';
import GMChart from '../components/GMChart';
import convertDataForChart from '../utils/convertDataForChart';
import { useDispatch } from 'react-redux';
import useSKU from '../hooks/useSKU';
import { initializePlanningData } from '../store/slices/planningSlice';
import { IChart } from '../types/IChart';

const ChartPage: React.FC = () => {
  const dispatch = useDispatch();
  const planning = usePlanning();
  const stores = useStores();
  const skus = useSKU();
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [chartData, setChartData] = useState<IChart[]>([]);
  useEffect(() => {
    if (stores.length > 0 && skus.length > 0 && planning.length <= 0) {
      const store = selectedStore ? stores.find((value) => value.id === selectedStore) : stores[0];
      if (store) {
        dispatch(initializePlanningData({ stores: [store], skus }));
        setChartData(convertDataForChart(planning));
      }
    } else if (planning.length > 0 && stores.length > 0 && skus.length > 0) {
      const storeId = selectedStore ? selectedStore : stores[0].id;
      const filteredPlanning = planning.filter((value) => value.storeId === storeId);
      setChartData(convertDataForChart(filteredPlanning));
    }
  }, [stores, skus, dispatch, selectedStore, planning]);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Store Performance</h1>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <label htmlFor="store-select" className="text-sm md:text-base font-medium text-gray-600">
          Select Store:
        </label>
        <select
          id="store-select"
          onChange={(e) => setSelectedStore(Number(e.target.value))}
          className="w-full md:w-auto px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <GMChart data={chartData} />
      </div>
    </div>
  );
};

export default ChartPage;
