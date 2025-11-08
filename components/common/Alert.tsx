
import React from 'react';
import { AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

interface AlertProps {
  type: 'error' | 'warning' | 'success';
  message: string;
  onRetry?: () => void;
}

const alertStyles = {
  error: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    border: 'border-red-400 dark:border-red-600',
    text: 'text-red-700 dark:text-red-300',
    icon: <XCircle className="h-6 w-6" />,
  },
  warning: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    border: 'border-yellow-400 dark:border-yellow-600',
    text: 'text-yellow-700 dark:text-yellow-300',
    icon: <AlertTriangle className="h-6 w-6" />,
  },
  success: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    border: 'border-green-400 dark:border-green-600',
    text: 'text-green-700 dark:text-green-300',
    icon: <CheckCircle className="h-6 w-6" />,
  },
};

const Alert: React.FC<AlertProps> = ({ type, message, onRetry }) => {
  const styles = alertStyles[type];

  return (
    <div className={`border-l-4 p-4 rounded-md shadow-sm my-4 ${styles.bg} ${styles.border}`} role="alert">
      <div className={`flex items-center ${styles.text}`}>
        <div className="flex-shrink-0">{styles.icon}</div>
        <div className="ml-3">
          <p className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
          <p className="text-sm">{message}</p>
          {type === 'error' && onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm font-medium underline hover:no-underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
