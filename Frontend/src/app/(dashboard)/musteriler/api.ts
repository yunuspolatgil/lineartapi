import axios from "axios";

export interface Customer {
  id: number;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  type?: string;
  companyName?: string;
  createdAt?: string;
}

const API_URL = "https://localhost:44354/api/customers";

export const fetchCustomers = async (): Promise<Customer[]> => {
  const { data } = await axios.get<Customer[]>(API_URL);
  return data;
};

export const createCustomer = async (
  customer: Omit<Customer, "id" | "createdAt">
): Promise<Customer> => {
  const { data } = await axios.post<Customer>(API_URL, customer);
  return data;
};

export const updateCustomer = async (
  id: number,
  customer: Omit<Customer, "id" | "createdAt">
): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, { ...customer, id });
};

export const deleteCustomer = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
