import { Avatar, Button, Flex, Table } from "antd";
import type { TableColumnsType } from "antd";
import Title from "antd/es/typography/Title";
import Style from "../../styles/_Menu.module.scss";

interface DataType {
  key: React.Key;
  image: string;
  name: string;
  price: number;
  desc: string;
}
export default function Menu() {
  const columns: TableColumnsType<DataType> = [
    {
      title: "Image",
      width: 100,
      dataIndex: "image",
      key: "image",
      fixed: "left",
      render: (image) => <Avatar src={image} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      image: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
      name: `Edward ${i}`,
      price: i,
      desc: `London Park no. ${i}`,
    });
  }

  return (
    <div className={Style.menu_container}>
      <Flex gap="middle" vertical>
        <Flex justify={"space-between"} align="center">
          <Title level={5}>Menus </Title>
          <Button type="primary" shape="round">
            Add Menu
          </Button>
        </Flex>
        <Table
          className="menu_list"
          columns={columns}
          dataSource={data}
          scroll={{ x: 1500, y: 600 }}
        />
      </Flex>
    </div>
  );
}
