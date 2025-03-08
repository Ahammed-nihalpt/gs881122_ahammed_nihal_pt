import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSortable } from '@dnd-kit/sortable';
import { IRowProps, RowData } from '../types/IDataTable';

const Row = <T extends RowData>({ row, columns, onRemove, onEdit, enableDrag }: IRowProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: row.id,
    disabled: !enableDrag,
  });

  return (
    <tr
      ref={enableDrag ? setNodeRef : undefined}
      style={{
        transform: enableDrag ? CSS.Transform.toString(transform) : undefined,
        transition: enableDrag ? transition : undefined,
        background: 'white',
      }}
      className="hover:bg-gray-100"
    >
      {enableDrag && (
        <td className="p-2 border border-gray-300 cursor-grab text-center">
          <span {...attributes} {...listeners} className="cursor-grab">
            <DragIndicatorIcon className="text-gray-500 hover:text-gray-700" />
          </span>
        </td>
      )}

      {columns.map((column) => (
        <td key={column.key} className="p-2 border border-gray-300">
          {String(row[column.key])}
        </td>
      ))}

      {(onRemove || onEdit) && (
        <td className="p-2 border border-gray-300 text-center space-x-2">
          {onEdit && (
            <button onClick={() => onEdit(row)} className="text-blue-500 hover:text-blue-700">
              Edit
            </button>
          )}
          {onRemove && (
            <button onClick={() => onRemove(row.id)} className="text-red-500 hover:text-red-700">
              Remove
            </button>
          )}
        </td>
      )}
    </tr>
  );
};

export default Row;
