
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for execution metrics
const slippageData = [
  { name: 'VOO', value: 0.12, limit: 0.25 },
  { name: 'QQQ', value: 0.18, limit: 0.25 },
  { name: 'AGG', value: 0.05, limit: 0.15 },
  { name: 'VEA', value: 0.22, limit: 0.25 },
  { name: 'VNQ', value: 0.17, limit: 0.25 },
  { name: 'GLD', value: 0.14, limit: 0.25 },
];

// Mock data for execution timeline
const timelineData = [
  { time: '09:30', vwap: 100.00, executed: null, benchmark: 100.00 },
  { time: '10:00', vwap: 100.12, executed: null, benchmark: 100.15 },
  { time: '10:30', vwap: 100.08, executed: 100.10, benchmark: 100.20 },
  { time: '11:00', vwap: 100.15, executed: null, benchmark: 100.25 },
  { time: '11:30', vwap: 100.20, executed: 100.22, benchmark: 100.30 },
  { time: '12:00', vwap: 100.18, executed: null, benchmark: 100.25 },
  { time: '12:30', vwap: 100.25, executed: 100.27, benchmark: 100.32 },
  { time: '13:00', vwap: 100.30, executed: null, benchmark: 100.35 },
  { time: '13:30', vwap: 100.28, executed: 100.29, benchmark: 100.30 },
  { time: '14:00', vwap: 100.32, executed: null, benchmark: 100.34 },
  { time: '14:30', vwap: 100.35, executed: 100.36, benchmark: 100.38 },
  { time: '15:00', vwap: 100.40, executed: null, benchmark: 100.42 },
  { time: '15:30', vwap: 100.45, executed: 100.45, benchmark: 100.48 },
  { time: '16:00', vwap: 100.50, executed: null, benchmark: 100.53 },
];

// Mock execution history
const executionHistory = [
  { time: '15:30:42', ticker: 'VOO', action: 'Sell', quantity: '150', price: '$452.18', slippage: '0.12%', status: 'Completed' },
  { time: '14:28:15', ticker: 'VEA', action: 'Buy', quantity: '450', price: '$48.36', slippage: '0.22%', status: 'Completed' },
  { time: '13:12:03', ticker: 'AGG', action: 'Sell', quantity: '300', price: '$96.72', slippage: '0.05%', status: 'Completed' },
  { time: '12:47:56', ticker: 'GLD', action: 'Buy', quantity: '100', price: '$185.43', slippage: '0.14%', status: 'Completed' },
  { time: '11:30:22', ticker: 'VNQ', action: 'Buy', quantity: '200', price: '$83.10', slippage: '0.17%', status: 'Completed' },
];

