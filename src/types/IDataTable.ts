export interface IColumn {
  key: string;
  header: string;
}

export interface IRowProps<T extends RowData> {
  row: T;
  columns: IColumn[];
  onRemove?: (id: number) => void;
  onEdit?: (row: T) => void;
  enableDrag: boolean;
}

export interface RowData {
  id: number;
  [key: string]: string | number;
}

export interface IDataTableProps<T extends { id: number }> {
  columns: IColumn[];
  rows: T[];
  onRemove?: (id: number) => void;
  onEdit?: (row: T) => void;
  onReorder?: (newRows: T[]) => void;
}
