
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Line,
  ZAxis
} from 'recharts';
import { Badge } from "@/components/ui/badge";

// Mock data for the efficient frontier
const frontierData = [
  { volatility: 5, return: 2, name: 'Min Risk', size: 100 },
  { volatility: 7, return: 3.5, size: 100 },
  { volatility: 9, return: 4.7, size: 100 },
  { volatility: 11, return: 5.8, size: 100 },
  { volatility: 13, return: 6.8, size: 100 },
  { volatility: 15, return: 7.7, name: 'Optimal', size: 200 },
  { volatility: 17, return: 8.4, size: 100 },
  { volatility: 19, return: 9, size: 100 },
  { volatility: 21, return: 9.5, size: 100 },
  { volatility: 23, return: 9.9, name: 'Max Return', size: 100 },
];

// Mock assets data
const assetData = [
  { volatility: 18, return: 7.5, name: 'S&P 500', size: 150 },
  { volatility: 12, return: 4.2, name: 'US Bonds', size: 150 },
  { volatility: 25, return: 9.8, name: 'Tech Sector', size: 150 },
  { volatility: 8, return: 3.3, name: 'Utilities', size: 150 },
  { volatility: 22, return: 8.1, name: 'Small Caps', size: 150 },
  { volatility: 20, return: 7.8, name: 'EU Stocks', size: 150 },
  { volatility: 28, return: 10.5, name: 'Crypto', size: 150 },
  { volatility: 6, return: 2.9, name: 'Gold', size: 150 },
];

const currentPortfolio = { volatility: 14, return: 6.2, name: 'Current', size: 250 };

// Create a line that approximates the efficient frontier
const lineData = frontierData.map(point => ({
  volatility: point.volatility,
  return: point.return
}));

const EfficientFrontier: React.FC = () => {
  return (
    <Card className="col-span-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base">Efficient Frontier & Portfolio Optimization</CardTitle>
            <CardDescription>Bayesian Optimization with Kelly Criterion</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-finance-chart-line bg-opacity-10">Efficient Frontier</Badge>
            <Badge variant="outline" className="bg-finance-dataPoint bg-opacity-10">Asset Classes</Badge>
            <Badge variant="outline" className="bg-primary bg-opacity-10">Current Portfolio</Badge>
            <Badge variant="outline" className="bg-finance-up bg-opacity-10">Optimized Portfolio</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#202940" />
              <XAxis 
                type="number" 
                dataKey="volatility" 
                name="Volatility (%)" 
                domain={[0, 30]} 
                label={{ value: 'Volatility (%)', position: 'insideBottom', offset: -10 }}
                stroke="#7D8596"
              />
              <YAxis 
                type="number" 
                dataKey="return" 
                name="Expected Return (%)" 
                domain={[0, 12]} 
                label={{ value: 'Expected Return (%)', angle: -90, position: 'insideLeft' }}
                stroke="#7D8596"
              />
              <ZAxis type="number" dataKey="size" range={[40, 160]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(222 47% 10%)', 
                  borderColor: 'hsl(217.2 32.6% 17.5%)',
                  color: '#fff' 
                }}
                formatter={(value: number, name: string) => [`${value}%`, name]}
              />
              
              {/* Line approximating the efficient frontier */}
              <Line
                type="monotone"
                dataKey="return"
                data={lineData}
                stroke="#29B6F6"
                dot={false}
                activeDot={false}
                legendType="none"
              />
              
              {/* Efficient frontier points */}
              <Scatter 
                name="Efficient Frontier" 
                data={frontierData} 
                fill="#29B6F6" 
                line={{ stroke: '#29B6F6', strokeWidth: 2 }} 
                lineType="joint"
              />
              
              {/* Asset classes */}
              <Scatter 
                name="Asset Classes" 
                data={assetData} 
                fill="#4DABF7"
              />
              
              {/* Current portfolio */}
              <Scatter 
                name="Current Portfolio" 
                data={[currentPortfolio]} 
                fill="#0075FF"
              />
              
              {/* Optimal portfolio */}
              <Scatter 
                name="Optimal Portfolio" 
                data={[frontierData[5]]} 
                fill="#00C805"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="bg-card p-4 rounded-md border border-finance-grid">
            <h3 className="text-sm font-medium mb-2">Current Portfolio</h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Return:</span>
                <span>{currentPortfolio.return}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Risk:</span>
                <span>{currentPortfolio.volatility}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sharpe:</span>
                <span>{(currentPortfolio.return / currentPortfolio.volatility).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kelly %:</span>
                <span>62%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-4 rounded-md border border-finance-grid">
            <h3 className="text-sm font-medium mb-2 text-finance-up">Optimized Portfolio</h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Return:</span>
                <span className="text-finance-up">{frontierData[5].return}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Risk:</span>
                <span>{frontierData[5].volatility}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sharpe:</span>
                <span className="text-finance-up">{(frontierData[5].return / frontierData[5].volatility).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kelly %:</span>
                <span className="text-finance-up">78%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EfficientFrontier;
