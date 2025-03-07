import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoreForm from '../components/StoreForm';
import { addStore, removeStore, updateStore } from '../store/slices/storesSlice';
import { RootState } from '../store';
import { IStore } from '../types/IStores';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const StoresPage = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores);
  const [newStore, setNewStore] = useState({ name: '', city: '', state: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<IStore | null>(null);

  const handleAddStore = () => {
    dispatch(addStore({ id: Date.now(), ...newStore }));
    setNewStore({ name: '', city: '', state: '' });
  };
  const handleEditStore = (store: IStore) => {
    setEditingStore(store);
    setIsModalOpen(true);
  };

  const handleUpdateStore = () => {
    if (editingStore) {
      dispatch(updateStore(editingStore));
      setEditingStore(null);
      setIsModalOpen(false);
    }
  };

  const handleRemoveStore = (id: number) => {
    dispatch(removeStore(id));
  };

  const columns = [
    { key: 'sno', header: 'S.No' },
    { key: 'name', header: 'Store' },
    { key: 'city', header: 'City' },
    { key: 'state', header: 'State' },
  ];

  const rows: IStore[] = stores.map((store, index) => ({
    id: store.id,
    sno: index + 1,
    name: store.name,
    city: store.city,
    state: store.state,
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stores</h1>
      <button
        onClick={() => {
          setEditingStore(null);
          setIsModalOpen(true);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Store
      </button>
      <DataTable<IStore>
        columns={columns}
        rows={rows}
        onRemove={handleRemoveStore}
        onEdit={handleEditStore}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <StoreForm
          onSubmit={editingStore ? handleUpdateStore : handleAddStore}
          value={editingStore ? editingStore : newStore}
          onChange={(value) => {
            if (editingStore) {
              setEditingStore({ ...editingStore, ...value }); // Update editing store
            } else {
              setNewStore(value); // Update new store
            }
          }}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default StoresPage;
