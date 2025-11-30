export const themeClasses = {
  // Backgrounds
  bgPrimary: "bg-white dark:bg-gray-900",
  bgSecondary: "bg-gray-50 dark:bg-gray-800",
  bgTertiary: "bg-gray-100 dark:bg-gray-700",
  
  // Text colors
  textPrimary: "text-gray-900 dark:text-gray-100",
  textSecondary: "text-gray-600 dark:text-gray-400",
  textTertiary: "text-gray-500 dark:text-gray-500",
  
  // Borders
  borderLight: "border-gray-200 dark:border-gray-700",
  borderMedium: "border-gray-300 dark:border-gray-600",
  
  // Cards
  card: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200",
  cardHover: "hover:shadow-md dark:hover:shadow-lg transition-shadow duration-200",
  
  // Inputs
  input: "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none",
  
  // Buttons
  buttonPrimary: "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-semibold shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500",
  buttonSecondary: "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-4 py-2.5 rounded-lg font-semibold shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500",
  buttonDanger: "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-4 py-2.5 rounded-lg font-semibold shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500",
};

export const getContrastText = (isDarkMode) => {
  return isDarkMode ? "text-gray-100" : "text-gray-900";
};

export const getContrastBg = (isDarkMode) => {
  return isDarkMode ? "bg-gray-900" : "bg-white";
};
