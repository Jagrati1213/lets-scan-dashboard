export const generateQRCodeHandler = async (id: string) => {
  console.log("click");
  const QRimageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://menu-muse.vercel.app/menu/${id}`;
  return QRimageSrc;
};
