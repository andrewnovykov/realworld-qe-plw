import { EMAIL, PASSWORD, USER_NAME } from '../../../environment.config'
import { expect, test } from '@playwright/test'

import { uid } from 'uid'

test.beforeEach(async ({ page }) => {
	await page.goto('/')
})

test.describe('Authorisation', () => {
	const newUser = uid(5)
	const newEmail = uid(5)
	test('Registrated with valid credention @QALA-2', async ({ page }) => {
		await page.getByRole('link', { name: 'Sign up' }).click()
		await page.getByPlaceholder('Your Name').type(`myname${newUser}`, { delay: 100 })
		await page.getByPlaceholder('Email').type(`${newEmail}@gmail.com`, { delay: 100 })
		await page.getByPlaceholder('Password').type('password', { delay: 100 })
		await page.getByRole('button', { name: 'Sign up' }).click()
		await expect(page.getByText(`myname${newUser}`)).toBeVisible()
	})
	test('Should not be able to sign up with empty fields @QALA-5', async ({ page }) => {
		await page.getByRole('link', { name: 'Sign up' }).click()
		await page.getByPlaceholder('Your Name').type('', { delay: 100 })
		await page.getByPlaceholder('Email').type('', { delay: 100 })
		await page.getByPlaceholder('Password').type('', { delay: 100 })
		await page.getByRole('button', { name: 'Sign up' }).click()
		await expect(page.getByText('Username is required')).toBeVisible()
		await expect(page.getByText('Email is required')).toBeVisible()
		await expect(page.getByText('Password is required')).toBeVisible()
	})
	test('Should not be able sign up with  an already registered email address @QALA-6', async ({ page }) => {
		await page.getByRole('link', { name: 'Sign up' }).click()
		await page.getByPlaceholder('Your Name').type(newUser, { delay: 100 })
		await page.getByPlaceholder('Email').type(EMAIL, { delay: 100 })
		await page.getByPlaceholder('Password').type(PASSWORD, { delay: 100 })
		await page.getByRole('button', { name: 'Sign up' }).click()
		await expect(page.getByText('Email already exists.. try logging in')).toBeVisible()
	})
})
