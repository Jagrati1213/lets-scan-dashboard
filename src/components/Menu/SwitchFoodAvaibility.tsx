import { Popconfirm, PopconfirmProps, Switch, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { updateMenuItemAction } from "../../store/slices/menuListSlice";
import { changeFoodType } from "../../apis/menu/updateItemActive";

export default function SwitchFoodAvailability({
  menuItemId,
}: {
  menuItemId: string | null;
}) {
  // STATES
  const { menulist } = useAppSelector((store) => store.menuListSlice);
  const dispatch = useAppDispatch();

  const [active, setActive] = useState(false);

  //   SET ACTIVE TRUE
  const confirm: PopconfirmProps["onConfirm"] = async () => {
    setActive(true);
    const data = await changeFoodType({
      activeVal: true,
      menuId: menuItemId,
    });
    dispatch(updateMenuItemAction(data));
  };

  // CHANGE FOOD ACTIVE
  const switchFoodActive = async (checked: boolean) => {
    if (active) {
      setActive(false);
      const data = await changeFoodType({
        activeVal: checked,
        menuId: menuItemId,
      });
      dispatch(updateMenuItemAction(data));
    }
  };

  useEffect(() => {
    const menuItem = menulist.find((item) => item?._id === menuItemId);
    if (menuItem) {
      setActive(menuItem.isActive);
    }
  }, [menuItemId]);

  return active ? (
    <Switch defaultChecked size="small" onChange={switchFoodActive} />
  ) : (
    <Popconfirm
      title="Switch the Food"
      description="Are you sure to active this item?"
      onConfirm={confirm}
      okText="Yes"
      cancelText="No"
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
    >
      <Switch
        defaultChecked
        size="small"
        onChange={switchFoodActive}
        value={active}
      />
      ,
    </Popconfirm>
  );
}
