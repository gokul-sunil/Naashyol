import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { Power, PowerOff } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
  .mc-root { font-family: 'DM Sans', sans-serif; background: #f5f5f7; min-height: 100vh; color: #1a1a2e; }
  .mc-container { max-width: 1100px; margin: 0 auto; padding: 32px 20px; }

  /* HEADER */
  .mc-page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; gap: 12px; flex-wrap: wrap; }
  .mc-page-title h1 { font-size: 28px; font-weight: 700; color: #111; }
  .mc-page-title p { font-size: 14px; color: #888; margin-top: 3px; }
  .mc-btn-create { background: #f97316; color: #fff; border: none; padding: 11px 20px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; white-space: nowrap; font-family: 'DM Sans', sans-serif; transition: background .15s; }
  .mc-btn-create:hover { background: #ea6c0a; }

  /* STATS */
  .mc-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  @media(max-width:700px) { .mc-stats-grid { grid-template-columns: repeat(2,1fr); } }
  .mc-stat-card { background: #fff; border-radius: 14px; padding: 18px 16px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
  .mc-stat-label { font-size: 12px; color: #888; margin-bottom: 4px; }
  .mc-stat-value { font-size: 24px; font-weight: 700; color: #111; line-height: 1.1; }
  .mc-stat-sub { font-size: 12px; color: #888; margin-top: 3px; }
  .mc-stat-sub.green { color: #22c55e; }

  /* FILTERS */
  .mc-filters { background: #fff; border-radius: 14px; padding: 14px 16px; margin-bottom: 20px; display: flex; gap: 12px; align-items: center; box-shadow: 0 1px 4px rgba(0,0,0,.06); flex-wrap: wrap; }
  .mc-filter-wrap { position: relative; }
  .mc-filter-select { appearance: none; background: #f5f5f7; border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 8px 34px 8px 12px; font-size: 13px; font-family: 'DM Sans', sans-serif; color: #333; cursor: pointer; outline: none; transition: border-color .15s; }
  .mc-filter-select:focus { border-color: #f97316; }
  .mc-filter-wrap::after { content: ''; position: absolute; right: 10px; top: 50%; transform: translateY(-50%); border: 5px solid transparent; border-top-color: #888; pointer-events: none; }

  /* VIEW TOGGLE */
  .mc-view-header { margin-bottom: 16px; }
  .mc-view-toggle { display: flex; gap: 2px; background: #f5f5f7; border-radius: 8px; padding: 3px; width: fit-content; }
  .mc-view-btn { padding: 6px 14px; font-size: 13px; font-weight: 500; border: none; background: transparent; border-radius: 6px; cursor: pointer; color: #888; transition: all .15s; font-family: 'DM Sans', sans-serif; }
  .mc-view-btn.active { background: #fff; color: #111; box-shadow: 0 1px 3px rgba(0,0,0,.1); }

  /* BADGES */
  .mc-badge { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
  .mc-badge.card { background: #dbeafe; color: #2563eb; }
  .mc-badge.popup { background: #f3e8ff; color: #7c3aed; }
  .mc-badge.active { background: #dcfce7; color: #16a34a; }
  .mc-badge.paused { background: #fef3c7; color: #d97706; }
  .mc-badge.ended { background: #e5e7eb; color: #6b7280; }
  .mc-badge.scheduled { background: #e0f2fe; color: #0284c7; }

  /* GRID */
  .mc-ad-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
  @media(max-width:800px) { .mc-ad-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:520px) { .mc-ad-grid { grid-template-columns: 1fr; } }
  .mc-ad-card { background: #fff; border-radius: 16px; overflow: visible; box-shadow: 0 1px 4px rgba(0,0,0,.07); transition: box-shadow .2s, transform .2s; }
  .mc-ad-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.12); transform: translateY(-2px); }
  .mc-ad-card-img { position: relative; height: 160px; overflow: hidden; border-radius: 16px 16px 0 0; }
  .mc-ad-card-img img { width: 100%; height: 100%; object-fit: cover; }
  .mc-ad-badges { position: absolute; top: 10px; right: 10px; display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
  .mc-ad-card-body { padding: 14px 14px 12px; }
  .mc-ad-card-title { font-size: 15px; font-weight: 700; color: #111; margin-bottom: 2px; }
  .mc-ad-card-product { font-size: 12px; color: #888; margin-bottom: 6px; }
  .mc-ad-card-desc { font-size: 12px; color: #555; line-height: 1.5; margin-bottom: 12px; }
  .mc-ad-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 4px; margin-bottom: 12px; }
  .mc-s-label { font-size: 11px; color: #aaa; }
  .mc-s-val { font-size: 14px; font-weight: 700; color: #111; }
  .mc-ad-card-actions { display: flex; align-items: center; gap: 6px; border-top: 1px solid #f0f0f0; padding-top: 10px; }
  .mc-btn-preview { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 7px 0; border: 1.5px solid #e5e7eb; border-radius: 8px; font-size: 13px; font-weight: 500; background: #fff; cursor: pointer; color: #555; transition: all .15s; font-family: 'DM Sans', sans-serif; }
  .mc-btn-preview:hover { border-color: #f97316; color: #f97316; }
  .mc-btn-icon { width: 32px; height: 32px; border: 1.5px solid #e5e7eb; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; background: #fff; color: #555; transition: all .15s; flex-shrink: 0; font-family: 'DM Sans', sans-serif; }
  .mc-btn-icon:hover { border-color: #f97316; color: #f97316; }
  .mc-btn-icon.muted { border-color: #fed7aa; background: #fff7ed; color: #f97316; }

  /* TABLE */
  .mc-table-wrapper { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
  .mc-table-scroll { overflow-x: auto; }
  .mc-table { width: 100%; border-collapse: collapse; min-width: 700px; }
  .mc-table thead tr { border-bottom: 1.5px solid #f0f0f0; }
  .mc-table th { padding: 12px 14px; font-size: 12px; font-weight: 600; color: #aaa; text-align: left; white-space: nowrap; }
  .mc-table td { padding: 14px 14px; font-size: 13px; color: #333; border-bottom: 1px solid #f7f7f7; vertical-align: middle; }
  .mc-table tr:last-child td { border-bottom: none; }
  .mc-td-product { display: flex; align-items: center; gap: 10px; }
  .mc-td-thumb { width: 36px; height: 36px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
  .mc-td-name { font-weight: 600; color: #111; font-size: 13px; }
  .mc-td-sub { font-size: 11px; color: #aaa; }
  .mc-td-clicks { color: #f97316; font-weight: 600; }
  .mc-td-actions { display: flex; align-items: center; gap: 6px; }
  .mc-tbl-icon { width: 30px; height: 30px; border: 1.5px solid #e5e7eb; border-radius: 7px; display: flex; align-items: center; justify-content: center; cursor: pointer; background: #fff; color: #666; transition: all .15s; flex-shrink: 0; font-family: 'DM Sans', sans-serif; }
  .mc-tbl-icon:hover { border-color: #f97316; color: #f97316; }
  .mc-tbl-icon.muted { border-color: #fed7aa; background: #fff7ed; color: #f97316; }

  /* MODAL OVERLAY */
  .mc-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 16px; transition: opacity .2s; }
  .mc-modal { background: #fff; border-radius: 20px; width: 100%; max-width: 480px; max-height: 90vh; overflow-y: auto; padding: 28px 24px; position: relative; transition: transform .2s; }
  .mc-modal-close { position: absolute; top: 16px; right: 16px; width: 28px; height: 28px; border-radius: 50%; background: #f5f5f7; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #888; font-size: 18px; line-height: 1; font-family: 'DM Sans', sans-serif; }
  .mc-modal-close:hover { background: #ffe8d6; color: #f97316; }
  .mc-modal-title { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
  .mc-modal-sub { font-size: 13px; color: #888; margin-bottom: 20px; }

  /* CREATE FORM */
  .mc-form-section { margin-bottom: 18px; }
  .mc-form-label { font-size: 13px; font-weight: 600; color: #333; margin-bottom: 8px; display: block; }
  .mc-ad-type-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .mc-ad-type-btn { border: 2px solid #e5e7eb; border-radius: 12px; padding: 14px; cursor: pointer; transition: all .15s; text-align: left; background: #fff; font-family: 'DM Sans', sans-serif; }
  .mc-ad-type-btn:hover { border-color: #f97316; }
  .mc-ad-type-btn.selected { border-color: #f97316; background: #fff7ed; }
  .mc-at-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; }
  .mc-at-icon.orange { background: #fff7ed; }
  .mc-at-icon.gray { background: #f5f5f7; }
  .mc-at-title { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
  .mc-at-desc { font-size: 11px; color: #888; line-height: 1.4; }
  .mc-form-input, .mc-form-select, .mc-form-textarea { width: 100%; border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 9px 12px; font-size: 13px; font-family: 'DM Sans', sans-serif; color: #333; outline: none; transition: all .15s; background: #fff; box-sizing: border-box; }
  .mc-form-input:focus, .mc-form-select:focus, .mc-form-textarea:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,.08); }
  .mc-form-textarea { min-height: 80px; resize: vertical; }
  .mc-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .mc-form-actions { display: flex; gap: 10px; margin-top: 6px; }
  .mc-btn-cancel { flex: 1; padding: 10px; border: 1.5px solid #e5e7eb; border-radius: 8px; background: #fff; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; color: #333; }
  .mc-btn-cancel:hover { background: #f5f5f7; }
  .mc-btn-submit { flex: 1; padding: 10px; background: #f97316; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .mc-btn-submit:hover { background: #ea6c0a; }

  /* PREVIEW MODAL */
  .mc-preview-modal { max-width: 400px; }
  .mc-preview-card-wrap { background: #f5f5f7; border-radius: 14px; padding: 20px; margin-bottom: 20px; display: flex; justify-content: center; }
  .mc-preview-card { background: #fff; border-radius: 14px; overflow: hidden; width: 100%; max-width: 300px; box-shadow: 0 4px 20px rgba(0,0,0,.12); }
  .mc-preview-card-popup { background: #fff; border-radius: 14px; overflow: hidden; width: 100%; max-width: 280px; box-shadow: 0 4px 20px rgba(0,0,0,.2); position: relative; }
  .mc-preview-popup-close { position: absolute; top: 8px; right: 8px; width: 24px; height: 24px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #666; cursor: pointer; box-shadow: 0 1px 4px rgba(0,0,0,.15); z-index: 5; border: none; font-family: 'DM Sans', sans-serif; }
  .mc-preview-img { width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; }
  .mc-preview-body { padding: 14px 14px 16px; }
  .mc-preview-title { font-size: 16px; font-weight: 700; margin-bottom: 4px; text-align: center; }
  .mc-preview-desc { font-size: 12px; color: #666; margin-bottom: 12px; text-align: center; line-height: 1.5; }
  .mc-preview-cta { display: block; width: 100%; padding: 10px; background: #f97316; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; text-align: center; font-family: 'DM Sans', sans-serif; }
  .mc-preview-meta { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; }
  .mc-pm-label { font-size: 11px; color: #aaa; margin-bottom: 2px; }
  .mc-pm-val { font-size: 13px; font-weight: 600; color: #111; }
  .mc-pm-val.orange { color: #f97316; }

  /* CONTEXT MENU PORTAL */
  .mc-ctx-portal { position: absolute; background: #fff; border-radius: 12px; box-shadow: 0 8px 28px rgba(0,0,0,.15); min-width: 150px; z-index: 9999; overflow: hidden; }
  .mc-ctx-item { padding: 10px 16px; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background .1s; color: #333; font-family: 'DM Sans', sans-serif; border: none; background: transparent; width: 100%; text-align: left; }
  .mc-ctx-item:hover { background: #f9f9f9; }
  .mc-ctx-item.danger { color: #ef4444; }
  .mc-ctx-item.danger:hover { background: #fef2f2; }

  /* HOT DEAL BADGE */
  .mc-hot-deal { position: absolute; top: 10px; left: 10px; z-index: 2; background: #ef4444; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px; }
`;

const ADS_DATA = [
  {
    id: 1, title: 'Limited Time Offer - 30% OFF', product: 'Premium Wireless Headphones',
    desc: 'Experience premium sound quality with our best-selling wireless headphones',
    type: 'card', status: 'active', impressions: 45823, clicks: 3421, conv: 286,
    placement: 'Homepage Hero', durationLine1: '15/02/2026', durationLine2: '15/03/2026',
    ctr: '7.47%', spend: '$1,450', cta: 'Shop Now',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    badge: 'Hot Deal', isPopup: false,
  },
  {
    id: 2, title: 'New Arrival - Smart Watch Pro', product: 'Smart Watch Pro',
    desc: 'Track your fitness goals with the latest smartwatch technology',
    type: 'popup', status: 'active', impressions: 28934, clicks: 2156, conv: 178,
    placement: 'Exit Intent', durationLine1: '10/02/2026', durationLine2: '10/04/2026',
    ctr: '7.45%', spend: '$890', cta: 'Learn More',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    isPopup: true,
  },
  {
    id: 3, title: 'Summer Collection 2026', product: 'Designer Sunglasses',
    desc: 'Elevate your style with premium designer sunglasses',
    type: 'card', status: 'ended', impressions: 52341, clicks: 4123, conv: 342,
    placement: 'Category Page', durationLine1: '01/02/2026', durationLine2: '20/02/2026',
    ctr: '7.88%', spend: '$1,680', cta: 'View Collection',
    img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
    isPopup: false,
  },
  {
    id: 4, title: 'Premium Leather Collection', product: 'Leather Backpack',
    desc: 'Handcrafted leather backpacks for the modern professional',
    type: 'card', status: 'paused', impressions: 0, clicks: 0, conv: 0,
    placement: 'Product Grid', durationLine1: '20/02/2026', durationLine2: '20/03/2026',
    ctr: '0.00%', spend: '$0', cta: 'Explore Now',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    isPopup: false,
  },
  {
    id: 5, title: 'Flash Sale - 40% OFF', product: 'Running Shoes Elite',
    desc: 'Limited stock! Premium running shoes at unbeatable prices',
    type: 'popup', status: 'paused', impressions: 15678, clicks: 987, conv: 67,
    placement: 'Time-based (5s)', durationLine1: '17/02/2026', durationLine2: '19/02/2026',
    ctr: '6.30%', spend: '$450', cta: 'Grab Deal',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    isPopup: true,
  },
];

const fmt = (n) => n === 0 ? '0' : n.toLocaleString();

// SVG Icons
const EyeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>
  </svg>
);
const PowerIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18.36 6.64A9 9 0 115.64 17.36"/><line x1="12" y1="2" x2="12" y2="12"/>
  </svg>
);
const DotsIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
  </svg>
);
const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const AnalyticsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="4" height="18"/><rect x="10" y="9" width="4" height="12"/><rect x="17" y="6" width="4" height="15"/>
  </svg>
);
const DeleteIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const CardAdIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
    <rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 8h18"/>
  </svg>
);
const PopupAdIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
  </svg>
);

// Status Badge
const StatusBadge = ({ status }) => (
  <span className={`mc-badge ${status}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
);

// ---- CONTEXT MENU (fixed position portal to avoid clipping) ----
const CtxMenu = ({ pos, onClose }) => {
  if (!pos) return null;
  return ReactDOM.createPortal(
    <div
      onClick={e => e.stopPropagation()}
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 20px rgba(0,0,0,.13)',
        minWidth: 160,
        zIndex: 99999,
        overflow: 'hidden',
        border: '1px solid #f0f0f0',
      }}
    >
      <button className="mc-ctx-item" onClick={onClose}>
        <span style={{ color: '#555' }}><EditIcon /></span> Edit
      </button>
      <button className="mc-ctx-item" onClick={onClose}>
        <span style={{ color: '#555' }}><AnalyticsIcon /></span> Analytics
      </button>
      <button className="mc-ctx-item danger" onClick={onClose}>
        <span style={{ color: '#ef4444' }}><DeleteIcon /></span> Delete
      </button>
    </div>,
    document.body
  );
};

// Dots button
const DotsBtn = ({ adId, ctxAnchor, setCtxAnchor, isTbl = false }) => {
  const isOpen = ctxAnchor?.id === adId;
  const cls = isTbl ? 'mc-tbl-icon' : 'mc-btn-icon';
  const btnRef = useRef(null);

  const toggle = (e) => {
    e.stopPropagation();
    if (isOpen) {
      setCtxAnchor(null);
    } else {
      const rect = btnRef.current.getBoundingClientRect();
      setCtxAnchor({
        id: adId,
        pos: { top: rect.bottom + 6, left: rect.right - 160 }
      });
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        ref={btnRef}
        className={cls}
        onClick={toggle}
        style={isOpen ? { borderColor: '#f97316', color: '#f97316', background: '#fff7ed' } : {}}
      >
        <DotsIcon size={isTbl ? 15 : 16} />
      </button>
      {isOpen && <CtxMenu pos={ctxAnchor?.pos} onClose={() => setCtxAnchor(null)} />}
    </div>
  );
};

// Ad Card Grid
const AdCard = ({ ad, onPreview, mutedIds, onToggleMute, ctxAnchor, setCtxAnchor }) => (
  <div className="mc-ad-card">
    <div className="mc-ad-card-img">
      <img src={ad.img} alt={ad.title} onError={(e) => { e.target.style.background = '#e5e7eb'; e.target.src = ''; }} />
      <div className="mc-ad-badges">
        <span className={`mc-badge ${ad.type}`}>{ad.type === 'card' ? 'Card Ad' : 'Popup Ad'}</span>
        <StatusBadge status={ad.status} />
      </div>
      {ad.badge && <div className="mc-hot-deal">{ad.badge}</div>}
    </div>
    <div className="mc-ad-card-body">
      <div className="mc-ad-card-title">{ad.title}</div>
      <div className="mc-ad-card-product">{ad.product}</div>
      <div className="mc-ad-card-desc">{ad.desc}</div>
      <div className="mc-ad-stats">
        <div><div className="mc-s-label">Impressions</div><div className="mc-s-val">{fmt(ad.impressions)}</div></div>
        <div><div className="mc-s-label">Clicks</div><div className="mc-s-val">{fmt(ad.clicks)}</div></div>
        <div><div className="mc-s-label">Conv.</div><div className="mc-s-val">{fmt(ad.conv)}</div></div>
      </div>
      <div className="mc-ad-card-actions">
        <button className="mc-btn-preview" onClick={() => onPreview(ad.id)}>
          <EyeIcon size={15} /> Preview
        </button>
        {(ad.id === 1 || ad.id === 2) ? (
          <button
            className={`mc-btn-icon${mutedIds.includes(ad.id) ? ' muted' : ''}`}
            onClick={() => onToggleMute(ad.id)}
            title="Toggle"
          >
            {mutedIds.includes(ad.id) ? <PowerOff size={16} /> : <Power size={16} />}
          </button>
        ) : (
          <button className="mc-btn-icon" title="Power"><PowerIcon size={16} /></button>
        )}
        <DotsBtn adId={ad.id} ctxAnchor={ctxAnchor} setCtxAnchor={setCtxAnchor} />
      </div>
    </div>
  </div>
);

// Table Row
const TableRow = ({ ad, onPreview, mutedIds, onToggleMute, ctxAnchor, setCtxAnchor }) => (
  <tr>
    <td>
      <div className="mc-td-product">
        <img className="mc-td-thumb" src={ad.img} alt={ad.title} onError={(e) => { e.target.style.background = '#e5e7eb'; e.target.src = ''; }} />
        <div>
          <div className="mc-td-name">{ad.title}</div>
          <div className="mc-td-sub">{ad.product}</div>
        </div>
      </div>
    </td>
    <td><span className={`mc-badge ${ad.type}`}>{ad.type === 'card' ? 'Card' : 'Popup'}</span></td>
    <td>{ad.placement}</td>
    <td style={{ fontSize: 12, color: '#888' }}>{ad.durationLine1}<br />{ad.durationLine2}</td>
    <td>{fmt(ad.impressions)}</td>
    <td className="mc-td-clicks">{fmt(ad.clicks)}</td>
    <td><StatusBadge status={ad.status} /></td>
    <td>
      <div className="mc-td-actions">
        <button className="mc-tbl-icon" onClick={() => onPreview(ad.id)} title="Preview"><EyeIcon size={15} /></button>
        {(ad.id === 1 || ad.id === 2) ? (
          <button
            className={`mc-tbl-icon${mutedIds.includes(ad.id) ? ' muted' : ''}`}
            onClick={() => onToggleMute(ad.id)}
            title="Toggle"
          >
            {mutedIds.includes(ad.id) ? <PowerOff size={15} /> : <Power size={15} />}
          </button>
        ) : (
          <button className="mc-tbl-icon" title="Power"><PowerIcon size={15} /></button>
        )}
        <DotsBtn adId={ad.id} ctxAnchor={ctxAnchor} setCtxAnchor={setCtxAnchor} isTbl={true} />
      </div>
    </td>
  </tr>
);

// Preview Modal
const PreviewModal = ({ ad, onClose }) => {
  if (!ad) return null;
  return (
    <div className="mc-modal-overlay" onClick={onClose}>
      <div className="mc-modal mc-preview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="mc-modal-close" onClick={onClose}>×</button>
        <div className="mc-modal-title">Ad Preview</div>
        <div className="mc-modal-sub">Preview how your ad will appear to customers</div>
        <div className="mc-preview-card-wrap">
          {ad.isPopup ? (
            <div className="mc-preview-card-popup">
              <button className="mc-preview-popup-close">×</button>
              <img className="mc-preview-img" src={ad.img} alt={ad.title} onError={(e) => { e.target.style.background = '#e5e7eb'; e.target.src = ''; }} />
              <div className="mc-preview-body">
                <div className="mc-preview-title">{ad.title}</div>
                <div className="mc-preview-desc">{ad.desc}</div>
                <button className="mc-preview-cta">{ad.cta}</button>
              </div>
            </div>
          ) : (
            <div className="mc-preview-card">
              <div style={{ position: 'relative' }}>
                {ad.badge && <div className="mc-hot-deal">{ad.badge}</div>}
                <img className="mc-preview-img" src={ad.img} alt={ad.title} onError={(e) => { e.target.style.background = '#e5e7eb'; e.target.src = ''; }} />
              </div>
              <div className="mc-preview-body">
                <div className="mc-preview-title">{ad.title}</div>
                <div className="mc-preview-desc">{ad.desc}</div>
                <button className="mc-preview-cta">{ad.cta}</button>
              </div>
            </div>
          )}
        </div>
        <div className="mc-preview-meta">
          <div><div className="mc-pm-label">Placement</div><div className="mc-pm-val">{ad.placement}</div></div>
          <div>
            <div className="mc-pm-label">Duration</div>
            <div className="mc-pm-val" style={{ fontSize: 11 }}>{ad.durationLine1}<br />-<br />{ad.durationLine2}</div>
          </div>
          <div><div className="mc-pm-label">CTR</div><div className="mc-pm-val orange">{ad.ctr}</div></div>
          <div><div className="mc-pm-label">Spend</div><div className="mc-pm-val">{ad.spend}</div></div>
        </div>
      </div>
    </div>
  );
};

// Create Campaign Modal
const CreateModal = ({ onClose }) => {
  const [adType, setAdType] = useState('card');
  return (
    <div className="mc-modal-overlay" onClick={onClose}>
      <div className="mc-modal" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
        <button className="mc-modal-close" onClick={onClose}>×</button>
        <div className="mc-modal-title">Create Ad Campaign</div>
        <div className="mc-modal-sub">Create a new product advertisement for cards or popups</div>
        <div className="mc-form-section">
          <label className="mc-form-label">Ad Type</label>
          <div className="mc-ad-type-grid">
            <button className={`mc-ad-type-btn${adType === 'card' ? ' selected' : ''}`} onClick={() => setAdType('card')}>
              <div className="mc-at-icon orange"><CardAdIcon /></div>
              <div className="mc-at-title">Card Ad</div>
              <div className="mc-at-desc">Display as product cards in various placements</div>
            </button>
            <button className={`mc-ad-type-btn${adType === 'popup' ? ' selected' : ''}`} onClick={() => setAdType('popup')}>
              <div className="mc-at-icon gray"><PopupAdIcon /></div>
              <div className="mc-at-title">Popup Ad</div>
              <div className="mc-at-desc">Show as modal popups with trigger conditions</div>
            </button>
          </div>
        </div>
        <div className="mc-form-section">
          <label className="mc-form-label">Select Product</label>
          <select className="mc-form-select">
            <option value="">Choose a product to advertise</option>
            <option>Premium Wireless Headphones</option>
            <option>Smart Watch Pro</option>
            <option>Designer Sunglasses</option>
            <option>Leather Backpack</option>
            <option>Running Shoes Elite</option>
          </select>
        </div>
        <div className="mc-form-row mc-form-section">
          <div>
            <label className="mc-form-label">Ad Title</label>
            <input className="mc-form-input" placeholder="e.g., Limited Time Offer - 30%" />
          </div>
          <div>
            <label className="mc-form-label">CTA Button Text</label>
            <input className="mc-form-input" placeholder="e.g., Shop Now" />
          </div>
        </div>
        <div className="mc-form-section">
          <label className="mc-form-label">Ad Description</label>
          <textarea className="mc-form-textarea" placeholder="Write a compelling description for your ad..." />
        </div>
        <div className="mc-form-section">
          <label className="mc-form-label">CTA Link</label>
          <input className="mc-form-input" placeholder="/products/..." />
        </div>
        <div className="mc-form-row mc-form-section">
          <div>
            <label className="mc-form-label">Placement</label>
            <select className="mc-form-select">
              <option value="">Select placement</option>
              <option>Homepage Hero</option>
              <option>Category Page</option>
              <option>Product Grid</option>
              <option>Exit Intent</option>
              <option>Time-based</option>
            </select>
          </div>
          <div>
            <label className="mc-form-label">Budget (USD)</label>
            <input className="mc-form-input" type="number" placeholder="1000" />
          </div>
        </div>
        <div className="mc-form-row mc-form-section">
          <div>
            <label className="mc-form-label">Start Date</label>
            <input className="mc-form-input" type="date" />
          </div>
          <div>
            <label className="mc-form-label">End Date</label>
            <input className="mc-form-input" type="date" />
          </div>
        </div>
        <div className="mc-form-actions">
          <button className="mc-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="mc-btn-submit">Create Campaign</button>
        </div>
      </div>
    </div>
  );
};

// MAIN COMPONENT
export default function MarketingCampaigns() {
  const [view, setView] = useState('grid');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [previewId, setPreviewId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [mutedIds, setMutedIds] = useState([]);
  const [ctxAnchor, setCtxAnchor] = useState(null);

  const filtered = ADS_DATA.filter(
    (a) => (typeFilter === 'all' || a.type === typeFilter) && (statusFilter === 'all' || a.status === statusFilter)
  );

  const previewAd = ADS_DATA.find((a) => a.id === previewId);

  const toggleMute = (id) => {
    setMutedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  // Close ctx menu on outside click
  useEffect(() => {
    const handler = () => setCtxAnchor(null);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="mc-root">
      <style>{styles}</style>
      <div className="mc-container">

        {/* HEADER */}
        <div className="mc-page-header">
          <div className="mc-page-title">
            <h1>Marketing Campaigns</h1>
            <p>Create and manage product ads - cards and popups</p>
          </div>
          <button className="mc-btn-create" onClick={() => setShowCreate(true)}>
            <PlusIcon /> Create Ad Campaign
          </button>
        </div>

        {/* STATS */}
        <div className="mc-stats-grid">
          <div className="mc-stat-card">
            <div>
              <div className="mc-stat-label">Active Ads</div>
              <div className="mc-stat-value">2/5</div>
              <div className="mc-stat-sub">Total campaigns</div>
            </div>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l19-9-9 19-2-8-8-2z"/>
              </svg>
            </div>
          </div>
          <div className="mc-stat-card">
            <div>
              <div className="mc-stat-label">Total Impressions</div>
              <div className="mc-stat-value">142,776</div>
              <div className="mc-stat-sub green">↑ 7.49% CTR</div>
            </div>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>
              </svg>
            </div>
          </div>
          <div className="mc-stat-card">
            <div>
              <div className="mc-stat-label">Total Clicks</div>
              <div className="mc-stat-value">10,687</div>
              <div className="mc-stat-sub green">8.17% Conv. Rate</div>
            </div>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3l14 9-14 9V3z"/>
              </svg>
            </div>
          </div>
          <div className="mc-stat-card">
            <div>
              <div className="mc-stat-label">Total Spend</div>
              <div className="mc-stat-value">$4,470</div>
              <div className="mc-stat-sub">873 conversions</div>
            </div>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mc-filters">
          <div className="mc-filter-wrap">
            <select className="mc-filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All Ad Types</option>
              <option value="card">Card Ads</option>
              <option value="popup">Popup Ads</option>
            </select>
          </div>
          <div className="mc-filter-wrap">
            <select className="mc-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="scheduled">Scheduled</option>
              <option value="ended">Ended</option>
            </select>
          </div>
        </div>

        {/* VIEW TOGGLE */}
        <div className="mc-view-header">
          <div className="mc-view-toggle">
            <button className={`mc-view-btn${view === 'grid' ? ' active' : ''}`} onClick={() => setView('grid')}>Grid View</button>
            <button className={`mc-view-btn${view === 'table' ? ' active' : ''}`} onClick={() => setView('table')}>Table View</button>
          </div>
        </div>

        {/* GRID VIEW */}
        {view === 'grid' && (
          <div className="mc-ad-grid">
            {filtered.map((ad) => (
              <AdCard
                key={ad.id}
                ad={ad}
                onPreview={setPreviewId}
                mutedIds={mutedIds}
                onToggleMute={toggleMute}
                ctxAnchor={ctxAnchor}
                setCtxAnchor={setCtxAnchor}
              />
            ))}
          </div>
        )}

        {/* TABLE VIEW */}
        {view === 'table' && (
          <div className="mc-table-wrapper">
            <div className="mc-table-scroll">
              <table className="mc-table">
                <thead>
                  <tr>
                    <th>Product Ad</th>
                    <th>Type</th>
                    <th>Placement</th>
                    <th>Duration</th>
                    <th>Impressions</th>
                    <th>Clicks</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((ad) => (
                    <TableRow
                      key={ad.id}
                      ad={ad}
                      onPreview={setPreviewId}
                      mutedIds={mutedIds}
                      onToggleMute={toggleMute}
                      ctxAnchor={ctxAnchor}
                      setCtxAnchor={setCtxAnchor}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {previewId && <PreviewModal ad={previewAd} onClose={() => setPreviewId(null)} />}
      {showCreate && <CreateModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}