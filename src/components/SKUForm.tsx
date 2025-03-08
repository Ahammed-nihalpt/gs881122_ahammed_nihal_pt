interface SKUFormProps {
  onSubmit: () => void;
  value: { id?: number; name: string; price: number; cost: number };
  onChange: (value: { name: string; price: number; cost: number }) => void;
  onClose: () => void;
}

const SKUForm: React.FC<SKUFormProps> = ({ onSubmit, value, onChange, onClose }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    onChange({ ...value, [name]: inputValue });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
        onClose();
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          SKU Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={value.name}
          onChange={handleInputChange}
          placeholder="Enter SKU name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={value.price}
          onChange={handleInputChange}
          placeholder="Enter Price"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          Cost
        </label>
        <input
          type="number"
          name="cost"
          id="cost"
          value={value.cost}
          onChange={handleInputChange}
          placeholder="Enter cost"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
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
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {value.id ? 'Update Store' : 'Add Store'}
        </button>
      </div>
    </form>
  );
};

export default SKUForm;
