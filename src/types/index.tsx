export interface MenuListType {
  _id: React.Key;
  image: string;
  name: string;
  price: number;
  description?: string;
  rating?: string;
}

export type MenuFormProps = {
  name: string;
  price: number;
  desc: string;
  image?: File | null;
};

export interface DrawerOptionsType {
  isAddMenuOpen: boolean;
  isMenuViewOpen: boolean;
  isMenuEditorOpen: boolean;
}

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
