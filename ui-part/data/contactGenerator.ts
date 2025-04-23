//import { faker } from '@faker-js/faker/locale/en_GB';

import { fakerEN_GB as faker } from '@faker-js/faker';

export interface Contact {
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export function generateRandomContact(): Contact {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    firstName,
    lastName,
    birthdate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.string.numeric(10),
    street1: faker.location.streetAddress(),
    street2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.county(),
    postalCode: faker.location.zipCode(),
    country: 'UK'
  };
}

export function generateRandomContacts(count: number = 1): Contact[] {
  return Array.from({ length: count }, () => generateRandomContact());
}