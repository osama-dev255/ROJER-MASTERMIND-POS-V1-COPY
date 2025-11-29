import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/services/authService';
import { getUserByEmail } from '@/services/databaseService';
import { SplashScreen } from '@/components/SplashScreen';
import { LoginForm } from '@/components/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { ComprehensiveDashboard } from '@/pages/ComprehensiveDashboard';
import { Dashboard } from '@/pages/Dashboard';
import { SalesDashboard } from '@/pages/SalesDashboard';
import { ProductManagement } from '@/pages/ProductManagement';
import { CustomerManagement } from '@/pages/CustomerManagement';
import { TransactionHistory } from '@/pages/TransactionHistory';
import { SpendingAnalytics } from '@/pages/SpendingAnalytics';
import { EmployeeManagement } from '@/pages/EmployeeManagement';
import { SupplierManagement } from '@/pages/SupplierManagement';
import { PurchaseOrders } from '@/pages/PurchaseOrders';
import { PurchaseDashboard } from '@/pages/PurchaseDashboard';
import { PurchaseTerminal } from '@/pages/PurchaseTerminal';
import { PurchaseTransactionHistory } from '@/pages/PurchaseTransactionHistory';
import { PurchaseReports } from '@/pages/PurchaseReports';
import { ExpenseManagement } from '@/pages/ExpenseManagement';
import { ReturnsManagement } from '@/pages/ReturnsManagement';
import { DebtManagement } from '@/pages/DebtManagement';
import { CustomerSettlements } from '@/pages/CustomerSettlements';
import { SupplierSettlements } from '@/pages/SupplierSettlements';
import { DiscountManagement } from '@/pages/DiscountManagement';
import { InventoryAudit } from '@/pages/InventoryAudit';
import { AccessLogs } from '@/pages/AccessLogs';
import { FinancialReports } from '@/pages/FinancialReports';
import { IncomeStatement } from '@/pages/IncomeStatement';
import { Settings } from '@/pages/Settings';
import { AutomatedDashboard } from '@/pages/AutomatedDashboard';
import { FinanceDashboard } from '@/pages/FinanceDashboard';
import { SalesCart } from '@/pages/SalesCart';
import { SalesOrders } from '@/pages/SalesOrders';
import { TestSalesOrders } from '@/pages/TestSalesOrders';
import { BusinessTemplates } from '@/pages/BusinessTemplates';

// Define the possible view states
export type ViewState = 
  | "comprehensive"
  | "dashboard"
  | "sales"
  | "sales-cart"
  | "sales-orders"
  | "test-sales-orders"
  | "products"
  | "customers"
  | "transactions"
  | "analytics"
  | "spending-analytics"
  | "employees"
  | "suppliers"
  | "purchase-orders"
  | "purchase"
  | "purchase-terminal"
  | "purchase-transactions"
  | "purchase-reports"
  | "expenses"
  | "returns"
  | "debts"
  | "customer-settlements"
  | "supplier-settlements"
  | "discounts"
  | "audit"
  | "access-logs"
  | "reports"
  | "financial-reports"
  | "income-statement"
  | "settings"
  | "automated"
  | "finance"
  | "scanner"
  | "templates";

interface IndexProps {
  initialView?: ViewState;
  onLogout: () => void;
}

