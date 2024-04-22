export interface MenuListType {
  id: React.Key;
  image?: string;
  name: string;
  price: number;
  desc?: string;
}

export type MenuFormProps = {
  name: string;
  price: number;
  desc?: string;
  image?: string;
};
