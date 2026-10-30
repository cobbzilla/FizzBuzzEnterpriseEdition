import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({page}, info) => {
 await page.route('**/runtime-config.json', async route => {
  const response = await route.fetch();
  await route.fulfill({json: {...await response.json(), engine: info.project.metadata.engine}});
 });
});

test('each individual z reports to receiving without creating audit work', async ({page}) => {
 const network: string[] = [];
 page.on('request', request => {if (new URL(request.url()).pathname.startsWith('/procurement')) network.push(request.url());});
 await page.goto('/'); await expect(page.locator('#health-value')).toHaveText('LIVE');
 const committed = await page.locator('#audit-committed').textContent();
 const form = page.getByRole('form', {name: 'Glyph Procurement Directorate'});
 await form.getByRole('button').focus(); await page.keyboard.press('Enter');
 await expect(page.locator('#procurement-status')).toContainText('8 separate line items');
 await expect(form.getByRole('button')).toBeFocused();
 const items = page.locator('#procurement-items li');
 await expect(items).toHaveCount(8);
 expect(await items.locator('strong').allTextContents()).toEqual(['F','i','z','z','B','u','z','z']);
 expect(await items.allTextContents()).toEqual(expect.arrayContaining([expect.stringContaining('GLY-007A · quantity 1 · ACCEPTED')]));
 await page.getByRole('button', {name: 'Refresh operations'}).click();
 await expect(page.locator('#audit-committed')).toHaveText(committed!);
 await page.getByText('Read the machine-readable procurement dossier', {exact: true}).click();
 const dossier = JSON.parse((await page.locator('#procurement-json').textContent())!);
 expect(dossier).toMatchObject({product: 'FizzBuzz', text: 'FizzBuzz', assembly: 'CERTIFIED', demonstration: true, auditTransactions: 0});
 expect(dossier.lineItems.map((item: {position: number}) => item.position)).toEqual([1,2,3,4,5,6,7,8]);
 for (const product of ['Fizz','Buzz']) {
  await page.selectOption('#procurement-product', product); await form.getByRole('button').click();
  await expect(page.locator('#procurement-status')).toContainText(`${product} certified`);
  await expect(items).toHaveCount(4);
 }
 await page.getByRole('link', {name: 'Read the dossier API'}).click();
 await expect(page.locator('#response-output')).toContainText('slopbuzz-glyph-procurement/v1');
 expect(network).toEqual([]);
});

test('procurement API charter has an operable product selector and dossier link', async ({page}) => {
 await page.goto('/api/');
 const card = page.locator('#operation-inspectGlyphProcurement');
 await card.locator('summary').first().click();
 await card.getByRole('combobox', {name: 'Authorized product'}).selectOption('Buzz');
 await card.getByRole('button', {name: 'Send GET request to /procurement/dossier'}).click();
 await expect(card.getByRole('status')).toContainText('HTTP 200');
 await expect(card.getByRole('region', {name: 'GET /procurement/dossier response'})).toContainText('"product":"Buzz"');
});

test('receiving evidence reflows and exposes its controls to keyboard and accessibility tools', async ({page}, info) => {
 test.skip(info.project.metadata.engine === 'js', 'The DOM is audited once per browser; both compiled targets exercise procurement.');
 await page.goto('/'); await page.locator('#procurement-button').click();
 await expect(page.locator('#procurement-status')).toContainText('certified');
 await page.getByText('Read the machine-readable procurement dossier', {exact: true}).click();
 const result = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
 expect(result.violations.map(v => ({id: v.id, nodes: v.nodes.map(n => n.target)}))).toEqual([]);
 await page.setViewportSize({width: 320, height: 800});
 await page.evaluate(() => {document.styleSheets[0].insertRule('html {font-size:200% !important}');});
 expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('a receiving failure is announced and the desk can accept a subsequent inspection', async ({page}) => {
 await page.goto('/'); await expect(page.locator('#health-value')).toHaveText('LIVE');
 // Invalid products exercise the real shared dispatcher without forging success evidence.
 await page.locator('#procurement-product').evaluate((select: HTMLSelectElement) => {
  const option = document.createElement('option'); option.value = 'Unauthorized'; option.text = 'Unauthorized'; select.add(option); select.value = option.value;
 });
 await page.click('#procurement-button');
 await expect(page.locator('#procurement-status')).toContainText('HTTP 400');
 await expect(page.locator('#procurement-results')).toBeHidden();
 await expect(page.locator('#procurement-button')).not.toHaveAttribute('aria-disabled', 'true');
 await page.selectOption('#procurement-product', 'Fizz'); await page.click('#procurement-button');
 await expect(page.locator('#procurement-status')).toContainText('Fizz certified');
});
