// Toast.tsx
import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    duration?: number; 
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration); 
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out z-[3000]">
            {message}
        </div>
    );
};

export default Toast;