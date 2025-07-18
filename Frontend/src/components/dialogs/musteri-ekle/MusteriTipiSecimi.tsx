import { Box, Typography, Radio, RadioGroup, FormControlLabel, useTheme } from "@mui/material";

type MusteriTipi = "bireysel" | "kurumsal";
type Props = {
  value: MusteriTipi;
  onChange: (value: MusteriTipi) => void;
};

export default function MusteriTipiSecimi({ value, onChange }: Props) {
  const theme = useTheme();
  return (
    <RadioGroup
      row
      value={value}
      onChange={e => onChange(e.target.value as MusteriTipi)}
      sx={{ gap: 2 }}
    >
      {/* Bireysel */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          p: 2,
          background: theme.palette.mode === "dark" ? "#2d2f45" : "#f7f8fc",
          borderRadius: 2,
          border: value === "bireysel"
            ? `1.5px solid ${theme.palette.primary.main}`
            : `1.5px solid transparent`,
          minWidth: 220,
          minHeight: 70,
        }}
      >
        <Radio
          checked={value === "bireysel"}
          value="bireysel"
          sx={{ mt: 0.5 }}
        />
        <Box>
          <Typography
            component="span"
            sx={{
              fontWeight: 700,
              fontSize: 18,
              color: theme.palette.mode === "dark" ? "#fff" : "#222",
            }}
          >
            Bireysel
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.5)"
                : "#888",
              fontSize: 15,
              display: "block",
              mt: 0.5,
            }}
          >
            Bireysel müşteri işlemleri için
          </Typography>
        </Box>
      </Box>

      {/* Kurumsal */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          p: 2,
          background: theme.palette.mode === "dark" ? "#2d2f45" : "#f7f8fc",
          borderRadius: 2,
          border: value === "kurumsal"
            ? `1.5px solid ${theme.palette.primary.main}`
            : `1.5px solid transparent`,
          minWidth: 220,
          minHeight: 70,
        }}
      >
        <Radio
          checked={value === "kurumsal"}
          value="kurumsal"
          sx={{ mt: 0.5 }}
        />
        <Box>
          <Typography
            component="span"
            sx={{
              fontWeight: 700,
              fontSize: 18,
              color: theme.palette.mode === "dark" ? "#fff" : "#222",
            }}
          >
            Kurumsal
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.5)"
                : "#888",
              fontSize: 15,
              display: "block",
              mt: 0.5,
            }}
          >
            Kurumsal müşteri işlemleri için
          </Typography>
        </Box>
      </Box>
    </RadioGroup>
  );
}
