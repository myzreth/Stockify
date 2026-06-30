import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  CalendarClock, 
  PlusSquare, 
  Settings, 
  Search, 
  AlertTriangle,
  ChevronRight,
  Save,
  CheckCircle2,
  PackagePlus,
  Truck,
  DollarSign,
  Box,
  Globe,
  Trash2,
  X,
  Users,
  Phone,
  UserCircle,
  FileText,
  Receipt,
  CreditCard,
  Calendar,
  Edit2,
  ShoppingCart,
  TrendingDown,
  Activity,
  BellRing,
  Database,
  Sliders,
  DownloadCloud,
  ShieldAlert
} from 'lucide-react';

// --- 多语言字典 (i18n Dictionary) ---
const TRANSLATIONS = {
  en: {
    app: { title: "Stockify.", search: "Search items..." },
    nav: { dash: "Dashboard", inventory: "All Inventory", weekly: "Weekly Stock", addStock: "Manual Add Stock", expiry: "Expiry Monitor", suppliers: "Suppliers Directory", invoices: "Invoices & Payments", settings: "System Settings" },
    dash: {
      title: "Real-time Dashboard",
      totalAssets: "Total Assets (USD Eqv.)",
      stockAlerts: "Stock Alerts",
      expiryAlerts: "Expiry Warnings",
      unpaidInvoices: "Unpaid Invoices",
      pendingPayment: "Pending",
      items: "items",
      urgent: "Urgent",
      toCheck: "To Check",
      distTitle: "Asset Distribution",
      tableTitle: "Real-time Asset List",
      quickAdd: "Quick Add",
      categoriesLabel: "Categories"
    },
    table: { itemInfo: "Item Info", unitPrice: "Unit Price", qty: "Qty", total: "Total Value", status: "Status", expiry: "Expiry", inStock: "In Stock", lowStock: "Low Stock", outOfStock: "Out of Stock", actions: "Actions", delete: "Delete Item" },
    form: {
      title: "New Item Entry",
      singleStepTitle: "Item Configuration & Logistics",
      itemName: "Item Name",
      category: "Category",
      catPlaceholder: "Select or type new category",
      catOptions: ["Electronics", "Medical", "Fresh Food", "Office Supplies", "Other"],
      currency: "Currency",
      price: "Unit Price",
      qty: "Stock Quantity (ctn)",
      expiryDate: "Expiry Date (Optional)",
      selectSupplier: "Select Supplier",
      noSupplier: "-- Select a Supplier --",
      invoice: "Invoice / Receipt No.",
      btnSubmit: "Confirm & Publish",
      preview: "Asset Estimate",
      increment: "Stock Increment",
      success: "Success",
      successDesc: "Item successfully added and inventory updated."
    },
    suppliers: {
      title: "Supplier Directory",
      addTitle: "Register New Supplier",
      name: "Supplier Company Name",
      contact: "Contact Person (Opt)",
      phone: "Phone Number (Opt)",
      addBtn: "Save Supplier",
      listTitle: "Registered Suppliers",
      empty: "No suppliers registered.",
      editTitle: "Edit Supplier",
      updateBtn: "Update Supplier"
    },
    expiryView: { title: "Expiry Tracking Board", expired: "Expired", critical: "Critical (<30d)", warning: "Warning (<90d)", safe: "Safe", daysOver: "Days Over", daysLeft: "Days Left", noItems: "All Clear" },
    invoices: {
      title: "Invoices & Payments",
      summary: "Summary",
      volume: "Total Volume Received",
      totalValue: "Total Value",
      unpaidTotal: "Unpaid Total",
      tableInv: "Invoice No.",
      tableSup: "Supplier",
      tableDate: "Date",
      tableAmt: "Amount",
      tableStatus: "Status",
      tableAction: "Action",
      markPaid: "Mark Paid",
      markUnpaid: "Mark Unpaid",
      paid: "Paid",
      unpaid: "Unpaid",
      tabList: "Invoice List",
      tabPay: "Supplier Payments",
      invCount: "Unpaid Invoices",
      outBalance: "Outstanding Balance",
      allPaid: "All suppliers are fully paid!"
    },
    weekly: {
      title: "Weekly Stock & Reorder Plan",
      toReorder: "Needs Reorder",
      healthy: "Healthy Stock",
      stockLevel: "Stock Level Indicator",
      actualStock: "Actual Count",
      updateBtn: "Update Stock",
      minTarget: "Min Threshold",
      target: "Target:",
      current: "Current:"
    },
    settings: {
      title: "System Settings",
      tabs: { general: "General Profile", prefs: "Preferences", notif: "Notifications", data: "Data Management" },
      general: { title: "Company Profile", name: "Company Name", admin: "Admin Name", email: "Contact Email", save: "Save Changes" },
      prefs: { title: "System Preferences", lang: "System Language", currency: "Default Currency", timezone: "Timezone", save: "Save Preferences" },
      notif: { title: "Alert Configurations", lowStock: "Low Stock Alerts", expiry: "Expiry Warnings", emailDigest: "Weekly Email Digest" },
      data: { title: "Data Management", export: "Export Inventory (CSV)", backup: "Create Cloud Backup", danger: "Danger Zone", reset: "Factory Reset" }
    }
  },
  zh: {
    app: { title: "Stockify.", search: "搜索物料..." },
    nav: { dash: "控制面板", inventory: "所有库存", weekly: "每周盘点与补货", addStock: "手动新增入库", expiry: "效期监控", suppliers: "供应商名录", invoices: "账单与支付", settings: "系统设置" },
    dash: {
      title: "实时看板",
      totalAssets: "总资产价值 (折合美元)",
      stockAlerts: "库存异常警报",
      expiryAlerts: "临期/过期提醒",
      unpaidInvoices: "待处理账单",
      pendingPayment: "待付款",
      items: "项",
      urgent: "紧急",
      toCheck: "待盘点",
      distTitle: "分类资金分布",
      tableTitle: "资产实时清单",
      quickAdd: "快速入库",
      categoriesLabel: "个分类"
    },
    table: { itemInfo: "货物信息", unitPrice: "单价", qty: "数量", total: "总价值", status: "状态", expiry: "效期", inStock: "库存充足", lowStock: "库存紧张", outOfStock: "已售罄", actions: "操作", delete: "移除物品" },
    form: {
      title: "新货物录入系统",
      singleStepTitle: "货物规格与来源配置",
      itemName: "货物正式名称",
      category: "所属分类",
      catPlaceholder: "选择或输入新分类",
      catOptions: ["电子产品", "医疗器械", "生鲜冷链", "办公耗材", "其他"],
      currency: "结算币种 (Currency)",
      price: "单价",
      qty: "入库数量 (ctn/箱)",
      expiryDate: "入库效期 (选填)",
      selectSupplier: "供货方选择",
      noSupplier: "-- 请选择供应商 --",
      invoice: "关联发票/入库单号",
      btnSubmit: "确认入库并发布",
      preview: "入库资产估算",
      increment: "库存增量",
      success: "操作成功",
      successDesc: "物料已成功录入，财务账目已同步更新。"
    },
    suppliers: {
      title: "供应商源管理",
      addTitle: "登记新供应商",
      name: "供应商公司全称",
      contact: "业务对接人 (选填)",
      phone: "联系电话 (选填)",
      addBtn: "保存供应商",
      listTitle: "已登记供应商列表",
      empty: "暂无供应商记录",
      editTitle: "编辑供应商资料",
      updateBtn: "确认更新"
    },
    expiryView: { title: "效期追踪看板", expired: "已过期资产", critical: "紧急临期 (<30天)", warning: "中期预警 (<90天)", safe: "效期健康", daysOver: "天已过期", daysLeft: "天剩余", noItems: "暂无记录" },
    invoices: {
      title: "账单与支付管理",
      summary: "月度汇总",
      volume: "本月总进货量 (ctn)",
      totalValue: "本月采购总额",
      unpaidTotal: "待付款总额",
      tableInv: "发票/入库单号",
      tableSup: "供应商",
      tableDate: "单据日期",
      tableAmt: "总金额",
      tableStatus: "支付状态",
      tableAction: "操作",
      markPaid: "设为已付",
      markUnpaid: "设为未付",
      paid: "已付款",
      unpaid: "未付款",
      tabList: "账单明细列表",
      tabPay: "供应商待结账款",
      invCount: "笔未结账单",
      outBalance: "待结欠款总计",
      allPaid: "所有供应商账款均已结清！"
    },
    weekly: {
      title: "每周存货盘点与补货计划",
      toReorder: "急需补货",
      healthy: "库存健康",
      stockLevel: "库存水位可视化",
      actualStock: "输入实际盘点量",
      updateBtn: "更新库存",
      minTarget: "安全基准线",
      target: "目标库存:",
      current: "当前:"
    },
    settings: {
      title: "系统设置与管理",
      tabs: { general: "基础档案", prefs: "系统偏好", notif: "通知与警报", data: "数据与安全" },
      general: { title: "企业档案设置", name: "企业名称", admin: "主管理员姓名", email: "系统联系邮箱", save: "保存档案更改" },
      prefs: { title: "系统偏好设置", lang: "系统展示语言", currency: "默认基础货币", timezone: "所在时区", save: "保存偏好设置" },
      notif: { title: "警报与通知配置", lowStock: "低库存自动警报", expiry: "资产临期警告系统", emailDigest: "每周数据简报 (邮件推送)" },
      data: { title: "数据导出与备份", export: "导出当前库存表 (CSV)", backup: "立即创建云端备份", danger: "危险操作区域", reset: "清空数据并恢复出厂设置" }
    }
  }
};

