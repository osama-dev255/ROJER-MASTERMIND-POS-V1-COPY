import { useState } from "react";
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

interface InvoiceData {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  clientName: string;
  clientAddress: string;
  clientCity: string;
  clientPhone: string;
  clientEmail: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  terms: string;
  items: Array<{
    itemNumber: string;
    description: string;
    quantity: string;
    unit: string;
    rate: string;
    amount: string;
  }>;
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
  amountPaid: string;
  balance: string;
  notes: string;
  paymentOptions: string;
}

interface DeliveryNoteData {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  deliveryNoteNumber: string;
  deliveryDate: string;
  deliveryDetailsDate: string;
  vehicleNumber: string;
  driverName: string;
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

interface OrderFormData {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  businessContact: string;
  supplierName: string;
  supplierAddress: string;
  supplierPhone: string;
  supplierContact: string;
  orderNumber: string;
  orderDate: string;
  requiredBy: string;
  paymentTerms: string;
  shipVia: string;
  items: Array<{
    itemNumber: string;
    description: string;
    quantity: string;
    unit: string;
    unitPrice: string;
    total: string;
  }>;
  subtotal: string;
  tax: string;
  shipping: string;
  total: string;
  specialInstructions: string;
  approval: string;
  requestedByName: string;
  requestedByTitle: string;
  approvedByName: string;
  approvedByTitle: string;
  approvalDate: string;
}

interface ContractData {
  agreementDate: string;
  clientName: string;
  clientAddress: string;
  clientCityStateZip: string;
  clientContact: string;
  clientPhone: string;
  clientEmail: string;
  serviceProviderName: string;
  serviceProviderAddress: string;
  serviceProviderCityStateZip: string;
  serviceProviderContact: string;
  serviceProviderPhone: string;
  serviceProviderEmail: string;
  services: string[];
  termStartDate: string;
  termDuration: string;
  compensation: Array<{
    description: string;
    value: string;
  }>;
  additionalServicesRate: string;
  warranties: string;
  termination: string;
  governingLaw: string;
  clientSignature: string;
  clientPrintName: string;
  clientTitle: string;
  clientSignatureDate: string;
  serviceProviderSignature: string;
  serviceProviderPrintName: string;
  serviceProviderTitle: string;
  serviceProviderSignatureDate: string;
}

interface ReceiptData {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  receiptNumber: string;
  date: string;
  time: string;
  cashier: string;
  items: Array<{
    name: string;
    amount: string;
  }>;
  subtotal: string;
  tax: string;
  total: string;
  amountTendered: string;
  change: string;
  paymentMethod: string;
  transactionId: string;
  thankYouMessage: string;
  returnPolicy: string;
  exchangePolicy: string;
}

interface NoticeData {
  noticeTitle: string;
  documentControlNumber: string;
  date: string;
  to: string;
  from: string;
  subject: string;
  introduction: string;
  keyInformation: string[];
  effectiveDateLabel: string;
  effectiveDate: string;
  actionRequiredLabel: string;
  actionRequired: string;
  deadlineDate: string;
  contactLabel: string;
  contactInfo: string;
  departmentPersonName: string;
  phoneNumber: string;
  emailAddress: string;
  additionalInformation: string;
  issuedByLabel: string;
  authorizedSignatoryName: string;
  title: string;
  companyName: string;
  acknowledgmentLabel: string;
  signatureLine: string;
  printNameLine: string;
  dateLine: string;
  footerMessage: string;
  distributionInfo: string;
}

interface QuoteData {
  quoteTitle: string;
  quoteSubtitle: string;
  quoteNumber: string;
  preparedFor: {
    company: string;
    contactPerson: string;
    address: string;
    cityStateZip: string;
    phone: string;
    email: string;
  };
  preparedBy: {
    company: string;
    contactPerson: string;
    address: string;
    cityStateZip: string;
    phone: string;
    email: string;
  };
  date: string;
  validUntil: string;
  preparedByPerson: string;
  projectDescription: string;
  items: Array<{
    itemNumber: string;
    description: string;
    quantity: string;
    unit: string;
    unitPrice: string;
    total: string;
  }>;
  subtotal: string;
  discountLabel: string;
  discountValue: string;
  taxLabel: string;
  taxValue: string;
  totalLabel: string;
  totalValue: string;
  termsAndConditions: string[];
  paymentSchedule: string[];
  acceptanceMessage: string;
  signatureLine: string;
  printNameLine: string;
  titleLine: string;
  dateLine: string;
  companyLine: string;
  thankYouMessage: string;
  quotePreparedBy: string;
  validUntilDate: string;
}

interface ReportData {
  reportTitle: string;
  reportingPeriod: string;
  preparedBy: string;
  metrics: Array<{
    value: string;
    label: string;
    color: string;
  }>;
  kpiTitle: string;
  kpis: string[];
  operationalHighlightsTitle: string;
  operationalHighlights: string[];
  strategicInitiativesTitle: string;
  strategicInitiatives: string[];
}

export const BusinessTemplates = ({ username, onBack, onLogout }: BusinessTemplatesProps) => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Form data state for invoice template
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    businessName: "Your Business Name",
    businessAddress: "123 Business Street",
    businessPhone: "(555) 123-4567",
    businessEmail: "billing@yourbusiness.com",
    clientName: "Client Company Name",
    clientAddress: "456 Client Avenue",
    clientCity: "Client City, State 67890",
    clientPhone: "(555) 987-6543",
    clientEmail: "accounts@clientcompany.com",
    invoiceNumber: "INV-2024-001",
    invoiceDate: new Date().toLocaleDateString(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    terms: "Net 30",
    items: [
      { itemNumber: "WEB-001", description: "Website Design & Development", quantity: "1", unit: "Project", rate: "1800.00", amount: "1800.00" },
      { itemNumber: "SUP-002", description: "Monthly Support (3 months)", quantity: "3", unit: "Months", rate: "150.00", amount: "450.00" }
    ],
    subtotal: "2250.00",
    discount: "50.00",
    tax: "195.84",
    total: "2395.84",
    amountPaid: "0.00",
    balance: "2395.84",
    notes: "Thank you for your business! Payment due within 30 days.",
    paymentOptions: "Bank Transfer, Check, or Credit Card"
  });

  // Form data state for delivery note template
  const [deliveryNoteData, setDeliveryNoteData] = useState<DeliveryNoteData>({
    businessName: "YOUR BUSINESS NAME",
    businessAddress: "123 Business Street, City, Country",
    businessPhone: "+1234567890",
    businessEmail: "info@yourbusiness.com",
    customerName: "Customer Name",
    customerAddress: "Customer Address Line 1\nCustomer Address Line 2",
    customerPhone: "+1234567890",
    customerEmail: "customer@example.com",
    deliveryNoteNumber: "DN-001",
    deliveryDate: new Date().toLocaleDateString(),
    deliveryDetailsDate: "_________",
    vehicleNumber: "_________",
    driverName: "_________",
    items: [
      { description: "Sample Product 1", quantity: "10", unit: "pcs", delivered: "10", remarks: "Good condition" },
      { description: "Sample Product 2", quantity: "5", unit: "boxes", delivered: "5", remarks: "Fragile" },
      { description: "Sample Product 3", quantity: "2", unit: "units", delivered: "2", remarks: "" }
    ],
    deliveryNotes: "Please handle with care. Fragile items included.\nSignature required upon delivery.",
    totalItems: "17",
    totalQuantity: "28 units",
    totalPackages: "3",
    preparedByName: "_________________",
    preparedByDate: "_________",
    driverSignatureName: "_________________",
    driverSignatureDate: "_________",
    receivedByName: "_________________",
    receivedByDate: "_________"
  });

  // Form data state for order form template
  const [orderFormData, setOrderFormData] = useState<OrderFormData>({
    businessName: "Your Business Name",
    businessAddress: "123 Business Street",
    businessPhone: "(555) 987-6543",
    businessEmail: "info@yourbusiness.com",
    businessContact: "Jane Manager",
    supplierName: "Supplier Company Name",
    supplierAddress: "123 Supplier Street",
    supplierPhone: "(555) 123-4567",
    supplierContact: "John Supplier",
    orderNumber: "PO-2024-001",
    orderDate: new Date().toLocaleDateString(),
    requiredBy: "_________",
    paymentTerms: "Net 30",
    shipVia: "Ground",
    items: [
      { itemNumber: "ITM-001", description: "Office Chairs", quantity: "10", unit: "EA", unitPrice: "89.99", total: "899.90" },
      { itemNumber: "ITM-002", description: "Desk Lamps", quantity: "15", unit: "EA", unitPrice: "24.50", total: "367.50" },
      { itemNumber: "ITM-003", description: "Filing Cabinets", quantity: "3", unit: "EA", unitPrice: "149.99", total: "449.97" }
    ],
    subtotal: "1,717.37",
    tax: "145.98",
    shipping: "45.00",
    total: "1,908.35",
    specialInstructions: "Please deliver by Friday. Call before delivery.",
    approval: "Approved for purchase per budget approval.",
    requestedByName: "_______________________",
    requestedByTitle: "",
    approvedByName: "_______________________",
    approvedByTitle: "",
    approvalDate: "_______________________"
  });

  // Form data state for contract template
  const [contractData, setContractData] = useState<ContractData>({
    agreementDate: new Date().toLocaleDateString(),
    clientName: "Client Company Name",
    clientAddress: "Client Address Line 1",
    clientCityStateZip: "City, State ZIP Code",
    clientContact: "Client Contact Person",
    clientPhone: "(555) 123-4567",
    clientEmail: "client@example.com",
    serviceProviderName: "Your Business Name",
    serviceProviderAddress: "123 Business Street",
    serviceProviderCityStateZip: "City, State ZIP Code",
    serviceProviderContact: "Service Provider Contact",
    serviceProviderPhone: "(555) 987-6543",
    serviceProviderEmail: "services@yourbusiness.com",
    services: [
      "Monthly website maintenance and updates",
      "Technical support during business hours",
      "Security monitoring and updates",
      "Performance optimization",
      "Backup and recovery services"
    ],
    termStartDate: "_________",
    termDuration: "12 months",
    compensation: [
      { description: "Monthly fee", value: "$1,500.00" },
      { description: "Payment due", value: "Within 15 days of invoice date" },
      { description: "Late payment penalty", value: "1.5% per month" }
    ],
    additionalServicesRate: "$125/hour",
    warranties: "The Service Provider warrants that all services will be performed in a professional and workmanlike manner. The Service Provider makes no other warranties, express or implied.",
    termination: "Either party may terminate this Agreement with 30 days written notice. Upon termination, the Client shall pay for all services rendered up to the termination date.",
    governingLaw: "[State]",
    clientSignature: "_________________________________",
    clientPrintName: "_______________________________",
    clientTitle: "____________________________________",
    clientSignatureDate: "____________________________________",
    serviceProviderSignature: "_________________________________",
    serviceProviderPrintName: "_______________________________",
    serviceProviderTitle: "____________________________________",
    serviceProviderSignatureDate: "____________________________________"
  });

  // Form data state for receipt template
  const [receiptData, setReceiptData] = useState<ReceiptData>({
    businessName: "YOUR BUSINESS NAME",
    businessAddress: "123 Business Street, City, State 12345",
    businessPhone: "(555) 123-4567",
    receiptNumber: "RCT-2024-" + Math.floor(Math.random() * 10000),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    cashier: "John D.",
    items: [
      { name: "Product 1", amount: "$49.99" },
      { name: "Product 2", amount: "$29.50" },
      { name: "Service Fee", amount: "$15.00" }
    ],
    subtotal: "$94.49",
    tax: "$8.03",
    total: "$102.52",
    amountTendered: "$120.00",
    change: "$17.48",
    paymentMethod: "CASH",
    transactionId: "TXN-" + Math.floor(Math.random() * 1000000),
    thankYouMessage: "Thank you for your purchase!",
    returnPolicy: "Items sold are not returnable",
    exchangePolicy: "Exchange within 7 days with receipt"
  });

  // Form data state for notice template
  const [noticeData, setNoticeData] = useState<NoticeData>({
    noticeTitle: "OFFICIAL NOTICE",
    documentControlNumber: "NT-" + new Date().getFullYear() + "-" + Math.floor(Math.random() * 10000),
    date: new Date().toLocaleDateString(),
    to: "All Employees/Customers/Stakeholders",
    from: "Management/Administration",
    subject: "Important Notice Regarding Operations",
    introduction: "Dear Recipients,\n\nWe are writing to inform you of important changes that will affect our operations. Please read this notice carefully as it contains essential information that impacts all stakeholders.",
    keyInformation: [
      "New operational hours will be effective starting [Date]",
      "Updated security protocols must be followed by all personnel",
      "System maintenance scheduled for [Date and Time]",
      "New contact information for department heads"
    ],
    effectiveDateLabel: "Effective Date:",
    effectiveDate: "[Insert Effective Date]",
    actionRequiredLabel: "Action Required:",
    actionRequired: "All recipients must acknowledge receipt of this notice by signing and returning the attached acknowledgment form by [Deadline Date].",
    deadlineDate: "[Deadline Date]",
    contactLabel: "Contact Information:",
    contactInfo: "For questions regarding this notice, please contact:",
    departmentPersonName: "[Department/Person Name]",
    phoneNumber: "[Phone Number]",
    emailAddress: "[Email Address]",
    additionalInformation: "This notice is issued in accordance with company policy and regulatory requirements. Failure to comply with the stated changes may result in disciplinary action or other consequences as outlined in company guidelines.",
    issuedByLabel: "Issued By:",
    authorizedSignatoryName: "[Authorized Signatory Name]",
    title: "[Title]",
    companyName: "[Company Name]",
    acknowledgmentLabel: "Acknowledgment:",
    signatureLine: "Signature: ________________________",
    printNameLine: "Print Name: _______________________",
    dateLine: "Date: ____________________________",
    footerMessage: "This is an official communication. Please retain for your records.",
    distributionInfo: "Distribution: All Departments | Document Control ID: NT-" + new Date().getFullYear() + "-" + Math.floor(Math.random() * 10000)
  });

  // Form data state for quote template
  const [quoteData, setQuoteData] = useState<QuoteData>({
    quoteTitle: "QUOTATION",
    quoteSubtitle: "Professional Service Proposal",
    quoteNumber: "QT-2024-" + Math.floor(Math.random() * 10000),
    preparedFor: {
      company: "Client Company Name",
      contactPerson: "Client Contact Person",
      address: "456 Client Avenue",
      cityStateZip: "Client City, State 67890",
      phone: "(555) 987-6543",
      email: "client@example.com"
    },
    preparedBy: {
      company: "Your Business Name",
      contactPerson: "Your Contact Person",
      address: "123 Business Street",
      cityStateZip: "Business City, State 12345",
      phone: "(555) 123-4567",
      email: "sales@yourbusiness.com"
    },
    date: new Date().toLocaleDateString(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    preparedByPerson: "Sales Representative",
    projectDescription: "We are pleased to provide you with the following quotation for professional services. This proposal outlines our understanding of your requirements and our recommended solution.",
    items: [
      { itemNumber: "001", description: "Consultation Services", quantity: "10", unit: "Hours", unitPrice: "$125.00", total: "$1,250.00" },
      { itemNumber: "002", description: "Software License", quantity: "5", unit: "Licenses", unitPrice: "$299.99", total: "$1,499.95" },
      { itemNumber: "003", description: "Installation & Setup", quantity: "1", unit: "Project", unitPrice: "$750.00", total: "$750.00" },
      { itemNumber: "004", description: "Training Session", quantity: "3", unit: "Sessions", unitPrice: "$200.00", total: "$600.00" }
    ],
    subtotal: "$4,099.95",
    discountLabel: "DISCOUNT (5%)",
    discountValue: "-$205.00",
    taxLabel: "TAX (8.25%)",
    taxValue: "$322.12",
    totalLabel: "TOTAL",
    totalValue: "$4,217.07",
    termsAndConditions: [
      "This quote is valid for 30 days",
      "50% deposit required to begin work",
      "Balance due upon completion",
      "Travel expenses not included"
    ],
    paymentSchedule: [
      "Deposit: $2,108.54 (50%)",
      "Final Payment: $2,108.53 (50%)"
    ],
    acceptanceMessage: "By signing below, you agree to the terms and conditions outlined in this quotation.",
    signatureLine: "Signature: _________________________________",
    printNameLine: "Print Name: _______________________________",
    titleLine: "Title: ____________________________________",
    dateLine: "Date: ____________________________________",
    companyLine: "Company: _________________________________",
    thankYouMessage: "Thank you for considering our services. We look forward to working with you!",
    quotePreparedBy: "Sales Department",
    validUntilDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
  });

  // Form data state for report template
  const [reportData, setReportData] = useState<ReportData>({
    reportTitle: "MONTHLY BUSINESS REPORT",
    reportingPeriod: new Date().toLocaleDateString() + " - " + new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString(),
    preparedBy: "Management Team",
    metrics: [
      { value: "$42,580", label: "Total Revenue", color: "blue" },
      { value: "$28,930", label: "Net Profit", color: "green" },
      { value: "$12,450", label: "Expenses", color: "yellow" },
      { value: "-3.4%", label: "Profit Margin", color: "red" }
    ],
    kpiTitle: "Key Performance Indicators (KPIs)",
    kpis: [
      "Sales growth: 5.6%",
      "Customer satisfaction: 92%",
      "Employee turnover: 8%"
    ],
    operationalHighlightsTitle: "Operational Highlights",
    operationalHighlights: [
      "Completed 12 major projects",
      "Launched new product line",
      "Expanded market reach by 15%"
    ],
    strategicInitiativesTitle: "Strategic Initiatives",
    strategicInitiatives: [
      "Increase marketing budget allocation to digital channels by 15%",
      "Invest in additional warehouse capacity to meet growing demand",
      "Enhance staff training programs to improve service quality"
    ]
  });

  // Handle invoice form changes
  const handleInvoiceChange = <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
    setInvoiceData(prev => ({ ...prev, [field]: value }));
  };

  // Handle invoice item changes
  const handleInvoiceItemChange = (index: number, field: string, value: string) => {
    setInvoiceData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  // Add invoice item
  const addInvoiceItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { itemNumber: "", description: "", quantity: "", unit: "", rate: "", amount: "" }]
    }));
  };

  // Remove invoice item
  const removeInvoiceItem = (index: number) => {
    setInvoiceData(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };

  // Handle delivery note form changes
  const handleDeliveryNoteChange = <K extends keyof DeliveryNoteData>(field: K, value: DeliveryNoteData[K]) => {
    setDeliveryNoteData(prev => ({ ...prev, [field]: value }));
  };

  // Handle delivery note item changes
  const handleDeliveryNoteItemChange = (index: number, field: string, value: string) => {
    setDeliveryNoteData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  // Add delivery note item
  const addDeliveryNoteItem = () => {
    setDeliveryNoteData(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: "", unit: "", delivered: "", remarks: "" }]
    }));
  };

  // Remove delivery note item
  const removeDeliveryNoteItem = (index: number) => {
    setDeliveryNoteData(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };

  // Handle order form changes
  const handleOrderFormChange = <K extends keyof OrderFormData>(field: K, value: OrderFormData[K]) => {
    setOrderFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle order form item changes
  const handleOrderFormItemChange = (index: number, field: string, value: string) => {
    setOrderFormData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  // Add order form item
  const addOrderFormItem = () => {
    setOrderFormData(prev => ({
      ...prev,
      items: [...prev.items, { itemNumber: "", description: "", quantity: "", unit: "", unitPrice: "", total: "" }]
    }));
  };

  // Remove order form item
  const removeOrderFormItem = (index: number) => {
    setOrderFormData(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };

  // Handle contract form changes
  const handleContractChange = <K extends keyof ContractData>(field: K, value: ContractData[K]) => {
    setContractData(prev => ({ ...prev, [field]: value }));
  };

  // Handle contract services changes
  const handleContractServicesChange = (index: number, value: string) => {
    setContractData(prev => {
      const newServices = [...prev.services];
      newServices[index] = value;
      return { ...prev, services: newServices };
    });
  };

  // Add contract service
  const addContractService = () => {
    setContractData(prev => ({
      ...prev,
      services: [...prev.services, ""]
    }));
  };

  // Remove contract service
  const removeContractService = (index: number) => {
    setContractData(prev => {
      const newServices = [...prev.services];
      newServices.splice(index, 1);
      return { ...prev, services: newServices };
    });
  };

  // Handle contract compensation changes
  const handleContractCompensationChange = (index: number, field: string, value: string) => {
    setContractData(prev => {
      const newCompensation = [...prev.compensation];
      newCompensation[index] = { ...newCompensation[index], [field]: value };
      return { ...prev, compensation: newCompensation };
    });
  };

  // Add contract compensation item
  const addContractCompensationItem = () => {
    setContractData(prev => ({
      ...prev,
      compensation: [...prev.compensation, { description: "", value: "" }]
    }));
  };

  // Remove contract compensation item
  const removeContractCompensationItem = (index: number) => {
    setContractData(prev => {
      const newCompensation = [...prev.compensation];
      newCompensation.splice(index, 1);
      return { ...prev, compensation: newCompensation };
    });
  };

  // Handle receipt form changes
  const handleReceiptChange = <K extends keyof ReceiptData>(field: K, value: ReceiptData[K]) => {
    setReceiptData(prev => ({ ...prev, [field]: value }));
  };

  // Handle receipt item changes
  const handleReceiptItemChange = (index: number, field: string, value: string) => {
    setReceiptData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  // Add receipt item
  const addReceiptItem = () => {
    setReceiptData(prev => ({
      ...prev,
      items: [...prev.items, { name: "", amount: "" }]
    }));
  };

  // Remove receipt item
  const removeReceiptItem = (index: number) => {
    setReceiptData(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };

  // Handle notice form changes
  const handleNoticeChange = <K extends keyof NoticeData>(field: K, value: NoticeData[K]) => {
    setNoticeData(prev => ({ ...prev, [field]: value }));
  };

  // Handle notice key information changes
  const handleNoticeKeyInfoChange = (index: number, value: string) => {
    setNoticeData(prev => {
      const newKeyInfo = [...prev.keyInformation];
      newKeyInfo[index] = value;
      return { ...prev, keyInformation: newKeyInfo };
    });
  };

  // Add notice key information item
  const addNoticeKeyInfoItem = () => {
    setNoticeData(prev => ({
      ...prev,
      keyInformation: [...prev.keyInformation, ""]
    }));
  };

  // Remove notice key information item
  const removeNoticeKeyInfoItem = (index: number) => {
    setNoticeData(prev => {
      const newKeyInfo = [...prev.keyInformation];
      newKeyInfo.splice(index, 1);
      return { ...prev, keyInformation: newKeyInfo };
    });
  };

  // Handle quote form changes
  const handleQuoteChange = <K extends keyof QuoteData>(field: K, value: QuoteData[K]) => {
    setQuoteData(prev => ({ ...prev, [field]: value }));
  };

  // Handle quote preparedFor changes
  const handleQuotePreparedForChange = <K extends keyof QuoteData['preparedFor']>(field: K, value: QuoteData['preparedFor'][K]) => {
    setQuoteData(prev => ({
      ...prev,
      preparedFor: { ...prev.preparedFor, [field]: value }
    }));
  };

  // Handle quote preparedBy changes
  const handleQuotePreparedByChange = <K extends keyof QuoteData['preparedBy']>(field: K, value: QuoteData['preparedBy'][K]) => {
    setQuoteData(prev => ({
      ...prev,
      preparedBy: { ...prev.preparedBy, [field]: value }
    }));
  };

  // Handle quote item changes
  const handleQuoteItemChange = (index: number, field: string, value: string) => {
    setQuoteData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  // Add quote item
  const addQuoteItem = () => {
    setQuoteData(prev => ({
      ...prev,
      items: [...prev.items, { itemNumber: "", description: "", quantity: "", unit: "", unitPrice: "", total: "" }]
    }));
  };

  // Remove quote item
  const removeQuoteItem = (index: number) => {
    setQuoteData(prev => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });
  };

  // Handle quote terms and conditions changes
  const handleQuoteTermsChange = (index: number, value: string) => {
    setQuoteData(prev => {
      const newTerms = [...prev.termsAndConditions];
      newTerms[index] = value;
      return { ...prev, termsAndConditions: newTerms };
    });
  };

  // Add quote terms and conditions item
  const addQuoteTermsItem = () => {
    setQuoteData(prev => ({
      ...prev,
      termsAndConditions: [...prev.termsAndConditions, ""]
    }));
  };

  // Remove quote terms and conditions item
  const removeQuoteTermsItem = (index: number) => {
    setQuoteData(prev => {
      const newTerms = [...prev.termsAndConditions];
      newTerms.splice(index, 1);
      return { ...prev, termsAndConditions: newTerms };
    });
  };

  // Handle quote payment schedule changes
  const handleQuotePaymentScheduleChange = (index: number, value: string) => {
    setQuoteData(prev => {
      const newSchedule = [...prev.paymentSchedule];
      newSchedule[index] = value;
      return { ...prev, paymentSchedule: newSchedule };
    });
  };

  // Add quote payment schedule item
  const addQuotePaymentScheduleItem = () => {
    setQuoteData(prev => ({
      ...prev,
      paymentSchedule: [...prev.paymentSchedule, ""]
    }));
  };

  // Remove quote payment schedule item
  const removeQuotePaymentScheduleItem = (index: number) => {
    setQuoteData(prev => {
      const newSchedule = [...prev.paymentSchedule];
      newSchedule.splice(index, 1);
      return { ...prev, paymentSchedule: newSchedule };
    });
  };

  // Handle report form changes
  const handleReportChange = <K extends keyof ReportData>(field: K, value: ReportData[K]) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  // Handle report metric changes
  const handleReportMetricChange = (index: number, field: string, value: string) => {
    setReportData(prev => {
      const newMetrics = [...prev.metrics];
      newMetrics[index] = { ...newMetrics[index], [field]: value };
      return { ...prev, metrics: newMetrics };
    });
  };

  // Add report metric
  const addReportMetric = () => {
    setReportData(prev => ({
      ...prev,
      metrics: [...prev.metrics, { value: "", label: "", color: "blue" }]
    }));
  };

  // Remove report metric
  const removeReportMetric = (index: number) => {
    setReportData(prev => {
      const newMetrics = [...prev.metrics];
      newMetrics.splice(index, 1);
      return { ...prev, metrics: newMetrics };
    });
  };

  // Handle report KPI changes
  const handleReportKpiChange = (index: number, value: string) => {
    setReportData(prev => {
      const newKpis = [...prev.kpis];
      newKpis[index] = value;
      return { ...prev, kpis: newKpis };
    });
  };

  // Add report KPI
  const addReportKpi = () => {
    setReportData(prev => ({
      ...prev,
      kpis: [...prev.kpis, ""]
    }));
  };

  // Remove report KPI
  const removeReportKpi = (index: number) => {
    setReportData(prev => {
      const newKpis = [...prev.kpis];
      newKpis.splice(index, 1);
      return { ...prev, kpis: newKpis };
    });
  };

  // Handle report operational highlight changes
  const handleReportOperationalHighlightChange = (index: number, value: string) => {
    setReportData(prev => {
      const newHighlights = [...prev.operationalHighlights];
      newHighlights[index] = value;
      return { ...prev, operationalHighlights: newHighlights };
    });
  };

  // Add report operational highlight
  const addReportOperationalHighlight = () => {
    setReportData(prev => ({
      ...prev,
      operationalHighlights: [...prev.operationalHighlights, ""]
    }));
  };

  // Remove report operational highlight
  const removeReportOperationalHighlight = (index: number) => {
    setReportData(prev => {
      const newHighlights = [...prev.operationalHighlights];
      newHighlights.splice(index, 1);
      return { ...prev, operationalHighlights: newHighlights };
    });
  };

  // Handle report strategic initiative changes
  const handleReportStrategicInitiativeChange = (index: number, value: string) => {
    setReportData(prev => {
      const newInitiatives = [...prev.strategicInitiatives];
      newInitiatives[index] = value;
      return { ...prev, strategicInitiatives: newInitiatives };
    });
  };

  // Add report strategic initiative
  const addReportStrategicInitiative = () => {
    setReportData(prev => ({
      ...prev,
      strategicInitiatives: [...prev.strategicInitiatives, ""]
    }));
  };

  // Remove report strategic initiative
  const removeReportStrategicInitiative = (index: number) => {
    setReportData(prev => {
      const newInitiatives = [...prev.strategicInitiatives];
      newInitiatives.splice(index, 1);
      return { ...prev, strategicInitiatives: newInitiatives };
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
                <Input 
                  className="font-semibold text-gray-700 w-full text-center" 
                  value={deliveryNoteData.businessName} 
                  onChange={(e) => handleDeliveryNoteChange('businessName', e.target.value)} 
                />
                <Input 
                  className="text-gray-600 w-full text-center" 
                  value={deliveryNoteData.businessAddress} 
                  onChange={(e) => handleDeliveryNoteChange('businessAddress', e.target.value)} 
                />
                <div className="text-gray-600 text-center">
                  Phone: 
                  <Input 
                    className="inline-block w-40 ml-1" 
                    value={deliveryNoteData.businessPhone} 
                    onChange={(e) => handleDeliveryNoteChange('businessPhone', e.target.value)} 
                  />
                  | Email: 
                  <Input 
                    className="inline-block w-40 ml-1" 
                    value={deliveryNoteData.businessEmail} 
                    onChange={(e) => handleDeliveryNoteChange('businessEmail', e.target.value)} 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-300 p-4 rounded">
                <h3 className="font-bold text-gray-800 mb-2">TO:</h3>
                <div className="space-y-1 text-sm">
                  <Input 
                    className="font-medium w-full" 
                    value={deliveryNoteData.customerName} 
                    onChange={(e) => handleDeliveryNoteChange('customerName', e.target.value)} 
                  />
                  <Textarea 
                    className="w-full" 
                    value={deliveryNoteData.customerAddress} 
                    onChange={(e) => handleDeliveryNoteChange('customerAddress', e.target.value)} 
                  />
                  <div>
                    Phone: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={deliveryNoteData.customerPhone} 
                      onChange={(e) => handleDeliveryNoteChange('customerPhone', e.target.value)} 
                    />
                  </div>
                  <div>
                    Email: 
                    <Input 
                      className="inline-block w-40 ml-1" 
                      value={deliveryNoteData.customerEmail} 
                      onChange={(e) => handleDeliveryNoteChange('customerEmail', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-300 p-4 rounded">
                <h3 className="font-bold text-gray-800 mb-2">DELIVERY DETAILS:</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Delivery Note #:</span>
                    <Input 
                      className="w-24 text-right" 
                      value={deliveryNoteData.deliveryNoteNumber} 
                      onChange={(e) => handleDeliveryNoteChange('deliveryNoteNumber', e.target.value)} 
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <Input 
                      className="w-32 text-right" 
                      value={deliveryNoteData.deliveryDate} 
                      onChange={(e) => handleDeliveryNoteChange('deliveryDate', e.target.value)} 
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Delivery Date:</span>
                    <Input 
                      className="w-24 text-right" 
                      value={deliveryNoteData.deliveryDetailsDate} 
                      onChange={(e) => handleDeliveryNoteChange('deliveryDetailsDate', e.target.value)} 
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Vehicle #:</span>
                    <Input 
                      className="w-24 text-right" 
                      value={deliveryNoteData.vehicleNumber} 
                      onChange={(e) => handleDeliveryNoteChange('vehicleNumber', e.target.value)} 
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Driver:</span>
                    <Input 
                      className="w-24 text-right" 
                      value={deliveryNoteData.driverName} 
                      onChange={(e) => handleDeliveryNoteChange('driverName', e.target.value)} 
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
                  {deliveryNoteData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <Input 
                          value={item.description} 
                          onChange={(e) => handleDeliveryNoteItemChange(index, 'description', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="text-center w-16" 
                          value={item.quantity} 
                          onChange={(e) => handleDeliveryNoteItemChange(index, 'quantity', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="text-center w-16" 
                          value={item.unit} 
                          onChange={(e) => handleDeliveryNoteItemChange(index, 'unit', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="text-center w-16" 
                          value={item.delivered} 
                          onChange={(e) => handleDeliveryNoteItemChange(index, 'delivered', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                        <Input 
                          className="text-right" 
                          value={item.remarks} 
                          onChange={(e) => handleDeliveryNoteItemChange(index, 'remarks', e.target.value)} 
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
                onClick={addDeliveryNoteItem}
              >
                Add Item
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">DELIVERY NOTES:</h3>
                <Textarea 
                  className="border border-gray-300 h-24 p-2 text-sm w-full" 
                  value={deliveryNoteData.deliveryNotes} 
                  onChange={(e) => handleDeliveryNoteChange('deliveryNotes', e.target.value)} 
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-sm">Total Items:</span>
                  <Input 
                    className="w-16 text-right" 
                    value={deliveryNoteData.totalItems} 
                    onChange={(e) => handleDeliveryNoteChange('totalItems', e.target.value)} 
                  />
                </div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-sm">Total Quantity:</span>
                  <Input 
                    className="w-24 text-right" 
                    value={deliveryNoteData.totalQuantity} 
                    onChange={(e) => handleDeliveryNoteChange('totalQuantity', e.target.value)} 
                  />
                </div>
                <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-300">
                  <span className="text-sm">Total Packages:</span>
                  <Input 
                    className="w-16 text-right" 
                    value={deliveryNoteData.totalPackages} 
                    onChange={(e) => handleDeliveryNoteChange('totalPackages', e.target.value)} 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mt-12 text-sm">
                  <p>Prepared By</p>
                  <p className="mt-1">Name: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={deliveryNoteData.preparedByName} 
                      onChange={(e) => handleDeliveryNoteChange('preparedByName', e.target.value)} 
                    />
                  </p>
                  <p>Date: 
                    <Input 
                      className="inline-block w-24 ml-1" 
                      value={deliveryNoteData.preparedByDate} 
                      onChange={(e) => handleDeliveryNoteChange('preparedByDate', e.target.value)} 
                    />
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mt-12 text-sm">
                  <p>Driver Signature</p>
                  <p className="mt-1">Name: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={deliveryNoteData.driverSignatureName} 
                      onChange={(e) => handleDeliveryNoteChange('driverSignatureName', e.target.value)} 
                    />
                  </p>
                  <p>Date: 
                    <Input 
                      className="inline-block w-24 ml-1" 
                      value={deliveryNoteData.driverSignatureDate} 
                      onChange={(e) => handleDeliveryNoteChange('driverSignatureDate', e.target.value)} 
                    />
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-400 pt-2 mt-12 text-sm">
                  <p>Received By</p>
                  <p className="mt-1">Name: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={deliveryNoteData.receivedByName} 
                      onChange={(e) => handleDeliveryNoteChange('receivedByName', e.target.value)} 
                    />
                  </p>
                  <p>Date: 
                    <Input 
                      className="inline-block w-24 ml-1" 
                      value={deliveryNoteData.receivedByDate} 
                      onChange={(e) => handleDeliveryNoteChange('receivedByDate', e.target.value)} 
                    />
                  </p>
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
                    className="text-xl font-bold w-full text-right" 
                    value={orderFormData.orderNumber} 
                    onChange={(e) => handleOrderFormChange('orderNumber', e.target.value)} 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">VENDOR:</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <Input 
                    className="font-bold w-full" 
                    value={orderFormData.supplierName} 
                    onChange={(e) => handleOrderFormChange('supplierName', e.target.value)} 
                  />
                  <Input 
                    className="w-full" 
                    value={orderFormData.supplierAddress} 
                    onChange={(e) => handleOrderFormChange('supplierAddress', e.target.value)} 
                  />
                  <div>
                    Phone: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={orderFormData.supplierPhone} 
                      onChange={(e) => handleOrderFormChange('supplierPhone', e.target.value)} 
                    />
                  </div>
                  <div>
                    Contact: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={orderFormData.supplierContact} 
                      onChange={(e) => handleOrderFormChange('supplierContact', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">SHIP TO:</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <Input 
                    className="font-bold w-full" 
                    value={orderFormData.businessName} 
                    onChange={(e) => handleOrderFormChange('businessName', e.target.value)} 
                  />
                  <Input 
                    className="w-full" 
                    value={orderFormData.businessAddress} 
                    onChange={(e) => handleOrderFormChange('businessAddress', e.target.value)} 
                  />
                  <div>
                    Phone: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={orderFormData.businessPhone} 
                      onChange={(e) => handleOrderFormChange('businessPhone', e.target.value)} 
                    />
                  </div>
                  <div>
                    Contact: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={orderFormData.businessContact} 
                      onChange={(e) => handleOrderFormChange('businessContact', e.target.value)} 
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
                  value={orderFormData.orderDate} 
                  onChange={(e) => handleOrderFormChange('orderDate', e.target.value)} 
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">REQUIRED BY</p>
                <Input 
                  className="font-medium w-full" 
                  value={orderFormData.requiredBy} 
                  onChange={(e) => handleOrderFormChange('requiredBy', e.target.value)} 
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">PAYMENT TERMS</p>
                <Input 
                  className="font-medium w-full" 
                  value={orderFormData.paymentTerms} 
                  onChange={(e) => handleOrderFormChange('paymentTerms', e.target.value)} 
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">SHIP VIA</p>
                <Input 
                  className="font-medium w-full" 
                  value={orderFormData.shipVia} 
                  onChange={(e) => handleOrderFormChange('shipVia', e.target.value)} 
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
                  {orderFormData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <Input 
                          value={item.itemNumber} 
                          onChange={(e) => handleOrderFormItemChange(index, 'itemNumber', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <Input 
                          value={item.description} 
                          onChange={(e) => handleOrderFormItemChange(index, 'description', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="text-center w-12" 
                          value={item.quantity} 
                          onChange={(e) => handleOrderFormItemChange(index, 'quantity', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="text-center w-12" 
                          value={item.unit} 
                          onChange={(e) => handleOrderFormItemChange(index, 'unit', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                        <Input 
                          className="text-right w-20" 
                          value={item.unitPrice} 
                          onChange={(e) => handleOrderFormItemChange(index, 'unitPrice', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                        <Input 
                          className="text-right w-20" 
                          value={item.total} 
                          onChange={(e) => handleOrderFormItemChange(index, 'total', e.target.value)} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">SUBTOTAL</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">
                      <Input 
                        className="text-right w-20" 
                        value={orderFormData.subtotal} 
                        onChange={(e) => handleOrderFormChange('subtotal', e.target.value)} 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">TAX (8.5%)</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">
                      <Input 
                        className="text-right w-20" 
                        value={orderFormData.tax} 
                        onChange={(e) => handleOrderFormChange('tax', e.target.value)} 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">SHIPPING</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">
                      <Input 
                        className="text-right w-20" 
                        value={orderFormData.shipping} 
                        onChange={(e) => handleOrderFormChange('shipping', e.target.value)} 
                      />
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-lg">TOTAL</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-lg">
                      <Input 
                        className="text-right w-20 font-bold" 
                        value={orderFormData.total} 
                        onChange={(e) => handleOrderFormChange('total', e.target.value)} 
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={addOrderFormItem}
              >
                Add Item
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">SPECIAL INSTRUCTIONS:</h3>
                <Textarea 
                  className="border border-gray-300 h-20 p-2 text-sm w-full" 
                  value={orderFormData.specialInstructions} 
                  onChange={(e) => handleOrderFormChange('specialInstructions', e.target.value)} 
                />
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">APPROVAL:</h3>
                <Textarea 
                  className="border border-gray-300 h-20 p-2 text-sm w-full" 
                  value={orderFormData.approval} 
                  onChange={(e) => handleOrderFormChange('approval', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="pt-2 text-sm">
                  <p className="font-bold">REQUESTED BY</p>
                  <p className="mt-8">
                    <Input 
                      className="w-48 text-center" 
                      value={orderFormData.requestedByName} 
                      onChange={(e) => handleOrderFormChange('requestedByName', e.target.value)} 
                    />
                  </p>
                  <p>
                    <Input 
                      className="w-48 text-center" 
                      value={orderFormData.requestedByTitle} 
                      onChange={(e) => handleOrderFormChange('requestedByTitle', e.target.value)} 
                      placeholder="Name & Title"
                    />
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="pt-2 text-sm">
                  <p className="font-bold">APPROVED BY</p>
                  <p className="mt-8">
                    <Input 
                      className="w-48 text-center" 
                      value={orderFormData.approvedByName} 
                      onChange={(e) => handleOrderFormChange('approvedByName', e.target.value)} 
                    />
                  </p>
                  <p>
                    <Input 
                      className="w-48 text-center" 
                      value={orderFormData.approvedByTitle} 
                      onChange={(e) => handleOrderFormChange('approvedByTitle', e.target.value)} 
                      placeholder="Name & Title"
                    />
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="pt-2 text-sm">
                  <p className="font-bold">DATE</p>
                  <p className="mt-8">
                    <Input 
                      className="w-48 text-center" 
                      value={orderFormData.approvalDate} 
                      onChange={(e) => handleOrderFormChange('approvalDate', e.target.value)} 
                    />
                  </p>
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
              <p className="text-lg mt-4">This Agreement is made and entered into on 
                <Input 
                  className="inline-block w-48" 
                  value={contractData.agreementDate} 
                  onChange={(e) => handleContractChange('agreementDate', e.target.value)} 
                />
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">PARTIES TO THE AGREEMENT</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-300 p-4 rounded">
                  <h3 className="font-bold text-gray-700 mb-2">CLIENT:</h3>
                  <Input 
                    className="font-semibold w-full mb-1" 
                    value={contractData.clientName} 
                    onChange={(e) => handleContractChange('clientName', e.target.value)} 
                  />
                  <div>Address: 
                    <Input 
                      className="inline-block w-48 ml-1" 
                      value={contractData.clientAddress} 
                      onChange={(e) => handleContractChange('clientAddress', e.target.value)} 
                    />
                  </div>
                  <Input 
                    className="w-full mb-1" 
                    value={contractData.clientCityStateZip} 
                    onChange={(e) => handleContractChange('clientCityStateZip', e.target.value)} 
                  />
                  <div>Contact: 
                    <Input 
                      className="inline-block w-48 ml-1" 
                      value={contractData.clientContact} 
                      onChange={(e) => handleContractChange('clientContact', e.target.value)} 
                    />
                  </div>
                  <div>Phone: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={contractData.clientPhone} 
                      onChange={(e) => handleContractChange('clientPhone', e.target.value)} 
                    />
                  </div>
                  <div>Email: 
                    <Input 
                      className="inline-block w-48 ml-1" 
                      value={contractData.clientEmail} 
                      onChange={(e) => handleContractChange('clientEmail', e.target.value)} 
                    />
                  </div>
                </div>
                <div className="border border-gray-300 p-4 rounded">
                  <h3 className="font-bold text-gray-700 mb-2">SERVICE PROVIDER:</h3>
                  <Input 
                    className="font-semibold w-full mb-1" 
                    value={contractData.serviceProviderName} 
                    onChange={(e) => handleContractChange('serviceProviderName', e.target.value)} 
                  />
                  <div>Address: 
                    <Input 
                      className="inline-block w-48 ml-1" 
                      value={contractData.serviceProviderAddress} 
                      onChange={(e) => handleContractChange('serviceProviderAddress', e.target.value)} 
                    />
                  </div>
                  <Input 
                    className="w-full mb-1" 
                    value={contractData.serviceProviderCityStateZip} 
                    onChange={(e) => handleContractChange('serviceProviderCityStateZip', e.target.value)} 
                  />
                  <div>Contact: 
                    <Input 
                      className="inline-block w-48 ml-1" 
                      value={contractData.serviceProviderContact} 
                      onChange={(e) => handleContractChange('serviceProviderContact', e.target.value)} 
                    />
                  </div>
                  <div>Phone: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={contractData.serviceProviderPhone} 
                      onChange={(e) => handleContractChange('serviceProviderPhone', e.target.value)} 
                    />
                  </div>
                  <div>Email: 
                    <Input 
                      className="inline-block w-48 ml-1" 
                      value={contractData.serviceProviderEmail} 
                      onChange={(e) => handleContractChange('serviceProviderEmail', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">1. SERVICES PROVIDED</h2>
              <div className="border border-gray-300 p-4 rounded">
                <p className="mb-3">The Service Provider agrees to perform the following services for the Client:</p>
                <ul className="list-disc pl-6 space-y-2">
                  {contractData.services.map((service, index) => (
                    <li key={index}>
                      <Input 
                        className="w-full" 
                        value={service} 
                        onChange={(e) => handleContractServicesChange(index, e.target.value)} 
                      />
                    </li>
                  ))}
                </ul>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="mt-2" 
                  onClick={addContractService}
                >
                  Add Service
                </Button>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">2. TERM OF AGREEMENT</h2>
              <div className="border border-gray-300 p-4 rounded">
                <p>This Agreement shall commence on 
                  <Input 
                    className="inline-block w-32 font-semibold" 
                    value={contractData.termStartDate} 
                    onChange={(e) => handleContractChange('termStartDate', e.target.value)} 
                  /> 
                  and continue for a period of 
                  <Input 
                    className="inline-block w-24 font-semibold" 
                    value={contractData.termDuration} 
                    onChange={(e) => handleContractChange('termDuration', e.target.value)} 
                  />, unless terminated earlier in accordance with the termination clause.
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">3. COMPENSATION</h2>
              <div className="border border-gray-300 p-4 rounded">
                <p className="mb-3">In consideration for the services provided, the Client agrees to pay the Service Provider as follows:</p>
                <ul className="list-disc pl-6 space-y-2 mb-3">
                  {contractData.compensation.map((item, index) => (
                    <li key={index}>
                      <Input 
                        className="inline-block w-48" 
                        value={item.description} 
                        onChange={(e) => handleContractCompensationChange(index, 'description', e.target.value)} 
                      />: 
                      <Input 
                        className="inline-block w-24 ml-2" 
                        value={item.value} 
                        onChange={(e) => handleContractCompensationChange(index, 'value', e.target.value)} 
                      />
                    </li>
                  ))}
                </ul>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="mb-3" 
                  onClick={addContractCompensationItem}
                >
                  Add Compensation Item
                </Button>
                <div>
                  Additional services not covered in Section 1 will be billed separately at 
                  <Input 
                    className="inline-block w-24" 
                    value={contractData.additionalServicesRate} 
                    onChange={(e) => handleContractChange('additionalServicesRate', e.target.value)} 
                  />.
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">4. WARRANTIES AND REPRESENTATIONS</h2>
              <div className="border border-gray-300 p-4 rounded">
                <Textarea 
                  className="w-full" 
                  value={contractData.warranties} 
                  onChange={(e) => handleContractChange('warranties', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">5. TERMINATION</h2>
              <div className="border border-gray-300 p-4 rounded">
                <Textarea 
                  className="w-full" 
                  value={contractData.termination} 
                  onChange={(e) => handleContractChange('termination', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">6. GOVERNING LAW</h2>
              <div className="border border-gray-300 p-4 rounded">
                <p>This Agreement shall be governed by and construed in accordance with the laws of 
                  <Input 
                    className="inline-block w-32 font-semibold" 
                    value={contractData.governingLaw} 
                    onChange={(e) => handleContractChange('governingLaw', e.target.value)} 
                  />.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="font-bold text-gray-800 mb-4">CLIENT ACKNOWLEDGMENT</h3>
                <div className="border-t border-gray-400 pt-4">
                  <div className="mb-2">Signature: 
                    <Input 
                      className="inline-block w-64" 
                      value={contractData.clientSignature} 
                      onChange={(e) => handleContractChange('clientSignature', e.target.value)} 
                    />
                  </div>
                  <div className="mb-2">Print Name: 
                    <Input 
                      className="inline-block w-64" 
                      value={contractData.clientPrintName} 
                      onChange={(e) => handleContractChange('clientPrintName', e.target.value)} 
                    />
                  </div>
                  <div className="mb-2">Title: 
                    <Input 
                      className="inline-block w-64" 
                      value={contractData.clientTitle} 
                      onChange={(e) => handleContractChange('clientTitle', e.target.value)} 
                    />
                  </div>
                  <div>Date: 
                    <Input 
                      className="inline-block w-64" 
                      value={contractData.clientSignatureDate} 
                      onChange={(e) => handleContractChange('clientSignatureDate', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-4">SERVICE PROVIDER ACKNOWLEDGMENT</h3>
                <div className="border-t border-gray-400 pt-4">
                  <div className="mb-2">Signature: 
                    <Input 
                      className="inline-block w-64" 
                      value={contractData.serviceProviderSignature} 
                      onChange={(e) => handleContractChange('serviceProviderSignature', e.target.value)} 
                    />
                  </div>
                  <div className="mb-2">Print Name: 
                    <Input 
                      className="inline-block w-64" 
                      value={contractData.serviceProviderPrintName} 
                      onChange={(e) => handleContractChange('serviceProviderPrintName', e.target.value)} 
                    />
                  </div>
                  <div className="mb-2">Title: 
                    <Input 
                      className="inline-block w-64" 
                      value={contractData.serviceProviderTitle} 
                      onChange={(e) => handleContractChange('serviceProviderTitle', e.target.value)} 
                    />
                  </div>
                  <div>Date: 
                    <Input 
                      className="inline-block w-64" 
                      value={contractData.serviceProviderSignatureDate} 
                      onChange={(e) => handleContractChange('serviceProviderSignatureDate', e.target.value)} 
                    />
                  </div>
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
                <Input 
                  className="text-gray-600 mt-1 w-48" 
                  value={invoiceData.invoiceNumber} 
                  onChange={(e) => handleInvoiceChange('invoiceNumber', e.target.value)} 
                />
              </div>
              <div className="text-right">
                <div className="bg-green-50 border-2 border-green-700 p-3 rounded">
                  <p className="text-green-700 font-bold">AMOUNT DUE</p>
                  <Input 
                    className="text-2xl font-bold text-green-800 w-32 text-right" 
                    value={invoiceData.balance} 
                    onChange={(e) => handleInvoiceChange('balance', e.target.value)} 
                  />
                  <div className="text-sm text-green-700">
                    Due: 
                    <Input 
                      className="inline-block w-24 ml-1" 
                      value={invoiceData.dueDate} 
                      onChange={(e) => handleInvoiceChange('dueDate', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="font-bold text-gray-800 mb-2">FROM:</p>
                <div className="text-sm">
                  <Input 
                    className="font-bold text-lg" 
                    value={invoiceData.businessName} 
                    onChange={(e) => handleInvoiceChange('businessName', e.target.value)} 
                  />
                  <Input 
                    value={invoiceData.businessAddress} 
                    onChange={(e) => handleInvoiceChange('businessAddress', e.target.value)} 
                  />
                  <div>
                    Phone: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={invoiceData.businessPhone} 
                      onChange={(e) => handleInvoiceChange('businessPhone', e.target.value)} 
                    />
                  </div>
                  <div>
                    Email: 
                    <Input 
                      className="inline-block w-40 ml-1" 
                      value={invoiceData.businessEmail} 
                      onChange={(e) => handleInvoiceChange('businessEmail', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-2">BILL TO:</p>
                <div className="text-sm">
                  <Input 
                    className="font-bold text-lg" 
                    value={invoiceData.clientName} 
                    onChange={(e) => handleInvoiceChange('clientName', e.target.value)} 
                  />
                  <Input 
                    value={invoiceData.clientAddress} 
                    onChange={(e) => handleInvoiceChange('clientAddress', e.target.value)} 
                  />
                  <Input 
                    value={invoiceData.clientCity} 
                    onChange={(e) => handleInvoiceChange('clientCity', e.target.value)} 
                  />
                  <div>
                    Phone: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={invoiceData.clientPhone} 
                      onChange={(e) => handleInvoiceChange('clientPhone', e.target.value)} 
                    />
                  </div>
                  <div>
                    Email: 
                    <Input 
                      className="inline-block w-40 ml-1" 
                      value={invoiceData.clientEmail} 
                      onChange={(e) => handleInvoiceChange('clientEmail', e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8 bg-gray-50 p-3 rounded border">
              <div>
                <p className="text-xs text-gray-500">INVOICE DATE</p>
                <Input 
                  className="font-medium w-full" 
                  value={invoiceData.invoiceDate} 
                  onChange={(e) => handleInvoiceChange('invoiceDate', e.target.value)} 
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">DUE DATE</p>
                <Input 
                  className="font-medium w-full" 
                  value={invoiceData.dueDate} 
                  onChange={(e) => handleInvoiceChange('dueDate', e.target.value)} 
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">TERMS</p>
                <Input 
                  className="font-medium w-full" 
                  value={invoiceData.terms} 
                  onChange={(e) => handleInvoiceChange('terms', e.target.value)} 
                />
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
                    <th className="border border-gray-300 px-3 py-2 text-center text-sm font-bold">Unit</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">Rate</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-sm font-bold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <Input 
                          value={item.itemNumber} 
                          onChange={(e) => handleInvoiceItemChange(index, 'itemNumber', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <Input 
                          value={item.description} 
                          onChange={(e) => handleInvoiceItemChange(index, 'description', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="text-center" 
                          value={item.quantity} 
                          onChange={(e) => handleInvoiceItemChange(index, 'quantity', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="text-center" 
                          value={item.unit} 
                          onChange={(e) => handleInvoiceItemChange(index, 'unit', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                        <Input 
                          className="text-right" 
                          value={item.rate} 
                          onChange={(e) => handleInvoiceItemChange(index, 'rate', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                        <Input 
                          className="text-right" 
                          value={item.amount} 
                          onChange={(e) => handleInvoiceItemChange(index, 'amount', e.target.value)} 
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
                onClick={addInvoiceItem}
              >
                Add Item
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">NOTES:</h3>
                <Textarea 
                  className="border border-gray-300 p-3 rounded text-sm h-24" 
                  value={invoiceData.notes} 
                  onChange={(e) => handleInvoiceChange('notes', e.target.value)} 
                />
                <div className="mt-4">
                  <p className="text-xs text-gray-500">PAYMENT OPTIONS:</p>
                  <Input 
                    className="text-sm w-full" 
                    value={invoiceData.paymentOptions} 
                    onChange={(e) => handleInvoiceChange('paymentOptions', e.target.value)} 
                  />
                </div>
              </div>
              
              <div>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="text-right py-1 text-sm">Subtotal:</td>
                      <td className="text-right py-1 text-sm w-24">
                        <Input 
                          className="text-right w-full" 
                          value={invoiceData.subtotal} 
                          onChange={(e) => handleInvoiceChange('subtotal', e.target.value)} 
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right py-1 text-sm">Discount:</td>
                      <td className="text-right py-1 text-sm">
                        <Input 
                          className="text-right w-full" 
                          value={invoiceData.discount} 
                          onChange={(e) => handleInvoiceChange('discount', e.target.value)} 
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right py-1 text-sm">Tax:</td>
                      <td className="text-right py-1 text-sm">
                        <Input 
                          className="text-right w-full" 
                          value={invoiceData.tax} 
                          onChange={(e) => handleInvoiceChange('tax', e.target.value)} 
                        />
                      </td>
                    </tr>
                    <tr className="border-t border-gray-300">
                      <td className="text-right py-2 font-bold text-lg">TOTAL:</td>
                      <td className="text-right py-2 font-bold text-lg text-green-700">
                        <Input 
                          className="text-right w-full font-bold text-green-700" 
                          value={invoiceData.total} 
                          onChange={(e) => handleInvoiceChange('total', e.target.value)} 
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-right py-1 text-sm">Amount Paid:</td>
                      <td className="text-right py-1 text-sm">
                        <Input 
                          className="text-right w-full" 
                          value={invoiceData.amountPaid} 
                          onChange={(e) => handleInvoiceChange('amountPaid', e.target.value)} 
                        />
                      </td>
                    </tr>
                    <tr className="border-t border-gray-300 bg-green-50">
                      <td className="text-right py-2 font-bold">AMOUNT DUE:</td>
                      <td className="text-right py-2 font-bold text-green-700">
                        <Input 
                          className="text-right w-full font-bold text-green-700" 
                          value={invoiceData.balance} 
                          onChange={(e) => handleInvoiceChange('balance', e.target.value)} 
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-gray-300 text-center">
              <p className="text-sm text-gray-600">Thank you for your business!</p>
              <p className="text-sm text-gray-600 mt-1">Please make checks payable to {invoiceData.businessName}</p>
            </div>
          </div>
        );
      case "receipt":
        return (
          <div className="p-6 max-w-md mx-auto bg-white font-mono">
            <div className="text-center border-b-2 border-gray-800 pb-3 mb-3">
              <Input 
                className="text-2xl font-bold w-full text-center" 
                value={receiptData.businessName} 
                onChange={(e) => handleReceiptChange('businessName', e.target.value)} 
              />
              <Input 
                className="text-sm w-full text-center" 
                value={receiptData.businessAddress} 
                onChange={(e) => handleReceiptChange('businessAddress', e.target.value)} 
              />
              <div className="text-sm text-center">
                Phone: 
                <Input 
                  className="inline-block w-32 ml-1" 
                  value={receiptData.businessPhone} 
                  onChange={(e) => handleReceiptChange('businessPhone', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="inline-block border-2 border-gray-800 px-4 py-1">
                <p className="font-bold">OFFICIAL RECEIPT</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div>
                <p>Receipt #: 
                  <Input 
                    className="font-bold inline-block w-32" 
                    value={receiptData.receiptNumber} 
                    onChange={(e) => handleReceiptChange('receiptNumber', e.target.value)} 
                  />
                </p>
              </div>
              <div className="text-right">
                <p>Date: 
                  <Input 
                    className="inline-block w-24 text-right" 
                    value={receiptData.date} 
                    onChange={(e) => handleReceiptChange('date', e.target.value)} 
                  />
                </p>
              </div>
              <div>
                <p>Time: 
                  <Input 
                    className="inline-block w-20" 
                    value={receiptData.time} 
                    onChange={(e) => handleReceiptChange('time', e.target.value)} 
                  />
                </p>
              </div>
              <div className="text-right">
                <p>Cashier: 
                  <Input 
                    className="inline-block w-20" 
                    value={receiptData.cashier} 
                    onChange={(e) => handleReceiptChange('cashier', e.target.value)} 
                  />
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="border-t border-b border-gray-800 py-1">
                <div className="flex justify-between text-sm">
                  <span className="font-bold">ITEM</span>
                  <span className="font-bold">AMOUNT</span>
                </div>
              </div>
              {receiptData.items.map((item, index) => (
                <div key={index} className="py-1 border-b border-gray-300">
                  <div className="flex justify-between text-sm">
                    <Input 
                      className="w-32" 
                      value={item.name} 
                      onChange={(e) => handleReceiptItemChange(index, 'name', e.target.value)} 
                    />
                    <Input 
                      className="w-16 text-right" 
                      value={item.amount} 
                      onChange={(e) => handleReceiptItemChange(index, 'amount', e.target.value)} 
                    />
                  </div>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={addReceiptItem}
              >
                Add Item
              </Button>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm py-1">
                <span>SUBTOTAL:</span>
                <Input 
                  className="w-16 text-right" 
                  value={receiptData.subtotal} 
                  onChange={(e) => handleReceiptChange('subtotal', e.target.value)} 
                />
              </div>
              <div className="flex justify-between text-sm py-1">
                <span>TAX (8.5%):</span>
                <Input 
                  className="w-16 text-right" 
                  value={receiptData.tax} 
                  onChange={(e) => handleReceiptChange('tax', e.target.value)} 
                />
              </div>
              <div className="flex justify-between text-sm py-1 font-bold border-t border-gray-800">
                <span>TOTAL:</span>
                <Input 
                  className="w-16 text-right font-bold" 
                  value={receiptData.total} 
                  onChange={(e) => handleReceiptChange('total', e.target.value)} 
                />
              </div>
              <div className="flex justify-between text-sm py-1">
                <span>AMOUNT TENDERED:</span>
                <Input 
                  className="w-16 text-right" 
                  value={receiptData.amountTendered} 
                  onChange={(e) => handleReceiptChange('amountTendered', e.target.value)} 
                />
              </div>
              <div className="flex justify-between text-sm py-1 font-bold">
                <span>CHANGE:</span>
                <Input 
                  className="w-16 text-right font-bold" 
                  value={receiptData.change} 
                  onChange={(e) => handleReceiptChange('change', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-xs">Payment Method: 
                <Input 
                  className="inline-block w-20 ml-1" 
                  value={receiptData.paymentMethod} 
                  onChange={(e) => handleReceiptChange('paymentMethod', e.target.value)} 
                />
              </p>
              <div className="mt-2">
                <p className="text-xs border-t border-gray-800 pt-2">Transaction ID: 
                  <Input 
                    className="inline-block w-32 ml-1" 
                    value={receiptData.transactionId} 
                    onChange={(e) => handleReceiptChange('transactionId', e.target.value)} 
                  />
                </p>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="border border-gray-800 p-2 inline-block">
                <p className="text-xs">CUSTOMER COPY</p>
              </div>
            </div>
            
            <div className="text-center text-xs">
              <Textarea 
                className="w-full text-center" 
                value={receiptData.thankYouMessage} 
                onChange={(e) => handleReceiptChange('thankYouMessage', e.target.value)} 
              />
              <Textarea 
                className="w-full text-center mt-1" 
                value={receiptData.returnPolicy} 
                onChange={(e) => handleReceiptChange('returnPolicy', e.target.value)} 
              />
              <Textarea 
                className="w-full text-center mt-1" 
                value={receiptData.exchangePolicy} 
                onChange={(e) => handleReceiptChange('exchangePolicy', e.target.value)} 
              />
            </div>
          </div>
        );
      case "notice":
        return (
          <div className="p-8 max-w-2xl mx-auto bg-white">
            <div className="text-center mb-8">
              <div className="border-2 border-gray-800 inline-block p-2 mb-4">
                <Input 
                  className="text-2xl font-bold w-full text-center" 
                  value={noticeData.noticeTitle} 
                  onChange={(e) => handleNoticeChange('noticeTitle', e.target.value)} 
                />
              </div>
              <p className="text-sm text-gray-600">Document Control Number: 
                <Input 
                  className="inline-block w-48" 
                  value={noticeData.documentControlNumber} 
                  onChange={(e) => handleNoticeChange('documentControlNumber', e.target.value)} 
                />
              </p>
            </div>
            
            <div className="text-right mb-8">
              <p className="font-semibold">Date: 
                <Input 
                  className="inline-block w-32" 
                  value={noticeData.date} 
                  onChange={(e) => handleNoticeChange('date', e.target.value)} 
                />
              </p>
            </div>
            
            <div className="mb-8">
              <p className="mb-4">To: 
                <Input 
                  className="font-semibold inline-block w-64" 
                  value={noticeData.to} 
                  onChange={(e) => handleNoticeChange('to', e.target.value)} 
                />
              </p>
              <p className="mb-4">From: 
                <Input 
                  className="font-semibold inline-block w-64" 
                  value={noticeData.from} 
                  onChange={(e) => handleNoticeChange('from', e.target.value)} 
                />
              </p>
              <p className="mb-4">Subject: 
                <Input 
                  className="font-semibold underline inline-block w-80" 
                  value={noticeData.subject} 
                  onChange={(e) => handleNoticeChange('subject', e.target.value)} 
                />
              </p>
            </div>
            
            <div className="mb-8">
              <div className="border-l-4 border-gray-800 pl-4">
                <Textarea 
                  className="w-full mb-4" 
                  value={noticeData.introduction} 
                  onChange={(e) => handleNoticeChange('introduction', e.target.value)} 
                />
                
                <h2 className="font-bold text-lg mb-3">Key Information:</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  {noticeData.keyInformation.map((info, index) => (
                    <li key={index}>
                      <Input 
                        className="w-full" 
                        value={info} 
                        onChange={(e) => handleNoticeKeyInfoChange(index, e.target.value)} 
                      />
                    </li>
                  ))}
                </ul>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="mb-4" 
                  onClick={addNoticeKeyInfoItem}
                >
                  Add Key Information Item
                </Button>
                
                <h2 className="font-bold text-lg mb-3">
                  <Input 
                    className="font-bold text-lg" 
                    value={noticeData.effectiveDateLabel} 
                    onChange={(e) => handleNoticeChange('effectiveDateLabel', e.target.value)} 
                  />
                </h2>
                <p className="mb-4">
                  <Input 
                    className="font-semibold" 
                    value={noticeData.effectiveDate} 
                    onChange={(e) => handleNoticeChange('effectiveDate', e.target.value)} 
                  />
                </p>
                
                <h2 className="font-bold text-lg mb-3">
                  <Input 
                    className="font-bold text-lg" 
                    value={noticeData.actionRequiredLabel} 
                    onChange={(e) => handleNoticeChange('actionRequiredLabel', e.target.value)} 
                  />
                </h2>
                <p className="mb-4">
                  <Input 
                    className="w-full" 
                    value={noticeData.actionRequired} 
                    onChange={(e) => handleNoticeChange('actionRequired', e.target.value)} 
                  />
                </p>
                
                <h2 className="font-bold text-lg mb-3">
                  <Input 
                    className="font-bold text-lg" 
                    value={noticeData.contactLabel} 
                    onChange={(e) => handleNoticeChange('contactLabel', e.target.value)} 
                  />
                </h2>
                <p className="mb-4">
                  <Input 
                    className="w-full" 
                    value={noticeData.contactInfo} 
                    onChange={(e) => handleNoticeChange('contactInfo', e.target.value)} 
                  />
                </p>
                <p className="font-semibold">
                  <Input 
                    className="w-full" 
                    value={noticeData.departmentPersonName} 
                    onChange={(e) => handleNoticeChange('departmentPersonName', e.target.value)} 
                  />
                </p>
                <p>Phone: 
                  <Input 
                    className="inline-block w-32" 
                    value={noticeData.phoneNumber} 
                    onChange={(e) => handleNoticeChange('phoneNumber', e.target.value)} 
                  />
                </p>
                <p>Email: 
                  <Input 
                    className="inline-block w-48" 
                    value={noticeData.emailAddress} 
                    onChange={(e) => handleNoticeChange('emailAddress', e.target.value)} 
                  />
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="font-bold text-lg mb-3">Additional Information:</h2>
              <div className="border border-gray-300 p-4 rounded">
                <Textarea 
                  className="w-full" 
                  value={noticeData.additionalInformation} 
                  onChange={(e) => handleNoticeChange('additionalInformation', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <p className="font-semibold mb-8">
                  <Input 
                    className="font-semibold" 
                    value={noticeData.issuedByLabel} 
                    onChange={(e) => handleNoticeChange('issuedByLabel', e.target.value)} 
                  />
                </p>
                <div className="border-t border-gray-800 pt-2">
                  <p className="font-semibold">
                    <Input 
                      className="font-semibold w-full" 
                      value={noticeData.authorizedSignatoryName} 
                      onChange={(e) => handleNoticeChange('authorizedSignatoryName', e.target.value)} 
                    />
                  </p>
                  <p>
                    <Input 
                      className="w-full" 
                      value={noticeData.title} 
                      onChange={(e) => handleNoticeChange('title', e.target.value)} 
                    />
                  </p>
                  <p>
                    <Input 
                      className="w-full" 
                      value={noticeData.companyName} 
                      onChange={(e) => handleNoticeChange('companyName', e.target.value)} 
                    />
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-8">
                  <Input 
                    className="font-semibold" 
                    value={noticeData.acknowledgmentLabel} 
                    onChange={(e) => handleNoticeChange('acknowledgmentLabel', e.target.value)} 
                  />
                </p>
                <div className="border-t border-gray-800 pt-2">
                  <p className="mb-4">
                    <Input 
                      className="w-full" 
                      value={noticeData.signatureLine} 
                      onChange={(e) => handleNoticeChange('signatureLine', e.target.value)} 
                    />
                  </p>
                  <p className="mb-4">
                    <Input 
                      className="w-full" 
                      value={noticeData.printNameLine} 
                      onChange={(e) => handleNoticeChange('printNameLine', e.target.value)} 
                    />
                  </p>
                  <p>
                    <Input 
                      className="w-full" 
                      value={noticeData.dateLine} 
                      onChange={(e) => handleNoticeChange('dateLine', e.target.value)} 
                    />
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
              <p>
                <Input 
                  className="w-full text-center" 
                  value={noticeData.footerMessage} 
                  onChange={(e) => handleNoticeChange('footerMessage', e.target.value)} 
                />
              </p>
              <p className="mt-1">
                <Input 
                  className="w-full text-center" 
                  value={noticeData.distributionInfo} 
                  onChange={(e) => handleNoticeChange('distributionInfo', e.target.value)} 
                />
              </p>
            </div>
          </div>
        );
      case "quote":
        return (
          <div className="p-6 max-w-2xl mx-auto bg-white">
            <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-blue-800">
              <div>
                <Input 
                  className="text-3xl font-bold text-blue-800 w-full" 
                  value={quoteData.quoteTitle} 
                  onChange={(e) => handleQuoteChange('quoteTitle', e.target.value)} 
                />
                <Input 
                  className="text-gray-600 mt-1 w-full" 
                  value={quoteData.quoteSubtitle} 
                  onChange={(e) => handleQuoteChange('quoteSubtitle', e.target.value)} 
                />
              </div>
              <div className="text-right">
                <div className="bg-blue-50 border-2 border-blue-800 p-2 rounded">
                  <p className="text-blue-800 font-bold">QUOTE #</p>
                  <Input 
                    className="text-xl font-bold w-full" 
                    value={quoteData.quoteNumber} 
                    onChange={(e) => handleQuoteChange('quoteNumber', e.target.value)} 
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">PREPARED FOR:</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <Input 
                    className="font-bold w-full mb-1" 
                    value={quoteData.preparedFor.company} 
                    onChange={(e) => handleQuotePreparedForChange('company', e.target.value)} 
                  />
                  <Input 
                    className="w-full mb-1" 
                    value={quoteData.preparedFor.contactPerson} 
                    onChange={(e) => handleQuotePreparedForChange('contactPerson', e.target.value)} 
                  />
                  <Input 
                    className="w-full mb-1" 
                    value={quoteData.preparedFor.address} 
                    onChange={(e) => handleQuotePreparedForChange('address', e.target.value)} 
                  />
                  <Input 
                    className="w-full mb-1" 
                    value={quoteData.preparedFor.cityStateZip} 
                    onChange={(e) => handleQuotePreparedForChange('cityStateZip', e.target.value)} 
                  />
                  <p>Phone: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={quoteData.preparedFor.phone} 
                      onChange={(e) => handleQuotePreparedForChange('phone', e.target.value)} 
                    />
                  </p>
                  <p>Email: 
                    <Input 
                      className="inline-block w-48 ml-1" 
                      value={quoteData.preparedFor.email} 
                      onChange={(e) => handleQuotePreparedForChange('email', e.target.value)} 
                    />
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">PREPARED BY:</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  <Input 
                    className="font-bold w-full mb-1" 
                    value={quoteData.preparedBy.company} 
                    onChange={(e) => handleQuotePreparedByChange('company', e.target.value)} 
                  />
                  <Input 
                    className="w-full mb-1" 
                    value={quoteData.preparedBy.contactPerson} 
                    onChange={(e) => handleQuotePreparedByChange('contactPerson', e.target.value)} 
                  />
                  <Input 
                    className="w-full mb-1" 
                    value={quoteData.preparedBy.address} 
                    onChange={(e) => handleQuotePreparedByChange('address', e.target.value)} 
                  />
                  <Input 
                    className="w-full mb-1" 
                    value={quoteData.preparedBy.cityStateZip} 
                    onChange={(e) => handleQuotePreparedByChange('cityStateZip', e.target.value)} 
                  />
                  <p>Phone: 
                    <Input 
                      className="inline-block w-32 ml-1" 
                      value={quoteData.preparedBy.phone} 
                      onChange={(e) => handleQuotePreparedByChange('phone', e.target.value)} 
                    />
                  </p>
                  <p>Email: 
                    <Input 
                      className="inline-block w-48 ml-1" 
                      value={quoteData.preparedBy.email} 
                      onChange={(e) => handleQuotePreparedByChange('email', e.target.value)} 
                    />
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6 bg-blue-50 p-3 rounded border">
              <div>
                <p className="text-xs text-gray-600">DATE</p>
                <Input 
                  className="font-medium w-full" 
                  value={quoteData.date} 
                  onChange={(e) => handleQuoteChange('date', e.target.value)} 
                />
              </div>
              <div>
                <p className="text-xs text-gray-600">VALID UNTIL</p>
                <Input 
                  className="font-medium w-full" 
                  value={quoteData.validUntil} 
                  onChange={(e) => handleQuoteChange('validUntil', e.target.value)} 
                />
              </div>
              <div>
                <p className="text-xs text-gray-600">PREPARED BY</p>
                <Input 
                  className="font-medium w-full" 
                  value={quoteData.preparedByPerson} 
                  onChange={(e) => handleQuoteChange('preparedByPerson', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="bg-blue-800 text-white p-2 rounded-t">
                <h3 className="font-bold text-lg">PROJECT DESCRIPTION</h3>
              </div>
              <div className="border border-gray-300 p-3 rounded-b">
                <Textarea 
                  className="w-full" 
                  value={quoteData.projectDescription} 
                  onChange={(e) => handleQuoteChange('projectDescription', e.target.value)} 
                />
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
                  {quoteData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <Input 
                          className="w-full" 
                          value={item.itemNumber} 
                          onChange={(e) => handleQuoteItemChange(index, 'itemNumber', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        <Input 
                          className="w-full" 
                          value={item.description} 
                          onChange={(e) => handleQuoteItemChange(index, 'description', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="w-full text-center" 
                          value={item.quantity} 
                          onChange={(e) => handleQuoteItemChange(index, 'quantity', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-sm">
                        <Input 
                          className="w-full text-center" 
                          value={item.unit} 
                          onChange={(e) => handleQuoteItemChange(index, 'unit', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                        <Input 
                          className="w-full text-right" 
                          value={item.unitPrice} 
                          onChange={(e) => handleQuoteItemChange(index, 'unitPrice', e.target.value)} 
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-right text-sm">
                        <Input 
                          className="w-full text-right" 
                          value={item.total} 
                          onChange={(e) => handleQuoteItemChange(index, 'total', e.target.value)} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">SUBTOTAL</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">
                      <Input 
                        className="w-full text-right font-bold" 
                        value={quoteData.subtotal} 
                        onChange={(e) => handleQuoteChange('subtotal', e.target.value)} 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">
                      <Input 
                        className="inline-block" 
                        value={quoteData.discountLabel} 
                        onChange={(e) => handleQuoteChange('discountLabel', e.target.value)} 
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">
                      <Input 
                        className="w-full text-right font-bold" 
                        value={quoteData.discountValue} 
                        onChange={(e) => handleQuoteChange('discountValue', e.target.value)} 
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">
                      <Input 
                        className="inline-block" 
                        value={quoteData.taxLabel} 
                        onChange={(e) => handleQuoteChange('taxLabel', e.target.value)} 
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-sm">
                      <Input 
                        className="w-full text-right font-bold" 
                        value={quoteData.taxValue} 
                        onChange={(e) => handleQuoteChange('taxValue', e.target.value)} 
                      />
                    </td>
                  </tr>
                  <tr className="bg-blue-100">
                    <td colSpan={4} className="border border-gray-300 px-3 py-2 text-sm"></td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-lg">
                      <Input 
                        className="inline-block" 
                        value={quoteData.totalLabel} 
                        onChange={(e) => handleQuoteChange('totalLabel', e.target.value)} 
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-lg">
                      <Input 
                        className="w-full text-right font-bold" 
                        value={quoteData.totalValue} 
                        onChange={(e) => handleQuoteChange('totalValue', e.target.value)} 
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={addQuoteItem}
              >
                Add Item
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">TERMS & CONDITIONS:</h3>
                <div className="border border-gray-300 p-3 rounded text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    {quoteData.termsAndConditions.map((term, index) => (
                      <li key={index}>
                        <Input 
                          className="w-full" 
                          value={term} 
                          onChange={(e) => handleQuoteTermsChange(index, e.target.value)} 
                        />
                      </li>
                    ))}
                  </ul>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="mt-2" 
                    onClick={addQuoteTermsItem}
                  >
                    Add Term
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">PAYMENT SCHEDULE:</h3>
                <div className="border border-gray-300 p-3 rounded text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    {quoteData.paymentSchedule.map((schedule, index) => (
                      <li key={index}>
                        <Input 
                          className="w-full" 
                          value={schedule} 
                          onChange={(e) => handleQuotePaymentScheduleChange(index, e.target.value)} 
                        />
                      </li>
                    ))}
                  </ul>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="mt-2" 
                    onClick={addQuotePaymentScheduleItem}
                  >
                    Add Schedule Item
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">ACCEPTANCE:</h3>
              <div className="border border-gray-300 p-4 rounded">
                <Textarea 
                  className="w-full mb-4" 
                  value={quoteData.acceptanceMessage} 
                  onChange={(e) => handleQuoteChange('acceptanceMessage', e.target.value)} 
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2">
                      <Input 
                        className="w-full" 
                        value={quoteData.signatureLine} 
                        onChange={(e) => handleQuoteChange('signatureLine', e.target.value)} 
                      />
                    </p>
                    <p className="mb-2">
                      <Input 
                        className="w-full" 
                        value={quoteData.printNameLine} 
                        onChange={(e) => handleQuoteChange('printNameLine', e.target.value)} 
                      />
                    </p>
                    <p className="mb-2">
                      <Input 
                        className="w-full" 
                        value={quoteData.titleLine} 
                        onChange={(e) => handleQuoteChange('titleLine', e.target.value)} 
                      />
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">
                      <Input 
                        className="w-full" 
                        value={quoteData.dateLine} 
                        onChange={(e) => handleQuoteChange('dateLine', e.target.value)} 
                      />
                    </p>
                    <p className="mb-2">
                      <Input 
                        className="w-full" 
                        value={quoteData.companyLine} 
                        onChange={(e) => handleQuoteChange('companyLine', e.target.value)} 
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-600 mt-8 pt-4 border-t border-gray-300">
              <p>
                <Input 
                  className="w-full text-center" 
                  value={quoteData.thankYouMessage} 
                  onChange={(e) => handleQuoteChange('thankYouMessage', e.target.value)} 
                />
              </p>
              <p className="mt-1">Quote prepared by: 
                <Input 
                  className="inline-block w-32 ml-1" 
                  value={quoteData.quotePreparedBy} 
                  onChange={(e) => handleQuoteChange('quotePreparedBy', e.target.value)} 
                /> | Valid until: 
                <Input 
                  className="inline-block w-32 ml-1" 
                  value={quoteData.validUntilDate} 
                  onChange={(e) => handleQuoteChange('validUntilDate', e.target.value)} 
                />
              </p>
            </div>
          </div>
        );
      case "report":
        return (
          <div className="p-8 max-w-4xl mx-auto bg-white">
            <div className="text-center mb-8">
              <Input 
                className="text-3xl font-bold text-gray-800 w-full text-center" 
                value={reportData.reportTitle} 
                onChange={(e) => handleReportChange('reportTitle', e.target.value)} 
              />
              <p className="text-lg mt-2">Reporting Period: 
                <Input 
                  className="inline-block w-64" 
                  value={reportData.reportingPeriod} 
                  onChange={(e) => handleReportChange('reportingPeriod', e.target.value)} 
                />
              </p>
              <p className="text-gray-600 mt-1">Prepared by: 
                <Input 
                  className="inline-block w-48" 
                  value={reportData.preparedBy} 
                  onChange={(e) => handleReportChange('preparedBy', e.target.value)} 
                />
              </p>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              {reportData.metrics.map((metric, index) => (
                <div key={index} className={`bg-${metric.color}-50 border border-${metric.color}-200 rounded p-4 text-center`}>
                  <Input 
                    className={`text-2xl font-bold text-${metric.color}-800 w-full text-center`} 
                    value={metric.value} 
                    onChange={(e) => handleReportMetricChange(index, 'value', e.target.value)} 
                  />
                  <Input 
                    className="text-sm text-gray-600 w-full text-center" 
                    value={metric.label} 
                    onChange={(e) => handleReportMetricChange(index, 'label', e.target.value)} 
                  />
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addReportMetric}
              >
                Add Metric
              </Button>
            </div>
            
            <div className="mb-8">
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <Input 
                  className="text-lg font-bold mb-2 w-full" 
                  value={reportData.kpiTitle} 
                  onChange={(e) => handleReportChange('kpiTitle', e.target.value)} 
                />
                <ol className="list-decimal pl-6">
                  {reportData.kpis.map((kpi, index) => (
                    <li key={index} className="mb-1">
                      <Input 
                        className="w-full" 
                        value={kpi} 
                        onChange={(e) => handleReportKpiChange(index, e.target.value)} 
                      />
                    </li>
                  ))}
                </ol>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="mt-2" 
                  onClick={addReportKpi}
                >
                  Add KPI
                </Button>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <Input 
                  className="text-lg font-bold mb-2 w-full" 
                  value={reportData.operationalHighlightsTitle} 
                  onChange={(e) => handleReportChange('operationalHighlightsTitle', e.target.value)} 
                />
                <ul className="list-disc pl-6 space-y-2">
                  {reportData.operationalHighlights.map((highlight, index) => (
                    <li key={index}>
                      <Input 
                        className="w-full" 
                        value={highlight} 
                        onChange={(e) => handleReportOperationalHighlightChange(index, e.target.value)} 
                      />
                    </li>
                  ))}
                </ul>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="mt-2" 
                  onClick={addReportOperationalHighlight}
                >
                  Add Highlight
                </Button>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <Input 
                  className="text-lg font-bold mb-2 w-full" 
                  value={reportData.strategicInitiativesTitle} 
                  onChange={(e) => handleReportChange('strategicInitiativesTitle', e.target.value)} 
                />
                <ol className="list-decimal pl-6">
                  {reportData.strategicInitiatives.map((initiative, index) => (
                    <li key={index} className="mb-1">
                      <Input 
                        className="w-full" 
                        value={initiative} 
                        onChange={(e) => handleReportStrategicInitiativeChange(index, e.target.value)} 
                      />
                    </li>
                  ))}
                </ol>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="mt-2" 
                  onClick={addReportStrategicInitiative}
                >
                  Add Initiative
                </Button>
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
          <p className="text-gray-600 mb-6">Professional templates for your business documents</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      {template.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handlePreviewTemplate(template.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handlePrintTemplate(template.id)}
                      >
                        <Printer className="h-4 w-4 mr-1" />
                        Print
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDownloadTemplate(template.id)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedTemplate && templates.find(t => t.id === selectedTemplate)?.name} Preview
            </DialogTitle>
          </DialogHeader>
          <div>
            {selectedTemplate && getTemplateContent(selectedTemplate)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessTemplates;