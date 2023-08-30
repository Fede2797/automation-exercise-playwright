import { test, expect } from '@playwright/test';
import { URL, handleGoogleAd, handleMultipleGoogleAds, homepageVisible } from './helpers/helper';

test.beforeEach(async({ page }) => {
  await page.goto(URL);
});

test.only("Test Case 7: Verify Test Cases Page", async({ page }) => {

  // await page.route("**/*", (request) => {
  //   request.request().url().startsWith("https://googleads.")
  //      ? request.abort()
  //      : request.continue();
  //    return;
  //  });

  //* 3. Verify that home page is visible successfully
  await homepageVisible( page );
  
  //* 4. Click on 'Test Cases' button
  await page.getByRole('link', { name: ' Test Cases' }).click();

  //! Handle google ads
  await handleMultipleGoogleAds( page );

  //* 5. Verify user is navigated to test cases page successfully
  await expect(page).toHaveURL(/test_cases/);
})