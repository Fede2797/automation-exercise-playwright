import { test, expect } from '@playwright/test';
import { existingUserSignup, incorrectLoginData, loginData, signUpData } from '../data/data';
import { URL, accessLoginSection, clickSignupButton, fillExtraSignupFields, fillSignupFields, handleMultipleGoogleAds, homepageVisible, loggedInAs, loginAccountVisible, loginUser, newUserSignupVisible, validateLoginURL } from './helpers/helper';

test.beforeEach(async({ page }) => {
  await page.goto(URL);
});

test.describe("Sign up and Sign in test cases", () => {
  test.describe("Test Case 1: Register User", () => {
    signUpData.map( (user, index) => {
      test(`Signing up ${index}`, async({ page }) => {
        //! Test timeout set to 3 minutes
        test.setTimeout(3 * 60 * 1000);

        await homepageVisible( page );
    
        await accessLoginSection( page );
        await newUserSignupVisible( page );
        await fillSignupFields( page, user );
        await clickSignupButton( page );
        await expect(page.getByText('Enter Account Information')).toBeVisible();
        await fillExtraSignupFields( page, user );
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Account Created!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();

        //! Handle google ad
        await handleMultipleGoogleAds( page );

        await loggedInAs( page, user.fullname );
        await page.getByRole('link', { name: 'Delete Account' }).click();
        await expect( page.getByText('Account Deleted!') ).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
      })
    })
  });

  test.describe("Test Case 2: Login User with correct email and password", () => {
    loginData.map( (user, index) => {
      test(`Logging in ${index}`, async({ page }) => {
        await homepageVisible( page );
        await accessLoginSection( page );
        await loginAccountVisible( page );
        await loginUser( page, user );
        await loggedInAs( page, user.fullname );
      })
    })
  });

  test.describe("Test Case 3: Login User with incorrect email and password", () => {
    //! Test timeout set to 3 minutes
    test.setTimeout(3 * 60 * 1000);
    
    incorrectLoginData.map( (user, index) => {
      test(`Logging in ${index}`, async({ page }) => {
        await homepageVisible( page );
        await accessLoginSection( page );
        await loginAccountVisible( page );
        await loginUser( page, user );
        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
      })
    })
  });

  test.describe("Test Case 4: Logout User", () => {
    //! Test timeout set to 3 minutes
    test.setTimeout(3 * 60 * 1000);
    
    loginData.map( (user, index) => {
      test(`Logging out ${index}`, async({ page }) => {
        await homepageVisible( page );
        await accessLoginSection( page );
        await loginAccountVisible( page );
        await loginUser( page, user );
        await loggedInAs( page, user.fullname );
        await page.getByRole('link', { name: ' Logout' }).click();
        await validateLoginURL( page );
      })
    })
  });

  test.describe("Test Case 5: Register User with existing email", () => {
    existingUserSignup.map( (user, index) => {
      test(`Signing up ${index}`, async({ page }) => {
        //! Test timeout set to 3 minutes
        test.setTimeout(3 * 60 * 1000);

        await homepageVisible( page );
        await accessLoginSection( page );
        await newUserSignupVisible( page );
        await fillSignupFields( page, user );
        await clickSignupButton( page );
        await expect(page.getByText('Email Address already exist!')).toBeVisible();
      })
    })
  });
})