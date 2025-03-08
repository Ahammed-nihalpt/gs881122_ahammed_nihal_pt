import React from 'react';
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { IChart } from '../types/IChart';

interface IChartProps {
  data: IChart[];
}
const GrossMarginChart: React.FC<IChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
        <XAxis dataKey="week" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#ff7300" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="gmDollars" fill="#6495ED" name="GM Dollars" />
        <Line yAxisId="right" dataKey="gmPercent" stroke="#FF4500" name="GM %" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default GrossMarginChart;
