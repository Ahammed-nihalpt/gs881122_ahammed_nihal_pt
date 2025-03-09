import React, { useState } from 'react';

interface SKUFormProps {
  onSubmit: () => void;
  value: { id?: number; name: string; price?: number; cost?: number };
  onChange: (value: { name: string; price?: number; cost?: number }) => void;
  onClose: () => void;
}

const SKUForm: React.FC<SKUFormProps> = ({ onSubmit, value, onChange, onClose }) => {
  const [errors, setErrors] = useState<{ name?: string; price?: string; cost?: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;

    let newValue: string | number = inputValue;

    if (name === 'name') {
      newValue = inputValue; // Ensure name is always a string
    } else {
      newValue = inputValue === '' ? '' : Number(inputValue); // Convert numbers correctly
    }

    onChange({ ...value, [name]: newValue });

    if (name === 'name' && inputValue.trim() === '') {
      setErrors((prev) => ({ ...prev, name: 'SKU name is required' }));
    } else if (
      (name === 'price' || name === 'cost') &&
      (newValue === '' || isNaN(Number(inputValue)) || Number(inputValue) <= 0)
    ) {
      setErrors((prev) => ({ ...prev, [name]: 'Must be a positive number' }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; price?: string; cost?: string } = {};
    console.log('🚀 ~ handleSubmit ~ value.name.:', value.name);

    if (!value.name.trim()) newErrors.name = 'SKU name is required';
    if (value.price !== undefined && value.price < 0) newErrors.price = 'Must be a positive number';
    if (value.cost !== undefined && value.cost < 0) newErrors.cost = 'Must be a positive number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          SKU Name *
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={value.name}
          onChange={handleInputChange}
          placeholder="Enter SKU name"
          className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price *
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={value.price ?? ''}
          onChange={handleInputChange}
          placeholder="Enter Price"
          className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
      </div>

      <div>
        <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
          Cost *
        </label>
        <input
          type="number"
          name="cost"
          id="cost"
          value={value.cost ?? ''}
          onChange={handleInputChange}
          placeholder="Enter cost"
          className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${errors.cost ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost}</p>}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[#6ca8b4] text-white rounded-md hover:bg-[#2f8a9c] disabled:bg-gray-300"
          disabled={
            !value.name.trim() || !value.price || value.price <= 0 || !value.cost || value.cost <= 0
          }
        >
          {value.id ? 'Update SKU' : 'Add SKU'}
        </button>
      </div>
    </form>
  );
};

export default SKUForm;
