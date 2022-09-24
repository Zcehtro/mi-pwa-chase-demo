import { UserEntry } from '../pages/api/signup';

interface SeedData {
  seed: UserEntry[];
}

export const seedData: SeedData = {
  seed: [
    {
      name: 'admin',
      surname: 'admin',
      email: 'admin@admin.com',
      password: '123',
      devices: ['iThing4', 'iThing57'],
    },
  ],
};
