// MENU LIST TYPES
export interface MenuItemType {
  _id: string | null;
  image: string | undefined;
  name: string | null;
  price: number | null;
  description?: string | null;
  rating?: string | null;
  userId?: string | null;
  isVeg: boolean;
}

export type MenuFormProps = {
  name: string;
  price: number;
  desc: string;
  image: string;
  type: boolean;
};

export interface MenuUpdateBodyProps {
  name: string;
  price: number;
  desc: string;
  image: string;
  menuId: string;
}

export interface MenuListResponseType {
  statusCode: number;
  statusText: string;
  success: boolean;
  data: MenuItemType[];
}

export interface imageUploadedTypes {
  statusCode: number;
  statusText: string;
  success: boolean;
  data: {
    url: string;
  };
}
export interface deleteMenuItemProps {
  statusCode: number;
  statusText: string;
  data: null;
  success: boolean;
}

export interface MenuDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<DrawerOptionsType>>;
  menuItemId: string | undefined | null;
}
// DRAWER OPTION TYPES
export interface DrawerOptionsType {
  isAddMenuOpen: boolean;
  isMenuViewOpen: boolean;
  isMenuEditorOpen: boolean;
}

// USER TYPES
export interface AuthFieldTypes {
  username: string;
  password: string;
  email?: string;
  resName?: string;
}

export type UserResponseType = {
  statusCode: number;
  statusText: string;
  success: boolean;
  data: {
    _id: string;
    username: string;
    email: string;
  };
};

export interface UserStateType {
  user: {
    username: string | null;
    email: string | null;
    _id: string | null;
  };
}

// QR CODE TYPES
export interface QRDetailsTypes {
  image: string | null;
  url: string | null;
}
