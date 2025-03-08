import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSKU, removeSKU, updateSKU } from '../store/slices/skusSlice';
import SKUForm from '../components/SKUForm';
import { ISKU } from '../types/ISKU';
import { RootState } from '../store';
import Modal from '../components/Modal';
import DataTable from '../components/DataTable/DataTable';

const SKUsPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const skus = useSelector((state: RootState) => state.skus);
  const [newSKU, setNewSKU] = useState({ name: '', price: 0, cost: 0 });
  const [editingSKU, setEditingSKU] = useState<ISKU | null>(null);

  const handleAddSKU = () => {
    dispatch(addSKU({ id: Date.now(), ...newSKU }));
    setNewSKU({ name: '', price: 0, cost: 0 });
  };

  const handleRemoveSKU = (id: number) => {
    dispatch(removeSKU(id));
  };
  const handleEditSKU = (store: ISKU) => {
    setEditingSKU(store);
    setIsModalOpen(true);
  };
  const handleUpdateSKU = () => {
    if (editingSKU) {
      dispatch(updateSKU(editingSKU));
      setEditingSKU(null);
      setIsModalOpen(false);
    }
  };

  const columns = [
    { key: 'sno', header: 'S.No' },
    { key: 'name', header: 'SKU' },
    { key: 'price', header: 'price' },
    { key: 'cost', header: 'Cost' },
  ];

  const rows: ISKU[] = skus.map((sku, index) => ({
    id: sku.id,
    sno: index + 1,
    name: sku.name,
    price: sku.price,
    cost: sku.cost,
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">SKUs</h1>
      <button
        onClick={() => {
          setEditingSKU(null);
          setIsModalOpen(true);
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add SKU
      </button>
      <DataTable<ISKU>
        columns={columns}
        rows={rows}
        onRemove={handleRemoveSKU}
        onEdit={handleEditSKU}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SKUForm
          onSubmit={editingSKU ? handleUpdateSKU : handleAddSKU}
          value={editingSKU ? editingSKU : newSKU}
          onChange={(value) => {
            if (editingSKU) {
              setEditingSKU({ ...editingSKU, ...value }); // Update editing store
            } else {
              setNewSKU(value); // Update new store
            }
          }}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default SKUsPage;
