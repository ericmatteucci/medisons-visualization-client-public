// @flow

/**
 * Generates and calls an asynchronous promise.
 * @param promise The promise to call.
 * @returns {Promise<void>} The executed promise.
 */
async function generateAsyncAction(promise: Function): Promise<*> {
  await promise();
}

export default generateAsyncAction;
