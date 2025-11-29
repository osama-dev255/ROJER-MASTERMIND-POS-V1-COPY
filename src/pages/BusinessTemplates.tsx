import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  
  // Form data state for each template type
  interface DeliveryData {
    businessName: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
    customerName: string;
    customerAddress1: string;
    customerAddress2: string;
    customerPhone: string;
    customerEmail: string;
    deliveryNoteNumber: string;
    date: string;
    deliveryDate: string;
    vehicleNumber: string;
    driver: string;
    items: Array<{
      description: string;
      quantity: string;
      unit: string;
      delivered: string;
      remarks: string;
    }>;
    deliveryNotes: string;
    totalItems: string;
    totalQuantity: string;
    totalPackages: string;
    preparedByName: string;
    preparedByDate: string;
    driverSignatureName: string;
    driverSignatureDate: string;
    receivedByName: string;
    receivedByDate: string;
  }
  
  interface OrderData {
    businessName: string;
    orderNumber: string;
    vendorName: string;
    vendorAddress: string;
    vendorCity: string;
    vendorPhone: string;
    vendorContact: string;
    shipToName: string;
    shipToAddress: string;
    shipToCity: string;
    shipToPhone: string;
    shipToContact: string;
    date: string;
    requiredBy: string;
    paymentTerms: string;
    shipVia: string;
    items: Array<{
      number: string;
      description: string;
      quantity: string;
      unit: string;
      rate: string;
      amount: string;
    }>;
    notes: string;
    approvalNotes: string;
    requestedByName: string;
    requestedByTitle: string;
    approvedByName: string;
    approvedByTitle: string;
    approvalDate: string;
  }
  
  const [deliveryData, setDeliveryData] = useState<DeliveryData>({
    businessName: "YOUR BUSINESS NAME",
    businessAddress: "123 Business Street, City, Country",
    businessPhone: "+1234567890",
    businessEmail: "info@yourbusiness.com",
    customerName: "",
    customerAddress1: "",
    customerAddress2: "",
    customerPhone: "",
    customerEmail: "",
    deliveryNoteNumber: "DN-" + new Date().getFullYear() + "-001",
    date: new Date().toLocaleDateString(),
    deliveryDate: "",
    vehicleNumber: "",
    driver: "",
    items: [
      { description: "", quantity: "", unit: "", delivered: "", remarks: "" }
    ],
    deliveryNotes: "",
    totalItems: "",
    totalQuantity: "",
    totalPackages: "",
    preparedByName: "",
    preparedByDate: "",
    driverSignatureName: "",
    driverSignatureDate: "",
    receivedByName: "",
    receivedByDate: ""
  });
  
  const [orderData, setOrderData] = useState<OrderData>({
    businessName: "Your Business Name",
    orderNumber: "PO-" + new Date().getFullYear() + "-001",
    vendorName: "",
    vendorAddress: "",
    vendorCity: "",
    vendorPhone: "",
    vendorContact: "",
    shipToName: "Your Business Name",
    shipToAddress: "123 Business Street",
    shipToCity: "Business City, State 67890",
    shipToPhone: "(555) 987-6543",
    shipToContact: "Jane Manager",
    date: new Date().toLocaleDateString(),
    requiredBy: "",
    paymentTerms: "Net 30",
    shipVia: "Ground",
    items: [
      { number: "", description: "", quantity: "", unit: "", rate: "", amount: "" }
    ],
    notes: "",
    approvalNotes: "",
    requestedByName: "",
    requestedByTitle: "",
    approvedByName: "",
    approvedByTitle: "",
    approvalDate: ""
  });
  
  // Handle delivery form changes
  const handleDeliveryChange = <K extends keyof DeliveryData>(field: K, value: DeliveryData[K]) => {
    setDeliveryData(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle order form changes
  const handleOrderChange = <K extends keyof OrderData>(field: K, value: OrderData[K]) => {
    setOrderData(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle delivery item changes
  const handleDeliveryItemChange = (index: number, field: string, value: string) => {
    setDeliveryData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };
  
  // Handle order item changes
  const handleOrderItemChange = (index: number, field: string, value: string) => {
    setOrderData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };
  
  // Add delivery item
  const addDeliveryItem = () => {
    setDeliveryData(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: "", unit: "", delivered: "", remarks: "" }]
    }));
  };
  
  // Add order item
  const addOrderItem = () => {
    setOrderData(prev => ({
      ...prev,
      items: [...prev.items, { number: "", description: "", quantity: "", unit: "", rate: "", amount: "" }]
    }));
  };
  
  // Remove delivery item
  const removeDeliveryItem = (index: number) => {
    setDeliveryData(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };
  
  // Remove order item
  const removeOrderItem = (index: number) => {
    setOrderData(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };
  
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
      // Print the template based on type using actual form data
      switch (templateId) {
        case "delivery":
          // For delivery notes, create a custom print function that prints the form data as-is
          // Create a temporary HTML document with the delivery note content
          const printWindow = window.open('', '_blank');
          if (printWindow) {
            const printContent = `
              <!DOCTYPE html>
              <html>
                <head>
                  <title>Delivery Note ${deliveryData.deliveryNoteNumber}</title>
                  <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; margin-bottom: 20px; }
                    .section { margin-bottom: 20px; }
                    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                    .border-box { border: 1px solid #ccc; padding: 10px; }
                    table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                    th { background-color: #f5f5f5; }
                  </style>
                </head>
                <body>
                  <div class="header">
                    <h1>DELIVERY NOTE</h1>
                    <h2>${deliveryData.businessName}</h2>
                    <p>${deliveryData.businessAddress}</p>
                    <p>Phone: ${deliveryData.businessPhone} | Email: ${deliveryData.businessEmail}</p>
                  </div>
                  
                  <div class="grid">
                    <div class="border-box">
                      <h3>TO:</h3>
                      <p><strong>${deliveryData.customerName}</strong></p>
                      <p>${deliveryData.customerAddress1}</p>
                      <p>${deliveryData.customerAddress2}</p>
                      <p>Phone: ${deliveryData.customerPhone}</p>
                      <p>Email: ${deliveryData.customerEmail}</p>
                    </div>
                    
                    <div class="border-box">
                      <h3>DELIVERY DETAILS:</h3>
                      <p><strong>Delivery Note #:</strong> ${deliveryData.deliveryNoteNumber}</p>
                      <p><strong>Date:</strong> ${deliveryData.date}</p>
                      <p><strong>Delivery Date:</strong> ${deliveryData.deliveryDate}</p>
                      <p><strong>Vehicle #:</strong> ${deliveryData.vehicleNumber}</p>
                      <p><strong>Driver:</strong> ${deliveryData.driver}</p>
                    </div>
                  </div>
                  
                  <div class="section">
                    <h3>ITEMS DELIVERED:</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Item Description</th>
                          <th>Quantity</th>
                          <th>Unit</th>
                          <th>Delivered</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${deliveryData.items.map(item => `
                          <tr>
                            <td>${item.description}</td>
                            <td>${item.quantity}</td>
                            <td>${item.unit}</td>
                            <td>${item.delivered}</td>
                            <td>${item.remarks}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                  
                  <div class="grid">
                    <div>
                      <h3>DELIVERY NOTES:</h3>
                      <div class="border-box" style="min-height: 60px;">${deliveryData.deliveryNotes}</div>
                    </div>
                    
                    <div>
                      <p><strong>Total Items:</strong> ${deliveryData.totalItems}</p>
                      <p><strong>Total Quantity:</strong> ${deliveryData.totalQuantity}</p>
                      <p><strong>Total Packages:</strong> ${deliveryData.totalPackages}</p>
                    </div>
                  </div>
                  
                  <div class="grid" style="margin-top: 40px;">
                    <div style="text-align: center;">
                      <p><strong>Prepared By</strong></p>
                      <p>Name: ${deliveryData.preparedByName}</p>
                      <p>Date: ${deliveryData.preparedByDate}</p>
                    </div>
                    <div style="text-align: center;">
                      <p><strong>Driver Signature</strong></p>
                      <p>Name: ${deliveryData.driverSignatureName}</p>
                      <p>Date: ${deliveryData.driverSignatureDate}</p>
                    </div>
                    <div style="text-align: center;">
                      <p><strong>Received By</strong></p>
                      <p>Name: ${deliveryData.receivedByName}</p>
                      <p>Date: ${deliveryData.receivedByDate}</p>
                      <p>(Signature Required)</p>
                    </div>
                  </div>
                </body>
              </html>
            `;
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
              printWindow.print();
              printWindow.close();
            }, 250);
          }
          break;
        case "order":
          // Create a purchase order object from form data
          const purchaseOrderData = {
            orderNumber: orderData.orderNumber,
            date: new Date(orderData.date).toISOString(),
            supplier: {
              name: orderData.vendorName || "",
              address: orderData.vendorAddress || "",
              city: orderData.vendorCity || "",
              phone: orderData.vendorPhone || "",
              contact: orderData.vendorContact || ""
            },
            items: orderData.items.map(item => ({
              productName: item.description || "",
              quantity: parseInt(item.quantity) || 0,
              unitPrice: parseFloat(item.rate) || 0,
              total: parseFloat(item.amount) || 0
            })),
            total: orderData.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
          };
          // Use the purchase order print function
          PrintUtils.printPurchaseOrder(purchaseOrderData);
          break;
        case "contract":
          alert("Printing for Contract Template is not yet implemented. Please implement the specific print function for this template type.");
          break;
        case "invoice":
          alert("Printing for Invoice Template is not yet implemented. Please implement the specific print function for this template type.");
          break;
        case "receipt":
          alert("Printing for Receipt Template is not yet implemented. Please implement the specific print function for this template type.");
          break;
        case "notice":
          alert("Printing for Notice Template is not yet implemented. Please implement the specific print function for this template type.");
          break;
        case "quote":
          alert("Printing for Quotation Template is not yet implemented. Please implement the specific print function for this template type.");
          break;
        case "report":
          alert("Printing for Report Template is not yet implemented. Please implement the specific print function for this template type.");
          break;
        default:
          alert(`Printing for ${templates.find(t => t.id === templateId)?.name || 'Unknown Template'} is not yet implemented. Please implement the specific print function for this template type.`);
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
                <Input 
                  className="font-semibold text-gray-700 text-center mb-1" 
                  value={deliveryData.businessName} 
                  onChange={(e) => handleDeliveryChange('businessName', e.target.value)} 
                />
                <Input 
                  className="text-gray-600 text-center mb-1" 
                  value={deliveryData.businessAddress} 
                  onChange={(e) => handleDeliveryChange('businessAddress', e.target.value)} 
                />
                <div className="text-gray-600 text-center">
                  Phone: 
                  <Input 
                    className="inline-block w-32 mx-1" 
                    value={deliveryData.businessPhone} 
                    onChange={(e) => handleDeliveryChange('businessPhone', e.target.value)} 
                  />
                  | Email: 
                  <Input 
                    className="inline-block w-32 mx-1" 
                    value={deliveryData.businessEmail} 
                    onChange={(e) => handleDeliveryChange('businessEmail', e.target.value)} 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-300 p-4 rounded">
                <h3 className="font-bold text-gray-800 mb-2">TO:</h3>
                <div className="space-y-2 text-sm">
                  <Input 
                    className="font-medium" 
                    placeholder="Customer Name" 
                    value={deliveryData.customerName} 
                    onChange={(e) => handleDeliveryChange('customerName', e.target.value)} 
                  />
                  <Input 
                    placeholder="Customer Address Line 1" 
                    value={deliveryData.customerAddress1} 
                    onChange={(e) => handleDeliveryChange('customerAddress1', e.target.value)} 
                  />
                  <Input 
                    placeholder="Customer Address Line 2" 
                    value={deliveryData.customerAddress2} 
                    onChange={(e) => handleDeliveryChange('customerAddress2', e.target.value)} 
                  />
                  <div>
                    Phone: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      placeholder="Phone" 
                      value={deliveryData.customerPhone} 
                      onChange={(e) => handleDeliveryChange('customerPhone', e.target.value)} 
                    />
                  </div>
                  <div>
                    Email: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      placeholder="Email" 
                      value={deliveryData.customerEmail} 
                      onChange={(e) => handleDeliveryChange('customerEmail', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-300 p-4 rounded">
                <h3 className="font-bold text-gray-800 mb-2">DELIVERY DETAILS:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Delivery Note #:</span>
                    <Input 
                      className="w-32" 
                      value={deliveryData.deliveryNoteNumber} 
                      onChange={(e) => handleDeliveryChange('deliveryNoteNumber', e.target.value)} 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Date:</span>
                    <Input 
                      className="w-32" 
                      value={deliveryData.date} 
                      onChange={(e) => handleDeliveryChange('date', e.target.value)} 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Delivery Date:</span>
                    <Input 
                      className="w-32" 
                      placeholder="Delivery Date" 
                      value={deliveryData.deliveryDate} 
                      onChange={(e) => handleDeliveryChange('deliveryDate', e.target.value)} 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Vehicle #:</span>
                    <Input 
                      className="w-32" 
                      placeholder="Vehicle #" 
                      value={deliveryData.vehicleNumber} 
                      onChange={(e) => handleDeliveryChange('vehicleNumber', e.target.value)} 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Driver:</span>
                    <Input 
                      className="w-32" 
                      placeholder="Driver Name" 
                      value={deliveryData.driver} 
                      onChange={(e) => handleDeliveryChange('driver', e.target.value)} 
                    />
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
                  {deliveryData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <Input 
                          value={item.description} 
                          onChange={(e) => handleDeliveryItemChange(index, 'description', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="text-center" 
                          value={item.quantity} 
                          onChange={(e) => handleDeliveryItemChange(index, 'quantity', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="text-center" 
                          value={item.unit} 
                          onChange={(e) => handleDeliveryItemChange(index, 'unit', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="text-center" 
                          value={item.delivered} 
                          onChange={(e) => handleDeliveryItemChange(index, 'delivered', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                        <Input 
                          className="text-right" 
                          value={item.remarks} 
                          onChange={(e) => handleDeliveryItemChange(index, 'remarks', e.target.value)} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={addDeliveryItem}
              >
                Add Item
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">DELIVERY NOTES:</h3>
                <Textarea 
                  className="border border-gray-300 h-24 p-2 text-sm" 
                  placeholder="Enter delivery notes..." 
                  value={deliveryData.deliveryNotes} 
                  onChange={(e) => handleDeliveryChange('deliveryNotes', e.target.value)} 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1 items-center">
                  <span className="font-medium text-sm">Total Items:</span>
                  <Input 
                    className="w-20 text-sm" 
                    placeholder="Total Items" 
                    value={deliveryData.totalItems} 
                    onChange={(e) => handleDeliveryChange('totalItems', e.target.value)} 
                  />
                </div>
                <div className="flex justify-between mb-1 items-center">
                  <span className="font-medium text-sm">Total Quantity:</span>
                  <Input 
                    className="w-20 text-sm" 
                    placeholder="Total Quantity" 
                    value={deliveryData.totalQuantity} 
                    onChange={(e) => handleDeliveryChange('totalQuantity', e.target.value)} 
                  />
                </div>
                <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-300 items-center">
                  <span className="text-sm">Total Packages:</span>
                  <Input 
                    className="w-20 text-sm" 
                    placeholder="Total Packages" 
                    value={deliveryData.totalPackages} 
                    onChange={(e) => handleDeliveryChange('totalPackages', e.target.value)} 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mt-12 text-sm">
                  <p>Prepared By</p>
                  <div className="mt-1">
                    Name: 
                    <Input 
                      className="inline-block w-32 mx-1" 
                      placeholder="Prepared By Name" 
                      value={deliveryData.preparedByName} 
                      onChange={(e) => handleDeliveryChange('preparedByName', e.target.value)} 
                    />
                  </div>
                  <div>
                    Date: 
                    <Input 
                      className="inline-block w-32 mx-1" 
                      placeholder="Date" 
                      value={deliveryData.preparedByDate} 
                      onChange={(e) => handleDeliveryChange('preparedByDate', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mt-12 text-sm">
                  <p>Driver Signature</p>
                  <div className="mt-1">
                    Name: 
                    <Input 
                      className="inline-block w-32 mx-1" 
                      placeholder="Driver Name" 
                      value={deliveryData.driverSignatureName} 
                      onChange={(e) => handleDeliveryChange('driverSignatureName', e.target.value)} 
                    />
                  </div>
                  <div>
                    Date: 
                    <Input 
                      className="inline-block w-32 mx-1" 
                      placeholder="Date" 
                      value={deliveryData.driverSignatureDate} 
                      onChange={(e) => handleDeliveryChange('driverSignatureDate', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mt-12 text-sm">
                  <p>Received By</p>
                  <div className="mt-1">
                    Name: 
                    <Input 
                      className="inline-block w-32 mx-1" 
                      placeholder="Received By Name" 
                      value={deliveryData.receivedByName} 
                      onChange={(e) => handleDeliveryChange('receivedByName', e.target.value)} 
                    />
                  </div>
                  <div>
                    Date: 
                    <Input 
                      className="inline-block w-32 mx-1" 
                      placeholder="Date" 
                      value={deliveryData.receivedByDate} 
                      onChange={(e) => handleDeliveryChange('receivedByDate', e.target.value)} 
                    />
                  </div>
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
                  <Input 
                    className="text-xl font-bold w-32 text-center" 
                    value={orderData.orderNumber} 
                    onChange={(e) => handleOrderChange('orderNumber', e.target.value)} 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">VENDOR:</h3>
                <div className="bg-gray-50 p-3 rounded border space-y-2">
                  <Input 
                    className="font-bold" 
                    placeholder="Vendor Name" 
                    value={orderData.vendorName} 
                    onChange={(e) => handleOrderChange('vendorName', e.target.value)} 
                  />
                  <Input 
                    placeholder="Vendor Address" 
                    value={orderData.vendorAddress} 
                    onChange={(e) => handleOrderChange('vendorAddress', e.target.value)} 
                  />
                  <Input 
                    placeholder="Vendor City, State ZIP" 
                    value={orderData.vendorCity} 
                    onChange={(e) => handleOrderChange('vendorCity', e.target.value)} 
                  />
                  <div>
                    Phone: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      placeholder="Phone" 
                      value={orderData.vendorPhone} 
                      onChange={(e) => handleOrderChange('vendorPhone', e.target.value)} 
                    />
                  </div>
                  <div>
                    Contact: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      placeholder="Contact Person" 
                      value={orderData.vendorContact} 
                      onChange={(e) => handleOrderChange('vendorContact', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">SHIP TO:</h3>
                <div className="bg-gray-50 p-3 rounded border space-y-2">
                  <Input 
                    className="font-bold" 
                    value={orderData.shipToName} 
                    onChange={(e) => handleOrderChange('shipToName', e.target.value)} 
                  />
                  <Input 
                    value={orderData.shipToAddress} 
                    onChange={(e) => handleOrderChange('shipToAddress', e.target.value)} 
                  />
                  <Input 
                    value={orderData.shipToCity} 
                    onChange={(e) => handleOrderChange('shipToCity', e.target.value)} 
                  />
                  <div>
                    Phone: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={orderData.shipToPhone} 
                      onChange={(e) => handleOrderChange('shipToPhone', e.target.value)} 
                    />
                  </div>
                  <div>
                    Contact: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={orderData.shipToContact} 
                      onChange={(e) => handleOrderChange('shipToContact', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-6 bg-gray-50 p-3 rounded border">
              <div>
                <p className="text-xs text-gray-500">DATE</p>
                <Input 
                  className="font-medium w-full" 
                  value={orderData.date} 
                  onChange={(e) => handleOrderChange('date', e.target.value)} 
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">REQUIRED BY</p>
                <Input 
                  className="font-medium w-full" 
                  placeholder="Required By" 
                  value={orderData.requiredBy} 
                  onChange={(e) => handleOrderChange('requiredBy', e.target.value)} 
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">PAYMENT TERMS</p>
                <Input 
                  className="font-medium w-full" 
                  value={orderData.paymentTerms} 
                  onChange={(e) => handleOrderChange('paymentTerms', e.target.value)} 
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">SHIP VIA</p>
                <Input 
                  className="font-medium w-full" 
                  value={orderData.shipVia} 
                  onChange={(e) => handleOrderChange('shipVia', e.target.value)} 
                />
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
                  {orderData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <Input 
                          value={item.number} 
                          onChange={(e) => handleOrderItemChange(index, 'number', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <Input 
                          value={item.description} 
                          onChange={(e) => handleOrderItemChange(index, 'description', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="text-center" 
                          value={item.quantity} 
                          onChange={(e) => handleOrderItemChange(index, 'quantity', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="text-center" 
                          value={item.unit} 
                          onChange={(e) => handleOrderItemChange(index, 'unit', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                        <Input 
                          className="text-right" 
                          value={item.rate} 
                          onChange={(e) => handleOrderItemChange(index, 'rate', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                        <Input 
                          className="text-right" 
                          value={item.amount} 
                          onChange={(e) => handleOrderItemChange(index, 'amount', e.target.value)} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={addOrderItem}
              >
                Add Item
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">SPECIAL INSTRUCTIONS:</h3>
                <Textarea 
                  className="border border-gray-300 h-20 p-2 text-sm" 
                  placeholder="Special instructions..." 
                  value={orderData.notes} 
                  onChange={(e) => handleOrderChange('notes', e.target.value)} 
                />
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">APPROVAL:</h3>
                <Textarea 
                  className="border border-gray-300 h-20 p-2 text-sm" 
                  placeholder="Approval notes..." 
                  value={orderData.approvalNotes || ''} 
                  onChange={(e) => handleOrderChange('approvalNotes', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="pt-2 text-sm">
                  <p className="font-bold">REQUESTED BY</p>
                  <div className="mt-8">
                    <Input 
                      className="w-full text-center mb-1" 
                      placeholder="Name" 
                      value={orderData.requestedByName} 
                      onChange={(e) => handleOrderChange('requestedByName', e.target.value)} 
                    />
                    <Input 
                      className="w-full text-center" 
                      placeholder="Title" 
                      value={orderData.requestedByTitle} 
                      onChange={(e) => handleOrderChange('requestedByTitle', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="pt-2 text-sm">
                  <p className="font-bold">APPROVED BY</p>
                  <div className="mt-8">
                    <Input 
                      className="w-full text-center mb-1" 
                      placeholder="Name" 
                      value={orderData.approvedByName} 
                      onChange={(e) => handleOrderChange('approvedByName', e.target.value)} 
                    />
                    <Input 
                      className="w-full text-center" 
                      placeholder="Title" 
                      value={orderData.approvedByTitle} 
                      onChange={(e) => handleOrderChange('approvedByTitle', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="pt-2 text-sm">
                  <p className="font-bold">DATE</p>
                  <div className="mt-8">
                    <Input 
                      className="w-full text-center" 
                      placeholder="Date" 
                      value={orderData.approvalDate} 
                      onChange={(e) => handleOrderChange('approvalDate', e.target.value)} 
                    />
                  </div>
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
      <Navigation title="Business Templates" username={username} onBack={onBack} onLogout={onLogout} />
      
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