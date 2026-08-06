import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { Html5Qrcode } from "html5-qrcode";
import { LuArrowLeft, LuLoader } from "react-icons/lu";
import type { Booking } from "../../types/booking";

interface CheckInResult {
  ok: boolean;
  message: string;
}

interface QrCameraScannerProps {
  onClose: () => void;
  lookupBooking: (code: string) => Booking | undefined;
  onConfirmCheckIn: (code: string) => Promise<CheckInResult>;
}

const QR_ELEMENT_ID = "qr-camera-scanner";

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-[#262525] last:border-b-0">
    <span className="text-[#838383] text-[14px]">{label}</span>
    <span className="text-[#ECECEC] text-[14px] text-right">{value}</span>
  </div>
);

const QrCameraScanner = ({
  onClose,
  lookupBooking,
  onConfirmCheckIn,
}: QrCameraScannerProps) => {
  const [cameraError, setCameraError] = useState("");
  const [notRecognized, setNotRecognized] = useState(false);
  const [scannedBooking, setScannedBooking] = useState<Booking | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmIsError, setConfirmIsError] = useState(false);

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isPausedRef = useRef(false);
  const lookupBookingRef = useRef(lookupBooking);
  const lastScanRef = useRef<{ text: string; time: number }>({ text: "", time: 0 });

  useEffect(() => {
    lookupBookingRef.current = lookupBooking;
  }, [lookupBooking]);

  useEffect(() => {
    const scanner = new Html5Qrcode(QR_ELEMENT_ID);
    scannerRef.current = scanner;
    let isMounted = true;
    let hasStarted = false;

    const stopAndClear = () => {
      scanner
        .stop()
        .then(() => scanner.clear())
        .catch(() => undefined);
    };

    const handleDecoded = (decodedText: string) => {
      const now = Date.now();
      if (
        decodedText === lastScanRef.current.text &&
        now - lastScanRef.current.time < 3000
      ) {
        return;
      }
      lastScanRef.current = { text: decodedText, time: now };

      const booking = lookupBookingRef.current(decodedText);
      if (!booking) {
        setNotRecognized(true);
        setTimeout(() => setNotRecognized(false), 1800);
        return;
      }

      isPausedRef.current = true;
      scanner.pause(true);
      setScannedBooking(booking);
    };

    const startScanning = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Camera API unavailable");
        }
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          handleDecoded,
          () => undefined,
        );
        if (!isMounted) {
          stopAndClear();
          return;
        }
        hasStarted = true;
      } catch {
        if (isMounted) {
          setCameraError("Couldn't access the camera. Check permissions and try again.");
        }
      }
    };

    startScanning();

    return () => {
      isMounted = false;
      if (hasStarted) {
        stopAndClear();
      }
    };
  }, []);

  const resumeScanning = () => {
    setScannedBooking(null);
    setConfirmMessage("");
    setConfirmIsError(false);
    if (isPausedRef.current) {
      try {
        scannerRef.current?.resume();
      } catch {
        // ignore — camera may not support resume in this environment
      }
      isPausedRef.current = false;
    }
  };

  const handleConfirm = async () => {
    if (!scannedBooking || isConfirming) return;
    setIsConfirming(true);
    const result = await onConfirmCheckIn(scannedBooking.code);
    setIsConfirming(false);
    setConfirmMessage(result.message);
    setConfirmIsError(!result.ok);
    if (result.ok) {
      setTimeout(resumeScanning, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0B0B]/95 flex flex-col items-center px-6 pt-6 pb-10 overflow-y-auto">
      <button
        type="button"
        onClick={scannedBooking ? resumeScanning : onClose}
        className="self-start flex items-center gap-2 text-white text-[16px]"
      >
        <LuArrowLeft size={20} />
        Back
      </button>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full max-w-xs py-6">
        <h2 className="text-white text-[28px] font-['Instrument_Serif'] font-normal text-center">
          Scan QR code on Ticket
        </h2>

        <div className="w-full aspect-square bg-white rounded-[28px] overflow-hidden flex items-center justify-center">
          {scannedBooking ? (
            <img
              src={scannedBooking.qrCode}
              alt="Scanned ticket QR code"
              className="w-full h-full object-contain p-6"
            />
          ) : (
            <div
              id={QR_ELEMENT_ID}
              className="w-full h-full [&>video]:w-full [&>video]:h-full [&>video]:object-cover"
            />
          )}
        </div>

        {scannedBooking ? (
          <>
            <div className="w-full rounded-[20px] border border-[#262525] px-4 py-1 bg-[#0F0F0F]">
              <DetailRow label="Name" value={scannedBooking.fullName} />
              <DetailRow label="Email" value={scannedBooking.email} />
              <DetailRow label="Ticket ID" value={scannedBooking.code} />
              <DetailRow label="Ticket Type" value={scannedBooking.ticketName} />
              <DetailRow
                label="Check-in Time"
                value={
                  scannedBooking.checkedInAt
                    ? format(new Date(scannedBooking.checkedInAt), "h:mm a")
                    : "—"
                }
              />
              <DetailRow
                label="Check-in Status"
                value={scannedBooking.checkedIn ? "Checked In" : "—"}
              />
            </div>

            {confirmMessage && (
              <p
                className={`text-[14px] text-center ${
                  confirmIsError ? "text-[#FF7466]" : "text-[#5FD787]"
                }`}
              >
                {confirmMessage}
              </p>
            )}

            <button
              type="button"
              onClick={handleConfirm}
              disabled={isConfirming || scannedBooking.checkedIn}
              className="w-full bg-[#995DFF] hover:bg-[#8a4ff0] text-white text-[16px] font-medium py-3.5 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {scannedBooking.checkedIn
                ? "Already Checked In"
                : isConfirming
                  ? "Checking in..."
                  : "Check-in"}
            </button>
          </>
        ) : cameraError ? (
          <p className="text-[#FF7466] text-[14px] text-center">{cameraError}</p>
        ) : notRecognized ? (
          <p className="text-[#FF7466] text-[14px] text-center">
            Ticket not recognized. Try scanning again.
          </p>
        ) : (
          <div className="flex items-center gap-2 bg-[#262525] text-white text-[15px] px-5 py-2.5 rounded-full">
            <LuLoader className="animate-spin" size={16} />
            Loading
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCameraScanner;
