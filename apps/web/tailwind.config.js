/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  safelist: [
    // Button base/variants do @edu/ui
    'rounded-2xl','px-4','py-2','font-semibold','focus:outline-none','focus:ring-2','focus:ring-offset-2',
    'bg-blue-600','text-white','hover:bg-blue-700','focus:ring-blue-600',
    'bg-transparent','text-blue-700','hover:bg-blue-50',
    'border','border-blue-600','text-blue-600',
    // Card
    'bg-white','shadow'
  ],
  theme: { extend: {} },
  plugins: []
}
