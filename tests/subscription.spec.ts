import { test, expect } from "@playwright/test";
import { URL, homepageVisible } from "./helpers/helper";
import { emailSubscriptions } from "../data/data";

test.beforeEach(async({ page }) => {
  await page.goto(URL);
});

test.describe("Subscription tests", () => {
  test.describe("Test Case 10: Verify Subscription in home page", () => {
    emailSubscriptions.map( email => {
      test(`Subscribing user with email: ${email}`, async({ page }) => {
        await homepageVisible( page );

        //? Scrolls smoothly to the footer
        await page.evaluate(async () => {
          for (let i = 0; i < document.body.scrollHeight; i += 100) {
            window.scrollTo(0, i);
          }
        });

        await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
        await page.getByPlaceholder('Your email address').fill(email);
        await page.getByRole('button', { name: '' }).click();
        await expect(page.getByText("You have been successfully subscribed!")).toBeVisible();
      });
    });
  });

  test.describe.only("Test Case 11: Verify Subscription in Cart page", () => {
    emailSubscriptions.map( email => {
      test(`Subscribing user with email: ${email}`, async({ page }) => {
        await homepageVisible( page );
        await page.getByRole('link', { name: 'Cart' }).click();
        //? Scrolls smoothly to the footer
        await page.evaluate(async () => {
          for (let i = 0; i < document.body.scrollHeight; i += 100) {
            window.scrollTo(0, i);
          }
        });

        await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
        await page.getByPlaceholder('Your email address').fill(email);
        await page.getByRole('button', { name: '' }).click();
        await expect(page.getByText("You have been successfully subscribed!")).toBeVisible();
      });
    });
  });
});