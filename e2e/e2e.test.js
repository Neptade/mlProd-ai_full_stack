const { test, expect } = require('@playwright/test');

test.describe('E2E tests', () => {
  /** @type {import('@playwright/test').Page} */
  let page;

  test.beforeAll(async ({ browser }) => {
    // Initialize backend
    const response = await fetch(`${process.env.BACKEND_URL}/train`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const trainResult = await response.json();
    expect(trainResult.message).toBe("Model trained and logged to MLflow");

    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Test that prediction works', async () => {
    // Interact with frontend
    await page.goto(process.env.FRONTEND_URL);
    await page.fill('#sepalLength', '3');
    await page.fill('#sepalWidth', '3');
    await page.fill('#petalLength', '3');
    await page.fill('#petalWidth', '3');
    await page.click('#submit-flower');

    // Verify result
    await page.waitForTimeout(1000);
    const result = await page.locator('h2:has-text("Prediction Result") ~ p').textContent();
    expect(result).toContain('The flower is:');
  });

  test('Test that history works', async () => {
    // Refill the form with new data
    await page.fill('#sepalLength', '10');
    await page.fill('#sepalWidth', '10');
    await page.fill('#petalLength', '10');
    await page.fill('#petalWidth', '10');
    await page.click('#submit-flower');

    // Verify result
    await page.waitForTimeout(1000);
    const historyCount = await page.locator('h2:has-text("Prediction History") ~ div > div').count();
    expect(historyCount).toBe(2);
  });

  test('Local storage contains history', async () => {
    const storage = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('predictionHistory'));
    });

    expect(storage.length).toBe(2);
  });

  test("Doesn't accept invalid input", async () => {
    await expect(page.locator('#sepalLength')).toHaveAttribute('type', 'number');
    await expect(page.locator('#sepalWidth')).toHaveAttribute('type', 'number');
    await expect(page.locator('#petalLength')).toHaveAttribute('type', 'number');
    await expect(page.locator('#petalWidth')).toHaveAttribute('type', 'number');
  });
});
