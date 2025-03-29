
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Mock data for current allocation
const currentAllocation = [
  { name: 'US Stocks', value: 40, color: '#4A6FF3' },
  { name: 'US Bonds', value: 30, color: '#29B6F6' },
  { name: 'International', value: 15, color: '#9C27B0' },
  { name: 'Real Estate', value: 7, color: '#26A69A' },
  { name: 'Commodities', value: 5, color: '#FF9800' },
  { name: 'Cash', value: 3, color: '#7D8596' },
];

// Mock data for optimal allocation
const optimalAllocation = [
  { name: 'US Stocks', value: 35, color: '#4A6FF3', change: -5 },
  { name: 'US Bonds', value: 20, color: '#29B6F6', change: -10 },
  { name: 'International', value: 20, color: '#9C27B0', change: 5 },
  { name: 'Real Estate', value: 10, color: '#26A69A', change: 3 },
  { name: 'Commodities', value: 10, color: '#FF9800', change: 5 },
  { name: 'Cash', value: 5, color: '#7D8596', change: 2 },
];

// Mock data for asset table
const assetDetails = [
  { asset: 'VOO', type: 'ETF', category: 'US Stocks', current: 25, optimal: 22, change: -3 },
  { asset: 'QQQ', type: 'ETF', category: 'US Stocks', current: 15, optimal: 13, change: -2 },
  { asset: 'AGG', type: 'ETF', category: 'US Bonds', current: 20, optimal: 12, change: -8 },
  { asset: 'BND', type: 'ETF', category: 'US Bonds', current: 10, optimal: 8, change: -2 },
  { asset: 'VEA', type: 'ETF', category: 'International', current: 10, optimal: 15, change: 5 },
  { asset: 'EEM', type: 'ETF', category: 'International', current: 5, optimal: 5, change: 0 },
  { asset: 'VNQ', type: 'ETF', category: 'Real Estate', current: 7, optimal: 10, change: 3 },
  { asset: 'GLD', type: 'ETF', category: 'Commodities', current: 3, optimal: 6, change: 3 },
  { asset: 'SLV', type: 'ETF', category: 'Commodities', current: 2, optimal: 4, change: 2 },
  { asset: 'CASH', type: 'Cash', category: 'Cash', current: 3, optimal: 5, change: 2 },
];

