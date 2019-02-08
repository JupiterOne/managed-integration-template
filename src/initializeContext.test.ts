import initializeContext from './initializeContext';
import { createTestIntegrationExecutionContext } from '@jupiterone/jupiter-managed-integration-sdk';

test('creates provider client', () => {
  const executionContext = createTestIntegrationExecutionContext();
  const integrationContext = initializeContext(executionContext);
  expect(integrationContext.provider).toBeDefined();
});