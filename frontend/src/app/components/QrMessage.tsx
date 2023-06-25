import { QRCodeSVG } from "qrcode.react";

const QrMessage = ({ appUrl }: { appUrl: string }) => {
  return (
    <div>
      <div className="mt-5">
        <div className="flex items-center lg:justify-start justify-center mb-10 gap  lg:gap-10">
          <div className="p-2 bg-white rounded-2xl">
            <QRCodeSVG className="w-54 h-54" value={appUrl} size={250} />
          </div>
        </div>
        <h3 className="md:px-20 lg:px-0 lg:pr-20 md:text-2xl text-white text-center font-Agrandir">
          <span className="text-yellow">Scan Qr</span> to download the app
        </h3>
      </div>
    </div>
  );
};

export default QrMessage;
