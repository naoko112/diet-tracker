import { useState, useEffect } from "react";

// ===== 多言語対応 =====
const T = {
  ja: {
    appName: "食事帳", tagline: "目標に向けた食事管理",
    home: "🏠 ホーム", plan: "🍱 献立", record: "📝 記録", nutrition: "📊 栄養", settings: "⚙️ 設定",
    todayNoRecord: "今日はまだ記録なし", doRecord: "記録する",
    dailyHabits: "毎日の習慣",
    thisWeekPlan: "今週の献立", seeAll: "全部見る →",
    generatePlan: "献立を生成する ✨", generating: "生成中...",
    carryItems: "常備食材",
    noRecord: "記録なし", kcalLeft: "あと {n}kcal 使えます",
    recordTitle: "食事を記録", recordOk: "💚 記録できた日だけでOK。できない日があっても気にしないで。",
    addRecord: "＋ 食事を記録する", cancel: "キャンセル", save: "記録する",
    timing: "タイミング", food: "食べたもの", freeInput: "自由入力", fromList: "リストから選ぶ",
    kcalInput: "カロリー（kcal）", memo: "メモ（任意）",
    morning: "朝", lunch: "昼", dinner: "夜", snack: "間食", lateNight: "深夜",
    eating_out: "🍽️ 外食記録",
    eating_out_desc: "外食した内容を入力するとカロリーを推定して翌日の調整アドバイスをします",
    eating_out_placeholder: "例：友達とイタリアンでパスタとティラミスを食べた",
    eating_out_analyze: "カロリーを推定する",
    nutriTitle: "の栄養充足率", nutriDesc: "推奨量に対する割合（成人基準）",
    noNutriData: "この日の記録がありません", noNutriDesc: "記録した日の栄養バランスが表示されます",
    deficiency: "⚠️ 不足しがちな栄養素",
    settingsGoal: "👤 目標", settingsCarry: "🎒 常備食材", settingsRecipe: "📝 レシピ", settingsFood: "🍱 食材",
    profileTitle: "目標・プロフィール設定",
    name: "名前（任意）", age: "年齢", gender: "性別", male: "男性", female: "女性",
    weight: "現在の体重（kg）", height: "身長（cm）",
    targetKg: "目標減量（kg）", months: "期間（ヶ月）",
    activityLevel: "活動レベル", sedentary: "ほぼ座り仕事・運動なし", light: "週1〜2回軽い運動", moderate: "週3〜5回運動", active: "ほぼ毎日活発に運動",
    autoCalc: "🧮 自動計算結果", autoCalcDesc: "基礎代謝から算出", kcalPerDay: "kcal/日",
    budget: "月の食費予算（円）",
    ng: "NG食材・苦手なもの", allergy: "アレルギー・制限",
    kitchenEnv: "キッチン環境",
    kitchenNone: "🏕️ キッチンなし（お湯・電子レンジのみ）",
    kitchenSimple: "🍳 簡易キッチン（短時間調理のみ）",
    kitchenFull: "🏠 自宅（何でもあり）",
    cuisineTitle: "料理カテゴリ（週の回数）",
    healthTheme: "健康テーマ（複数選択可）",
    gut: "🦠 腸活", skin: "✨ 美肌", muscle: "💪 筋肉をつける", anemia: "🩸 貧血改善", lowCarb: "🌿 低糖質", detox: "🌊 デトックス",
    saveProfile: "保存する", saved: "✅ 保存しました！",
    addCarry: "＋ 常備食材を追加", addCarryTitle: "常備食材を追加",
    emoji: "絵文字", itemName: "食材名", itemNote: "メモ", addBtn: "追加する",
    recipeTitle: "食べたいレシピを登録",
    recipeDesc: "レシピをコピペするとカロリーを自動計算して献立に組み込みます",
    recipePlaceholder: "レシピをここに貼り付け（材料・作り方など）",
    recipeName: "レシピ名",
    recipeAnalyze: "カロリーを計算する",
    recipeAnalyzing: "計算中...",
    recipeList: "登録済みレシピ",
    delete: "削除",
    addCustomFood: "＋ 食材を登録する", addCustomFoodTitle: "食材を登録",
    planAdvice: "💡 ",
    shoppingTab: "🛒 買い出し", planTab: "📅 献立", regenBtn: "再生成",
    shoppingNote: "📌 1週間分の買い出しリスト",
    carryNote: "🎒 常に持ち歩く食材",
    today: "今日",
  },
  en: {
    appName: "Meal Diary", tagline: "Diet management toward your goal",
    home: "🏠 Home", plan: "🍱 Meal Plan", record: "📝 Log", nutrition: "📊 Nutrition", settings: "⚙️ Settings",
    todayNoRecord: "No entries today", doRecord: "Log meal",
    dailyHabits: "Daily habits",
    thisWeekPlan: "This week's plan", seeAll: "See all →",
    generatePlan: "Generate meal plan ✨", generating: "Generating...",
    carryItems: "Pantry items",
    noRecord: "No record", kcalLeft: "{n} kcal remaining",
    recordTitle: "Log a meal", recordOk: "💚 Log only when you can. No pressure on off days.",
    addRecord: "＋ Log a meal", cancel: "Cancel", save: "Save",
    timing: "Timing", food: "Food", freeInput: "Free input", fromList: "From list",
    kcalInput: "Calories (kcal)", memo: "Note (optional)",
    morning: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack", lateNight: "Late night",
    eating_out: "🍽️ Eating out",
    eating_out_desc: "Enter what you ate and we'll estimate calories and suggest tomorrow's adjustments",
    eating_out_placeholder: "e.g. Had pasta and tiramisu at an Italian restaurant with friends",
    eating_out_analyze: "Estimate calories",
    nutriTitle: " nutrition score", nutriDesc: "% of recommended daily intake",
    noNutriData: "No data for this day", noNutriDesc: "Log meals to see your nutrition breakdown",
    deficiency: "⚠️ Nutrients to watch",
    settingsGoal: "👤 Goal", settingsCarry: "🎒 Pantry", settingsRecipe: "📝 Recipes", settingsFood: "🍱 Foods",
    profileTitle: "Goal & Profile",
    name: "Name (optional)", age: "Age", gender: "Gender", male: "Male", female: "Female",
    weight: "Current weight (kg)", height: "Height (cm)",
    targetKg: "Target loss (kg)", months: "Duration (months)",
    activityLevel: "Activity level", sedentary: "Mostly sedentary", light: "Light exercise 1-2x/week", moderate: "Moderate exercise 3-5x/week", active: "Very active daily",
    autoCalc: "🧮 Auto-calculated target", autoCalcDesc: "Based on BMR", kcalPerDay: "kcal/day",
    budget: "Monthly food budget (¥)",
    ng: "Foods to avoid", allergy: "Allergies / restrictions",
    kitchenEnv: "Kitchen setup",
    kitchenNone: "🏕️ No kitchen (hot water & microwave only)",
    kitchenSimple: "🍳 Basic kitchen (short cooking time only)",
    kitchenFull: "🏠 Full kitchen (anything goes)",
    cuisineTitle: "Cuisine types (times per week)",
    healthTheme: "Health themes (multiple OK)",
    gut: "🦠 Gut health", skin: "✨ Skin glow", muscle: "💪 Build muscle", anemia: "🩸 Iron boost", lowCarb: "🌿 Low carb", detox: "🌊 Detox",
    saveProfile: "Save", saved: "✅ Saved!",
    addCarry: "＋ Add pantry item", addCarryTitle: "Add pantry item",
    emoji: "Emoji", itemName: "Item name", itemNote: "Note", addBtn: "Add",
    recipeTitle: "Save a recipe you want to eat",
    recipeDesc: "Paste a recipe and we'll calculate calories and include it in your plan",
    recipePlaceholder: "Paste recipe here (ingredients, instructions, etc.)",
    recipeName: "Recipe name",
    recipeAnalyze: "Calculate calories",
    recipeAnalyzing: "Calculating...",
    recipeList: "Saved recipes",
    delete: "Delete",
    addCustomFood: "＋ Register a food", addCustomFoodTitle: "Register food",
    planAdvice: "💡 ",
    shoppingTab: "🛒 Shopping", planTab: "📅 Plan", regenBtn: "Regenerate",
    shoppingNote: "📌 Weekly shopping list",
    carryNote: "🎒 Always carry these",
    today: "Today",
  }
};

