/* eslint-disable lines-around-comment */
import { Modal, Box, Typography, Button, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useState, useEffect } from 'react'

export default function CustomerModal({ open, onClose, customer }) {
  const [type, setType] = useState('Bireysel')
  const [name, setName] = useState('')
  const [authorized, setAuthorized] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (customer) {
      setType(customer.type || 'Bireysel')
      setName(customer.name || '')
      setAuthorized(customer.authorized || '')
      setPhone(customer.phone || '')
      setEmail(customer.email || '')
      setAddress(customer.address || '')
    } else {
      setType('Bireysel')
      setName('')
      setAuthorized('')
      setPhone('')
      setEmail('')
      setAddress('')
    }
  }, [customer, open])

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Gerekirse tabloya veri eklemeyi ve güncellemeyi tamamlayacağız
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          minWidth: 400
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          {customer ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <RadioGroup row value={type} onChange={e => setType(e.target.value)}>
            <FormControlLabel value="Bireysel" control={<Radio />} label="Bireysel" />
            <FormControlLabel value="Kurumsal" control={<Radio />} label="Kurumsal" />
          </RadioGroup>
          <TextField
            label={type === 'Kurumsal' ? 'Şirket Adı' : 'Ad Soyad'}
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
          {type === 'Kurumsal' && (
            <TextField
              label="Yetkili Kişi"
              fullWidth
              value={authorized}
              onChange={e => setAuthorized(e.target.value)}
              sx={{ mt: 2 }}
              required
            />
          )}
          <TextField
            label="Telefon Numarası"
            fullWidth
            value={phone}
            onChange={e => setPhone(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
          <TextField
            label="E-mail"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Adres"
            fullWidth
            value={address}
            onChange={e => setAddress(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
            Kaydet
          </Button>
        </form>
      </Box>
    </Modal>
  )
}
