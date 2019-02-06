import { RelationshipFromIntegration } from '@jupiterone/jupiter-managed-integration-sdk';
import { Device, User } from './ProviderClient';
import {
  DEVICE_ENTITY_CLASS,
  DEVICE_ENTITY_TYPE,
  DeviceEntity,
  USER_DEVICE_RELATIONSHIP_CLASS,
  USER_DEVICE_RELATIONSHIP_TYPE,
  USER_ENTITY_CLASS,
  USER_ENTITY_TYPE,
  UserEntity
} from './types';

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
