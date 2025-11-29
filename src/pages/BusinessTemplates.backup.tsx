import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  FileText, 
  Printer, 
  Download, 
  Eye,
  FileSpreadsheet,
  FileJson
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PrintUtils } from "@/utils/printUtils";

interface BusinessTemplatesProps {
  username: string;
  onBack: () => void;
  onLogout: () => void;
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
}

export const BusinessTemplates = ({ username, onBack, onLogout }: BusinessTemplatesProps) => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const templates: Template[] = [
    {
      id: "delivery",
      name: "Delivery Note",
      description: "Professional delivery note template for product shipments",
      icon: FileText
    },
    {
      id: "order",
      name: "Order Form",
      description: "Business order form for customer purchases",
      icon: FileText
    },
    {
      id: "contract",
      name: "Contract Template",
      description: "Standard business contract template",
      icon: FileText
    },
    {
      id: "invoice",
      name: "Invoice Template",
      description: "Professional invoice template for billing",
      icon: FileText
    },
    {
      id: "receipt",
      name: "Receipt Template",
      description: "Business receipt template for payments",
      icon: FileText
    },
    {
      id: "notice",
      name: "Notice Template",
      description: "Formal business notice template",
      icon: FileText
    },
    {
      id: "quote",
      name: "Quotation Template",
      description: "Business quotation/proposal template",
      icon: FileText
    },
    {
      id: "report",
      name: "Report Template",
      description: "Business report template for documentation",
      icon: FileText
    }
  ];

  const handlePrintTemplate = (templateId: string) => {
    try {
      // Create a mock transaction object for the template
      const mockTransaction = {
        receiptNumber: `TPL-${Date.now()}`,
        date: new Date().toISOString(),
        items: [
          { name: "Sample Item 1", quantity: 1, price: 100.00, total: 100.00 },
          { name: "Sample Item 2", quantity: 2, price: 50.00, total: 100.00 }
        ],
        subtotal: 200.00,
        tax: 20.00,
        discount: 0.00,
        total: 220.00,
        amountReceived: 220.00,
        change: 0.00,
        customer: {
          name: "Sample Customer",
          phone: "+1234567890",
          email: "customer@example.com"
        },
        business: {
          name: "Your Business Name",
          address: "123 Business Street, City, Country",
          phone: "+1234567890",
          email: "info@yourbusiness.com"
        }
      };

      // Print the template based on type
      switch (templateId) {
        case "delivery":
          PrintUtils.printReceipt(mockTransaction);
          break;
        case "order":
          PrintUtils.printReceipt(mockTransaction);
          break;
        case "contract":
          PrintUtils.printReceipt(mockTransaction);
          break;
        case "invoice":
          PrintUtils.printReceipt(mockTransaction);
          break;
        case "receipt":
          PrintUtils.printReceipt(mockTransaction);
          break;
        case "notice":
          PrintUtils.printReceipt(mockTransaction);
          break;
        case "quote":
          PrintUtils.printReceipt(mockTransaction);
          break;
        case "report":
          PrintUtils.printReceipt(mockTransaction);
          break;
        default:
          PrintUtils.printReceipt(mockTransaction);
      }

      toast({
        title: "Template Printed",
        description: `The ${templates.find(t => t.id === templateId)?.name} has been sent to your printer.`,
      });
    } catch (error) {
      console.error("Error printing template:", error);
      toast({
        title: "Print Error",
        description: "Failed to print the template. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePreviewTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsPreviewOpen(true);
    toast({
      title: "Template Preview",
      description: `Previewing ${templates.find(t => t.id === templateId)?.name}`,
    });
  };

  const handleDownloadTemplate = (templateId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${templates.find(t => t.id === templateId)?.name} as PDF.`,
    });
  };

  const getTemplateContent = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return null;

    switch (templateId) {
      case "delivery":
        return (
          <div className="p-6 max-w-2xl mx-auto bg-white">
            <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
              <h1 className="text-3xl font-bold text-gray-800">DELIVERY NOTE</h1>
              <div className="mt-2 text-sm">
                <p className="font-semibold text-gray-700">YOUR BUSINESS NAME</p>
                <p className="text-gray-600">123 Business Street, City, Country</p>
                <p className="text-gray-600">Phone: +1234567890 | Email: info@yourbusiness.com</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-300 p-4 rounded">
                <h3 className="font-bold text-gray-800 mb-2">TO:</h3>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">Customer Name</p>
                  <p>Customer Address Line 1</p>
                  <p>Customer Address Line 2</p>
                  <p>Phone: +1234567890</p>
                  <p>Email: customer@example.com</p>
                </div>
              </div>
              
              <div className="border border-gray-300 p-4 rounded">
                <h3 className="font-bold text-gray-800 mb-2">DELIVERY DETAILS:</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Delivery Note #:</span>
                    <span>DN-001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Delivery Date:</span>
                    <span>_________</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Vehicle #:</span>
                    <span>_________</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Driver:</span>
                    <span>_________</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg border-b border-gray-300 pb-1">ITEMS DELIVERED:</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-bold">Item Description</th>
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-bold">Quantity</th>
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-bold">Unit</th>
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-bold">Delivered</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Sample Product 1</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">10</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">pcs</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">10</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">Good condition</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Sample Product 2</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">5</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">boxes</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">5</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">Fragile</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Sample Product 3</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">2</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">units</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">2</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">DELIVERY NOTES:</h3>
                <div className="border border-gray-300 h-24 p-2 text-sm">
                  <p>Please handle with care. Fragile items included.</p>
                  <p>Signature required upon delivery.</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-sm">Total Items:</span>
                  <span className="text-sm">17</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-sm">Total Quantity:</span>
                  <span className="text-sm">28 units</span>
                </div>
                <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-300">
                  <span className="text-sm">Total Packages:</span>
                  <span className="text-sm">3</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mt-12 text-sm">
                  <p>Prepared By</p>
                  <p className="mt-1">Name: _________________</p>
                  <p>Date: _________</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mt-12 text-sm">
                  <p>Driver Signature</p>
                  <p className="mt-1">Name: _________________</p>
                  <p>Date: _________</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mt-12 text-sm">
                  <p>Received By</p>
                  <p className="mt-1">Name: _________________</p>
                  <p>Date: _________</p>
                  <p className="mt-2">(Signature Required)</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "order":
        return (
          <div className="p-6 max-w-2xl mx-auto bg-white">
            <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-gray-800">
              <div>
                <h1 className="text-3xl font-bold text-blue-800">PURCHASE ORDER</h1>
                <p className="text-sm text-gray-600 mt-1">Official Business Document</p>
              </div>
              <div className="text-right">
                <div className="border-2 border-blue-800 p-2 rounded">
                  <p className="font-bold text-blue-800">ORDER #</p>
                  <p className="text-xl font-bold">PO-2024-001</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">VENDOR:</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="font-bold">Supplier Company Name</p>
                  <p>123 Supplier Street</p>
                  <p>Supplier City, State 12345</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Contact: John Supplier</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">SHIP TO:</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="font-bold">Your Business Name</p>
                  <p>123 Business Street</p>
                  <p>Business City, State 67890</p>
                  <p>Phone: (555) 987-6543</p>
                  <p>Contact: Jane Manager</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-6 bg-gray-50 p-3 rounded border">
              <div>
                <p className="text-xs text-gray-500">DATE</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">REQUIRED BY</p>
                <p className="font-medium">_________</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">PAYMENT TERMS</p>
                <p className="font-medium">Net 30</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">SHIP VIA</p>
                <p className="font-medium">Ground</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">ITEMS ORDERED:</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-bold">Item #</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-bold">Description</th>
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-bold">Qty</th>
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-bold">Unit</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">Unit Price</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm">ITM-001</td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Office Chairs</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">10</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">EA</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$89.99</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$899.90</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm">ITM-002</td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Desk Lamps</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">15</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">EA</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$24.50</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$367.50</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm">ITM-003</td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Filing Cabinets</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">3</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">EA</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$149.99</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$449.97</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">SUBTOTAL</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">$1,717.37</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">TAX (8.5%)</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">$145.98</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">SHIPPING</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">$45.00</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-lg">TOTAL</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-lg">$1,908.35</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">SPECIAL INSTRUCTIONS:</h3>
                <div className="border border-gray-300 h-20 p-2 text-sm">
                  <p>Please deliver by Friday. Call before delivery.</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">APPROVAL:</h3>
                <div className="border border-gray-300 h-20 p-2 text-sm">
                  <p>Approved for purchase per budget approval.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="pt-2 text-sm">
                  <p className="font-bold">REQUESTED BY</p>
                  <p className="mt-8">_______________________</p>
                  <p>Name & Title</p>
                </div>
              </div>
              <div className="text-center">
                <div className="pt-2 text-sm">
                  <p className="font-bold">APPROVED BY</p>
                  <p className="mt-8">_______________________</p>
                  <p>Name & Title</p>
                </div>
              </div>
              <div className="text-center">
                <div className="pt-2 text-sm">
                  <p className="font-bold">DATE</p>
                  <p className="mt-8">_______________________</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "contract":
        return (
          <div className="p-8 max-w-4xl mx-auto bg-white">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 border-b-2 border-gray-800 pb-4">SERVICE AGREEMENT CONTRACT</h1>
              <p className="text-lg mt-4">This Agreement is made and entered into on {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">PARTIES TO THE AGREEMENT</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-300 p-4 rounded">
                  <h3 className="font-bold text-gray-700 mb-2">CLIENT:</h3>
                  <p className="font-semibold">Client Company Name</p>
                  <p>Address: Client Address Line 1</p>
                  <p>City, State ZIP Code</p>
                  <p>Contact: Client Contact Person</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Email: client@example.com</p>
                </div>
                <div className="border border-gray-300 p-4 rounded">
                  <h3 className="font-bold text-gray-700 mb-2">SERVICE PROVIDER:</h3>
                  <p className="font-semibold">Your Business Name</p>
                  <p>Address: 123 Business Street</p>
                  <p>City, State ZIP Code</p>
                  <p>Contact: Service Provider Contact</p>
                  <p>Phone: (555) 987-6543</p>
                  <p>Email: services@yourbusiness.com</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">1. SERVICES PROVIDED</h2>
              <div className="border border-gray-300 p-4 rounded">
                <p className="mb-3">The Service Provider agrees to perform the following services for the Client:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Monthly website maintenance and updates</li>
                  <li>Technical support during business hours</li>
                  <li>Security monitoring and updates</li>
                  <li>Performance optimization</li>
                  <li>Backup and recovery services</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">2. TERM OF AGREEMENT</h2>
              <div className="border border-gray-300 p-4 rounded">
                <p>This Agreement shall commence on <span className="font-semibold">_________</span> and continue for a period of <span className="font-semibold">12 months</span>, unless terminated earlier in accordance with the termination clause.</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">3. COMPENSATION</h2>
              <div className="border border-gray-300 p-4 rounded">
                <p className="mb-3">In consideration for the services provided, the Client agrees to pay the Service Provider as follows:</p>
                <ul className="list-disc pl-6 space-y-2 mb-3">
                  <li>Monthly fee: $1,500.00</li>
                  <li>Payment due: Within 15 days of invoice date</li>
                  <li>Late payment penalty: 1.5% per month</li>
                </ul>
                <p>Additional services not covered in Section 1 will be billed separately at $125/hour.</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">4. WARRANTIES AND REPRESENTATIONS</h2>
              <div className="border border-gray-300 p-4 rounded">
                <p>The Service Provider warrants that all services will be performed in a professional and workmanlike manner. The Service Provider makes no other warranties, express or implied.</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">5. TERMINATION</h2>
              <div className="border border-gray-300 p-4 rounded">
                <p>Either party may terminate this Agreement with 30 days written notice. Upon termination, the Client shall pay for all services rendered up to the termination date.</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">6. GOVERNING LAW</h2>
              <div className="border border-gray-300 p-4 rounded">
                <p>This Agreement shall be governed by and construed in accordance with the laws of <span className="font-semibold">[State]</span>.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="font-bold text-gray-800 mb-4">CLIENT ACKNOWLEDGMENT</h3>
                <div className="border-t border-gray-400 pt-4">
                  <p className="mb-2">Signature: _________________________________</p>
                  <p className="mb-2">Print Name: _______________________________</p>
                  <p className="mb-2">Title: ____________________________________</p>
                  <p>Date: ____________________________________</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-4">SERVICE PROVIDER ACKNOWLEDGMENT</h3>
                <div className="border-t border-gray-400 pt-4">
                  <p className="mb-2">Signature: _________________________________</p>
                  <p className="mb-2">Print Name: _______________________________</p>
                  <p className="mb-2">Title: ____________________________________</p>
                  <p>Date: ____________________________________</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center text-sm text-gray-500">
              <p>This document constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements.</p>
            </div>
          </div>
        );
      case "invoice":
        return (
          <div className="p-6 max-w-2xl mx-auto bg-white">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-bold text-green-700">INVOICE</h1>
                <p className="text-gray-600 mt-1"># INV-2024-{Math.floor(Math.random() * 10000)}</p>
              </div>
              <div className="text-right">
                <div className="bg-green-50 border-2 border-green-700 p-3 rounded">
                  <p className="text-green-700 font-bold">AMOUNT DUE</p>
                  <p className="text-2xl font-bold text-green-800">$2,458.35</p>
                  <p className="text-sm text-green-700">Due: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="font-bold text-gray-800 mb-2">FROM:</p>
                <div className="text-sm">
                  <p className="font-bold text-lg">Your Business Name</p>
                  <p>123 Business Street</p>
                  <p>Business City, State 12345</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Email: billing@yourbusiness.com</p>
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-2">BILL TO:</p>
                <div className="text-sm">
                  <p className="font-bold text-lg">Client Company Name</p>
                  <p>456 Client Avenue</p>
                  <p>Client City, State 67890</p>
                  <p>Phone: (555) 987-6543</p>
                  <p>Email: accounts@clientcompany.com</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8 bg-gray-50 p-3 rounded border">
              <div>
                <p className="text-xs text-gray-500">INVOICE DATE</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">DUE DATE</p>
                <p className="font-medium">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">TERMS</p>
                <p className="font-medium">Net 30</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-bold text-gray-800 mb-3 text-lg border-b border-gray-300 pb-1">SERVICES RENDERED:</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-50">
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-bold">Item</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-bold">Description</th>
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-bold">Quantity</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">Rate</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm font-medium">WEB-001</td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Website Design & Development</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">1</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$1,800.00</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$1,800.00</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm font-medium">SUP-002</td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Monthly Support (3 months)</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">3</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$150.00</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$450.00</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm font-medium">TRN-003</td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Staff Training Session</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">2</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$125.00</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$250.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">NOTES:</h3>
                <div className="border border-gray-300 p-3 rounded text-sm h-24">
                  <p>Thank you for your business! Payment due within 30 days.</p>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-500">PAYMENT OPTIONS:</p>
                  <p className="text-sm">Bank Transfer, Check, or Credit Card</p>
                </div>
              </div>
              
              <div>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="text-right py-1 text-sm">Subtotal:</td>
                      <td className="text-right py-1 text-sm w-24">$2,500.00</td>
                    </tr>
                    <tr>
                      <td className="text-right py-1 text-sm">Discount (2%):</td>
                      <td className="text-right py-1 text-sm">-$50.00</td>
                    </tr>
                    <tr>
                      <td className="text-right py-1 text-sm">Tax (8.25%):</td>
                      <td className="text-right py-1 text-sm">$195.84</td>
                    </tr>
                    <tr className="border-t border-gray-300">
                      <td className="text-right py-2 font-bold text-lg">TOTAL:</td>
                      <td className="text-right py-2 font-bold text-lg text-green-700">$2,645.84</td>
                    </tr>
                    <tr>
                      <td className="text-right py-1 text-sm">Amount Paid:</td>
                      <td className="text-right py-1 text-sm">-$187.49</td>
                    </tr>
                    <tr className="border-t border-gray-300 bg-green-50">
                      <td className="text-right py-2 font-bold">AMOUNT DUE:</td>
                      <td className="text-right py-2 font-bold text-green-700">$2,458.35</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-gray-300 text-center">
              <p className="text-sm text-gray-600">Thank you for your business!</p>
              <p className="text-sm text-gray-600 mt-1">Please make checks payable to Your Business Name</p>
            </div>
          </div>
        );
      case "receipt":
        return (
          <div className="p-6 max-w-md mx-auto bg-white font-mono">
            <div className="text-center border-b-2 border-gray-800 pb-3 mb-3">
              <h1 className="text-2xl font-bold">YOUR BUSINESS NAME</h1>
              <p className="text-sm">123 Business Street, City, State 12345</p>
              <p className="text-sm">Phone: (555) 123-4567</p>
            </div>
            
            <div className="text-center mb-4">
              <div className="inline-block border-2 border-gray-800 px-4 py-1">
                <p className="font-bold">OFFICIAL RECEIPT</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div>
                <p>Receipt #: <span className="font-bold">RCT-2024-{Math.floor(Math.random() * 10000)}</span></p>
              </div>
              <div className="text-right">
                <p>Date: {new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p>Time: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
              <div className="text-right">
                <p>Cashier: John D.</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="border-t border-b border-gray-800 py-1">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">ITEM</span>
                  <span className="font-bold">AMOUNT</span>
                </div>
              </div>
              <div className="py-1 border-b border-gray-300">
                <div className="flex justify-between text-sm">
                  <span>Product 1</span>
                  <span>$49.99</span>
                </div>
              </div>
              <div className="py-1 border-b border-gray-300">
                <div className="flex justify-between text-sm">
                  <span>Product 2</span>
                  <span>$29.50</span>
                </div>
              </div>
              <div className="py-1 border-b border-gray-300">
                <div className="flex justify-between text-sm">
                  <span>Service Fee</span>
                  <span>$15.00</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm py-1">
                <span>SUBTOTAL:</span>
                <span>$94.49</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span>TAX (8.5%):</span>
                <span>$8.03</span>
              </div>
              <div className="flex justify-between text-sm py-1 font-bold border-t border-gray-800">
                <span>TOTAL:</span>
                <span>$102.52</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span>AMOUNT TENDERED:</span>
                <span>$120.00</span>
              </div>
              <div className="flex justify-between text-sm py-1 font-bold">
                <span>CHANGE:</span>
                <span>$17.48</span>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-xs">Payment Method: CASH</p>
              <div className="mt-2">
                <p className="text-xs border-t border-gray-800 pt-2">Transaction ID: TXN-{Math.floor(Math.random() * 1000000)}</p>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="border border-gray-800 p-2 inline-block">
                <p className="text-xs">CUSTOMER COPY</p>
              </div>
            </div>
            
            <div className="text-center text-xs">
              <p>Thank you for your purchase!</p>
              <p className="mt-1">Items sold are not returnable</p>
              <p className="mt-1">Exchange within 7 days with receipt</p>
            </div>
          </div>
        );
      case "notice":
        return (
          <div className="p-8 max-w-2xl mx-auto bg-white">
            <div className="text-center mb-8">
              <div className="border-2 border-gray-800 inline-block p-2 mb-4">
                <h1 className="text-2xl font-bold">OFFICIAL NOTICE</h1>
              </div>
              <p className="text-sm text-gray-600">Document Control Number: NT-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000)}</p>
            </div>
            
            <div className="text-right mb-8">
              <p className="font-semibold">Date: {new Date().toLocaleDateString()}</p>
            </div>
            
            <div className="mb-8">
              <p className="mb-4">To: <span className="font-semibold">All Employees/Customers/Stakeholders</span></p>
              <p className="mb-4">From: <span className="font-semibold">Management/Administration</span></p>
              <p className="mb-4">Subject: <span className="font-semibold underline">Important Notice Regarding Operations</span></p>
            </div>
            
            <div className="mb-8">
              <div className="border-l-4 border-gray-800 pl-4">
                <p className="mb-4">Dear Recipients,</p>
                <p className="mb-4">We are writing to inform you of important changes that will affect our operations. Please read this notice carefully as it contains essential information that impacts all stakeholders.</p>
                
                <h2 className="font-bold text-lg mb-3">Key Information:</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>New operational hours will be effective starting <span className="font-semibold">[Date]</span></li>
                  <li>Updated security protocols must be followed by all personnel</li>
                  <li>System maintenance scheduled for <span className="font-semibold">[Date and Time]</span></li>
                  <li>New contact information for department heads</li>
                </ul>
                
                <h2 className="font-bold text-lg mb-3">Effective Date:</h2>
                <p className="mb-4"><span className="font-semibold">[Insert Effective Date]</span></p>
                
                <h2 className="font-bold text-lg mb-3">Action Required:</h2>
                <p className="mb-4">All recipients must acknowledge receipt of this notice by signing and returning the attached acknowledgment form by <span className="font-semibold">[Deadline Date]</span>.</p>
                
                <h2 className="font-bold text-lg mb-3">Contact Information:</h2>
                <p className="mb-4">For questions regarding this notice, please contact:</p>
                <p className="font-semibold">[Department/Person Name]</p>
                <p>Phone: [Phone Number]</p>
                <p>Email: [Email Address]</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="font-bold text-lg mb-3">Additional Information:</h2>
              <div className="border border-gray-300 p-4 rounded">
                <p>This notice is issued in accordance with company policy and regulatory requirements. Failure to comply with the stated changes may result in disciplinary action or other consequences as outlined in company guidelines.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <p className="font-semibold mb-8">Issued By:</p>
                <div className="border-t border-gray-800 pt-2">
                  <p className="font-semibold">[Authorized Signatory Name]</p>
                  <p>[Title]</p>
                  <p>[Company Name]</p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-8">Acknowledgment:</p>
                <div className="border-t border-gray-800 pt-2">
                  <p className="mb-4">Signature: ________________________</p>
                  <p className="mb-4">Print Name: _______________________</p>
                  <p>Date: ____________________________</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
              <p>This is an official communication. Please retain for your records.</p>
              <p className="mt-1">Distribution: All Departments | Document Control ID: NT-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000)}</p>
            </div>
          </div>
        );
      case "quote":
        return (
          <div className="p-6 max-w-2xl mx-auto bg-white">
            <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-blue-800">
              <div>
                <h1 className="text-3xl font-bold text-blue-800">QUOTATION</h1>
                <p className="text-gray-600 mt-1">Professional Service Proposal</p>
              </div>
              <div className="text-right">
                <div className="bg-blue-50 border-2 border-blue-800 p-2 rounded">
                  <p className="text-blue-800 font-bold">QUOTE #</p>
                  <p className="text-xl font-bold">QT-2024-{Math.floor(Math.random() * 10000)}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">PREPARED FOR:</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="font-bold">Client Company Name</p>
                  <p>Client Contact Person</p>
                  <p>456 Client Avenue</p>
                  <p>Client City, State 67890</p>
                  <p>Phone: (555) 987-6543</p>
                  <p>Email: client@example.com</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">PREPARED BY:</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="font-bold">Your Business Name</p>
                  <p>Your Contact Person</p>
                  <p>123 Business Street</p>
                  <p>Business City, State 12345</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Email: sales@yourbusiness.com</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6 bg-blue-50 p-3 rounded border">
              <div>
                <p className="text-xs text-gray-600">DATE</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">VALID UNTIL</p>
                <p className="font-medium">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">PREPARED BY</p>
                <p className="font-medium">Sales Representative</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="bg-blue-800 text-white p-2 rounded-t">
                <h3 className="font-bold text-lg">PROJECT DESCRIPTION</h3>
              </div>
              <div className="border border-gray-300 p-3 rounded-b">
                <p>We are pleased to provide you with the following quotation for professional services. This proposal outlines our understanding of your requirements and our recommended solution.</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="bg-blue-800 text-white p-2 rounded-t">
                <h3 className="font-bold text-lg">QUOTED ITEMS</h3>
              </div>
              <table className="w-full border-collapse border border-gray-300 rounded-b">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-bold">Item #</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-bold">Description</th>
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-bold">Quantity</th>
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-bold">Unit</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">Unit Price</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm">001</td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Consultation Services</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">10</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">Hours</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$125.00</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$1,250.00</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm">002</td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Software License</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">5</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">Licenses</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$299.99</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$1,499.95</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm">003</td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Installation & Setup</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">1</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">Project</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$750.00</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$750.00</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2 text-sm">004</td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">Training Session</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">3</td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-sm">Sessions</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$200.00</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-sm">$600.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">SUBTOTAL</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">$4,099.95</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">DISCOUNT (5%)</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">-$205.00</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">TAX (8.25%)</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">$322.12</td>
                  </tr>
                  <tr className="bg-blue-100">
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-lg">TOTAL</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-lg">$4,217.07</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">TERMS & CONDITIONS:</h3>
                <div className="border border-gray-300 p-3 rounded text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>This quote is valid for 30 days</li>
                    <li>50% deposit required to begin work</li>
                    <li>Balance due upon completion</li>
                    <li>Travel expenses not included</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">PAYMENT SCHEDULE:</h3>
                <div className="border border-gray-300 p-3 rounded text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Deposit: $2,108.54 (50%)</li>
                    <li>Final Payment: $2,108.53 (50%)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">ACCEPTANCE:</h3>
              <div className="border border-gray-300 p-4 rounded">
                <p className="mb-4">By signing below, you agree to the terms and conditions outlined in this quotation.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2">Signature: _________________________________</p>
                    <p className="mb-2">Print Name: _______________________________</p>
                    <p className="mb-2">Title: ____________________________________</p>
                  </div>
                  <div>
                    <p className="mb-2">Date: ____________________________________</p>
                    <p className="mb-2">Company: _________________________________</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-600 mt-8 pt-4 border-t border-gray-300">
              <p>Thank you for considering our services. We look forward to working with you!</p>
              <p className="mt-1">Quote prepared by: Sales Department | Valid until: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
            </div>
          </div>
        );
      case "report":
        return (
          <div className="p-8 max-w-4xl mx-auto bg-white">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">MONTHLY BUSINESS REPORT</h1>
              <p className="text-lg mt-2">Reporting Period: {new Date().toLocaleDateString()} - {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}</p>
              <p className="text-gray-600 mt-1">Prepared by: Management Team</p>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-center">
                <p className="text-2xl font-bold text-blue-800">$42,580</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
                <p className="text-2xl font-bold text-green-800">$28,930</p>
                <p className="text-sm text-gray-600">Net Profit</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-center">
                <p className="text-2xl font-bold text-yellow-800">$12,450</p>
                <p className="text-sm text-gray-600">Expenses</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded p-4 text-center">
                <p className="text-2xl font-bold text-red-800">-3.4%</p>
                <p className="text-sm text-gray-600">Profit Margin</p>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <p className="text-lg font-bold mb-2">Key Performance Indicators (KPIs)</p>
                <ol className="list-disc pl-6">
                  <li>Sales growth: 5.6%</li>
                  <li>Customer satisfaction: 92%</li>
                  <li>Employee turnover: 8%</li>
                </ol>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <p className="text-lg font-bold mb-2">Operational Highlights</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Completed 12 major projects</li>
                  <li>Launched new product line</li>
                  <li>Expanded market reach by 15%</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <p className="text-lg font-bold mb-2">Strategic Initiatives</p>
                <ol className="list-disc pl-6">
                  <li>Increase marketing budget allocation to digital channels by 15%</li>
                  <li>Invest in additional warehouse capacity to meet growing demand</li>
                  <li>Enhance staff training programs to improve service quality</li>
                </ol>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 max-w-2xl mx-auto bg-white">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{templates.find(t => t.id === templateId)?.name}</h2>
              <p className="text-gray-600 mt-2">Professional business template</p>
            </div>
            
            <div className="border border-gray-300 rounded p-6">
              <p className="text-center text-gray-600">Template content would appear here.</p>
              <p className="text-center text-gray-600 mt-2">Replace this with your specific template content.</p>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">Customize this template according to your business needs.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation username={username} onBack={onBack} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Templates</h1>
          <p className="text-gray-600">Generate and print professional business templates</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => {
            const IconComponent = template.icon;
            return (
              <Card 
                key={template.id} 
                className="flex flex-col h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreviewTemplate(template.id);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrintTemplate(template.id);
                        }}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadTemplate(template.id);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="text-lg mb-2">{template.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {templates.find(t => t.id === selectedTemplate)?.name} Preview
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedTemplate && getTemplateContent(selectedTemplate)}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              if (selectedTemplate) handlePrintTemplate(selectedTemplate);
            }}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessTemplates;

                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2 text-left text-sm font-bold">Category</th>
                        <th className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">Current Period</th>
                        <th className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">Previous Period</th>
                        <th className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 text-sm">Revenue</td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm">$42,580</td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm">$37,920</td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm text-green-600">+12.3%</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 text-sm">Cost of Goods</td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm">$18,420</td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm">$16,850</td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm text-red-600">+9.3%</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 text-sm">Operating Expenses</td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm">$12,350</td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm">$11,890</td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm text-red-600">+3.9%</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 text-sm font-bold">Net Profit</td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">$28,930</td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">$25,170</td>
                        <td className="border border-gray-300 px-3 py-2 text-right text-sm font-bold text-green-600">+15.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">KEY METRICS</h2>
                <div className="border border-gray-300 rounded p-4">
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Customer Acquisition</span>
                      <span className="text-sm font-bold">142</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Customer Retention</span>
                      <span className="text-sm font-bold">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Productivity</span>
                      <span className="text-sm font-bold">108%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{width: '108%'}}></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Market Share</span>
                      <span className="text-sm font-bold">18.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '18.5%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">MARKET ANALYSIS</h2>
              <div className="border border-gray-300 rounded p-4">
                <p className="mb-3">The market continues to show positive trends with increased demand for our core products. Competitor analysis indicates we maintain a strong position in our primary market segments.</p>
                <p>Emerging opportunities in adjacent markets present potential for expansion. Investment in digital marketing channels has yielded significant returns, with online sales increasing by 22%.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">UPCOMING INITIATIVES</h2>
                <div className="border border-gray-300 rounded p-4">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Launch of new product line in Q2</li>
                    <li>Expansion into two new regional markets</li>
                    <li>Implementation of upgraded CRM system</li>
                    <li>Staff training program rollout</li>
                    <li>Renewal of key supplier contracts</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">RISKS & CHALLENGES</h2>
                <div className="border border-gray-300 rounded p-4">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Potential supply chain disruptions</li>
                    <li>Increased competition in key segments</li>
                    <li>Rising costs of raw materials</li>
                    <li>Economic uncertainty affecting consumer spending</li>
                    <li>Regulatory changes impacting operations</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">RECOMMENDATIONS</h2>
              <div className="border border-gray-300 rounded p-4">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Increase marketing budget allocation to digital channels by 15%</li>
                  <li>Invest in additional warehouse capacity to meet growing demand</li>
                  <li>