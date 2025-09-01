export const designSystem = {
    colors: {
      primary: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
      accent: {
        yellow: "#facc15", 
        lime: "#84cc16", 
        purple: "#a855f7",
        blue: "#3b82f6",
        lavender: "#e0e7ff",
      },
    
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
    },
  
    spacing: {
      xs: "0.5rem", 
      sm: "0.75rem",
      md: "1rem", 
      lg: "1.5rem", 
      xl: "2rem", 
      "2xl": "3rem", 
    },
  
    borderRadius: {
      sm: "0.75rem", 
      md: "1rem", 
      lg: "1.5rem", 
      xl: "2rem", 
      "2xl": "2.5rem", 
    },
  
    shadows: {
      card: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      cardHover: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1)",
      form: "0 0 0 1px rgb(0 0 0 / 0.05), 0 1px 3px 0 rgb(0 0 0 / 0.1)",
      accent: "0 8px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    },
  
    typography: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
      },
    },
  } as const
  
  export const componentStyles = {
    card: {
      base: "bg-white rounded-2xl shadow-card border border-slate-200/60 overflow-hidden",
      hover: "hover:shadow-cardHover transition-all duration-300",
      padding: "p-8",
      accent: "bg-gradient-to-br from-yellow-50 to-lime-50 border-yellow-200/40",
    },
  
    input: {
      base: "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200/50 transition-all duration-200",
      error: "border-red-300 focus:border-red-400 focus:ring-red-200/50",
    },
  
    button: {
      primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-300 shadow-lg hover:shadow-xl",
      accent:
        "bg-yellow-400 text-slate-900 hover:bg-yellow-500 focus:ring-yellow-300 shadow-lg hover:shadow-xl font-semibold",
      secondary:
        "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-200 shadow-sm hover:shadow-md",
      base: "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    },
  
    tab: {
      container: "flex space-x-2 rounded-2xl bg-slate-100/80 p-2",
      button:
        "flex-1 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2",
      active: "bg-white text-slate-900 shadow-md",
      inactive: "text-slate-600 hover:text-slate-900 hover:bg-white/60",
    },
  
    header: {
      title: "text-2xl font-bold text-slate-900 mb-2",
      subtitle: "text-slate-600 text-sm",
      accent: "bg-gradient-to-r from-yellow-400 to-lime-400 bg-clip-text text-transparent",
    },
  } as const