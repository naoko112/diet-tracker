import { useState, useEffect } from "react";

const RDA = {
  protein: 50, iron: 10.5, calcium: 650, vitC: 100,
  vitD: 8.5, vitB12: 2.4, zinc: 8, magnesium: 270, vitE: 6, fiber: 18, omega3: 1.6,
};
const NUTRIENT_LABELS = {
  protein: { label: "たんぱく質", unit: "g", color: "#f97316", icon: "💪" },
  iron: { label: "鉄分", unit: "mg", color: "#8b5cf6", icon: "🫀" },
  calcium: { label: "カルシウム", unit: "mg", color: "#3b82f6", icon: "🦴" },
  vitC: { label: "ビタミンC", unit: "mg", color: "#f59e0b", icon: "✨" },
  vitD: { label: "ビタミンD", unit: "μg", color: "#fbbf24", icon: "☀️" },
  vitB12: { label: "B12", unit: "μg", color: "#06b6d4", icon: "⚡" },
  zinc: { label: "亜鉛", unit: "mg", color: "#ec4899", icon: "🌸" },
  magnesium: { label: "マグネシウム", unit: "mg", color: "#22c55e", icon: "🌿" },
  vitE: { label: "ビタミンE", unit: "mg", color: "#a78bfa", icon: "🛡️" },
  fiber: { label: "食物繊維", unit: "g", color: "#34d399", icon: "🌾" },
  omega3: { label: "オメガ3", unit: "g", color: "#60a5fa", icon: "🐟" },
};

const DEFAULT_FOOD_DB = {
  "最強スープ（1杯）": { kcal: 30, protein: 1, iron: 1.2, calcium: 40, vitC: 2, vitD: 0.5, vitB12: 0.1, zinc: 0.3, magnesium: 15, vitE: 0.2, fiber: 2, omega3: 0.1 },
  "ソイプロテイン（1杯）": { kcal: 110, protein: 20, iron: 2.0, calcium: 80, vitC: 0, vitD: 0, vitB12: 0, zinc: 1.2, magnesium: 40, vitE: 0.5, fiber: 0.5, omega3: 0.2 },
  "ピープロテイン（1杯）": { kcal: 110, protein: 21, iron: 2.5, calcium: 50, vitC: 0, vitD: 0, vitB12: 0, zinc: 1.5, magnesium: 45, vitE: 0.3, fiber: 0.8, omega3: 0.1 },
  "抹茶（1杯）": { kcal: 2, protein: 0.3, iron: 0.2, calcium: 5, vitC: 3, vitD: 0, vitB12: 0, zinc: 0.1, magnesium: 3, vitE: 0.3, fiber: 0.2, omega3: 0 },
  "梅干し（1個）": { kcal: 5, protein: 0.1, iron: 0.1, calcium: 4, vitC: 1, vitD: 0, vitB12: 0, zinc: 0.1, magnesium: 2, vitE: 0, fiber: 0.5, omega3: 0 },
  "人参サラダ（1皿）": { kcal: 80, protein: 1, iron: 0.3, calcium: 30, vitC: 6, vitD: 0, vitB12: 0, zinc: 0.2, magnesium: 12, vitE: 0.5, fiber: 2.5, omega3: 0 },
  "ゆで卵（1個）": { kcal: 80, protein: 6.5, iron: 0.9, calcium: 26, vitC: 0, vitD: 1.1, vitB12: 0.6, zinc: 0.7, magnesium: 6, vitE: 0.5, fiber: 0, omega3: 0.1 },
  "おにぎり（1個）": { kcal: 170, protein: 3, iron: 0.2, calcium: 5, vitC: 0, vitD: 0, vitB12: 0, zinc: 0.5, magnesium: 10, vitE: 0.1, fiber: 0.5, omega3: 0 },
  "納豆おにぎり（1個）": { kcal: 185, protein: 5, iron: 0.8, calcium: 30, vitC: 0, vitD: 0, vitB12: 0.1, zinc: 0.8, magnesium: 25, vitE: 0.3, fiber: 1.5, omega3: 0.2 },
  "サラダチキン（1個）": { kcal: 120, protein: 26, iron: 0.5, calcium: 10, vitC: 0, vitD: 0.2, vitB12: 0.5, zinc: 1.0, magnesium: 28, vitE: 0.3, fiber: 0, omega3: 0.1 },
  "さば缶（1缶）": { kcal: 200, protein: 20, iron: 1.5, calcium: 260, vitC: 0, vitD: 4.0, vitB12: 5.0, zinc: 1.5, magnesium: 30, vitE: 1.5, fiber: 0, omega3: 2.0 },
  "ツナ缶水煮（1缶）": { kcal: 70, protein: 16, iron: 0.5, calcium: 8, vitC: 0, vitD: 1.2, vitB12: 2.0, zinc: 0.6, magnesium: 26, vitE: 0.5, fiber: 0, omega3: 0.5 },
  "鮭フレーク（大さじ2）": { kcal: 50, protein: 7, iron: 0.3, calcium: 10, vitC: 0, vitD: 2.0, vitB12: 2.5, zinc: 0.5, magnesium: 15, vitE: 0.8, fiber: 0, omega3: 0.6 },
  "豆腐1/2丁": { kcal: 80, protein: 7, iron: 0.8, calcium: 120, vitC: 0, vitD: 0, vitB12: 0, zinc: 0.7, magnesium: 35, vitE: 0.1, fiber: 0.3, omega3: 0.3 },
  "納豆（1パック）": { kcal: 100, protein: 8, iron: 1.5, calcium: 45, vitC: 0, vitD: 0, vitB12: 0.1, zinc: 1.0, magnesium: 50, vitE: 0.5, fiber: 2.5, omega3: 0.3 },
  "わかめ味噌汁（1杯）": { kcal: 25, protein: 2, iron: 0.5, calcium: 50, vitC: 0, vitD: 0, vitB12: 0.2, zinc: 0.3, magnesium: 15, vitE: 0.1, fiber: 1.5, omega3: 0 },
  "いりこ（ひとつまみ）": { kcal: 30, protein: 4, iron: 0.5, calcium: 130, vitC: 0, vitD: 0.3, vitB12: 0.5, zinc: 0.5, magnesium: 20, vitE: 0.2, fiber: 0, omega3: 0.2 },
  "お弁当（現場）": { kcal: 750, protein: 20, iron: 1.5, calcium: 80, vitC: 5, vitD: 1.0, vitB12: 1.0, zinc: 2.0, magnesium: 40, vitE: 1.0, fiber: 3, omega3: 0.3 },
  "麻辣湯": { kcal: 350, protein: 10, iron: 1.5, calcium: 60, vitC: 3, vitD: 0.5, vitB12: 0.5, zinc: 1.0, magnesium: 30, vitE: 0.5, fiber: 3, omega3: 0.2 },
  "カレーパン": { kcal: 320, protein: 7, iron: 0.8, calcium: 25, vitC: 0, vitD: 0.1, vitB12: 0.2, zinc: 0.6, magnesium: 15, vitE: 0.5, fiber: 1.5, omega3: 0 },
  "ポテチ（小袋）": { kcal: 180, protein: 2, iron: 0.3, calcium: 5, vitC: 5, vitD: 0, vitB12: 0, zinc: 0.2, magnesium: 12, vitE: 1.0, fiber: 1, omega3: 0 },
};

