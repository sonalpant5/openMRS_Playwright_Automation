import { faker } from '@faker-js/faker';

export const randomService = () => ({
  name: `svc-${faker.string.alphanumeric(8)}`,
  description: faker.lorem.sentence()
});

export const randomPatient = () => {
  const birthDate = faker.date.birthdate({ min: 18, max: 80, mode: 'age' });
  const day = String(birthDate.getDate()).padStart(2, '0');
  const month = String(birthDate.getMonth() + 1);
  const year = String(birthDate.getFullYear());

  return {
    givenName: faker.person.firstName(),
    middleName: faker.datatype.boolean() ? faker.person.firstName() : undefined,
    familyName: faker.person.lastName(),
    gender: faker.helpers.arrayElement(['Male', 'Female']),
    day,
    month,
    year,
    address: faker.location.streetAddress(),
    address2: faker.datatype.boolean() ? faker.location.secondaryAddress() : undefined,
    cityVillage: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postalCode: faker.location.zipCode(),
    phoneNumber: faker.string.numeric(10),
    relationship: faker.helpers.arrayElement(['Doctor', 'Sibling', 'Parent', 'Aunt/Uncle', 
      'Supervisor', 'Patient', 'Child', 'Niece/Nephew', 'Supervisee']),
    relatedPersonName: faker.person.fullName()
  };
};
