"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Card,
  CardContent,
  Stack,
  Divider,
  CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MusteriTablosu from "./MusteriTablosu";
import AddEditAddress from "@/components/dialogs/musteri-ekle";
import CustomToast from "@/components/common/CustomToast";

type Customer = {
  id: number;
  name: string;
  surname: string;
  email?: string;
  phone: string;
  type?: "bireysel" | "kurumsal";
  companyName?: string;
};

const STORAGE_KEY = "musteri-listesi";

const MusterilerPage = () => {
  const theme = useTheme();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
    confirm?: boolean;
    onConfirm?: (() => void) | undefined;
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  // İlk yüklemede localStorage'dan oku
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setCustomers(JSON.parse(saved));
        } catch {
          setCustomers([]);
        }
      } else {
        setCustomers([
          {
            id: 1,
            name: "Yunis",
            surname: "Polatgil",
            email: "jejuwoodamz@gmail.com",
            phone: "05307947958",
            type: "bireysel",
          }
        ]);
      }
      setLoading(false);
    }
  }, []);

  // Her değişimde localStorage'a yaz
  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    }
  }, [customers, loading]);

  const handleAdd = () => {
    setSelectedCustomer(undefined);
    setDialogOpen(true);
  };

  const handleDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDialogOpen(true);
  };

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
      setToast({
        open: true,
        message: "Müşteri güncellendi.",
        severity: "success",
      });
    } else {
      const newCustomer: Customer = {
        id: customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1,
        ...data,
      };
      setCustomers((prev) => [...prev, newCustomer]);
      setToast({
        open: true,
        message: "Müşteri eklendi.",
        severity: "success",
      });
    }
    setDialogOpen(false);
  };

  const handleDeleteAsk = () => {
    setToast({
      open: true,
      message: "Bu müşteriyi silmek istediğinize emin misiniz?",
      severity: "warning",
      confirm: true,
      onConfirm: handleDeleteConfirmed,
    });
  };

  const handleDeleteConfirmed = () => {
    if (selectedCustomer) {
      setCustomers((prev) => prev.filter((c) => c.id !== selectedCustomer.id));
      setToast({
        open: true,
        message: "Müşteri silindi.",
        severity: "info",
      });
      setDialogOpen(false);
      setSelectedCustomer(undefined);
    }
  };

  return (
    <Box sx={{ p: { xs: 1, md: 4 }, width: "100%" }}>
      <Card
        sx={{
          borderRadius: 5,
          boxShadow: "none",
          background: theme.palette.mode === "dark" ? "#2d2f45" : "#fff",
          p: 0,
          maxWidth: 1150,
          mx: "auto",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, sm: 4 },
            pb: { xs: 2, sm: 3 },
          }}
        >
          {/* Başlık ve Ekle Butonu */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2, pb: 2 }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  mb: 0.2
                }}
              >
                Müşteri Yönetimi
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 400,
                }}
              >
                Müşterilerinizi yönetin, ekleyin, düzenleyin veya silin.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              startIcon={<AddIcon />}
              sx={{
                minWidth: 140,
                fontWeight: 600,
                px: 3,
                py: 1.2,
                fontSize: 14,
                // background ve color kaldırıldı, tema üzerinden gelecek
                boxShadow: "0 1px 7px 0 #0001",
              }}
            >
              Müşteri Ekle
            </Button>
          </Stack>
          <Divider sx={{ mb: 0, borderColor: theme.palette.divider, opacity: 0.6 }} />
          {/* Tablo yükleniyor göstergesi */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
              <CircularProgress />
            </Box>
          ) : (
            <MusteriTablosu customers={customers} onDetail={handleDetail} />
          )}
        </CardContent>
      </Card>

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
        onDelete={selectedCustomer ? handleDeleteAsk : undefined}
      />

      {/* Toast */}
      <CustomToast
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
        confirm={toast.confirm}
        onConfirm={toast.onConfirm}
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        sound ={true}// veya sound={false} (istersen kapatabilirsin)
      />
    </Box>
  );
};

export default MusterilerPage;
