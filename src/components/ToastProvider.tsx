import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from './Toast';

interface ToastContextType {
    showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<{ id: number; message: string; duration?: number }[]>([]);

    const showToast = (message: string, duration?: number) => {
        const id = Date.now();
        setToasts([...toasts, { id, message, duration }]);
        setTimeout(() => setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id)), duration || 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 space-y-2">
                {toasts.map((toast) => (
                    <Toast key={toast.id} message={toast.message} duration={toast.duration} onClose={() => {
                        setToasts((currentToasts) => currentToasts.filter((t) => t.id !== toast.id));
                    }} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};
