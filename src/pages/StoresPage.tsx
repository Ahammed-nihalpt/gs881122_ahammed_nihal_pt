import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addStore, removeStore } from '../store/slices/storesSlice';

const StoresPage = () => {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const dispatch = useDispatch();
  const [storeName, setStoreName] = useState('');

  const handleAddStore = () => {
    if (storeName.trim()) {
      dispatch(addStore({ id: Date.now(), name: storeName }));
      setStoreName('');
    }
  };

  return (
    <div>
      <h1>Stores</h1>
      <input
        type="text"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        placeholder="Enter store name"
      />
      <button onClick={handleAddStore}>Add Store</button>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            {store.name} <button onClick={() => dispatch(removeStore(store.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoresPage;
