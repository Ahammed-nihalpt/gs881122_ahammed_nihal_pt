interface Column {
  key: string;
  header: string;
}

interface DataTableProps<T> {
  columns: Column[];
  rows: T[];
  onRemove?: (id: number) => void;
  onEdit?: (row: T) => void;
}

const DataTable = <T extends { id: number }>({
  columns,
  rows,
  onRemove,
  onEdit,
}: DataTableProps<T>) => {
  return (
    <table className="w-full mt-4 border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((column) => (
            <th key={column.key} className="p-2 border border-gray-300">
              {column.header}
            </th>
          ))}
          {(onRemove || onEdit) && <th className="p-2 border border-gray-300">Actions</th>}
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
            {(onRemove || onEdit) && (
              <td className="p-2 border border-gray-300 text-center space-x-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(row)} // Call onEdit with the row data
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                )}
                {onRemove && (
                  <button
                    onClick={() => onRemove(row.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
