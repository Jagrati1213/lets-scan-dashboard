// RESPONSE STATUS
export interface ResponseT {
  statusCode: number;
  statusText: string;
  success: boolean;
}
// FORM FIELD
export interface FormFieldT {
  name: string;
  price: number;
  desc: string;
  image: string;
}

// MENU LIST TYPES
export interface MenuItemT {
  _id: string | null;
  image: string | undefined;
  name: string | null;
  price: number | null;
  description?: string | null;
  rating?: string | null;
  vendorId?: string | null;
  isVeg: boolean;
  isActive: boolean;
}
export interface MenuFormT extends FormFieldT {
  type: boolean;
}

export interface MenuUpdateT extends FormFieldT {
  menuId: string;
}

export interface MenuResponseT extends ResponseT {
  data: MenuItemT[];
}

export interface UploadImageResponseT extends ResponseT {
  data: {
    url: string;
  };
}
export interface DeleteMenuResponseT extends ResponseT {
  data: null;
}

// DRAWER OPTIONS
export interface MenuDrawerT {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<DrawerOptionsT>>;
  menuItemId: string | undefined | null;
}
export interface DrawerOptionsT {
  isAddMenuOpen: boolean;
  isMenuViewOpen: boolean;
  isMenuEditorOpen: boolean;
}

// VENDER TYPES
export interface AuthFieldT {
  username: string;
  password: string;
  email?: string;
  resName?: string;
}

export interface VenderResponseT extends ResponseT {
  data: {
    _id: string;
    username: string;
    email: string;
    restaurant: string;
    isOpen: boolean;
  };
}

export interface VenderStateT {
  vendor: {
    _id: string | null;
    username: string | null;
    email: string | null;
    restaurant: string | null;
    isOpen: boolean;
  } | null;
  isAuthenticated: boolean;
}

// ORDERS TYPES
export interface GetOrdersResponseT extends ResponseT {
  data: [
    {
      _id: string;
      customer: {
        _id: string;
        name: string;
        email: string;
      };
      orderList: [
        {
          _id: string;
          menuId: string;
          name: string;
          price: number;
          quantity: number;
          createdAt: string;
          updatedAt: string;
        }
      ];
      orderStatus: string;
      orderToken: string;
      paymentId: string;
    }
  ];
}

export interface orderItemT {
  _id: string;
  customer: {
    _id: string;
    name: string;
    email: string;
  };
  orderList: [
    {
      _id: string;
      menuId: {
        name: string;
        _id: string;
      };
      price: number;
      quantity: number;
      name: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
  orderStatus: string;
  orderToken: string;
  paymentId: string;
  note: string;
  tableNumber: number;
}
export interface orderItemResponseT extends ResponseT {
  data: {
    _id: string;
    customer: {
      _id: string;
      name: string;
      email: string;
    };
    orderList: [
      {
        _id: string;
        menuId: {
          name: string;
          _id: string;
        };
        price: number;
        quantity: number;
        name: string;
        createdAt: string;
        updatedAt: string;
      }
    ];
    orderStatus: string;
    orderToken: string;
    paymentId: string;
    note: string;
    tableNumber: number;
  };
}

export interface transitionItemT {
  _id: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId: string;
  orderDetails: {
    vendorId: string;
  };
}
export interface transitionsResponseT extends ResponseT {
  data: {
    transitions: [
      {
        _id: string;
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
        orderId: string;
        orderDetails: {
          vendorId: string;
        };
      }
    ];
    totalCount: number;
  };
}
