import { EMAIL, PASSWORD, USER_NAME } from '../../../environment.config'
export const logout = async (page) => {
	await page.waitForURL('#/')
	await page.getByText(USER_NAME).waitFor()
	await page.getByText('Babybus').click()
	await page.getByText('Logout').click()
}
