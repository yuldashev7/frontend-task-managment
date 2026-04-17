export interface OptionT {
  label: string;
  value: string;
  time?: string;
  price?: string | number;
  status?: string;
}

export interface CustomSelectT {
  options: OptionT[];
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  value?: string;
  renderOption?: (option: OptionT) => React.ReactNode;
}

export interface AuthPageProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