const ExecutionMetrics: React.FC = () => {
  return (
    <Card className="col-span-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base">Execution Metrics</CardTitle>
            <CardDescription>Slippage & Market Impact Analysis</CardDescription>
          </div>
          <Badge variant="outline" className="bg-finance-up bg-opacity-10">
            Avg Slippage: 0.15%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance">
          <TabsList className="mb-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="timeline">Execution Timeline</TabsTrigger>
            <TabsTrigger value="history">Execution History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Slippage by Asset</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={slippageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#202940" />
                      <XAxis dataKey="name" stroke="#7D8596" />
                      <YAxis 
                        stroke="#7D8596" 
                        tickFormatter={(tick) => `${tick}%`}
                        domain={[0, 0.5]}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, 'Slippage']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(222 47% 10%)', 
                          borderColor: 'hsl(217.2 32.6% 17.5%)',
                          color: '#fff' 
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="value" name="Actual Slippage" fill="#4A6FF3" />
                      <ReferenceLine y={0.25} stroke="#FF9900" strokeDasharray="3 3" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="border border-finance-grid rounded-md p-4">
                  <h3 className="text-sm font-medium mb-3">Execution Summary</h3>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="text-muted-foreground">Total Orders:</div>
                    <div>5</div>
                    <div className="text-muted-foreground">Total Value:</div>
                    <div>$153,625</div>
                    <div className="text-muted-foreground">Avg Slippage:</div>
                    <div className="text-finance-up">0.15%</div>
                    <div className="text-muted-foreground">vs Target:</div>
                    <div className="text-finance-up">-0.10%</div>
                    <div className="text-muted-foreground">Market Impact:</div>
                    <div>Negligible</div>
                    <div className="text-muted-foreground">Trading Cost:</div>
                    <div>$230.44</div>
                  </div>
                </div>
                
                <div className="border border-finance-grid rounded-md p-4">
                  <h3 className="text-sm font-medium mb-3">Execution Algorithm Performance</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-card p-3 rounded-md border border-finance-grid text-center">
                      <div className="text-xs text-muted-foreground mb-1">vs VWAP</div>
                      <div className="text-lg font-medium text-finance-up">+0.03%</div>
                    </div>
                    <div className="bg-card p-3 rounded-md border border-finance-grid text-center">
                      <div className="text-xs text-muted-foreground mb-1">vs TWAP</div>
                      <div className="text-lg font-medium text-finance-up">+0.08%</div>
                    </div>
                    <div className="bg-card p-3 rounded-md border border-finance-grid text-center">
                      <div className="text-xs text-muted-foreground mb-1">vs Arrival</div>
                      <div className="text-lg font-medium text-finance-up">+0.12%</div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-finance-grid rounded-md p-4">
                  <h3 className="text-sm font-medium mb-3">Market Conditions</h3>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <div className="text-muted-foreground">Volatility:</div>
                    <div>Medium (17.8)</div>
                    <div className="text-muted-foreground">Liquidity:</div>
                    <div>High</div>
                    <div className="text-muted-foreground">Spread:</div>
                    <div>1.2 bps</div>
                    <div className="text-muted-foreground">Order Book Depth:</div>
                    <div>Favorable</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#202940" />
                  <XAxis dataKey="time" stroke="#7D8596" />
                  <YAxis 
                    stroke="#7D8596" 
                    domain={[99.90, 100.60]}
                    tickFormatter={(tick) => `$${tick.toFixed(2)}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(222 47% 10%)', 
                      borderColor: 'hsl(217.2 32.6% 17.5%)',
                      color: '#fff' 
                    }} 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="vwap" 
                    name="VWAP" 
                    stroke="#7D8596" 
                    strokeDasharray="3 3" 
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="benchmark" 
                    name="Market Price" 
                    stroke="#FF5000" 
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="executed" 
                    name="Execution Price" 
                    stroke="#00C805" 
                    activeDot={{ r: 8 }}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 grid grid-cols-4 gap-4">
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Strategy</div>
                <div className="text-sm font-medium">Adaptive VWAP</div>
                <div className="text-xs text-muted-foreground mt-1">
                  with ML optimization
                </div>
              </div>
              
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Execution Window</div>
                <div className="text-sm font-medium">10:30 - 15:30</div>
                <div className="text-xs text-muted-foreground mt-1">
                  5 hours
                </div>
              </div>
              
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Participation Rate</div>
                <div className="text-sm font-medium">12%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Adaptive
                </div>
              </div>
              
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Order Types</div>
                <div className="text-sm font-medium">Mixed</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Limit, Market, MOC
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="border border-finance-grid rounded-md overflow-hidden">
              <div className="grid grid-cols-7 data-grid-header">
                <div>Time</div>
                <div>Ticker</div>
                <div>Action</div>
                <div className="text-right">Quantity</div>
                <div className="text-right">Price</div>
                <div className="text-right">Slippage</div>
                <div className="text-right">Status</div>
              </div>
              
              {executionHistory.map((execution, index) => (
                <div key={index} className="grid grid-cols-7 data-grid-cell">
                  <div className="text-muted-foreground">{execution.time}</div>
                  <div className="font-medium">{execution.ticker}</div>
                  <div className={execution.action === 'Buy' ? 'text-finance-up' : 'text-finance-down'}>
                    {execution.action}
                  </div>
                  <div className="text-right">{execution.quantity}</div>
                  <div className="text-right">{execution.price}</div>
                  <div className="text-right">{execution.slippage}</div>
                  <div className="text-right">
                    <Badge variant="outline" className="bg-finance-up bg-opacity-10">
                      {execution.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-1 gap-4">
              <div className="border border-finance-grid bg-card p-4 rounded-md">
                <h3 className="text-sm font-medium mb-2">Execution Algorithm Analysis</h3>
                <div className="text-sm space-y-2">
                  <p>The adaptive execution algorithm performed exceptionally well today, achieving better than target slippage across all trades. Key insights:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Algorithm detected lower liquidity for VEA and adjusted order sizing accordingly</li>
                    <li>Successfully avoided market impact by splitting larger orders</li>
                    <li>Captured favorable price with GLD by timing execution during lower volatility window</li>
                    <li>Overall cost savings of approximately $153 compared to benchmark execution</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExecutionMetrics;
