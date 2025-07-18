"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";
import AddEditAddress, { AddEditAddressData } from "@/components/dialogs/musteri-ekle";

type Customer = {
  id: number;
  name: string;
  surname: string;
  email?: string;
  phone: string;
  type?: "bireysel" | "kurumsal";
  companyName?: string;
};

const MusterilerPage = () => {
  const theme = useTheme();

  // CRUD state
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "Yunis",
      surname: "Polatgil",
      email: "jejuwoodamz@gmail.com",
      phone: "05307947958",
      type: "bireysel",
    },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();
  const [notif, setNotif] = useState({ open: false, message: "", severity: "success" });

  // Ekle
  const handleAdd = () => {
    setSelectedCustomer(undefined);
    setDialogOpen(true);
  };

  // Düzenle
  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDialogOpen(true);
  };

  // Kaydet (ekle veya düzenle)
  const handleSave = (
    data: {
      name: string;
      surname: string;
      email?: string;
      phone: string;
      type: "bireysel" | "kurumsal";
      companyName?: string;
    },
    formType: string
  ) => {
    if (selectedCustomer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === selectedCustomer.id
            ? { ...c, ...data }
            : c
        )
      );
      setNotif({ open: true, message: "Müşteri güncellendi.", severity: "success" });
    } else {
      const newCustomer: Customer = {
        id: customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1,
        ...data,
      };
      setCustomers((prev) => [...prev, newCustomer]);
      setNotif({ open: true, message: "Müşteri eklendi.", severity: "success" });
    }
    setDialogOpen(false);
  };

  // Sil
  const handleDelete = () => {
    if (selectedCustomer) {
      setCustomers((prev) => prev.filter((c) => c.id !== selectedCustomer.id));
      setNotif({ open: true, message: "Müşteri silindi.", severity: "info" });
      setDialogOpen(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 4 } }}>
      {/* Başlık ve Ekle Butonu */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Müşteri Yönetimi
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Müşterilerinizi yönetin, ekleyin, düzenleyin veya silin.
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            minWidth: 140,
            fontWeight: 600,
          }}
        >
          Müşteri Ekle
        </Button>
      </Box>

      {/* Tablo */}
      <TableContainer
        component={Paper}
        sx={{
          background: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: "none",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
                Ad
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
                Soyad
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
                E-posta
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
                Telefon
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
                Tip
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
                İşlemler
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell sx={{ color: theme.palette.text.primary }}>{c.name}</TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>{c.surname}</TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>{c.email}</TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>{c.phone}</TableCell>
                <TableCell sx={{ color: theme.palette.text.primary, textTransform: "capitalize" }}>
                  {c.type}
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(c)}
                    sx={{
                      color: theme.palette.mode === "dark" ? "#ffb400" : theme.palette.primary.main,
                      fontWeight: 600,
                      minWidth: 0,
                      p: 0,
                      mr: 2,
                    }}
                  >
                    Düzenle
                  </Button>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => { setSelectedCustomer(c); setDialogOpen(true); }}
                    sx={{ fontWeight: 600, minWidth: 0, p: 0 }}
                  >
                    Sil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {customers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: theme.palette.text.secondary }}>
                  Hiç müşteri yok.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <AddEditAddress
        open={dialogOpen}
        setOpen={setDialogOpen}
        data={
          selectedCustomer
            ? {
              firstName: selectedCustomer.name,
              lastName: selectedCustomer.surname,
              email: selectedCustomer.email,
              landmark: selectedCustomer.phone,
              type: selectedCustomer.type,
              companyName: selectedCustomer.companyName,
            }
            : undefined
        }
        onSave={handleSave}
        onDelete={selectedCustomer ? handleDelete : undefined}
      />

      {/* Bildirim */}
      <Snackbar
        open={notif.open}
        autoHideDuration={4000}
        onClose={() => setNotif({ ...notif, open: false })}
      >
        <Alert
          onClose={() => setNotif({ ...notif, open: false })}
          severity={notif.severity as any}
        >
          {notif.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MusterilerPage;
