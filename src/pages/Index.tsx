
import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import RegimeDetectionChart from '@/components/Charts/RegimeDetectionChart';
import EfficientFrontier from '@/components/Charts/EfficientFrontier';
import AllocationTable from '@/components/Portfolio/AllocationTable';
import AgentMetrics from '@/components/RLAgent/AgentMetrics';
import TrainingInterface from '@/components/RLAgent/TrainingInterface';
import ExecutionMetrics from '@/components/Execution/ExecutionMetrics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <DashboardLayout>
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="optimization">Portfolio Optimization</TabsTrigger>
          <TabsTrigger value="execution">Execution</TabsTrigger>
          <TabsTrigger value="agents">RL Agents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="w-full">
          <div className="grid grid-cols-12 gap-6">
            <RegimeDetectionChart />
            <AgentMetrics />
            <TrainingInterface />
            <AllocationTable />
            <ExecutionMetrics />
          </div>
        </TabsContent>
        
        <TabsContent value="optimization">
          <div className="grid grid-cols-12 gap-6">
            <EfficientFrontier />
            <div className="col-span-6">
              <AllocationTable />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="execution">
          <div className="grid grid-cols-12 gap-6">
            <ExecutionMetrics />
          </div>
        </TabsContent>
        
        <TabsContent value="agents">
          <div className="grid grid-cols-12 gap-6">
            <AgentMetrics />
            <TrainingInterface />
            <div className="col-span-6">
              <RegimeDetectionChart />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;
