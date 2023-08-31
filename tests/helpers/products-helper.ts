import { expect } from "@playwright/test";
import { handleMultipleGoogleAds } from "./helper";

export const enterProductsPage = async( page ) => {
  await page.getByRole('link', { name: ' Products' }).click();
  //! Handle google ads
  await handleMultipleGoogleAds( page );
  await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
}