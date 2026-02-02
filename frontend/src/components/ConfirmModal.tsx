'use client';

import { useEffect } from 'react';
import Button from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  type = 'warning'
}: ConfirmModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Backdrop - Fond blanc semi-transparent au lieu de noir */}
      <div 
        className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container - Centrage parfait avec plus d'espace */}
      <div className="fixed inset-0 flex items-center justify-center p-8">
        <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-gray-200 max-w-lg w-full mx-auto transform transition-all duration-300 scale-100">
          {/* Contenu du modal - Espacement réduit */}
          <div className="p-8 text-center">
            {/* Icône d'avertissement plus petite */}
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-yellow-200">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            {/* Titre plus petit */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {title}
            </h3>
            
            {/* Message plus compact */}
            <p className="text-gray-700 mb-6 text-base leading-relaxed max-w-sm mx-auto">
              {message}
            </p>

            {/* Boutons plus compacts */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-sm mx-auto">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 py-3 px-6 text-base font-medium border-2 hover:bg-gray-50 rounded-xl"
              >
                {cancelText}
              </Button>
              <Button
                variant={type === 'danger' ? 'danger' : 'primary'}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="flex-1 py-3 px-6 text-base font-medium rounded-xl"
              >
                {confirmText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}