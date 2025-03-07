import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoreForm from '../components/StoreForm';
import { addStore, removeStore } from '../store/slices/storesSlice';
import { RootState } from '../store';

const StoresPage = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores);
  const [newStore, setNewStore] = useState('');

  const handleAddStore = () => {
    dispatch(addStore({ id: Date.now(), name: newStore }));
    setNewStore('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stores</h1>
      <StoreForm
        onSubmit={handleAddStore}
        value={newStore}
        onChange={setNewStore}
        stores={stores}
      />
      <ul className="mt-4 space-y-2">
        {stores.map((store) => (
          <li key={store.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <span>{store.name}</span>
            <button
              onClick={() => dispatch(removeStore(store.id))}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoresPage;
