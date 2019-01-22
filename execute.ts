import {
  createLocalInvocationEvent,
  executeSingleHandlerLocal
} from '@jupiterone/jupiter-managed-integration-sdk';
import { createLogger, TRACE } from 'bunyan';
import executionHandler from './index';

async function run(): Promise<void> {
  const logger = createLogger({ name: 'local', level: TRACE });
  const integrationConfig = {};

  logger.info(
    await executeSingleHandlerLocal(
      integrationConfig,
      logger,
      executionHandler,
      createLocalInvocationEvent()
    ),
    'Execution completed successfully!'
  );
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
