import {
  executeSingleHandlerLocal
} from '@jupiterone/jupiter-managed-integration-sdk';

import { createLogger, TRACE } from 'bunyan';

import executionHandler from './index';

async function run(): Promise<void> {
  const logger = createLogger({ name: 'local', level: TRACE });
  logger.info(
    await executeSingleHandlerLocal({}, logger, executionHandler, {
      accountId: '',
      instanceCore: {},
      timestamp: Date.now()
    }),
    'Execution completed successfully!'
  );
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
