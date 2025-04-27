export interface Contact {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  company?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function generateRandomContact(): Contact {
  return {
    firstName: `First${Math.floor(Math.random() * 1000)}`,
    lastName: `Last${Math.floor(Math.random() * 1000)}`,
    email: `test${Math.floor(Math.random() * 10000)}@example.com`,
    phone: `+1${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`,
    company: `Company ${Math.floor(Math.random() * 100)}`,
    address: {
      street: `${Math.floor(Math.random() * 9999)} Main St`,
      city: 'Anytown',
      state: 'ST',
      zip: `${Math.floor(Math.random() * 90000) + 10000}`,
      country: 'USA'
    },
    notes: `Random contact created for testing ${new Date().toISOString()}`
  };
}

export function generateRandomContacts(count: number = 1): Contact[] {
  return Array.from({ length: count }, () => generateRandomContact());
}