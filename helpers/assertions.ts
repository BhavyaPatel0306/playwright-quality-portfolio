import { expect, type APIResponse } from '@playwright/test';

export function dollarsToCents(text: string): number {
  const match = text.match(/\$(\d+)\.(\d{2})/);
  if (!match) throw new Error('Expected a dollar amount, received: ' + text);
  return Number(match[1]) * 100 + Number(match[2]);
}

export async function expectJson(response: APIResponse, status: number): Promise<unknown> {
  expect(response.status()).toBe(status);
  expect(response.headers()['content-type']).toContain('application/json');
  return response.json();
}

export function expectPost(value: unknown) {
  expect(value).toEqual(expect.objectContaining({
    id: expect.any(Number), userId: expect.any(Number),
    title: expect.any(String), body: expect.any(String),
  }));
}

