import { useState, useEffect } from "react";
import { ShoppingCart, Store, CreditCard, BarChart3, Users, Box } from "lucide-react";
import "../App.css";

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide splash screen after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;
  
  // Ensure splash screen is completely removed from DOM when not visible
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background to-primary/5 flex items-center justify-center splash-screen">
      <div className="text-center max-w-md w-full px-4">
        <div className="mb-8 relative">
          <div className="absolute -inset-2 bg-primary/10 rounded-xl blur-lg"></div>
          <div className="relative bg-white rounded-xl p-6 shadow-lg border border-primary/10">
            <Store className="h-16 w-16 text-primary mx-auto" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground splash-fade-in">
          Rojer MasterMind POS
        </h1>

        <p className="text-sm md:text-base mb-6 text-muted-foreground splash-fade-in">
          Professional Point of Sale System
        </p>

        <div className="w-16 h-0.5 bg-primary mx-auto mb-6 splash-fade-in"></div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-3 rounded-lg mb-2">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Sales</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-3 rounded-lg mb-2">
              <Box className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Inventory</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-3 rounded-lg mb-2">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Reports</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-muted rounded-full h-1.5 mb-2">
            <div 
              className="bg-primary h-1.5 rounded-full splash-progress" 
              style={{ width: '0%' }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground">Loading system...</p>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};