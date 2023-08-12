export interface UploadPictureModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Filter {
  name: string;
  label: string;
}

export interface NewPost {
  filter: string;
  image: string;
  caption: string;
}