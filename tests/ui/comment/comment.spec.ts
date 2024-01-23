import { test, expect, type Page } from '@playwright/test'
import { USER_NAME, PASSWORD, EMAIL } from '../../../environment.config'
import { login } from '../../../src/helpers/ui/login-helpers'
import { article } from '../../../src/helpers/ui/article-helpers'
import { comment } from '../../../src/helpers/ui/comment-helper'
import { uid } from 'uid'
import { loginAPI } from '../../../src/helpers/api/get-token'
import { createArticleApi } from '../../../src/helpers/api/create-article'
import { logout } from '../../../src/helpers/ui/logout-helper'
test.beforeEach(async ({ page }) => {
	await page.goto('/')
})

test.describe('Article', () => {
	const newArticle = 'article' + uid(5)
	const aboutArticle = 'article' + uid(5)
	const writeArticle = 'some text'
	const tags = 'article'
	const commentText = 'nice article'
	test('should be able to write and post comment under article @QALA-33', async ({ page }) => {
		await login(page, EMAIL, PASSWORD)
		await article(page, newArticle, aboutArticle, writeArticle, tags)
		await page.getByRole('link', { name: newArticle })
		await comment(page, commentText)
		await expect(page.getByRole('paragraph').filter({ hasText: commentText })).toBeVisible()
	})
	test('should be able leave a comment under other user article, @QALA-37', async ({ page }) => {
		const secondUserEmail = 'seconduser@gmail.com'
		const secondUserPass = 'seconduser'
		const username = 'seconduser'
		await login(page, EMAIL, PASSWORD)
		await article(page, newArticle, aboutArticle, writeArticle, tags)
		await page.getByRole('link', { name: ' Home' }).click()
		await logout(page)
		await expect(page.getByText('Login')).toBeVisible()
		await login(page, secondUserEmail, secondUserPass)
		await page.goto('#/')
		await page.getByRole('button', { name: 'Global Feed' }).click()
		await page.getByRole('link', { name: newArticle }).click()
		await comment(page, commentText)
		await expect(page.getByRole('main').getByText('seconduser')).toBeVisible()
	})
})
