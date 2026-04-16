import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, type, error, ...props }, ref) => {
    return (
      <Input
        type={type}
        className={cn(
          'max-w-50 bg-background border border-(--text-color) h-8 rounded-[12px] shadow-none',
          'focus:border-(--text-color) focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none',
          error ? 'border-red-500 bg-red-50' : '',
          className
        )}
        onChange={onChange}
        ref={ref}
        {...props}
      />
    );
  }
);

CustomInput.displayName = 'CustomInput';

export { CustomInput };
