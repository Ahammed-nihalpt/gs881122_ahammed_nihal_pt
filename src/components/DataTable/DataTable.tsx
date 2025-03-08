import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Row from './Row';
import { IDataTableProps } from '../../types/IDataTable';

const DataTable = <T extends { id: number }>({
  columns,
  rows,
  onRemove,
  onEdit,
  onReorder,
}: IDataTableProps<T>) => {
  const handleDragEnd = (event: DragEndEvent) => {
    if (!onReorder) return;

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = rows.findIndex((row) => row.id === Number(active.id));
    const newIndex = rows.findIndex((row) => row.id === Number(over.id));
    const newRows = arrayMove(rows, oldIndex, newIndex);
    onReorder(newRows);
  };

  const TableContent = (
    <table className="w-full mt-4 border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {onReorder && <th className="p-2 border border-gray-300 w-10"> </th>}
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
          <Row
            key={row.id}
            row={row}
            columns={columns}
            onEdit={onEdit}
            onRemove={onRemove}
            enableDrag={!!onReorder}
          />
        ))}
      </tbody>
    </table>
  );

  return onReorder ? (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
        {TableContent}
      </SortableContext>
    </DndContext>
  ) : (
    TableContent
  );
};

export default DataTable;
