// Frontend/src/components/dialogs/DeleteConfirmDialog.tsx
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'

type DeleteConfirmDialogProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
}

const DeleteConfirmDialog = ({
                               open,
                               onClose,
                               onConfirm,
                               title = 'Silme Onayı',
                               description = 'Bu kaydı silmek istediğinize emin misiniz?'
                             }: DeleteConfirmDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography>{description}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color='secondary'>İptal</Button>
      <Button onClick={onConfirm} color='error' variant='contained'>Sil</Button>
    </DialogActions>
  </Dialog>
)

export default DeleteConfirmDialog
