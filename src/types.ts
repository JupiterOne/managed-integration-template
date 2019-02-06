import {
  EntityFromIntegration,
  GraphClient,
  IntegrationExecutionContext,
  IntegrationInvocationEvent,
  PersisterClient
} from '@jupiterone/jupiter-managed-integration-sdk';
import ProviderClient from './ProviderClient';

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

export interface ExampleExecutionContext
  extends IntegrationExecutionContext<IntegrationInvocationEvent> {
  graph: GraphClient;
  persister: PersisterClient;
  provider: ProviderClient;
}
