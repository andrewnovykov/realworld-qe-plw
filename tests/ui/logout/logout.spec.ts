import { test, expect, type Page } from '@playwright/test'
import { USER_NAME, PASSWORD, EMAIL } from '../../../environment.config'
import { login } from '../../../src/helpers/ui/login-helpers'

test.beforeEach(async ({ page }) => {
	await page.goto('/')
})

test.describe('Logout', () => {
	test('should logout after successfully login @QALA-10', async ({ page }) => {
		await login(page, EMAIL, PASSWORD)
		await page.waitForURL('#/')
		await page.getByText(USER_NAME).waitFor()
		await page.getByText('Babybus').click()
		await page.getByText('Logout').click()
		await expect(page).toHaveURL('/#/')
	})
})
