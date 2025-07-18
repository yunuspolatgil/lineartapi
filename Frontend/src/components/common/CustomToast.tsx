import React, { useEffect, useRef } from "react";
import {
  Snackbar,
  Alert,
  useTheme,
  IconButton,
  Box,
  Typography,
  Slide
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: "success" | "error" | "warning" | "info";
  confirm?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  autoHideDuration?: number;
  sound?: boolean;
};

const iconMap = {
  success: <CheckCircleRoundedIcon />,
  error: <ErrorOutlineRoundedIcon />,
  warning: <WarningAmberRoundedIcon />,
  info: <InfoOutlinedIcon />,
};

// UYARI SESİ (dilersen başka mp3/wav linkiyle değiştirebilirsin)
const NOTIFICATION_SOUND =
  "https://notificationsounds.com/storage/sounds/file-sounds-1152-pristine.mp3";

const CustomToast = ({
                       open,
                       onClose,
                       message,
                       severity,
                       confirm = false,
                       onConfirm,
                       confirmText = "Evet, Sil",
                       cancelText = "Vazgeç",
                       autoHideDuration = 4000,
                       sound = true,
                     }: Props) => {
  const theme = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Her toast açıldığında ses çal
  useEffect(() => {
    if (open && sound && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [open, sound]);

  // GÖRSELDEKİ GİBİ BUTONLAR, RENKLER, MODERN YAPI
  return (
    <>
      <audio ref={audioRef} src={NOTIFICATION_SOUND} preload="auto" />
      <Snackbar
        open={open}
        onClose={onClose}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={confirm ? null : autoHideDuration}
        sx={{
          zIndex: 99999,
          ".MuiPaper-root": { borderRadius: 3 }
        }}
      >
        <Alert
          severity={severity}
          icon={iconMap[severity]}
          sx={{
            background: severity === "warning"
              ? theme.palette.warning.main
              : severity === "error"
                ? theme.palette.error.main
                : severity === "success"
                  ? theme.palette.success.main
                  : theme.palette.info.main,
            color: "#fff",
            alignItems: "center",
            minWidth: 320,
            maxWidth: 440,
            borderRadius: 3,
            fontWeight: 600,
            fontSize: 17,
            px: 2.5,
            py: 1.5,
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.13), 0 2px 8px 0 #0002",
            display: "flex",
            flexDirection: "row",
            gap: 1.5,
          }}
          action={
            confirm ? null : (
              <IconButton
                size="small"
                color="inherit"
                onClick={onClose}
                sx={{ color: "#fff" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )
          }
        >
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: 17 }}>
              {message}
            </Typography>
          </Box>
          {/* Onaylı Toast için butonlar */}
          {confirm && (
            <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
              <button
                style={{
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 22px",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  marginRight: 4,
                  transition: "background 0.2s"
                }}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
              <button
                style={{
                  background: "#22252e",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 22px",
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: "pointer"
                }}
                onClick={onClose}
              >
                {cancelText}
              </button>
            </Box>
          )}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomToast;
