import { test, expect, type Page } from '@playwright/test'
import { USER_NAME, PASSWORD, EMAIL } from '../../../environment.config'
import { login } from '../../../src/helpers/ui/login-helpers'

test.beforeEach(async ({ page }) => {
	await page.goto('/')
})

test.describe('Login', () => {
	test('login with right credentials @login-1', async ({ page }) => {
		await login(page, EMAIL, PASSWORD)
		await page.waitForURL('#/')
		await page.getByText(USER_NAME).waitFor()
		await expect(page.getByText(USER_NAME)).toBeVisible()
	})
})
