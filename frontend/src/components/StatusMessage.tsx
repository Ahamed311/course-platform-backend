interface StatusMessageProps {
  type: 'error' | 'success' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
}

export default function StatusMessage({ type, message, onClose }: StatusMessageProps) {
  const styles = {
    error: 'border-red-200 bg-red-50 text-red-700',
    success: 'border-green-200 bg-green-50 text-green-700',
    info: 'border-blue-200 bg-blue-50 text-blue-700',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-700',
  };

  return (
    <div className={`rounded-lg border p-4 ${styles[type]}`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}