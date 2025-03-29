
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine
} from 'recharts';

// Mock data for the regime detection chart
const recentRegimeData = [
  { date: '2023-04', regime: 'Bullish', volatility: 12, correlation: 0.4, probability: 0.78, returns: 2.3 },
  { date: '2023-05', regime: 'Bullish', volatility: 14, correlation: 0.5, probability: 0.82, returns: 1.7 },
  { date: '2023-06', regime: 'Transition', volatility: 18, correlation: 0.6, probability: 0.65, returns: 0.5 },
  { date: '2023-07', regime: 'Bearish', volatility: 25, correlation: 0.7, probability: 0.72, returns: -1.2 },
  { date: '2023-08', regime: 'Bearish', volatility: 28, correlation: 0.8, probability: 0.85, returns: -2.3 },
  { date: '2023-09', regime: 'Bearish', volatility: 24, correlation: 0.75, probability: 0.79, returns: -1.8 },
  { date: '2023-10', regime: 'Transition', volatility: 20, correlation: 0.6, probability: 0.68, returns: -0.4 },
  { date: '2023-11', regime: 'Bullish', volatility: 15, correlation: 0.45, probability: 0.76, returns: 1.5 },
  { date: '2023-12', regime: 'Bullish', volatility: 13, correlation: 0.42, probability: 0.81, returns: 1.9 },
  { date: '2024-01', regime: 'Bullish', volatility: 14, correlation: 0.44, probability: 0.84, returns: 2.1 },
  { date: '2024-02', regime: 'Transition', volatility: 17, correlation: 0.55, probability: 0.62, returns: 0.7 },
  { date: '2024-03', regime: 'Bearish', volatility: 22, correlation: 0.65, probability: 0.71, returns: -0.9 },
];

// Probability data for each regime
const probabilities = [
  { date: '2024-03-20', bullish: 0.25, neutral: 0.15, bearish: 0.60 },
  { date: '2024-03-21', bullish: 0.28, neutral: 0.17, bearish: 0.55 },
  { date: '2024-03-22', bullish: 0.30, neutral: 0.20, bearish: 0.50 },
  { date: '2024-03-23', bullish: 0.32, neutral: 0.25, bearish: 0.43 },
  { date: '2024-03-24', bullish: 0.35, neutral: 0.30, bearish: 0.35 },
  { date: '2024-03-25', bullish: 0.38, neutral: 0.32, bearish: 0.30 },
  { date: '2024-03-26', bullish: 0.40, neutral: 0.35, bearish: 0.25 },
  { date: '2024-03-27', bullish: 0.42, neutral: 0.33, bearish: 0.25 },
];

const RegimeDetectionChart: React.FC = () => {
  return (
    <Card className="col-span-6">
      <CardHeader>
        <CardTitle className="text-base">Market Regime Detection (HMM Model)</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="historical">
          <TabsList className="mb-4">
            <TabsTrigger value="historical">Historical Regimes</TabsTrigger>
            <TabsTrigger value="current">Current Probabilities</TabsTrigger>
            <TabsTrigger value="volatility">Volatility Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="historical" className="space-y-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={recentRegimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#202940" />
                  <XAxis dataKey="date" stroke="#7D8596" />
                  <YAxis yAxisId="left" stroke="#7D8596" />
                  <YAxis yAxisId="right" orientation="right" stroke="#7D8596" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(222 47% 10%)', 
                      borderColor: 'hsl(217.2 32.6% 17.5%)',
                      color: '#fff' 
                    }} 
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="volatility" 
                    stroke="#FF5000" 
                    activeDot={{ r: 8 }} 
                    name="Volatility"
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="correlation" 
                    stroke="#4A6FF3" 
                    name="Correlation" 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="probability" 
                    stroke="#29B6F6" 
                    dot={{ stroke: '#29B6F6', strokeWidth: 2, r: 4 }}
                    name="Regime Probability" 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="returns" 
                    stroke="#00C805" 
                    dot={{ stroke: '#00C805', strokeWidth: 2, r: 4 }}
                    name="Returns %" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-center">
              {recentRegimeData.slice(-4).map((data, index) => (
                <div key={index} className="bg-card p-3 rounded-md">
                  <div className="text-xs text-muted-foreground mb-1">{data.date}</div>
                  <div className={`text-base font-medium ${
                    data.regime === 'Bullish' ? 'text-finance-up' : 
                    data.regime === 'Bearish' ? 'text-finance-down' : 'text-finance-neutral'
                  }`}>
                    {data.regime}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Prob: {(data.probability * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="current">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={probabilities}
                  stackOffset="expand"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#202940" />
                  <XAxis dataKey="date" stroke="#7D8596" />
                  <YAxis stroke="#7D8596" tickFormatter={(tick) => `${tick * 100}%`} />
                  <Tooltip 
                    formatter={(value: number) => [`${(value * 100).toFixed(1)}%`]}
                    contentStyle={{ 
                      backgroundColor: 'hsl(222 47% 10%)', 
                      borderColor: 'hsl(217.2 32.6% 17.5%)',
                      color: '#fff' 
                    }} 
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="bullish" 
                    stackId="1" 
                    stroke="#00C805" 
                    fill="#00C805" 
                    fillOpacity={0.6}
                    name="Bullish" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="neutral" 
                    stackId="1" 
                    stroke="#7D8596" 
                    fill="#7D8596"
                    fillOpacity={0.6}
                    name="Neutral" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="bearish" 
                    stackId="1" 
                    stroke="#FF5000" 
                    fill="#FF5000"
                    fillOpacity={0.6}
                    name="Bearish" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Current Regime</div>
                <div className="text-lg font-medium text-finance-down">Bearish</div>
                <div className="text-xs text-muted-foreground mt-2">Confidence: 78%</div>
              </div>
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Regime Metrics</div>
                <div className="text-sm">
                  <div className="flex justify-between my-1">
                    <span className="text-muted-foreground">Volatility:</span>
                    <span className="text-finance-down">High (24.3)</span>
                  </div>
                  <div className="flex justify-between my-1">
                    <span className="text-muted-foreground">Correlation:</span>
                    <span>0.72</span>
                  </div>
                </div>
              </div>
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Forecast</div>
                <div className="text-sm">
                  <div className="flex justify-between my-1">
                    <span className="text-muted-foreground">Stability:</span>
                    <span>69%</span>
                  </div>
                  <div className="flex justify-between my-1">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>4-6 weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="volatility">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={recentRegimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#202940" />
                  <XAxis dataKey="date" stroke="#7D8596" />
                  <YAxis stroke="#7D8596" domain={[0, 40]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(222 47% 10%)', 
                      borderColor: 'hsl(217.2 32.6% 17.5%)',
                      color: '#fff' 
                    }} 
                  />
                  <Legend />
                  <ReferenceLine y={15} stroke="#FFCC00" strokeDasharray="3 3" label={{ value: 'Low Vol Threshold', position: 'insideBottomRight', fill: '#FFCC00' }} />
                  <ReferenceLine y={20} stroke="#FF9900" strokeDasharray="3 3" label={{ value: 'Medium Vol Threshold', position: 'insideBottomRight', fill: '#FF9900' }} />
                  <Line 
                    type="monotone" 
                    dataKey="volatility" 
                    stroke="#FF5000" 
                    activeDot={{ r: 8 }} 
                    name="Realized Volatility"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RegimeDetectionChart;