const DEFAULT_CARRY = [
  { id: 1, name: "乾燥ほうれん草", emoji: "🌿", note: "鉄分・最強スープに" },
  { id: 2, name: "干し椎茸", emoji: "🍄", note: "ビタミンD・出汁に" },
  { id: 3, name: "塩昆布", emoji: "🌊", note: "ミネラル・味付けに" },
  { id: 4, name: "梅干し", emoji: "🍑", note: "クエン酸・毎日1個" },
  { id: 5, name: "抹茶粉", emoji: "🍵", note: "カテキン・毎朝飲む" },
  { id: 6, name: "いりこ", emoji: "🐟", note: "カルシウム・つまみに" },
  { id: 7, name: "プロテイン", emoji: "💪", note: "たんぱく質・毎朝" },
];

const DEFAULT_PROFILE = {
  name: "", targetKg: 10, months: 3, dailyKcal: 1400,
  monthlyBudget: 20000, startDate: new Date().toISOString().slice(0, 10),
  ng: "いか、ホタテ、わさび、レバー、ジビエ",
  allergy: "乳糖不耐症（ホエイ・カゼイン不可）",
  kitchen: "なし（お湯のみ）", shopping: "2〜3日に1回、スーパー中心",
  lunchRule: "昼は納豆・豆腐NG（においと水問題）",
};

const TIMING_OPTIONS = ["朝", "昼", "夜", "間食", "深夜"];

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatDate(key) { const [, m, d] = key.split("-"); return `${m}/${d}`; }

