export interface FaqEntry {
  question: string;
  answer: string;
}

export interface FeatureEntry {
  name: string;
  status: "Live";
  description: string;
  bullets: string[];
  faqs: FaqEntry[];
}

export interface FeatureCategory {
  id: string;
  label: string;
  description: string;
  features: FeatureEntry[];
}

export interface NavLink {
  label: string;
  href: string;
}

export const siteContent: {
  brand: { name: string; tagline: string };
  nav: NavLink[];
  footerNav: NavLink[];
  landing: {
    heroWords: { word: string; tagline: string }[];
    heroHeadlineSuffix: string;
    painPoints: { quote: string; feature: string; description: string }[];
    comparison: { label: string; traditional: string; atp: string }[];
    howItWorks: {
      category: string;
      step: number;
      title: string;
      description: string;
      tag?: string;
    }[];
    testimonial: { quote: string; name: string; title: string };
    finalCta: { heading: string; subhead: string };
  };
  featureCategories: FeatureCategory[];
  sports: { category: string; raceTypes: string[] }[];
  racePriorities: { tier: string; name: string; description: string }[];
  integrations: { name: string; description: string }[];
} = {
  brand: {
    name: "AiTrainingPlan",
    tagline:
      "The world's most data-driven AI training coach. For professional athletes ... and wannabes.",
  },
  nav: [
    { label: "Features", href: "/features/" },
    { label: "Why ATP?", href: "/how-its-different/" },
    { label: "Calculators", href: "/calculators/" },
    { label: "FIT Tools", href: "/fit-tools/" },
    { label: "Nutrition", href: "/nutrition/" },
    { label: "Alternatives", href: "/alternatives/" },
    { label: "Guides", href: "/guides/" },
  ],
  footerNav: [
    { label: "Features", href: "/features/" },
    { label: "Why ATP?", href: "/how-its-different/" },
    { label: "Calculators", href: "/calculators/" },
    { label: "FIT Tools", href: "/fit-tools/" },
    { label: "Prompt Builder", href: "/prompt-builder/" },
    { label: "Nutrition", href: "/nutrition/" },
    { label: "Alternatives", href: "/alternatives/" },
    { label: "Guides", href: "/guides/" },
    { label: "Compare", href: "/compare/" },
    { label: "Privacy", href: "/privacy/" },
    { label: "Terms", href: "/terms/" },
  ],
  landing: {
    heroWords: [
      {
        word: "Personalized",
        tagline:
          "Two AI models debate your data independently, then synthesize one personalized plan.",
      },
      {
        word: "Real-time",
        tagline:
          "Real-time sync just in time for your next session — always current, never stale.",
      },
      {
        word: "Multi-AI-led",
        tagline:
          "Two independent AI models analyze your data and synthesize a consensus training plan.",
      },
      {
        word: "Adaptive",
        tagline:
          "Missed a session? Plan reshuffles automatically. Key workouts shift, rest days move.",
      },
      {
        word: "Portable",
        tagline:
          "Structured prompts you run in ChatGPT, Claude, or Gemini — your favorite AI becomes your coach.",
      },
      {
        word: "Scientific",
        tagline:
          "Prompt templates built on this week's peer-reviewed protocols — you choose which researchers to trust.",
      },
      {
        word: "Versatile",
        tagline:
          "Multi-sport mode with multi-race priority across triathlon, marathon, HYROX, and more.",
      },
    ],
    heroHeadlineSuffix: "training planning.",
    painPoints: [
      {
        quote: "I'm always injured after big training weeks",
        feature: "ACWR Injury Scoring",
        description:
          "Real-time acute-to-chronic workload monitoring that auto-adjusts before damage is done.",
      },
      {
        quote: "I don't know if I'm overtraining or undertraining",
        feature: "Training Load Monitoring",
        description:
          "CTL/ATL/TSB curves show fitness, fatigue, and form — so every session is the right intensity.",
      },
      {
        quote: "My plan doesn't adapt when life happens",
        feature: "Adaptive Scheduling",
        description:
          "Missed a session? Plan reshuffles automatically. Key workouts shift, rest days move.",
      },
      {
        quote: "I switch between 5 apps to see my full picture",
        feature: "Unified Dashboard",
        description:
          "Strava, Garmin, Intervals.icu, Apple Health, Zwift — one view, zero manual entry.",
      },
      {
        quote: "Generic plans don't match my actual fitness",
        feature: "AI Consensus Coaching",
        description:
          "Two AI models debate your data independently, then synthesize one personalized plan.",
      },
      {
        quote: "I never know what to eat before a long run",
        feature: "Race-Day Fueling",
        description:
          "Periodized nutrition with carb/sodium targets built from your sweat profile and race distance.",
      },
      {
        quote: "I'm guessing my race pace from a calculator",
        feature: "Race Predictions",
        description:
          "AI-powered predictions based on your actual training data, not a generic formula.",
      },
      {
        quote: "My coach can't see my Garmin and Strava data together",
        feature: "Portable AI Prompts",
        description:
          "Structured prompts you run in ChatGPT, Claude, or Gemini — your favorite AI becomes your coach.",
      },
      {
        quote: "I don't know when to taper for my race",
        feature: "Periodization Engine",
        description:
          "Auto-calculated taper timing so TSB peaks on race day, not two weeks early.",
      },
      {
        quote: "Blood tests come back but I don't know what to do with them",
        feature: "Blood Panel Tracking",
        description:
          "Track ferritin, vitamin D, and more over time. See trends that matter for endurance.",
      },
    ],
    comparison: [
      {
        label: "Plan Adaptation",
        traditional:
          "Rigid plan that ignores your daily fatigue, schedule changes, and how you actually feel",
        atp: "Refine any workout mid-week. Ask follow-up questions. Your plan reshapes around your life.",
      },
      {
        label: "Data Breadth",
        traditional:
          "Trapped in one ecosystem — training with only a fraction of the picture",
        atp: "Strava, Garmin, Apple Health, blood work, sleep, HRV — your complete athlete profile, unified",
      },
      {
        label: "Research Freshness",
        traditional: "Algorithms based on research that was already old at launch",
        atp: "Prompt templates built on this week's peer-reviewed protocols — you choose which researchers to trust",
      },
      {
        label: "Data Currency",
        traditional: "Dated metrics, often hours or days behind your actual state",
        atp: "Real-time sync just in time for your next session — always current, never stale",
      },
      {
        label: "Multi-Sport + Multi-Race",
        traditional: "Single-sport optimization, one race goal at a time",
        atp: "Multi-sport mode with multi-race priority across triathlon, marathon, HYROX, and more",
      },
    ],
    howItWorks: [
      {
        category: "Gather",
        step: 1,
        title: "Connect your data",
        description: "Strava, Garmin, Apple Health, blood work, and more",
      },
      {
        category: "Intelligence",
        step: 2,
        title: "AI builds your plan",
        description: "Data compressed into a prompt, run against your chosen AI engine",
      },
      {
        category: "Intelligence",
        step: 3,
        title: "Deliberate & refine",
        description: "Multiple AIs cross-check, you ask follow-ups",
        tag: "Optional",
      },
      {
        category: "Adapt",
        step: 4,
        title: "Train with confidence",
        description: "Sessions adapt as life happens",
      },
      {
        category: "Adapt",
        step: 5,
        title: "Loop & evolve",
        description: "Recovery data feeds back in, next week's plan gets smarter",
      },
    ],
    testimonial: {
      quote:
        "I built AiTrainingPlan because I was tired of switching between five apps and still guessing if my training load was right. Two AI models debating my plan is better than one — and infinitely better than none.",
      name: "Thomas Prommer",
      title: "Ironman & ultra runner. Software architect. 15+ years in endurance sports.",
    },
    finalCta: {
      heading: "Ready to Train Smarter?",
      subhead: "Two AI coaches. Five data sources. One plan that adapts to your life.",
    },
  },
  featureCategories: [
    {
      id: "training",
      label: "Training",
      description:
        "Plan, monitor, and optimize your training with science-backed load management and adaptive scheduling.",
      features: [
        {
          name: "Race Countdown Timer",
          status: "Live",
          description:
            "Visual countdown to your next A-race with training phase indicators. Always know exactly where you are in your preparation.",
          bullets: [
            "Days/weeks until race day",
            "Current training phase display",
            "Multi-race timeline support",
          ],
          faqs: [
            {
              question: "How many weeks do I actually have left before my marathon?",
              answer:
                "The Race Countdown shows the exact days and weeks remaining until your A-race, plus which training phase you're in — so you always know if you're on track or need to adjust.",
            },
            {
              question:
                "I have three races this season — how do I keep track of all of them?",
              answer:
                "The multi-race timeline shows all your upcoming events with their priority levels, so you can see how your training blocks line up across the full season.",
            },
            {
              question: "Am I still in base phase or should I be doing more intensity by now?",
              answer:
                "The countdown displays your current training phase alongside the race date. You'll see exactly when base transitions to build, and build to peak.",
            },
          ],
        },
        {
          name: "Training Load Monitoring",
          status: "Live",
          description:
            "Real-time CTL/ATL/TSB curves with ACWR injury risk scoring. See your fitness, fatigue, and form at a glance.",
          bullets: [
            "CTL/ATL/TSB training load curves",
            "ACWR injury risk alerts",
            "Personalized threshold baselines",
            "Historical trend analysis",
          ],
          faqs: [
            {
              question: "Am I at risk of getting injured with my current training load?",
              answer:
                "The ACWR injury risk score compares your acute and chronic load. When the ratio spikes above safe thresholds, you'll get an alert before overuse injuries develop.",
            },
            {
              question: "I feel flat — is it fatigue or have I lost fitness?",
              answer:
                "Check your TSB (Training Stress Balance). A negative TSB means you're carrying fatigue — your fitness (CTL) is likely still there, just masked by accumulated load.",
            },
            {
              question: "How do I know if my training block is actually making me fitter?",
              answer:
                "Watch your CTL trend over weeks. A steadily rising CTL means your chronic training load is increasing — that's fitness building. The historical trend view makes this easy to spot.",
            },
            {
              question: "When should I start tapering for my race?",
              answer:
                "Your TSB curve shows when fatigue drops and form rises. The monitoring helps you time your taper so that TSB peaks on race day.",
            },
          ],
        },
        {
          name: "Training Load Trio",
          status: "Live",
          description:
            "Intervals.icu-integrated training load view combining swim, bike, and run stress scores into a unified dashboard.",
          bullets: [
            "Sport-specific TSS breakdown",
            "Intervals.icu data integration",
            "Weekly load distribution",
          ],
          faqs: [
            {
              question:
                "I'm a triathlete — how do I see which sport is getting too much or too little volume?",
              answer:
                "The Training Load Trio breaks down your stress score by swim, bike, and run. You can spot imbalances at a glance and adjust before one discipline dominates.",
            },
            {
              question: "How does my Intervals.icu data show up here?",
              answer:
                "Your Intervals.icu account syncs automatically, pulling in sport-specific TSS data so everything appears in one unified dashboard without manual entry.",
            },
            {
              question: "Am I spreading my training load evenly across the week?",
              answer:
                "The weekly distribution view shows how your load is spread day by day, so you can avoid cramming all your hard sessions into a few days.",
            },
          ],
        },
        {
          name: "Mechanical Load Tracking",
          status: "Live",
          description:
            "Monitor the mechanical stress on your body from high-impact activities like running to prevent overuse injuries.",
          bullets: [
            "Impact load quantification",
            "Running stress tracking",
            "Overuse injury prevention",
          ],
          faqs: [
            {
              question: "I keep getting shin splints — how do I know if I'm running too much?",
              answer:
                "Mechanical Load Tracking quantifies the impact stress from running separately from cardiovascular load. If your mechanical load spikes faster than your body can adapt, you'll see the warning.",
            },
            {
              question: "Can I swap some running volume for cycling to reduce injury risk?",
              answer:
                "Yes — the tracker shows that cycling adds cardiovascular load without mechanical impact. You can maintain fitness while letting your legs recover from running stress.",
            },
            {
              question: "How quickly can I ramp up my running mileage safely?",
              answer:
                "The mechanical load trend shows your body's accumulated impact stress. Stay within safe ramp rates and the tracker will flag when you're increasing too fast.",
            },
          ],
        },
        {
          name: "Weekly TSS Overview",
          status: "Live",
          description:
            "Weekly training stress score breakdown by sport and session type. Plan your week with precision.",
          bullets: [
            "Weekly stress distribution",
            "Sport-by-sport breakdown",
            "Target vs actual comparison",
          ],
          faqs: [
            {
              question: "How do I make sure I don't overtrain each week?",
              answer:
                "The Weekly TSS Overview shows your training stress score broken down by sport and session type. When your weekly load exceeds your target range, you'll see it immediately — so you can dial back before fatigue accumulates.",
            },
            {
              question: "Am I hitting my planned training volume this week?",
              answer:
                "The target vs actual comparison shows exactly where you stand against your weekly plan. Green means on track, and you can see which sports are under or over.",
            },
            {
              question: "I missed two days — should I try to make up the volume?",
              answer:
                "Check your actual vs target TSS. If you're only slightly behind, your AI coach can redistribute the remaining load safely. If the gap is large, it's better to accept the lower week.",
            },
          ],
        },
        {
          name: "Sports Mode Selector",
          status: "Live",
          description:
            "Switch between sport-specific views and training contexts. Each sport gets its own metrics, zones, and race types.",
          bullets: [
            "Per-sport training zones",
            "Sport-specific race types",
            "Seamless context switching",
          ],
          faqs: [
            {
              question:
                "My running zones and cycling zones are totally different — can the app handle both?",
              answer:
                "Each sport mode has its own training zones, so your running heart rate zones are independent from your cycling power zones. Switch between them and the entire dashboard adjusts.",
            },
            {
              question: "I do HYROX and running — do I need two separate accounts?",
              answer:
                "No. The Sports Mode Selector lets you switch contexts within one account. Your HYROX training data, race types, and metrics are separate from your running view.",
            },
          ],
        },
        {
          name: "Goals & Focus Manager",
          status: "Live",
          description:
            "Set training goals and daily focus areas. Your AI coaches use these to prioritize what matters most in your plan.",
          bullets: [
            "Race goals with priority levels",
            "Daily focus banners",
            "Goal-driven plan adjustments",
          ],
          faqs: [
            {
              question: "How do I tell the AI what I'm actually training for?",
              answer:
                "Set your race goals with target times and priority levels in the Goals Manager. Your AI coaches use these to structure every training block around what matters most to you.",
            },
            {
              question:
                "I want to focus on my run off the bike this month — can the plan reflect that?",
              answer:
                "Set a daily focus area and your AI coaches will weight run-specific sessions higher in your plan. The focus banner reminds you of your current priority every day.",
            },
            {
              question: "What if my goals change mid-season?",
              answer:
                "Update your goals anytime. The AI coaches recalculate your plan based on the new priorities, adjusting training blocks and intensity distribution automatically.",
            },
          ],
        },
        {
          name: "Today's Workout",
          status: "Live",
          description:
            "Your next prescribed session with full details — duration, intensity, intervals, and coaching notes.",
          bullets: [
            "Session details and structure",
            "Intensity targets and zones",
            "AI coaching notes",
          ],
          faqs: [
            {
              question: "What exactly am I supposed to do in today's session?",
              answer:
                "Today's Workout gives you the full breakdown — duration, warm-up, main set intervals with target zones, and cool-down. No guesswork.",
            },
            {
              question: "Why is the AI prescribing this particular workout today?",
              answer:
                "The coaching notes explain the reasoning — whether it's building aerobic base, sharpening speed, or allowing active recovery based on your recent load and upcoming race.",
            },
            {
              question: "I only have 45 minutes instead of the planned 90 — what should I do?",
              answer:
                "Ask your AI coach via chat to adapt today's session for the available time. It will preserve the key stimulus while fitting within your schedule.",
            },
          ],
        },
        {
          name: "Upcoming Workouts",
          status: "Live",
          description:
            "See your training schedule for the coming days and weeks. Sessions auto-adjust based on recovery and life events.",
          bullets: [
            "Multi-day schedule view",
            "Adaptive rescheduling",
            "Workout type indicators",
          ],
          faqs: [
            {
              question: "I have a busy work week — will my plan adjust?",
              answer:
                "Flag the days you can't train and the upcoming schedule reshuffles automatically. Key sessions get moved to available days rather than being lost.",
            },
            {
              question: "How far ahead can I see my training plan?",
              answer:
                "The schedule view shows your full upcoming week plus a preview of the following weeks, so you can plan around life commitments.",
            },
            {
              question: "What if I feel too tired to do tomorrow's hard session?",
              answer:
                "The plan adapts to recovery signals. If your load data shows you need more rest, sessions get rescheduled — or you can manually swap days.",
            },
          ],
        },
        {
          name: "Recent Workouts",
          status: "Live",
          description:
            "Review completed sessions with performance analysis. Compare planned vs actual effort and track consistency.",
          bullets: [
            "Planned vs actual comparison",
            "Performance trend tracking",
            "Session compliance scoring",
          ],
          faqs: [
            {
              question: "Did I hit the targets in my last workout?",
              answer:
                "The planned vs actual comparison shows exactly how your effort matched the prescription — duration, intensity, and intervals side by side.",
            },
            {
              question: "Am I being consistent enough with my training?",
              answer:
                "The compliance score tracks how well you follow the plan over time. You'll see your consistency trend and identify patterns in missed or modified sessions.",
            },
            {
              question: "I went harder than prescribed — is that a problem?",
              answer:
                "Recent Workouts flags when actual effort exceeds the plan. Occasional overperformance is fine, but a pattern of going too hard disrupts the training stimulus your coach intended.",
            },
          ],
        },
      ],
    },
    {
      id: "ai-coach",
      label: "AI Coach",
      description:
        "Two independent AI models analyze your data and synthesize a consensus training plan.",
      features: [
        {
          name: "AI Chat",
          status: "Live",
          description:
            "Chat directly with your AI coach about training questions, plan adjustments, or performance analysis.",
          bullets: [
            "Natural language coaching",
            "Context-aware responses",
            "Training data integration",
            "Real-time plan adjustments",
          ],
          faqs: [
            {
              question: "Can I just ask my coach why today's workout is an easy run?",
              answer:
                "Yes — type your question in natural language and the AI explains its reasoning using your actual training data, fatigue levels, and upcoming race timeline.",
            },
            {
              question: "I tweaked my calf on yesterday's run — what should I change?",
              answer:
                "Tell the AI chat about the issue. It will review your upcoming schedule and suggest modifications — reducing run volume, swapping in cross-training, or adding rest days.",
            },
            {
              question: "How do I get a second opinion on my training plan?",
              answer:
                "Two independent AI models analyze your data separately and then synthesize a consensus. You can ask either coach directly and compare their perspectives.",
            },
            {
              question: "Can the AI adjust my plan right now if I ask?",
              answer:
                "Yes. Request changes in the chat and the AI applies them in real time — rescheduling sessions, adjusting intensity, or restructuring your week based on the conversation.",
            },
          ],
        },
        {
          name: "AI Prompt Editor",
          status: "Live",
          description:
            "Customize how your AI coaches analyze data and generate plans. Fine-tune the coaching personality and priorities.",
          bullets: [
            "Master prompt customization",
            "Coaching style preferences",
            "Priority rule configuration",
          ],
          faqs: [
            {
              question:
                "I want my AI coach to be more conservative with intensity — can I change that?",
              answer:
                "The Prompt Editor lets you set coaching style preferences. Tell it to prioritize volume over intensity, and all future plans will reflect that conservative approach.",
            },
            {
              question: "How do I make the AI understand that I hate swimming?",
              answer:
                "Add priority rules like 'minimize swim volume' or 'never schedule swim on consecutive days.' The AI coaches will respect these constraints in every plan they generate.",
            },
            {
              question: "Can I make the coach focus more on injury prevention?",
              answer:
                "Yes — customize the master prompt to emphasize load management and recovery. The AI will weight these factors more heavily when building your plan.",
            },
          ],
        },
        {
          name: "AI Interactions History",
          status: "Live",
          description:
            "Full history of AI coaching decisions and plan changes. Understand why your plan evolved the way it did.",
          bullets: [
            "Decision audit trail",
            "Plan change history",
            "Reasoning transparency",
          ],
          faqs: [
            {
              question: "Why did my plan suddenly change last Tuesday?",
              answer:
                "The Interactions History shows every AI decision with timestamps and reasoning. You can trace exactly what triggered the change — a missed session, new data, or a goal update.",
            },
            {
              question: "I don't trust black-box coaching — can I see the reasoning?",
              answer:
                "Every plan change comes with a full explanation of why the AI made that decision. The audit trail gives you complete transparency into the coaching logic.",
            },
            {
              question: "How has my training plan evolved over the last month?",
              answer:
                "The plan change history shows a timeline of all modifications, so you can see how your training progressed and what factors drove each adjustment.",
            },
          ],
        },
        {
          name: "Context Manager",
          status: "Live",
          description:
            "Control what data and context your AI coaches can access. Manage the information that shapes your training plan.",
          bullets: [
            "Data source management",
            "Context window control",
            "Privacy-first design",
          ],
          faqs: [
            {
              question: "What data is the AI actually using to build my plan?",
              answer:
                "The Context Manager shows exactly which data sources feed into your AI coaches — training history, health metrics, goals, and preferences. Nothing hidden.",
            },
            {
              question: "I don't want the AI to see my weight data — can I exclude it?",
              answer:
                "Toggle any data source on or off. If you remove body measurements from the context, the AI coaches won't factor weight into their decisions.",
            },
            {
              question: "Can I give the AI more background about my training history?",
              answer:
                "Add context like past injuries, race experience, or training philosophy. The more relevant context you provide, the better the AI coaches understand your needs.",
            },
          ],
        },
      ],
    },
    {
      id: "nutrition",
      label: "Nutrition",
      description:
        "Fuel your performance with periodized nutrition, meal planning, and hydration tracking.",
      features: [
        {
          name: "Daily Nutrition Tracking",
          status: "Live",
          description:
            "Track macros and calories with training-day periodization. Fuel differently on hard days vs rest days.",
          bullets: [
            "Macro tracking (protein, carbs, fat)",
            "Training-day periodization",
            "Daily calorie targets",
          ],
          faqs: [
            {
              question: "Should I eat the same on rest days as on hard training days?",
              answer:
                "No — Daily Nutrition adjusts your calorie and macro targets based on your training schedule. Hard days get more carbs, rest days shift toward protein and lower calories.",
            },
            {
              question: "Am I eating enough protein to support my training?",
              answer:
                "The macro tracker shows your daily protein intake against your target. If you're consistently under, you'll spot the pattern and can adjust your meals.",
            },
            {
              question: "I feel bonked on long rides — am I fueling wrong?",
              answer:
                "Check your carb intake on training days. The periodization view will show if you're underfueling before high-volume sessions, which is the most common cause of bonking.",
            },
          ],
        },
        {
          name: "Meal Planning",
          status: "Live",
          description:
            "Plan meals around your training schedule. Database of meals with macro breakdowns and scheduling tools.",
          bullets: [
            "Meal database with macros",
            "Schedule-aware meal planning",
            "Favorite meals and templates",
          ],
          faqs: [
            {
              question: "What should I eat before my 6am long run?",
              answer:
                "The meal planner knows your training schedule and suggests pre-workout meals with the right carb-to-fat ratio and timing for early morning sessions.",
            },
            {
              question: "I eat the same five meals — can I just template them?",
              answer:
                "Save your go-to meals as favorites with their macro breakdowns. Drop them into any day with one tap instead of logging from scratch.",
            },
            {
              question: "How do I plan meals that actually hit my macro targets?",
              answer:
                "The meal database shows the macro breakdown for each meal. Plan your day and watch the totals update in real time against your targets.",
            },
          ],
        },
        {
          name: "TDEE Dashboard",
          status: "Live",
          description:
            "Total Daily Energy Expenditure calculated from your actual training data. Know exactly how much fuel you need.",
          bullets: [
            "Training-adjusted TDEE",
            "BMR and activity factor",
            "Surplus/deficit tracking",
          ],
          faqs: [
            {
              question: "How many calories do I actually burn on a training day?",
              answer:
                "The TDEE Dashboard calculates your total daily expenditure from your actual workout data — not generic estimates. You'll see your BMR plus the real calorie cost of each session.",
            },
            {
              question: "I'm trying to lose weight while training — how big a deficit is safe?",
              answer:
                "The surplus/deficit tracker shows your daily energy balance. You can dial in a moderate deficit without compromising recovery or training quality.",
            },
            {
              question: "Why do online calorie calculators feel so inaccurate for me?",
              answer:
                "Generic calculators guess your activity level. TDEE Dashboard uses your actual training data — real duration, intensity, and sport — for a personalized number that updates daily.",
            },
          ],
        },
        {
          name: "Hydration & Sweat Tracking",
          status: "Live",
          description:
            "Track fluid intake and sweat losses. Build your personal sweat profile for race-day hydration strategy.",
          bullets: [
            "Daily fluid intake logging",
            "Sweat rate profiling",
            "Race-day hydration planning",
          ],
          faqs: [
            {
              question: "How much should I drink during a marathon?",
              answer:
                "Build your personal sweat profile from training data — weigh yourself before and after runs in different conditions. The app calculates your sweat rate and gives a race-day hydration plan.",
            },
            {
              question: "I keep cramping in hot races — is it a hydration issue?",
              answer:
                "Track your sweat losses and fluid intake across training sessions. The sweat profile shows if you're consistently under-replacing fluids, especially in heat.",
            },
            {
              question: "Am I drinking enough water day to day?",
              answer:
                "The daily fluid intake log tracks your consumption against training-adjusted targets. Heavy training days need more — the tracker accounts for this.",
            },
          ],
        },
      ],
    },
    {
      id: "health",
      label: "Health",
      description:
        "Monitor your body holistically — from blood markers to injury risk to body composition.",
      features: [
        {
          name: "Injury Management",
          status: "Live",
          description:
            "Track active injuries, rehab progress, and injury history. Your AI coach adjusts training around injuries automatically.",
          bullets: [
            "Active injury tracking",
            "Rehab exercise logging",
            "Auto-adjusted training plans",
            "Injury history timeline",
          ],
          faqs: [
            {
              question: "I strained my hamstring — do I have to rebuild my entire plan manually?",
              answer:
                "Log the injury and your AI coach automatically adjusts your training plan — reducing run load, substituting cross-training, and protecting the injured area while maintaining fitness.",
            },
            {
              question: "How do I track my physio exercises alongside my training?",
              answer:
                "Log rehab exercises in the Injury Management section. They appear in your training timeline so the AI coach accounts for the additional load.",
            },
            {
              question: "I keep injuring the same knee — is there a pattern?",
              answer:
                "The injury history timeline shows all past injuries with dates and training context. You might spot that knee issues follow high-mileage weeks or specific workouts.",
            },
            {
              question: "When is it safe to return to full training after an injury?",
              answer:
                "Track your rehab progress and the AI coach will gradually reintroduce load. It won't jump you back to pre-injury volume — the ramp-up is controlled and monitored.",
            },
          ],
        },
        {
          name: "Blood Test Tracking",
          status: "Live",
          description:
            "Log blood test results and track biomarkers over time. Spot trends in iron, vitamin D, testosterone, and more.",
          bullets: [
            "Biomarker trend charts",
            "Reference range indicators",
            "Multi-panel support",
          ],
          faqs: [
            {
              question: "My iron levels have been dropping — can I see the trend?",
              answer:
                "Log each blood test and the trend chart shows your ferritin, hemoglobin, and other iron markers over time. You'll spot a downward trend before it becomes clinical.",
            },
            {
              question: "Are my blood values in the normal range for an endurance athlete?",
              answer:
                "Reference range indicators show where your results fall. Note that athlete-optimal ranges often differ from standard lab references — the app accounts for this.",
            },
            {
              question:
                "I get blood work done every three months — where do I put all the results?",
              answer:
                "Log results from multiple panels and labs. Each biomarker gets its own trend line, so you build a longitudinal health picture over months and years.",
            },
          ],
        },
        {
          name: "Blood Pressure Monitoring",
          status: "Live",
          description:
            "Track systolic and diastolic blood pressure over time. Correlate with training load and recovery.",
          bullets: [
            "Systolic/diastolic tracking",
            "Trend visualization",
            "Training load correlation",
          ],
          faqs: [
            {
              question:
                "My blood pressure seems higher during heavy training blocks — is that normal?",
              answer:
                "Track your readings and correlate them with training load. The trend visualization shows if your BP rises with high-volume weeks, which can indicate overreaching.",
            },
            {
              question: "My doctor wants me to log my blood pressure daily — where do I put it?",
              answer:
                "Log readings directly in the app. You'll get a trend chart you can share with your doctor, alongside your training context for a complete picture.",
            },
          ],
        },
        {
          name: "Supplement Tracking",
          status: "Live",
          description:
            "Log supplements, dosages, and timing. Track what you take and correlate with performance and health markers.",
          bullets: [
            "Supplement inventory",
            "Dosage and timing logs",
            "Health marker correlation",
          ],
          faqs: [
            {
              question:
                "I take iron, vitamin D, and magnesium — how do I track if they're actually working?",
              answer:
                "Log your supplements with dosages and cross-reference with your blood test trends. You'll see if your ferritin and vitamin D levels respond to supplementation over time.",
            },
            {
              question: "I keep forgetting what I'm taking and why — can I keep it all in one place?",
              answer:
                "The supplement inventory lists everything you take with dosages, timing, and purpose. One view of your full stack.",
            },
            {
              question: "Should I adjust my supplements during race week?",
              answer:
                "Review your supplement log alongside your training phases. Some athletes taper caffeine before race day or increase sodium loading — tracking helps you plan.",
            },
          ],
        },
        {
          name: "Body Measurements",
          status: "Live",
          description:
            "Track weight, body fat, muscle mass, and other measurements. Monitor body composition changes over training cycles.",
          bullets: [
            "Weight and body fat trends",
            "Measurement history",
            "Training cycle correlation",
          ],
          faqs: [
            {
              question: "Am I losing muscle while marathon training?",
              answer:
                "Track body fat percentage and muscle mass alongside your training. If muscle mass drops during high-mileage blocks, you can adjust your strength work and protein intake.",
            },
            {
              question: "My weight fluctuates a lot — how do I see the real trend?",
              answer:
                "The trend view smooths out daily fluctuations from water and glycogen. Focus on the multi-week trend line, not individual weigh-ins.",
            },
            {
              question: "How does my body composition change across a training season?",
              answer:
                "The measurement history plots your body composition over training cycles. You'll see how base building, peak training, and taper affect your body differently.",
            },
          ],
        },
        {
          name: "Research Articles",
          status: "Live",
          description:
            "Curated sports science research relevant to your training. Evidence-based insights to inform your approach.",
          bullets: [
            "Curated research library",
            "Training-relevant findings",
            "Evidence-based recommendations",
          ],
          faqs: [
            {
              question: "Is polarized training really better than threshold training?",
              answer:
                "The research library includes studies comparing training intensity distributions. Read the evidence and see which approach matches your goals and available training time.",
            },
            {
              question: "I want to make evidence-based decisions — where do I start?",
              answer:
                "Browse curated articles organized by topic: nutrition, recovery, periodization, strength for endurance. Each article includes practical takeaways you can apply immediately.",
            },
          ],
        },
      ],
    },
    {
      id: "performance",
      label: "Performance",
      description:
        "Track your fitness progression with race predictions, lab tests, and strength benchmarks.",
      features: [
        {
          name: "Race Prediction & Planning",
          status: "Live",
          description:
            "AI-powered race time predictions based on your actual fitness data. Plan your race strategy with confidence.",
          bullets: [
            "Data-driven time predictions",
            "Race strategy planning",
            "Pacing recommendations",
            "Multi-distance support",
          ],
          faqs: [
            {
              question: "What marathon time can I realistically target based on my current fitness?",
              answer:
                "Race Prediction uses your actual CTL, recent workouts, and training history — not just a VDOT calculator. The prediction updates as your fitness changes through the season.",
            },
            {
              question: "Should I go out at 4:30/km or 4:45/km pace?",
              answer:
                "The pacing recommendations account for your fitness level, the course profile, and conditions. You'll get a realistic pace strategy rather than an optimistic guess.",
            },
            {
              question: "How much faster could I be if I train for three more months?",
              answer:
                "The prediction model projects your future fitness based on planned training. You can compare a race now vs later to decide if it's worth waiting for a bigger block.",
            },
            {
              question: "I raced a 10K last week — does that update my marathon prediction?",
              answer:
                "Yes. Recent race results feed back into the model. A strong 10K performance will adjust your predicted marathon time upward.",
            },
          ],
        },
        {
          name: "FTP Tests",
          status: "Live",
          description:
            "Track Functional Threshold Power tests for cycling and running. Set environment-specific thresholds for indoor, outdoor, and treadmill training.",
          bullets: [
            "FTP history and trends",
            "Test protocol tracking (20-min, ramp, 8-min, 60-min)",
            "Indoor vs outdoor FTP settings",
            "Environment-aware power zones",
            "Running threshold pace tracking",
          ],
          faqs: [
            {
              question: "My indoor FTP is different from outdoor — can I set both?",
              answer:
                "Yes. Set a general FTP that applies everywhere, then add environment-specific overrides for indoor or outdoor. The system automatically uses the right value based on your activity type.",
            },
            {
              question: "My FTP went up — do I need to manually update all my power zones?",
              answer:
                "No. When you activate a new FTP test, your power zones update automatically. All future workouts and TSS calculations use the new threshold.",
            },
            {
              question: "How do I know if my cycling fitness is actually improving?",
              answer:
                "The FTP history chart shows your threshold power over time. Even small gains of 5-10 watts are visible in the trend and meaningful for performance.",
            },
            {
              question: "I run differently on treadmill vs road — can I track both paces?",
              answer:
                "Set a general running FTP pace, then override it for treadmill or outdoor. Your rTSS calculations will use the correct threshold for each session type.",
            },
            {
              question: "Which FTP test protocol should I use?",
              answer:
                "We support 20-minute, 8-minute, ramp test, 30-minute, and 60-minute protocols. Use the same one consistently for reliable comparisons — each has its own conversion factor.",
            },
          ],
        },
        {
          name: "Critical Swim Speed",
          status: "Live",
          description:
            "Track your Critical Swim Speed across stroke types and environments. Set pool-specific and open water thresholds for accurate swim training zones.",
          bullets: [
            "CSS pace calculation from time trials",
            "Per-stroke threshold tracking",
            "Pool vs open water settings",
            "Environment-specific swim zones",
            "sTSS calculation for swim sessions",
          ],
          faqs: [
            {
              question: "What is CSS and why does it matter?",
              answer:
                "Critical Swim Speed is your sustainable pace in the water — similar to FTP for cycling. It's calculated from two time trials and used to set your swim training zones and calculate training stress.",
            },
            {
              question: "My pool pace is faster than open water — can I track both?",
              answer:
                "Yes. Set a general CSS that applies everywhere, then add a pool-specific or open water override. Your swim TSS calculations will use the correct threshold for each session.",
            },
            {
              question: "How do I test my CSS?",
              answer:
                "Swim a 400m and a 200m time trial with full effort. The app calculates your CSS pace from the time difference. You can also enter a single time trial if you prefer.",
            },
            {
              question: "I swim freestyle and breaststroke — can I set different thresholds?",
              answer:
                "Each stroke type gets its own CSS. Set freestyle as your primary threshold, then add breaststroke or other strokes separately. If a stroke doesn't have a CSS, freestyle is used as fallback.",
            },
            {
              question: "How does CSS affect my swim workout targets?",
              answer:
                "Your AI coach uses CSS to set interval paces. Zone 2 might be CSS+10 seconds, while threshold work targets CSS pace exactly. Accurate CSS means accurate training.",
            },
          ],
        },
        {
          name: "Lactate Tests",
          status: "Live",
          description:
            "Log and visualize lactate threshold test results. Track aerobic and anaerobic capacity over training cycles.",
          bullets: [
            "Lactate curve visualization",
            "Threshold progression",
            "Zone boundary tracking",
          ],
          faqs: [
            {
              question: "My coach says my lactate threshold is improving — how do I verify that?",
              answer:
                "Log your test results and the lactate curve visualization shows your threshold shifting to higher speeds or power outputs over time. Data doesn't lie.",
            },
            {
              question: "How do my lactate zones differ from my heart rate zones?",
              answer:
                "Lactate tests define your actual metabolic thresholds. The zone boundary tracking shows where your body switches fuel sources, which is more precise than heart rate alone.",
            },
            {
              question: "I get lactate tested twice a year — is that enough to track progress?",
              answer:
                "Two tests per year show macro trends. Log both and the threshold progression chart reveals whether your aerobic engine is improving across training blocks.",
            },
          ],
        },
        {
          name: "Strength Training",
          status: "Live",
          description:
            "Track gym sessions, exercises, sets, and reps. Monitor strength progression alongside endurance training.",
          bullets: [
            "Exercise library",
            "Set and rep logging",
            "Strength progression charts",
          ],
          faqs: [
            {
              question: "How do I fit strength work into my endurance training without overdoing it?",
              answer:
                "Log your gym sessions and the AI coach sees the total load — endurance plus strength. It balances both so you build strength without compromising recovery for key sessions.",
            },
            {
              question: "Am I getting stronger or just going through the motions?",
              answer:
                "The strength progression charts show your weights and reps over time for each exercise. If the numbers aren't moving up, it's time to adjust your program.",
            },
            {
              question:
                "I do HYROX — can I track functional exercises like sled pushes and wall balls?",
              answer:
                "The exercise library includes functional and sport-specific movements. Log any exercise with sets, reps, weight, or time — including HYROX-specific stations.",
            },
          ],
        },
        {
          name: "Zwift Integration",
          status: "Live",
          description:
            "Sync Zwift events and indoor sessions. Track virtual training alongside outdoor workouts in one unified view.",
          bullets: [
            "Zwift event syncing",
            "Indoor/outdoor unified view",
            "Virtual race tracking",
          ],
          faqs: [
            {
              question: "Do my Zwift rides count toward my training load?",
              answer:
                "Yes — Zwift sessions sync automatically and contribute to your CTL, ATL, and weekly TSS just like outdoor rides. Everything appears in one unified view.",
            },
            {
              question: "I race on Zwift in winter — can I track those results?",
              answer:
                "Virtual race results sync and appear in your race history. You can track your indoor racing performance and see how it correlates with fitness changes.",
            },
            {
              question: "How do I compare my indoor and outdoor training?",
              answer:
                "The unified view shows Zwift sessions alongside outdoor workouts with the same metrics. Compare power, duration, and TSS across both environments.",
            },
          ],
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      description: "Customize your profile, equipment, plan rules, and data integrations.",
      features: [
        {
          name: "Athlete Profile",
          status: "Live",
          description:
            "Your training profile with personal data, training zones, race history, and performance baselines.",
          bullets: [
            "Personal training zones",
            "Race history",
            "Performance baselines",
          ],
          faqs: [
            {
              question: "Where do I set my training zones?",
              answer:
                "Your Athlete Profile stores all your zones — heart rate, power, pace, and RPE. Set them once and every workout in the plan uses the correct targets.",
            },
            {
              question: "I want to see all my race results in one place.",
              answer:
                "Your race history lives in the profile — dates, distances, times, and conditions. It gives the AI coaches context about your racing experience and progression.",
            },
            {
              question: "How does the AI know my current fitness level?",
              answer:
                "Performance baselines in your profile include recent test results, race times, and training metrics. The AI coaches use these as the foundation for plan intensity.",
            },
          ],
        },
        {
          name: "Equipment Tracking",
          status: "Live",
          description:
            "Track gear usage, lifecycle, and maintenance. Know when shoes need replacing or your bike needs a service.",
          bullets: [
            "Gear lifecycle tracking",
            "Usage-based alerts",
            "Equipment inventory",
          ],
          faqs: [
            {
              question: "How do I know when my running shoes need replacing?",
              answer:
                "Equipment Tracking logs kilometers on each pair. When shoes approach their lifecycle limit (typically 500-800km), you'll get an alert before they break down.",
            },
            {
              question: "I have three pairs of cycling shoes — which ones have the most hours?",
              answer:
                "The equipment inventory shows usage stats for all your gear. Compare hours, distance, and sessions across multiple items.",
            },
            {
              question: "When was my last bike service?",
              answer:
                "Log maintenance events against each piece of equipment. The lifecycle tracker reminds you when it's time for a chain replacement, tire change, or full service.",
            },
          ],
        },
        {
          name: "Training Plan Instructions",
          status: "Live",
          description:
            "Set rules and preferences for how your AI coaches build your training plan. Constraints, preferences, and non-negotiables.",
          bullets: [
            "Custom plan rules",
            "Training preferences",
            "Constraint management",
          ],
          faqs: [
            {
              question: "I can never train on Wednesdays — how do I tell the AI?",
              answer:
                "Add a constraint in Plan Instructions: 'No training on Wednesday.' The AI coaches will never schedule sessions on that day.",
            },
            {
              question:
                "I prefer morning workouts and hate double days — can the plan respect that?",
              answer:
                "Set preferences for session timing and frequency limits. The AI builds your plan around these non-negotiables.",
            },
            {
              question: "I want at least two rest days per week, no exceptions.",
              answer:
                "Add it as a constraint. The AI coaches will guarantee two full rest days regardless of training volume, redistributing load across the remaining five days.",
            },
          ],
        },
        {
          name: "Garmin Sync",
          status: "Live",
          description:
            "Automatic sync with Garmin Connect for activities, health metrics, and device data.",
          bullets: [
            "Automatic activity sync",
            "Health metric import",
            "Device data integration",
          ],
          faqs: [
            {
              question: "Do I have to manually upload my workouts after every session?",
              answer:
                "No — Garmin Sync pulls your activities automatically from Garmin Connect. Finish a run, and it appears in your dashboard within minutes.",
            },
            {
              question: "Can the app use my Garmin sleep and HRV data?",
              answer:
                "Yes. Health metrics like sleep quality, resting heart rate, and HRV sync alongside your activities, giving the AI coaches a complete recovery picture.",
            },
            {
              question: "I just got a new Garmin watch — do I need to set up anything?",
              answer:
                "Connect your Garmin account once. Any Garmin device linked to your Garmin Connect will automatically sync data — no per-device setup needed.",
            },
          ],
        },
      ],
    },
  ],
  sports: [
    {
      category: "Running",
      raceTypes: ["5K", "10K", "Half Marathon", "Marathon", "Ultra Marathon", "Trail"],
    },
    {
      category: "Cycling",
      raceTypes: ["Road Race", "Time Trial", "Gran Fondo", "Criterium", "Hill Climb"],
    },
    {
      category: "Triathlon",
      raceTypes: ["Sprint", "Olympic", "Half Ironman (70.3)", "Ironman (140.6)"],
    },
    {
      category: "HYROX",
      raceTypes: ["HYROX Singles", "HYROX Doubles", "HYROX Relay", "HYROX Pro"],
    },
    {
      category: "Spartan Race",
      raceTypes: ["Sprint (5K)", "Super (10K)", "Beast (21K)", "Ultra (50K)", "Trifecta"],
    },
  ],
  racePriorities: [
    {
      tier: "A",
      name: "A Race",
      description:
        "Primary goal race. Full taper, peak performance. Your entire training cycle builds toward this event.",
    },
    {
      tier: "B",
      name: "B Race",
      description:
        "Important race with reduced taper. Good performance expected but not the season peak.",
    },
    {
      tier: "C",
      name: "C Race",
      description: "Training race. Used as a hard workout within a training block. Minimal taper.",
    },
    {
      tier: "D",
      name: "D Race",
      description: "Fun or social event. No performance expectations. Enjoy the experience.",
    },
  ],
  integrations: [
    { name: "Strava", description: "Sync activities and social data from Strava." },
    {
      name: "Garmin Connect",
      description: "Automatic sync of activities, health metrics, and device data.",
    },
    {
      name: "Intervals.icu",
      description: "Advanced training load and performance analytics integration.",
    },
    { name: "Zwift", description: "Indoor training and virtual racing data sync." },
    { name: "Apple Health", description: "Health and activity data from Apple devices." },
  ],
};
