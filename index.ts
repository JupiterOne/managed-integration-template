import {
  IntegrationExecutionResult,
  IntegrationInvocationContext,
  IntegrationInvocationEvent
} from '@jupiterone/jupiter-managed-integration-sdk';

export default async function(
  context: IntegrationInvocationContext<IntegrationInvocationEvent>
): Promise<IntegrationExecutionResult> {
  context.logger.info("Invoked!");
  return { operations: { created: 0, updated: 0, deleted: 0 } };
}
