import { useState, useEffect, useCallback } from "react";

const INDUSTRY_TEMPLATES = {
  gym: { label: "Gym & Fitness", icon: "🏋️", services: [
    { name: "Gym Membership", sac: "999312", rate: 3000, gst: 18 },
    { name: "Personal Training", sac: "999312", rate: 800, gst: 18 },
    { name: "Yoga / Zumba Class", sac: "999312", rate: 500, gst: 18 },
    { name: "Locker Charges", sac: "997212", rate: 200, gst: 18 },
    { name: "Swimming Pool Access", sac: "999312", rate: 1500, gst: 18 },
  ]},
  salon: { label: "Salon & Spa", icon: "💇", services: [
    { name: "Haircut", sac: "999712", rate: 500, gst: 18 },
    { name: "Hair Coloring", sac: "999712", rate: 2500, gst: 18 },
    { name: "Facial Treatment", sac: "999712", rate: 1200, gst: 18 },
    { name: "Massage Therapy", sac: "999712", rate: 1800, gst: 18 },
    { name: "Manicure & Pedicure", sac: "999712", rate: 800, gst: 18 },
  ]},
  restaurant: { label: "Restaurant & Café", icon: "🍽️", services: [
    { name: "Food & Beverages", sac: "996331", rate: 500, gst: 5 },
    { name: "AC Dining", sac: "996331", rate: 800, gst: 5 },
    { name: "Catering Service", sac: "996335", rate: 5000, gst: 18 },
    { name: "Takeaway Order", sac: "996331", rate: 300, gst: 5 },
    { name: "Party Hall Booking", sac: "997212", rate: 15000, gst: 18 },
  ]},
  consulting: { label: "IT & Consulting", icon: "💻", services: [
    { name: "Software Development", sac: "998314", rate: 50000, gst: 18 },
    { name: "IT Consulting", sac: "998312", rate: 25000, gst: 18 },
    { name: "Cloud Hosting", sac: "998315", rate: 5000, gst: 18 },
    { name: "UI/UX Design", sac: "998314", rate: 15000, gst: 18 },
    { name: "SEO / Marketing", sac: "998365", rate: 10000, gst: 18 },
  ]},
  freelance: { label: "Freelancer", icon: "✍️", services: [
    { name: "Content Writing", sac: "998391", rate: 5000, gst: 18 },
    { name: "Graphic Design", sac: "998314", rate: 3000, gst: 18 },
    { name: "Video Editing", sac: "999611", rate: 8000, gst: 18 },
    { name: "Photography", sac: "998386", rate: 10000, gst: 18 },
    { name: "Social Media Mgmt", sac: "998365", rate: 15000, gst: 18 },
  ]},
  retail: { label: "Retail / Shop", icon: "🛒", services: [
    { name: "Product Sale", hsn: "0000", rate: 1000, gst: 12 },
    { name: "Electronics Item", hsn: "8471", rate: 5000, gst: 18 },
    { name: "Clothing / Apparel", hsn: "6109", rate: 800, gst: 5 },
    { name: "Stationery", hsn: "4820", rate: 200, gst: 12 },
    { name: "Home Decor", hsn: "4421", rate: 1500, gst: 12 },
  ]},
  medical: { label: "Clinic / Hospital", icon: "🏥", services: [
    { name: "Consultation Fee", sac: "999312", rate: 800, gst: 18 },
    { name: "Lab Test", sac: "999312", rate: 1500, gst: 18 },
    { name: "X-Ray / Scan", sac: "999312", rate: 3000, gst: 18 },
    { name: "Physiotherapy", sac: "999312", rate: 1000, gst: 18 },
    { name: "Dental Treatment", sac: "999312", rate: 5000, gst: 18 },
  ]},
  education: { label: "Coaching / Tuition", icon: "📚", services: [
    { name: "Monthly Tuition Fee", sac: "999293", rate: 5000, gst: 18 },
    { name: "Course Enrollment", sac: "999293", rate: 15000, gst: 18 },
    { name: "Study Material", sac: "999293", rate: 2000, gst: 18 },
    { name: "Test Series", sac: "999293", rate: 3000, gst: 18 },
    { name: "Workshop Fee", sac: "999293", rate: 1500, gst: 18 },
  ]},
  realestate: { label: "Real Estate / Rental", icon: "🏠", services: [
    { name: "Rent (Commercial)", sac: "997212", rate: 25000, gst: 18 },
    { name: "Maintenance Charges", sac: "995411", rate: 3000, gst: 18 },
    { name: "Brokerage Fee", sac: "997212", rate: 50000, gst: 18 },
    { name: "Interior Consulting", sac: "998321", rate: 20000, gst: 18 },
  ]},
  custom: { label: "Custom / Other", icon: "⚙️", services: [
    { name: "Service / Product", sac: "999900", rate: 1000, gst: 18 },
  ]},
};

const STATES = [
  { code: "AN", name: "Andaman & Nicobar", tin: "35" }, { code: "AP", name: "Andhra Pradesh", tin: "37" },
  { code: "AR", name: "Arunachal Pradesh", tin: "12" }, { code: "AS", name: "Assam", tin: "18" },
  { code: "BR", name: "Bihar", tin: "10" }, { code: "CH", name: "Chandigarh", tin: "04" },
  { code: "CT", name: "Chhattisgarh", tin: "22" }, { code: "DL", name: "Delhi", tin: "07" },
  { code: "GA", name: "Goa", tin: "30" }, { code: "GJ", name: "Gujarat", tin: "24" },
  { code: "HR", name: "Haryana", tin: "06" }, { code: "HP", name: "Himachal Pradesh", tin: "02" },
  { code: "JK", name: "Jammu & Kashmir", tin: "01" }, { code: "JH", name: "Jharkhand", tin: "20" },
  { code: "KA", name: "Karnataka", tin: "29" }, { code: "KL", name: "Kerala", tin: "32" },
  { code: "MP", name: "Madhya Pradesh", tin: "23" }, { code: "MH", name: "Maharashtra", tin: "27" },
  { code: "MN", name: "Manipur", tin: "14" }, { code: "ML", name: "Meghalaya", tin: "17" },
  { code: "MZ", name: "Mizoram", tin: "15" }, { code: "NL", name: "Nagaland", tin: "13" },
  { code: "OD", name: "Odisha", tin: "21" }, { code: "PB", name: "Punjab", tin: "03" },
  { code: "RJ", name: "Rajasthan", tin: "08" }, { code: "SK", name: "Sikkim", tin: "11" },
  { code: "TN", name: "Tamil Nadu", tin: "33" }, { code: "TS", name: "Telangana", tin: "36" },
  { code: "TR", name: "Tripura", tin: "16" }, { code: "UP", name: "Uttar Pradesh", tin: "09" },
  { code: "UK", name: "Uttarakhand", tin: "05" }, { code: "WB", name: "West Bengal", tin: "19" },
];

