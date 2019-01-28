import {
  IntegrationExecutionContext,
  IntegrationInvocationEvent
} from '@jupiterone/jupiter-managed-integration-sdk';
import executionHandler from './index';
import initializeContext from './initializeContext';
import { USER_ENTITY_TYPE, DEVICE_ENTITY_TYPE, USER_DEVICE_RELATIONSHIP_TYPE } from './types';

jest.mock('./initializeContext');

test('executionHandler', async () => {
  const executionContext: any = {
    graph: {
      findEntitiesByType: jest.fn().mockResolvedValue([]),
      findRelationshipsByType: jest.fn().mockResolvedValue([])
    },
    persister: {
      processEntities: jest.fn().mockReturnValue([]),
      processRelationships: jest.fn().mockReturnValue([]),
      publishPersisterOperations: jest.fn().mockResolvedValue({})
    },
    provider: {
      fetchUsers: jest.fn().mockResolvedValue([]),
      fetchDevices: jest.fn().mockResolvedValue([])
    }
  };

  (initializeContext as jest.Mock).mockReturnValue(executionContext);

  await executionHandler({} as IntegrationExecutionContext<
    IntegrationInvocationEvent
  >);

  expect(executionContext.graph.findEntitiesByType).toHaveBeenCalledWith(USER_ENTITY_TYPE);
  expect(executionContext.graph.findEntitiesByType).toHaveBeenCalledWith(DEVICE_ENTITY_TYPE);
  expect(executionContext.graph.findRelationshipsByType).toHaveBeenCalledWith(USER_DEVICE_RELATIONSHIP_TYPE);

  expect(executionContext.provider.fetchUsers).toHaveBeenCalledTimes(1);
  expect(executionContext.provider.fetchDevices).toHaveBeenCalledTimes(1);

  expect(executionContext.persister.processEntities).toHaveBeenCalledTimes(2);
  expect(executionContext.persister.processRelationships).toHaveBeenCalledTimes(1);
  expect(executionContext.persister.publishPersisterOperations).toHaveBeenCalledTimes(1);
});
