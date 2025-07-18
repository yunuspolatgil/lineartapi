import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import CustomInputHorizontal from "@core/components/custom-inputs/Horizontal";
import type { CustomInputHorizontalData } from "@core/components/custom-inputs/types";

export type AddEditAddressData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  landmark?: string;
  type?: "bireysel" | "kurumsal";
  companyName?: string;
};

export type AddEditAddressProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: AddEditAddressData;
  onSave: (
    data: {
      name: string;
      surname: string;
      email?: string;
      phone: string;
      type: "bireysel" | "kurumsal";
      companyName?: string;
    },
    formType: string
  ) => void;
  onDelete?: () => void;
};

const customerTypeOptions: CustomInputHorizontalData[] = [
  {
    meta: "",
    title: "Bireysel",
    value: "bireysel",
    isSelected: true,
    content: "Bireysel müşteri işlemleri için",
  },
  {
    meta: "",
    title: "Kurumsal",
    value: "kurumsal",
    content: "Kurumsal müşteri işlemleri için",
  },
];

const AddEditAddress: React.FC<AddEditAddressProps> = ({
                                                         open,
                                                         setOpen,
                                                         data,
                                                         onSave,
                                                         onDelete,
                                                       }) => {
  const theme = useTheme();

  const [addressData, setAddressData] = useState<AddEditAddressData>({
    firstName: "",
    lastName: "",
    email: "",
    landmark: "",
    type: "bireysel",
    companyName: "",
  });

  useEffect(() => {
    if (data)
      setAddressData({ ...data, type: data.type ?? "bireysel" });
    else
      setAddressData({
        firstName: "",
        lastName: "",
        email: "",
        landmark: "",
        type: "bireysel",
        companyName: "",
      });
  }, [data, open]);

  const handleTypeChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    const typeValue = typeof value === "string" ? value : value.target.value;
    setAddressData((prev) => ({
      ...prev,
      type: typeValue as "bireysel" | "kurumsal",
      companyName: typeValue === "kurumsal" ? prev.companyName : "",
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddressData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (!addressData.firstName || !addressData.lastName) return;
    onSave(
      {
        name: addressData.firstName ?? "",
        surname: addressData.lastName ?? "",
        email: addressData.email || undefined,
        phone: addressData.landmark ?? "",
        type: addressData.type || "bireysel",
        companyName:
          addressData.type === "kurumsal"
            ? addressData.companyName
            : undefined,
      },
      data ? "edit" : "add"
    );
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        },
      }}
    >
      <DialogTitle sx={{ pb: 0, fontWeight: 700 }}>
        {data ? "Müşteri Düzenle" : "Yeni Müşteri Ekle"}
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {/* Custom Horizontal Radios */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {customerTypeOptions.map((item, index) => (
            <Grid item xs={6} key={index}>
              <CustomInputHorizontal
                type="radio"
                data={item}
                selected={addressData.type ?? ""}
                name="customer-type"
                handleChange={handleTypeChange}
                gridProps={{}}
                sx={{
                  borderRadius: 2,
                  border:
                    addressData.type === item.value
                      ? `2px solid ${theme.palette.primary.main}`
                      : `1px solid ${theme.palette.divider}`,
                  background: theme.palette.background.paper,
                  boxShadow:
                    addressData.type === item.value
                      ? `0 0 0 2px ${theme.palette.primary.main}33`
                      : "none",
                }}
              />
            </Grid>
          ))}
        </Grid>

        <Stack gap={2}>
          <TextField
            label="Ad"
            name="firstName"
            value={addressData.firstName}
            onChange={handleChange}
            color="primary"
            size="small"
            required
            fullWidth
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
            InputProps={{
              sx: {
                color: theme.palette.text.primary,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Soyad"
            name="lastName"
            value={addressData.lastName}
            onChange={handleChange}
            color="primary"
            size="small"
            required
            fullWidth
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
            InputProps={{
              sx: {
                color: theme.palette.text.primary,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="E-posta"
            name="email"
            value={addressData.email}
            onChange={handleChange}
            color="primary"
            size="small"
            type="email"
            fullWidth
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
            InputProps={{
              sx: {
                color: theme.palette.text.primary,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Telefon"
            name="landmark"
            value={addressData.landmark}
            onChange={handleChange}
            color="primary"
            size="small"
            fullWidth
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
            InputProps={{
              sx: {
                color: theme.palette.text.primary,
                bgcolor: theme.palette.background.paper,
                borderRadius: 2,
              },
            }}
          />
          {addressData.type === "kurumsal" && (
            <TextField
              label="Şirket Adı"
              name="companyName"
              value={addressData.companyName}
              onChange={handleChange}
              color="primary"
              size="small"
              required
              fullWidth
              InputLabelProps={{ style: { color: theme.palette.text.primary } }}
              InputProps={{
                sx: {
                  color: theme.palette.text.primary,
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 2,
                },
              }}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 3 }}>
        {onDelete && data && (
          <Button color="error" onClick={onDelete} sx={{ fontWeight: 600 }}>
            Sil
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={() => setOpen(false)} sx={{ fontWeight: 600 }}>
          Vazgeç
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            fontWeight: 700,
          }}
        >
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditAddress;
