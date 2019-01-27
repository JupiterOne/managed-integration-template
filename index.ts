import {
  IntegrationExecutionContext,
  IntegrationExecutionResult,
  IntegrationInvocationEvent
} from '@jupiterone/jupiter-managed-integration-sdk';
import {
  createDeviceEntities,
  createUserDeviceRelationships,
  createUserEntities,
  DEVICE_ENTITY_TYPE,
  DeviceEntity,
  USER_DEVICE_RELATIONSHIP_TYPE,
  USER_ENTITY_TYPE,
  UserEntity
} from './converters';
import * as provider from './provider';

export default async function executionHandler(
  context: IntegrationExecutionContext<IntegrationInvocationEvent>
): Promise<IntegrationExecutionResult> {
  const { graph, persister } = context.clients.getClients();

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
    fetchUserEntitiesFromProvider(),
    fetchDeviceEntitiesFromProvider()
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

async function fetchUserEntitiesFromProvider(): Promise<UserEntity[]> {
  return createUserEntities(await provider.fetchUsers());
}

async function fetchDeviceEntitiesFromProvider(): Promise<DeviceEntity[]> {
  return createDeviceEntities(await provider.fetchDevices());
}