function NutrientBar({ label, icon, value, rda, unit }) {
  const pct = Math.min(Math.round((value / rda) * 100), 100);
  const bc = pct >= 80 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: "#cbd5e1" }}>{icon} {label}</span>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ fontSize: 10, color: "#64748b" }}>{value}{unit}/{rda}{unit}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: bc }}>{pct}%</span>
        </div>
      </div>
      <div style={{ background: "#334155", borderRadius: 4, height: 5, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: bc, borderRadius: 4 }} />
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [records, setRecords] = useState({});
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [carryItems, setCarryItems] = useState(DEFAULT_CARRY);
  const [customFoods, setCustomFoods] = useState({});
  const [weekPlan, setWeekPlan] = useState(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [planError, setPlanError] = useState("");
  const [planView, setPlanView] = useState("plan");
  const [expandedDay, setExpandedDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState(getTodayKey());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({ timing: "朝", food: "", kcal: "", note: "" });
  const [customFoodInput, setCustomFoodInput] = useState(false);
  const [settingsSection, setSettingsSection] = useState("profile");
  const [showCarryForm, setShowCarryForm] = useState(false);
  const [newCarry, setNewCarry] = useState({ name: "", emoji: "🎒", note: "" });
  const [showFoodForm, setShowFoodForm] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [newFood, setNewFood] = useState({ name: "", kcal: "", protein: "" });

  const allFoods = { ...DEFAULT_FOOD_DB, ...customFoods };
  const targetKcal = profile.dailyKcal || 1400;

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("diet-records"); if (r) setRecords(JSON.parse(r.value));
        const p = await window.storage.get("diet-profile2"); if (p) setProfile(JSON.parse(p.value));
        const c = await window.storage.get("diet-carry"); if (c) setCarryItems(JSON.parse(c.value));
        const f = await window.storage.get("diet-custom"); if (f) setCustomFoods(JSON.parse(f.value));
        const w = await window.storage.get("diet-plan"); if (w) setWeekPlan(JSON.parse(w.value));
      } catch (e) { }
    })();
  }, []);

  const saveRecords = async d => { try { await window.storage.set("diet-records", JSON.stringify(d)); } catch (e) { } setRecords(d); };
  const saveProfile = async d => { try { await window.storage.set("diet-profile2", JSON.stringify(d)); } catch (e) { } setProfile(d); };
  const saveCarry = async d => { try { await window.storage.set("diet-carry", JSON.stringify(d)); } catch (e) { } setCarryItems(d); };
  const saveCustomFoods = async d => { try { await window.storage.set("diet-custom", JSON.stringify(d)); } catch (e) { } setCustomFoods(d); };
  const savePlan = async d => { try { await window.storage.set("diet-plan", JSON.stringify(d)); } catch (e) { } setWeekPlan(d); };

  const dayRecords = records[selectedDate] || [];
  const dayTotals = dayRecords.reduce((acc, e) => {
    const f = allFoods[e.food];
    if (f) { Object.keys(RDA).forEach(k => { acc[k] = (acc[k] || 0) + (f[k] || 0); }); acc.kcal = (acc.kcal || 0) + f.kcal; }
    else acc.kcal = (acc.kcal || 0) + (Number(e.kcal) || 0);
    return acc;
  }, {});
  const totalKcal = Math.round(dayTotals.kcal || 0);
  const kcalPct = Math.min(Math.round((totalKcal / targetKcal) * 100), 110);
  const kcalColor = kcalPct > 105 ? "#ef4444" : kcalPct >= 85 ? "#22c55e" : "#f59e0b";
  const timingEmoji = t => t === "朝" ? "🌅" : t === "昼" ? "☀️" : t === "夜" ? "🌙" : t === "間食" ? "🍎" : "🌛";

  // 今日の記録（ホーム用）
  const todayRecords = records[getTodayKey()] || [];
  const todayKcal = Math.round(todayRecords.reduce((acc, e) => {
    const f = allFoods[e.food]; return acc + (f ? f.kcal : Number(e.kcal) || 0);
  }, 0));
  const todayPct = Math.min(Math.round((todayKcal / targetKcal) * 100), 110);
  const todayColor = todayPct > 105 ? "#ef4444" : todayPct >= 85 ? "#22c55e" : "#f59e0b";

  const generatePlan = async () => {
    setPlanLoading(true); setPlanError("");
    const prompt = `あなたは栄養士です。以下の条件で1週間（7日分）の献立を作ってください。

条件：
- 目標：${profile.months}ヶ月で${profile.targetKg}kg減量
- 1日の目標カロリー：${targetKcal}kcal
- 月の食費予算：${profile.monthlyBudget}円（1日約${Math.round(profile.monthlyBudget / 30)}円）
- キッチン環境：${profile.kitchen}
- 買い出し：${profile.shopping}
- 常備食材：${carryItems.map(i => i.name).join("、")}
- NG食材：${profile.ng || "特になし"}
- アレルギー・制限：${profile.allergy || "特になし"}
- 食事ルール：${profile.lunchRule || "特になし"}

以下のJSON形式のみで出力してください。説明文や前置きは不要です。

{"days":[{"day":"Day 1","theme":"🌿 基本の型","totalKcal":1370,"budgetYen":580,"meals":[{"timing":"朝","name":"食事名","items":["食材1","食材2"],"kcal":140,"memo":"ポイント"},{"timing":"昼","name":"食事名","items":["食材1"],"kcal":500,"memo":""},{"timing":"夜","name":"食事名","items":["食材1"],"kcal":600,"memo":""},{"timing":"深夜の魔","name":"食事名","items":["食材1"],"kcal":30,"memo":""}]}],"shoppingList":[{"category":"カテゴリ","items":[{"name":"食材名","priceYen":200,"note":"用途"}]}],"weeklyAdvice":"アドバイス"}

7日分すべて出力すること。`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5",
          max_tokens: 6000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      if (data.error) {
        setPlanError(`エラー：${data.error.message}`);
        setPlanLoading(false);
        return;
      }
      const text = data.content?.find(c => c.type === "text")?.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        setPlanError("応答の解析に失敗しました。もう一度お試しください。");
        setPlanLoading(false);
        return;
      }
      const parsed = JSON.parse(jsonMatch[0]);
      await savePlan(parsed);
    } catch (e) {
      setPlanError(`失敗しました：${e.message}`);
    }
    setPlanLoading(false);
  };

  const addEntry = () => {
    if (!newEntry.food) return;
    saveRecords({ ...records, [selectedDate]: [...dayRecords, { ...newEntry, id: Date.now() }] });
    setNewEntry({ timing: "朝", food: "", kcal: "", note: "" });
    setShowAddForm(false); setCustomFoodInput(false);
  };

  const tabs = [
    { id: "home", label: "🏠 ホーム" },
    { id: "plan", label: "🍱 献立" },
    { id: "record", label: "📝 記録" },
    { id: "nutrition", label: "📊 栄養" },
    { id: "settings", label: "⚙️ 設定" },
  ];

  const dateInput = (
    <div style={{ background: "#1e293b", borderRadius: 12, padding: 12, marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>
      <input type="date" value={selectedDate} max={getTodayKey()} onChange={e => e.target.value && setSelectedDate(e.target.value)}
        style={{ flex: 1, background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 14, boxSizing: "border-box" }} />
      <button onClick={() => setSelectedDate(getTodayKey())} style={{ padding: "10px 14px", borderRadius: 8, border: "none", background: selectedDate === getTodayKey() ? "#0f766e" : "#334155", color: selectedDate === getTodayKey() ? "#fff" : "#94a3b8", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>今日</button>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Hiragino Sans','Noto Sans JP',sans-serif", background: "#0f172a", minHeight: "100vh", color: "#f1f5f9", maxWidth: 480, margin: "0 auto" }}>

      <div style={{ background: "linear-gradient(135deg,#134e4a,#0f766e,#065f46)", padding: "20px 16px 16px", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
        <div style={{ fontSize: 10, color: "#5eead4", letterSpacing: 3, marginBottom: 2 }}>DIET TRACKER</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{profile.name ? `${profile.name}の食事帳` : "食事帳"} 🎒</div>
        <div style={{ fontSize: 11, color: "#99f6e4", marginTop: 2 }}>{profile.months}ヶ月で{profile.targetKg}kg・1日{targetKcal}kcal目標</div>
        <div style={{ display: "flex", gap: 6, marginTop: 12, overflowX: "auto", paddingBottom: 2 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 10px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", background: tab === t.id ? "#f0fdf4" : "rgba(255,255,255,0.15)", color: tab === t.id ? "#065f46" : "#ccfbf1" }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: 16 }}>

        {tab === "home" && (
          <div>
            {todayKcal > 0 ? (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 16, marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>今日（{formatDate(getTodayKey())}）</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: todayColor }}>{todayKcal}<span style={{ fontSize: 13, color: "#64748b" }}>kcal</span></div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>目標 {targetKcal}kcal</div>
                </div>
                <div style={{ background: "#334155", borderRadius: 6, height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(todayPct, 100)}%`, height: "100%", background: todayColor, borderRadius: 6 }} />
                </div>
                {todayPct <= 100 && <div style={{ fontSize: 11, color: "#5eead4", marginTop: 6 }}>あと {targetKcal - todayKcal}kcal 使えます</div>}
              </div>
            ) : (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13, color: "#64748b" }}>今日はまだ記録なし</div>
                <button onClick={() => setTab("record")} style={{ padding: "6px 14px", borderRadius: 20, border: "none", background: "rgba(15,118,110,0.3)", color: "#5eead4", fontSize: 12, cursor: "pointer" }}>記録する</button>
              </div>
            )}

            <div style={{ background: "linear-gradient(135deg,#1e3a2f,#14532d)", borderRadius: 12, padding: 14, marginBottom: 14, border: "1px solid #166534" }}>
              <div style={{ fontSize: 11, color: "#86efac", letterSpacing: 1, marginBottom: 8 }}>🌿 毎日の習慣</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["🍵 抹茶", "🥕 人参サラダ", "🍑 梅干し", "💪 プロテイン", "🍜 最強スープ"].map(h => (
                  <span key={h} style={{ background: "rgba(134,239,172,0.15)", border: "1px solid #16a34a", borderRadius: 20, padding: "3px 10px", fontSize: 12, color: "#86efac" }}>{h}</span>
                ))}
              </div>
            </div>

            {weekPlan?.days ? (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>今週の献立</div>
                  <button onClick={() => setTab("plan")} style={{ fontSize: 11, color: "#5eead4", background: "none", border: "none", cursor: "pointer" }}>全部見る →</button>
                </div>
                <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
                  {weekPlan.days.slice(0, 4).map((day, i) => (
                    <div key={i} onClick={() => { setTab("plan"); setExpandedDay(i); }} style={{ minWidth: 100, background: "#0f172a", borderRadius: 10, padding: "10px 8px", cursor: "pointer", textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4 }}>{day.day}</div>
                      <div style={{ fontSize: 18, marginBottom: 4 }}>{day.theme?.split(" ")[0] || "🍱"}</div>
                      <div style={{ fontSize: 10, color: "#94a3b8" }}>{day.theme?.split(" ").slice(1).join(" ")}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 16, marginBottom: 14, textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>🤖</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#5eead4", marginBottom: 6 }}>AIが献立を作ります</div>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>目標に合わせた1週間分の献立と買い出しリストを自動生成します</div>
                <button onClick={() => { setTab("plan"); generatePlan(); }} style={{ padding: "10px 24px", borderRadius: 12, border: "none", background: "#0f766e", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  献立を作る ✨
                </button>
              </div>
            )}

            <div style={{ background: "#1e293b", borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 10 }}>🎒 常備食材</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {carryItems.map(item => (
                  <span key={item.id} style={{ padding: "4px 10px", background: "rgba(15,118,110,0.15)", border: "1px solid #1e3a2f", borderRadius: 20, fontSize: 11, color: "#5eead4" }}>{item.emoji} {item.name}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "plan" && (
          <div>
            {!weekPlan ? (
              <div>
                <div style={{ background: "linear-gradient(135deg,#1e3a2f,#14532d)", borderRadius: 12, padding: 20, marginBottom: 16, border: "1px solid #166534", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>🤖</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#86efac", marginBottom: 8 }}>AIが1週間の献立を作ります</div>
                  <div style={{ fontSize: 12, color: "#a7f3d0", lineHeight: 1.8, marginBottom: 16 }}>目標・常備食材・NG食材をもとに<br />献立と買い出しリストを自動生成します</div>
                  <button onClick={generatePlan} disabled={planLoading} style={{ padding: "12px 32px", borderRadius: 12, border: "none", background: planLoading ? "#334155" : "#0f766e", color: "#fff", fontSize: 14, fontWeight: 700, cursor: planLoading ? "default" : "pointer" }}>
                    {planLoading ? "生成中...✨" : "献立を生成する ✨"}
                  </button>
                  {planError && <div style={{ marginTop: 12, fontSize: 12, color: "#f87171", background: "rgba(239,68,68,0.1)", borderRadius: 8, padding: "8px 12px" }}>{planError}</div>}
                </div>
                <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, fontSize: 12, color: "#94a3b8", lineHeight: 1.9 }}>
                  <div style={{ fontWeight: 700, color: "#5eead4", marginBottom: 8 }}>📋 現在の設定</div>
                  {[
                    ["目標", `${profile.months}ヶ月で${profile.targetKg}kg減`],
                    ["1日カロリー", `${targetKcal}kcal`],
                    ["月予算", `¥${(profile.monthlyBudget || 0).toLocaleString()}`],
                    ["NG食材", profile.ng || "なし"],
                    ["常備食材", carryItems.map(i => i.name).join("・")],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                      <span style={{ color: "#475569", minWidth: 80 }}>{k}</span>
                      <span style={{ color: "#cbd5e1" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  {[["plan", "📅 献立"], ["shopping", "🛒 買い出し"]].map(([id, label]) => (
                    <button key={id} onClick={() => setPlanView(id)} style={{ flex: 1, padding: 8, borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: planView === id ? "#0f766e" : "#1e293b", color: planView === id ? "#fff" : "#94a3b8" }}>{label}</button>
                  ))}
                  <button onClick={() => { if (window.confirm("献立を再生成しますか？")) { savePlan(null); generatePlan(); } }} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #334155", background: "transparent", color: "#64748b", fontSize: 11, cursor: "pointer" }}>再生成</button>
                </div>

                {weekPlan.weeklyAdvice && (
                  <div style={{ background: "rgba(15,118,110,0.15)", border: "1px solid #0f766e", borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: "#5eead4", lineHeight: 1.7 }}>
                    💡 {weekPlan.weeklyAdvice}
                  </div>
                )}

                {planView === "plan" && weekPlan.days?.map((day, i) => (
                  <div key={i} style={{ background: "#1e293b", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
                    <div onClick={() => setExpandedDay(expandedDay === i ? -1 : i)} style={{ padding: 14, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{day.day} {day.theme}</div>
                        <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>目安食費 ¥{day.budgetYen}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: "#34d399" }}>{day.totalKcal}</div>
                        <div style={{ fontSize: 9, color: "#64748b" }}>kcal</div>
                      </div>
                    </div>
                    {expandedDay === i && day.meals && (
                      <div style={{ borderTop: "1px solid #334155" }}>
                        {day.meals.map((meal, j) => (
                          <div key={j} style={{ padding: "10px 14px", borderBottom: j < day.meals.length - 1 ? "1px solid #2d3748" : "none" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 10, background: meal.timing === "深夜の魔" ? "#450a0a" : meal.timing === "昼" ? "#1a2e1a" : "#0f2942", color: meal.timing === "深夜の魔" ? "#fca5a5" : meal.timing === "昼" ? "#86efac" : "#7dd3fc" }}>{meal.timing}</span>
                                <span style={{ fontSize: 13, fontWeight: 600 }}>{meal.name}</span>
                              </div>
                              <span style={{ fontSize: 13, fontWeight: 700 }}>{meal.kcal}kcal</span>
                            </div>
                            {meal.items?.map((item, k) => (
                              <div key={k} style={{ display: "flex", gap: 6, marginBottom: 3 }}>
                                <span style={{ color: "#0f766e", fontSize: 11 }}>▸</span>
                                <span style={{ fontSize: 11, color: "#94a3b8" }}>{item}</span>
                              </div>
                            ))}
                            {meal.memo && (
                              <div style={{ marginTop: 6, background: "rgba(15,118,110,0.1)", borderLeft: "2px solid #0f766e", padding: "4px 8px", borderRadius: 3 }}>
                                <span style={{ fontSize: 11, color: "#5eead4" }}>💡 {meal.memo}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {planView === "shopping" && weekPlan.shoppingList && (
                  <div>
                    <div style={{ background: "#1e293b", borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: "#94a3b8" }}>
                      📌 1週間分の買い出しリスト（常備食材の補充は別途）
                    </div>
                    {weekPlan.shoppingList.map((cat, i) => (
                      <div key={i} style={{ marginBottom: 18 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", marginBottom: 8 }}>{cat.category}</div>
                        {cat.items?.map((item, j) => (
                          <div key={j} style={{ background: "#1e293b", borderRadius: 10, padding: "10px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <div style={{ fontSize: 13 }}>{item.name}</div>
                              {item.note && <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{item.note}</div>}
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: "#34d399" }}>¥{item.priceYen}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                    <div style={{ background: "linear-gradient(135deg,#1e3a2f,#14532d)", borderRadius: 12, padding: 14, border: "1px solid #166534" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#86efac", marginBottom: 8 }}>🎒 常に持ち歩く食材</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {carryItems.map(item => (
                          <span key={item.id} style={{ padding: "4px 10px", background: "rgba(15,118,110,0.2)", border: "1px solid #0f766e", borderRadius: 20, fontSize: 11, color: "#5eead4" }}>{item.emoji} {item.name}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {planLoading && (
              <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
                <div style={{ background: "#1e293b", borderRadius: 16, padding: 32, textAlign: "center", margin: "0 20px" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🤖</div>
                  <div style={{ fontSize: 14, color: "#5eead4", fontWeight: 700, marginBottom: 8 }}>献立を作成中...</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>目標に合わせた1週間分を生成しています</div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "record" && (
          <div>
            <div style={{ background: "rgba(15,118,110,0.1)", border: "1px solid rgba(15,118,110,0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#5eead4" }}>
              💚 記録できた日だけでOK。できない日があっても気にしないで。
            </div>

            {dateInput}

            {totalKcal > 0 && (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: kcalColor }}>{totalKcal}<span style={{ fontSize: 13, color: "#64748b" }}>kcal</span></div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>目標 {targetKcal}kcal</div>
                </div>
                <div style={{ background: "#334155", borderRadius: 6, height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(kcalPct, 100)}%`, height: "100%", background: kcalColor, borderRadius: 6 }} />
                </div>
              </div>
            )}

            {["朝", "昼", "夜", "間食", "深夜"].map(timing => {
              const entries = dayRecords.filter(e => e.timing === timing);
              if (entries.length === 0 && (timing === "間食" || timing === "深夜")) return null;
              const tKcal = entries.reduce((s, e) => { const f = allFoods[e.food]; return s + (f ? f.kcal : Number(e.kcal) || 0); }, 0);
              return (
                <div key={timing} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
                    <span>{timingEmoji(timing)} {timing}</span>
                    {tKcal > 0 && <span style={{ color: "#475569" }}>{tKcal}kcal</span>}
                  </div>
                  {entries.length === 0 ? <div style={{ background: "#1e293b", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#334155" }}>—</div>
                    : entries.map(entry => {
                      const food = allFoods[entry.food];
                      const kcal = food ? food.kcal : Number(entry.kcal) || 0;
                      return (
                        <div key={entry.id} style={{ background: "#1e293b", borderRadius: 10, padding: "10px 14px", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13 }}>{entry.food}</div>
                            {entry.note && <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{entry.note}</div>}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 13, fontWeight: 700 }}>{kcal}kcal</span>
                            <button onClick={() => saveRecords({ ...records, [selectedDate]: dayRecords.filter(e => e.id !== entry.id) })} style={{ background: "rgba(239,68,68,0.15)", border: "none", borderRadius: 6, padding: "3px 8px", color: "#f87171", cursor: "pointer", fontSize: 11 }}>削除</button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}

            {!showAddForm ? (
              <button onClick={() => setShowAddForm(true)} style={{ width: "100%", padding: 14, borderRadius: 12, border: "2px dashed #0f766e", background: "transparent", color: "#5eead4", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4 }}>
                ＋ 食事を記録する
              </button>
            ) : (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 16, marginTop: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#5eead4" }}>食事を記録（{formatDate(selectedDate)}）</div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>タイミング</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {TIMING_OPTIONS.map(t => (
                      <button key={t} onClick={() => setNewEntry({ ...newEntry, timing: t })} style={{ padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, background: newEntry.timing === t ? "#0f766e" : "#334155", color: newEntry.timing === t ? "#fff" : "#94a3b8" }}>{t}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ fontSize: 11, color: "#64748b" }}>食べたもの</div>
                    <button onClick={() => setCustomFoodInput(!customFoodInput)} style={{ background: "none", border: "none", color: "#5eead4", fontSize: 11, cursor: "pointer" }}>{customFoodInput ? "リストから選ぶ" : "自由入力"}</button>
                  </div>
                  {customFoodInput
                    ? <input value={newEntry.food} onChange={e => setNewEntry({ ...newEntry, food: e.target.value })} placeholder="例：コンビニサンドイッチ" style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 13, boxSizing: "border-box" }} />
                    : <select value={newEntry.food} onChange={e => setNewEntry({ ...newEntry, food: e.target.value })} style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: newEntry.food ? "#f1f5f9" : "#64748b", fontSize: 13 }}>
                      <option value="">食べたものを選ぶ...</option>
                      {Object.keys(allFoods).map(f => <option key={f} value={f}>{f}（{allFoods[f].kcal}kcal）</option>)}
                    </select>
                  }
                </div>
                {customFoodInput && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>カロリー（kcal）</div>
                    <input type="number" value={newEntry.kcal} onChange={e => setNewEntry({ ...newEntry, kcal: e.target.value })} placeholder="例：350" style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 13, boxSizing: "border-box" }} />
                  </div>
                )}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>メモ（任意）</div>
                  <input value={newEntry.note} onChange={e => setNewEntry({ ...newEntry, note: e.target.value })} placeholder="例：現場のお弁当・揚げ物多め" style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 13, boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { setShowAddForm(false); setCustomFoodInput(false); setNewEntry({ timing: "朝", food: "", kcal: "", note: "" }); }} style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid #475569", background: "transparent", color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>キャンセル</button>
                  <button onClick={addEntry} disabled={!newEntry.food} style={{ flex: 2, padding: 12, borderRadius: 10, border: "none", background: newEntry.food ? "#0f766e" : "#334155", color: newEntry.food ? "#fff" : "#64748b", fontSize: 13, fontWeight: 700, cursor: newEntry.food ? "pointer" : "default" }}>記録する</button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "nutrition" && (
          <div>
            {dateInput}
            {dayRecords.length === 0 ? (
              <div>
                <div style={{ background: "#1e293b", borderRadius: 12, padding: 20, textAlign: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>🥗</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>この日の記録がありません</div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>記録した日の栄養バランスが表示されます</div>
                </div>
                <div style={{ background: "#1e293b", borderRadius: 12, padding: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#fca5a5", marginBottom: 10 }}>⚠️ この献立で不足しがちな栄養素</div>
                  {[
                    { name: "ビタミンD", tip: "さば缶・干し椎茸・日光で補える", supp: "サプリ推奨" },
                    { name: "亜鉛", tip: "ナッツ小袋を常備すると手軽", supp: "サプリ推奨" },
                    { name: "マグネシウム", tip: "睡眠・疲労回復にも効果的", supp: "サプリ推奨" },
                    { name: "ビタミンC", tip: "梅干し・抹茶で少し摂れる", supp: "サプリが手軽" },
                  ].map((n, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid #334155" : "none" }}>
                      <div>
                        <div style={{ fontSize: 13, color: "#fca5a5" }}>{n.name}</div>
                        <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{n.tip}</div>
                      </div>
                      <span style={{ fontSize: 11, color: "#fbbf24", padding: "2px 8px", background: "rgba(251,191,36,0.1)", borderRadius: 10, height: "fit-content" }}>{n.supp}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{formatDate(selectedDate)} の栄養充足率</div>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 16 }}>推奨量に対する割合（成人女性基準）</div>
                {Object.entries(RDA).map(([key, rda]) => {
                  const val = Math.round((dayTotals[key] || 0) * 10) / 10;
                  return <NutrientBar key={key} {...NUTRIENT_LABELS[key]} value={val} rda={rda} />;
                })}
              </div>
            )}
          </div>
        )}

        {tab === "settings" && (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {[["profile", "👤 目標"], ["carry", "🎒 常備"], ["foods", "🍱 食材"]].map(([id, label]) => (
                <button key={id} onClick={() => setSettingsSection(id)} style={{ flex: 1, padding: 8, borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: settingsSection === id ? "#0f766e" : "#1e293b", color: settingsSection === id ? "#fff" : "#94a3b8" }}>{label}</button>
              ))}
            </div>

            {settingsSection === "profile" && (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: "#5eead4" }}>👤 目標・プロフィール</div>
                {[
                  { label: "名前（任意）", key: "name", placeholder: "例：ゆい", type: "text" },
                  { label: "目標減量（kg）", key: "targetKg", placeholder: "10", type: "number" },
                  { label: "期間（ヶ月）", key: "months", placeholder: "3", type: "number" },
                  { label: "1日の目標カロリー（kcal）", key: "dailyKcal", placeholder: "1400", type: "number" },
                  { label: "月の食費予算（円）", key: "monthlyBudget", placeholder: "20000", type: "number" },
                  { label: "NG食材", key: "ng", placeholder: "例：いか、ホタテ" },
                  { label: "アレルギー・制限", key: "allergy", placeholder: "例：乳糖不耐症" },
                  { label: "キッチン環境", key: "kitchen", placeholder: "例：なし（お湯のみ）" },
                  { label: "買い出し頻度", key: "shopping", placeholder: "例：2〜3日に1回" },
                  { label: "食事ルール", key: "lunchRule", placeholder: "例：昼は匂いのものNG" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{label}</div>
                    <input type={type || "text"} value={profile[key] || ""} onChange={e => setProfile({ ...profile, [key]: type === "number" ? Number(e.target.value) || "" : e.target.value })}
                      placeholder={placeholder}
                      style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 12, boxSizing: "border-box" }} />
                  </div>
                ))}
                <button onClick={() => { saveProfile(profile); savePlan(null); setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2500); }} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "#0f766e", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>
                  保存して献立をリセット
                </button>
                {savedMsg && <div style={{ marginTop: 8, textAlign: "center", fontSize: 12, color: "#34d399" }}>✅ 保存しました！献立タブから再生成してください。</div>}
              </div>
            )}

            {settingsSection === "carry" && (
              <div>
                <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#5eead4" }}>🎒 現在の常備食材</div>
                  {carryItems.map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #334155" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{item.emoji}</span>
                        <div>
                          <div style={{ fontSize: 13 }}>{item.name}</div>
                          {item.note && <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>{item.note}</div>}
                        </div>
                      </div>
                      <button onClick={() => saveCarry(carryItems.filter(i => i.id !== item.id))} style={{ background: "rgba(239,68,68,0.15)", border: "none", borderRadius: 6, padding: "3px 10px", color: "#f87171", cursor: "pointer", fontSize: 11 }}>削除</button>
                    </div>
                  ))}
                </div>
                {!showCarryForm ? (
                  <button onClick={() => setShowCarryForm(true)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "2px dashed #0f766e", background: "transparent", color: "#5eead4", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>＋ 常備食材を追加</button>
                ) : (
                  <div style={{ background: "#1e293b", borderRadius: 12, padding: 16 }}>
                    {[{ label: "絵文字", key: "emoji", placeholder: "🥬" }, { label: "食材名", key: "name", placeholder: "例：乾燥大根葉" }, { label: "メモ", key: "note", placeholder: "例：ビタミン補給" }].map(({ label, key, placeholder }) => (
                      <div key={key} style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{label}</div>
                        <input value={newCarry[key]} onChange={e => setNewCarry({ ...newCarry, [key]: e.target.value })} placeholder={placeholder} style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "8px 12px", color: "#f1f5f9", fontSize: 13, boxSizing: "border-box" }} />
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => { setShowCarryForm(false); setNewCarry({ name: "", emoji: "🎒", note: "" }); }} style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #475569", background: "transparent", color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>キャンセル</button>
                      <button onClick={() => { if (!newCarry.name) return; saveCarry([...carryItems, { ...newCarry, id: Date.now() }]); setNewCarry({ name: "", emoji: "🎒", note: "" }); setShowCarryForm(false); }} disabled={!newCarry.name} style={{ flex: 2, padding: 10, borderRadius: 10, border: "none", background: newCarry.name ? "#0f766e" : "#334155", color: newCarry.name ? "#fff" : "#64748b", fontSize: 13, fontWeight: 700, cursor: newCarry.name ? "pointer" : "default" }}>追加する</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {settingsSection === "foods" && (
              <div>
                {Object.keys(customFoods).length > 0 && (
                  <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "#5eead4" }}>登録した食材</div>
                    {Object.entries(customFoods).map(([name, data]) => (
                      <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #334155" }}>
                        <div>
                          <div style={{ fontSize: 13 }}>{name}</div>
                          <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>{data.kcal}kcal・たんぱく質{data.protein}g</div>
                        </div>
                        <button onClick={() => { const u = { ...customFoods }; delete u[name]; saveCustomFoods(u); }} style={{ background: "rgba(239,68,68,0.15)", border: "none", borderRadius: 6, padding: "3px 10px", color: "#f87171", cursor: "pointer", fontSize: 11 }}>削除</button>
                      </div>
                    ))}
                  </div>
                )}
                {!showFoodForm ? (
                  <button onClick={() => setShowFoodForm(true)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "2px dashed #0f766e", background: "transparent", color: "#5eead4", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>＋ 食材を登録する</button>
                ) : (
                  <div style={{ background: "#1e293b", borderRadius: 12, padding: 16 }}>
                    {[{ label: "食材名", key: "name", placeholder: "例：玄米おにぎり（1個）", type: "text" }, { label: "カロリー（kcal）", key: "kcal", placeholder: "200", type: "number" }, { label: "たんぱく質（g）", key: "protein", placeholder: "4", type: "number" }].map(({ label, key, placeholder, type }) => (
                      <div key={key} style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{label}</div>
                        <input type={type} value={newFood[key]} onChange={e => setNewFood({ ...newFood, [key]: e.target.value })} placeholder={placeholder} style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 13, boxSizing: "border-box" }} />
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => { setShowFoodForm(false); setNewFood({ name: "", kcal: "", protein: "" }); }} style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #475569", background: "transparent", color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>キャンセル</button>
                      <button onClick={() => { if (!newFood.name || !newFood.kcal) return; saveCustomFoods({ ...customFoods, [newFood.name]: { kcal: Number(newFood.kcal), protein: Number(newFood.protein) || 0, iron: 0, calcium: 0, vitC: 0, vitD: 0, vitB12: 0, zinc: 0, magnesium: 0, vitE: 0, fiber: 0, omega3: 0 } }); setNewFood({ name: "", kcal: "", protein: "" }); setShowFoodForm(false); }} disabled={!newFood.name || !newFood.kcal} style={{ flex: 2, padding: 10, borderRadius: 10, border: "none", background: (newFood.name && newFood.kcal) ? "#0f766e" : "#334155", color: (newFood.name && newFood.kcal) ? "#fff" : "#64748b", fontSize: 13, fontWeight: 700, cursor: (newFood.name && newFood.kcal) ? "pointer" : "default" }}>登録する</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}