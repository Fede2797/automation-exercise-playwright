import { test, expect } from '@playwright/test';
import { URL, handleMultipleGoogleAds, homepageVisible, validateHomepageURL } from './helpers/helper';
import { userContactData } from '../data/data';

test.beforeEach(async({ page }) => {
  await page.goto(URL);
});

test.describe("Contact Us section test cases", () => {
  test.describe("Test Case 6: Contact Us Form", () => {
    userContactData.map( user => {
      test("Test Case 6: Contact Us Form", async({ page }) => {

        await homepageVisible( page );
    
        await page.getByRole('link', { name: ' Contact us' }).click();
    
        await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
    
        await page.getByPlaceholder('Name').fill( user.fullname );
        await page.getByPlaceholder('Email', { exact: true }).fill( user.email );
        await page.getByPlaceholder('Subject').fill( user.subject );
        await page.getByPlaceholder('Your Message Here').fill( user.message );

        await page.setInputFiles('input[name="upload_file"]', user.imagePath);

        page.on('dialog', async dialog => {
          await dialog.accept();
        });
        await page.getByRole('button', { name: 'Submit' }).click();
        
        await expect(page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible({ timeout: 15000 });

        await page.getByRole('link', { name: ' Home' }).click();
        await handleMultipleGoogleAds( page );
        await validateHomepageURL( page );
      })
    })
  })
})