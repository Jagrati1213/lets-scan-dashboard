import {
  Button,
  Col,
  Divider,
  Flex,
  Input,
  Modal,
  QRCode,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Style from "../../styles/_QrModal.module.scss";
import { LuCopy } from "react-icons/lu";
import { useAppSelector } from "../../store/store";
import { letsScanWebsitePath } from "../../global";
import { IReactToPrintProps, useReactToPrint } from "react-to-print";

const { Title, Text } = Typography;
interface modalProps {
  openQrModal: boolean;
  setOpenQrModal: Dispatch<SetStateAction<boolean>>;
}
export default function QRModal({ openQrModal, setOpenQrModal }: modalProps) {
  const [copyUrl, setCopyUrl] = useState<boolean>(false);
  const { vendor } = useAppSelector((store) => store.authSlice);
  const componentRef = useRef<HTMLDivElement>(null);

  // METHODS
  const copyQrLinkHandler = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopyUrl(true);

    setTimeout(() => {
      setCopyUrl(false);
    }, 3000);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Lets Scan Menu QR",
    onAfterPrint: () => {
      setOpenQrModal(false);
    },
  });

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
          <Col style={{ display: "none" }}>
            <Space
              direction="vertical"
              align="center"
              ref={componentRef}
              style={{
                width: "100%",
                height: "100%",
                padding: "2rem",
              }}
              className="printable-area"
            >
              <Title level={4} style={{ marginBottom: "0" }}>
                Scan QR
              </Title>
              <Text style={{ fontSize: "1.2rem" }}>
                Our restaurant {vendor?.restaurant}
              </Text>
              <QRCode
                type="svg"
                value={`${letsScanWebsitePath}/menu/${vendor?._id}`}
                size={250}
              />
              <p>Visit our menu by scanning this QR code.</p>
            </Space>
          </Col>

          <Col>
            <QRCode
              type="svg"
              value={`${letsScanWebsitePath}/menu/${vendor?._id}`}
            />
          </Col>
        </Row>
        <Divider>Or copy the link manually</Divider>

        <Flex gap={"12px"} className={Style.qr_link_box}>
          <Input
            disabled
            value={`${letsScanWebsitePath}/menu/${vendor?._id}`}
            className={Style.qr_link}
          />

          <Tooltip title={copyUrl ? "Copied" : "Copy"}>
            <Button
              icon={<LuCopy />}
              onClick={copyQrLinkHandler.bind(
                null,
                `${letsScanWebsitePath}/menu/${vendor?._id}`
              )}
            />
          </Tooltip>
        </Flex>

        <Button
          type="primary"
          className={Style.print_btn}
          onClick={handlePrint}
        >
          Print
        </Button>
      </Modal>
    </div>
  );
}
