import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, ComposedChart, Line, Area } from "recharts";

const COLORS = {
  slate900: "#0f172a",
  slate800: "#1e293b",
  slate700: "#334155",
  slate600: "#475569",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate300: "#cbd5e1",
  slate200: "#e2e8f0",
  slate100: "#f1f5f9",
  slate50: "#f8fafc",
  crimson: "#dc2626",
  crimsonLight: "#ef4444",
  crimsonDark: "#991b1b",
  amber: "#f59e0b",
  amberLight: "#fbbf24",
  amberDark: "#92400e",
  teal: "#0d9488",
  tealLight: "#2dd4bf",
  tealDark: "#115e59",
  blue: "#3b82f6",
  blueLight: "#60a5fa",
  blueDark: "#1e40af",
  purple: "#8b5cf6",
  purpleLight: "#a78bfa",
  rose: "#f43f5e",
  roseLight: "#fb7185",
  emerald: "#10b981",
  emeraldLight: "#34d399",
};

const CHART_COLORS = [COLORS.crimson, COLORS.teal, COLORS.amber, COLORS.blue, COLORS.purple, COLORS.rose, COLORS.emerald];

// ─── DATA ───────────────────────────────────────────────────────────────────
const outcomeAll = [
  { name: "Eviction Granted", value: 7920, pct: 52.7 },
  { name: "Dismissed/Settled", value: 4618, pct: 30.7 },
  { name: "Unknown—Closed", value: 2226, pct: 14.8 },
];

const caseTypeByLandlord = [
  { type: "Residential Eviction", corporate: 11241, nonCorp: 1264, total: 12505 },
  { type: "Eviction Non-Monetary", corporate: 1788, nonCorp: 506, total: 2294 },
  { type: "Non-Residential Eviction", corporate: 193, nonCorp: 38, total: 231 },
  { type: "CA — Eviction", corporate: 8, nonCorp: 1, total: 9 },
];

const outcomeByLandlord = [
  { outcome: "Eviction Granted", corporate: 53.1, nonCorp: 57.9, corpN: 6951, nonCorpN: 969 },
  { outcome: "Dismissed/Settled", corporate: 34.0, nonCorp: 9.8, corpN: 4454, nonCorpN: 164 },
  { outcome: "Unknown—Closed", corporate: 12.9, nonCorp: 32.2, corpN: 1687, nonCorpN: 539 },
];

const repConfig = [
  { config: "Plaintiff rep, Defendant unrep", count: 13694, pct: 91.1 },
  { config: "Both represented", count: 217, pct: 1.4 },
  { config: "Neither represented", count: 1113, pct: 7.4 },
  { config: "Defendant rep, Plaintiff unrep", count: 15, pct: 0.1 },
];

const outcomeByDefRep = [
  { outcome: "Eviction Granted", represented: 47.4, unrepresented: 53.8, repN: 102, unrepN: 7818 },
  { outcome: "Dismissed/Settled", represented: 24.7, unrepresented: 31.4, repN: 53, unrepN: 4565 },
  { outcome: "Unknown—Closed", represented: 27.9, unrepresented: 14.9, repN: 60, unrepN: 2166 },
];

const topAttorneys = [
  { name: "James Barron", cases: 5330, pct: 35.4 },
  { name: "William McCabe", cases: 1315, pct: 8.7 },
  { name: "Jay Swistak", cases: 1050, pct: 7.0 },
  { name: "Elizabeth Rivera", cases: 902, pct: 6.0 },
  { name: "Jeffery Wilkins", cases: 720, pct: 4.8 },
  { name: "Kenneth Lowenhaupt", cases: 540, pct: 3.6 },
  { name: "Matthew Siegel", cases: 499, pct: 3.3 },
  { name: "Barry Johnson", cases: 269, pct: 1.8 },
  { name: "Mark Lippman", cases: 237, pct: 1.6 },
  { name: "Ryan McCain", cases: 157, pct: 1.0 },
];