const AllocationTable: React.FC = () => {
  return (
    <Card className="col-span-6">
      <CardHeader>
        <CardTitle className="text-base">Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Allocation Overview</TabsTrigger>
            <TabsTrigger value="details">Asset Details</TabsTrigger>
            <TabsTrigger value="rebalance">Rebalancing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-4">Current Allocation</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentAllocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {currentAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => `${value}%`}
                        contentStyle={{ 
                          backgroundColor: 'hsl(222 47% 10%)', 
                          borderColor: 'hsl(217.2 32.6% 17.5%)',
                          color: '#fff' 
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-4 text-finance-up">Optimal Allocation</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={optimalAllocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {optimalAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => `${value}%`}
                        contentStyle={{ 
                          backgroundColor: 'hsl(222 47% 10%)', 
                          borderColor: 'hsl(217.2 32.6% 17.5%)',
                          color: '#fff' 
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border border-finance-grid rounded-md overflow-hidden">
              <div className="grid grid-cols-3 data-grid-header">
                <div>Asset Class</div>
                <div className="text-center">Current</div>
                <div className="text-right">Optimal Change</div>
              </div>
              
              {optimalAllocation.map((asset, index) => (
                <div key={index} className="grid grid-cols-3 data-grid-cell">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: asset.color }}></div>
                    {asset.name}
                  </div>
                  <div className="text-center">{currentAllocation[index].value}%</div>
                  <div className="text-right flex items-center justify-end">
                    <span className={`${asset.change > 0 ? 'text-finance-up' : asset.change < 0 ? 'text-finance-down' : ''} mr-2`}>
                      {asset.change > 0 ? `+${asset.change}` : asset.change}%
                    </span>
                    <Badge variant="outline" className={`${asset.change > 0 ? 'bg-finance-up' : asset.change < 0 ? 'bg-finance-down' : 'bg-finance-neutral'} bg-opacity-10`}>
                      {asset.value}%
                    </Badge>
                  </div>
                </div>
              ))}
              
              <div className="grid grid-cols-3 data-grid-cell font-medium bg-muted bg-opacity-10">
                <div>Total</div>
                <div className="text-center">100%</div>
                <div className="text-right">100%</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="border border-finance-grid rounded-md overflow-hidden">
              <div className="grid grid-cols-7 data-grid-header">
                <div>Asset</div>
                <div>Type</div>
                <div>Category</div>
                <div className="text-right">Current %</div>
                <div className="text-right">Optimal %</div>
                <div className="text-right">Change</div>
                <div className="text-right">Action</div>
              </div>
              
              {assetDetails.map((asset, index) => (
                <div key={index} className="grid grid-cols-7 data-grid-cell">
                  <div className="font-medium">{asset.asset}</div>
                  <div className="text-muted-foreground">{asset.type}</div>
                  <div>{asset.category}</div>
                  <div className="text-right">{asset.current}%</div>
                  <div className="text-right text-finance-up">{asset.optimal}%</div>
                  <div className={`text-right ${asset.change > 0 ? 'text-finance-up' : asset.change < 0 ? 'text-finance-down' : ''}`}>
                    {asset.change > 0 ? `+${asset.change}` : asset.change}%
                  </div>
                  <div className="text-right">
                    {asset.change !== 0 && (
                      <Badge variant={asset.change > 0 ? "outline" : "outline"} className={`${asset.change > 0 ? 'bg-finance-up' : 'bg-finance-down'} bg-opacity-10`}>
                        {asset.change > 0 ? 'Buy' : 'Sell'}
                      </Badge>
                    )}
                    {asset.change === 0 && (
                      <Badge variant="outline" className="bg-finance-neutral bg-opacity-10">
                        Hold
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              Estimated transaction cost for rebalancing: 0.12% of portfolio value
            </div>
          </TabsContent>
          
          <TabsContent value="rebalance">
            <div className="border border-finance-grid bg-card p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium mb-2">Rebalancing Strategy</h3>
              <div className="text-sm space-y-2">
                <p>The optimal portfolio is based on the current market regime (Bearish) and aims to reduce risk while maintaining potential for returns. The rebalancing prioritizes:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Reducing US market exposure</li>
                  <li>Increasing international diversification</li>
                  <li>Adding to defensive and alternative assets</li>
                  <li>Minimizing tax impact and trading costs</li>
                </ul>
              </div>
            </div>
            
            <div className="border border-finance-grid rounded-md overflow-hidden">
              <div className="grid grid-cols-5 data-grid-header">
                <div>Trade Type</div>
                <div>Asset</div>
                <div className="text-right">Amount</div>
                <div className="text-right">% of Portfolio</div>
                <div className="text-right">Status</div>
              </div>
              
              <div className="grid grid-cols-5 data-grid-cell">
                <div className="text-finance-down">Sell</div>
                <div>VOO</div>
                <div className="text-right">$15,000</div>
                <div className="text-right">3%</div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-finance-neutral bg-opacity-10">Pending</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-5 data-grid-cell">
                <div className="text-finance-down">Sell</div>
                <div>AGG</div>
                <div className="text-right">$40,000</div>
                <div className="text-right">8%</div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-finance-neutral bg-opacity-10">Pending</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-5 data-grid-cell">
                <div className="text-finance-up">Buy</div>
                <div>VEA</div>
                <div className="text-right">$25,000</div>
                <div className="text-right">5%</div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-finance-neutral bg-opacity-10">Pending</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-5 data-grid-cell">
                <div className="text-finance-up">Buy</div>
                <div>VNQ</div>
                <div className="text-right">$15,000</div>
                <div className="text-right">3%</div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-finance-neutral bg-opacity-10">Pending</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-5 data-grid-cell">
                <div className="text-finance-up">Buy</div>
                <div>GLD</div>
                <div className="text-right">$15,000</div>
                <div className="text-right">3%</div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-finance-neutral bg-opacity-10">Pending</Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-md border border-finance-grid">
                <h3 className="text-sm font-medium mb-2">Transaction Summary</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-muted-foreground">Total Buy:</div>
                  <div className="text-finance-up">$55,000 (11%)</div>
                  <div className="text-muted-foreground">Total Sell:</div>
                  <div className="text-finance-down">$55,000 (11%)</div>
                  <div className="text-muted-foreground">Est. Cost:</div>
                  <div>$600 (0.12%)</div>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-md border border-finance-grid">
                <h3 className="text-sm font-medium mb-2">Performance Impact</h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div className="text-muted-foreground">Current Return:</div>
                  <div>6.2%</div>
                  <div className="text-muted-foreground">Expected Return:</div>
                  <div className="text-finance-up">7.7%</div>
                  <div className="text-muted-foreground">Risk Reduction:</div>
                  <div className="text-finance-up">-7.1%</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AllocationTable;
