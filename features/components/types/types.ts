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
  onValueChange: (value: string) => void;
  renderOption?: (option: OptionT) => React.ReactNode;
}

export interface AuthPageProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface dialogT {
  open: boolean;
  onClose: () => void;
}

export interface drawerT {
  open: boolean;
  onClose: () => void;
}
