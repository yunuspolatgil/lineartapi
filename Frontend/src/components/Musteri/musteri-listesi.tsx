import * as React from 'react'

import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 50, align: 'center', headerAlign: 'center' },
  { field: 'name', headerName: 'Ad', flex: 1, minWidth: 150 },
  { field: 'surname', headerName: 'Soyad', flex: 1, minWidth: 150 },
  {
    field: 'actions',
    headerName: 'Aksiyonlar',
    flex: 0.7,
    minWidth: 120,
    renderCell: () => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', gap: 8 }}>
        <Tooltip title="Düzenle">
          <IconButton color="primary" size="small">
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sil">
          <IconButton color="error" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    ),
    sortable: false,
    filterable: false,
    align: 'right',
    headerAlign: 'right',
  },
]

const rows = [
  { id: 1, name: 'Ayşe', surname: 'Yılmaz' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' },
  { id: 2, name: 'Mobilya', surname: 'A.Ş.' }
]

export default function CustomerTable() {
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'

  return (
    <div style={{ width: '100%', minHeight: 300, overflowX: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 }  } } }
        pageSizeOptions={[5, 10, 20, 50]}
        disableColumnMenu
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: theme.palette.background.paper,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.primary.main,
            color: isLight ? '#333' : theme.palette.primary.contrastText, // Açık modda koyu gri
            fontWeight: 'bold',
            fontSize: 15,
            minHeight: 56,
            maxHeight: 56,
            display: 'flex',
            alignItems: 'center',
          },
          '& .MuiDataGrid-cell': {
            fontSize: 14,
            padding: '10px 8px',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
          },
        }}
      />
    </div>
  )
}
