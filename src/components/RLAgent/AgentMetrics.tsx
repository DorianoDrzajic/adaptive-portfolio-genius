
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for RL agent performance
const rewardHistory = [
  { episode: 1, reward: -5.2, benchmark: 0, cumulative: -5.2 },
  { episode: 2, reward: -3.8, benchmark: 0.2, cumulative: -9.0 },
  { episode: 3, reward: -2.1, benchmark: 0.1, cumulative: -11.1 },
  { episode: 4, reward: -0.5, benchmark: -0.3, cumulative: -11.6 },
  { episode: 5, reward: 1.2, benchmark: -0.5, cumulative: -10.4 },
  { episode: 6, reward: 2.5, benchmark: -0.1, cumulative: -7.9 },
  { episode: 7, reward: 3.1, benchmark: 0.4, cumulative: -4.8 },
  { episode: 8, reward: 3.8, benchmark: 0.6, cumulative: -1.0 },
  { episode: 9, reward: 4.2, benchmark: 0.3, cumulative: 3.2 },
  { episode: 10, reward: 4.5, benchmark: 0.2, cumulative: 7.7 },
  { episode: 11, reward: 4.7, benchmark: 0.4, cumulative: 12.4 },
  { episode: 12, reward: 4.9, benchmark: 0.3, cumulative: 17.3 },
  { episode: 13, reward: 5.1, benchmark: 0.1, cumulative: 22.4 },
  { episode: 14, reward: 5.3, benchmark: -0.2, cumulative: 27.7 },
  { episode: 15, reward: 5.4, benchmark: -0.4, cumulative: 33.1 },
];

// Mock data for agent decisions
const agentDecisions = [
  { date: '2024-03-15', action: 'Rebalance', confidence: 0.92, reward: 1.2, profitLoss: '$4,500' },
  { date: '2024-03-08', action: 'Hold', confidence: 0.87, reward: 0.8, profitLoss: '$2,100' },
  { date: '2024-03-01', action: 'Rebalance', confidence: 0.94, reward: 1.5, profitLoss: '$6,800' },
  { date: '2024-02-23', action: 'Hold', confidence: 0.82, reward: 0.6, profitLoss: '$1,500' },
  { date: '2024-02-16', action: 'Reduce Risk', confidence: 0.89, reward: 1.3, profitLoss: '$5,200' },
];

// Mock data for action distribution
const actionDistribution = [
  { name: 'Hold', value: 45 },
  { name: 'Rebalance', value: 30 },
  { name: 'Increase Risk', value: 10 },
  { name: 'Reduce Risk', value: 15 },
];

const AgentMetrics: React.FC = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base">RL Agent Metrics</CardTitle>
            <CardDescription>A3C Algorithm with LSTM Policy Network</CardDescription>
          </div>
          <Badge className="bg-green-500 text-white">Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance">
          <TabsList className="mb-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rewardHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#202940" />
                  <XAxis dataKey="episode" stroke="#7D8596" />
                  <YAxis stroke="#7D8596" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(222 47% 10%)', 
                      borderColor: 'hsl(217.2 32.6% 17.5%)',
                      color: '#fff' 
                    }} 
                  />
                  <Legend />
                  <ReferenceLine y={0} stroke="#7D8596" />
                  <Line 
                    type="monotone" 
                    dataKey="reward" 
                    stroke="#00C805" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                    name="Episode Reward" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="benchmark" 
                    stroke="#7D8596" 
                    strokeDasharray="3 3"
                    name="Benchmark Return" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cumulative" 
                    stroke="#4A6FF3" 
                    name="Cumulative Reward" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Total Reward</div>
                <div className="text-lg font-medium text-finance-up">+33.1</div>
              </div>
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Recent Avg</div>
                <div className="text-lg font-medium">+5.1</div>
              </div>
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">vs Benchmark</div>
                <div className="text-lg font-medium text-finance-up">+32.0</div>
              </div>
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">P/L Impact</div>
                <div className="text-lg font-medium text-finance-up">+$20.1K</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="actions">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Action Distribution</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={actionDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#202940" />
                      <XAxis dataKey="name" stroke="#7D8596" />
                      <YAxis stroke="#7D8596" />
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, 'Frequency']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(222 47% 10%)', 
                          borderColor: 'hsl(217.2 32.6% 17.5%)',
                          color: '#fff' 
                        }} 
                      />
                      <Bar dataKey="value" fill="#4A6FF3" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Recent Decisions</h3>
                <div className="border border-finance-grid rounded-md overflow-hidden max-h-60 overflow-y-auto">
                  <div className="grid grid-cols-4 data-grid-header">
                    <div>Date</div>
                    <div>Action</div>
                    <div className="text-right">Confidence</div>
                    <div className="text-right">P/L</div>
                  </div>
                  
                  {agentDecisions.map((decision, index) => (
                    <div key={index} className="grid grid-cols-4 data-grid-cell">
                      <div>{decision.date}</div>
                      <div>
                        <Badge variant="outline" className="bg-finance-highlight bg-opacity-10">
                          {decision.action}
                        </Badge>
                      </div>
                      <div className="text-right">{(decision.confidence * 100).toFixed(0)}%</div>
                      <div className="text-right text-finance-up">{decision.profitLoss}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Current Decision</h3>
                  <div className="bg-card p-3 rounded-md border border-finance-grid">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Recommended Action:</span>
                      <Badge variant="outline" className="bg-finance-up bg-opacity-10">
                        Rebalance
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Confidence:</span>
                      <div className="w-2/3 bg-finance-grid rounded-full h-2">
                        <div className="bg-finance-up h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                      <span className="text-sm">94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis">
            <div className="border border-finance-grid bg-card p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium mb-2">Agent Insights</h3>
              <div className="text-sm space-y-2">
                <p>The RL agent has learned effective portfolio management strategies after 15 episodes of training. Key insights:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Agent detects regime changes an average of 3.2 days earlier than traditional models</li>
                  <li>Highest confidence in "Rebalance" actions, followed by "Reduce Risk"</li>
                  <li>Actions show strong correlation with subsequent market movements (0.76)</li>
                  <li>Agent performance improves in high volatility environments</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Training Status</div>
                <div className="text-sm font-medium">Continuous</div>
                <div className="mt-2 w-full bg-finance-grid rounded-full h-1.5">
                  <div className="bg-finance-highlight h-1.5 rounded-full animate-progress-loading"></div>
                </div>
              </div>
              
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Agent Type</div>
                <div className="text-sm font-medium">A3C + LSTM</div>
                <div className="text-xs text-muted-foreground mt-1">
                  v2.3.1
                </div>
              </div>
              
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Learning Rate</div>
                <div className="text-sm font-medium">0.00025</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Adaptive
                </div>
              </div>
              
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Prediction Accuracy</div>
                <div className="text-sm font-medium text-finance-up">87.3%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  +3.2% vs last version
                </div>
              </div>
              
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Exploration Rate</div>
                <div className="text-sm font-medium">0.15</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Decaying
                </div>
              </div>
              
              <div className="bg-card p-3 rounded-md border border-finance-grid">
                <div className="text-xs text-muted-foreground mb-1">Episodes</div>
                <div className="text-sm font-medium">15 / 50</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Training in progress
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AgentMetrics;
