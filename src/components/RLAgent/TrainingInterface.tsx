
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, PauseCircle, RefreshCw, Download, ChevronRight } from "lucide-react";

const TrainingInterface: React.FC = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base">Agent Training</CardTitle>
            <CardDescription>RL Training Controls & Status</CardDescription>
          </div>
          <Badge className="bg-yellow-500 bg-opacity-80 text-white">Training</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="control">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="control" className="flex-1">Control</TabsTrigger>
            <TabsTrigger value="parameters" className="flex-1">Parameters</TabsTrigger>
          </TabsList>
          
          <TabsContent value="control">
            <div className="flex space-x-3 mb-6">
              <Button variant="outline" className="flex-1">
                <PauseCircle className="mr-2 h-4 w-4" />
                Pause
              </Button>
              <Button variant="outline" className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button className="flex-1 bg-primary">
                <PlayCircle className="mr-2 h-4 w-4" />
                Continue
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Episode Progress</span>
                  <span>15 / 50</span>
                </div>
                <div className="w-full bg-finance-grid rounded-full h-2">
                  <div className="bg-finance-highlight h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Current Episode</span>
                  <span>86%</span>
                </div>
                <div className="w-full bg-finance-grid rounded-full h-2">
                  <div className="bg-finance-up h-2 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Training Time</span>
                  <span>4h 32m</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">ETA Completion</span>
                  <span>~9h 48m</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border border-finance-grid rounded-md p-3">
              <h3 className="text-sm font-medium mb-2">Recent Log</h3>
              <div className="terminal-text h-24 overflow-auto text-xs">
                <div className="mb-1 text-muted-foreground">[2024-03-27 14:32:01] Episode 15 started. Initial state: normalized</div>
                <div className="mb-1 text-muted-foreground">[2024-03-27 14:35:42] Step 124: Action = REBALANCE, Reward = 1.23</div>
                <div className="mb-1 text-finance-up">[2024-03-27 14:38:13] Step 256: Action = INCREASE_RISK, Reward = 2.56</div>
                <div className="mb-1 text-muted-foreground">[2024-03-27 14:40:55] Step 389: Action = HOLD, Reward = 0.78</div>
                <div className="mb-1 text-finance-down">[2024-03-27 14:42:11] Step 412: Action = HOLD, Reward = -0.45</div>
                <div className="mb-1 text-muted-foreground animate-data-pulse">[2024-03-27 14:45:23] Step 512: Learning rate adjusted to 0.00023</div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Save Model
              </Button>
              <Button variant="outline" size="sm">
                View Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="parameters">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Algorithm</div>
                  <div className="text-sm font-medium">A3C (Async Advantage Actor-Critic)</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Policy Network</div>
                  <div className="text-sm font-medium">LSTM (128, 64)</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Learning Rate</div>
                  <div className="text-sm font-medium">0.00025 (Adaptive)</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Discount Factor</div>
                  <div className="text-sm font-medium">0.98</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Entropy Coef</div>
                  <div className="text-sm font-medium">0.01</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Value Loss Coef</div>
                  <div className="text-sm font-medium">0.5</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Clip Param</div>
                  <div className="text-sm font-medium">0.2</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Batch Size</div>
                  <div className="text-sm font-medium">64</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-finance-grid">
                <div className="text-xs text-muted-foreground mb-2">Observation Space</div>
                <div className="terminal-text text-xs bg-card p-2 rounded border border-finance-grid">
                  <div>- Market regime probabilities (3)</div>
                  <div>- Asset returns (10)</div>
                  <div>- Volatility metrics (5)</div>
                  <div>- Correlation matrix (10 x 10)</div>
                  <div>- Current allocations (10)</div>
                  <div>- Technical indicators (15)</div>
                  <div>- Macro indicators (8)</div>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="text-xs text-muted-foreground mb-2">Action Space</div>
                <div className="terminal-text text-xs bg-card p-2 rounded border border-finance-grid">
                  <div>- HOLD: No changes to portfolio</div>
                  <div>- REBALANCE: Adjust to optimal weights</div>
                  <div>- INCREASE_RISK: Shift to higher risk assets</div>
                  <div>- REDUCE_RISK: Shift to lower risk assets</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrainingInterface;
