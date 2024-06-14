import { menuMuseWebsitePath } from "../global";

export const generateQRCodeHandler = async (id: string) => {
  const QRimageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${menuMuseWebsitePath}/menu/${id}`;
  return { QRimageSrc, url: `https://menu-muse.vercel.app/menu/${id}` };
};