const EXCHANGE_RATES = { USD: 1, CNY: 0.14, EUR: 1.08, MYR: 0.21, GBP: 1.25 };
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const INITIAL_SUPPLIERS = [
  { id: 1, name: 'Apple Inc.', contact: 'Tim Cook', phone: '1-800-MY-APPLE' },
  { id: 2, name: 'PharmaCorp', contact: 'Dr. Smith', phone: '1-800-PHARMA' },
  { id: 3, name: 'DairyFarm Logistics', contact: 'Bob', phone: '111-222-3333' },
  { id: 4, name: 'Global Meats', contact: 'Gordon', phone: '44-020-1234' },
];

const INITIAL_DATA = [
  { id: 1, name: 'MacBook Pro 16"', sku: 'SKU-0012', category: 'Electronics', currency: 'USD', stock: 45, minStock: 20, maxStock: 100, price: 2499, status: 'Active', expiryDate: null, supplier: 'Apple Inc.', invoice: 'INV-2026-001' },
  { id: 2, name: 'Vitamin C Tablets', sku: 'SKU-8821', category: 'Medical', currency: 'USD', stock: 120, minStock: 30, maxStock: 200, price: 15, status: 'Active', expiryDate: '2026-08-15', supplier: 'PharmaCorp', invoice: 'INV-2026-002' },
  { id: 3, name: 'Logitech MX Master 3S', sku: 'SKU-9901', category: 'Electronics', currency: 'EUR', stock: 12, minStock: 15, maxStock: 50, price: 99, status: 'Critical', expiryDate: null, supplier: 'Apple Inc.', invoice: 'INV-2025-998' },
  { id: 4, name: 'Whole Milk (Box)', sku: 'SKU-1029', category: 'Fresh Food', currency: 'CNY', stock: 28, minStock: 30, maxStock: 150, price: 65, status: 'Active', expiryDate: '2026-06-20', supplier: 'DairyFarm Logistics', invoice: 'INV-2026-005' },
  { id: 5, name: 'Imported Beef Steak', sku: 'SKU-4402', category: 'Fresh Food', currency: 'USD', stock: 8, minStock: 20, maxStock: 60, price: 45, status: 'Warning', expiryDate: '2026-06-10', supplier: 'Global Meats', invoice: 'INV-2026-011' },
];

const INITIAL_INVOICES = [
  { id: 'INV-2026-001', supplier: 'Apple Inc.', date: '2026-06-01', total: 112455, currency: 'USD', status: 'Paid', items: 45 },
  { id: 'INV-2026-002', supplier: 'PharmaCorp', date: '2026-06-02', total: 1800, currency: 'USD', status: 'Unpaid', items: 120 },
  { id: 'INV-2025-998', supplier: 'Apple Inc.', date: '2026-06-04', total: 0, currency: 'EUR', status: 'Paid', items: 0 },
  { id: 'INV-2026-005', supplier: 'DairyFarm Logistics', date: '2026-06-06', total: 1820, currency: 'CNY', status: 'Unpaid', items: 28 },
  { id: 'INV-2026-011', supplier: 'Global Meats', date: '2026-06-07', total: 360, currency: 'USD', status: 'Unpaid', items: 8 }
];