const CUISINES = ["和食", "イタリアン", "中華", "韓国料理", "洋食", "エスニック", "その他"];
const CUISINES_EN = ["Japanese", "Italian", "Chinese", "Korean", "Western", "Asian fusion", "Other"];
const HEALTH_THEMES = ["gut", "skin", "muscle", "anemia", "lowCarb", "detox"];

const RDA = {
  protein: 50, iron: 10.5, calcium: 650, vitC: 100,
  vitD: 8.5, vitB12: 2.4, zinc: 8, magnesium: 270, vitE: 6, fiber: 18, omega3: 1.6,
};
const NUTRIENT_LABELS = {
  protein: { label: "たんぱく質", labelEn: "Protein", unit: "g", color: "#f97316", icon: "💪" },
  iron: { label: "鉄分", labelEn: "Iron", unit: "mg", color: "#8b5cf6", icon: "🫀" },
  calcium: { label: "カルシウム", labelEn: "Calcium", unit: "mg", color: "#3b82f6", icon: "🦴" },
  vitC: { label: "ビタミンC", labelEn: "Vitamin C", unit: "mg", color: "#f59e0b", icon: "✨" },
  vitD: { label: "ビタミンD", labelEn: "Vitamin D", unit: "μg", color: "#fbbf24", icon: "☀️" },
  vitB12: { label: "B12", labelEn: "B12", unit: "μg", color: "#06b6d4", icon: "⚡" },
  zinc: { label: "亜鉛", labelEn: "Zinc", unit: "mg", color: "#ec4899", icon: "🌸" },
  magnesium: { label: "マグネシウム", labelEn: "Magnesium", unit: "mg", color: "#22c55e", icon: "🌿" },
  vitE: { label: "ビタミンE", labelEn: "Vitamin E", unit: "mg", color: "#a78bfa", icon: "🛡️" },
  fiber: { label: "食物繊維", labelEn: "Fiber", unit: "g", color: "#34d399", icon: "🌾" },
  omega3: { label: "オメガ3", labelEn: "Omega-3", unit: "g", color: "#60a5fa", icon: "🐟" },
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
  "サラダチキン（1個）": { kcal: 120, protein: 26, iron: 0.5, calcium: 10, vitC: 0, vitD: 0.2, vitB12: 0.5, zinc: 1.0, magnesium: 28, vitE: 0.3, fiber: 0, omega3: 0.1 },
  "さば缶（1缶）": { kcal: 200, protein: 20, iron: 1.5, calcium: 260, vitC: 0, vitD: 4.0, vitB12: 5.0, zinc: 1.5, magnesium: 30, vitE: 1.5, fiber: 0, omega3: 2.0 },
  "ツナ缶水煮（1缶）": { kcal: 70, protein: 16, iron: 0.5, calcium: 8, vitC: 0, vitD: 1.2, vitB12: 2.0, zinc: 0.6, magnesium: 26, vitE: 0.5, fiber: 0, omega3: 0.5 },
  "豆腐1/2丁": { kcal: 80, protein: 7, iron: 0.8, calcium: 120, vitC: 0, vitD: 0, vitB12: 0, zinc: 0.7, magnesium: 35, vitE: 0.1, fiber: 0.3, omega3: 0.3 },
  "納豆（1パック）": { kcal: 100, protein: 8, iron: 1.5, calcium: 45, vitC: 0, vitD: 0, vitB12: 0.1, zinc: 1.0, magnesium: 50, vitE: 0.5, fiber: 2.5, omega3: 0.3 },
  "わかめ味噌汁（1杯）": { kcal: 25, protein: 2, iron: 0.5, calcium: 50, vitC: 0, vitD: 0, vitB12: 0.2, zinc: 0.3, magnesium: 15, vitE: 0.1, fiber: 1.5, omega3: 0 },
  "お弁当（外食）": { kcal: 750, protein: 20, iron: 1.5, calcium: 80, vitC: 5, vitD: 1.0, vitB12: 1.0, zinc: 2.0, magnesium: 40, vitE: 1.0, fiber: 3, omega3: 0.3 },
};

const DEFAULT_CARRY = [
  { id: 1, name: "乾燥ほうれん草", emoji: "🌿", note: "鉄分" },
  { id: 2, name: "干し椎茸", emoji: "🍄", note: "ビタミンD" },
  { id: 3, name: "塩昆布", emoji: "🌊", note: "ミネラル" },
  { id: 4, name: "梅干し", emoji: "🍑", note: "クエン酸" },
  { id: 5, name: "抹茶粉", emoji: "🍵", note: "カテキン" },
  { id: 6, name: "プロテイン", emoji: "💪", note: "たんぱく質" },
];