const numberToWords = (n) => {
  if (n === 0) return "zero";
  const a = ["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
  const b = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
  const convert = (num) => {
    if (num < 20) return a[num];
    if (num < 100) return b[Math.floor(num/10)] + (num%10 ? " " + a[num%10] : "");
    if (num < 1000) return a[Math.floor(num/100)] + " hundred" + (num%100 ? " and " + convert(num%100) : "");
    if (num < 100000) return convert(Math.floor(num/1000)) + " thousand" + (num%1000 ? " " + convert(num%1000) : "");
    if (num < 10000000) return convert(Math.floor(num/100000)) + " lakh" + (num%100000 ? " " + convert(num%100000) : "");
    return convert(Math.floor(num/10000000)) + " crore" + (num%10000000 ? " " + convert(num%10000000) : "");
  };
  return convert(Math.round(n));
};

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const defaultBusiness = () => ({
  id: uid(), name: "", industry: "", address: "", state: "DL", gstin: "",
  phone: "", email: "", logo: "", bankName: "", bankAcc: "", bankIfsc: "",
  bankType: "Current", invPrefix: "CK", invCounter: 1, fy: "2025-26",
  services: [], tagline: "",
});

const defaultClient = () => ({
  id: uid(), name: "", address: "", state: "DL", phone: "", email: "", gstin: "", businessId: "",
});

const defaultInvoice = () => ({
  id: uid(), businessId: "", clientId: "", date: new Date().toISOString().split("T")[0],
  dueDate: (() => { const d = new Date(); d.setDate(d.getDate()+15); return d.toISOString().split("T")[0]; })(),
  items: [{ id: uid(), name: "Service", sac: "999900", qty: 1, rate: 0, gst: 18 }],
  invNumber: "", status: "draft", notes: "",
});

const loadData = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
};
const saveData = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) { console.error(e); }
};

// ─── THEME: NAVY BLUE + AMBER GOLD ───
const T = {
  navy: "#0C1E3C",
  navyMid: "#14305E",
  navyLight: "#1B3F7A",
  navySoft: "#E8EDF5",
  navyGhost: "#F2F5FA",
  amber: "#E8930C",
  amberLight: "#FFF5E0",
  amberDark: "#B87208",
  amberGlow: "#FBBF24",
  white: "#FFFFFF",
  textDark: "#0C1E3C",
  textMid: "#4A5E80",
  textLight: "#8696B0",
  textMuted: "#B0BDCF",
  border: "#D6DDE8",
  borderLight: "#E8EDF5",
  bg: "#F7F9FC",
  success: "#059669",
  successBg: "#ECFDF5",
  danger: "#DC2626",
  dangerBg: "#FEF2F2",
};

const LogoFont = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Righteous&family=Outfit:wght@300;400;500;600;700&display=swap');`}</style>
);

