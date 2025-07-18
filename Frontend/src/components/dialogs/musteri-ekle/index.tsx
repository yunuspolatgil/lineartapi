import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";

// Vuexy CustomInputHorizontal
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

// Müşteri tipi için Vuexy tarzı radio kart verisi
const radioData: CustomInputHorizontalData[] = [
  {
    meta: "Bireysel müşteri işlemleri için",
    title: "Bireysel",
    value: "bireysel",
    isSelected: true,
    content: ""
  },
  {
    meta: "Kurumsal müşteri işlemleri için",
    title: "Kurumsal",
    value: "kurumsal",
    content: ""
  }
];

const AddEditAddress: React.FC<AddEditAddressProps> = ({
                                                         open,
                                                         setOpen,
                                                         data,
                                                         onSave,
                                                         onDelete
                                                       }) => {
  const theme = useTheme();

  // Modal içinde radio kartlar için state
  const [selectedType, setSelectedType] = useState<string>(
    data?.type || radioData.find(x => x.isSelected)?.value || "bireysel"
  );

  const [addressData, setAddressData] = useState<AddEditAddressData>({
    firstName: "",
    lastName: "",
    email: "",
    landmark: "",
    type: selectedType as "bireysel" | "kurumsal",
    companyName: ""
  });

  useEffect(() => {
    setSelectedType(data?.type || radioData.find(x => x.isSelected)?.value || "bireysel");
    setAddressData({
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      email: data?.email || "",
      landmark: data?.landmark || "",
      type: selectedType as "bireysel" | "kurumsal",
      companyName: data?.companyName || ""
    });
  }, [open, data]);

  // Radio (kart) değişince tipi hem adresData hem de local state'te güncelle
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setAddressData(prev => ({
      ...prev,
      type: type as "bireysel" | "kurumsal",
      companyName: type === "kurumsal" ? prev.companyName : ""
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddressData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
            : undefined
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
          color: theme.palette.text.primary
        }
      }}
    >
      <DialogTitle sx={{ pb: 0, fontWeight: 700 }}>
        {data ? "Müşteri Düzenle" : "Yeni Müşteri Ekle"}
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {radioData.map((item, index) => (
            <CustomInputHorizontal
              type="radio"
              key={index}
              data={item}
              selected={selectedType}
              name="custom-radios-customer-type"
              handleChange={(value) => handleTypeChange(typeof value === "string" ? value : (value.target?.value ?? ""))}
              gridProps={{ xs: 12, sm: 6 }}
            />
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
                borderRadius: 2
              }
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
                borderRadius: 2
              }
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
                borderRadius: 2
              }
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
                borderRadius: 2
              }
            }}
          />
          {selectedType === "kurumsal" && (
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
                  borderRadius: 2
                }
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
            fontWeight: 700
          }}
        >
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditAddress;
