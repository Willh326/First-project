const DEFAULT_TIMEOUT_MS = 15000;

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data?.error === 'string') return data.error;
  } catch {
    // response body wasn't JSON; fall through to the generic message below
  }
  return `Request failed (status ${response.status})`;
}

export async function postJson<T>(url: string, body: unknown, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out. Check your connection and try again.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }

  return response.json();
}
