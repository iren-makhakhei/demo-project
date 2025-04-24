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
  
  // Simple arrays for generating random data
  const firstNames = ['John', 'Jane', 'Robert', 'Emma', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Emily'];
  const lastNames = ['Smith', 'Jones', 'Taylor', 'Brown', 'Wilson', 'Davies', 'Evans', 'Thomas', 'Johnson', 'Roberts'];
  const cities = ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow', 'Liverpool', 'Leeds', 'Bristol', 'Sheffield', 'Cardiff'];
  const counties = ['Greater London', 'Greater Manchester', 'West Midlands', 'Scotland', 'Scotland', 'Merseyside', 'West Yorkshire', 'Bristol', 'South Yorkshire', 'Wales'];
  const streets = ['High Street', 'Station Road', 'Main Street', 'Park Road', 'Church Road', 'London Road', 'Victoria Road', 'Green Lane', 'Manor Road', 'Church Street'];
  const postCodes = ['SW1A 1AA', 'M1 1AE', 'B1 1BB', 'EH1 1YZ', 'G1 1QD', 'L1 1JD', 'LS1 1UR', 'BS1 1UG', 'S1 1AA', 'CF10 1DD'];
  
  // Simple random selection function
  function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  // Generate a random date of birth (between 18 and 65 years old)
  function getRandomBirthdate(): string {
    const now = new Date();
    const minAge = 18;
    const maxAge = 65;
    const yearsAgo = minAge + Math.floor(Math.random() * (maxAge - minAge));
    const birthDate = new Date(now.getFullYear() - yearsAgo, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    return birthDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }
  
  // Generate a random phone number
  function getRandomPhone(): string {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
  }
  
  export function generateRandomContact(): Contact {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const streetNum = Math.floor(Math.random() * 100) + 1;
    
    return {
      firstName,
      lastName,
      birthdate: getRandomBirthdate(),
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: getRandomPhone(),
      street1: `${streetNum} ${getRandomItem(streets)}`,
      street2: `Apt ${Math.floor(Math.random() * 100) + 1}`,
      city: getRandomItem(cities),
      state: getRandomItem(counties),
      postalCode: getRandomItem(postCodes),
      country: 'UK'
    };
  }
  
  export function generateRandomContacts(count: number = 1): Contact[] {
    return Array.from({ length: count }, () => generateRandomContact());
  }