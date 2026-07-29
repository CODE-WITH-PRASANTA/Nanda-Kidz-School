import React, { useState, useMemo, useEffect, useRef } from 'react';
import './Shop.css';

/* ---------------------------------------------------------
   Icons (inline SVG, no external dependency)
--------------------------------------------------------- */
const Icon = {
  Bag: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6 7h12l1 13H5L6 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 7a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  ),
  Layers: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="m3 13 9 5 9-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
  ),
  Box: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="m3.5 7.5 8.5-4 8.5 4-8.5 4-8.5-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M3.5 7.5v9l8.5 4 8.5-4v-9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 11.5v9" stroke="currentColor" strokeWidth="1.8"/></svg>
  ),
  Rupee: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M7 5h10M7 9h10M7 5c4 0 6 1.5 6 4s-2 4-6 4h-1l7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  Alert: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M10.3 3.9 2.6 17a1.6 1.6 0 0 0 1.4 2.5h16a1.6 1.6 0 0 0 1.4-2.5L13.7 3.9a1.6 1.6 0 0 0-2.8 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 9.5v4M12 16.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  ),
  Filter: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  ),
  Grid: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  Eye: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>
  ),
  Edit: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
  ),
  Trash: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.8 12.1A2 2 0 0 1 14.2 21H9.8a2 2 0 0 1-2-1.9L7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  Chevron: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  ArrowLeft: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="m5 5 14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}><path d="m4 12 5 5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
};

/* ---------------------------------------------------------
   Category palette — any category (built-in or user-added)
   picks one of these colors. Each has matching CSS classes:
   shop-icon-{color}, shop-badge-{color}
--------------------------------------------------------- */
const CATEGORY_COLORS = ['purple', 'blue', 'green', 'indigo', 'red', 'orange', 'slate', 'gray', 'teal', 'amber', 'pink'];

const INITIAL_CATEGORIES = [
  { id: 'bags', name: 'Bags', color: 'purple' },
  { id: 'uniform', name: 'Uniform', color: 'blue' },
  { id: 'shoes', name: 'Shoes', color: 'slate' },
  { id: 'stationery', name: 'Stationery', color: 'green' },
  { id: 'books', name: 'Books', color: 'indigo' },
  { id: 'accessories', name: 'Accessories', color: 'red' },
  { id: 'sport', name: 'Sport Items', color: 'orange' },
  { id: 'others', name: 'Others', color: 'gray' },
];

/* Counts used only to seed the demo catalog below (sum = 128) */
const SEED_COUNTS = { bags: 15, uniform: 20, shoes: 12, stationery: 28, books: 10, accessories: 8, sport: 12, others: 23 };

const NAME_TEMPLATES = {
  bags: ['School Backpack', 'Trolley Bag', 'Lunch Bag', 'Sling Bag', 'Duffel Bag'],
  uniform: ['School Uniform (Set)', 'PE Uniform', 'Winter Sweater', 'Tie & Belt Set', 'Uniform Shirt', 'White School Socks (Pair)'],
  shoes: ['Black School Shoes', 'White Sports Shoes', 'School Sandals', 'Canvas Shoes'],
  stationery: ['School Notebook (Pack)', 'Geometry Box', 'Pencil Box', 'Sketch Pens', 'Crayons Set', 'Ruler Set', 'Eraser Pack', 'Sharpener'],
  books: ['Drawing Book', 'Practice Notebook', 'Story Book', 'Dictionary', 'School Atlas'],
  accessories: ['Water Bottle', 'Lunch Box', 'ID Card Holder', 'School Badge', 'Name Tag'],
  sport: ['Cricket Bat', 'Football', 'Skipping Rope', 'Badminton Racket'],
  others: ['Raincoat', 'Umbrella', 'Hand Sanitizer', 'Face Mask (Pack)', 'Handkerchief Set'],
};

const SKU_PREFIX = { bags: 'BAG', uniform: 'UNI', shoes: 'SHO', stationery: 'STA', books: 'BK', accessories: 'ACC', sport: 'SPT', others: 'OTH' };

