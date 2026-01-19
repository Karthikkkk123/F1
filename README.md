# F1 Mindset Profiler

A fully client-side F1 personality quiz web application that maps your real-life behaviors to F1 driver archetypes.

## 🏎️ Features

- **12 Personality Questions**: Answer questions about how you handle pressure, risk, and teamwork
- **5 F1 Archetypes**: Get matched to one of five driver types (Champion, Quali Specialist, Strategist, Attacker, Defender)
- **Trait Analysis**: See your scores across 5 key traits (Risk Taking, Consistency, Emotion Control, Teamwork, Adaptability)
- **Visual Chart**: Interactive radar chart showing your personality profile
- **100% Client-Side**: No backend, no tracking, completely free
- **Dark F1 Theme**: Premium design with neon red/orange accents

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

Due to PowerShell execution policy restrictions, you may need to run commands in a different way:

**Option 1: Using Command Prompt (cmd.exe)**
```cmd
cd c:\Users\karthikeya.p\Downloads\F1
npm install
npm run dev
```

**Option 2: Using PowerShell with Bypass**
```powershell
cd c:\Users\karthikeya.p\Downloads\F1
powershell -ExecutionPolicy Bypass -Command "npm install"
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

**Option 3: Change PowerShell Execution Policy (Admin Required)**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm install
npm run dev
```

### Running the App

After installation, the development server will start at `http://localhost:3000`

## 📁 Project Structure

```
F1/
├── app/
│   ├── page.tsx              # Home page
│   ├── quiz/
│   │   └── page.tsx          # Quiz page
│   ├── result/
│   │   └── page.tsx          # Result page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── PrimaryButton.tsx     # CTA button component
│   ├── FeatureRow.tsx        # Feature display component
│   ├── ProgressBar.tsx       # Quiz progress indicator
│   ├── QuizOption.tsx        # Quiz answer card
│   └── TraitChart.tsx        # Radar chart component
├── lib/
│   ├── personality-model.ts  # Archetypes & questions
│   └── quiz-engine.ts        # Scoring algorithm
└── package.json
```

## 🎨 Design

- **Dark Theme**: Near-black backgrounds (#0a0a0a)
- **Neon Accents**: F1-inspired red/orange (#ff1e00, #ff4500)
- **Typography**: Inter font for clean, modern look
- **Animations**: Smooth transitions and slide-in effects
- **Mobile-First**: Fully responsive design

## 🧮 How It Works

1. **Answer Questions**: 12 questions about real-life behavior
2. **Trait Calculation**: Each answer adjusts 5 trait scores
3. **Archetype Matching**: Euclidean distance algorithm finds closest match
4. **Result Display**: See your archetype, traits, and insights

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy (automatic configuration)

### Netlify

1. Push code to GitHub
2. Import repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `out`

### Static Export

```bash
npm run build
```

The static files will be in the `out/` directory, ready to deploy anywhere.

## 📝 License

This project is free to use and modify.

## 🏁 Credits

Built with Next.js, React, TypeScript, Tailwind CSS, and Chart.js.