const topPlaintiffs = [
  { name: "Southern Oaks Residences", cases: 121 },
  { name: "Harbor Beach Acquisition", cases: 99 },
  { name: "Alvista West Vue (Orlando 442)", cases: 90 },
  { name: "Bella Vita Apartments", cases: 79 },
  { name: "Wesley Apartments", cases: 78 },
  { name: "Aria Beach I", cases: 75 },
  { name: "Caden 1989 TIC I", cases: 73 },
  { name: "The Lorenzo at East Mil", cases: 73 },
  { name: "Blvd 2600 Apartments", cases: 71 },
  { name: "Ellery at Lake Sherwood", cases: 70 },
  { name: "Bellagio Apartments", cases: 70 },
  { name: "VR Northbridge Holdings", cases: 69 },
  { name: "Advenir at the Oaks", cases: 68 },
  { name: "525 Avalon Park", cases: 67 },
  { name: "PLK Harbortown Apts III", cases: 67 },
  { name: "Indigo Apts Winter Park", cases: 65 },
  { name: "Palio Apartments", cases: 65 },
  { name: "KYOL LLC", cases: 65 },
  { name: "Twelve Oaks Owner", cases: 63 },
  { name: "Azure Winter Park", cases: 62 },
];

const ftjHistogram = [
  { range: "0–7", count: 7 }, { range: "7–14", count: 202 }, { range: "14–21", count: 2136 },
  { range: "21–28", count: 2430 }, { range: "28–35", count: 1509 }, { range: "35–42", count: 780 },
  { range: "42–49", count: 474 }, { range: "49–56", count: 364 }, { range: "56–63", count: 280 },
  { range: "63–70", count: 183 }, { range: "70–77", count: 132 }, { range: "77–84", count: 122 },
  { range: "84–91", count: 96 }, { range: "91–98", count: 81 }, { range: "98–105", count: 76 },
  { range: "105–112", count: 36 }, { range: "112–119", count: 51 }, { range: "119–126", count: 37 },
  { range: "126–133", count: 24 }, { range: "133–140", count: 29 }, { range: "140–147", count: 31 },
  { range: "147–154", count: 28 }, { range: "154–161", count: 21 }, { range: "161–168", count: 15 },
];

const ftwHistogram = [
  { range: "0–7", count: 1 }, { range: "7–14", count: 0 }, { range: "14–21", count: 9 },
  { range: "21–28", count: 104 }, { range: "28–35", count: 580 }, { range: "35–42", count: 1276 },
  { range: "42–49", count: 1303 }, { range: "49–56", count: 1079 }, { range: "56–63", count: 718 },
  { range: "63–70", count: 556 }, { range: "70–77", count: 329 }, { range: "77–84", count: 294 },
  { range: "84–91", count: 154 }, { range: "91–98", count: 138 }, { range: "98–105", count: 105 },
  { range: "105–112", count: 72 }, { range: "112–119", count: 77 }, { range: "119–126", count: 67 },
  { range: "126–133", count: 44 }, { range: "133–140", count: 27 }, { range: "140–147", count: 32 },
  { range: "147–154", count: 19 }, { range: "154–161", count: 34 }, { range: "161–168", count: 17 },
];

const monthlyFilings = [
  { month: "Jan", filings: 1476 }, { month: "Feb", filings: 1291 }, { month: "Mar", filings: 1005 },
  { month: "Apr", filings: 1120 }, { month: "May", filings: 1287 }, { month: "Jun", filings: 1222 },
  { month: "Jul", filings: 1405 }, { month: "Aug", filings: 1342 }, { month: "Sep", filings: 1291 },
  { month: "Oct", filings: 1295 }, { month: "Nov", filings: 1063 }, { month: "Dec", filings: 1242 },
];

const plaintiffRepByLandlord = [
  { type: "Corporate", represented: 98.8, unrepresented: 1.2, repN: 13068, unrepN: 162 },
  { type: "Non-Corporate", represented: 46.6, unrepresented: 53.4, repN: 843, unrepN: 966 },
];

const writData = [
  { label: "All Filings", total: 15039 },
  { label: "Writs Issued", total: 7905, pct: 52.6 },
  { label: "Writs Posted", total: 7165, pct: 90.6 },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const SectionHeader = ({ figure, title, description }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
      <span style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 11, fontWeight: 700, letterSpacing: 2,
        color: COLORS.crimson, textTransform: "uppercase",
      }}>{figure}</span>
      <h2 style={{
        fontFamily: "'Playfair Display', 'Georgia', serif",
        fontSize: 22, fontWeight: 700, color: COLORS.slate900,
        margin: 0, lineHeight: 1.2,
      }}>{title}</h2>
    </div>
    <p style={{
      fontFamily: "'Source Serif 4', 'Georgia', serif",
      fontSize: 14, color: COLORS.slate500, margin: 0, lineHeight: 1.5, maxWidth: 680,
    }}>{description}</p>
  </div>
);

