import type { ComponentProps } from 'react';

interface RadioInputProps extends Omit<ComponentProps<'input'>, 'type'> {
  label: string;
}

export function RadioInput({
  label,
  className = '',
  ...props
}: RadioInputProps) {
  return (
    <label
      className={`flex h-14 cursor-pointer items-center gap-4 rounded-lg border border-darkGray px-4 hover:border-orange has-checked:border-orange has-focus-visible:border-orange ${className}`}
    >
      <div className='relative flex items-center justify-center'>
        <input
          type='radio'
          className='peer size-5 cursor-pointer appearance-none rounded-full border border-darkGray checked:border-darkGray focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange'
          {...props}
        />
        <div className='pointer-events-none absolute size-2.5 rounded-full bg-orange opacity-0 peer-checked:opacity-100' />
      </div>
      <span className='text-sm font-bold'>{label}</span>
    </label>
  );
}
