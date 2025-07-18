import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack
} from "@mui/material";

type AddEditAddressData = {
  firstName: string;
  lastName: string;
  email: string;
  landmark: string;
};

type AddEditAddressProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: AddEditAddressData;
  onSave: (
    data: { name: string; surname: string; email: string; phone: string },
    type: string
  ) => void;
  onDelete?: () => void;
};

const AddEditAddress: React.FC<AddEditAddressProps> = ({
                                                         open,
                                                         setOpen,
                                                         data,
                                                         onSave,
                                                         onDelete
                                                       }) => {
  const [addressData, setAddressData] = useState<AddEditAddressData>({
    firstName: "",
    lastName: "",
    email: "",
    landmark: ""
  });

  useEffect(() => {
    if (data) setAddressData(data);
    else setAddressData({ firstName: "", lastName: "", email: "", landmark: "" });
  }, [data, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    if (!addressData.firstName || !addressData.lastName || !addressData.email) {
      // Basit frontend validation
      return;
    }
    onSave(
      {
        name: addressData.firstName,
        surname: addressData.lastName,
        email: addressData.email,
        phone: addressData.landmark
      },
      data ? "edit" : "add"
    );
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>
        {data ? "Müşteri Düzenle" : "Yeni Müşteri Ekle"}
      </DialogTitle>
      <DialogContent>
        <Stack gap={2} mt={1}>
          <TextField
            label="Ad"
            name="firstName"
            value={addressData.firstName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Soyad"
            name="lastName"
            value={addressData.lastName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="E-posta"
            name="email"
            value={addressData.email}
            onChange={handleChange}
            required
            type="email"
            fullWidth
          />
          <TextField
            label="Telefon"
            name="landmark"
            value={addressData.landmark}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        {onDelete && data && (
          <Button color="error" onClick={onDelete}>
            Sil
          </Button>
        )}
        <Button onClick={() => setOpen(false)}>Vazgeç</Button>
        <Button variant="contained" onClick={handleSave}>
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditAddress;
