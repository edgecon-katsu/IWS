import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./nuxt.config.{js,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        "iws-blue": {
          "primary": "#0066cc",
          "primary-content": "#ffffff",
          "secondary": "#003366", 
          "secondary-content": "#ffffff",
          "accent": "#f97316",
          "neutral": "#374151",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e5e7eb",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        }
      },
      {
        "iws-green": {
          "primary": "#059669",
          "primary-content": "#ffffff",
          "secondary": "#064e3b",
          "secondary-content": "#ffffff",
          "accent": "#f59e0b",
          "neutral": "#374151",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e5e7eb",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        }
      },
      {
        "iws-purple": {
          "primary": "#7c3aed",
          "primary-content": "#ffffff",
          "secondary": "#4c1d95",
          "secondary-content": "#ffffff",
          "accent": "#f97316",
          "neutral": "#374151",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e5e7eb",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        }
      },
      {
        "iws-red": {
          "primary": "#dc2626",
          "primary-content": "#ffffff",
          "secondary": "#7f1d1d",
          "secondary-content": "#ffffff",
          "accent": "#f59e0b",
          "neutral": "#374151",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e5e7eb",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        }
      },
      {
        "iws-dark": {
          "primary": "#3b82f6",
          "primary-content": "#ffffff",
          "secondary": "#1e40af",
          "secondary-content": "#ffffff",
          "accent": "#f59e0b",
          "neutral": "#1f2937",
          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-300": "#374151",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        }
      }
    ],
  },
}