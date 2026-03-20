import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';
import { Card } from '@logdeck/shared';

interface EventsVolumeChartProps {
  data: any[];
}

const EventsVolumeChart: React.FC<EventsVolumeChartProps> = ({ data }) => {
  return (
    <Card 
      className="h-[400px] flex flex-col group"
      styles={{ body: { height: '100%', display: 'flex', flexDirection: 'column', padding: '24px' } }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-display font-semibold text-text-primary tracking-tight">
            Events Volume
          </h4>
          <p className="text-xs text-text-muted mt-0.5">Total events processed per interval</p>
        </div>
        <div className="flex bg-bg-surface rounded-lg p-1 border border-border-muted overflow-hidden">
          {['24h', '7d', '30d'].map((p, i) => (
            <button key={p} className={i === 0 ? "px-3 py-1 text-xs font-medium bg-bg-elevated text-brand-primary rounded-md border border-brand-primary/20 shadow-sm transition-all" : "px-3 py-1 text-xs font-medium text-text-muted hover:text-text-primary transition-all"}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full mt-4 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3ECF8E" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#3ECF8E" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#898989', fontSize: 11 }}
              dy={10} 
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis 
              hide 
              domain={[0, 'dataMax + 100']} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F1F1F', 
                border: '1px solid #2A2A2A', 
                borderRadius: '8px',
                fontSize: '12px',
                color: '#FAFAFA'
              }}
              itemStyle={{ color: '#3ECF8E' }}
              cursor={{ stroke: 'rgba(62, 207, 142, 0.2)', strokeWidth: 2 }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3ECF8E" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={1500}
              dot={{ r: 0 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#3ECF8E' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default EventsVolumeChart;
