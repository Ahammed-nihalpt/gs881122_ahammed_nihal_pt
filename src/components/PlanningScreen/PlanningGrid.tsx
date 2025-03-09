import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  CellValueChangedEvent,
  ValueFormatterParams,
  CellClassParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useEffect } from 'react';
import useStores from '../../hooks/useStores';
import useSKU from '../../hooks/useSKU';
import usePlanning from '../../hooks/usePlanning';
import { useDispatch } from 'react-redux';
import { initializePlanningData, updateSalesUnits } from '../../store/slices/planningSlice';
import { IPlanningEntry, IPlanningEntryDisplay } from '../../types/IPlanning';
import transformPlanningEntriesForDisplay from '../../utils/transformPlanningEntriesForDisplay';

ModuleRegistry.registerModules([AllCommunityModule]);
const weeks = Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);
const GridExample = () => {
  const dispatch = useDispatch();
  const stores = useStores();
  const skus = useSKU();
  const planning = usePlanning();

  useEffect(() => {
    // Initializes planning data if it is empty and both stores and SKUs are available.
    if (stores.length > 0 && skus.length > 0 && planning.length <= 0) {
      dispatch(initializePlanningData({ stores, skus }));
    }
  }, [stores, skus, dispatch, planning.length]);

  // Defines column configurations for the AG-Grid, including store, SKU, and weekly sales data.
  const colDefs: ColDef<IPlanningEntryDisplay>[] = [
    { headerName: 'Store', field: 'store', pinned: 'left' },
    { headerName: 'SKU', field: 'sku', pinned: 'left' },
    ...weeks.map((week) => ({
      headerName: week,
      children: [
        {
          headerName: 'Sales Units',
          field: `weeklyData.${week}.salesUnits`,
          editable: true,
          onCellValueChanged: (params: CellValueChangedEvent<IPlanningEntry>) => {
            if (params.data && !isNaN(params.newValue)) {
              dispatch(
                updateSalesUnits({ id: params.data.id, week, salesUnits: Number(params.newValue) })
              );
            }
          },
        },
        {
          headerName: 'Sales Dollars',
          field: `weeklyData.${week}.salesDollars`,
          valueFormatter: (p: ValueFormatterParams) => {
            return `$${Number(p.value).toFixed(2)}`;
          },
        },
        {
          headerName: 'GM Dollars',
          field: `weeklyData.${week}.gmDollars`,
          valueFormatter: (p: ValueFormatterParams) => {
            return `$${Number(p.value).toFixed(2)}`;
          },
        },
        {
          headerName: 'GM %',
          field: `weeklyData.${week}.gmPercentage`,
          valueFormatter: (p: ValueFormatterParams) => `${Number(p.value).toFixed(1)}%`,
          cellStyle: (params: CellClassParams) => {
            const value = params.value as number;
            if (value >= 40) return { backgroundColor: 'green', color: 'white' };
            if (value >= 10) return { backgroundColor: 'yellow', color: 'black' };
            if (value >= 5) return { backgroundColor: 'orange', color: 'white' };
            return { backgroundColor: 'red', color: 'white' };
          },
        },
      ],
    })),
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={transformPlanningEntriesForDisplay(planning)}
        columnDefs={colDefs}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default GridExample;
