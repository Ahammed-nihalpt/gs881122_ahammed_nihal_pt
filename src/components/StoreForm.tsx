import React from 'react';

interface StoreFormProps {
  onSubmit: () => void;
  value: { id?: number; name: string; city: string; state: string };
  onChange: (value: { name: string; city: string; state: string }) => void;
  onClose: () => void;
}

const StoreForm: React.FC<StoreFormProps> = ({ onSubmit, value, onChange, onClose }) => {
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
          Store Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={value.name}
          onChange={handleInputChange}
          placeholder="Enter store name"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          value={value.city}
          onChange={handleInputChange}
          placeholder="Enter city"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State
        </label>
        <input
          type="text"
          name="state"
          id="state"
          value={value.state}
          onChange={handleInputChange}
          placeholder="Enter state"
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

export default StoreForm;
