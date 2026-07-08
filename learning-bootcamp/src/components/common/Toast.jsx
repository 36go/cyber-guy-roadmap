import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

const typeConfig = {
  success: { icon: Check, bg: 'border-success/30 bg-success/10', text: 'text-success' },
  error: { icon: X, bg: 'border-danger/30 bg-danger/10', text: 'text-danger' },
  info: { icon: Info, bg: 'border-accent/30 bg-accent/10', text: 'text-accent' },
  warning: { icon: AlertTriangle, bg: 'border-warning/30 bg-warning/10', text: 'text-warning' },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 w-full max-w-sm px-4">
        <AnimatePresence>
          {toasts.map((toast) => {
            const config = typeConfig[toast.type] || typeConfig.info;
            const Icon = config.icon;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl shadow-black/20
                  ${config.bg}
                  backdrop-blur-md
                `.trim()}
              >
                <Icon size={18} className={`shrink-0 ${config.text}`} />
                <p className="flex-1 text-sm text-light-text">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="p-0.5 rounded text-muted-text hover:text-light-text transition-colors"
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
