import { test, expect } from '@playwright/test';
import { handleGoogleAd, homepageVisible, validateHomepageURL } from './helpers/helper';
import { userContactData } from '../data/data';

const URL = "https://www.automationexercise.com/";

test.beforeEach(async({ page }) => {
  await page.goto(URL);
});

test.describe("Contact Us section test cases", () => {
  test.describe.only("Test Case 6: Contact Us Form", () => {
    userContactData.map( user => {
      test("Test Case 6: Contact Us Form", async({ page }) => {

        //* 3. Verify that home page is visible successfully
        await homepageVisible( page );
    
        //* 4. Click on 'Contact Us' button
        await page.getByRole('link', { name: ' Contact us' }).click();
    
        //* 5. Verify 'GET IN TOUCH' is visible
        await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
    
        //* 6. Enter name, email, subject and message
        await page.getByPlaceholder('Name').fill( user.fullname );
        await page.getByPlaceholder('Email', { exact: true }).fill( user.email );
        await page.getByPlaceholder('Subject').fill( user.subject );
        await page.getByPlaceholder('Your Message Here').fill( user.message );

        //* 7. Upload file
        await page.setInputFiles('input[name="upload_file"]', user.imagePath);

        //* 9. Click OK button
        page.on('dialog', async dialog => {
          await dialog.accept();
        });
        //* 8. Click 'Submit' button
        await page.getByRole('button', { name: 'Submit' }).click();
        
        //* 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
        await expect(page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible({ timeout: 15000 });

        //* 11. Click 'Home' button and verify that landed to home page successfully
        await page.getByRole('link', { name: ' Home' }).click();
        // await handleGoogleAd( page );
        await validateHomepageURL( page );
      })
    })
  })
})