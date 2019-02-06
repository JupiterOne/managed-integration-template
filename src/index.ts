import {
  IntegrationExecutionContext,
  IntegrationExecutionResult,
  IntegrationInvocationEvent
} from '@jupiterone/jupiter-managed-integration-sdk';
import {
  createDeviceEntities,
  createUserDeviceRelationships,
  createUserEntities
} from './converters';
import initializeContext from './initializeContext';
import ProviderClient from './ProviderClient';
import {
  DEVICE_ENTITY_TYPE,
  DeviceEntity,
  USER_DEVICE_RELATIONSHIP_TYPE,
  USER_ENTITY_TYPE,
  UserEntity
} from './types';

export default async function executionHandler(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>
): Promise<IntegrationExecutionResult> {
  const { graph, persister, provider } = initializeContext(context);

  const [
    oldUserEntities,
    oldDeviceEntities,
    oldUserDeviceRelationships,
    newUserEntities,
    newDeviceEntities
  ] = await Promise.all([
    graph.findEntitiesByType<UserEntity>(USER_ENTITY_TYPE),
    graph.findEntitiesByType<DeviceEntity>(DEVICE_ENTITY_TYPE),
    graph.findRelationshipsByType(USER_DEVICE_RELATIONSHIP_TYPE),
    fetchUserEntitiesFromProvider(provider),
    fetchDeviceEntitiesFromProvider(provider)
  ]);

  const newUserDeviceRelationships = createUserDeviceRelationships(
    newUserEntities,
    newDeviceEntities
  );

  return {
    operations: await persister.publishPersisterOperations([
      [
        ...persister.processEntities(oldUserEntities, newUserEntities),
        ...persister.processEntities(oldDeviceEntities, newDeviceEntities)
      ],
      persister.processRelationships(
        oldUserDeviceRelationships,
        newUserDeviceRelationships
      )
    ])
  };
}

async function fetchUserEntitiesFromProvider(
  provider: ProviderClient
): Promise<UserEntity[]> {
  return createUserEntities(await provider.fetchUsers());
}

async function fetchDeviceEntitiesFromProvider(
  provider: ProviderClient
): Promise<DeviceEntity[]> {
  return createDeviceEntities(await provider.fetchDevices());
}
