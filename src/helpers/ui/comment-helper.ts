import { Page } from '@playwright/test'
export const comment = async (page: Page, writeComment: string) => {
	await page.getByPlaceholder('Write a comment...').type(writeComment)
	await page.getByRole('button', { name: 'Post Comment' }).click()
}