const Index: React.FC<IndexProps> = ({ initialView = "comprehensive", onLogout }) => {
  const [currentView, setCurrentView] = useState<ViewState>(initialView);
  const [userRole, setUserRole] = useState<string>("admin"); // Default to admin
  const [showSplash, setShowSplash] = useState(true);
  const { user, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  // Get user role from database
  const { data: dbUser } = useQuery<any>({
    queryKey: ['userRole', user?.email],
    queryFn: () => user?.email ? getUserByEmail(user.email) : null,
    enabled: !!user?.email,
    staleTime: Infinity,
  });

  // Update user role when dbUser changes
  useEffect(() => {
    if (dbUser) {
      setUserRole(dbUser?.role || "admin");
    }
  }, [dbUser]);

  // Handle splash screen timeout
  useEffect(() => {
    // Show splash screen for 3 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      clearTimeout(splashTimer);
    };
  }, []);

  // Handle login
  const handleLogin = (credentials: { username: string; password: string }) => {
    // The login is handled by the AuthContext, so we just need to update state
    setCurrentView("comprehensive");
  };

  // Handle navigation between views
  const handleNavigate = (view: ViewState) => {
    console.log("Navigating to:", view);
    
    // If user is a cashier, only allow sales-related views
    if (userRole === "cashier") {
      const allowedSalesViews: ViewState[] = [
        "sales", 
        "sales-cart", 
        "sales-orders", 
        "customers", 
        "transactions", 
        "discounts",
        "analytics",
        "spending-analytics",
        "settings",
        "scanner"
      ];
      
      // If trying to access a non-sales view, redirect to sales
      if (!allowedSalesViews.includes(view)) {
        setCurrentView("sales");
        return;
      }
    }
    
    setCurrentView(view);
  };

  // Handle back navigation
  const handleBack = () => {
    console.log("Handling back navigation from:", currentView);
    
    // If user is a cashier, only allow back to sales-related views
    if (userRole === "cashier") {
      const allowedSalesViews: ViewState[] = [
        "sales", 
        "sales-cart", 
        "sales-orders", 
        "customers", 
        "transactions", 
        "discounts",
        "analytics",
        "spending-analytics",
        "settings",
        "scanner"
      ];
      
      // Always go back to sales view for cashiers
      setCurrentView("sales");
      return;
    }
    
    // Default back navigation logic for other roles
    switch (currentView) {
      case "sales-cart":
      case "sales-orders":
      case "test-sales-orders":
        setCurrentView("sales");
        break;
      case "customers":
      case "transactions":
      case "discounts":
        setCurrentView("sales");
        break;
      case "products":
      case "analytics":
      case "spending-analytics":
        setCurrentView("dashboard");
        break;
      case "employees":
      case "suppliers":
      case "purchase-orders":
      case "purchase-terminal":
      case "purchase-transactions":
      case "purchase-reports":
        setCurrentView("purchase");
        break;
      case "expenses":
      case "returns":
      case "debts":
      case "customer-settlements":
      case "supplier-settlements":
        setCurrentView("finance");
        break;
      case "audit":
      case "access-logs":
        setCurrentView("settings");
        break;
      case "reports":
      case "financial-reports":
      case "income-statement":
        setCurrentView("dashboard");
        break;
      case "automated":
      case "finance":
        setCurrentView("dashboard");
        break;
      case "purchase":
        setCurrentView("dashboard");
        break;
      case "templates":
        setCurrentView("comprehensive");
        break;
      default:
        setCurrentView("dashboard");
        break;
    }
  };

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out...");
    if (typeof onLogout === 'function') {
      onLogout();
    }
    navigate('/');
  };

  // Show splash screen initially
  if (showSplash) {
    return <SplashScreen />;
  }

  // Show login form if not authenticated
  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Show loading state while checking authentication
  if (isAuthLoading) {
    return <SplashScreen />;
  }

  // Render the main application when authenticated
  return (
    <div>
      {(() => {
        console.log("Rendering currentView:", currentView);
        // If user is a cashier, only allow sales-related views
        if (userRole === "cashier") {
          const allowedSalesViews: ViewState[] = ["sales", "sales-cart", "sales-orders", "customers", "transactions", "discounts", "analytics", "spending-analytics", "settings", "scanner"];
          if (!allowedSalesViews.includes(currentView)) {
            // Redirect to sales view if trying to access restricted views
            setCurrentView("sales");
            return null; // Return null temporarily while redirecting
          }
        }

        switch (currentView) {
          case "comprehensive":
            // Cashiers should not see comprehensive dashboard
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            console.log("Rendering ComprehensiveDashboard");
            return (
              <ComprehensiveDashboard
                username={user?.email || "admin"}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
              />
            );
          case "dashboard":
            // Cashiers should not see general dashboard
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            console.log("Rendering Dashboard");
            return (
              <Dashboard
                username={user?.email || "admin"}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
              />
            );
          case "sales":
            console.log("Rendering SalesDashboard");
            return (
              <SalesDashboard
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
                onNavigate={handleNavigate}
              />
            );
          case "sales-cart":
            console.log("Rendering SalesCart");
            return (
              <SalesCart
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
                autoOpenScanner={true}
              />
            );
          case "sales-orders":
            console.log("Rendering SalesOrders");
            return (
              <SalesOrders
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "test-sales-orders":
            console.log("Rendering TestSalesOrders");
            return (
              <TestSalesOrders
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "products":
            console.log("Rendering ProductManagement");
            // Cashiers should not access product management
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <ProductManagement
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "customers":
            console.log("Rendering CustomerManagement");
            return (
              <CustomerManagement
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "transactions":
            console.log("Rendering TransactionHistory");
            return (
              <TransactionHistory
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "analytics":
          case "spending-analytics":
            console.log("Rendering SpendingAnalytics");
            // Cashiers should not access analytics
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <SpendingAnalytics
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "employees":
            console.log("Rendering EmployeeManagement");
            // Cashiers should not access employee management
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <EmployeeManagement
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "suppliers":
            console.log("Rendering SupplierManagement");
            // Cashiers should not access supplier management
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <SupplierManagement
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "purchase-orders":
            console.log("Rendering PurchaseOrders");
            // Cashiers should not access purchase orders
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <PurchaseOrders
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "purchase":
            console.log("Rendering PurchaseDashboard");
            // Cashiers should not access purchase dashboard
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <PurchaseDashboard
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
                onNavigate={handleNavigate}
              />
            );
          case "purchase-terminal":
            console.log("Rendering PurchaseTerminal");
            // Cashiers should not access purchase terminal
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <PurchaseTerminal
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "purchase-transactions":
            console.log("Rendering PurchaseTransactionHistory");
            // Cashiers should not access purchase transactions
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <PurchaseTransactionHistory
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "purchase-reports":
            console.log("Rendering PurchaseReports");
            // Cashiers should not access purchase reports
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <PurchaseReports
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "expenses":
            console.log("Rendering ExpenseManagement");
            // Cashiers should not access expense management
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <ExpenseManagement
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "returns":
            console.log("Rendering ReturnsManagement");
            // Cashiers should not access returns management
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <ReturnsManagement
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "debts":
            console.log("Rendering DebtManagement");
            // Cashiers should not access debt management
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <DebtManagement
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "customer-settlements":
            console.log("Rendering CustomerSettlements");
            // Cashiers should not access customer settlements
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <CustomerSettlements
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "supplier-settlements":
            console.log("Rendering SupplierSettlements");
            // Cashiers should not access supplier settlements
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <SupplierSettlements
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "discounts":
            console.log("Rendering DiscountManagement");
            return (
              <DiscountManagement
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "audit":
            console.log("Rendering InventoryAudit");
            // Cashiers should not access audit
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <InventoryAudit
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "access-logs":
            console.log("Rendering AccessLogs");
            // Cashiers should not access logs
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <AccessLogs
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "reports":
          case "financial-reports":
            console.log("Rendering FinancialReports");
            // Cashiers should not access financial reports
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <FinancialReports
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "income-statement":
            console.log("Rendering IncomeStatement");
            // Cashiers should not access income statement
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <IncomeStatement
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "settings":
            console.log("Rendering Settings");
            // Cashiers should not access settings
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <Settings
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "automated":
            console.log("Rendering AutomatedDashboard");
            // Cashiers should not access automated dashboard
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <AutomatedDashboard
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          case "finance":
            console.log("Rendering FinanceDashboard");
            // Cashiers should not access finance dashboard
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <FinanceDashboard
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
                onNavigate={handleNavigate}
              />
            );
          case "scanner":
            console.log("Rendering SalesCart with scanner");
            // Cashiers should be able to access scanner
            return (
              <SalesCart
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
                autoOpenScanner={true}
              />
            );
          case "templates":
            console.log("Rendering BusinessTemplates");
            return (
              <BusinessTemplates
                username={user?.email || "admin"}
                onBack={handleBack}
                onLogout={handleLogout}
              />
            );
          default:
            console.log("Unknown view, rendering ComprehensiveDashboard as fallback");
            // Cashiers should not see comprehensive dashboard
            if (userRole === "cashier") {
              return (
                <SalesDashboard
                  username={(user as any)?.email || "admin"}
                  onBack={handleBack}
                  onLogout={handleLogout}
                  onNavigate={handleNavigate}
                />
              );
            }
            return (
              <ComprehensiveDashboard
                username={user?.email || "admin"}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
              />
            );
        }
      })()}
    </div>
  );
};

export default Index;