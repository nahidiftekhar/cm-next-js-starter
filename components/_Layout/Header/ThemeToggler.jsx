'use client';
import { useTheme } from 'next-themes';

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className={`w-8 h-4 mx-5 rounded-full bg-slate-600 flex items-center transition duration-300 focus:outline-none shadow`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <div
        id="switch-toggle"
        className={`w-6 h-6 flex items-center justify-center relative rounded-full transition duration-500 transform p-1 text-white ${
          theme === 'dark'
            ? // ? 'bg-gray-700 translate-x-3/4'
              'bg-primary translate-x-3/4'
            : // : ' bg-amber-400 -translate-x-2'
              'bg-secondary -translate-x-2'
        }`}>
        {theme === 'light' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}

        {theme === 'dark' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeToggler;
