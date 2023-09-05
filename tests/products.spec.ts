import { test, expect } from '@playwright/test';
import { URL, handleMultipleGoogleAds, homepageVisible } from './helpers/helper';
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

  test("Test Case 18: View Category Products", async({ page }) => {   
    const category = "Dress";     
    await homepageVisible( page );
    await expect(page.locator(".category-products").getByText("Women", { exact: true })).toBeVisible();
    await expect(page.locator(".category-products").getByText("Men", { exact: true }))  .toBeVisible();
    await expect(page.locator(".category-products").getByText("Kids", { exact: true })) .toBeVisible();
    await page.locator(".category-products").getByText("Women", { exact: true }).click();
    await page.locator(".category-products").locator("#Women").getByText("Dress", { exact: true }).click();
    await handleMultipleGoogleAds( page );
    await expect(page.getByRole('heading', { name: `Women - ${category} Products` })).toBeVisible();
    await page.locator(".category-products").getByText("Men", { exact: true }).click();
    await page.locator(".category-products").getByRole('link', { name: 'Jeans' }).click();
    await handleMultipleGoogleAds( page );
    await expect(page.getByRole('heading', { name: 'Men - Jeans Products' })).toBeVisible();
  });

  test("Test Case 19: View & Cart Brand Products", async({ page }) => {
    await homepageVisible( page );
    await enterProductsPage( page );

    await expect(page.locator(".brands_products")).toBeVisible();

    let brandSelected = await page.locator(".brands_products > .brands-name > ul > li").nth(1).textContent();
    ( brandSelected ) && (brandSelected = brandSelected.replace(/ *\([^)]*\) */g, ""));
    await page.locator(".brands_products > .brands-name > ul > li").nth(1).click();
    await expect(page.getByRole('heading', { name: `Brand - ${brandSelected} Products` })).toBeVisible();
    
    let secondBrandSelected = await page.locator(".brands_products > .brands-name > ul > li").nth(0).textContent();
    ( secondBrandSelected ) && (secondBrandSelected = secondBrandSelected.replace(/ *\([^)]*\) */g, ""));
    await page.locator(".brands_products > .brands-name > ul > li").nth(0).click();
    await expect(page.getByRole('heading', { name: `Brand - ${secondBrandSelected} Products` })).toBeVisible();
  });
});