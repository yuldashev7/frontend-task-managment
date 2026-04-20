'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CustomSelectT } from '../../types/types';

export function CustomSelect({
  options,
  placeholder,
  onChange,
  defaultValue,
  className,
  disabled,
  renderOption,
}: CustomSelectT) {
  return (
    <Select
      onValueChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectTrigger className={`cursor-pointer font-normal ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        align="start"
        side="bottom"
        className="min-w-24!"
      >
        {options.length > 0 ? (
          options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="border-b border-(--text-color) last:border-b-0 rounded-none py-2 cursor-pointer focus:bg-slate-50"
            >
              {renderOption ? renderOption(option) : option.label}
            </SelectItem>
          ))
        ) : (
          <div className="p-2 text-sm text-muted-foreground text-center">
            {"Ma'lumot mavjud emas"}
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
