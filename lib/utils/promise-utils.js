export async function promiseTuplify(promise) {
  try {
    const res = await promise;

    return [res, null];
  } catch (error) {
    return [null, error];
  }
}
