import { useState } from 'react';
import { useDispatch } from 'react-redux';
import StoreForm from '../components/StoreForm';
import { addStore, removeStore, updateStore, reorderStores } from '../store/slices/storesSlice';
import { IStore } from '../types/IStores';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable/DataTable';
import { addStoreInPlan, deleteStoreInPlan, editStoreInPlan } from '../store/slices/planningSlice';
import useStores from '../hooks/useStores';
import useSKU from '../hooks/useSKU';

const StoresPage = () => {
  const dispatch = useDispatch();
  const stores = useStores();
  const skus = useSKU();
  const [newStore, setNewStore] = useState({ name: '', city: '', state: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<IStore | null>(null);

  const handleAddStore = () => {
    const store = { id: Date.now(), ...newStore };
    dispatch(addStore(store));
    dispatch(addStoreInPlan({ store, skus }));
    setNewStore({ name: '', city: '', state: '' });
  };
  const handleEditStore = (store: IStore) => {
    setEditingStore(store);
    setIsModalOpen(true);
  };

  const handleUpdateStore = () => {
    if (editingStore) {
      dispatch(updateStore(editingStore));
      dispatch(editStoreInPlan({ storeId: editingStore.id, newName: editingStore.name }));
      setEditingStore(null);
      setIsModalOpen(false);
    }
  };

  const handleRemoveStore = (id: number) => {
    dispatch(removeStore(id));
    dispatch(deleteStoreInPlan(id));
  };

  const handleReorder = (newRows: typeof rows) => {
    dispatch(reorderStores(newRows));
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
        onReorder={handleReorder}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <StoreForm
          onSubmit={editingStore ? handleUpdateStore : handleAddStore}
          value={editingStore ? editingStore : newStore}
          onChange={(value) => {
            if (editingStore) {
              setEditingStore({ ...editingStore, ...value });
            } else {
              setNewStore(value);
            }
          }}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default StoresPage;
