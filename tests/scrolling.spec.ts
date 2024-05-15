import { test, expect } from "@playwright/test";
import { URL, homepageVisible, scrollToBottom, scrollToTop } from "./helpers/helper";

test.beforeEach( async({ page }) => {
  await page.goto(URL);
});

test.describe("Scroll up using 'Arrow' button", () => {
  test("Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality", async({ page }) => {
    await homepageVisible( page );
    
    await scrollToBottom( page );
    await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();

    // Minimize footer ad
    if (await page.locator(".grippy-host").isVisible()) {
      await page.locator(".grippy-host").click();
    }

    await page.locator("#scrollUp").click();
    
    // Wait until the page scrolls up
    await page.waitForTimeout(2000);
    
    const isScrolledUp = await page.evaluate(() => {
      return window.scrollY === 0;
    });
    await expect(isScrolledUp).toBe(true);

    await expect(page.locator("#slider-carousel").locator(".active").getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' })).toBeVisible();
  });
  
  test("Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async({ page }) => {
    await homepageVisible( page );
    
    await scrollToBottom( page );
    await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
    await scrollToTop( page );

    await expect(page.locator("#slider-carousel").locator(".active").getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' })).toBeVisible();
  });
});
