import { Page } from '@playwright/test'
import { SIGN_IN_BTN } from '../../selectors/login-selectors'
export const login = async (page: Page, email: string, password: string) => {
	await page.getByRole('link', { name: 'Login' }).click()
	await page.getByPlaceholder('Email').type(email)
	await page.getByPlaceholder('Password').type(password)
	await page.locator(SIGN_IN_BTN).click()
}
