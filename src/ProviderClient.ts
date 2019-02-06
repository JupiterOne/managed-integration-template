export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Device {
  id: string;
  manufacturer: string;
  ownerId: string;
}

export default class ProviderClient {
  async fetchDevices(): Promise<Device[]> {
    return [
      {
        id: 'device-a',
        manufacturer: 'Manufacturer A',
        ownerId: 'user-a'
      },
      {
        id: 'device-b',
        manufacturer: 'Manufacturer B',
        ownerId: 'user-b'
      }
    ];
  }

  async fetchUsers(): Promise<User[]> {
    return [
      {
        id: 'user-a',
        firstName: 'User',
        lastName: 'A'
      },
      {
        id: 'user-b',
        firstName: 'User',
        lastName: 'B'
      }
    ];
  }
};
