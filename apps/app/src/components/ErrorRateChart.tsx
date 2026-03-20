import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card } from '@logdeck/shared';
import { MoreHorizontal } from 'lucide-react';

interface ErrorRateChartProps {
  data: any[];
}

const ErrorRateChart: React.FC<ErrorRateChartProps> = ({ data }) => {
  return (
    <Card 
      className="h-[400px] flex flex-col group"
      styles={{ body: { height: '100%', display: 'flex', flexDirection: 'column', padding: '24px' } }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-display font-semibold text-text-primary tracking-tight">
            Error Rate
          </h4>
          <p className="text-xs text-text-muted mt-0.5">Correlation between failures and alerts</p>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-bg-surface text-text-muted transition-all">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="flex-1 w-full mt-4 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#898989', fontSize: 11 }}
              dy={10} 
              interval="preserveStartEnd"
              minTickGap={40}
            />
            <YAxis 
              hide 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F1F1F', 
                border: '1px solid #2A2A2A', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              align="center" 
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: '20px', fontSize: '11px', color: '#898989' }}
            />
            <Line 
              type="monotone" 
              dataKey="errors" 
              name="Errors"
              stroke="#FF5C5C" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: '#FF5C5C' }}
              animationDuration={1500}
            />
            <Line 
              type="monotone" 
              dataKey="warnings" 
              name="Warnings"
              stroke="#F5A524" 
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: '#F5A524' }}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ErrorRateChart;