const DEFAULT_PROFILE = {
  name: "", age: "", gender: "female", weight: "", height: "",
  targetKg: 5, months: 3, dailyKcal: 0,
  activityLevel: "sedentary", monthlyBudget: 20000,
  ng: "", allergy: "", kitchen: "none",
  cuisines: { "和食": 3, "イタリアン": 2, "その他": 2 },
  healthThemes: [],
};

const ACTIVITY_MULTIPLIERS = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };

function calcBMR(weight, height, age, gender) {
  if (!weight || !height || !age) return 0;
  if (gender === "female") return 665.1 + 9.563 * Number(weight) + 1.850 * Number(height) - 4.676 * Number(age);
  return 66.47 + 13.75 * Number(weight) + 5.003 * Number(height) - 6.755 * Number(age);
}
function calcTargetKcal(profile) {
  if (profile.dailyKcal > 0) return profile.dailyKcal;
  const bmr = calcBMR(profile.weight, profile.height, profile.age, profile.gender);
  if (!bmr) return 1400;
  const tdee = bmr * (ACTIVITY_MULTIPLIERS[profile.activityLevel] || 1.2);
  const deficit = (profile.targetKg * 7200) / ((profile.months || 3) * 30);
  return Math.max(Math.round(tdee - deficit), 1200);
}

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function formatDate(key, lang) {
  const [, m, d] = key.split("-");
  return lang === "en" ? `${m}/${d}` : `${m}/${d}`;
}

const GEMINI_API_KEY = "";

async function callGemini(prompt) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 4000 }
      })
    }
  );
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

