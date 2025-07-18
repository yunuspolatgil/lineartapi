import axios from 'axios'

const API_URL = 'https://localhost:44354/api/customers'

export const getCustomers = () => axios.get(API_URL)
export const addCustomer = (data: Customer) => axios.post(API_URL, data)
export const updateCustomer = (id: number, data: Customer) => axios.put(`${API_URL}/${id}`, data)
export const deleteCustomer = (id: number) => axios.delete(`${API_URL}/${id}`)

export type Customer = {
  id?: number
  name: string
  surname: string
  email: string
  phone: string
  createdAt?: string
}
