import type { Config } from 'tailwindcss'
import tailwind from "@tailwindcss/typography"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Тут ми додаємо свої стилі, не видаляючи стандартні
    },
  },
  plugins: [tailwind],
} satisfies Config