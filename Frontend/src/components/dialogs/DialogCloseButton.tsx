import IconButton from '@mui/material/IconButton'
import type { IconButtonProps } from '@mui/material/IconButton'

const DialogCloseButton = (props: IconButtonProps) => (
  <IconButton
    aria-label='Kapat'
    sx={{
      position: 'absolute',
      right: 8,
      top: 8,
      color: (theme) => theme.palette.grey[500]
    }}
    {...props}
  >
    {props.children || <i className='tabler-x' />}
  </IconButton>
)

export default DialogCloseButton
