'use client';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (quantity: number) => void;
  size?: 'sm' | 'lg';
  itemName?: string;
}

const sizeStyles = {
  sm: {
    container: 'h-8 w-24',
    button: 'size-8 text-[13px]',
    value: 'w-5 text-[13px]',
  },
  lg: {
    container: 'h-12 w-30',
    button: 'size-12 text-sm',
    value: 'min-w-12 text-sm',
  },
};

const buttonClasses =
  'can-hover:not-aria-disabled:hover:text-orange focus-visible:outline-orange flex cursor-pointer items-center justify-center font-bold text-black/25 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 aria-disabled:cursor-not-allowed';

export function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
  size = 'lg',
  itemName,
}: QuantitySelectorProps) {
  const styles = sizeStyles[size];

  const context = itemName ? ` for ${itemName}` : '';
  const decrementLabel =
    min === 0 && value === 1
      ? `Remove ${itemName ?? 'item'} from cart`
      : `Decrease quantity${context}`;
  const incrementLabel = `Increase quantity${context}`;

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className={`flex items-center justify-between bg-lightGray ${styles.container}`}
    >
      <button
        type='button'
        onClick={handleDecrement}
        aria-disabled={value <= min}
        className={`${buttonClasses} ${styles.button}`}
        aria-label={decrementLabel}
      >
        −
      </button>
      <span
        className={`text-center font-bold tracking-[1px] text-black ${styles.value}`}
        aria-live='polite'
        aria-atomic='true'
      >
        {value}
        {itemName && <span className='sr-only'> — quantity of {itemName}</span>}
      </span>
      <button
        type='button'
        onClick={handleIncrement}
        aria-disabled={value >= max}
        className={`${buttonClasses} ${styles.button}`}
        aria-label={incrementLabel}
      >
        +
      </button>
    </div>
  );
}
