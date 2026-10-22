import type { ComponentProps } from 'react';

interface TextInputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export function TextInput({
  label,
  error,
  className = '',
  containerClassName = '',
  ...props
}: TextInputProps) {
  const hasError = !!error;
  const inputId = props.id || props.name;
  const errorId = `${inputId}-error`;

  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      <div className='flex min-h-8 items-start justify-between'>
        <label
          htmlFor={inputId}
          className={`text-xs font-bold ${hasError ? 'text-red' : 'text-black'}`}
        >
          {label}
        </label>
        {hasError && (
          <span
            id={errorId}
            role='alert'
            className='text-xs font-medium text-red'
          >
            {error}
          </span>
        )}
      </div>
      <input
        id={inputId}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        className={`h-14 rounded-lg border bg-white px-6 text-sm font-bold outline-none ${
          hasError ? 'border-red' : 'border-darkGray focus:border-orange'
        } ${className}`}
        {...props}
      />
    </div>
  );
}