/* Exact items that reproduce the reference screenshot's first page */
const SEED_PRODUCTS = [
  { id: 'p1', name: 'School Backpack', desc: 'Durable school bag', tag: 'Featured', sku: 'BAG001', category: 'bags', type: 'Physical', price: 899, stock: 45, status: 'Active' },
  { id: 'p2', name: 'School Uniform (Set)', desc: 'Shirt + Pant/Skirt', tag: 'Best Seller', sku: 'UNI001', category: 'uniform', type: 'Variable', price: 650, stock: 32, status: 'Active' },
  { id: 'p3', name: 'School Notebook (Pack)', desc: 'Pack of 5 notebooks', tag: '', sku: 'NOT001', category: 'stationery', type: 'Physical', price: 120, stock: 120, status: 'Active' },
  { id: 'p4', name: 'Water Bottle', desc: '750ml, BPA Free', tag: '', sku: 'WB001', category: 'accessories', type: 'Physical', price: 250, stock: 18, status: 'Active' },
  { id: 'p5', name: 'Black School Shoes', desc: 'Comfortable & Durable', tag: '', sku: 'SHO001', category: 'shoes', type: 'Variable', price: 499, stock: 0, status: 'Inactive' },
  { id: 'p6', name: 'White School Socks (Pair)', desc: 'Cotton socks', tag: '', sku: 'SOC001', category: 'uniform', type: 'Physical', price: 60, stock: 75, status: 'Active' },
  { id: 'p7', name: 'Geometry Box', desc: 'Complete Geometry Set', tag: '', sku: 'ST002', category: 'stationery', type: 'Physical', price: 180, stock: 33, status: 'Active' },
  { id: 'p8', name: 'Drawing Book', desc: 'A4 Size, 20 Pages', tag: '', sku: 'BK001', category: 'books', type: 'Physical', price: 40, stock: 60, status: 'Active' },
];

/* Deterministic generator to fill remaining demo products up to each seed category's count */
function generateCatalog() {
  const used = { bags: 1, uniform: 2, shoes: 1, stationery: 2, accessories: 1, books: 1, sport: 0, others: 0 };
  const list = [...SEED_PRODUCTS];
  let n = 0;
  INITIAL_CATEGORIES.forEach((cat) => {
    const total = SEED_COUNTS[cat.id] || 0;
    const already = used[cat.id] || 0;
    const remaining = total - already;
    const templates = NAME_TEMPLATES[cat.id];
    for (let i = 0; i < remaining; i++) {
      n += 1;
      const idx = (i + already) % templates.length;
      const suffixNum = Math.floor((i + already) / templates.length) + 1;
      const name = suffixNum > 1 ? `${templates[idx]} ${suffixNum}` : templates[idx];
      const price = 30 + ((n * 37) % 900);
      const stock = (n * 11) % 140;
      const status = n % 9 === 0 ? 'Inactive' : 'Active';
      const type = cat.id === 'uniform' || cat.id === 'shoes' ? (n % 3 === 0 ? 'Variable' : 'Physical') : 'Physical';
      list.push({
        id: `gen-${cat.id}-${i}`,
        name,
        desc: `${cat.name} item`,
        tag: '',
        sku: `${SKU_PREFIX[cat.id]}${String(already + i + 1).padStart(3, '0')}`,
        category: cat.id,
        type,
        price,
        stock,
        status,
      });
    }
  });
  return list;
}

const ALL_PRODUCTS = generateCatalog();

const STATS = [
  { key: 'total', label: 'Total Products', value: '128', sub: '↑ 12 this month', icon: 'Bag', color: 'purple' },
  { key: 'categories', label: 'Categories', value: '8', sub: 'Active categories', icon: 'Layers', color: 'green' },
  { key: 'orders', label: 'Total Orders', value: '356', sub: '↑ 18 this month', icon: 'Box', color: 'blue' },
  { key: 'sales', label: 'Total Sales', value: '₹1,24,560', sub: '↑ 24% this month', icon: 'Rupee', color: 'orange' },
  { key: 'lowstock', label: 'Low Stock Items', value: '14', sub: 'Need attention', icon: 'Alert', color: 'pink' },
];

const PAGE_SIZE = 8;
const VISIBLE_CATEGORY_LIMIT = 6;

const stockStatus = (stock) => {
  if (stock === 0) return 'out';
  if (stock <= 20) return 'low';
  return 'in';
};

const currency = (n) => `₹${n.toLocaleString('en-IN')}`;

const slugify = (name) => name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `category-${Date.now()}`;