const StatCard = ({ label, value, subtext, accent = COLORS.crimson }) => (
  <div style={{
    background: COLORS.slate50, borderLeft: `3px solid ${accent}`,
    padding: "14px 18px", flex: 1, minWidth: 140,
  }}>
    <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 26,
      fontWeight: 700, color: COLORS.slate900, lineHeight: 1.1,
    }}>{value}</div>
    <div style={{
      fontFamily: "'Source Serif 4', serif", fontSize: 13,
      color: COLORS.slate600, marginTop: 4,
    }}>{label}</div>
    {subtext && <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
      color: accent, marginTop: 2,
    }}>{subtext}</div>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: COLORS.slate900, color: COLORS.slate100,
      padding: "10px 14px", borderRadius: 2, fontSize: 12,
      fontFamily: "'Source Serif 4', serif", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <span style={{ width: 8, height: 8, background: p.color, display: "inline-block" }} />
          <span>{p.name}: <strong>{typeof p.value === 'number' && p.value < 1 ? `${(p.value).toFixed(1)}%` : p.value?.toLocaleString()}</strong></span>
        </div>
      ))}
    </div>
  );
};

const DataTable = ({ headers, rows, caption }) => (
  <div style={{ overflowX: "auto", marginTop: 16, marginBottom: 8 }}>
    {caption && <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
      color: COLORS.slate500, textTransform: "uppercase", letterSpacing: 1.5,
      marginBottom: 8,
    }}>{caption}</div>}
    <table style={{
      width: "100%", borderCollapse: "collapse",
      fontFamily: "'Source Serif 4', serif", fontSize: 13,
    }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{
              textAlign: i === 0 ? "left" : "right", padding: "8px 12px",
              borderBottom: `2px solid ${COLORS.slate900}`, fontWeight: 700,
              fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5,
              color: COLORS.slate700,
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ background: ri % 2 === 0 ? "transparent" : COLORS.slate50 }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{
                textAlign: ci === 0 ? "left" : "right", padding: "7px 12px",
                borderBottom: `1px solid ${COLORS.slate200}`, color: COLORS.slate800,
                fontFamily: ci > 0 ? "'JetBrains Mono', monospace" : "inherit",
                fontSize: ci > 0 ? 12 : 13,
              }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Divider = () => (
  <div style={{
    height: 1, background: `linear-gradient(90deg, ${COLORS.crimson}, ${COLORS.slate300}, transparent)`,
    margin: "48px 0", opacity: 0.5,
  }} />
);

// ─── MAIN DASHBOARD ─────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "fig1", label: "Fig 1 & Table 1" },
  { id: "fig2", label: "Fig 2 & Table 2" },
  { id: "representation", label: "Representation" },
  { id: "fig3", label: "Fig 3: Timelines" },
  { id: "attorneys", label: "Attorneys" },
  { id: "repeat", label: "Repeat Players" },
];

