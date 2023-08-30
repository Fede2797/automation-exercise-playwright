import { test, expect } from '@playwright/test';
import { URL, handleMultipleGoogleAds, homepageVisible } from './helpers/helper';

test.beforeEach(async({ page }) => {
  await page.goto(URL);
});

test.only("Test Case 7: Verify Test Cases Page", async({ page }) => {
  await homepageVisible( page );
  await page.getByRole('link', { name: ' Products' }).click();
  //! Handle google ads
  await handleMultipleGoogleAds( page );
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
  await expect(page.locator('.features_items > div:nth-child(3)')).toBeVisible();
  await expect(page.locator('.features_items > div:nth-child(4)')).toBeVisible();
  await expect(page.locator('.features_items > div:nth-child(5)')).toBeVisible();
  await page.locator('.choose > .nav > li > a').first().click();
  await expect(page).toHaveURL(/product_details/);
  await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
  await expect(page.getByText('Rs. 500')).toBeVisible();
  await expect(page.getByText('Category: Women > Tops')).toBeVisible();
  await expect(page.getByText(/Availability/)).toBeVisible();
  await expect(page.getByText('Condition: New')).toBeVisible();
  await expect(page.getByText('Brand: Polo')).toBeVisible();
})