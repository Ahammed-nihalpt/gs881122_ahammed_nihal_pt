import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSKU, removeSKU } from '../store/slices/skusSlice';
import SKUForm from '../components/SKUForm';
import { ISKU } from '../types/ISKU';
import { RootState } from '../store';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const SKUsPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const skus = useSelector((state: RootState) => state.skus);
  const [newSKU, setNewSKU] = useState({ name: '', price: 0, cost: 0 });

  const handleAddSKU = () => {
    dispatch(addSKU({ id: Date.now(), ...newSKU }));
    setNewSKU({ name: '', price: 0, cost: 0 });
  };

  const handleRemoveSKU = (id: number) => {
    dispatch(removeSKU(id));
  };

  const columns = [
    { key: 'name', header: 'SKU' },
    { key: 'price', header: 'price' },
    { key: 'cost', header: 'Cost' },
  ];

  const rows: ISKU[] = skus.map((sku) => ({
    id: sku.id,
    name: sku.name,
    price: sku.price,
    cost: sku.cost,
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Stores</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Store
      </button>
      <DataTable<ISKU> columns={columns} rows={rows} onRemove={handleRemoveSKU} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SKUForm
          onSubmit={handleAddSKU}
          value={newSKU}
          onChange={setNewSKU}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default SKUsPage;
