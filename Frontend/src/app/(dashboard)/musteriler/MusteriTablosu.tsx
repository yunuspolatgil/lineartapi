import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  useTheme,
  Chip,
  Box,
  Typography,
  TextField,
  InputAdornment,
  TablePagination
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

type Customer = {
  id: number;
  name: string;
  surname: string;
  email?: string;
  phone: string;
  type?: "bireysel" | "kurumsal";
  companyName?: string;
};

type Props = {
  customers: Customer[];
  onDetail: (customer: Customer) => void;
};

const getRowBackground = (theme: any, idx: number) => {
  if (theme.palette.mode === "dark") {
    return idx % 2 === 1 ? "#31334a" : "#27293d";
  }
  return idx % 2 === 1 ? "#f6f7fa" : "#fff";
};

const MusteriTablosu = ({ customers, onDetail }: Props) => {
  const theme = useTheme();

  // Arama ve sayfalama state
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Arama filtrelemesi
  const filtered = React.useMemo(() => {
    if (!search) return customers;
    const lower = search.toLowerCase();
    return customers.filter(c =>
      c.name?.toLowerCase().includes(lower) ||
      c.surname?.toLowerCase().includes(lower) ||
      c.email?.toLowerCase().includes(lower) ||
      c.phone?.toLowerCase().includes(lower) ||
      c.companyName?.toLowerCase().includes(lower)
    );
  }, [customers, search]);

  // Sayfalama için slice
  const paged = React.useMemo(
    () => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filtered, page, rowsPerPage]
  );

  // Sayfa değişimlerini yönet
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <TextField
          size="small"
          placeholder="Ara..."
          variant="outlined"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
          sx={{
            width: { xs: "100%", sm: 300 },
            background: theme.palette.background.default,
            borderRadius: 2,
            "& fieldset": { border: "none" }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer sx={{ border: "none", background: "transparent", mt: 0 }}>
        <Table sx={{ minWidth: 650, borderCollapse: "separate", borderSpacing: 0 }}>
          <TableHead>
            <TableRow
              sx={{
                background: "transparent",
                "& th": {
                  color: theme.palette.text.primary,
                  fontWeight: 700,
                  fontSize: 16,
                  background: "transparent",
                  borderBottom: `1px solid ${theme.palette.divider}`
                }
              }}
            >
              <TableCell>Ad</TableCell>
              <TableCell>Soyad</TableCell>
              <TableCell>E-posta</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Tip</TableCell>
              <TableCell align="center">Aksiyon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map((c, idx) => (
              <TableRow
                key={c.id}
                hover
                sx={{
                  background: getRowBackground(theme, idx),
                  borderRadius: 3,
                  transition: "background 0.2s, box-shadow 0.2s",
                  "& td": {
                    border: "none",
                    fontSize: 15,
                    color: theme.palette.text.primary,
                    py: 2.5,
                    px: 2,
                  },
                  "&:hover": {
                    background: theme.palette.action.hover,
                    boxShadow: "0 2px 16px 0 #0002",
                  }
                }}
              >
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.surname}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>
                  <Chip
                    icon={
                      c.type === "kurumsal" ? (
                        <BusinessIcon sx={{ fontSize: 18 }} />
                      ) : (
                        <PersonIcon sx={{ fontSize: 18 }} />
                      )
                    }
                    label={
                      c.type === "kurumsal" ? "Kurumsal" : "Bireysel"
                    }
                    color="primary"
                    size="medium"
                    variant="filled"
                    sx={{
                      fontWeight: 450,
                      px: 1.2,
                      letterSpacing: 0.2,
                      fontSize: 11,
                      borderRadius: 0.8,
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      boxShadow: "0 2px 8px 0 #0001",
                      "& .MuiChip-icon": { color: theme.palette.primary.contrastText }
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Detaylar">
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        background: theme.palette.action.hover,
                        p: 1,
                        boxShadow: "0 2px 8px 0 #0001",
                        transition: "background 0.2s",
                        "&:hover": {
                          background: theme.palette.primary.main,
                          "& .MuiSvgIcon-root": { color: theme.palette.primary.contrastText }
                        }
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => onDetail(c)}
                        sx={{
                          color: theme.palette.primary.main,
                          p: 0,
                          "&:hover": { background: "transparent" }
                        }}
                      >
                        <InfoOutlinedIcon fontSize="medium" />
                      </IconButton>
                    </Box>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {paged.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: theme.palette.text.secondary }}>
                  Sonuç bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Sayfalama */}
      <Box sx={{ mt: 1 }}>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50]}
          showFirstButton
          showLastButton
          sx={{
            ".MuiTablePagination-toolbar": {
              background: "transparent",
              px: 0,
              color: theme.palette.text.secondary,
            },
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
              fontSize: 14,
            },
            ".MuiTablePagination-actions": {
              color: theme.palette.text.secondary,
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default MusteriTablosu;