/* ---------------------------------------------------------
   Main component
--------------------------------------------------------- */
const Shop = () => {
  const [products, setProducts] = useState(ALL_PRODUCTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [bulkAction, setBulkAction] = useState('');
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isApplyingBulk, setIsApplyingBulk] = useState(false);

  const dropdownRef = useRef(null);
  const headerCheckboxRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 2600);
  };

  /* ---------------- filtering / sorting ---------------- */
  const filtered = useMemo(() => {
    let list = [...products];

    if (activeTab === 'lowstock') list = list.filter((p) => stockStatus(p.stock) === 'low');
    if (activeTab === 'outofstock') list = list.filter((p) => stockStatus(p.stock) === 'out');

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    if (categoryFilter !== 'all') list = list.filter((p) => p.category === categoryFilter);
    if (typeFilter !== 'all') list = list.filter((p) => p.type === typeFilter);
    if (statusFilter !== 'all') list = list.filter((p) => p.status === statusFilter);

    switch (sortBy) {
      case 'price_low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'stock':
        list.sort((a, b) => b.stock - a.stock);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break; // newest = insertion order
    }
    return list;
  }, [products, activeTab, search, categoryFilter, typeFilter, statusFilter, sortBy]);

  const activeFilterCount = [
    search.trim() !== '',
    categoryFilter !== 'all',
    typeFilter !== 'all',
    statusFilter !== 'all',
    sortBy !== 'newest',
  ].filter(Boolean).length;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => setPage(1), [activeTab, search, categoryFilter, typeFilter, statusFilter, sortBy]);

  /* ---------------- category counts (live, derived from products) ---------------- */
  const categoryCounts = useMemo(() => {
    const map = {};
    products.forEach((p) => { map[p.category] = (map[p.category] || 0) + 1; });
    return map;
  }, [products]);

  const summary = useMemo(() => ({
    total: products.length,
    active: products.filter((p) => p.status === 'Active').length,
    inactive: products.filter((p) => p.status === 'Inactive').length,
    outOfStock: products.filter((p) => stockStatus(p.stock) === 'out').length,
    lowStock: products.filter((p) => stockStatus(p.stock) === 'low').length,
  }), [products]);

  /* ---------------- selection / bulk actions ---------------- */
  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAllOnPage = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      const allSelected = pageItems.every((p) => next.has(p.id));
      pageItems.forEach((p) => (allSelected ? next.delete(p.id) : next.add(p.id)));
      return next;
    });
  };

  const selectAllFiltered = () => {
    setSelected(new Set(filtered.map((p) => p.id)));
    showToast(`${filtered.length} product(s) selected`);
  };

  const clearSelection = () => {
    setSelected(new Set());
  };

  useEffect(() => {
    if (!headerCheckboxRef.current) return;
    const someSelected = pageItems.some((p) => selected.has(p.id));
    const allSelected = pageItems.length > 0 && pageItems.every((p) => selected.has(p.id));
    headerCheckboxRef.current.indeterminate = someSelected && !allSelected;
  }, [selected, pageItems]);

  const handleDelete = (product) => {
    if (!window.confirm(`Delete "${product.name}"? This action cannot be undone.`)) return;
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    setSelected((prev) => { const n = new Set(prev); n.delete(product.id); return n; });
    showToast(`"${product.name}" deleted`, 'danger');
  };

  const handleSaveEdit = (updated) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditProduct(null);
    showToast(`"${updated.name}" updated`);
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [{ ...newProduct, id: `new-${Date.now()}` }, ...prev]);
    setShowAddModal(false);
    showToast(`"${newProduct.name}" added`);
  };

  const handleAddCategory = ({ name, color }) => {
    const trimmed = name.trim();
    if (!trimmed) { showToast('Category name is required', 'danger'); return; }
    const id = slugify(trimmed);
    if (categories.some((c) => c.id === id)) {
      showToast('That category already exists', 'danger');
      return;
    }
    setCategories((prev) => [...prev, { id, name: trimmed, color }]);
    setShowAddCategoryModal(false);
    setShowAllCategories(true);
    showToast(`"${trimmed}" category added`);
  };

  const applyBulkAction = () => {
    if (isApplyingBulk) return; // guard against double-clicks
    if (!bulkAction) { showToast('Select a bulk action first', 'danger'); return; }
    if (selected.size === 0) { showToast('Select at least one product', 'danger'); return; }

    if (bulkAction === 'delete' && !window.confirm(`Delete ${selected.size} selected product(s)? This cannot be undone.`)) {
      return;
    }

    const count = selected.size;
    const ids = selected;
    setIsApplyingBulk(true);

    // brief, visible "applying" state so the action reads as real work, not an instant no-op
    window.setTimeout(() => {
      if (bulkAction === 'delete') {
        setProducts((prev) => prev.filter((p) => !ids.has(p.id)));
        showToast(`${count} product(s) deleted`, 'danger');
      } else if (bulkAction === 'activate') {
        setProducts((prev) => prev.map((p) => (ids.has(p.id) ? { ...p, status: 'Active' } : p)));
        showToast(`${count} product(s) activated`);
      } else if (bulkAction === 'deactivate') {
        setProducts((prev) => prev.map((p) => (ids.has(p.id) ? { ...p, status: 'Inactive' } : p)));
        showToast(`${count} product(s) deactivated`);
      }
      setSelected(new Set());
      setBulkAction('');
      setIsApplyingBulk(false);
    }, 450);
  };

  const resetFilters = () => {
    setSearch(''); setCategoryFilter('all'); setTypeFilter('all'); setStatusFilter('all'); setSortBy('newest');
    showToast('Filters reset');
  };

  const pageNumbers = useMemo(() => {
    const nums = [];
    const span = 1;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - span && i <= currentPage + span)) nums.push(i);
      else if (nums[nums.length - 1] !== '...') nums.push('...');
    }
    return nums;
  }, [totalPages, currentPage]);

  const visibleCategories = showAllCategories ? categories : categories.slice(0, VISIBLE_CATEGORY_LIMIT);
  const hasMoreCategories = categories.length > VISIBLE_CATEGORY_LIMIT;

  return (
    <div className="shop-page">
      {/* ---------- Stat cards ---------- */}
      <div className="shop-stats">
        {STATS.map((s) => {
          const IconCmp = Icon[s.icon];
          return (
            <div className="shop-stat-card" key={s.key}>
              <div className={`shop-stat-icon shop-icon-${s.color}`}><IconCmp className="shop-icon" /></div>
              <div className="shop-stat-body">
                <p className="shop-stat-label">{s.label}</p>
                <p className="shop-stat-value">{s.value}</p>
                <p className={`shop-stat-sub ${s.sub.startsWith('↑') ? 'up' : ''}`}>{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="shop-layout">
        {/* ---------- Main column ---------- */}
        <div className="shop-main">
          {/* Tabs + Add button */}
          <div className="shop-tabs-row">
            <div className="shop-tabs">
              {[
                { id: 'all', label: 'All Products' },
                { id: 'lowstock', label: 'Low Stock' },
                { id: 'outofstock', label: 'Out of Stock' },
              ].map((t) => (
                <button
                  key={t.id}
                  className={`shop-tab ${activeTab === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="shop-tabs-actions">
              <button className="shop-btn shop-btn-icon" onClick={() => showToast('Grid view coming soon')} aria-label="Grid view">
                <Icon.Grid className="shop-icon-sm" />
              </button>
              <button className="shop-btn shop-btn-primary" onClick={() => setShowAddModal(true)}>
                <Icon.Plus className="shop-icon-sm" /> Add New Product
              </button>
            </div>
          </div>

          {/* Toolbar / Filters */}
          <div className="shop-toolbar" ref={dropdownRef}>
            <div className="shop-search">
              <Icon.Search className="shop-icon-sm" />
              <input
                type="text"
                placeholder="Search by product name, SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Dropdown
              label={categoryFilter === 'all' ? 'All Categories' : categories.find((c) => c.id === categoryFilter)?.name}
              isOpen={openDropdown === 'category'}
              onToggle={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
              options={[{ value: 'all', label: 'All Categories' }, ...categories.map((c) => ({ value: c.id, label: `${c.name} (${categoryCounts[c.id] || 0})` }))]}
              value={categoryFilter}
              onSelect={(v) => { setCategoryFilter(v); setOpenDropdown(null); }}
            />
            <Dropdown
              label={typeFilter === 'all' ? 'All Types' : typeFilter}
              isOpen={openDropdown === 'type'}
              onToggle={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
              options={[{ value: 'all', label: 'All Types' }, { value: 'Physical', label: 'Physical' }, { value: 'Variable', label: 'Variable' }]}
              value={typeFilter}
              onSelect={(v) => { setTypeFilter(v); setOpenDropdown(null); }}
            />
            <Dropdown
              label={statusFilter === 'all' ? 'Status' : statusFilter}
              isOpen={openDropdown === 'status'}
              onToggle={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
              options={[{ value: 'all', label: 'All Status' }, { value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]}
              value={statusFilter}
              onSelect={(v) => { setStatusFilter(v); setOpenDropdown(null); }}
            />
            <Dropdown
              label={`Sort By: ${{ newest: 'Newest', price_low: 'Price: Low-High', price_high: 'Price: High-Low', stock: 'Stock', name: 'Name' }[sortBy]}`}
              isOpen={openDropdown === 'sort'}
              onToggle={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
              options={[
                { value: 'newest', label: 'Newest' },
                { value: 'price_low', label: 'Price: Low-High' },
                { value: 'price_high', label: 'Price: High-Low' },
                { value: 'stock', label: 'Stock' },
                { value: 'name', label: 'Name' },
              ]}
              value={sortBy}
              onSelect={(v) => { setSortBy(v); setOpenDropdown(null); }}
            />

            <button className="shop-btn shop-btn-filter" onClick={resetFilters} title="Reset all filters">
              <Icon.Filter className="shop-icon-sm" /> Filter
              {activeFilterCount > 0 && <span className="shop-filter-count">{activeFilterCount}</span>}
            </button>
          </div>

          {activeFilterCount > 0 && (
            <div className="shop-active-filters">
              <span className="shop-muted small">
                Showing {filtered.length} of {products.length} products
                {categoryFilter !== 'all' && <> in <strong>{categories.find((c) => c.id === categoryFilter)?.name}</strong></>}
              </span>
              <button className="shop-clear-filters" onClick={resetFilters}>Clear all</button>
            </div>
          )}

          {/* Table (desktop) */}
          <div className="shop-table-wrap">
            <table className="shop-table">
              <thead>
                <tr>
                  <th className="shop-col-check">
                    <input
                      ref={headerCheckboxRef}
                      type="checkbox"
                      checked={pageItems.length > 0 && pageItems.every((p) => selected.has(p.id))}
                      onChange={toggleSelectAllOnPage}
                    />
                  </th>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th className="shop-col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.length === 0 && (
                  <tr><td colSpan={9} className="shop-empty">No products match your filters. <button className="shop-link-btn inline" onClick={resetFilters}>Clear filters</button></td></tr>
                )}
                {pageItems.map((p) => {
                  const st = stockStatus(p.stock);
                  const cat = categories.find((c) => c.id === p.category);
                  return (
                    <tr key={p.id} className={selected.has(p.id) ? 'is-selected' : ''}>
                      <td>
                        <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} />
                      </td>
                      <td>
                        <div className="shop-product-cell">
                          <div className={`shop-product-thumb shop-icon-${cat?.color || 'gray'}`}>{p.name.charAt(0)}</div>
                          <div>
                            <p className="shop-product-name">{p.name}</p>
                            <p className="shop-product-desc">{p.desc}</p>
                            {p.tag && <span className="shop-product-tag">{p.tag}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="shop-muted">{p.sku}</td>
                      <td><span className={`shop-badge shop-badge-${cat?.color || 'gray'}`}>{cat?.name || 'Uncategorized'}</span></td>
                      <td><span className={`shop-badge ${p.type === 'Variable' ? 'shop-badge-amber' : 'shop-badge-teal'}`}>{p.type}</span></td>
                      <td className="shop-price">{currency(p.price)}</td>
                      <td>
                        <span className={`shop-stock shop-stock-${st}`}>{p.stock}</span>
                        <p className={`shop-stock-label shop-stock-label-${st}`}>
                          {st === 'out' ? 'Out of Stock' : st === 'low' ? 'Low Stock' : 'In Stock'}
                        </p>
                      </td>
                      <td>
                        <span className={`shop-status shop-status-${p.status.toLowerCase()}`}>
                          <i /> {p.status}
                        </span>
                      </td>
                      <td>
                        <div className="shop-row-actions">
                          <button className="shop-action-btn view" onClick={() => setViewProduct(p)} aria-label={`View ${p.name}`}><Icon.Eye className="shop-icon-sm" /></button>
                          <button className="shop-action-btn edit" onClick={() => setEditProduct(p)} aria-label={`Edit ${p.name}`}><Icon.Edit className="shop-icon-sm" /></button>
                          <button className="shop-action-btn delete" onClick={() => handleDelete(p)} aria-label={`Delete ${p.name}`}><Icon.Trash className="shop-icon-sm" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Card list (mobile) */}
          <div className="shop-card-list">
            {pageItems.length === 0 && (
              <div className="shop-empty">No products match your filters. <button className="shop-link-btn inline" onClick={resetFilters}>Clear filters</button></div>
            )}
            {pageItems.map((p) => {
              const st = stockStatus(p.stock);
              const cat = categories.find((c) => c.id === p.category);
              return (
                <div className={`shop-product-card ${selected.has(p.id) ? 'is-selected' : ''}`} key={p.id}>
                  <div className="shop-product-card-top">
                    <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} />
                    <div className={`shop-product-thumb shop-icon-${cat?.color || 'gray'}`}>{p.name.charAt(0)}</div>
                    <div className="shop-product-card-info">
                      <p className="shop-product-name">{p.name}</p>
                      <p className="shop-product-desc">{p.sku} · {cat?.name || 'Uncategorized'}</p>
                    </div>
                    <span className={`shop-status shop-status-${p.status.toLowerCase()}`}><i /> {p.status}</span>
                  </div>
                  <div className="shop-product-card-mid">
                    <span className="shop-price">{currency(p.price)}</span>
                    <span className={`shop-stock-label shop-stock-label-${st}`}>
                      {p.stock} · {st === 'out' ? 'Out of Stock' : st === 'low' ? 'Low Stock' : 'In Stock'}
                    </span>
                  </div>
                  <div className="shop-row-actions end">
                    <button className="shop-action-btn view" onClick={() => setViewProduct(p)}><Icon.Eye className="shop-icon-sm" /></button>
                    <button className="shop-action-btn edit" onClick={() => setEditProduct(p)}><Icon.Edit className="shop-icon-sm" /></button>
                    <button className="shop-action-btn delete" onClick={() => handleDelete(p)}><Icon.Trash className="shop-icon-sm" /></button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer / Pagination */}
          <div className="shop-table-footer">
            <p className="shop-muted">
              Showing {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} to{' '}
              {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} products
            </p>
            <div className="shop-pagination">
              <button className="shop-page-btn" disabled={currentPage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <Icon.ArrowLeft className="shop-icon-sm" />
              </button>
              {pageNumbers.map((n, i) =>
                n === '...' ? (
                  <span className="shop-page-ellipsis" key={`e${i}`}>…</span>
                ) : (
                  <button
                    key={n}
                    className={`shop-page-btn ${n === currentPage ? 'active' : ''}`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                )
              )}
              <button className="shop-page-btn" disabled={currentPage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                <Icon.ArrowRight className="shop-icon-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* ---------- Sidebar ---------- */}
        <aside className="shop-sidebar">
          <div className="shop-panel">
            <div className="shop-panel-header">
              <h3>Product Categories</h3>
              <button className="shop-link-btn" onClick={() => setShowAddCategoryModal(true)}>
                <Icon.Plus className="shop-icon-xs" /> Add Category
              </button>
            </div>
            <ul className="shop-category-list">
              <li>
                <button
                  className={`shop-category-item ${categoryFilter === 'all' ? 'active' : ''}`}
                  onClick={() => { setCategoryFilter('all'); setActiveTab('all'); }}
                >
                  <span className="shop-category-dot shop-icon-purple" />
                  <span className="shop-category-name">All Categories</span>
                  <span className="shop-category-count">{products.length}</span>
                </button>
              </li>
              {visibleCategories.map((c) => (
                <li key={c.id}>
                  <button
                    className={`shop-category-item ${categoryFilter === c.id ? 'active' : ''}`}
                    onClick={() => { setCategoryFilter(categoryFilter === c.id ? 'all' : c.id); setActiveTab('all'); }}
                  >
                    <span className={`shop-category-dot shop-icon-${c.color}`} />
                    <span className="shop-category-name">{c.name}</span>
                    <span className="shop-category-count">{categoryCounts[c.id] || 0}</span>
                  </button>
                </li>
              ))}
            </ul>
            {(hasMoreCategories || showAllCategories) && (
              <button className="shop-view-all-btn" onClick={() => setShowAllCategories((v) => !v)}>
                {showAllCategories ? 'Show Less' : `View All Categories (${categories.length})`}
              </button>
            )}
          </div>

          <div className="shop-panel">
            <h3>Quick Summary</h3>
            <ul className="shop-summary-list">
              <li><span className="shop-dot purple" />Total Products<span>{summary.total}</span></li>
              <li><span className="shop-dot green" />Active Products<span>{summary.active}</span></li>
              <li><span className="shop-dot red" />Inactive Products<span>{summary.inactive}</span></li>
              <li><span className="shop-dot rose" />Out of Stock<span>{summary.outOfStock}</span></li>
              <li><span className="shop-dot orange" />Low Stock<span>{summary.lowStock}</span></li>
            </ul>
          </div>

          <div className="shop-panel">
            <h3>Bulk Actions</h3>
            <p className={`shop-muted small ${selected.size > 0 ? 'has-selection' : ''}`}>
              {selected.size > 0 ? `${selected.size} product(s) selected` : 'No products selected'}
            </p>
            <div className="shop-bulk-links">
              <button className="shop-link-btn" onClick={selectAllFiltered} disabled={filtered.length === 0 || isApplyingBulk}>
                Select all {filtered.length}
              </button>
              <button className="shop-link-btn muted" onClick={clearSelection} disabled={selected.size === 0 || isApplyingBulk}>
                Clear
              </button>
            </div>
            <select
              className="shop-native-select"
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              disabled={isApplyingBulk}
            >
              <option value="">Select Action</option>
              <option value="activate">Activate</option>
              <option value="deactivate">Deactivate</option>
              <option value="delete">Delete</option>
            </select>

            {selected.size === 0 && (
              <p className="shop-bulk-hint">Tick the checkbox next to any product (or "Select all") to enable bulk actions.</p>
            )}

            <button
              className={`shop-btn shop-btn-primary shop-btn-full ${isApplyingBulk ? 'is-loading' : ''}`}
              onClick={applyBulkAction}
              disabled={selected.size === 0 || !bulkAction || isApplyingBulk}
            >
              {isApplyingBulk ? (
                <><span className="shop-spinner" /> Applying…</>
              ) : (
                <>Apply {selected.size > 0 ? `(${selected.size})` : ''}</>
              )}
            </button>
          </div>
        </aside>
      </div>

      {/* ---------- Modals ---------- */}
      {viewProduct && <ViewModal product={viewProduct} category={categories.find((c) => c.id === viewProduct.category)} onClose={() => setViewProduct(null)} />}
      {editProduct && <EditModal product={editProduct} categories={categories} onClose={() => setEditProduct(null)} onSave={handleSaveEdit} />}
      {showAddModal && <EditModal isNew categories={categories} onClose={() => setShowAddModal(false)} onSave={handleAddProduct} />}
      {showAddCategoryModal && <AddCategoryModal existingIds={categories.map((c) => c.id)} onClose={() => setShowAddCategoryModal(false)} onSave={handleAddCategory} />}

      {/* ---------- Toast ---------- */}
      {toast && (
        <div className={`shop-toast shop-toast-${toast.type}`}>
          <Icon.Check className="shop-icon-sm" /> {toast.msg}
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------
   Dropdown
--------------------------------------------------------- */
const Dropdown = ({ label, options, value, onSelect, isOpen, onToggle }) => (
  <div className="shop-dropdown">
    <button className="shop-dropdown-btn" onClick={onToggle}>
      <span>{label}</span>
      <Icon.Chevron className="shop-icon-xs" />
    </button>
    {isOpen && (
      <div className="shop-dropdown-menu">
        {options.map((o) => (
          <button
            key={o.value}
            className={`shop-dropdown-option ${value === o.value ? 'active' : ''}`}
            onClick={() => onSelect(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    )}
  </div>
);

/* ---------------------------------------------------------
   View modal
--------------------------------------------------------- */
const ViewModal = ({ product, category, onClose }) => {
  const st = stockStatus(product.stock);
  return (
    <div className="shop-modal-overlay" onMouseDown={onClose}>
      <div className="shop-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="shop-modal-header">
          <h3>Product Details</h3>
          <button className="shop-icon-close" onClick={onClose}><Icon.Close className="shop-icon-sm" /></button>
        </div>
        <div className="shop-modal-body">
          <div className="shop-view-top">
            <div className={`shop-product-thumb lg shop-icon-${category?.color || 'gray'}`}>{product.name.charAt(0)}</div>
            <div>
              <p className="shop-view-name">{product.name}</p>
              <p className="shop-product-desc">{product.desc}</p>
            </div>
          </div>
          <div className="shop-view-grid">
            <div><span>SKU</span><p>{product.sku}</p></div>
            <div><span>Category</span><p>{category?.name || 'Uncategorized'}</p></div>
            <div><span>Type</span><p>{product.type}</p></div>
            <div><span>Price</span><p>{currency(product.price)}</p></div>
            <div><span>Stock</span><p className={`shop-stock-label-${st}`}>{product.stock} units</p></div>
            <div><span>Status</span><p><span className={`shop-status shop-status-${product.status.toLowerCase()}`}><i /> {product.status}</span></p></div>
          </div>
        </div>
        <div className="shop-modal-footer">
          <button className="shop-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------
   Edit / Add product modal
--------------------------------------------------------- */
const EditModal = ({ product, isNew, categories, onClose, onSave }) => {
  const [form, setForm] = useState(
    product || { name: '', desc: '', sku: '', category: categories[0]?.id || '', type: 'Physical', price: '', stock: '', status: 'Active', tag: '' }
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.sku.trim() || form.price === '' || form.stock === '') return;
    onSave({ ...form, price: Number(form.price), stock: Number(form.stock) });
  };

  return (
    <div className="shop-modal-overlay" onMouseDown={onClose}>
      <div className="shop-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="shop-modal-header">
          <h3>{isNew ? 'Add New Product' : 'Edit Product'}</h3>
          <button className="shop-icon-close" onClick={onClose}><Icon.Close className="shop-icon-sm" /></button>
        </div>
        <form className="shop-modal-body" onSubmit={submit}>
          <div className="shop-form-grid">
            <label className="shop-field span2">
              <span>Product Name</span>
              <input value={form.name} onChange={(e) => set('name', e.target.value)} required />
            </label>
            <label className="shop-field span2">
              <span>Description</span>
              <input value={form.desc} onChange={(e) => set('desc', e.target.value)} />
            </label>
            <label className="shop-field">
              <span>SKU</span>
              <input value={form.sku} onChange={(e) => set('sku', e.target.value)} required />
            </label>
            <label className="shop-field">
              <span>Category</span>
              <select value={form.category} onChange={(e) => set('category', e.target.value)}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            <label className="shop-field">
              <span>Type</span>
              <select value={form.type} onChange={(e) => set('type', e.target.value)}>
                <option value="Physical">Physical</option>
                <option value="Variable">Variable</option>
              </select>
            </label>
            <label className="shop-field">
              <span>Status</span>
              <select value={form.status} onChange={(e) => set('status', e.target.value)}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
            <label className="shop-field">
              <span>Price (₹)</span>
              <input type="number" min="0" value={form.price} onChange={(e) => set('price', e.target.value)} required />
            </label>
            <label className="shop-field">
              <span>Stock</span>
              <input type="number" min="0" value={form.stock} onChange={(e) => set('stock', e.target.value)} required />
            </label>
          </div>
          <div className="shop-modal-footer">
            <button type="button" className="shop-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="shop-btn shop-btn-primary">{isNew ? 'Add Product' : 'Save Changes'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------
   Add Category modal
--------------------------------------------------------- */
const AddCategoryModal = ({ existingIds, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(CATEGORY_COLORS[0]);

  const idPreview = slugify(name || '');
  const isDuplicate = name.trim() !== '' && existingIds.includes(idPreview);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || isDuplicate) return;
    onSave({ name, color });
  };

  return (
    <div className="shop-modal-overlay" onMouseDown={onClose}>
      <div className="shop-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="shop-modal-header">
          <h3>Add Category</h3>
          <button className="shop-icon-close" onClick={onClose}><Icon.Close className="shop-icon-sm" /></button>
        </div>
        <form className="shop-modal-body" onSubmit={submit}>
          <label className="shop-field">
            <span>Category Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Art Supplies" autoFocus required />
          </label>
          {isDuplicate && <p className="shop-form-error">A category with this name already exists.</p>}

          <p className="shop-field" style={{ marginTop: 14 }}>
            <span>Color</span>
          </p>
          <div className="shop-swatch-row">
            {CATEGORY_COLORS.map((c) => (
              <button
                type="button"
                key={c}
                className={`shop-swatch shop-icon-${c} ${color === c ? 'active' : ''}`}
                onClick={() => setColor(c)}
                aria-label={c}
              >
                {color === c && <Icon.Check className="shop-icon-xs" />}
              </button>
            ))}
          </div>

          <div className="shop-category-preview">
            <span>Preview:</span>
            <span className={`shop-badge shop-badge-${color}`}>{name.trim() || 'Category name'}</span>
          </div>

          <div className="shop-modal-footer">
            <button type="button" className="shop-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="shop-btn shop-btn-primary" disabled={!name.trim() || isDuplicate}>Add Category</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shop;