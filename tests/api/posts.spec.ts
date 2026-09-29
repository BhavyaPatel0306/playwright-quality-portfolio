import { test, expect } from '@playwright/test';
import { expectJson, expectPost } from '../../helpers/assertions';

test('API-01 GET post returns its identity and expected field types', async ({ request }) => {
  const body = await expectJson(await request.get('/posts/1'), 200);
  expectPost(body);
  expect(body).toMatchObject({ id: 1, userId: 1 });
});

test('API-02 GET filtered posts belongs exclusively to the requested user', async ({ request }) => {
  const body = await expectJson(await request.get('/posts', { params: { userId: 1 } }), 200);
  expect(Array.isArray(body)).toBe(true);
  const posts = body as unknown[];
  expect(posts.length).toBeGreaterThan(0);
  for (const post of posts) {
    expectPost(post);
    expect(post).toMatchObject({ userId: 1 });
  }
});

test('API-03 GET missing post returns 404 and an empty object', async ({ request }) => {
  expect(await expectJson(await request.get('/posts/999999'), 404)).toEqual({});
});

test('API-04 POST echoes submitted fields and supplies an ID', async ({ request }) => {
  const payload = { userId: 1, title: 'Regression test', body: 'Synthetic portfolio data' };
  const body = await expectJson(await request.post('/posts', { data: payload }), 201);
  expectPost(body);
  expect(body).toMatchObject(payload);
  // JSONPlaceholder simulates writes; a follow-up GET is not a persistence check.
});

test('API-05 PATCH updates the requested field in its response', async ({ request }) => {
  const original = await expectJson(await request.get('/posts/1'), 200);
  expectPost(original);
  const body = await expectJson(await request.patch('/posts/1', {
    data: { title: 'Updated regression title' },
  }), 200);
  expect(body).toEqual({ ...(original as Record<string, unknown>), title: 'Updated regression title' });
});

test('API-06 DELETE returns a successful empty response object', async ({ request }) => {
  expect(await expectJson(await request.delete('/posts/1'), 200)).toEqual({});
});

