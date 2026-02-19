import { expect, test } from '@playwright/test';

const APP_URL = process.env.PLAYWRIGHT_APP_URL ?? 'https://127.0.0.1:5173';

const LONG_ANSWER = `${'오늘 매출 분석 결과를 상세히 안내드립니다. '.repeat(40)}끝마커1`;
const SHORT_ANSWER = '두 번째 답변입니다. 끝마커2';

const getMockAuthStatusResponse = () => ({
  success: true,
  message: 'Success',
  data: {
    email: 'owner@example.com',
    hasStore: true,
    hasPosIntegration: true,
  },
});

test.describe('AI Chat Spacer E2E', () => {
  test.use({ ignoreHTTPSErrors: true });

  test('spacer 높이가 응답 길이에 따라 갱신되고, 새 질문 시 자동 스크롤이 동작한다', async ({
    page,
  }) => {
    let chatRequestCount = 0;

    await page.route('**/auth/status', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(getMockAuthStatusResponse()),
      });
    });

    await page.route('**/auth/refresh', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Success',
          data: { accessToken: 'mock-access-token' },
        }),
      });
    });

    await page.route('**/api/chats', async (route) => {
      chatRequestCount += 1;
      const answer = chatRequestCount === 1 ? LONG_ANSWER : SHORT_ANSWER;

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'AI 응답 생성에 성공했습니다.',
          data: { answer },
        }),
      });
    });

    await page.goto(`${APP_URL}/dashboard`);

    await page.getByRole('button', { name: /AI mate/i }).click();
    await expect(
      page.getByRole('heading', { name: /오늘 매장 운영 흐름을/i }),
    ).toBeVisible();

    const input = page.locator('#ai-chat');
    await input.fill('첫 번째 질문입니다');
    await input.press('Enter');

    const historySection = page.locator('section.mx-500');
    const spacer = historySection.locator(':scope > div.w-full.shrink-0');

    await expect(historySection).toBeVisible();
    await expect(spacer).toBeVisible();

    const getSpacerHeight = async () =>
      await spacer.evaluate((el) => parseFloat(getComputedStyle(el).height));

    await expect.poll(getSpacerHeight).toBeGreaterThan(0);
    const initialSpacerHeight = await getSpacerHeight();

    await expect(page.getByText('끝마커1')).toBeVisible({ timeout: 20000 });

    const finalSpacerHeight = await getSpacerHeight();
    expect(finalSpacerHeight).toBeLessThan(initialSpacerHeight);

    await historySection.evaluate((el) => {
      el.scrollTo({ top: 0, behavior: 'auto' });
    });

    await input.fill('두 번째 질문입니다');
    await input.press('Enter');

    await expect
      .poll(async () => await historySection.evaluate((el) => el.scrollTop))
      .toBeGreaterThan(0);
  });
});
