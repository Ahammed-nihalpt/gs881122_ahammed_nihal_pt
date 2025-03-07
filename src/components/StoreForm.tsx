import React from 'react';
import { IStore } from '../types/IStores';
import { useState } from 'react';

interface StoreFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  stores: IStore[];
}

const StoreForm: React.FC<StoreFormProps> = ({ onSubmit, value, onChange, stores }) => {
  const [error, setError] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) {
      setError('Store name cannot be empty.');
      return;
    }

    if (stores.find((store) => value.trim().toLowerCase() == store.name.trim().toLowerCase())) {
      setError('Store name already exists.');
      return;
    }

    setError('');
    onSubmit();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg w-full max-w-md"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setError(''); // Clear error on input change
        }}
        placeholder="Enter store name"
        className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-400'
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="hover:bg-[#e5e5e5] p-3 rounded-md transition-all active:scale-95"
      >
        Add Store
      </button>
    </form>
  );
};

export default StoreForm;
