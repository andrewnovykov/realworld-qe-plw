import { test, expect, type Page } from '@playwright/test'
import { USER_NAME, PASSWORD, EMAIL } from '../../../environment.config'
import { login } from '../../../src/helpers/ui/login-helpers'
import { article } from '../../../src/helpers/ui/article-helpers'
import { uid } from 'uid'

test.beforeEach(async ({ page }) => {
	await page.goto('/')
})

test.describe('Article', () => {
	const newArticle = 'article' + uid(5)
	const aboutArticle = 'article' + uid(5)
	const writeArticle = 'some text'
	const tags = 'article'
	test('should be able to create an article with Valid Inputs @QALA-25', async ({ page }) => {
		await login(page, EMAIL, PASSWORD)
		await article(page, newArticle, aboutArticle, writeArticle, tags)
		await expect(page.getByRole('heading', { name: newArticle })).toBeVisible()
	})
})
