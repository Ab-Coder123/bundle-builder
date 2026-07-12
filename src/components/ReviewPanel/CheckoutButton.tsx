import React, { useState } from 'react';
import { useBundle } from '../../hooks/useBundle';
import { CheckCircle2 } from 'lucide-react';

export const CheckoutButton: React.FC = () => {
  const { totalItemsCount, isSaved, handleSaveBundle } = useBundle();
  const [toastVisible, setToastVisible] = useState(false);

  const onSaveClick = () => {
    handleSaveBundle();
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const onCheckoutClick = () => {
    alert('Thank you for choosing Wyze x Coldbru! Proceeding to secure checkout...');
  };

  return (
    <div className="space-y-3 pt-3">
      {/* Toast Notification */}
      {toastVisible && (
        <div className="flex items-center justify-center gap-1.5 p-2.5 rounded-[6px] bg-[#0AA288]/15 border border-[#0AA288] text-[#0AA288] text-xs font-medium animate-fadeIn">
          <CheckCircle2 size={15} className="shrink-0" />
          <span>System configuration saved to LocalStorage!</span>
        </div>
      )}

      {/* Checkout Button */}
      <button
        type="button"
        disabled={totalItemsCount === 0}
        onClick={onCheckoutClick}
        className="w-full h-12 flex items-center justify-center bg-[#4E2FD2] hover:bg-[#3D22AD] disabled:opacity-50 disabled:cursor-not-allowed rounded-[4px] text-white font-bold text-[17px] transition-colors shadow-sm"
      >
        Checkout
      </button>

      {/* Save System For Later Link */}
      <button
        type="button"
        onClick={onSaveClick}
        className="w-full text-center text-sm italic text-[#484848] underline hover:text-[#4E2FD2] transition-colors py-1"
      >
        {isSaved ? 'Configuration Saved!' : 'Save my system for later'}
      </button>
    </div>
  );
};

export default CheckoutButton;
