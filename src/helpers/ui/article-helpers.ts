import { Page } from '@playwright/test'
export const article = async (
	page: Page,
	articleTitle: string,
	articleSumm: string,
	articleText: string,
	articleTags: string,
) => {
	await page.getByRole('link', { name: 'New Article' }).click()
	await page.getByPlaceholder('Article Title').type(articleTitle)
	await page.getByPlaceholder("What's this article about?").type(articleSumm)
	await page.getByPlaceholder('Write your article (in markdown)').type(articleText)
	await page.getByPlaceholder('Enter tags').type(articleTags)
	await page.getByRole('button', { name: 'Publish Article' }).click()
}
