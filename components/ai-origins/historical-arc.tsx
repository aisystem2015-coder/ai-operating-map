"use client";

import HorizontalTimeline from "../charts/HorizontalTimeline";

const eras = [
  {
    period: "1950s–1970s",
    title: "🧠 Symbolic AI: Rules and Logic",
    intro: "Early AI was hand-written rules.",
    bullets: [
      "Engineers wrote every if/then by hand.",
      "Worked for board games; broke in messy reality.",
      "Nothing learned—people had to add new rules.",
      "Costs ballooned as the rule pile grew.",
    ],
  },
  {
    period: "1980s–1990s",
    title: "🧰 Expert Systems: The Maintenance Wall",
    intro: "Rule piles turned into upkeep debt.",
    bullets: [
      "Experts talked; coders turned steps into rules.",
      "Edge cases exploded faster than updates.",
      "Systems snapped when business logic shifted.",
      "High upkeep for narrow wins.",
    ],
  },
  {
    period: "1990s–2010s",
    title: "📈 Machine Learning: Pattern Recognition",
    intro: "Data began to replace hand-written rules.",
    bullets: [
      "Models learned patterns from labeled examples.",
      "People still crafted features by hand.",
      "Good at one task at a time.",
      "Fails when new data looks different from training.",
    ],
  },
  {
    period: "2012",
    title: "⚡ Deep Learning + GPUs",
    intro: "GPUs made deep nets train fast.",
    bullets: [
      "Thousands of cores train millions of weights quickly.",
      "Networks learn their own features.",
      "ImageNet gains showed scale beats tiny tweaks.",
      "Shift from coding rules to training behavior.",
    ],
  },
  {
    period: "2017–Present",
    title: "🌐 Transformers & Generative Models",
    intro: "Transformers read whole contexts at once.",
    bullets: [
      "One architecture adapts to many tasks.",
      "Generates answers by guessing likely next words.",
      "Sounds confident but can be wrong.",
      "Needs real data grounding to stay accurate.",
    ],
  },
];

const items = eras.map((era, i) => ({
  id: `${i}-${era.period}`,
  period: era.period,
  title: era.title,
  sections: [
    {
      label: "What was true then",
      text: `${era.intro} ${era.bullets.join(" ")}`,
      tone: "neutral" as const,
    },
  ],
}));

export default function HistoricalArc() {
  return (
    <div className="w-full">
      <div className="mb-16 md:mb-20 text-center max-w-4xl mx-auto px-6">
        <h5 className="text-xs uppercase tracking-wide text-accent mb-2">The Historical Arc</h5>
        <h2 className="mb-6 text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground">
          History of AI
        </h2>
        <p className="text-base md:text-lg text-secondary leading-relaxed">
          The evolution of artificial intelligence spans decades, marked by fundamental shifts in
          approach and capability. Click an era below — understanding this history reveals why AI
          works now in ways it never could before.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <HorizontalTimeline items={items} />
      </div>
    </div>
  );
}
