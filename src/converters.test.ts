import {
  createDeviceEntities,
  createUserDeviceRelationships,
  createUserEntities
} from './converters';
import { Device, User } from './ProviderClient';
import {
  DEVICE_ENTITY_CLASS,
  DEVICE_ENTITY_TYPE,
  USER_DEVICE_RELATIONSHIP_CLASS,
  USER_DEVICE_RELATIONSHIP_TYPE,
  USER_ENTITY_CLASS,
  USER_ENTITY_TYPE
} from './types';

const users: User[] = [
  {
    id: 'user-1',
    firstName: 'fname',
    lastName: 'lname'
  }
];

const devices: Device[] = [
  {
    id: 'device-1',
    manufacturer: 'man-1',
    ownerId: 'user-1'
  }
];

test('createUserEntities', () => {
  expect(createUserEntities(users)).toEqual([
    {
      _key: 'provider-user-user-1',
      _type: USER_ENTITY_TYPE,
      _class: USER_ENTITY_CLASS,
      userId: 'user-1',
      displayName: 'fname lname'
    }
  ]);
});

test('createDeviceEntities', () => {
  expect(createDeviceEntities(devices)).toEqual([
    {
      _key: 'provider-device-id-device-1',
      _type: DEVICE_ENTITY_TYPE,
      _class: DEVICE_ENTITY_CLASS,
      deviceId: 'device-1',
      ownerId: 'user-1',
      displayName: 'man-1'
    }
  ]);
});

test('createUserDeviceRelationships', () => {
  const userEntities = createUserEntities(users);
  const deviceEntities = createDeviceEntities(devices);
  expect(createUserDeviceRelationships(userEntities, deviceEntities)).toEqual([
    {
      _key: `provider-user-user-1_has_provider-device-id-device-1`,
      _type: USER_DEVICE_RELATIONSHIP_TYPE,
      _class: USER_DEVICE_RELATIONSHIP_CLASS,
      _fromEntityKey: 'provider-user-user-1',
      _toEntityKey: 'provider-device-id-device-1'
    }
  ]);
});
