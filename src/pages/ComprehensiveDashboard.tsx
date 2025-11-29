import { Navigation } from "@/components/Navigation";
import { DashboardCard } from "@/components/DashboardCard";
import { 
  ShoppingCart,
  Package,
  Truck,
  Wallet,
  Users,
  FileText
} from "lucide-react";

interface ComprehensiveDashboardProps {
  username: string;
  onNavigate: (module: string) => void;
  onLogout: () => void;
}

export const ComprehensiveDashboard = ({ username, onNavigate, onLogout }: ComprehensiveDashboardProps) => {
  const modules = [
    {
      id: "products",
      title: "Inventory Management",
      description: "Manage products, stock levels, and inventory tracking",
      icon: Package,
      color: "bg-white border border-gray-200"
    },
    {
      id: "sales",
      title: "Sales Dashboard",
      description: "Process sales transactions and manage customer purchases",
      icon: ShoppingCart,
      color: "bg-white border border-gray-200"
    },
    {
      id: "purchase",
      title: "Purchase Management",
      description: "Handle supplier orders, track purchases, and manage vendors",
      icon: Truck,
      color: "bg-white border border-gray-200"
    },
    {
      id: "finance",
      title: "Financial Management",
      description: "Manage expenses, debts, and financial reporting",
      icon: Wallet,
      color: "bg-white border border-gray-200"
    },
    {
      id: "employees",
      title: "Employee Management",
      description: "Manage staff members and permissions",
      icon: Users,
      color: "bg-white border border-gray-200"
    },
    {
      id: "templates",
      title: "Business Templates",
      description: "Generate and print business templates: Delivery notes, contracts, orders, and more",
      icon: FileText,
      color: "bg-white border border-gray-200"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        title="Comprehensive POS Dashboard" 
        onLogout={onLogout} 
        username={username}
      />
      
      <main className="container mx-auto p-4 sm:p-6">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, {username}!</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Select a module to manage your business operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 auto-rows-fr">
          {modules.map((module) => (
            <div key={module.id} className="flex">
              <DashboardCard
                title={module.title}
                description={module.description}
                icon={module.icon}
                onClick={() => {
                  console.log("Module clicked:", module.id);
                  onNavigate(module.id);
                }}
                className={module.color}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};