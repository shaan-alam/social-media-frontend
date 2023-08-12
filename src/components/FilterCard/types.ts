export interface Filter {
  label: string;
  name: string;
}

export interface FilterCardProps {
  src: string | ArrayBuffer;
  filter: { name: string; label: string };
  selected: boolean;
  setSelectedFilter: React.Dispatch<React.SetStateAction<Filter>>;
}
