import { test, expect } from '@playwright/test';
import { URL, homepageVisible } from './helpers/helper';
import { enterProductsPage } from './helpers/products-helper';
import { products } from '../data/data';

test.beforeEach(async({ page }) => {
  await page.goto(URL);
});

test.describe("Products section tests", () => {
  test("Test Case 8: Verify All Products and product detail page", async({ page }) => {
    await homepageVisible( page );
    await enterProductsPage( page );
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

  test.describe("Test Case 9: Search Product", () => {
    products.map( product => {
      test(`Searching product ${product}`, async({ page }) => {
        await homepageVisible( page );
        await enterProductsPage( page );
        await page.getByPlaceholder('Search Product').fill( product );
        await page.getByRole('button', { name: '' }).click();
        await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
        const totalSearch = await page.locator('.single-products').count();
        const productSearch = await page.locator('.single-products').getByText(product).count() / 2;
        await expect(totalSearch).toBe(productSearch);
      })
    })
  });
})