export default function App() {
  const [lang, setLang] = useState('en'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [settingsTab, setSettingsTab] = useState('general');
  
  const [inventory, setInventory] = useState(INITIAL_DATA);
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [showCatDropdown, setShowCatDropdown] = useState(false);

  const [filterYear, setFilterYear] = useState(2026);
  const [filterMonth, setFilterMonth] = useState(6);
  const [invoiceSubTab, setInvoiceSubTab] = useState('list'); 

  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', phone: '' });
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [stockUpdates, setStockUpdates] = useState({});

  // 模拟设置的开关状态
  const [notifConfig, setNotifConfig] = useState({ lowStock: true, expiry: true, digest: false });

  const [formData, setFormData] = useState({
    name: '', category: 'Electronics', currency: 'USD', price: '', stock: '', expiryDate: '',
    supplierName: '', invoice: ''
  });

  const t = (path) => {
    return path.split('.').reduce((obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : null), TRANSLATIONS[lang]) || path;
  };

  const totalAssetsUSD = useMemo(() => {
    return inventory.reduce((acc, item) => acc + (item.price * item.stock * (EXCHANGE_RATES[item.currency] || 1)), 0);
  }, [inventory]);

  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.supplier && item.supplier.toLowerCase().includes(query))
      );
    });
  }, [inventory, searchQuery]);

  const urgentItems = useMemo(() => {
    const today = new Date('2026-06-07');
    return inventory
      .filter(item => item.expiryDate)
      .map(item => ({ ...item, diff: Math.ceil((new Date(item.expiryDate) - today) / (1000 * 60 * 60 * 24)) }))
      .filter(item => item.diff <= 30)
      .sort((a, b) => a.diff - b.diff);
  }, [inventory]);

  const expiryData = useMemo(() => {
    const today = new Date('2026-06-07');
    const categorized = { expired: [], critical: [], warning: [], safe: [] };
    
    inventory.filter(item => item.expiryDate).forEach(item => {
      const diff = Math.ceil((new Date(item.expiryDate) - today) / (1000 * 60 * 60 * 24));
      const enhancedItem = { ...item, diff };
      if (diff < 0) categorized.expired.push(enhancedItem);
      else if (diff <= 30) categorized.critical.push(enhancedItem);
      else if (diff <= 90) categorized.warning.push(enhancedItem);
      else categorized.safe.push(enhancedItem);
    });
    
    return categorized;
  }, [inventory]);

  const weeklyStockData = useMemo(() => {
    const toReorder = inventory.filter(item => item.stock <= item.minStock);
    const healthy = inventory.filter(item => item.stock > item.minStock);
    return { toReorder, healthy };
  }, [inventory]);

  // 计算 Dashboard 资产分布的实际总价值 (代替百分比)
  const chartData = useMemo(() => {
    const vals = {};
    inventory.forEach(item => {
      const val = item.price * item.stock * (EXCHANGE_RATES[item.currency] || 1);
      if (val > 0) {
        vals[item.category] = (vals[item.category] || 0) + val;
      }
    });
    
    const sorted = Object.entries(vals).map(([cat, val]) => ({ cat, val })).sort((a, b) => b.val - a.val);
    
    if (sorted.length === 0) return { gradient: 'conic-gradient(#e2e8f0 0% 100%)', items: [] };
    
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#0ea5e9', '#f43f5e'];
    const tailwindColors = ['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-pink-500', 'bg-violet-500', 'bg-sky-500', 'bg-rose-500'];
    
    let currentDegree = 0;
    const totalVal = sorted.reduce((acc, curr) => acc + curr.val, 0);
    
    const stops = sorted.map((cv, i) => {
      const percent = (cv.val / totalVal) * 100;
      const stop = `${colors[i % colors.length]} ${currentDegree}% ${currentDegree + percent}%`;
      currentDegree += percent;
      cv.colorClass = tailwindColors[i % tailwindColors.length];
      return stop;
    });
    
    return {
      gradient: `conic-gradient(${stops.join(', ')})`,
      items: sorted
    };
  }, [inventory]);

  const unpaidInvoices = useMemo(() => invoices.filter(inv => inv.status === 'Unpaid'), [invoices]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const d = new Date(inv.date);
      return d.getMonth() + 1 === filterMonth && d.getFullYear() === filterYear;
    }).sort((a,b) => new Date(b.date) - new Date(a.date));
  }, [invoices, filterMonth, filterYear]);

  const currentMonthSummary = useMemo(() => {
    let volume = 0;
    let valueUSD = 0;
    let unpaidUSD = 0;

    filteredInvoices.forEach(inv => {
      volume += inv.items;
      const val = inv.total * (EXCHANGE_RATES[inv.currency] || 1);
      valueUSD += val;
      if (inv.status === 'Unpaid') unpaidUSD += val;
    });
    return { volume, valueUSD, unpaidUSD };
  }, [filteredInvoices]);

  const supplierBalances = useMemo(() => {
    const groups = {};
    invoices.forEach(inv => {
      if (inv.status !== 'Unpaid') return; 
      if (!groups[inv.supplier]) {
        groups[inv.supplier] = { name: inv.supplier, count: 0, totalUSD: 0, ids: [] };
      }
      groups[inv.supplier].count++;
      groups[inv.supplier].totalUSD += inv.total * (EXCHANGE_RATES[inv.currency] || 1);
      groups[inv.supplier].ids.push(inv.id);
    });
    return Object.values(groups).sort((a, b) => b.totalUSD - a.totalUSD); 
  }, [invoices]);

  const handleDeleteItem = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    if (!newSupplier.name.trim()) return;
    setSuppliers([{ id: Date.now(), ...newSupplier }, ...suppliers]);
    setNewSupplier({ name: '', contact: '', phone: '' });
  };

  const handleUpdateSupplier = (e) => {
    e.preventDefault();
    if (!editingSupplier.name.trim()) return;
    setSuppliers(prev => prev.map(s => s.id === editingSupplier.id ? editingSupplier : s));
    setEditingSupplier(null);
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        sku: `SKU-${Math.floor(Math.random()*10000)}`, 
        category: formData.category || t('form.catOptions')[0],
        currency: formData.currency,
        stock: parseInt(formData.stock) || 0,
        minStock: 20, 
        maxStock: 100, 
        price: parseFloat(formData.price) || 0,
        status: parseInt(formData.stock) > 10 ? 'Active' : (parseInt(formData.stock) > 0 ? 'Warning' : 'Critical'),
        expiryDate: formData.expiryDate || null,
        supplier: formData.supplierName,
        invoice: formData.invoice
      };
      
      setInvoices(prev => {
        const existingIdx = prev.findIndex(inv => inv.id === formData.invoice);
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx].total += parseFloat(formData.price) * parseInt(formData.stock);
          updated[existingIdx].items += parseInt(formData.stock);
          return updated;
        } else {
          return [{
            id: formData.invoice || `INV-${Math.floor(Math.random()*10000)}`,
            supplier: formData.supplierName || 'Unknown Supplier',
            date: new Date().toISOString().split('T')[0], 
            total: parseFloat(formData.price) * parseInt(formData.stock),
            currency: formData.currency,
            status: 'Unpaid',
            items: parseInt(formData.stock)
          }, ...prev];
        }
      });

      setInventory([newItem, ...inventory]);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setActiveTab('inventory');
        setFormData({ name: '', category: t('form.catOptions')[0], currency: 'USD', price: '', stock: '', expiryDate: '', supplierName: '', invoice: '' });
      }, 1500);
    }, 800);
  };

  const handleTogglePayment = (invoiceId) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === invoiceId ? { ...inv, status: inv.status === 'Paid' ? 'Unpaid' : 'Paid' } : inv
    ));
  };

  const handleActualStockUpdate = (id) => {
    if (stockUpdates[id] !== undefined && stockUpdates[id] !== '') {
      const newStock = parseInt(stockUpdates[id], 10);
      if (!isNaN(newStock) && newStock >= 0) {
        setInventory(prev => prev.map(item => item.id === id ? { ...item, stock: newStock } : item));
        setStockUpdates(prev => ({...prev, [id]: ''}));
      }
    }
  };

  const StatCard = ({ title, value, icon, color, trend, onClick }) => (
    <div onClick={onClick} className={`bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-all ${onClick ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-indigo-200' : 'hover:shadow-md'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color}`}>{icon}</div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{trend}</span>
      </div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      
      {/* 侧边栏 */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 z-20">
        <div className="h-20 flex items-center px-8 border-b border-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Box className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">{t('app.title')}</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto scrollbar-hide">
          <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard />} label={t('nav.dash')} />
          <NavButton active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} icon={<Layers />} label={t('nav.inventory')} badge={inventory.length} />
          
          <NavButton active={activeTab === 'weekly'} onClick={() => setActiveTab('weekly')} icon={<ShoppingCart />} label={t('nav.weekly')} badge={weeklyStockData.toReorder.length} badgeColor="bg-rose-100 text-rose-600" />
          
          <NavButton active={activeTab === 'suppliers'} onClick={() => setActiveTab('suppliers')} icon={<Users />} label={t('nav.suppliers')} badge={suppliers.length} badgeColor="bg-slate-100 text-slate-600" />
          <NavButton active={activeTab === 'invoices'} onClick={() => setActiveTab('invoices')} icon={<Receipt />} label={t('nav.invoices')} badge={unpaidInvoices.length > 0 ? unpaidInvoices.length : null} badgeColor="bg-amber-100 text-amber-600" />
          
          <div className="my-4 px-2">
            <button 
              onClick={() => setActiveTab('add-stock')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'add-stock' ? 'bg-slate-900 text-white shadow-xl translate-y-[-2px]' : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-400'}`}
            >
              <PlusSquare className="w-5 h-5" />
              {t('nav.addStock')}
            </button>
          </div>

          <NavButton active={activeTab === 'expiry'} onClick={() => setActiveTab('expiry')} icon={<CalendarClock />} label={t('nav.expiry')} badge={urgentItems.length} badgeColor="bg-rose-500 text-white" />
        </nav>

        <div className="p-4 border-t border-slate-50">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold ${activeTab === 'settings' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm">{t('nav.settings')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">
            {activeTab === 'dashboard' ? t('dash.title') : 
             activeTab === 'suppliers' ? t('suppliers.title') : 
             activeTab === 'weekly' ? t('weekly.title') : 
             activeTab === 'invoices' ? t('invoices.title') :
             activeTab === 'settings' ? t('settings.title') :
             activeTab === 'inventory' ? t('nav.inventory') : 
             activeTab === 'expiry' ? t('expiryView.title') : t('form.title')}
          </h2>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" />
              <input type="text" placeholder={t('app.search')} className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-60 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            
            <button 
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-bold text-slate-600 transition-colors"
            >
              <Globe className="w-4 h-4 text-indigo-500" />
              {lang === 'en' ? '中文' : 'EN'}
            </button>

            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden cursor-pointer">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="avatar" />
            </div>
          </div>
        </header>

        {/* View Content Area */}
        <div className="flex-1 overflow-auto p-10 pt-6">
          <div className="max-w-6xl mx-auto">
            
            {/* VIEW: Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {/* 增加至 5 个卡片，包含了独立的 Weekly Stock 捷径卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <StatCard onClick={() => setActiveTab('inventory')} title={t('dash.totalAssets')} value={`$${totalAssetsUSD.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}`} icon={<DollarSign className="w-5 h-5" />} color="bg-indigo-50 text-indigo-600" trend="≈ USD" />
                  
                  {/* 新增的 Weekly Stock 卡片 */}
                  <StatCard onClick={() => setActiveTab('weekly')} title={t('nav.weekly')} value={`${inventory.length} ${t('dash.items')}`} icon={<ShoppingCart className="w-5 h-5" />} color="bg-emerald-50 text-emerald-600" trend={t('dash.toCheck')} />
                  
                  <StatCard onClick={() => setActiveTab('weekly')} title={t('dash.stockAlerts')} value={`${weeklyStockData.toReorder.length} ${t('dash.items')}`} icon={<AlertTriangle className="w-5 h-5" />} color="bg-amber-50 text-amber-600" trend={t('dash.urgent')} />
                  <StatCard onClick={() => setActiveTab('expiry')} title={t('dash.expiryAlerts')} value={`${urgentItems.length} ${t('dash.items')}`} icon={<CalendarClock className="w-5 h-5" />} color="bg-rose-50 text-rose-600" trend={t('dash.urgent')} />
                  <StatCard onClick={() => setActiveTab('invoices')} title={t('dash.unpaidInvoices')} value={`${unpaidInvoices.length} ${t('dash.items')}`} icon={<Receipt className="w-5 h-5" />} color="bg-blue-50 text-blue-600" trend={t('dash.pendingPayment')} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6">{t('dash.distTitle')}</h3>
                    <div className="flex flex-col items-center">
                      <div className="relative w-40 h-40 rounded-full flex items-center justify-center mb-6 transition-all" style={{ background: chartData.gradient }}>
                        <div className="absolute w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                          <span className="text-2xl font-black text-slate-800">{chartData.items.length}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">{t('dash.categoriesLabel')}</span>
                        </div>
                      </div>
                      <div className="w-full space-y-3">
                        {/* 此处的 Legend 已修改为显示具体价格而不再是百分比 */}
                        {chartData.items.map((item, idx) => (
                          <Legend 
                            key={idx} 
                            color={item.colorClass} 
                            label={item.cat} 
                            value={`$${item.val.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800">{t('dash.tableTitle')}</h3>
                      <button onClick={() => setActiveTab('add-stock')} className="text-xs font-bold bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">{t('dash.quickAdd')}</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                          <tr>
                            <th className="px-6 py-4">{t('table.itemInfo')}</th>
                            <th className="px-6 py-4 text-right">{t('table.unitPrice')}</th>
                            <th className="px-6 py-4 text-right">{t('table.qty')}</th>
                            <th className="px-6 py-4 text-right">{t('table.total')}</th>
                            <th className="px-6 py-4 text-center">{t('table.status')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {inventory.slice(0, 6).map(item => (
                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedItem(item)}>
                              <td className="px-6 py-4">
                                <div className="font-bold text-slate-800">{item.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.sku}</div>
                              </td>
                              <td className="px-6 py-4 text-right font-medium text-slate-500">{item.currency} {item.price.toLocaleString()}</td>
                              <td className="px-6 py-4 text-right font-black text-slate-800">{item.stock}</td>
                              <td className="px-6 py-4 text-right font-bold text-indigo-600">{item.currency} {(item.price * item.stock).toLocaleString()}</td>
                              <td className="px-6 py-4 text-center">
                                {item.stock > item.minStock ? <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md font-bold">{t('table.inStock')}</span> :
                                 item.stock > 0 ? <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-1 rounded-md font-bold">{t('table.lowStock')}</span> :
                                 <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-1 rounded-md font-bold">{t('table.outOfStock')}</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: All Inventory */}
            {activeTab === 'inventory' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">{t('nav.inventory')} ({filteredInventory.length})</h3>
                    <button onClick={() => setActiveTab('add-stock')} className="text-xs font-bold bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">{t('dash.quickAdd')}</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                        <tr>
                          <th className="px-6 py-4">{t('table.itemInfo')}</th>
                          <th className="px-6 py-4">{t('form.category')}</th>
                          <th className="px-6 py-4 text-right">{t('table.unitPrice')}</th>
                          <th className="px-6 py-4 text-right">{t('table.qty')}</th>
                          <th className="px-6 py-4 text-right">{t('table.total')}</th>
                          <th className="px-6 py-4 text-center">{t('table.expiry')}</th>
                          <th className="px-6 py-4 text-center">{t('table.status')}</th>
                          <th className="px-6 py-4 text-center">{t('table.actions')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredInventory.length === 0 ? (
                          <tr>
                            <td colSpan="8" className="px-6 py-8 text-center text-slate-400">{t('expiryView.noItems')}</td>
                          </tr>
                        ) : (
                          filteredInventory.map(item => (
                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedItem(item)}>
                              <td className="px-6 py-4">
                                <div className="font-bold text-slate-800">{item.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.sku}</div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{item.category}</span>
                              </td>
                              <td className="px-6 py-4 text-right font-medium text-slate-500">{item.currency} {item.price.toLocaleString()}</td>
                              <td className="px-6 py-4 text-right font-black text-slate-800">{item.stock}</td>
                              <td className="px-6 py-4 text-right font-bold text-indigo-600">{item.currency} {(item.price * item.stock).toLocaleString()}</td>
                              <td className="px-6 py-4 text-center text-xs text-slate-500 font-medium">{item.expiryDate || '—'}</td>
                              <td className="px-6 py-4 text-center">
                                {item.stock > item.minStock ? <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md font-bold">{t('table.inStock')}</span> :
                                 item.stock > 0 ? <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-1 rounded-md font-bold">{t('table.lowStock')}</span> :
                                 <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-1 rounded-md font-bold">{t('table.outOfStock')}</span>}
                              </td>
                              <td className="px-6 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                <button 
                                  onClick={() => handleDeleteItem(item.id)} 
                                  className="text-rose-500 hover:text-rose-700 p-2 rounded-xl hover:bg-rose-50 transition-colors"
                                  title={t('table.delete')}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: Weekly Stock & Reorder Plan */}
            {activeTab === 'weekly' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Needs Reorder Card */}
                  <div className="bg-white p-6 rounded-[2rem] border border-rose-100 shadow-sm flex flex-col">
                    <h3 className="font-bold text-rose-800 flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-rose-500" />
                      {t('weekly.toReorder')} ({weeklyStockData.toReorder.length})
                    </h3>
                    <div className="space-y-4 max-h-[500px] overflow-auto flex-1">
                      {weeklyStockData.toReorder.length === 0 ? (
                        <p className="text-sm text-slate-400 p-4">{t('expiryView.noItems')}</p>
                      ) : (
                        weeklyStockData.toReorder.map(item => (
                          <div key={item.id} className="p-4 bg-rose-50/50 border border-rose-50 rounded-2xl space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                                <span className="text-[10px] text-slate-400 font-mono">{item.sku}</span>
                              </div>
                              <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-black">{t('weekly.current')} {item.stock} / Min {item.minStock}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <input 
                                type="number" 
                                min="0"
                                placeholder={t('weekly.actualStock')} 
                                className="w-28 px-3 py-1.5 bg-white border border-rose-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-rose-200"
                                value={stockUpdates[item.id] !== undefined ? stockUpdates[item.id] : ''}
                                onChange={(e) => setStockUpdates({...stockUpdates, [item.id]: e.target.value})}
                              />
                              <button 
                                onClick={() => handleActualStockUpdate(item.id)}
                                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors"
                              >
                                {t('weekly.updateBtn')}
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Healthy Stock Card */}
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      {t('weekly.healthy')} ({weeklyStockData.healthy.length})
                    </h3>
                    <div className="space-y-4 max-h-[500px] overflow-auto flex-1">
                      {weeklyStockData.healthy.map(item => (
                        <div key={item.id} className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                              <span className="text-[10px] text-slate-400 font-mono">{item.sku}</span>
                            </div>
                            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-black">{t('weekly.current')} {item.stock} / Target {item.maxStock}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <input 
                              type="number" 
                              min="0"
                              placeholder={t('weekly.actualStock')} 
                              className="w-28 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-100"
                              value={stockUpdates[item.id] !== undefined ? stockUpdates[item.id] : ''}
                              onChange={(e) => setStockUpdates({...stockUpdates, [item.id]: e.target.value})}
                            />
                            <button 
                              onClick={() => handleActualStockUpdate(item.id)}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors"
                            >
                              {t('weekly.updateBtn')}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: Suppliers Directory */}
            {activeTab === 'suppliers' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
                {/* Form Column */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm h-fit">
                  <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                    <PlusSquare className="w-5 h-5 text-indigo-500" />
                    {t('suppliers.addTitle')}
                  </h3>
                  <form onSubmit={handleAddSupplier} className="space-y-4">
                    <Input 
                      label={t('suppliers.name')} 
                      value={newSupplier.name} 
                      onChange={e => setNewSupplier({...newSupplier, name: e.target.value})} 
                      required
                    />
                    <Input 
                      label={t('suppliers.contact')} 
                      value={newSupplier.contact} 
                      onChange={e => setNewSupplier({...newSupplier, contact: e.target.value})} 
                    />
                    <Input 
                      label={t('suppliers.phone')} 
                      value={newSupplier.phone} 
                      onChange={e => setNewSupplier({...newSupplier, phone: e.target.value})} 
                    />
                    <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-md mt-4">
                      {t('suppliers.addBtn')}
                    </button>
                  </form>
                </div>

                {/* List Column */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-slate-800 mb-6">{t('suppliers.listTitle')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suppliers.length === 0 ? (
                      <p className="text-slate-400 col-span-2 text-sm">{t('suppliers.empty')}</p>
                    ) : (
                      suppliers.map(sup => (
                        <div key={sup.id} className="p-5 border border-slate-150 rounded-2xl hover:shadow-md transition-shadow relative group">
                          <h4 className="font-bold text-slate-800 text-base">{sup.name}</h4>
                          {sup.contact && (
                            <p className="text-xs text-slate-500 flex items-center gap-2 mt-2">
                              <UserCircle className="w-3.5 h-3.5" />
                              {sup.contact}
                            </p>
                          )}
                          {sup.phone && (
                            <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                              <Phone className="w-3.5 h-3.5" />
                              {sup.phone}
                            </p>
                          )}
                          <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => setEditingSupplier(sup)} 
                              className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: Invoices & Payments */}
            {activeTab === 'invoices' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {/* Year/Month filters and Subtab Selectors */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
                    <button 
                      onClick={() => setInvoiceSubTab('list')}
                      className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${invoiceSubTab === 'list' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      {t('invoices.tabList')}
                    </button>
                    <button 
                      onClick={() => setInvoiceSubTab('payments')}
                      className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${invoiceSubTab === 'payments' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      {t('invoices.tabPay')}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <select 
                      value={filterYear} 
                      onChange={(e) => setFilterYear(parseInt(e.target.value))}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                    </select>
                    <select 
                      value={filterMonth} 
                      onChange={(e) => setFilterMonth(parseInt(e.target.value))}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                    >
                      {MONTH_NAMES.map((name, index) => (
                        <option key={index} value={index + 1}>{lang === 'en' ? name : `${index + 1}月`}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('invoices.volume')}</p>
                    <h3 className="text-2xl font-black text-slate-800 mt-2">{currentMonthSummary.volume} ctn</h3>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('invoices.totalValue')}</p>
                    <h3 className="text-2xl font-black text-indigo-600 mt-2">${currentMonthSummary.valueUSD.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('invoices.unpaidTotal')}</p>
                    <h3 className="text-2xl font-black text-rose-600 mt-2">${currentMonthSummary.unpaidUSD.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                  </div>
                </div>

                {/* Subtab: Invoice List */}
                {invoiceSubTab === 'list' && (
                  <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                          <tr>
                            <th className="px-6 py-4">{t('invoices.tableInv')}</th>
                            <th className="px-6 py-4">{t('invoices.tableSup')}</th>
                            <th className="px-6 py-4">{t('invoices.tableDate')}</th>
                            <th className="px-6 py-4 text-right">{t('invoices.tableAmt')}</th>
                            <th className="px-6 py-4 text-center">{t('invoices.tableStatus')}</th>
                            <th className="px-6 py-4 text-center">{t('invoices.tableAction')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {filteredInvoices.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="px-6 py-8 text-center text-slate-400">{t('expiryView.noItems')}</td>
                            </tr>
                          ) : (
                            filteredInvoices.map(inv => (
                              <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-800 font-mono">{inv.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-700">{inv.supplier}</td>
                                <td className="px-6 py-4 text-slate-500 font-medium">{inv.date}</td>
                                <td className="px-6 py-4 text-right font-black text-slate-800">{inv.currency} {inv.total.toLocaleString()}</td>
                                <td className="px-6 py-4 text-center">
                                  {inv.status === 'Paid' ? (
                                    <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md font-bold">{t('invoices.paid')}</span>
                                  ) : (
                                    <span className="text-[10px] bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md font-bold">{t('invoices.unpaid')}</span>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <button 
                                    onClick={() => handleTogglePayment(inv.id)}
                                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${inv.status === 'Paid' ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                                  >
                                    {inv.status === 'Paid' ? t('invoices.markUnpaid') : t('invoices.markPaid')}
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Subtab: Supplier Payments */}
                {invoiceSubTab === 'payments' && (
                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-black text-slate-800 mb-6">{t('invoices.tabPay')}</h3>
                    {supplierBalances.length === 0 ? (
                      <div className="flex flex-col items-center py-10">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <p className="font-bold text-slate-700">{t('invoices.allPaid')}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {supplierBalances.map((bal, idx) => (
                          <div key={idx} className="p-6 border border-slate-150 rounded-[2rem] hover:shadow-md transition-shadow flex justify-between items-center">
                            <div className="space-y-1">
                              <h4 className="font-black text-slate-800 text-base">{bal.name}</h4>
                              <p className="text-xs font-medium text-slate-400">{bal.count} {t('invoices.invCount')}</p>
                              <p className="text-xs font-bold text-rose-600">{t('invoices.outBalance')}: ${bal.totalUSD.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                            </div>
                            <button 
                              onClick={() => {
                                // Pay all unpaid invoices for this supplier
                                bal.ids.forEach(id => handleTogglePayment(id));
                              }}
                              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-2xl transition-all"
                            >
                              {t('invoices.markPaid')}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* VIEW: Expiry Monitor */}
            {activeTab === 'expiry' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Expired Column */}
                  <div className="bg-rose-50/50 p-5 rounded-[2rem] border border-rose-100 flex flex-col min-h-[500px]">
                    <h4 className="font-bold text-rose-800 flex items-center justify-between mb-4">
                      <span>{t('expiryView.expired')}</span>
                      <span className="bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full font-black">{expiryData.expired.length}</span>
                    </h4>
                    <div className="space-y-3 flex-1 overflow-auto">
                      {expiryData.expired.length === 0 ? (
                        <div className="text-center text-xs text-rose-600/60 p-4 font-medium">{t('expiryView.noItems')}</div>
                      ) : (
                        expiryData.expired.map(item => (
                          <div key={item.id} className="bg-white p-4 rounded-2xl border border-rose-200/55 shadow-sm space-y-2 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedItem(item)}>
                            <h5 className="font-bold text-slate-800 text-xs">{item.name}</h5>
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-400 font-mono">{item.sku}</span>
                              <span className="text-rose-600 font-bold">{Math.abs(item.diff)} {t('expiryView.daysOver')}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Critical Column */}
                  <div className="bg-amber-50/50 p-5 rounded-[2rem] border border-amber-100 flex flex-col min-h-[500px]">
                    <h4 className="font-bold text-amber-800 flex items-center justify-between mb-4">
                      <span>{t('expiryView.critical')}</span>
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-black">{expiryData.critical.length}</span>
                    </h4>
                    <div className="space-y-3 flex-1 overflow-auto">
                      {expiryData.critical.length === 0 ? (
                        <div className="text-center text-xs text-amber-600/60 p-4 font-medium">{t('expiryView.noItems')}</div>
                      ) : (
                        expiryData.critical.map(item => (
                          <div key={item.id} className="bg-white p-4 rounded-2xl border border-amber-200/55 shadow-sm space-y-2 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedItem(item)}>
                            <h5 className="font-bold text-slate-800 text-xs">{item.name}</h5>
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-400 font-mono">{item.sku}</span>
                              <span className="text-amber-600 font-bold">{item.diff} {t('expiryView.daysLeft')}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Warning Column */}
                  <div className="bg-blue-50/30 p-5 rounded-[2rem] border border-blue-50 flex flex-col min-h-[500px]">
                    <h4 className="font-bold text-blue-800 flex items-center justify-between mb-4">
                      <span>{t('expiryView.warning')}</span>
                      <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full font-black">{expiryData.warning.length}</span>
                    </h4>
                    <div className="space-y-3 flex-1 overflow-auto">
                      {expiryData.warning.length === 0 ? (
                        <div className="text-center text-xs text-blue-600/60 p-4 font-medium">{t('expiryView.noItems')}</div>
                      ) : (
                        expiryData.warning.map(item => (
                          <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedItem(item)}>
                            <h5 className="font-bold text-slate-800 text-xs">{item.name}</h5>
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-400 font-mono">{item.sku}</span>
                              <span className="text-slate-500 font-medium">{item.diff} {t('expiryView.daysLeft')}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Safe Column */}
                  <div className="bg-emerald-50/30 p-5 rounded-[2rem] border border-emerald-55 flex flex-col min-h-[500px]">
                    <h4 className="font-bold text-emerald-800 flex items-center justify-between mb-4">
                      <span>{t('expiryView.safe')}</span>
                      <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-black">{expiryData.safe.length}</span>
                    </h4>
                    <div className="space-y-3 flex-1 overflow-auto">
                      {expiryData.safe.length === 0 ? (
                        <div className="text-center text-xs text-emerald-650 p-4 font-medium">{t('expiryView.noItems')}</div>
                      ) : (
                        expiryData.safe.map(item => (
                          <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedItem(item)}>
                            <h5 className="font-bold text-slate-800 text-xs">{item.name}</h5>
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-400 font-mono">{item.sku}</span>
                              <span className="text-emerald-600 font-bold">{item.diff} {t('expiryView.daysLeft')}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: Settings */}
            {activeTab === 'settings' && (
              <div className="flex flex-col md:flex-row gap-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
                {/* Settings Navigation Sidebar */}
                <div className="w-full md:w-64 shrink-0 space-y-2">
                   <button onClick={() => setSettingsTab('general')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${settingsTab === 'general' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                     <UserCircle className="w-5 h-5" /> {t('settings.tabs.general')}
                   </button>
                   <button onClick={() => setSettingsTab('prefs')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${settingsTab === 'prefs' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                     <Sliders className="w-5 h-5" /> {t('settings.tabs.prefs')}
                   </button>
                   <button onClick={() => setSettingsTab('notif')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${settingsTab === 'notif' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                     <BellRing className="w-5 h-5" /> {t('settings.tabs.notif')}
                   </button>
                   <button onClick={() => setSettingsTab('data')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${settingsTab === 'data' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}>
                     <Database className="w-5 h-5" /> {t('settings.tabs.data')}
                   </button>
                </div>

                {/* Settings Content Area */}
                <div className="flex-1 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm min-h-[500px] relative overflow-hidden">
                  
                  {/* General Profile Tab */}
                  {settingsTab === 'general' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 hover:bg-slate-50 cursor-pointer transition-colors">
                          <UserCircle className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-800">{t('settings.general.title')}</h3>
                          <p className="text-sm text-slate-400 font-medium">Manage your basic company information.</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label={t('settings.general.name')} defaultValue="Acme Global Inc." />
                        <Input label={t('settings.general.admin')} defaultValue="Felix Carter" />
                        <div className="md:col-span-2">
                          <Input label={t('settings.general.email')} type="email" defaultValue="admin@acmeglobal.com" />
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-slate-50">
                        <button className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-md">{t('settings.general.save')}</button>
                      </div>
                    </div>
                  )}

                  {/* Preferences Tab */}
                  {settingsTab === 'prefs' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                      <h3 className="text-lg font-black text-slate-800 mb-8">{t('settings.prefs.title')}</h3>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{t('settings.prefs.lang')}</label>
                          <select 
                            value={lang} 
                            onChange={(e) => setLang(e.target.value)}
                            className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-bold text-slate-800"
                          >
                            <option value="en">English (US)</option>
                            <option value="zh">简体中文 (Chinese)</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{t('settings.prefs.currency')}</label>
                          <select className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-bold text-slate-800">
                            <option value="USD">USD ($)</option>
                            <option value="CNY">CNY (¥)</option>
                            <option value="EUR">EUR (€)</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{t('settings.prefs.timezone')}</label>
                          <select className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-bold text-slate-800">
                            <option value="GMT-8">Pacific Time (PT)</option>
                            <option value="GMT+8">Beijing Time (CST)</option>
                            <option value="GMT+0">Greenwich Mean Time (GMT)</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-50">
                        <button className="bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-md">{t('settings.prefs.save')}</button>
                      </div>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {settingsTab === 'notif' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                      <h3 className="text-lg font-black text-slate-800 mb-8">{t('settings.notif.title')}</h3>
                      
                      <div className="space-y-4">
                        {/* Toggle Component */}
                        <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <div>
                            <p className="font-bold text-slate-800">{t('settings.notif.lowStock')}</p>
                            <p className="text-xs text-slate-400 font-medium mt-1">Alert when item count drops below minimum threshold.</p>
                          </div>
                          <div 
                            onClick={() => setNotifConfig({...notifConfig, lowStock: !notifConfig.lowStock})}
                            className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors duration-300 flex items-center px-1 ${notifConfig.lowStock ? 'bg-emerald-500' : 'bg-slate-300'}`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${notifConfig.lowStock ? 'translate-x-6' : 'translate-x-0'}`}></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <div>
                            <p className="font-bold text-slate-800">{t('settings.notif.expiry')}</p>
                            <p className="text-xs text-slate-400 font-medium mt-1">Warn before perishable items reach their expiration date.</p>
                          </div>
                          <div 
                            onClick={() => setNotifConfig({...notifConfig, expiry: !notifConfig.expiry})}
                            className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors duration-300 flex items-center px-1 ${notifConfig.expiry ? 'bg-emerald-500' : 'bg-slate-300'}`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${notifConfig.expiry ? 'translate-x-6' : 'translate-x-0'}`}></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <div>
                            <p className="font-bold text-slate-800">{t('settings.notif.emailDigest')}</p>
                            <p className="text-xs text-slate-400 font-medium mt-1">Receive a weekly summary of stock movements.</p>
                          </div>
                          <div 
                            onClick={() => setNotifConfig({...notifConfig, digest: !notifConfig.digest})}
                            className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors duration-300 flex items-center px-1 ${notifConfig.digest ? 'bg-emerald-500' : 'bg-slate-300'}`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${notifConfig.digest ? 'translate-x-6' : 'translate-x-0'}`}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Data Management Tab */}
                  {settingsTab === 'data' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                      <h3 className="text-lg font-black text-slate-800 mb-8">{t('settings.data.title')}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        <div className="p-6 border border-slate-200 rounded-[2rem] hover:shadow-md transition-shadow cursor-pointer group flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <DownloadCloud className="w-6 h-6" />
                          </div>
                          <h4 className="font-bold text-slate-800">{t('settings.data.export')}</h4>
                          <p className="text-xs text-slate-400 mt-2">Download all current inventory data as an excel sheet.</p>
                        </div>
                        <div className="p-6 border border-slate-200 rounded-[2rem] hover:shadow-md transition-shadow cursor-pointer group flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Database className="w-6 h-6" />
                          </div>
                          <h4 className="font-bold text-slate-800">{t('settings.data.backup')}</h4>
                          <p className="text-xs text-slate-400 mt-2">Force sync and save a snapshot to the cloud server.</p>
                        </div>
                      </div>

                      <div className="p-6 bg-rose-50 border border-rose-100 rounded-[2rem] relative overflow-hidden">
                        <div className="absolute right-0 top-0 opacity-10 translate-x-4 -translate-y-4">
                          <ShieldAlert className="w-32 h-32 text-rose-500" />
                        </div>
                        <h4 className="font-black text-rose-800 mb-2 relative z-10">{t('settings.data.danger')}</h4>
                        <p className="text-sm text-rose-600/80 mb-6 max-w-sm relative z-10">This action will wipe all inventory data, invoices, and suppliers permanently. This cannot be undone.</p>
                        <button className="bg-rose-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-rose-600 transition-colors shadow-md relative z-10">
                          {t('settings.data.reset')}
                        </button>
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>
            )}

            {/* VIEW: Add Stock Form (Optimized UI) */}
            {activeTab === 'add-stock' && (
              <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
                <form onSubmit={handleAddStock} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column: Item Specifications */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-50 rounded-full blur-2xl pointer-events-none"></div>
                      <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center"><PackagePlus className="w-5 h-5"/></div>
                        {t('form.singleStepTitle')}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <Input label={t('form.itemName')} name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                        
                        <div className="space-y-2 relative">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{t('form.category')}</label>
                          <div className="relative">
                            <input type="text" className="w-full pl-5 pr-10 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-medium text-slate-700 placeholder:text-slate-300" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} onFocus={() => setShowCatDropdown(true)} onBlur={() => setTimeout(() => setShowCatDropdown(false), 200)} placeholder={t('form.catPlaceholder')} />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><ChevronRight className="w-4 h-4 rotate-90" /></div>
                          </div>
                          {showCatDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                              {t('form.catOptions').map(opt => (
                                <div key={opt} className="px-5 py-2.5 text-sm hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors text-slate-600" onMouseDown={() => { setFormData({...formData, category: opt}); setShowCatDropdown(false); }}>{opt}</div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{t('form.currency')}</label>
                          <select className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-bold text-slate-800" value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})}>
                            <option value="USD">USD ($)</option>
                            <option value="CNY">CNY (¥)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="MYR">MYR (RM)</option>
                          </select>
                        </div>
                        
                        <Input label={t('form.price')} name="price" type="number" min="0" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                        <Input label={t('form.qty')} name="stock" type="number" min="0" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required placeholder="e.g. 100 ctn" />
                        <Input label={t('form.expiryDate')} name="expiryDate" type="date" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Supplier & Invoice */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                      <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-indigo-500" /> Logistics Info
                      </h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{t('form.selectSupplier')}</label>
                          <select className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 transition-all outline-none font-bold text-slate-800" value={formData.supplierName} onChange={(e) => setFormData({...formData, supplierName: e.target.value})} required>
                            <option value="" disabled>{t('form.noSupplier')}</option>
                            {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                          </select>
                        </div>
                        <Input label={t('form.invoice')} name="invoice" value={formData.invoice} onChange={(e) => setFormData({...formData, invoice: e.target.value})} placeholder="INV-2026-..." required />
                      </div>

                      {/* Preview calculation */}
                      <div className="mt-8 pt-6 border-t border-slate-50">
                         <div className="flex justify-between items-end">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('form.preview')}</p>
                              <p className="text-2xl font-black text-indigo-600 mt-1">
                                {formData.currency} {((parseFloat(formData.price)||0) * (parseInt(formData.stock)||0)).toLocaleString()}
                              </p>
                            </div>
                         </div>
                      </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white py-4 rounded-[1.5rem] font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2">
                      {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Save className="w-5 h-5" />}
                      {t('form.btnSubmit')}
                    </button>
                  </div>

                </form>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] p-10 flex flex-col items-center max-w-xs w-full shadow-2xl">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-black text-slate-800">{t('form.success')}</h4>
            <p className="text-slate-400 text-center text-sm mt-2">{t('form.successDesc')}</p>
          </div>
        </div>
      )}

      {/* Edit Supplier Modal */}
      {editingSupplier && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><Edit2 className="w-5 h-5 text-indigo-500" /> {t('suppliers.editTitle')}</h3>
              <button onClick={() => setEditingSupplier(null)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <form onSubmit={handleUpdateSupplier} className="space-y-4">
                <Input label={t('suppliers.name')} value={editingSupplier.name} onChange={e => setEditingSupplier({...editingSupplier, name: e.target.value})} required/>
                <Input label={t('suppliers.contact')} value={editingSupplier.contact} onChange={e => setEditingSupplier({...editingSupplier, contact: e.target.value})}/>
                <Input label={t('suppliers.phone')} value={editingSupplier.phone} onChange={e => setEditingSupplier({...editingSupplier, phone: e.target.value})}/>
                <div className="pt-4">
                  <button type="submit" className="w-full bg-indigo-600 text-white py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-md">{t('suppliers.updateBtn')}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><PackagePlus className="w-5 h-5 text-indigo-500" /> {lang === 'en' ? 'Item Details' : '物料详情'}</h3>
              <button onClick={() => setSelectedItem(null)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('form.itemName')}</p>
                <p className="text-xl font-black text-slate-800">{selectedItem.name}</p>
                <p className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded inline-block mt-2">{selectedItem.sku}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('table.qty')}</p>
                  <p className="text-lg font-black text-indigo-600">{selectedItem.stock} <span className="text-xs text-slate-400">ctn</span></p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('table.unitPrice')}</p>
                  <p className="text-lg font-bold text-slate-700">{selectedItem.currency} {selectedItem.price.toLocaleString()}</p>
                </div>
                <div className="col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('form.selectSupplier')}</p>
                   <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><Truck className="w-4 h-4 text-slate-400"/>{selectedItem.supplier || 'N/A'}</p>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 mt-3">{t('form.invoice')}</p>
                   <p className="text-sm font-bold text-slate-700 flex items-center gap-2"><FileText className="w-4 h-4 text-slate-400"/>{selectedItem.invoice || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// --- 组件复用助手 ---
function NavButton({ icon, label, active, onClick, badge, badgeColor = "bg-indigo-600 text-white" }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${active ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
      <div className="flex items-center gap-3">
        <span className={`${active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      {badge && <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${badgeColor}`}>{badge}</span>}
    </button>
  );
}

function Legend({ color, label, value }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 font-medium text-slate-500">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
        <span className="truncate max-w-[100px]" title={label}>{label}</span>
      </div>
      <span className="font-bold text-slate-800">{value}</span>
    </div>
  );
}

function Input({ label, type = "text", ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
      <input 
        type={type} 
        {...props} 
        className="w-full px-5 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-100 transition-all outline-none placeholder:text-slate-300" 
      />
    </div>
  );
}