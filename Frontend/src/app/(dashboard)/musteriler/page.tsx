"use client";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer, Customer } from "./api";
import AddEditAddress from "@/components/dialogs/musteri-ekle";
import { Button, Snackbar, Alert, Typography, Box, CircularProgress, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// En yukarıya ekle
const localeText = {
  noRowsLabel: 'Kayıt yok',
  columnMenuLabel: 'Menü',
  columnMenuShowColumns: 'Kolonları Göster',
  columnMenuFilter: 'Filtrele',
  columnMenuHideColumn: 'Kolonu Gizle',
  columnMenuUnsort: 'Sıralamayı kaldır',
  columnMenuSortAsc: 'Artan sırala',
  columnMenuSortDesc: 'Azalan sırala',
  // İstersen daha fazlasını ekleyebilirsin!
};


const MusterilerPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [notif, setNotif] = useState<{ open: boolean; message: string; severity: "success" | "error"}>({open: false, message: "", severity: "success"});

  const theme = useTheme();

  const getList = async () => {
    setLoading(true);
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch {
      setNotif({open: true, message: "Müşteriler yüklenemedi.", severity: "error"});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getList(); }, []);

  const handleAdd = () => {
    setSelectedCustomer(null);
    setDialogOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDialogOpen(true);
  };

  const handleSave = async (
    data: { name: string; surname: string; email: string; phone: string },
    type: string
  ) => {
    try {
      if (!data.email) {
        setNotif({ open: true, message: "E-posta zorunludur.", severity: "error" });
        return;
      }
      if (selectedCustomer) {
        await updateCustomer(selectedCustomer.id, data);
        setNotif({open: true, message: "Müşteri güncellendi.", severity: "success"});
      } else {
        await createCustomer(data);
        setNotif({open: true, message: "Müşteri eklendi.", severity: "success"});
      }
      setDialogOpen(false);
      getList();
    } catch {
      setNotif({open: true, message: "Hata oluştu.", severity: "error"});
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedCustomer) {
        await deleteCustomer(selectedCustomer.id);
        setNotif({open: true, message: "Müşteri silindi.", severity: "success"});
        setDialogOpen(false);
        getList();
      }
    } catch {
      setNotif({open: true, message: "Silme sırasında hata oluştu.", severity: "error"});
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Ad", flex: 1 },
    { field: "surname", headerName: "Soyad", flex: 1 },
    { field: "email", headerName: "E-posta", flex: 1 },
    { field: "phone", headerName: "Telefon", flex: 1 },
    { field: "createdAt", headerName: "Oluşturulma", flex: 1,
      valueFormatter: ({ value }) => value ? new Date(value).toLocaleString("tr-TR") : ""
    },
    {
      field: "actions",
      type: "actions",
      headerName: "İşlemler",
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon />} label="Düzenle" onClick={() => handleEdit(params.row)} />,
        <GridActionsCellItem icon={<DeleteIcon color="error" />} label="Sil" onClick={() => {setSelectedCustomer(params.row); setDialogOpen(true);}} />
      ],
      flex: 1,
    }
  ];

  return (
    <Box sx={{
      p: { xs: 1, sm: 3 },
      height: "calc(100vh - 150px)",
      bgcolor: theme.palette.background.paper,
      borderRadius: 2,
      "& .MuiDataGrid-root": { bgcolor: theme.palette.background.default }
    }}>
      <Typography variant="h4" gutterBottom>Müşteriler</Typography>
      <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>Müşteri Ekle</Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={customers}
          columns={columns}
          autoHeight
          sx={{
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.grey[300],
              color: theme.palette.text.primary,
            },
            "& .MuiDataGrid-row": {
              bgcolor: theme.palette.background.paper,
            },
            "& .MuiDataGrid-cell": {
              borderColor: theme.palette.divider,
            },
          }}
          paginationModel={{ pageSize: 10, page: 0 }}
          onPaginationModelChange={(model) => console.log(model)}
          rowHeight={48}
          localeText={localeText}  // ← BURAYI EKLE!
          getRowId={(row) => row.id}
        />
      )}

      <AddEditAddress
        open={dialogOpen}
        setOpen={setDialogOpen}
        data={selectedCustomer ? {
          firstName: selectedCustomer.name,
          lastName: selectedCustomer.surname,
          email: selectedCustomer.email,
          landmark: selectedCustomer.phone
        } : undefined}
        onSave={handleSave}
        onDelete={selectedCustomer ? handleDelete : undefined}
      />
      <Snackbar open={notif.open} autoHideDuration={4000} onClose={() => setNotif({...notif, open: false})}>
        <Alert onClose={() => setNotif({...notif, open: false})} severity={notif.severity} sx={{ width: '100%' }}>
          {notif.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MusterilerPage;
