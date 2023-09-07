import { test, expect } from '@playwright/test';
import { URL, handleMultipleGoogleAds, homepageVisible } from './helpers/helper';

test.beforeEach(async({ page }) => {
  await page.goto(URL);
});

test("Test Case 7: Verify Test Cases Page", async({ page }) => {
  await homepageVisible( page );
  await page.locator(".nav").getByRole('link', { name: 'Test Cases' }).click();
  //! Handle google ads
  await handleMultipleGoogleAds( page );
  await expect(page).toHaveURL(/test_cases/);
})