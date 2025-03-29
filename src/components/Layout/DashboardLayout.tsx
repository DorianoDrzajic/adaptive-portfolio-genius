
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RefreshCw, Settings, AlertCircle, Info } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold text-primary">AI Portfolio Optimization</h1>
            <Separator orientation="vertical" className="h-6" />
            <Tabs defaultValue="dashboard">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="optimization">Portfolio Optimization</TabsTrigger>
                <TabsTrigger value="execution">Execution</TabsTrigger>
                <TabsTrigger value="agents">RL Agents</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-6">
        {children}
      </main>
      <footer className="border-t border-border py-3 px-4">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
              <span>System Online</span>
            </div>
            <Separator orientation="vertical" className="h-3" />
            <span>Last Updated: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-3 w-3" />
            <span>Demo Version - Not Connected to Live Trading</span>
            <Info className="h-3 w-3" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
