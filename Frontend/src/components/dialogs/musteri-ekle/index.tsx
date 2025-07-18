import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import classnames from 'classnames'
import type { CustomInputVerticalData } from '@core/components/custom-inputs/types'
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import DeleteConfirmDialog from '../DeleteConfirmDialog'

type AddEditAddressData = {
  firstName?: string
  lastName?: string
  companyName?: string
  email?: string
  country?: string
  address1?: string
  address2?: string
  landmark?: string
  city?: string
  state?: string
  zipCode?: string
}

type AddEditAddressProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: AddEditAddressData
  onSave: (data: { name: string; surname: string; email?: string; phone: string }, type: string) => void
  onDelete?: () => void
}

const countries = ['', 'Müşteri', 'Potansiyel Müşteri']

const initialAddressData: AddEditAddressData = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  country: 'müşteri',
  address1: '',
  address2: '',
  landmark: '',
  city: '',
  state: '',
  zipCode: ''
}

const customInputData: CustomInputVerticalData[] = [
  {
    title: 'Bireysel',
    content: '',
    value: 'home',
    isSelected: true,
    asset: 'tabler-user'
  },
  {
    title: 'Kurumsal',
    content: '',
    value: 'office',
    asset: 'tabler-building-skyscraper'
  }
]

const AddEditAddress = ({ open, setOpen, data, onSave, onDelete }: AddEditAddressProps) => {
  const [selected, setSelected] = useState<string>(customInputData.find(item => item.isSelected)?.value || '')
  const [addressData, setAddressData] = useState<AddEditAddressData>(initialAddressData)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Tüm verileri eksiksiz set et
  useEffect(() => {
    if (data) {
      setAddressData({
        ...initialAddressData,
        ...data,
        country: data.country || 'müşteri'
      })
      setSelected(data.companyName ? 'office' : customInputData.find(item => item.isSelected)?.value || '')
    } else {
      setAddressData({ ...initialAddressData })
      setSelected(customInputData.find(item => item.isSelected)?.value || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, data])

  const handleChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'string') {
      setSelected(prop)
    } else {
      setSelected((prop.target as HTMLInputElement).value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(
      {
        name: addressData.firstName || '',
        surname: addressData.lastName || '',
        email: addressData.email || undefined,
        phone: addressData.landmark || ''
      },
      selected
    )
    setOpen(false)
  }

  return (
    <>
      <Dialog
        open={open}
        maxWidth='md'
        scroll='body'
        onClose={() => {
          setOpen(false)
          setSelected(customInputData.find(item => item.isSelected)?.value || '')
        }}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
          {data ? 'Müşteri Düzenle' : 'Müşteri Ekle'}
          <Typography component='span' className='flex flex-col text-center'>
            {data ? '' : 'Proje eklemek için müşteri ekleyin'}
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent className='pbs-0 sm:pli-16'>
            <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
              <i className='tabler-x' />
            </DialogCloseButton>
            <Grid container spacing={6}>
              {customInputData.map((item, index) => {
                let asset
                if (item.asset && typeof item.asset === 'string') {
                  asset = <i className={classnames(item.asset, 'text-[28px]')} />
                }
                return (
                  <Grid item xs={12} sm={6} key={index}>
                    <CustomInputVertical
                      type='radio'
                      key={index}
                      data={{ ...item, asset }}
                      selected={selected}
                      name='addressType'
                      handleChange={handleChange}
                    />
                  </Grid>
                )
              })}
              {selected === 'office' && (
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    label='Şirket Adı'
                    name='companyName'
                    variant='outlined'
                    placeholder='Şirket adını giriniz'
                    value={addressData?.companyName || ''}
                    onChange={e => setAddressData({ ...addressData, companyName: e.target.value })}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Ad'
                  name='firstName'
                  variant='outlined'
                  placeholder='Ad giriniz'
                  value={addressData?.firstName}
                  onChange={e => setAddressData({ ...addressData, firstName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Soyad'
                  name='lastName'
                  variant='outlined'
                  placeholder='Soyadı giriniz'
                  value={addressData?.lastName}
                  onChange={e => setAddressData({ ...addressData, lastName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label='E-posta'
                  name='email'
                  variant='outlined'
                  placeholder='E-posta giriniz'
                  value={addressData?.email || ''}
                  onChange={e => setAddressData({ ...addressData, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  label='Müşteri Durumu'
                  name='country'
                  variant='outlined'
                  value={addressData?.country || 'müşteri'}
                  onChange={e => setAddressData({ ...addressData, country: e.target.value })}
                >
                  {countries.map((item, index) => (
                    <MenuItem key={index} value={index === 0 ? '' : item.toLowerCase().replace(/\s+/g, '-')}>
                      {item}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label='Adres'
                  name='address1'
                  variant='outlined'
                  placeholder='Adres Giriniz'
                  value={addressData?.address1}
                  onChange={e => setAddressData({ ...addressData, address1: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='GSM'
                  name='landmark'
                  variant='outlined'
                  placeholder='(0533) 000 00 00'
                  value={addressData?.landmark}
                  onChange={e => setAddressData({ ...addressData, landmark: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='İlçe'
                  name='city'
                  variant='outlined'
                  placeholder='İlçeye yapılacaksa'
                  value={addressData?.city}
                  onChange={e => setAddressData({ ...addressData, city: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
            <Button variant='contained' type='submit'>
              {data ? 'Güncelle' : 'Kaydet'}
            </Button>
            <Button
              variant='tonal'
              color='secondary'
              onClick={() => {
                setOpen(false)
                setSelected(customInputData.find(item => item.isSelected)?.value || '')
              }}
              type='reset'
            >
              İptal
            </Button>
            {data && onDelete && (
              <Button
                variant='outlined'
                color='error'
                onClick={() => setDeleteDialogOpen(true)}
              >
                Sil
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          setDeleteDialogOpen(false)
          onDelete && onDelete()
        }}
        title='Silme Onayı'
        description='Bu müşteriyi silmek istediğinize emin misiniz?'
      />
    </>
  )
}

export default AddEditAddress
