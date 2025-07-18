import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Divider
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

type OdaUrun = {
  ad: string;
  olcu: string;
  malzeme: string;
  renk: string;
  adet: number;
};

type Oda = {
  ad: string;
  urunler: OdaUrun[];
};

type ProjeForm = {
  musteriAdi: string;
  projeAdi: string;
  aciklama: string;
  adres: string;
  baslangicTarihi: string;
  teslimTarihi: string;
  odalar: Oda[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProjeForm) => void;
  musteriAdi?: string; // Eğer müşteri seçilmişse
};

export default function YeniProjeEkleModal({
                                             open,
                                             onClose,
                                             onSave,
                                             musteriAdi = "",
                                           }: Props) {
  const [form, setForm] = useState<ProjeForm>({
    musteriAdi: musteriAdi,
    projeAdi: "",
    aciklama: "",
    adres: "",
    baslangicTarihi: "",
    teslimTarihi: "",
    odalar: [],
  });

  // Oda ekle
  const handleAddOda = () => {
    setForm(f => ({
      ...f,
      odalar: [
        ...f.odalar,
        {
          ad: "",
          urunler: [],
        },
      ],
    }));
  };

  // Oda sil
  const handleRemoveOda = (idx: number) => {
    setForm(f => ({
      ...f,
      odalar: f.odalar.filter((_, i) => i !== idx),
    }));
  };

  // Oda adı güncelle
  const handleOdaChange = (idx: number, value: string) => {
    setForm(f => ({
      ...f,
      odalar: f.odalar.map((oda, i) =>
        i === idx ? { ...oda, ad: value } : oda
      ),
    }));
  };

  // Odaya ürün ekle
  const handleAddUrun = (odaIdx: number) => {
    setForm(f => ({
      ...f,
      odalar: f.odalar.map((oda, i) =>
        i === odaIdx
          ? {
            ...oda,
            urunler: [
              ...oda.urunler,
              { ad: "", olcu: "", malzeme: "", renk: "", adet: 1 },
            ],
          }
          : oda
      ),
    }));
  };

  // Ürün sil
  const handleRemoveUrun = (odaIdx: number, urunIdx: number) => {
    setForm(f => ({
      ...f,
      odalar: f.odalar.map((oda, i) =>
        i === odaIdx
          ? {
            ...oda,
            urunler: oda.urunler.filter((_, j) => j !== urunIdx),
          }
          : oda
      ),
    }));
  };

  // Ürün alanı değişikliği
  const handleUrunChange = (
    odaIdx: number,
    urunIdx: number,
    field: keyof OdaUrun,
    value: string | number
  ) => {
    setForm(f => ({
      ...f,
      odalar: f.odalar.map((oda, i) =>
        i === odaIdx
          ? {
            ...oda,
            urunler: oda.urunler.map((urun, j) =>
              j === urunIdx ? { ...urun, [field]: value } : urun
            ),
          }
          : oda
      ),
    }));
  };

  // Form alan değişikliği
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  // Temizle
  const handleClose = () => {
    setForm({
      musteriAdi: musteriAdi,
      projeAdi: "",
      aciklama: "",
      adres: "",
      baslangicTarihi: "",
      teslimTarihi: "",
      odalar: [],
    });
    onClose();
  };

  // Kaydet
  const handleSave = () => {
    onSave(form);
    handleClose();
  };

  // Basit validasyon
  const isFormValid =
    form.projeAdi.trim() &&
    form.baslangicTarihi &&
    form.teslimTarihi &&
    form.odalar.length > 0 &&
    form.odalar.every(o => o.ad && o.urunler.length > 0);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Yeni Proje Ekle</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Müşteri Adı"
            name="musteriAdi"
            value={form.musteriAdi}
            onChange={handleChange}
            disabled={!!musteriAdi}
            fullWidth
            required
          />
          <TextField
            label="Proje Adı"
            name="projeAdi"
            value={form.projeAdi}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Başlangıç Tarihi"
            type="date"
            name="baslangicTarihi"
            value={form.baslangicTarihi}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />
          <TextField
            label="Teslim Tarihi"
            type="date"
            name="teslimTarihi"
            value={form.teslimTarihi}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />
        </Box>
        <TextField
          label="Adres"
          name="adres"
          value={form.adres}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={2}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Proje Açıklaması"
          name="aciklama"
          value={form.aciklama}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={2}
          sx={{ mb: 3 }}
        />

        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Odalar / Modüller
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddOda}
              size="small"
            >
              Oda/Modül Ekle
            </Button>
          </Box>
          {form.odalar.length === 0 && (
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Projede henüz oda/modül yok.
            </Typography>
          )}
          {form.odalar.map((oda, oIdx) => (
            <Box
              key={oIdx}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                mb: 3,
                background: "#f7f9fb",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <TextField
                  label={`Oda/Modül Adı`}
                  value={oda.ad}
                  onChange={e => handleOdaChange(oIdx, e.target.value)}
                  sx={{ flexGrow: 1, mr: 2 }}
                  required
                />
                <IconButton
                  onClick={() => handleRemoveOda(oIdx)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => handleAddUrun(oIdx)}
                  size="small"
                  sx={{ ml: 2 }}
                >
                  Ürün/Kalem Ekle
                </Button>
              </Box>
              {oda.urunler.length === 0 && (
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  Bu oda/modülde ürün yok.
                </Typography>
              )}
              {oda.urunler.map((urun, uIdx) => (
                <Box
                  key={uIdx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <TextField
                    label="Ürün/Kalem Adı"
                    value={urun.ad}
                    onChange={e =>
                      handleUrunChange(oIdx, uIdx, "ad", e.target.value)
                    }
                    sx={{ minWidth: 150, flex: 2 }}
                    required
                  />
                  <TextField
                    label="Ölçü"
                    value={urun.olcu}
                    onChange={e =>
                      handleUrunChange(oIdx, uIdx, "olcu", e.target.value)
                    }
                    sx={{ minWidth: 100, flex: 1 }}
                  />
                  <TextField
                    label="Malzeme"
                    value={urun.malzeme}
                    onChange={e =>
                      handleUrunChange(oIdx, uIdx, "malzeme", e.target.value)
                    }
                    sx={{ minWidth: 100, flex: 1 }}
                  />
                  <TextField
                    label="Renk"
                    value={urun.renk}
                    onChange={e =>
                      handleUrunChange(oIdx, uIdx, "renk", e.target.value)
                    }
                    sx={{ minWidth: 100, flex: 1 }}
                  />
                  <TextField
                    label="Adet"
                    type="number"
                    value={urun.adet}
                    onChange={e =>
                      handleUrunChange(
                        oIdx,
                        uIdx,
                        "adet",
                        Number(e.target.value)
                      )
                    }
                    sx={{ width: 80 }}
                    inputProps={{ min: 1 }}
                    required
                  />
                  <IconButton
                    onClick={() => handleRemoveUrun(oIdx, uIdx)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </DialogContent>
      <Divider sx={{ mb: -2 }} />
      <DialogActions sx={{ px: 3, pb: 2, pt: 2 }}>
        <Button onClick={handleClose} color="secondary">
          Vazgeç
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={!isFormValid}
        >
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
}
