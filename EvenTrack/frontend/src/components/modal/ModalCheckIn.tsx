import React, { useState } from "react";
import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";
import QRScannerUserEvent from '@/components/qr/QRScannerUserEvent'

interface Props {
  open: boolean;
  setOpen: (data: boolean) => void;
  idUser?: number;
  idEvent: number;
}

export default function ModalCheckIn({ open, setOpen, idEvent, idUser }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Handlers for loading and error states
  const handleSetLoading = (value: boolean) => setLoading(value);
  const handleSetError = (value: boolean) => setError(value);

  // Messages for dynamic rendering
  const messages = {
    error: "Has escaneado el código de otro evento",
    loading: "Entrando al evento",
    default: "Por favor, escanea el código de entrada al evento.",
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false); // Close the modal
        setError(false); // Reset error state
      }}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          textAlign: "center",
          filter:
            "drop-shadow(0px 0px 50px #7412DE) drop-shadow(0px 0px 50px #7412DE)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">ESCANEA EL QR DE ENTRADA</Typography>

        {loading ? (
          <div className="w-full h-full">
            <CircularProgress
          size={80}
          sx={{
            color:'purple'
          }}
          />

          </div>
        ) : (
          
          <QRScannerUserEvent
            idUser={idUser}
            idEvent={idEvent}
            setLoading={handleSetLoading}
            setError={handleSetError}
          />
        )}

        <Typography
          variant="caption"
          className={error ? "text-red-600" : ""}
          aria-live="assertive"
        >
          {error ? messages.error : ""}
        </Typography>
        <Typography variant="caption" aria-live="polite">
          {loading ? messages.loading : messages.default}
        </Typography>

        {/* Close button */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(false)}
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#140633",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  color: "#ddd",
  borderRadius: "24px",
};
