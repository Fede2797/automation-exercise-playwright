import { expect } from "@playwright/test";
import { creaditCardData, signUpData } from "../../data/data";

export const URL = "https://www.automationexercise.com/";

export const homepageVisible = async( page ) => {
  await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
}

export const accessLoginSection = async( page ) => {
  await page.getByRole('link', { name: ' Signup / Login' }).click();
}

export const loggedInAs = async( page, fullname ) => {
  await expect( page.getByText(`Logged in as ${ fullname }`) ).toBeVisible;
}

export const handleGoogleAd = async( page ) => {
  if ( await page.url().includes("google_vignette") ){
    await page.getByLabel('Close ad').click();
  }
}

export const handleMultipleGoogleAds = async( page ) => {
  if ( await page.url().includes("google_vignette") ){
    for ( let i = 0; i <= 9; i++ ) {
      if ( await page.frameLocator(`#aswift_${i}`).frameLocator("#ad_iframe").getByText('Close').isVisible({timeout : 2000}) ) {
        const firstFrame = await page.frameLocator(`#aswift_${i}`);
        await firstFrame.frameLocator("#ad_iframe").getByText('Close').click();
        return ;
      }
    }
    for ( let i = 0; i <= 9; i++ ) {
      if ( await page.frameLocator(`#aswift_${i}`).locator("#dismiss-button").first().isVisible({timeout : 2000}) ) {
        await page.frameLocator(`#aswift_${i}`).locator("#dismiss-button").first().click();
        return ;
      }
    }
    if ( await page.locator("#dismiss-button").first().isVisible({timeout : 2000}) ) {
      await page.locator("#dismiss-button").first().click();
      return ;
    }
  }
}

export const fillSignupFields = async( page, user ) => {
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Name').fill( user.fullname );
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill( user.email );
}

export const clickSignupButton = async( page ) => {
  await page.getByRole('button', { name: 'Signup' }).click();
}

export const fillExtraSignupFields = async( page, user ) => {
  if ( user.sex === "male" ) {
    await page.getByLabel('Mr.').click();
  } else if ( user.sex === "female" ) {
    await page.getByLabel('Mrs.').click();
  };
  await page.getByLabel('Password *').fill( user.password );
  await page.locator('#days').selectOption( user.dateOfBirth.getDay().toString() );
  await page.locator('#months').selectOption( user.dateOfBirth.getMonth().toString() );
  await page.locator('#years').selectOption( user.dateOfBirth.getFullYear().toString() );
  await page.getByLabel('Sign up for our newsletter!').click();
  await page.getByLabel('Receive special offers from our partners!').click();
  await page.getByLabel('First name *').fill( user.firstname );
  await page.getByLabel('Last name *').fill( user.lastname );
  await page.getByLabel('Company', { exact: true }).fill( user.company );
  await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill( user.first_address );
  await page.getByLabel('Address 2').fill( user.second_address );
  await page.getByLabel('Country *').selectOption( user.country );
  await page.getByLabel('State *').fill( user.state );
  await page.getByLabel('City *').fill( user.city );
  await page.locator('#zipcode').fill( user.zipcode );
  await page.getByLabel('Mobile Number *').fill( user.mobile );
}

export const loginAccountVisible = async( page ) => {
  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
}

export const loginUser = async( page, user ) => {
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill( user.email );
  await page.getByPlaceholder('Password').fill( user.password );
  await page.getByRole('button', { name: 'Login' }).click();
}

export const newUserSignupVisible = async( page ) => {
  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
}

export const validateLoginURL = async( page ) => {
  await expect(page).toHaveURL(/automationexercise.com\/login/);
}

export const validateHomepageURL = async( page ) => {
  await expect(page).toHaveURL("https://www.automationexercise.com/");
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const deleteAccount = async( page ) => {
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await handleMultipleGoogleAds( page );
  await expect( page.getByText('Account Deleted!') ).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
}

export const createRandomUser = async( page ) => {
  const user = signUpData[0];
  let auxMail = user.firstname + user.lastname + getRandomInt(999) + `@totallytruemail${getRandomInt(999)}.com`;
  user.email = auxMail;
  
  await homepageVisible( page );
  await accessLoginSection( page );
  await fillSignupFields( page, user );
  await clickSignupButton( page );
  await fillExtraSignupFields( page, user );
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await loggedInAs( page, user.fullname );

  return user;
}

export const accessCart = async( page ) => {
  await page.getByRole('link', { name: 'Cart' }).click();
}

export const scrollToBottom = async( page ) => {
  // await page.evaluate(async () => {
  //   for (let i = 0; i < document.body.scrollHeight; i += 100) {
  //     window.scrollTo(0, i);
  //   }
  // });
  await page.mouse.wheel(0,10000);
}

export const scrollToTop = async( page ) => {
  await page.mouse.wheel(0,-10000);
}