interface Column {
  key: string;
  header: string;
}

interface DataTableProps<T> {
  columns: Column[];
  rows: T[];
  onRemove?: (id: number) => void;
}

const DataTable = <T extends { id: number }>({ columns, rows, onRemove }: DataTableProps<T>) => {
  return (
    <table className="w-full mt-4 border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((column) => (
            <th key={column.key} className="p-2 border border-gray-300">
              {column.header}
            </th>
          ))}
          {onRemove && <th className="p-2 border border-gray-300">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-100">
            {columns.map((column) => (
              <td key={column.key} className="p-2 border border-gray-300">
                {String(row[column.key as keyof T])}
              </td>
            ))}
            {onRemove && (
              <td className="p-2 border border-gray-300 text-center">
                <button
                  onClick={() => onRemove(row.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