function NutrientBar({ label, value, rda, unit, color }) {
  const pct = Math.min(Math.round((value / rda) * 100), 100);
  const bc = pct >= 80 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: "#cbd5e1" }}>{label}</span>
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
  const [lang, setLang] = useState("ja");
  const t = T[lang];
  const [tab, setTab] = useState("home");
  const [records, setRecords] = useState({});
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [carryItems, setCarryItems] = useState(DEFAULT_CARRY);
  const [customFoods, setCustomFoods] = useState({});
  const [savedRecipes, setSavedRecipes] = useState([]);
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
  const [newFood, setNewFood] = useState({ name: "", kcal: "", protein: "" });
  const [savedMsg, setSavedMsg] = useState(false);
  const [recipeText, setRecipeText] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [eatingOutText, setEatingOutText] = useState("");
  const [eatingOutResult, setEatingOutResult] = useState("");
  const [eatingOutLoading, setEatingOutLoading] = useState(false);

  const allFoods = { ...DEFAULT_FOOD_DB, ...customFoods };
  const targetKcal = calcTargetKcal(profile);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage?.get("diet-records"); if (r) setRecords(JSON.parse(r.value));
        const p = await window.storage?.get("diet-profile4"); if (p) setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(p.value) });
        const c = await window.storage?.get("diet-carry"); if (c) setCarryItems(JSON.parse(c.value));
        const f = await window.storage?.get("diet-custom"); if (f) setCustomFoods(JSON.parse(f.value));
        const w = await window.storage?.get("diet-plan2"); if (w) setWeekPlan(JSON.parse(w.value));
        const rc = await window.storage?.get("diet-recipes"); if (rc) setSavedRecipes(JSON.parse(rc.value));
        const lg = await window.storage?.get("diet-lang"); if (lg) setLang(JSON.parse(lg.value));
      } catch (e) { }
    })();
  }, []);

  const sv = (key, val) => { try { window.storage?.set(key, JSON.stringify(val)); } catch (e) { } };
  const saveRecords = d => { sv("diet-records", d); setRecords(d); };
  const saveProfile = d => { sv("diet-profile4", d); setProfile(d); };
  const saveCarry = d => { sv("diet-carry", d); setCarryItems(d); };
  const saveCustomFoods = d => { sv("diet-custom", d); setCustomFoods(d); };
  const savePlan = d => { sv("diet-plan2", d); setWeekPlan(d); };
  const saveRecipes = d => { sv("diet-recipes", d); setSavedRecipes(d); };
  const saveLang = l => { sv("diet-lang", l); setLang(l); };

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

  const todayKcal = Math.round((records[getTodayKey()] || []).reduce((acc, e) => {
    const f = allFoods[e.food]; return acc + (f ? f.kcal : Number(e.kcal) || 0);
  }, 0));
  const todayPct = Math.min(Math.round((todayKcal / targetKcal) * 100), 110);
  const todayColor = todayPct > 105 ? "#ef4444" : todayPct >= 85 ? "#22c55e" : "#f59e0b";

  const bmr = calcBMR(profile.weight, profile.height, profile.age, profile.gender);

  const cuisineList = lang === "ja" ? CUISINES : CUISINES_EN;

  const generatePlan = async () => {
    setPlanLoading(true); setPlanError("");
    const carryList = carryItems.map(i => i.name).join("、");
    const recipeList = savedRecipes.map(r => `${r.name}（約${r.kcal}kcal）`).join("、");
    const cuisineInfo = Object.entries(profile.cuisines || {}).filter(([, v]) => v > 0).map(([k, v]) => `${k}週${v}回`).join("、");
    const themes = (profile.healthThemes || []).map(k => t[k]).join("、");
    const kitchenMap = { none: t.kitchenNone, simple: t.kitchenSimple, full: t.kitchenFull };

    const isJa = lang === "ja";
    const prompt = isJa ?
      `栄養士として以下の条件で1週間（7日分）の献立をJSON形式のみで作成してください。説明文不要。

条件：
- 1日目標カロリー：${targetKcal}kcal
- 月予算：${profile.monthlyBudget}円
- キッチン環境：${kitchenMap[profile.kitchen] || t.kitchenNone}
- 常備食材：${carryList || "特になし"}
- 食べたいレシピ：${recipeList || "特になし"}
- 料理カテゴリ：${cuisineInfo || "指定なし"}
- 健康テーマ：${themes || "指定なし"}
- NG食材：${profile.ng || "特になし"}
- アレルギー：${profile.allergy || "特になし"}

{"days":[{"day":"Day 1","theme":"🌿 テーマ","totalKcal":1370,"budgetYen":580,"meals":[{"timing":"朝","name":"食事名","items":["食材1"],"kcal":140,"memo":"ポイント"}]}],"shoppingList":[{"category":"カテゴリ","items":[{"name":"食材","priceYen":200,"note":"用途"}]}],"weeklyAdvice":"アドバイス"}

毎日「朝・昼・夜・深夜の魔」4食含めること。食べたいレシピは必ずいずれかの日に組み込むこと。`
      :
      `As a nutritionist, create a 7-day meal plan in JSON only. No explanation text.

Conditions:
- Daily target: ${targetKcal}kcal
- Monthly budget: ¥${profile.monthlyBudget}
- Kitchen: ${kitchenMap[profile.kitchen] || t.kitchenNone}
- Pantry: ${carryList || "none"}
- Requested recipes: ${recipeList || "none"}
- Cuisine types: ${cuisineInfo || "any"}
- Health themes: ${themes || "none"}
- Avoid: ${profile.ng || "none"}
- Allergies: ${profile.allergy || "none"}

{"days":[{"day":"Day 1","theme":"🌿 Theme","totalKcal":1370,"budgetYen":580,"meals":[{"timing":"Breakfast","name":"Meal name","items":["item1"],"kcal":140,"memo":"tip"}]}],"shoppingList":[{"category":"Category","items":[{"name":"item","priceYen":200,"note":"usage"}]}],"weeklyAdvice":"advice"}

Include 4 meals per day: Breakfast, Lunch, Dinner, Late-night snack. Include requested recipes in the plan.`;

    try {
      const text = await callGemini(prompt);
      const m = text.match(/\{[\s\S]*\}/);
      if (!m) { setPlanError(isJa ? "生成に失敗しました。もう一度お試しください。" : "Generation failed. Please try again."); setPlanLoading(false); return; }
      await savePlan(JSON.parse(m[0]));
    } catch (e) { setPlanError(isJa ? `失敗しました：${e.message}` : `Failed: ${e.message}`); }
    setPlanLoading(false);
  };

  const analyzeRecipe = async () => {
    if (!recipeText || !recipeName) return;
    setRecipeLoading(true);
    const prompt = lang === "ja"
      ? `以下のレシピ「${recipeName}」の1人前のカロリーを数値のみで答えてください（例：450）。\n\n${recipeText}`
      : `What is the calorie count per serving for this recipe "${recipeName}"? Reply with a number only (e.g. 450).\n\n${recipeText}`;
    try {
      const text = await callGemini(prompt);
      const kcal = parseInt(text.match(/\d+/)?.[0] || "0");
      const newRecipe = { id: Date.now(), name: recipeName, text: recipeText, kcal };
      const updated = [...savedRecipes, newRecipe];
      saveRecipes(updated);
      setRecipeText(""); setRecipeName("");
    } catch (e) { }
    setRecipeLoading(false);
  };

  const analyzeEatingOut = async () => {
    if (!eatingOutText) return;
    setEatingOutLoading(true);
    const prompt = lang === "ja"
      ? `以下の外食内容のカロリーを推定して、今日の残り許容カロリー（目標${targetKcal}kcal）と明日の食事調整アドバイスを日本語で簡潔に教えてください。\n\n外食内容：${eatingOutText}`
      : `Estimate calories for this meal and give brief advice on remaining calories today (target ${targetKcal}kcal) and adjustments for tomorrow.\n\nMeal: ${eatingOutText}`;
    try {
      const text = await callGemini(prompt);
      setEatingOutResult(text);
    } catch (e) { }
    setEatingOutLoading(false);
  };

  const addEntry = () => {
    if (!newEntry.food) return;
    saveRecords({ ...records, [selectedDate]: [...dayRecords, { ...newEntry, id: Date.now() }] });
    setNewEntry({ timing: lang === "ja" ? "朝" : "Breakfast", food: "", kcal: "", note: "" });
    setShowAddForm(false); setCustomFoodInput(false);
  };

  const timingEmoji = tm => tm === "朝" || tm === "Breakfast" ? "🌅" : tm === "昼" || tm === "Lunch" ? "☀️" : tm === "夜" || tm === "Dinner" ? "🌙" : tm === "間食" || tm === "Snack" ? "🍎" : "🌛";
  const TIMINGS = lang === "ja" ? ["朝", "昼", "夜", "間食", "深夜"] : ["Breakfast", "Lunch", "Dinner", "Snack", "Late night"];

  const dateInput = (
    <div style={{ background: "#1e293b", borderRadius: 12, padding: 12, marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>
      <input type="date" value={selectedDate} max={getTodayKey()} onChange={e => e.target.value && setSelectedDate(e.target.value)}
        style={{ flex: 1, background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 14, boxSizing: "border-box" }} />
      <button onClick={() => setSelectedDate(getTodayKey())} style={{ padding: "10px 14px", borderRadius: 8, border: "none", background: selectedDate === getTodayKey() ? "#0f766e" : "#334155", color: selectedDate === getTodayKey() ? "#fff" : "#94a3b8", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>{t.today}</button>
    </div>
  );

  const tabs = [
    { id: "home", label: t.home },
    { id: "plan", label: t.plan },
    { id: "record", label: t.record },
    { id: "nutrition", label: t.nutrition },
    { id: "settings", label: t.settings },
  ];

  return (
    <div style={{ fontFamily: "'Hiragino Sans','Noto Sans JP',sans-serif", background: "#0f172a", minHeight: "100vh", color: "#f1f5f9", maxWidth: 480, margin: "0 auto" }}>

      <div style={{ background: "linear-gradient(135deg,#134e4a,#0f766e,#065f46)", padding: "20px 16px 16px", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 10, color: "#5eead4", letterSpacing: 3, marginBottom: 2 }}>DIET TRACKER</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{profile.name ? `${profile.name}の${t.appName}` : t.appName} 🎒</div>
            <div style={{ fontSize: 11, color: "#99f6e4", marginTop: 2 }}>{targetKcal}kcal/day · {profile.months}mo · {profile.targetKg}kg</div>
          </div>
          <button onClick={() => saveLang(lang === "ja" ? "en" : "ja")} style={{ padding: "6px 12px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
            {lang === "ja" ? "EN" : "JA"}
          </button>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 12, overflowX: "auto", paddingBottom: 2 }}>
          {tabs.map(tb => (
            <button key={tb.id} onClick={() => setTab(tb.id)} style={{ padding: "5px 10px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", background: tab === tb.id ? "#f0fdf4" : "rgba(255,255,255,0.15)", color: tab === tb.id ? "#065f46" : "#ccfbf1" }}>{tb.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: 16 }}>

        {/* ===== HOME ===== */}
        {tab === "home" && (
          <div>
            {todayKcal > 0 ? (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 16, marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>{formatDate(getTodayKey(), lang)}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: todayColor }}>{todayKcal}<span style={{ fontSize: 13, color: "#64748b" }}>kcal</span></div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{targetKcal}kcal</div>
                </div>
                <div style={{ background: "#334155", borderRadius: 6, height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(todayPct, 100)}%`, height: "100%", background: todayColor, borderRadius: 6 }} />
                </div>
                {todayPct <= 100 && <div style={{ fontSize: 11, color: "#5eead4", marginTop: 6 }}>{t.kcalLeft.replace("{n}", targetKcal - todayKcal)}</div>}
              </div>
            ) : (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13, color: "#64748b" }}>{t.todayNoRecord}</div>
                <button onClick={() => setTab("record")} style={{ padding: "6px 14px", borderRadius: 20, border: "none", background: "rgba(15,118,110,0.3)", color: "#5eead4", fontSize: 12, cursor: "pointer" }}>{t.doRecord}</button>
              </div>
            )}

            {weekPlan?.days ? (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{t.thisWeekPlan}</div>
                  <button onClick={() => setTab("plan")} style={{ fontSize: 11, color: "#5eead4", background: "none", border: "none", cursor: "pointer" }}>{t.seeAll}</button>
                </div>
                <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
                  {weekPlan.days.slice(0, 4).map((day, i) => (
                    <div key={i} onClick={() => { setTab("plan"); setExpandedDay(i); }} style={{ minWidth: 100, background: "#0f172a", borderRadius: 10, padding: "10px 8px", cursor: "pointer", textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4 }}>{day.day}</div>
                      <div style={{ fontSize: 18, marginBottom: 4 }}>{day.theme?.split(" ")[0] || "🍱"}</div>
                      <div style={{ fontSize: 11, color: "#34d399", fontWeight: 700, marginTop: 4 }}>{day.totalKcal}kcal</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 16, marginBottom: 14, textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>🤖</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#5eead4", marginBottom: 12 }}>{t.generatePlan}</div>
                <button onClick={() => { setTab("plan"); generatePlan(); }} style={{ padding: "10px 24px", borderRadius: 12, border: "none", background: "#0f766e", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{t.generatePlan}</button>
              </div>
            )}

            <div style={{ background: "#1e293b", borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 10 }}>{t.carryItems}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {carryItems.map(item => (
                  <span key={item.id} style={{ padding: "4px 10px", background: "rgba(15,118,110,0.15)", border: "1px solid #1e3a2f", borderRadius: 20, fontSize: 11, color: "#5eead4" }}>{item.emoji} {item.name}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== PLAN ===== */}
        {tab === "plan" && (
          <div>
            {!weekPlan ? (
              <div>
                <div style={{ background: "linear-gradient(135deg,#1e3a2f,#14532d)", borderRadius: 12, padding: 20, marginBottom: 16, border: "1px solid #166534", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>🤖</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#86efac", marginBottom: 16 }}>{t.generatePlan}</div>
                  <button onClick={generatePlan} disabled={planLoading} style={{ padding: "12px 32px", borderRadius: 12, border: "none", background: planLoading ? "#334155" : "#0f766e", color: "#fff", fontSize: 14, fontWeight: 700, cursor: planLoading ? "default" : "pointer" }}>
                    {planLoading ? t.generating : t.generatePlan}
                  </button>
                  {planError && <div style={{ marginTop: 12, fontSize: 12, color: "#f87171", background: "rgba(239,68,68,0.1)", borderRadius: 8, padding: "8px 12px" }}>{planError}</div>}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  {[[t.planTab, "plan"], [t.shoppingTab, "shopping"]].map(([label, id]) => (
                    <button key={id} onClick={() => setPlanView(id)} style={{ flex: 1, padding: 8, borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: planView === id ? "#0f766e" : "#1e293b", color: planView === id ? "#fff" : "#94a3b8" }}>{label}</button>
                  ))}
                  <button onClick={() => { if (window.confirm(lang === "ja" ? "再生成しますか？" : "Regenerate?")) { savePlan(null); generatePlan(); } }} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #334155", background: "transparent", color: "#64748b", fontSize: 11, cursor: "pointer" }}>{t.regenBtn}</button>
                </div>

                {weekPlan.weeklyAdvice && (
                  <div style={{ background: "rgba(15,118,110,0.15)", border: "1px solid #0f766e", borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: "#5eead4", lineHeight: 1.7 }}>
                    {t.planAdvice}{weekPlan.weeklyAdvice}
                  </div>
                )}

                {planView === "plan" && weekPlan.days?.map((day, i) => (
                  <div key={i} style={{ background: "#1e293b", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
                    <div onClick={() => setExpandedDay(expandedDay === i ? -1 : i)} style={{ padding: 14, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{day.day} {day.theme}</div>
                        <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>¥{day.budgetYen}</div>
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
                                <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 10, background: "#0f2942", color: "#7dd3fc" }}>{meal.timing}</span>
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
                    <div style={{ background: "#1e293b", borderRadius: 12, padding: 12, marginBottom: 14, fontSize: 12, color: "#94a3b8" }}>{t.shoppingNote}</div>
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
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#86efac", marginBottom: 8 }}>{t.carryNote}</div>
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
                  <div style={{ fontSize: 14, color: "#5eead4", fontWeight: 700, marginBottom: 8 }}>{t.generating}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== RECORD ===== */}
        {tab === "record" && (
          <div>
            <div style={{ background: "rgba(15,118,110,0.1)", border: "1px solid rgba(15,118,110,0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#5eead4" }}>{t.recordOk}</div>
            {dateInput}
            {totalKcal > 0 && (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: kcalColor }}>{totalKcal}<span style={{ fontSize: 13, color: "#64748b" }}>kcal</span></div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{targetKcal}kcal</div>
                </div>
                <div style={{ background: "#334155", borderRadius: 6, height: 6, overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(kcalPct, 100)}%`, height: "100%", background: kcalColor, borderRadius: 6 }} />
                </div>
              </div>
            )}

            {TIMINGS.map(timing => {
              const entries = dayRecords.filter(e => e.timing === timing);
              if (entries.length === 0 && (timing === "間食" || timing === "Snack" || timing === "深夜" || timing === "Late night")) return null;
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
                            <button onClick={() => saveRecords({ ...records, [selectedDate]: dayRecords.filter(e => e.id !== entry.id) })} style={{ background: "rgba(239,68,68,0.15)", border: "none", borderRadius: 6, padding: "3px 8px", color: "#f87171", cursor: "pointer", fontSize: 11 }}>{t.delete}</button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}

            {!showAddForm ? (
              <button onClick={() => setShowAddForm(true)} style={{ width: "100%", padding: 14, borderRadius: 12, border: "2px dashed #0f766e", background: "transparent", color: "#5eead4", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4, marginBottom: 12 }}>
                {t.addRecord}
              </button>
            ) : (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 16, marginTop: 4, marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#5eead4" }}>{t.recordTitle}（{formatDate(selectedDate, lang)}）</div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>{t.timing}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {TIMINGS.map(tm => (
                      <button key={tm} onClick={() => setNewEntry({ ...newEntry, timing: tm })} style={{ padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, background: newEntry.timing === tm ? "#0f766e" : "#334155", color: newEntry.timing === tm ? "#fff" : "#94a3b8" }}>{tm}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{t.food}</div>
                    <button onClick={() => setCustomFoodInput(!customFoodInput)} style={{ background: "none", border: "none", color: "#5eead4", fontSize: 11, cursor: "pointer" }}>{customFoodInput ? t.fromList : t.freeInput}</button>
                  </div>
                  {customFoodInput
                    ? <input value={newEntry.food} onChange={e => setNewEntry({ ...newEntry, food: e.target.value })} placeholder={lang === "ja" ? "例：コンビニサンドイッチ" : "e.g. Convenience store sandwich"} style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 13, boxSizing: "border-box" }} />
                    : <select value={newEntry.food} onChange={e => setNewEntry({ ...newEntry, food: e.target.value })} style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: newEntry.food ? "#f1f5f9" : "#64748b", fontSize: 13 }}>
                      <option value="">{lang === "ja" ? "食べたものを選ぶ..." : "Select food..."}</option>
                      {Object.keys(allFoods).map(f => <option key={f} value={f}>{f}（{allFoods[f].kcal}kcal）</option>)}
                    </select>
                  }
                </div>
                {customFoodInput && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>{t.kcalInput}</div>
                    <input type="number" value={newEntry.kcal} onChange={e => setNewEntry({ ...newEntry, kcal: e.target.value })} placeholder="350" style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 13, boxSizing: "border-box" }} />
                  </div>
                )}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>{t.memo}</div>
                  <input value={newEntry.note} onChange={e => setNewEntry({ ...newEntry, note: e.target.value })} placeholder={lang === "ja" ? "例：現場のお弁当" : "e.g. Work lunch"} style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 13, boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { setShowAddForm(false); setCustomFoodInput(false); setNewEntry({ timing: TIMINGS[0], food: "", kcal: "", note: "" }); }} style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid #475569", background: "transparent", color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>{t.cancel}</button>
                  <button onClick={addEntry} disabled={!newEntry.food} style={{ flex: 2, padding: 12, borderRadius: 10, border: "none", background: newEntry.food ? "#0f766e" : "#334155", color: newEntry.food ? "#fff" : "#64748b", fontSize: 13, fontWeight: 700, cursor: newEntry.food ? "pointer" : "default" }}>{t.save}</button>
                </div>
              </div>
            )}

            {/* 外食記録 */}
            <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, marginTop: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#5eead4", marginBottom: 6 }}>{t.eating_out}</div>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10 }}>{t.eating_out_desc}</div>
              <textarea value={eatingOutText} onChange={e => setEatingOutText(e.target.value)} placeholder={t.eating_out_placeholder} style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 13, boxSizing: "border-box", minHeight: 80, resize: "vertical" }} />
              <button onClick={analyzeEatingOut} disabled={!eatingOutText || eatingOutLoading} style={{ width: "100%", padding: 10, borderRadius: 10, border: "none", background: eatingOutText && !eatingOutLoading ? "#0f766e" : "#334155", color: eatingOutText && !eatingOutLoading ? "#fff" : "#64748b", fontSize: 13, fontWeight: 700, cursor: eatingOutText && !eatingOutLoading ? "pointer" : "default", marginTop: 8 }}>
                {eatingOutLoading ? "..." : `${t.eating_out_analyze}`}
              </button>
              {eatingOutResult && (
                <div style={{ marginTop: 10, background: "rgba(15,118,110,0.15)", border: "1px solid #0f766e", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#5eead4", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{eatingOutResult}</div>
              )}
            </div>
          </div>
        )}

        {/* ===== NUTRITION ===== */}
        {tab === "nutrition" && (
          <div>
            {dateInput}
            {dayRecords.length === 0 ? (
              <div>
                <div style={{ background: "#1e293b", borderRadius: 12, padding: 20, textAlign: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>🥗</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>{t.noNutriData}</div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>{t.noNutriDesc}</div>
                </div>
                <div style={{ background: "#1e293b", borderRadius: 12, padding: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#fca5a5", marginBottom: 10 }}>{t.deficiency}</div>
                  {[
                    { name: lang === "ja" ? "ビタミンD" : "Vitamin D", tip: lang === "ja" ? "さば缶・干し椎茸・日光" : "Canned mackerel, mushrooms, sunlight" },
                    { name: lang === "ja" ? "亜鉛" : "Zinc", tip: lang === "ja" ? "ナッツ・肉類" : "Nuts, meat" },
                    { name: lang === "ja" ? "マグネシウム" : "Magnesium", tip: lang === "ja" ? "睡眠・疲労回復にも" : "Also helps sleep & recovery" },
                    { name: lang === "ja" ? "ビタミンC" : "Vitamin C", tip: lang === "ja" ? "梅干し・緑黄色野菜" : "Plums, green/yellow vegs" },
                  ].map((n, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid #334155" : "none" }}>
                      <div>
                        <div style={{ fontSize: 13, color: "#fca5a5" }}>{n.name}</div>
                        <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{n.tip}</div>
                      </div>
                      <span style={{ fontSize: 11, color: "#fbbf24", padding: "2px 8px", background: "rgba(251,191,36,0.1)", borderRadius: 10, height: "fit-content" }}>Supp</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{formatDate(selectedDate, lang)}{t.nutriTitle}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 16 }}>{t.nutriDesc}</div>
                {Object.entries(RDA).map(([key, rda]) => {
                  const val = Math.round((dayTotals[key] || 0) * 10) / 10;
                  const nl = NUTRIENT_LABELS[key];
                  return <NutrientBar key={key} label={lang === "ja" ? nl.label : nl.labelEn} value={val} rda={rda} unit={nl.unit} color={nl.color} />;
                })}
              </div>
            )}
          </div>
        )}

        {/* ===== SETTINGS ===== */}
        {tab === "settings" && (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto" }}>
              {[[t.settingsGoal, "profile"], [t.settingsCarry, "carry"], [t.settingsRecipe, "recipe"], [t.settingsFood, "food"]].map(([label, id]) => (
                <button key={id} onClick={() => setSettingsSection(id)} style={{ flex: "0 0 auto", padding: "8px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, background: settingsSection === id ? "#0f766e" : "#1e293b", color: settingsSection === id ? "#fff" : "#94a3b8" }}>{label}</button>
              ))}
            </div>

            {settingsSection === "profile" && (
              <div style={{ background: "#1e293b", borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: "#5eead4" }}>{t.profileTitle}</div>

                {/* 基本情報 */}
                {[
                  { label: t.name, key: "name", type: "text", placeholder: lang === "ja" ? "例：ゆい" : "e.g. Yui" },
                  { label: t.age, key: "age", type: "number", placeholder: "28" },
                  { label: t.weight, key: "weight", type: "number", placeholder: "60" },
                  { label: t.height, key: "height", type: "number", placeholder: "160" },
                  { label: t.targetKg, key: "targetKg", type: "number", placeholder: "5" },
                  { label: t.months, key: "months", type: "number", placeholder: "3" },
                  { label: t.budget, key: "monthlyBudget", type: "number", placeholder: "20000" },
                  { label: t.ng, key: "ng", type: "text", placeholder: lang === "ja" ? "例：いか、えび" : "e.g. shellfish" },
                  { label: t.allergy, key: "allergy", type: "text", placeholder: lang === "ja" ? "例：乳糖不耐症" : "e.g. lactose intolerant" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key} style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{label}</div>
                    <input type={type} value={profile[key] || ""} onChange={e => setProfile({ ...profile, [key]: type === "number" ? Number(e.target.value) || "" : e.target.value })} placeholder={placeholder}
                      style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 12, boxSizing: "border-box" }} />
                  </div>
                ))}

                {/* 性別 */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>{t.gender}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[["female", t.female], ["male", t.male]].map(([val, label]) => (
                      <button key={val} onClick={() => setProfile({ ...profile, gender: val })} style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", cursor: "pointer", background: profile.gender === val ? "#0f766e" : "#334155", color: profile.gender === val ? "#fff" : "#94a3b8", fontSize: 13 }}>{label}</button>
                    ))}
                  </div>
                </div>

                {/* 活動レベル */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>{t.activityLevel}</div>
                  {[["sedentary", t.sedentary], ["light", t.light], ["moderate", t.moderate], ["active", t.active]].map(([val, label]) => (
                    <button key={val} onClick={() => setProfile({ ...profile, activityLevel: val })} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "none", cursor: "pointer", textAlign: "left", marginBottom: 4, background: profile.activityLevel === val ? "#0f766e" : "#334155", color: profile.activityLevel === val ? "#fff" : "#94a3b8", fontSize: 12 }}>
                      {profile.activityLevel === val ? "✅ " : ""}{label}
                    </button>
                  ))}
                </div>

                {/* 自動計算 */}
                {profile.weight && profile.height && profile.age && (
                  <div style={{ background: "rgba(15,118,110,0.15)", borderRadius: 10, padding: 12, marginBottom: 12, border: "1px solid #0f766e" }}>
                    <div style={{ fontSize: 11, color: "#5eead4", marginBottom: 4 }}>{t.autoCalc}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>{calcTargetKcal(profile)}<span style={{ fontSize: 12, color: "#5eead4" }}> {t.kcalPerDay}</span></div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{t.autoCalcDesc}: {Math.round(bmr)}kcal</div>
                  </div>
                )}

                {/* キッチン環境 */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>{t.kitchenEnv}</div>
                  {[["none", t.kitchenNone], ["simple", t.kitchenSimple], ["full", t.kitchenFull]].map(([val, label]) => (
                    <button key={val} onClick={() => setProfile({ ...profile, kitchen: val })} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", textAlign: "left", marginBottom: 4, background: profile.kitchen === val ? "#0f766e" : "#334155", color: profile.kitchen === val ? "#fff" : "#94a3b8", fontSize: 12 }}>
                      {profile.kitchen === val ? "✅ " : ""}{label}
                    </button>
                  ))}
                </div>

                {/* 料理カテゴリ */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>{t.cuisineTitle}</div>
                  {cuisineList.map((cuisine, i) => {
                    const key = CUISINES[i];
                    const val = (profile.cuisines || {})[key] || 0;
                    return (
                      <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, color: "#cbd5e1" }}>{cuisine}</span>
                        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                          <button onClick={() => setProfile({ ...profile, cuisines: { ...(profile.cuisines || {}), [key]: Math.max(0, (profile.cuisines || {})[key] || 0) - 1 } })} style={{ width: 28, height: 28, borderRadius: 6, border: "none", background: "#334155", color: "#94a3b8", cursor: "pointer", fontSize: 16 }}>−</button>
                          <span style={{ width: 24, textAlign: "center", fontSize: 14, color: "#f1f5f9", fontWeight: 700 }}>{val}</span>
                          <button onClick={() => setProfile({ ...profile, cuisines: { ...(profile.cuisines || {}), [key]: ((profile.cuisines || {})[key] || 0) + 1 } })} style={{ width: 28, height: 28, borderRadius: 6, border: "none", background: "#334155", color: "#94a3b8", cursor: "pointer", fontSize: 16 }}>＋</button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 健康テーマ */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>{t.healthTheme}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {HEALTH_THEMES.map(theme => {
                      const selected = (profile.healthThemes || []).includes(theme);
                      return (
                        <button key={theme} onClick={() => {
                          const themes = profile.healthThemes || [];
                          setProfile({ ...profile, healthThemes: selected ? themes.filter(x => x !== theme) : [...themes, theme] });
                        }} style={{ padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, background: selected ? "#0f766e" : "#334155", color: selected ? "#fff" : "#94a3b8" }}>
                          {t[theme]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button onClick={() => { saveProfile(profile); savePlan(null); setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2500); }} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "#0f766e", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  {t.saveProfile}
                </button>
                {savedMsg && <div style={{ marginTop: 8, textAlign: "center", fontSize: 12, color: "#34d399" }}>{t.saved}</div>}
              </div>
            )}

            {settingsSection === "carry" && (
              <div>
                <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                  {carryItems.map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #334155" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{item.emoji}</span>
                        <div>
                          <div style={{ fontSize: 13 }}>{item.name}</div>
                          {item.note && <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>{item.note}</div>}
                        </div>
                      </div>
                      <button onClick={() => saveCarry(carryItems.filter(i => i.id !== item.id))} style={{ background: "rgba(239,68,68,0.15)", border: "none", borderRadius: 6, padding: "3px 10px", color: "#f87171", cursor: "pointer", fontSize: 11 }}>{t.delete}</button>
                    </div>
                  ))}
                </div>
                {!showCarryForm ? (
                  <button onClick={() => setShowCarryForm(true)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "2px dashed #0f766e", background: "transparent", color: "#5eead4", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{t.addCarry}</button>
                ) : (
                  <div style={{ background: "#1e293b", borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#5eead4" }}>{t.addCarryTitle}</div>
                    {[{ label: t.emoji, key: "emoji", placeholder: "🥬" }, { label: t.itemName, key: "name", placeholder: lang === "ja" ? "例：乾燥大根葉" : "e.g. dried radish leaves" }, { label: t.itemNote, key: "note", placeholder: lang === "ja" ? "例：ビタミン補給" : "e.g. vitamin boost" }].map(({ label, key, placeholder }) => (
                      <div key={key} style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{label}</div>
                        <input value={newCarry[key]} onChange={e => setNewCarry({ ...newCarry, [key]: e.target.value })} placeholder={placeholder} style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "8px 12px", color: "#f1f5f9", fontSize: 13, boxSizing: "border-box" }} />
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => { setShowCarryForm(false); setNewCarry({ name: "", emoji: "🎒", note: "" }); }} style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #475569", background: "transparent", color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>{t.cancel}</button>
                      <button onClick={() => { if (!newCarry.name) return; saveCarry([...carryItems, { ...newCarry, id: Date.now() }]); setNewCarry({ name: "", emoji: "🎒", note: "" }); setShowCarryForm(false); }} disabled={!newCarry.name} style={{ flex: 2, padding: 10, borderRadius: 10, border: "none", background: newCarry.name ? "#0f766e" : "#334155", color: newCarry.name ? "#fff" : "#64748b", fontSize: 13, fontWeight: 700, cursor: newCarry.name ? "pointer" : "default" }}>{t.addBtn}</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {settingsSection === "recipe" && (
              <div>
                <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: "#5eead4" }}>{t.recipeTitle}</div>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10 }}>{t.recipeDesc}</div>
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{t.recipeName}</div>
                    <input value={recipeName} onChange={e => setRecipeName(e.target.value)} placeholder={lang === "ja" ? "例：友達のパスタレシピ" : "e.g. Friend's pasta recipe"} style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 13, boxSizing: "border-box" }} />
                  </div>
                  <textarea value={recipeText} onChange={e => setRecipeText(e.target.value)} placeholder={t.recipePlaceholder} style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 12, boxSizing: "border-box", minHeight: 120, resize: "vertical", marginBottom: 10 }} />
                  <button onClick={analyzeRecipe} disabled={!recipeText || !recipeName || recipeLoading} style={{ width: "100%", padding: 10, borderRadius: 10, border: "none", background: (recipeText && recipeName && !recipeLoading) ? "#0f766e" : "#334155", color: (recipeText && recipeName && !recipeLoading) ? "#fff" : "#64748b", fontSize: 13, fontWeight: 700, cursor: (recipeText && recipeName && !recipeLoading) ? "pointer" : "default" }}>
                    {recipeLoading ? t.recipeAnalyzing : t.recipeAnalyze}
                  </button>
                </div>

                {savedRecipes.length > 0 && (
                  <div style={{ background: "#1e293b", borderRadius: 12, padding: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "#5eead4" }}>{t.recipeList}</div>
                    {savedRecipes.map(recipe => (
                      <div key={recipe.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #334155" }}>
                        <div>
                          <div style={{ fontSize: 13 }}>{recipe.name}</div>
                          <div style={{ fontSize: 11, color: "#34d399", marginTop: 2 }}>約{recipe.kcal}kcal/人前</div>
                        </div>
                        <button onClick={() => saveRecipes(savedRecipes.filter(r => r.id !== recipe.id))} style={{ background: "rgba(239,68,68,0.15)", border: "none", borderRadius: 6, padding: "3px 10px", color: "#f87171", cursor: "pointer", fontSize: 11 }}>{t.delete}</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {settingsSection === "food" && (
              <div>
                {Object.keys(customFoods).length > 0 && (
                  <div style={{ background: "#1e293b", borderRadius: 12, padding: 14, marginBottom: 12 }}>
                    {Object.entries(customFoods).map(([name, data]) => (
                      <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #334155" }}>
                        <div>
                          <div style={{ fontSize: 13 }}>{name}</div>
                          <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>{data.kcal}kcal</div>
                        </div>
                        <button onClick={() => { const u = { ...customFoods }; delete u[name]; saveCustomFoods(u); }} style={{ background: "rgba(239,68,68,0.15)", border: "none", borderRadius: 6, padding: "3px 10px", color: "#f87171", cursor: "pointer", fontSize: 11 }}>{t.delete}</button>
                      </div>
                    ))}
                  </div>
                )}
                {!showFoodForm ? (
                  <button onClick={() => setShowFoodForm(true)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "2px dashed #0f766e", background: "transparent", color: "#5eead4", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{t.addCustomFood}</button>
                ) : (
                  <div style={{ background: "#1e293b", borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#5eead4" }}>{t.addCustomFoodTitle}</div>
                    {[{ label: lang === "ja" ? "食材名" : "Food name", key: "name", placeholder: lang === "ja" ? "例：玄米おにぎり（1個）" : "e.g. Brown rice onigiri", type: "text" }, { label: t.kcalInput, key: "kcal", placeholder: "200", type: "number" }, { label: lang === "ja" ? "たんぱく質（g）" : "Protein (g)", key: "protein", placeholder: "4", type: "number" }].map(({ label, key, placeholder, type }) => (
                      <div key={key} style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>{label}</div>
                        <input type={type} value={newFood[key]} onChange={e => setNewFood({ ...newFood, [key]: e.target.value })} placeholder={placeholder} style={{ width: "100%", background: "#334155", border: "1px solid #475569", borderRadius: 8, padding: "10px 12px", color: "#f1f5f9", fontSize: 13, boxSizing: "border-box" }} />
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => { setShowFoodForm(false); setNewFood({ name: "", kcal: "", protein: "" }); }} style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #475569", background: "transparent", color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>{t.cancel}</button>
                      <button onClick={() => { if (!newFood.name || !newFood.kcal) return; saveCustomFoods({ ...customFoods, [newFood.name]: { kcal: Number(newFood.kcal), protein: Number(newFood.protein) || 0, iron: 0, calcium: 0, vitC: 0, vitD: 0, vitB12: 0, zinc: 0, magnesium: 0, vitE: 0, fiber: 0, omega3: 0 } }); setNewFood({ name: "", kcal: "", protein: "" }); setShowFoodForm(false); }} disabled={!newFood.name || !newFood.kcal} style={{ flex: 2, padding: 10, borderRadius: 10, border: "none", background: (newFood.name && newFood.kcal) ? "#0f766e" : "#334155", color: (newFood.name && newFood.kcal) ? "#fff" : "#64748b", fontSize: 13, fontWeight: 700, cursor: (newFood.name && newFood.kcal) ? "pointer" : "default" }}>{t.addBtn}</button>
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