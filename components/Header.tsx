
import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { Sun, Moon, Menu, X, Stethoscope, CalendarDays, LayoutDashboard } from 'lucide-react';
import { AppointmentContext } from '../contexts/AppointmentContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { appointments } = useContext(AppointmentContext);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', text: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/doctors', text: 'Find a Doctor', icon: <Stethoscope className="w-5 h-5" /> },
    { to: '/appointments', text: 'My Appointments', icon: <CalendarDays className="w-5 h-5" />, badge: appointments.length },
  ];

  const linkClasses = "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClasses = "bg-primary-500 text-white";
  const inactiveLinkClasses = "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700";

  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 text-primary-600 dark:text-primary-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2.5a2.5 2.5 0 0 0-5 0v.518a2 2 0 0 1-1.353 1.838l-2.029.922a1 1 0 0 0-.615.922v5.006a2 2 0 0 0 1.054 1.777l2.872 1.436a2 2 0 0 0 1.946 0l2.872-1.436a2 2 0 0 0 1.054-1.777V7.7a1 1 0 0 0-.615-.922l-2.029-.922A2 2 0 0 1 15 3.018V2.5Z"/><path d="m9.5 2.5 1 1"/><path d="m14.5 2.5-1 1"/><path d="M12 21.5V17"/><path d="M12 8v5"/><path d="M10 10h4"/></svg>
              <span className="font-bold text-xl">MediBook</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                >
                  {link.icon}
                  <span>{link.text}</span>
                  {link.badge > 0 && (
                    <span className="ml-1 bg-primary-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `block ${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
              >
                {link.icon}
                <span>{link.text}</span>
                {link.badge > 0 && (
                    <span className="ml-2 bg-primary-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
