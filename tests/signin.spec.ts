import { test, expect } from '@playwright/test';
import { existingUserSignup, incorrectLoginData, loginData, signUpData } from '../data/data';
import { URL, accessLoginSection, clickSignupButton, fillExtraSignupFields, fillSignupFields, handleGoogleAd, homepageVisible, loggedInAs, loginAccountVisible, loginUser, newUserSignupVisible, validateLoginURL } from './helpers/helper';

test.beforeEach(async({ page }) => {
  await page.goto(URL);
});

test.describe("Sign up and Sign in test cases", () => {
  test.describe("Test Case 1: Register User", () => {
    signUpData.forEach( user => {
      test(`Signing up ${user.email}`, async({ page }) => {
        //! Test timeout set to 3 minutes
        test.setTimeout(3 * 60 * 1000);

        //* 3. Verify that home page is visible successfully
        await homepageVisible( page );
    
        //* 4. Click on 'Signup / Login' button
        await accessLoginSection( page );
    
        //* 5. Verify 'New User Signup!' is visible
        await newUserSignupVisible( page );
    
        //* 6. Enter name and email address
        await fillSignupFields( page, user );

        //* 7. Click 'Signup' button
        await clickSignupButton( page );

        //* 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        await expect(page.getByText('Enter Account Information')).toBeVisible();

        //* 9. Fill details: Title, Name, Email, Password, Date of birth
        //* 10. Select checkbox 'Sign up for our newsletter!'
        //* 11. Select checkbox 'Receive special offers from our partners!'
        //* 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        await fillExtraSignupFields( page, user );

        //* 13. Click 'Create Account button'
        await page.getByRole('button', { name: 'Create Account' }).click();

        //* 14. Verify that 'ACCOUNT CREATED!' is visible
        await expect(page.getByText('Account Created!')).toBeVisible();

        //* 15. Click 'Continue' button
        await page.getByRole('link', { name: 'Continue' }).click();

        //* 16. Verify that 'Logged in as username' is visible
        //! Handle google ad
        await handleGoogleAd( page );
        await loggedInAs( page, user.fullname );

        //* 17. Click 'Delete Account' button
        await page.getByRole('link', { name: ' Delete Account' }).click();

        //* 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        await expect( page.getByText('Account Deleted!') ).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
      })
    })
  });

  test.describe("Test Case 2: Login User with correct email and password", () => {
    loginData.forEach( user => {
      test(`Logging in ${user.email}`, async({ page }) => {
        // test.setTimeout(3 * 60 * 1000);

        //* 3. Verify that home page is visible successfully
        await homepageVisible( page );
        
        //* 4. Click on 'Signup / Login' button
        await accessLoginSection( page );

        //* 5. Verify 'Login to your account' is visible
        await loginAccountVisible( page );
        
        //* 6. Enter correct email address and password
        //* 7. Click 'login' button
        await loginUser( page, user );
        
        //* 8. Verify that 'Logged in as username' is visible
        await loggedInAs( page, user.fullname );
      })
    })
  });

  test.describe("Test Case 3: Login User with incorrect email and password", () => {
    incorrectLoginData.forEach( user => {
      test(`Logging in ${user.email}`, async({ page }) => {
        // test.setTimeout(3 * 60 * 1000);

        //* 3. Verify that home page is visible successfully
        await homepageVisible( page );

        //* 4. Click on 'Signup / Login' button
        await accessLoginSection( page );

        //* 5. Verify 'Login to your account' is visible
        await loginAccountVisible( page );

        //* 6. Enter incorrect email address and password
        //* 7. Click 'login' button
        await loginUser( page, user );
        
        //* 8. Verify error 'Your email or password is incorrect!' is visible
        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
      })
    })
  });

  test.describe("Test Case 4: Logout User", () => {
    loginData.forEach( user => {
      test(`Logging out ${user.email}`, async({ page }) => {
        // test.setTimeout(3 * 60 * 1000);

        //* 3. Verify that home page is visible successfully
        await homepageVisible( page );
        //* 4. Click on 'Signup / Login' button
        await accessLoginSection( page );
        //* 5. Verify 'Login to your account' is visible
        await loginAccountVisible( page );
        //* 6. Enter correct email address and password
        //* 7. Click 'login' button
        await loginUser( page, user );
        //* 8. Verify that 'Logged in as username' is visible
        await loggedInAs( page, user.fullname );
        //* 9. Click 'Logout' button
        await page.getByRole('link', { name: ' Logout' }).click();
        //* 10. Verify that user is navigated to login page
        await validateLoginURL( page );
      })
    })
  });

  test.describe("Test Case 5: Register User with existing email", () => {
    existingUserSignup.forEach( user => {
      test(`Signing up ${user.email}`, async({ page }) => {
        //! Test timeout set to 3 minutes
        test.setTimeout(3 * 60 * 1000);
        
        //* 3. Verify that home page is visible successfully
        await homepageVisible( page );
        
        //* 4. Click on 'Signup / Login' button
        await accessLoginSection( page );
        
        //* 5. Verify 'New User Signup!' is visible
        await newUserSignupVisible( page );
        
        //* 6. Enter name and already registered email address
        await fillSignupFields( page, user );
        
        //* 7. Click 'Signup' button
        await clickSignupButton( page );

        //* 8. Verify error 'Email Address already exist!' is visible
        await expect(page.getByText('Email Address already exist!')).toBeVisible();
      })
    })
  });
})