export default function ThesisViz() {
  const [tab, setTab] = useState("overview");

  return (
    <div style={{
      fontFamily: "'Source Serif 4', 'Georgia', serif",
      background: "#fff", minHeight: "100vh", color: COLORS.slate900,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: COLORS.slate900, color: "#fff", padding: "40px 32px 32px",
        borderBottom: `3px solid ${COLORS.crimson}`,
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            letterSpacing: 3, textTransform: "uppercase", color: COLORS.crimson,
            marginBottom: 12,
          }}>ORANGE COUNTY, FLORIDA · 2024 EVICTION DOCKET · N = 15,039</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 32,
            fontWeight: 900, margin: 0, lineHeight: 1.15, letterSpacing: -0.5,
          }}>Dual Infrastructure</h1>
          <p style={{
            fontSize: 15, color: COLORS.slate400, marginTop: 8, maxWidth: 700,
            lineHeight: 1.5, fontStyle: "italic",
          }}>
            Corporate Landlords, Representation Asymmetry, and the Function of Eviction Court
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        background: COLORS.slate50, borderBottom: `1px solid ${COLORS.slate200}`,
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{
          maxWidth: 960, margin: "0 auto", display: "flex", gap: 0,
          overflowX: "auto", padding: "0 16px",
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: 0.5, padding: "12px 16px", cursor: "pointer",
              background: "transparent", border: "none",
              borderBottom: tab === t.id ? `2px solid ${COLORS.crimson}` : "2px solid transparent",
              color: tab === t.id ? COLORS.crimson : COLORS.slate500,
              fontWeight: tab === t.id ? 700 : 400, whiteSpace: "nowrap",
              transition: "all 0.2s ease",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 32px 60px" }}>

        {/* ═══ OVERVIEW ═══ */}
        {tab === "overview" && (
          <div>
            <SectionHeader figure="OVERVIEW" title="The System at a Glance"
              description="Key metrics from 15,039 eviction filings in Orange County's 2024 docket, revealing a system defined by corporate dominance, extreme representation asymmetry, and concentrated litigation capacity." />

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
              <StatCard label="Total Filings" value="15,039" subtext="2024 calendar year" />
              <StatCard label="Corporate Filers" value="88.0%" subtext="13,230 of 15,039" accent={COLORS.teal} />
              <StatCard label="Plaintiff Represented" value="92.5%" subtext="13,911 cases" accent={COLORS.blue} />
              <StatCard label="Defendant Represented" value="1.5%" subtext="232 cases" accent={COLORS.amber} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
              <StatCard label="Evictions Granted" value="52.7%" subtext="7,920 cases" accent={COLORS.crimsonDark} />
              <StatCard label="Dismissed/Settled" value="30.7%" subtext="4,618 cases" accent={COLORS.tealDark} />
              <StatCard label="Writs Posted" value="47.6%" subtext="7,165 tenants" accent={COLORS.purple} />
              <StatCard label="Median Days to Judgment" value="27" subtext="filing → judgment" accent={COLORS.amberDark} />
            </div>

            {/* Monthly filing trend */}
            <div style={{ marginTop: 24 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: COLORS.slate500, textTransform: "uppercase", letterSpacing: 1.5,
                marginBottom: 12,
              }}>MONTHLY FILING VOLUME, 2024</div>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={monthlyFilings} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid stroke={COLORS.slate200} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fill: COLORS.slate500 }} axisLine={{ stroke: COLORS.slate300 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: COLORS.slate400 }} axisLine={false} tickLine={false} domain={[800, 1600]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area dataKey="filings" fill={COLORS.crimson} fillOpacity={0.08} stroke="none" />
                  <Line dataKey="filings" stroke={COLORS.crimson} strokeWidth={2} dot={{ fill: COLORS.crimson, r: 3 }} name="Filings" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Writ funnel */}
            <div style={{ marginTop: 36 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: COLORS.slate500, textTransform: "uppercase", letterSpacing: 1.5,
                marginBottom: 16,
              }}>DISPLACEMENT FUNNEL</div>
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                {writData.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{
                      background: i === 0 ? COLORS.slate100 : i === 1 ? `${COLORS.amber}18` : `${COLORS.crimson}18`,
                      border: `1px solid ${i === 0 ? COLORS.slate300 : i === 1 ? COLORS.amber : COLORS.crimson}`,
                      padding: "16px 24px", textAlign: "center", minWidth: 160,
                    }}>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 22,
                        fontWeight: 700, color: i === 0 ? COLORS.slate700 : i === 1 ? COLORS.amberDark : COLORS.crimsonDark,
                      }}>{d.total.toLocaleString()}</div>
                      <div style={{ fontSize: 12, color: COLORS.slate600, marginTop: 2 }}>{d.label}</div>
                      {d.pct && <div style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                        color: COLORS.slate500, marginTop: 2,
                      }}>{i === 1 ? `${d.pct}% of filings` : `${d.pct}% of issued`}</div>}
                    </div>
                    {i < writData.length - 1 && (
                      <div style={{
                        width: 0, height: 0, borderTop: "12px solid transparent",
                        borderBottom: "12px solid transparent", borderLeft: `12px solid ${COLORS.slate400}`,
                        margin: "0 4px",
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ FIGURE 1 & TABLE 1 ═══ */}
        {tab === "fig1" && (
          <div>
            <SectionHeader figure="TABLE 1" title="Filing Composition by Case Type & Landlord Type"
              description="Corporate plaintiffs dominate every case category. Of 15,039 total filings, 13,230 (88.0%) were filed by corporate entities across all case types." />

            <DataTable
              caption="Filing composition — Orange County 2024"
              headers={["Case Type", "Corporate", "Non-Corporate", "Total", "% Corp"]}
              rows={caseTypeByLandlord.map(r => [
                r.type,
                r.corporate.toLocaleString(),
                r.nonCorp.toLocaleString(),
                r.total.toLocaleString(),
                `${((r.corporate / r.total) * 100).toFixed(1)}%`,
              ])}
            />

            <div style={{
              background: COLORS.slate50, padding: 16, marginTop: 8,
              borderLeft: `3px solid ${COLORS.slate400}`, fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace", color: COLORS.slate600,
            }}>
              TOTAL: 13,230 Corporate (88.0%) · 1,809 Non-Corporate (12.0%) · 15,039 Total
            </div>

            <Divider />

            <SectionHeader figure="FIGURE 1" title="Outcome Distribution across All Filings"
              description="Over half of all filings resulted in an eviction granted. Nearly a third ended in dismissal or settlement—a pattern driven overwhelmingly by corporate filers." />

            <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
              <div style={{ flex: "0 0 280px" }}>
                <ResponsiveContainer width={280} height={280}>
                  <PieChart>
                    <Pie data={outcomeAll} cx="50%" cy="50%" innerRadius={65} outerRadius={120}
                      dataKey="value" startAngle={90} endAngle={-270} paddingAngle={2}>
                      {outcomeAll.map((_, i) => (
                        <Cell key={i} fill={[COLORS.crimson, COLORS.teal, COLORS.slate400][i]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ flex: 1 }}>
                {outcomeAll.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{
                      width: 14, height: 14,
                      background: [COLORS.crimson, COLORS.teal, COLORS.slate400][i],
                    }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{d.name}</div>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: COLORS.slate600
                      }}>
                        {d.value.toLocaleString()} cases ({d.pct}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ FIGURE 2 & TABLE 2 ═══ */}
        {tab === "fig2" && (
          <div>
            <SectionHeader figure="FIGURE 2" title="Outcome Distribution by Landlord Type"
              description="The starkest divergence: corporate plaintiffs dismissed or settled 34.0% of their cases versus just 9.8% for non-corporate plaintiffs — a 3.5× differential consistent with the 'eviction as rent-enforcement' hypothesis." />

            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={outcomeByLandlord} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid stroke={COLORS.slate200} strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fill: COLORS.slate500 }}
                  axisLine={{ stroke: COLORS.slate300 }} tickLine={false} domain={[0, 65]} unit="%" />
                <YAxis type="category" dataKey="outcome" width={130}
                  tick={{ fontSize: 12, fontFamily: "'Source Serif 4', serif", fill: COLORS.slate700 }}
                  axisLine={false} tickLine={false} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div style={{ background: COLORS.slate900, color: "#fff", padding: "10px 14px", borderRadius: 2, fontSize: 12, fontFamily: "'Source Serif 4', serif" }}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
                      {payload.map((p, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                          <span style={{ width: 8, height: 8, background: p.color, display: "inline-block" }} />
                          <span>{p.name}: <strong>{p.value}%</strong></span>
                        </div>
                      ))}
                    </div>
                  );
                }} />
                <Legend wrapperStyle={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }} />
                <Bar dataKey="corporate" name="Corporate" fill={COLORS.crimson} barSize={22} radius={[0, 2, 2, 0]} />
                <Bar dataKey="nonCorp" name="Non-Corporate" fill={COLORS.teal} barSize={22} radius={[0, 2, 2, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <Divider />

            <SectionHeader figure="TABLE 2" title="Cross-Tabulation: Landlord Type × Case Outcome"
              description="Chi-square test: χ² = 652.65, df = 2, p < 0.0001. Cramér's V = 0.210, indicating a moderate-to-strong association." />

            <DataTable
              caption="Outcome counts by landlord type (n = 14,764 non-missing)"
              headers={["Outcome", "Corporate (n)", "Corporate (%)", "Non-Corp (n)", "Non-Corp (%)"]}
              rows={outcomeByLandlord.map(r => [
                r.outcome,
                r.corpN.toLocaleString(),
                `${r.corporate}%`,
                r.nonCorpN.toLocaleString(),
                `${r.nonCorp}%`,
              ])}
            />

            <div style={{
              background: `${COLORS.crimson}08`, border: `1px solid ${COLORS.crimson}30`,
              padding: "14px 18px", marginTop: 16, fontSize: 13,
              fontFamily: "'Source Serif 4', serif", color: COLORS.slate700, lineHeight: 1.6,
            }}>
              <strong style={{ color: COLORS.crimson }}>Key finding:</strong> In the restricted comparison (eviction granted vs. dismissed/settled only), corporate plaintiffs won evictions in 60.9% of determinate cases versus 85.5% for non-corporate plaintiffs. The odds ratio of 3.72 (p &lt; 0.0001) indicates non-corporate plaintiffs were nearly four times as likely to receive an eviction judgment when a clear disposition existed.
            </div>
          </div>
        )}

        {/* ═══ REPRESENTATION ═══ */}
        {tab === "representation" && (
          <div>
            <SectionHeader figure="REPRESENTATION" title="The Asymmetry of Legal Power"
              description="91.1% of the entire docket consisted of a represented plaintiff facing an unrepresented defendant—a structural imbalance that defines the court's procedural landscape." />

            {/* Representation config */}
            <div style={{ marginBottom: 36 }}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={repConfig} layout="vertical" margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
                  <CartesianGrid stroke={COLORS.slate200} strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: COLORS.slate500 }}
                    axisLine={{ stroke: COLORS.slate300 }} tickLine={false} />
                  <YAxis type="category" dataKey="config" width={220}
                    tick={{ fontSize: 12, fontFamily: "'Source Serif 4', serif", fill: COLORS.slate700 }}
                    axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Cases" fill={COLORS.blue} barSize={26} radius={[0, 2, 2, 0]}>
                    {repConfig.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? COLORS.crimson : i === 3 ? COLORS.teal : COLORS.slate400} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <Divider />

            {/* Plaintiff rep by landlord type */}
            <SectionHeader figure="BY LANDLORD TYPE" title="Plaintiff Representation Rates"
              description="98.8% of corporate plaintiffs had counsel versus 46.6% of non-corporate plaintiffs. Legal infrastructure is embedded in the corporate filing model." />

            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 36 }}>
              {plaintiffRepByLandlord.map((d, i) => (
                <div key={i} style={{ flex: 1, minWidth: 220 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{d.type} Plaintiffs</div>
                  <div style={{ background: COLORS.slate100, borderRadius: 2, overflow: "hidden", height: 32, display: "flex" }}>
                    <div style={{
                      width: `${d.represented}%`, background: i === 0 ? COLORS.crimson : COLORS.teal,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700,
                    }}>{d.represented}%</div>
                    <div style={{
                      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                      color: COLORS.slate600, fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    }}>{d.unrepresented}%</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: COLORS.slate500, fontFamily: "'JetBrains Mono', monospace" }}>
                    <span>Represented ({d.repN.toLocaleString()})</span>
                    <span>Unrep. ({d.unrepN.toLocaleString()})</span>
                  </div>
                </div>
              ))}
            </div>

            <Divider />

            {/* Outcomes by defendant representation */}
            <SectionHeader figure="DEFENDANT COUNSEL" title="Outcomes by Tenant Representation"
              description="Represented defendants had an 8.8 percentage-point lower eviction-grant rate (47.4% vs 53.8%, n=232). Chi-square: χ² = 31.67, df = 2, p < 0.0001." />

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={outcomeByDefRep} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid stroke={COLORS.slate200} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="outcome" tick={{ fontSize: 11, fontFamily: "'Source Serif 4', serif", fill: COLORS.slate700 }}
                  axisLine={{ stroke: COLORS.slate300 }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: COLORS.slate500 }}
                  axisLine={false} tickLine={false} unit="%" domain={[0, 60]} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div style={{ background: COLORS.slate900, color: "#fff", padding: "10px 14px", borderRadius: 2, fontSize: 12, fontFamily: "'Source Serif 4', serif" }}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
                      {payload.map((p, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                          <span style={{ width: 8, height: 8, background: p.color, display: "inline-block" }} />
                          <span>{p.name}: <strong>{p.value}%</strong></span>
                        </div>
                      ))}
                    </div>
                  );
                }} />
                <Legend wrapperStyle={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }} />
                <Bar dataKey="represented" name="Represented (n=232)" fill={COLORS.teal} barSize={36} radius={[2, 2, 0, 0]} />
                <Bar dataKey="unrepresented" name="Unrepresented (n=14,532)" fill={COLORS.crimson} barSize={36} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* ═══ FIGURE 3: TIMELINES ═══ */}
        {tab === "fig3" && (
          <div>
            <SectionHeader figure="FIGURE 3A" title="Distribution of Filing-to-Judgment Intervals"
              description="Most cases reached judgment within 14–35 days of filing. The median was 27 days. The sharp peak at weeks 3–4 reflects the statutory timeline of Florida eviction procedure." />

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ftjHistogram} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid stroke={COLORS.slate200} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", fill: COLORS.slate500 }}
                  axisLine={{ stroke: COLORS.slate300 }} tickLine={false} angle={-45} textAnchor="end" height={50}
                  label={{ value: "Days from Filing to Judgment", position: "bottom", offset: 0, style: { fontSize: 11, fontFamily: "'Source Serif 4', serif", fill: COLORS.slate600 } }} />
                <YAxis tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: COLORS.slate400 }}
                  axisLine={false} tickLine={false}
                  label={{ value: "Cases", angle: -90, position: "insideLeft", offset: 10, style: { fontSize: 11, fontFamily: "'Source Serif 4', serif", fill: COLORS.slate600 } }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Cases" fill={COLORS.crimson} radius={[2, 2, 0, 0]}>
                  {ftjHistogram.map((d, i) => (
                    <Cell key={i} fill={i >= 2 && i <= 4 ? COLORS.crimson : `${COLORS.crimson}60`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
              <StatCard label="Median" value="27 days" accent={COLORS.crimson} />
              <StatCard label="Mean" value="38.6 days" accent={COLORS.slate500} />
              <StatCard label="25th Percentile" value="20 days" accent={COLORS.teal} />
              <StatCard label="75th Percentile" value="41 days" accent={COLORS.amber} />
            </div>

            <Divider />

            <SectionHeader figure="FIGURE 3B" title="Distribution of Filing-to-Writ-Posting Intervals"
              description="The full displacement timeline—from initial filing to a sheriff posting the writ at the property. Median: 50 days. Most writs were posted within 35–70 days of filing." />

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ftwHistogram} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid stroke={COLORS.slate200} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", fill: COLORS.slate500 }}
                  axisLine={{ stroke: COLORS.slate300 }} tickLine={false} angle={-45} textAnchor="end" height={50}
                  label={{ value: "Days from Filing to Writ Posting", position: "bottom", offset: 0, style: { fontSize: 11, fontFamily: "'Source Serif 4', serif", fill: COLORS.slate600 } }} />
                <YAxis tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: COLORS.slate400 }}
                  axisLine={false} tickLine={false}
                  label={{ value: "Cases", angle: -90, position: "insideLeft", offset: 10, style: { fontSize: 11, fontFamily: "'Source Serif 4', serif", fill: COLORS.slate600 } }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Cases" fill={COLORS.purple} radius={[2, 2, 0, 0]}>
                  {ftwHistogram.map((d, i) => (
                    <Cell key={i} fill={i >= 4 && i <= 8 ? COLORS.purple : `${COLORS.purple}60`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
              <StatCard label="Median" value="50 days" accent={COLORS.purple} />
              <StatCard label="Mean" value="59.2 days" accent={COLORS.slate500} />
              <StatCard label="25th Percentile" value="41 days" accent={COLORS.teal} />
              <StatCard label="75th Percentile" value="65 days" accent={COLORS.amber} />
            </div>
          </div>
        )}

        {/* ═══ ATTORNEYS ═══ */}
        {tab === "attorneys" && (
          <div>
            <SectionHeader figure="ATTORNEY CONCENTRATION" title="The Eviction Bar"
              description="A single attorney — James Barron — appeared in 35.4% of all 2024 filings. The top 5 attorneys collectively handled 62.0% of the entire docket, representing 680+ distinct plaintiffs." />

            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={topAttorneys} layout="vertical" margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
                <CartesianGrid stroke={COLORS.slate200} strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: COLORS.slate500 }}
                  axisLine={{ stroke: COLORS.slate300 }} tickLine={false} />
                <YAxis type="category" dataKey="name" width={150}
                  tick={{ fontSize: 12, fontFamily: "'Source Serif 4', serif", fill: COLORS.slate700 }}
                  axisLine={false} tickLine={false} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const d = topAttorneys.find(a => a.name === label);
                  return (
                    <div style={{ background: COLORS.slate900, color: "#fff", padding: "10px 14px", borderRadius: 2, fontSize: 12, fontFamily: "'Source Serif 4', serif" }}>
                      <div style={{ fontWeight: 700 }}>{label}</div>
                      <div>{d.cases.toLocaleString()} cases ({d.pct}% of docket)</div>
                    </div>
                  );
                }} />
                <Bar dataKey="cases" name="Cases" barSize={20} radius={[0, 2, 2, 0]}>
                  {topAttorneys.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? COLORS.crimson : i < 5 ? COLORS.crimson + "99" : COLORS.slate400} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div style={{
              background: `${COLORS.crimson}08`, border: `1px solid ${COLORS.crimson}30`,
              padding: "14px 18px", marginTop: 20, fontSize: 13,
              fontFamily: "'Source Serif 4', serif", color: COLORS.slate700, lineHeight: 1.6,
            }}>
              <strong style={{ color: COLORS.crimson }}>Barron's reach:</strong> 5,330 cases filed on behalf of 680 distinct plaintiff names — not attributable to a single landlord's volume. The top 5 attorneys (Barron, McCabe, Swistak, Rivera, Wilkins) together handled 9,317 cases (62.0% of all filings).
            </div>

            <DataTable
              caption="Top 10 plaintiff attorneys by case volume"
              headers={["Rank", "Attorney", "Cases", "% of Docket", "Cumulative %"]}
              rows={topAttorneys.map((a, i) => {
                const cumPct = topAttorneys.slice(0, i + 1).reduce((s, x) => s + x.pct, 0);
                return [`${i + 1}`, a.name, a.cases.toLocaleString(), `${a.pct}%`, `${cumPct.toFixed(1)}%`];
              })}
            />
          </div>
        )}

        {/* ═══ REPEAT PLAYERS ═══ */}
        {tab === "repeat" && (
          <div>
            <SectionHeader figure="REPEAT PLAYERS" title="Plaintiff Concentration"
              description="Despite 3,987 distinct plaintiff names, the top 20 filers — all corporate entities — accounted for 1,490 cases (9.9% of the docket). The highest-volume filer, Southern Oaks Residences LLC, filed 121 cases." />

            <ResponsiveContainer width="100%" height={520}>
              <BarChart data={topPlaintiffs} layout="vertical" margin={{ top: 5, right: 40, left: 10, bottom: 5 }}>
                <CartesianGrid stroke={COLORS.slate200} strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fill: COLORS.slate500 }}
                  axisLine={{ stroke: COLORS.slate300 }} tickLine={false} />
                <YAxis type="category" dataKey="name" width={195}
                  tick={{ fontSize: 11, fontFamily: "'Source Serif 4', serif", fill: COLORS.slate700 }}
                  axisLine={false} tickLine={false} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div style={{ background: COLORS.slate900, color: "#fff", padding: "10px 14px", borderRadius: 2, fontSize: 12, fontFamily: "'Source Serif 4', serif" }}>
                      <div style={{ fontWeight: 700 }}>{label}</div>
                      <div>{payload[0].value} filings in 2024</div>
                    </div>
                  );
                }} />
                <Bar dataKey="cases" name="Filings" barSize={16} radius={[0, 2, 2, 0]}>
                  {topPlaintiffs.map((_, i) => (
                    <Cell key={i} fill={i < 5 ? COLORS.crimson : i < 10 ? `${COLORS.crimson}88` : COLORS.slate400} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <Divider />

            <SectionHeader figure="CASE STUDY" title="Laura Helton: Anatomy of Repeat Displacement"
              description="Between April and December 2024, one tenant was filed against 12 times by 9 different plaintiffs, evicted 9 times, with 9 writs posted — and was unrepresented in every single case." />

            <div style={{
              background: COLORS.slate50, padding: 24, border: `1px solid ${COLORS.slate200}`,
              marginTop: 8,
            }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                <div style={{ flex: 1, minWidth: 140, textAlign: "center" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 700, color: COLORS.crimson }}>12</div>
                  <div style={{ fontSize: 12, color: COLORS.slate600 }}>Total Filings</div>
                </div>
                <div style={{ flex: 1, minWidth: 140, textAlign: "center" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 700, color: COLORS.crimsonDark }}>9</div>
                  <div style={{ fontSize: 12, color: COLORS.slate600 }}>Evictions Granted</div>
                </div>
                <div style={{ flex: 1, minWidth: 140, textAlign: "center" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 700, color: COLORS.amber }}>9</div>
                  <div style={{ fontSize: 12, color: COLORS.slate600 }}>Distinct Plaintiffs</div>
                </div>
                <div style={{ flex: 1, minWidth: 140, textAlign: "center" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 700, color: COLORS.slate500 }}>0</div>
                  <div style={{ fontSize: 12, color: COLORS.slate600 }}>Cases with Counsel</div>
                </div>
              </div>
              <div style={{
                marginTop: 16, padding: "12px 16px", background: `${COLORS.crimson}08`,
                borderLeft: `3px solid ${COLORS.crimson}`, fontSize: 13, color: COLORS.slate700,
                lineHeight: 1.5, fontStyle: "italic",
              }}>
                "The system processes certain tenants repeatedly without any of the structural interventions — representation, mediation, housing assistance — that might alter the trajectory."
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 60, paddingTop: 20, borderTop: `1px solid ${COLORS.slate200}`,
          fontSize: 11, color: COLORS.slate400, fontFamily: "'JetBrains Mono', monospace",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
        }}>
          <span>Data: Orange County Clerk of Courts, 2024 · N = 15,039</span>
          <span>Thesis: Dual Infrastructure · D.B.K. · University of Chicago</span>
        </div>
      </div>
    </div>
  );
}
