// Pill/Capsule Icon Component
export const PillIcon = () => (
  <svg 
    width="48" 
    height="48" 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <circle cx="24" cy="24" r="24" fill="url(#gradient)" />
    <path 
      d="M18 30L30 18M18 18C15.79 18 14 19.79 14 22V26C14 28.21 15.79 30 18 30C20.21 30 22 28.21 22 26V22C22 19.79 20.21 18 18 18ZM30 30C32.21 30 34 28.21 34 26V22C34 19.79 32.21 18 30 18C27.79 18 26 19.79 26 22V26C26 28.21 27.79 30 30 30Z" 
      fill="white"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
)
