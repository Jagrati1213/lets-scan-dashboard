import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Image,
  Input,
  Modal,
  Row,
  Skeleton,
  Space,
  Tooltip,
} from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import Style from "../../styles/_QrModal.module.scss";
import { LuCopy } from "react-icons/lu";
import { QRDetailsTypes } from "../../types";

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

  const copyQrLinkHandler = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopyUrl(true);

    setTimeout(() => {
      setCopyUrl(false);
    }, 3000);
  };
  console.log(qrDetails.url);
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
          <Col className={Style.qr_card_image}>
            {qrDetails.image ? (
              <Image preview={false} src={qrDetails.image} />
            ) : (
              <Skeleton.Image active={true} />
            )}
          </Col>
        </Row>
        <Divider>Or copy the link manually</Divider>

        <Flex gap={"12px"} className={Style.qr_link_box}>
          <Input disabled value={qrDetails.url} className={Style.qr_link} />

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
