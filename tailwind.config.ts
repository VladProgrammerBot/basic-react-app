import type { Config } from 'tailwindcss'

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
  plugins: [require('@tailwindcss/typography')],
} satisfies Config