import type { Meal } from "@/lib/types";

export const MEALS: Meal[] = [
  {
    id: "oats-berries",
    name: "Oatmeal with Berries & Honey",
    type: "breakfast",
    kcal: 420,
    protein: 14,
    tags: ["maintenance", "bulking"],
    description: "Slow-digesting carbs for steady energy through morning sessions.",
  },
  {
    id: "eggs-avocado-toast",
    name: "Scrambled Eggs on Avocado Toast",
    type: "breakfast",
    kcal: 480,
    protein: 24,
    tags: ["bulking", "maintenance"],
    description: "Complete protein plus healthy fats to support recovery.",
  },
  {
    id: "greek-yogurt-parfait",
    name: "Greek Yogurt Parfait with Granola",
    type: "breakfast",
    kcal: 350,
    protein: 20,
    tags: ["cutting", "maintenance"],
    description: "High protein, lower calorie start for fat-loss days.",
  },
  {
    id: "chicken-rice-bowl",
    name: "Grilled Chicken & Rice Bowl",
    type: "lunch",
    kcal: 620,
    protein: 45,
    tags: ["bulking", "maintenance"],
    description: "The classic muscle-building staple - lean protein with quality carbs.",
  },
  {
    id: "tuna-salad",
    name: "Tuna Salad with Mixed Greens",
    type: "lunch",
    kcal: 380,
    protein: 34,
    tags: ["cutting"],
    description: "Lean protein and omega-3s while keeping calories in check.",
  },
  {
    id: "beef-quinoa",
    name: "Lean Beef & Quinoa Plate",
    type: "lunch",
    kcal: 650,
    protein: 42,
    tags: ["bulking"],
    description: "Iron, creatine, and zinc - key micronutrients for hard trainers.",
  },
  {
    id: "salmon-sweetpotato",
    name: "Baked Salmon with Sweet Potato",
    type: "dinner",
    kcal: 580,
    protein: 40,
    tags: ["maintenance", "bulking"],
    description: "Protein plus anti-inflammatory fats for overnight recovery.",
  },
  {
    id: "turkey-stirfry",
    name: "Turkey & Veggie Stir-Fry",
    type: "dinner",
    kcal: 450,
    protein: 38,
    tags: ["cutting", "maintenance"],
    description: "Volume eating - big plate, moderate calories, high protein.",
  },
  {
    id: "cottage-casein",
    name: "Cottage Cheese with Almonds",
    type: "dinner",
    kcal: 300,
    protein: 28,
    tags: ["cutting"],
    description: "Slow-release casein protein ideal before sleep.",
  },
  {
    id: "banana-peanut-butter",
    name: "Banana with Peanut Butter",
    type: "snack",
    kcal: 280,
    protein: 8,
    tags: ["bulking", "maintenance"],
    description: "Quick carbs and fats between meals or before training.",
  },
  {
    id: "protein-shake",
    name: "Whey Protein Shake",
    type: "snack",
    kcal: 130,
    protein: 25,
    tags: ["cutting", "bulking", "maintenance"],
    description: "The easiest way to hit daily protein targets.",
  },
  {
    id: "hummus-wrap",
    name: "Hummus & Veggie Wrap",
    type: "snack",
    kcal: 320,
    protein: 11,
    tags: ["maintenance", "cutting"],
    description: "Plant-based carbs and fiber to keep energy stable.",
  },
  {
    id: "pre-oats-banana",
    name: "Oats + Banana + Espresso",
    type: "pre-workout",
    kcal: 350,
    protein: 9,
    tags: ["bulking", "maintenance", "cutting"],
    description: "Eat 60-90 min before training: carbs for fuel, caffeine for focus.",
  },
  {
    id: "pre-rice-cakes",
    name: "Rice Cakes with Honey",
    type: "pre-workout",
    kcal: 210,
    protein: 4,
    tags: ["cutting"],
    description: "Fast-digesting carbs 30 min out when training on lighter stomach.",
  },
  {
    id: "post-shake-banana",
    name: "Whey Shake + Banana",
    type: "post-workout",
    kcal: 280,
    protein: 27,
    tags: ["cutting", "bulking", "maintenance"],
    description: "Fast protein and carbs within an hour of finishing your session.",
  },
  {
    id: "post-chicken-potato",
    name: "Chicken Breast with White Rice",
    type: "post-workout",
    kcal: 520,
    protein: 44,
    tags: ["bulking", "maintenance"],
    description: "A full recovery meal 1-2 hours after training.",
  },
];

export interface GuidanceSection {
  title: string;
  body: string;
}

export const NUTRITION_GUIDANCE: Record<string, GuidanceSection[]> = {
  bulking: [
    {
      title: "Calorie surplus",
      body: "Eat 300-500 kcal above maintenance daily. Aim for roughly 0.25-0.5 kg gain per week; faster usually means extra fat.",
    },
    {
      title: "Protein target",
      body: "1.6-2.2 g per kg of bodyweight every day. Spread it across 3-5 meals for best use.",
    },
    {
      title: "Training fuel",
      body: "Do not train fasted while bulking. Have carbs 1-2 hours pre-workout to push heavier sets.",
    },
  ],
  cutting: [
    {
      title: "Moderate deficit",
      body: "Eat 300-500 kcal below maintenance. Crash dieting burns muscle along with fat.",
    },
    {
      title: "Protect muscle",
      body: "Keep protein high (2.0-2.4 g/kg) and keep lifting heavy - cardio alone will not preserve size.",
    },
    {
      title: "Meal timing",
      body: "Front-load protein early in the day and consider a casein-rich evening snack like cottage cheese.",
    },
  ],
  maintenance: [
    {
      title: "Consistency beats perfection",
      body: "Hold bodyweight steady within ±1 kg. Adjust portions only when weight trends shift for over a week.",
    },
    {
      title: "80/20 rule",
      body: "Eighty percent whole foods, twenty percent flexible choices keeps adherence sustainable.",
    },
    {
      title: "Hydration",
      body: "Drink 30-40 ml of water per kg bodyweight daily, more on heavy leg days.",
    },
  ],
};

/** Nutrition tips tailored to the muscle group being trained. */
export const MUSCLE_NUTRITION: Record<string, string> = {
  chest:
    "Pushing movements rely on glycogen - include rice, oats, or potatoes in your pre-workout meal on chest days.",
  back:
    "Big pulling muscles need steady protein intake across the day; add eggs, chicken, or lentils at each meal.",
  legs:
    "Leg day burns the most energy. Eat a carb-focused meal 90 minutes before and refuel with protein plus carbs after.",
  shoulders:
    "Small muscles, frequent work - keep daily protein consistent and stay hydrated to avoid cramping under pressing loads.",
  arms:
    "Arm growth follows overall mass - total calories matter more than any single food. Do not skip post-workout carbs.",
  core:
    "Visible abs are made in the kitchen. Prioritize whole foods and a slight calorie deficit if definition is the goal.",
};
