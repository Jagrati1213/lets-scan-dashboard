import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Image,
  Input,
  Modal,
  QRCode,
  Row,
  Skeleton,
  Space,
  Tooltip,
} from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import Style from "../../styles/_QrModal.module.scss";
import { LuCopy } from "react-icons/lu";
import { QRDetailsTypes } from "../../types";
import { useAppSelector } from "../../store/store";
import { menuMuseWebsitePath } from "../../global";

interface modalProps {
  qrDetails: QRDetailsTypes | any;
  openQrModal: boolean;
  setOpenQrModal: Dispatch<SetStateAction<boolean>>;
}
export default function QRModal({
  openQrModal,
  setOpenQrModal,
  qrDetails,
}: modalProps) {
  const [copyUrl, setCopyUrl] = useState<boolean>(false);
  const { user } = useAppSelector((store) => store.authSlice);

  // METHODS
  const copyQrLinkHandler = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopyUrl(true);

    setTimeout(() => {
      setCopyUrl(false);
    }, 3000);
  };

  return (
    <div>
      <Modal
        centered
        open={openQrModal}
        footer={null}
        onCancel={() => setOpenQrModal(false)}
        className={Style.qr_modal}
        closeIcon={false}
      >
        <Row className={Style.qr_card}>
          <Col>
            <Row justify={"center"}>
              <Col span={24}>
                <h3>Scan QR Code</h3>
              </Col>
              <Col span={24}>
                <p>scan code & jump to website</p>
              </Col>
            </Row>
          </Col>
          <Col>
            <QRCode
              type="svg"
              value={`${menuMuseWebsitePath}/menu/${user?._id}`}
            />
          </Col>
        </Row>
        <Divider>Or copy the link manually</Divider>

        <Flex gap={"12px"} className={Style.qr_link_box}>
          <Input
            disabled
            value={`${menuMuseWebsitePath}/menu/${user?._id}`}
            className={Style.qr_link}
          />

          <Tooltip title={copyUrl ? "Copied" : "Copy"}>
            <Button
              icon={<LuCopy />}
              onClick={copyQrLinkHandler.bind(null, qrDetails.url)}
            />
          </Tooltip>
        </Flex>

        <Button type="primary" className={Style.print_btn}>
          Print
        </Button>
      </Modal>
    </div>
  );
}
