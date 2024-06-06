// MENU LIST TYPES
export interface MenuListType {
  _id: string | null;
  image: string | undefined;
  name: string | null;
  price: number | null;
  description?: string | null;
  rating?: string | null;
  userId?: string | null;
}

export type MenuFormProps = {
  name: string;
  price: number;
  desc: string;
  image?: File | null;
};

export interface MenuListResponseType {
  statusCode: number;
  statusText: string;
  success: boolean;
  data: MenuListType[];
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
