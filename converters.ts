import { User, Device } from './provider';
import {
  EntityFromIntegration,
  RelationshipFromIntegration
} from '@jupiterone/jupiter-managed-integration-sdk';

export const USER_ENTITY_TYPE = 'provider_user';
export const USER_ENTITY_CLASS = 'User';

export const DEVICE_ENTITY_TYPE = 'provider_device';
export const DEVICE_ENTITY_CLASS = 'Device';

export const USER_DEVICE_RELATIONSHIP_TYPE = 'provider_user_device';
export const USER_DEVICE_RELATIONSHIP_CLASS = 'HAS';

export interface UserEntity extends EntityFromIntegration {
  userId: string;
}

export interface DeviceEntity extends EntityFromIntegration {
  deviceId: string;
  ownerId: string;
}

export function createUserEntities(data: User[]): UserEntity[] {
  return data.map(d => ({
    _key: `provider-user-${d.id}`,
    _type: USER_ENTITY_TYPE,
    _class: USER_ENTITY_CLASS,
    userId: d.id,
    displayName: `${d.firstName} ${d.lastName}`
  }));
}

export function createDeviceEntities(data: Device[]): DeviceEntity[] {
  return data.map(d => ({
    _key: `provider-device-id-${d.id}`,
    _type: DEVICE_ENTITY_TYPE,
    _class: DEVICE_ENTITY_CLASS,
    deviceId: d.id,
    ownerId: d.ownerId,
    displayName: d.manufacturer
  }));
}

export function createUserDeviceRelationships(
  users: UserEntity[],
  devices: DeviceEntity[]
) {
  const usersById: { [id: string]: UserEntity } = {};
  for (const user of users) {
    usersById[user.userId] = user;
  }

  const relationships = [];
  for (const device of devices) {
    const user = usersById[device.ownerId];
    relationships.push(createUserDeviceRelationship(user, device));
  }

  return relationships;
}

function createUserDeviceRelationship(
  user: UserEntity,
  device: DeviceEntity
): RelationshipFromIntegration {
  return {
    _key: `${user._key}_has_${device._key}`,
    _type: USER_DEVICE_RELATIONSHIP_TYPE,
    _class: USER_DEVICE_RELATIONSHIP_CLASS,
    _fromEntityKey: user._key,
    _toEntityKey: device._key
  };
}