const Logo = ({ size = "normal" }) => {
  const isLarge = size === "large";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: isLarge ? 14 : 8 }}>
      <div style={{
        width: isLarge ? 48 : 38, height: isLarge ? 48 : 38, borderRadius: 10,
        background: `linear-gradient(135deg, ${T.navy} 0%, ${T.navyMid} 50%, ${T.navyLight} 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -4, right: -4, width: 22, height: 22, borderRadius: "50%", background: T.amber, opacity: 0.2 }} />
        <span style={{ fontFamily: "'Righteous', cursive", fontSize: isLarge ? 22 : 17, color: T.white, letterSpacing: "-0.5px", position: "relative", zIndex: 1 }}>C</span>
        <div style={{ position: "absolute", bottom: 3, right: 5, width: 6, height: 6, borderRadius: "50%", background: T.amberGlow }} />
      </div>
      <div>
        <div style={{ fontFamily: "'Righteous', cursive", fontSize: isLarge ? 26 : 19, color: T.navy, letterSpacing: "0.5px", lineHeight: 1.1 }}>
          Charge<span style={{ color: T.amber }}>Kro</span>
        </div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isLarge ? 11 : 9, color: T.textLight, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, marginTop: 1 }}>
          GST Invoice Platform
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState("loading");
  const [businesses, setBusinesses] = useState([]);
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [activeBiz, setActiveBiz] = useState(null);
  const [editBiz, setEditBiz] = useState(null);
  const [editClient, setEditClient] = useState(null);
  const [editInvoice, setEditInvoice] = useState(null);
  const [previewInv, setPreviewInv] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  useEffect(() => {
    const b = loadData("chargekro-businesses", []);
    const c = loadData("chargekro-clients", []);
    const inv = loadData("chargekro-invoices", []);
    setBusinesses(b);
    setClients(c);
    setInvoices(inv);
    setActiveBiz(b.length > 0 ? b[0].id : null);
    setView(b.length > 0 ? "dashboard" : "onboard");
  }, []);

  const persist = useCallback((b, c, i) => {
    saveData("chargekro-businesses", b);
    saveData("chargekro-clients", c);
    saveData("chargekro-invoices", i);
  }, []);

  const saveBusiness = (biz) => {
    const idx = businesses.findIndex(b => b.id === biz.id);
    const next = idx >= 0 ? businesses.map(b => b.id === biz.id ? biz : b) : [...businesses, biz];
    setBusinesses(next);
    if (!activeBiz) setActiveBiz(biz.id);
    persist(next, clients, invoices);
    showToast("Business saved!");
    setEditBiz(null);
    setView("dashboard");
  };

  const saveClient = (cl) => {
    cl.businessId = activeBiz;
    const idx = clients.findIndex(c => c.id === cl.id);
    const next = idx >= 0 ? clients.map(c => c.id === cl.id ? cl : c) : [...clients, cl];
    setClients(next);
    persist(businesses, next, invoices);
    showToast("Client saved!");
    setEditClient(null);
    setView("clients");
  };

  const saveInvoice = (inv) => {
    const biz = businesses.find(b => b.id === activeBiz);
    if (!inv.invNumber && biz) {
      inv.invNumber = `${biz.invPrefix}/${biz.fy}/${String(biz.invCounter).padStart(4,"0")}`;
      biz.invCounter = (biz.invCounter || 1) + 1;
      const bNext = businesses.map(b => b.id === biz.id ? biz : b);
      setBusinesses(bNext);
      saveData("chargekro-businesses", bNext);
    }
    inv.businessId = activeBiz;
    inv.status = "sent";
    const idx = invoices.findIndex(i => i.id === inv.id);
    const next = idx >= 0 ? invoices.map(i => i.id === inv.id ? inv : i) : [...invoices, inv];
    setInvoices(next);
    persist(businesses, clients, next);
    showToast("Invoice saved!");
    setPreviewInv(inv);
    setView("preview");
  };

  const deleteInvoice = (id) => {
    const next = invoices.filter(i => i.id !== id);
    setInvoices(next);
    persist(businesses, clients, next);
    showToast("Invoice deleted");
  };

  const deleteClient = (id) => {
    const next = clients.filter(c => c.id !== id);
    setClients(next);
    persist(businesses, next, invoices);
    showToast("Client deleted");
  };

  const biz = businesses.find(b => b.id === activeBiz);
  const bizClients = clients.filter(c => c.businessId === activeBiz);
  const bizInvoices = invoices.filter(i => i.businessId === activeBiz);

  const calcInvTotals = (inv) => {
    const bizObj = businesses.find(b => b.id === (inv.businessId || activeBiz));
    const clientObj = clients.find(c => c.id === inv.clientId);
    const isInter = bizObj && clientObj && bizObj.state !== clientObj.state;
    let sub = 0, tax = 0;
    const lines = (inv.items || []).map(it => {
      const base = (it.qty || 0) * (it.rate || 0);
      const gstAmt = Math.round(base * (it.gst || 18) / 100);
      sub += base; tax += gstAmt;
      return { ...it, base, gstAmt, total: base + gstAmt };
    });
    return { lines, sub, tax, grand: sub + tax, isInter };
  };

  // ─── STYLES ───
  const ff = "'Outfit', sans-serif";
  const containerStyle = { fontFamily: ff, color: T.textDark, maxWidth: 960, margin: "0 auto", padding: "0 8px" };
  const cardStyle = { background: T.white, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px 24px", marginBottom: 12 };
  const inputStyle = { fontFamily: ff, fontSize: 14, padding: "10px 14px", border: `1px solid ${T.border}`, borderRadius: 10, background: T.navyGhost, color: T.textDark, width: "100%", boxSizing: "border-box", outline: "none", transition: "border-color 0.15s" };
  const labelStyle = { fontSize: 11, fontWeight: 600, color: T.textMid, marginBottom: 4, display: "block", textTransform: "uppercase", letterSpacing: "0.06em" };
  const btnPrimary = { fontFamily: ff, fontSize: 14, fontWeight: 600, padding: "11px 24px", background: `linear-gradient(135deg, ${T.navy} 0%, ${T.navyMid} 100%)`, color: T.white, border: "none", borderRadius: 10, cursor: "pointer", transition: "all 0.15s" };
  const btnAmber = { fontFamily: ff, fontSize: 14, fontWeight: 600, padding: "11px 24px", background: `linear-gradient(135deg, ${T.amber} 0%, ${T.amberDark} 100%)`, color: T.white, border: "none", borderRadius: 10, cursor: "pointer" };
  const btnOutline = { fontFamily: ff, fontSize: 13, fontWeight: 500, padding: "9px 18px", background: "transparent", color: T.navy, border: `1px solid ${T.border}`, borderRadius: 10, cursor: "pointer" };
  const btnSmall = { fontFamily: ff, fontSize: 12, fontWeight: 500, padding: "6px 14px", background: "transparent", border: `1px solid ${T.border}`, borderRadius: 8, cursor: "pointer", color: T.textMid };
  const gridTwo = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
  const gridThree = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 };
  const sectionLabel = { fontSize: 12, fontWeight: 700, color: T.navy, marginBottom: 12, marginTop: 16, textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: 6 };

  const stateSelect = (val, onChange, style = {}) => (
    <select value={val} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, ...style }}>
      {STATES.map(s => <option key={s.code} value={s.code}>{s.name} ({s.tin})</option>)}
    </select>
  );

  if (view === "loading") return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400, fontFamily: ff }}>
      <LogoFont />
      <div style={{ textAlign: "center" }}>
        <Logo size="large" />
        <div style={{ fontSize: 13, color: T.textLight, marginTop: 12 }}>Loading your workspace...</div>
      </div>
    </div>
  );

  // ─── TOAST ───
  const Toast = () => toast ? (
    <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", background: T.navy, color: T.white, padding: "10px 24px", borderRadius: 10, fontSize: 13, fontFamily: ff, fontWeight: 500, zIndex: 999, boxShadow: "0 4px 20px rgba(12,30,60,0.3)" }}>{toast}</div>
  ) : null;

  // ─── HEADER ───
  const Header = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: `1px solid ${T.borderLight}`, marginBottom: 20 }}>
      <Logo />
      {biz && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <select value={activeBiz} onChange={e => setActiveBiz(e.target.value)} style={{ ...inputStyle, width: "auto", fontSize: 13, padding: "7px 12px", borderRadius: 8, background: T.navySoft }}>
            {businesses.map(b => <option key={b.id} value={b.id}>{b.name || "Unnamed"}</option>)}
          </select>
          <button onClick={() => { setEditBiz(defaultBusiness()); setView("onboard"); }} style={{ ...btnSmall, background: T.amberLight, color: T.amberDark, borderColor: T.amber }}>+ New</button>
        </div>
      )}
    </div>
  );

  const Nav = () => (
    <div style={{ display: "flex", gap: 4, marginBottom: 20, background: T.navyGhost, padding: 5, borderRadius: 12 }}>
      {[
        { key: "dashboard", label: "Dashboard", icon: "📊" },
        { key: "clients", label: "Clients", icon: "👥" },
        { key: "invoiceList", label: "Invoices", icon: "📄" },
        { key: "createInv", label: "New Invoice", icon: "⚡" },
        { key: "editBiz", label: "Settings", icon: "⚙️" },
      ].map(t => (
        <button key={t.key} onClick={() => { if (t.key === "editBiz") setEditBiz({...biz}); if (t.key === "createInv") setEditInvoice({...defaultInvoice(), businessId: activeBiz}); setView(t.key); }}
          style={{
            flex: 1, padding: "10px 6px", fontSize: 12, fontWeight: view === t.key ? 600 : 400,
            background: view === t.key ? T.white : "transparent",
            border: view === t.key ? `1px solid ${T.border}` : "1px solid transparent",
            borderRadius: 10, cursor: "pointer", fontFamily: ff,
            color: view === t.key ? T.navy : T.textLight,
            boxShadow: view === t.key ? "0 2px 8px rgba(12,30,60,0.06)" : "none",
            transition: "all 0.15s",
          }}>
          <span style={{ fontSize: 16, display: "block", marginBottom: 2 }}>{t.icon}</span>{t.label}
        </button>
      ))}
    </div>
  );

  // ─── ONBOARDING ───
  if (view === "onboard" || (view === "editBiz" && editBiz && !editBiz.industry)) {
    const b = editBiz || defaultBusiness();
    return (
      <div style={containerStyle}>
        <LogoFont /><Header />
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: "'Righteous', cursive", fontSize: 26, color: T.navy }}>
            Welcome to Charge<span style={{ color: T.amber }}>Kro</span> ⚡
          </div>
          <div style={{ fontSize: 14, color: T.textMid, marginTop: 6, fontWeight: 400 }}>Choose your industry to get started with pre-configured services & HSN/SAC codes</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, marginBottom: 20 }}>
          {Object.entries(INDUSTRY_TEMPLATES).map(([key, tmpl]) => (
            <button key={key} onClick={() => {
              const newBiz = { ...b, industry: key, services: tmpl.services.map(s => ({...s, id: uid()})), invPrefix: b.name ? b.name.slice(0,3).toUpperCase() : "CK" };
              setEditBiz(newBiz);
              setView("editBiz");
            }}
              style={{ padding: "20px 12px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 14, cursor: "pointer", textAlign: "center", fontFamily: ff, transition: "all 0.2s" }}
              onMouseOver={e => { e.currentTarget.style.borderColor = T.amber; e.currentTarget.style.background = T.amberLight; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.white; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>{tmpl.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{tmpl.label}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── BUSINESS FORM ───
  if (view === "editBiz" && editBiz) {
    const b = editBiz;
    const upd = (f, v) => setEditBiz({ ...b, [f]: v });
    const tmpl = INDUSTRY_TEMPLATES[b.industry];
    return (
      <div style={containerStyle}>
        <LogoFont /><Header /><Nav />
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 24 }}>{tmpl?.icon || "⚙️"}</span>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.navy }}>Business Setup</div>
            <span style={{ fontSize: 12, background: T.navySoft, color: T.navy, padding: "4px 12px", borderRadius: 20, fontWeight: 600 }}>{tmpl?.label || "Custom"}</span>
          </div>
          <div style={sectionLabel}><span style={{ color: T.amber }}>●</span> Business Information</div>
          <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 16, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>Business Logo</label>
              <div style={{
                width: 130, height: 130, borderRadius: 14, border: `2px dashed ${b.logo ? T.amber : T.border}`,
                background: b.logo ? T.white : T.navyGhost,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.2s",
              }}
                onClick={() => document.getElementById("logo-upload")?.click()}
                onMouseOver={e => { if (!b.logo) e.currentTarget.style.borderColor = T.amber; }}
                onMouseOut={e => { if (!b.logo) e.currentTarget.style.borderColor = T.border; }}
              >
                {b.logo ? (
                  <>
                    <img src={b.logo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }} />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(12,30,60,0.75)",
                      padding: "6px 0", textAlign: "center", fontSize: 10, color: T.white, fontWeight: 500,
                    }}>Change Logo</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 28, marginBottom: 4, opacity: 0.4 }}>📷</div>
                    <div style={{ fontSize: 11, color: T.textLight, textAlign: "center", lineHeight: 1.3 }}>Upload<br/>Logo</div>
                    <div style={{ fontSize: 9, color: T.textMuted, marginTop: 4 }}>PNG, JPG</div>
                  </>
                )}
                <input id="logo-upload" type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (file.size > 2 * 1024 * 1024) { alert("Logo must be under 2MB"); return; }
                    const reader = new FileReader();
                    reader.onload = (ev) => upd("logo", ev.target?.result);
                    reader.readAsDataURL(file);
                  }}
                />
              </div>
              {b.logo && (
                <button onClick={(e) => { e.stopPropagation(); upd("logo", ""); }}
                  style={{ ...btnSmall, marginTop: 6, color: T.danger, fontSize: 11, width: "100%", textAlign: "center" }}>
                  Remove Logo
                </button>
              )}
            </div>
            <div>
              <div style={gridTwo}>
                <div><label style={labelStyle}>Business Name *</label><input style={inputStyle} value={b.name} onChange={e => upd("name", e.target.value)} placeholder="Your Business Name" /></div>
                <div><label style={labelStyle}>Tagline</label><input style={inputStyle} value={b.tagline} onChange={e => upd("tagline", e.target.value)} placeholder="e.g. Fitness & Wellness" /></div>
              </div>
              <div style={{ marginTop: 12 }}><label style={labelStyle}>Address *</label><textarea style={{ ...inputStyle, minHeight: 56, resize: "vertical" }} value={b.address} onChange={e => upd("address", e.target.value)} placeholder="Full business address" /></div>
              <div style={{ background: T.amberLight, borderRadius: 8, padding: "8px 12px", marginTop: 10, fontSize: 11, color: T.amberDark }}>
                💡 Upload your logo (PNG or JPG, max 2MB). It will appear on all your invoices, print copies, and PDF exports.
              </div>
            </div>
          </div>
          <div style={{ ...gridThree, marginTop: 12 }}>
            <div><label style={labelStyle}>GSTIN *</label><input style={{ ...inputStyle, textTransform: "uppercase" }} value={b.gstin} onChange={e => upd("gstin", e.target.value)} placeholder="22ABCDE1234F1Z5" maxLength={15} /></div>
            <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={b.phone} onChange={e => upd("phone", e.target.value)} placeholder="+91 98765 43210" /></div>
            <div><label style={labelStyle}>State *</label>{stateSelect(b.state, v => upd("state", v))}</div>
          </div>
          <div style={{ ...gridTwo, marginTop: 12 }}>
            <div><label style={labelStyle}>Email</label><input style={inputStyle} value={b.email} onChange={e => upd("email", e.target.value)} placeholder="billing@business.in" /></div>
            <div><label style={labelStyle}>Invoice Prefix</label><input style={inputStyle} value={b.invPrefix} onChange={e => upd("invPrefix", e.target.value)} placeholder="CK" /></div>
          </div>
          <div style={sectionLabel}><span style={{ color: T.amber }}>●</span> Bank Details</div>
          <div style={gridTwo}>
            <div><label style={labelStyle}>Bank Name</label><input style={inputStyle} value={b.bankName} onChange={e => upd("bankName", e.target.value)} /></div>
            <div><label style={labelStyle}>Account No.</label><input style={inputStyle} value={b.bankAcc} onChange={e => upd("bankAcc", e.target.value)} /></div>
          </div>
          <div style={{ ...gridTwo, marginTop: 12 }}>
            <div><label style={labelStyle}>IFSC Code</label><input style={inputStyle} value={b.bankIfsc} onChange={e => upd("bankIfsc", e.target.value)} /></div>
            <div><label style={labelStyle}>Account Type</label>
              <select style={inputStyle} value={b.bankType} onChange={e => upd("bankType", e.target.value)}>
                <option>Current</option><option>Savings</option>
              </select>
            </div>
          </div>
          <div style={sectionLabel}><span style={{ color: T.amber }}>●</span> Services Catalog</div>
          <div style={{ maxHeight: 220, overflowY: "auto", border: `1px solid ${T.border}`, borderRadius: 10 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr style={{ background: T.navyGhost }}>
                {["Service / Product","SAC / HSN","Rate ₹","GST %",""].map((h,i) => (
                  <th key={i} style={{ padding: "8px 10px", textAlign: i===2?"right":i===3?"center":"left", fontWeight: 600, fontSize: 10, textTransform: "uppercase", color: T.textMid }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {(b.services || []).map((s, i) => (
                  <tr key={s.id || i} style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                    <td style={{ padding: "4px 6px" }}><input style={{ ...inputStyle, padding: "6px 8px", fontSize: 12 }} value={s.name} onChange={e => { const sv = [...b.services]; sv[i] = {...s, name: e.target.value}; upd("services", sv); }} /></td>
                    <td style={{ padding: "4px 6px" }}><input style={{ ...inputStyle, padding: "6px 8px", fontSize: 12 }} value={s.sac || s.hsn || ""} onChange={e => { const sv = [...b.services]; sv[i] = {...s, sac: e.target.value}; upd("services", sv); }} /></td>
                    <td style={{ padding: "4px 6px" }}><input type="number" style={{ ...inputStyle, padding: "6px 8px", fontSize: 12, textAlign: "right" }} value={s.rate} onChange={e => { const sv = [...b.services]; sv[i] = {...s, rate: +e.target.value}; upd("services", sv); }} /></td>
                    <td style={{ padding: "4px 6px" }}><select style={{ ...inputStyle, padding: "6px 4px", fontSize: 12 }} value={s.gst} onChange={e => { const sv = [...b.services]; sv[i] = {...s, gst: +e.target.value}; upd("services", sv); }}>{[0,5,12,18,28].map(g => <option key={g} value={g}>{g}%</option>)}</select></td>
                    <td><button onClick={() => upd("services", b.services.filter((_,j) => j!==i))} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, fontSize: 14 }}>✕</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => upd("services", [...(b.services||[]), { id: uid(), name: "New Item", sac: "999900", rate: 0, gst: 18 }])} style={{ ...btnSmall, marginTop: 8, color: T.amber, borderColor: T.amber }}>+ Add service</button>
          <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
            <button onClick={() => saveBusiness(b)} style={btnPrimary} disabled={!b.name}>Save Business</button>
            {businesses.length > 0 && <button onClick={() => setView("dashboard")} style={btnOutline}>Cancel</button>}
          </div>
        </div>
        <Toast />
      </div>
    );
  }

  // ─── DASHBOARD ───
  if (view === "dashboard") {
    const totalRev = bizInvoices.reduce((s, i) => s + calcInvTotals(i).grand, 0);
    const totalTax = bizInvoices.reduce((s, i) => s + calcInvTotals(i).tax, 0);
    return (
      <div style={containerStyle}>
        <LogoFont /><Header /><Nav />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Total Revenue", val: `₹${totalRev.toLocaleString("en-IN")}`, color: T.success, bg: T.successBg },
            { label: "GST Collected", val: `₹${totalTax.toLocaleString("en-IN")}`, color: T.navyLight, bg: T.navySoft },
            { label: "Invoices", val: bizInvoices.length, color: T.amber, bg: T.amberLight },
            { label: "Clients", val: bizClients.length, color: T.navy, bg: T.navyGhost },
          ].map((c, i) => (
            <div key={i} style={{ background: c.bg, borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: c.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: c.color, marginTop: 4, fontFamily: ff }}>{c.val}</div>
            </div>
          ))}
        </div>
        <div style={gridTwo}>
          <div style={cardStyle}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: T.navy }}>Recent Invoices</div>
            {bizInvoices.length === 0 ? <div style={{ fontSize: 13, color: T.textMuted, padding: "20px 0", textAlign: "center" }}>No invoices yet. Create your first! ⚡</div>
            : bizInvoices.slice(-5).reverse().map(inv => {
              const cl = clients.find(c => c.id === inv.clientId);
              const t = calcInvTotals(inv);
              return (
                <div key={inv.id} onClick={() => { setPreviewInv(inv); setView("preview"); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.borderLight}`, cursor: "pointer" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{inv.invNumber || "Draft"}</div>
                    <div style={{ fontSize: 11, color: T.textLight }}>{cl?.name || "—"} · {inv.date}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>₹{t.grand.toLocaleString("en-IN")}</div>
                </div>
              );
            })}
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: T.navy }}>Quick Actions</div>
            {[
              { label: "Create Invoice", icon: "⚡", action: () => { setEditInvoice({...defaultInvoice(), businessId: activeBiz}); setView("createInv"); }},
              { label: "Add Client", icon: "👤", action: () => { setEditClient({...defaultClient(), businessId: activeBiz}); setView("editClient"); }},
              { label: "Add Business", icon: "🏢", action: () => { setEditBiz(defaultBusiness()); setView("onboard"); }},
              { label: "Business Settings", icon: "⚙️", action: () => { setEditBiz({...biz}); setView("editBiz"); }},
            ].map((a, i) => (
              <button key={i} onClick={a.action} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 14px", background: "transparent", border: `1px solid ${T.borderLight}`, borderRadius: 12, cursor: "pointer", fontFamily: ff, marginBottom: 8, transition: "all 0.15s", textAlign: "left" }}
                onMouseOver={e => { e.currentTarget.style.background = T.navyGhost; e.currentTarget.style.borderColor = T.navy; }}
                onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = T.borderLight; }}>
                <span style={{ fontSize: 20 }}>{a.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: T.navy }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>
        <Toast />
      </div>
    );
  }

  // ─── CLIENTS ───
  if (view === "clients") {
    return (
      <div style={containerStyle}>
        <LogoFont /><Header /><Nav />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.navy }}>Clients ({bizClients.length})</div>
          <button onClick={() => { setEditClient({...defaultClient(), businessId: activeBiz}); setView("editClient"); }} style={btnAmber}>+ Add Client</button>
        </div>
        {bizClients.length === 0 ? <div style={{ ...cardStyle, textAlign: "center", padding: 40, color: T.textMuted }}>No clients yet. Add your first client to start invoicing.</div>
        : <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {bizClients.map(cl => (
            <div key={cl.id} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.navy }}>{cl.name}</div>
                  <div style={{ fontSize: 12, color: T.textMid, marginTop: 2 }}>{cl.phone} · {cl.email}</div>
                  <div style={{ fontSize: 11, color: T.textLight, marginTop: 2 }}>{cl.address?.slice(0,50)}</div>
                  {cl.gstin && <span style={{ fontSize: 10, background: T.navySoft, color: T.navy, padding: "2px 8px", borderRadius: 4, fontWeight: 600, marginTop: 4, display: "inline-block" }}>GSTIN: {cl.gstin}</span>}
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button onClick={() => { setEditClient({...cl}); setView("editClient"); }} style={btnSmall}>Edit</button>
                  <button onClick={() => deleteClient(cl.id)} style={{ ...btnSmall, color: T.danger }}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>}
        <Toast />
      </div>
    );
  }

  // ─── CLIENT FORM ───
  if (view === "editClient" && editClient) {
    const c = editClient;
    const upd = (f, v) => setEditClient({ ...c, [f]: v });
    return (
      <div style={containerStyle}>
        <LogoFont /><Header /><Nav />
        <div style={cardStyle}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: T.navy }}>{ clients.find(x => x.id===c.id) ? "Edit" : "Add"} Client</div>
          <div style={gridTwo}>
            <div><label style={labelStyle}>Client Name *</label><input style={inputStyle} value={c.name} onChange={e => upd("name", e.target.value)} placeholder="Full name or business" /></div>
            <div><label style={labelStyle}>Phone *</label><input style={inputStyle} value={c.phone} onChange={e => upd("phone", e.target.value)} placeholder="+91 98765 43210" /></div>
          </div>
          <div style={{ ...gridTwo, marginTop: 12 }}>
            <div><label style={labelStyle}>Email</label><input style={inputStyle} value={c.email} onChange={e => upd("email", e.target.value)} /></div>
            <div><label style={labelStyle}>GSTIN (for B2B)</label><input style={{ ...inputStyle, textTransform: "uppercase" }} value={c.gstin} onChange={e => upd("gstin", e.target.value)} maxLength={15} /></div>
          </div>
          <div style={{ marginTop: 12 }}><label style={labelStyle}>Address</label><textarea style={{ ...inputStyle, minHeight: 56 }} value={c.address} onChange={e => upd("address", e.target.value)} /></div>
          <div style={{ marginTop: 12, maxWidth: 280 }}><label style={labelStyle}>State</label>{stateSelect(c.state, v => upd("state", v))}</div>
          <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
            <button onClick={() => saveClient(c)} style={btnPrimary} disabled={!c.name}>Save Client</button>
            <button onClick={() => setView("clients")} style={btnOutline}>Cancel</button>
          </div>
        </div>
        <Toast />
      </div>
    );
  }

  // ─── INVOICE LIST ───
  if (view === "invoiceList") {
    return (
      <div style={containerStyle}>
        <LogoFont /><Header /><Nav />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.navy }}>Invoices ({bizInvoices.length})</div>
          <button onClick={() => { setEditInvoice({...defaultInvoice(), businessId: activeBiz}); setView("createInv"); }} style={btnAmber}>⚡ New Invoice</button>
        </div>
        {bizInvoices.length === 0 ? <div style={{ ...cardStyle, textAlign: "center", padding: 40, color: T.textMuted }}>No invoices yet.</div>
        : <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead><tr style={{ background: T.navyGhost }}>
              {["Invoice #","Client","Date","Amount","Actions"].map((h,i) => (
                <th key={i} style={{ padding: "10px 14px", textAlign: i===3||i===4?"right":"left", fontSize: 10, fontWeight: 600, textTransform: "uppercase", color: T.textMid }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {bizInvoices.slice().reverse().map(inv => {
                const cl = clients.find(c => c.id === inv.clientId);
                const t = calcInvTotals(inv);
                return (
                  <tr key={inv.id} style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                    <td style={{ padding: "10px 14px", fontWeight: 600, color: T.navy }}>{inv.invNumber || "Draft"}</td>
                    <td style={{ padding: "10px 14px" }}>{cl?.name || "—"}</td>
                    <td style={{ padding: "10px 14px", color: T.textMid }}>{inv.date}</td>
                    <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, color: T.navy }}>₹{t.grand.toLocaleString("en-IN")}</td>
                    <td style={{ padding: "10px 14px", textAlign: "right" }}>
                      <button onClick={() => { setPreviewInv(inv); setView("preview"); }} style={{ ...btnSmall, marginRight: 4 }}>View</button>
                      <button onClick={() => deleteInvoice(inv.id)} style={{ ...btnSmall, color: T.danger }}>✕</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>}
        <Toast />
      </div>
    );
  }

  // ─── CREATE INVOICE ───
  if (view === "createInv" && editInvoice) {
    const inv = editInvoice;
    const upd = (f, v) => setEditInvoice({ ...inv, [f]: v });
    const updItem = (i, f, v) => { const items = [...inv.items]; items[i] = { ...items[i], [f]: v }; upd("items", items); };
    const { lines, sub, tax, grand, isInter } = calcInvTotals(inv);
    const selClient = bizClients.find(c => c.id === inv.clientId);
    const svcOptions = biz?.services || [];

    return (
      <div style={containerStyle}>
        <LogoFont /><Header /><Nav />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
          <div>
            <div style={cardStyle}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: T.navy }}>New Invoice</div>
              <div style={gridTwo}>
                <div>
                  <label style={labelStyle}>Client *</label>
                  <select style={inputStyle} value={inv.clientId} onChange={e => upd("clientId", e.target.value)}>
                    <option value="">Select client...</option>
                    {bizClients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <button onClick={() => { setEditClient({...defaultClient(), businessId: activeBiz}); setView("editClient"); }} style={{ fontSize: 11, color: T.amber, background: "none", border: "none", cursor: "pointer", marginTop: 4, fontWeight: 600 }}>+ New client</button>
                </div>
                <div style={gridTwo}>
                  <div><label style={labelStyle}>Invoice Date</label><input type="date" style={inputStyle} value={inv.date} onChange={e => upd("date", e.target.value)} /></div>
                  <div><label style={labelStyle}>Due Date</label><input type="date" style={inputStyle} value={inv.dueDate} onChange={e => upd("dueDate", e.target.value)} /></div>
                </div>
              </div>
              {selClient && isInter && (
                <div style={{ marginTop: 8, fontSize: 11, background: T.amberLight, border: `1px solid ${T.amber}`, borderRadius: 8, padding: "7px 12px", color: T.amberDark, fontWeight: 500 }}>
                  ⚠ Inter-state supply → IGST applies ({STATES.find(s=>s.code===biz?.state)?.name} → {STATES.find(s=>s.code===selClient?.state)?.name})
                </div>
              )}
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: T.navy }}>Line Items</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ borderBottom: `1px solid ${T.border}` }}>
                  {["Service / Product","SAC/HSN","Qty","Rate ₹","GST","Total",""].map((h,i) => (
                    <th key={i} style={{ padding: "8px 4px", textAlign: i>=2?"right":"left", fontSize: 10, fontWeight: 600, color: T.textMid, width: i===0?"auto":i===6?"24px":"70px" }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {inv.items.map((it, i) => {
                    const ln = lines[i] || {};
                    return (
                      <tr key={it.id} style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                        <td style={{ padding: "4px 2px" }}>
                          <select style={{ ...inputStyle, padding: "7px 6px", fontSize: 12 }} value={it.name} onChange={e => {
                            const sv = svcOptions.find(s => s.name === e.target.value);
                            if (sv) { const items=[...inv.items]; items[i]={...it, name:sv.name, sac: sv.sac||sv.hsn||"", rate: sv.rate, gst: sv.gst}; upd("items", items); }
                            else updItem(i, "name", e.target.value);
                          }}>
                            {svcOptions.map((s,j) => <option key={j} value={s.name}>{s.name}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: "4px 2px" }}><input style={{ ...inputStyle, padding: "7px 6px", fontSize: 12 }} value={it.sac} onChange={e => updItem(i, "sac", e.target.value)} /></td>
                        <td style={{ padding: "4px 2px" }}><input type="number" min={1} style={{ ...inputStyle, padding: "7px 4px", fontSize: 12, textAlign: "center" }} value={it.qty} onChange={e => updItem(i, "qty", +e.target.value)} /></td>
                        <td style={{ padding: "4px 2px" }}><input type="number" style={{ ...inputStyle, padding: "7px 4px", fontSize: 12, textAlign: "right" }} value={it.rate} onChange={e => updItem(i, "rate", +e.target.value)} /></td>
                        <td style={{ padding: "4px 2px" }}>
                          <select style={{ ...inputStyle, padding: "7px 2px", fontSize: 12 }} value={it.gst} onChange={e => updItem(i, "gst", +e.target.value)}>
                            {[0,5,12,18,28].map(g => <option key={g} value={g}>{g}%</option>)}
                          </select>
                        </td>
                        <td style={{ padding: "8px 4px", textAlign: "right", fontWeight: 600, fontSize: 12, color: T.navy }}>₹{(ln.total||0).toLocaleString("en-IN")}</td>
                        <td><button onClick={() => upd("items", inv.items.filter((_,j)=>j!==i))} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, fontSize: 14 }}>✕</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <button onClick={() => { const s = svcOptions[0] || { name: "Item", sac: "999900", rate: 0, gst: 18 }; upd("items", [...inv.items, { id: uid(), ...s, qty: 1 }]); }} style={{ ...btnSmall, marginTop: 8, color: T.amber, borderColor: T.amber, fontWeight: 600 }}>+ Add line item</button>
            </div>
            <div style={{ marginTop: 8 }}>
              <label style={labelStyle}>Notes / Terms</label>
              <textarea style={{ ...inputStyle, minHeight: 50 }} value={inv.notes} onChange={e => upd("notes", e.target.value)} placeholder="Payment terms, thank you note, etc." />
            </div>
          </div>
          <div>
            <div style={{ ...cardStyle, position: "sticky", top: 16, borderColor: T.navy, borderWidth: 1.5 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: T.navy }}>Summary</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", color: T.textMid }}><span>Subtotal</span><span style={{ fontWeight: 600, color: T.navy }}>₹{sub.toLocaleString("en-IN")}</span></div>
              {isInter
                ? <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", color: T.textMid }}><span>IGST</span><span style={{ fontWeight: 600, color: T.navy }}>₹{tax.toLocaleString("en-IN")}</span></div>
                : <>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", color: T.textMid }}><span>CGST</span><span style={{ fontWeight: 600, color: T.navy }}>₹{Math.round(tax/2).toLocaleString("en-IN")}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", color: T.textMid }}><span>SGST</span><span style={{ fontWeight: 600, color: T.navy }}>₹{Math.round(tax/2).toLocaleString("en-IN")}</span></div>
                </>
              }
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700, padding: "12px 0 4px", borderTop: `2px solid ${T.navy}`, marginTop: 8, color: T.navy }}><span>Grand Total</span><span>₹{grand.toLocaleString("en-IN")}</span></div>
              <div style={{ fontSize: 11, color: T.textLight, fontStyle: "italic", marginTop: 4 }}>{numberToWords(grand).replace(/^\w/, c => c.toUpperCase())} rupees only</div>
              <button onClick={() => saveInvoice({...inv})} style={{ ...btnAmber, width: "100%", marginTop: 16, padding: 13 }} disabled={!inv.clientId || inv.items.length === 0}>
                ⚡ Generate Invoice
              </button>
            </div>
          </div>
        </div>
        <Toast />
      </div>
    );
  }

  // ─── INVOICE PREVIEW ───
  if (view === "preview" && previewInv) {
    const inv = previewInv;
    const bizObj = businesses.find(b => b.id === inv.businessId) || biz;
    const cl = clients.find(c => c.id === inv.clientId);
    const tmpl = INDUSTRY_TEMPLATES[bizObj?.industry];
    const { lines, sub, tax, grand, isInter } = calcInvTotals(inv);
    const cgst = Math.round(tax / 2);
    const supplyState = cl ? STATES.find(s => s.code === cl.state) : null;

    const printInvoice = () => {
      const el = document.getElementById("printable-invoice");
      if (!el) return;
      const w = window.open("", "_blank");
      w.document.write(`<html><head><title>Invoice ${inv.invNumber}</title><link href="https://fonts.googleapis.com/css2?family=Righteous&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"><style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Outfit', sans-serif; color: #0C1E3C; }
        body { padding: 32px; font-size: 12px; }
        .logo-text { font-family: 'Righteous', cursive; }
        img { max-width: 100%; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        table { width: 100%; border-collapse: collapse; }
        .inv-tbl th { background: #0C1E3C !important; color: #fff !important; padding: 7px 8px; font-size: 10px; text-transform: uppercase; text-align: left; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        .inv-tbl th:last-child, .inv-tbl td:last-child { text-align: right; }
        .inv-tbl td { padding: 7px 8px; border-bottom: 1px solid #E8EDF5; font-size: 11px; }
        @media print { body { padding: 16px; } img { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
      </style></head><body>${el.innerHTML}</body></html>`);
      w.document.close();
      setTimeout(() => w.print(), 500);
    };

    const shareWhatsApp = () => {
      if (!cl) return;
      const phone = (cl.phone || "").replace(/\D/g, "");
      const msg = `Hi ${cl.name} 👋\n\nYour invoice from *${bizObj?.name}* is ready!\n\n📄 Invoice: *${inv.invNumber}*\n💰 Amount: *₹${grand.toLocaleString("en-IN")}*\n📅 Due: ${inv.dueDate}\n\nThank you for your business! 🙏\n\n— ${bizObj?.name} | Powered by ChargeKro`;
      window.open(`https://wa.me/${phone.startsWith("91")?phone:"91"+phone}?text=${encodeURIComponent(msg)}`, "_blank");
    };

    return (
      <div style={containerStyle}>
        <LogoFont /><Header /><Nav />
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <button onClick={() => setView("invoiceList")} style={btnOutline}>← Back</button>
          <button onClick={printInvoice} style={btnPrimary}>🖨 Print / PDF</button>
          <button onClick={shareWhatsApp} style={{ ...btnAmber, background: "#25D366" }}>💬 WhatsApp</button>
        </div>
        <div id="printable-invoice" style={{ background: "#fff", color: T.navy, border: `1px solid ${T.border}`, borderRadius: 14, padding: 32, fontSize: 12, lineHeight: 1.6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 18, borderBottom: `3px solid ${T.navy}`, marginBottom: 18 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              {bizObj?.logo && (
                <img src={bizObj.logo} alt="Business Logo" style={{
                  width: 72, height: 72, objectFit: "contain", borderRadius: 8,
                  border: `1px solid ${T.borderLight}`, padding: 4, flexShrink: 0,
                }} />
              )}
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: T.navy }}>{bizObj?.name}</div>
                {bizObj?.tagline && <div style={{ fontSize: 10, color: T.textLight, textTransform: "uppercase", letterSpacing: "0.1em" }}>{bizObj.tagline}</div>}
                <div style={{ fontSize: 11, color: T.textMid, marginTop: 6, maxWidth: 260 }}>{bizObj?.address}</div>
                <div style={{ fontSize: 11, color: T.textMid }}>{bizObj?.phone} · {bizObj?.email}</div>
                {bizObj?.gstin && <span style={{ display: "inline-block", background: T.navySoft, color: T.navy, fontSize: 9, padding: "2px 8px", borderRadius: 4, fontWeight: 700, marginTop: 4 }}>GSTIN: {bizObj.gstin}</span>}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: T.navy }}>TAX INVOICE</div>
              <div style={{ fontSize: 12, marginTop: 4, fontWeight: 700, color: T.amber }}>{inv.invNumber}</div>
              <div style={{ fontSize: 11, color: T.textMid }}>Date: {inv.date}</div>
              <div style={{ fontSize: 11, color: T.textMid }}>Due: {inv.dueDate}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
            <div style={{ background: T.navyGhost, borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: T.textLight, marginBottom: 4 }}>Bill To</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{cl?.name || "—"}</div>
              <div style={{ fontSize: 11, color: T.textMid, marginTop: 2 }}>{cl?.address}</div>
              <div style={{ fontSize: 11, color: T.textMid }}>{cl?.phone} · {cl?.email}</div>
              {cl?.gstin && <span style={{ display: "inline-block", background: T.navySoft, color: T.navy, fontSize: 9, padding: "2px 8px", borderRadius: 4, fontWeight: 700, marginTop: 4 }}>GSTIN: {cl.gstin}</span>}
            </div>
            <div style={{ background: T.navyGhost, borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: T.textLight, marginBottom: 4 }}>Supply Details</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{isInter ? "Inter-State → IGST" : "Intra-State → CGST + SGST"}</div>
              <div style={{ fontSize: 11, color: T.textMid, marginTop: 2 }}>Place of Supply: {supplyState?.name || "—"}</div>
              <div style={{ fontSize: 11, color: T.textMid }}>Industry: {tmpl?.label || "General"}</div>
            </div>
          </div>
          <table className="inv-tbl" style={{ width: "100%", borderCollapse: "collapse", marginBottom: 14 }}>
            <thead><tr>
              {["#","Description","Qty","Rate","Taxable","GST %","GST Amt","Total"].map((h,i) => (
                <th key={i} style={{ background: T.navy, color: T.white, padding: "8px 8px", fontSize: 10, textTransform: "uppercase", textAlign: i > 1 ? "right" : "left" }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {lines.map((l, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                  <td style={{ padding: "8px", fontSize: 11 }}>{i+1}</td>
                  <td style={{ padding: "8px", fontSize: 11 }}>{l.name}<br/><span style={{ fontSize: 10, color: T.textLight }}>SAC/HSN: {l.sac}</span></td>
                  <td style={{ padding: "8px", fontSize: 11, textAlign: "right" }}>{l.qty}</td>
                  <td style={{ padding: "8px", fontSize: 11, textAlign: "right" }}>₹{(l.rate||0).toLocaleString("en-IN")}</td>
                  <td style={{ padding: "8px", fontSize: 11, textAlign: "right" }}>₹{(l.base||0).toLocaleString("en-IN")}</td>
                  <td style={{ padding: "8px", fontSize: 11, textAlign: "right" }}>{l.gst}%</td>
                  <td style={{ padding: "8px", fontSize: 11, textAlign: "right" }}>₹{(l.gstAmt||0).toLocaleString("en-IN")}</td>
                  <td style={{ padding: "8px", fontSize: 12, textAlign: "right", fontWeight: 700, color: T.navy }}>₹{(l.total||0).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ background: T.navySoft, borderRadius: 6, padding: "8px 12px", marginBottom: 14, fontSize: 11, color: T.textMid }}>
            <strong style={{ color: T.navy }}>Amount in words:</strong> {numberToWords(grand).replace(/^\w/, c => c.toUpperCase())} rupees only
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
            <div style={{ width: 240 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", color: T.textMid }}><span>Subtotal</span><span>₹{sub.toLocaleString("en-IN")}</span></div>
              {isInter
                ? <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", color: T.textMid }}><span>IGST</span><span>₹{tax.toLocaleString("en-IN")}</span></div>
                : <>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", color: T.textMid }}><span>CGST</span><span>₹{cgst.toLocaleString("en-IN")}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", color: T.textMid }}><span>SGST</span><span>₹{cgst.toLocaleString("en-IN")}</span></div>
                </>
              }
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800, padding: "10px 0 4px", borderTop: `2.5px solid ${T.navy}`, marginTop: 6, color: T.navy }}><span>Grand Total</span><span>₹{grand.toLocaleString("en-IN")}</span></div>
            </div>
          </div>
          {inv.notes && <div style={{ fontSize: 11, color: T.textMid, marginBottom: 14 }}><strong style={{ color: T.navy }}>Notes:</strong> {inv.notes}</div>}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 14, borderTop: `1px solid ${T.borderLight}` }}>
            <div style={{ fontSize: 10, color: T.textLight }}>
              {bizObj?.bankName && <><strong style={{ color: T.textMid, display: "block", marginBottom: 2 }}>Bank Payment Details</strong>
              Bank: {bizObj.bankName} · A/c: {bizObj.bankAcc}<br/>
              IFSC: {bizObj.bankIfsc} · Type: {bizObj.bankType}</>}
            </div>
            <div style={{ textAlign: "right", fontSize: 10, color: T.textLight }}>
              <div style={{ width: 100, borderBottom: `1px solid ${T.textLight}`, margin: "16px 0 4px auto" }}></div>
              Authorised Signatory<br/>{bizObj?.name}
            </div>
          </div>
          <div style={{ fontSize: 9, color: T.textMuted, textAlign: "center", marginTop: 16, paddingTop: 8, borderTop: `1px solid ${T.borderLight}` }}>
            Computer generated invoice · Powered by ChargeKro
          </div>
        </div>
        <Toast />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <LogoFont /><Header /><Nav />
      <div style={{ textAlign: "center", padding: 40, color: T.textMuted }}>Select an option from the menu above.</div>
      <Toast />
    </div>
  );
}
