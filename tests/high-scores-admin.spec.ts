import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {localLeaderboard} from '../scripts/high-scores-local';
import {LeaderboardStore} from '../deploy/leaderboard-store';
import {scoreAdmin} from '../deploy/high-scores-admin';
import {makeScore} from '../scripts/leaderboard-fixtures';
import {publicationReceipt} from '../web/leaderboard-model';
import {anonymousName} from '../web/scoreboards';
test.use({serviceWorkers:'block'});
test('authenticated administration previews bans, masks names, unbans and blocks a browser',async({page})=>{
 const local=await localLeaderboard(),env={...local.env,HIGH_SCORES_ADMIN_USERNAME:'admin',HIGH_SCORES_ADMIN_PASSWORD:'a-strong-test-password'},store=new LeaderboardStore(local.env.HIGH_SCORES!.withSession('first-primary'));
 try{
  const owner=await store.enroll('browser-admin-test','N1ght_0wl'),run=publicationReceipt((await makeScore()).snapshot().current!)!;await store.submit(owner.id,run,'original',null);
  await page.setExtraHTTPHeaders({Authorization:'Basic '+Buffer.from('admin:a-strong-test-password').toString('base64')});
  await page.route('**/admin/high-scores/**',async route=>{const incoming=route.request(),response=await scoreAdmin(new Request(incoming.url(),{method:incoming.method(),headers:incoming.headers(),...(['GET','HEAD'].includes(incoming.method())?{}:{body:incoming.postData()})}),env);await route.fulfill({status:response.status,headers:Object.fromEntries(response.headers),body:await response.text()});});
  page.on('dialog',dialog=>void dialog.accept());await page.goto('/admin/high-scores/');await expect(page.locator('#rows')).toContainText('N1ght_0wl');
  await page.locator('#ban-name').fill('Night! Owl');await expect(page.locator('#ban-name')).toHaveValue('Night Owl');await page.getByRole('button',{name:'Preview matches',exact:true}).click();await expect(page.locator('#preview')).toContainText('N1ght_0wl');
  await page.locator('#ban-form').getByRole('button',{name:'Ban name and variants',exact:true}).click();await expect(page.locator('#bans')).toContainText('Night Owl');await expect(page.locator('#rows')).toContainText(anonymousName);expect((await store.list(0,50)).entries[0].name).toBe(anonymousName);
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
  await page.getByRole('button',{name:'Remove ban',exact:true}).click();await expect(page.locator('#bans')).toBeEmpty();expect((await store.list(0,50)).entries[0].name).toBe('N1ght_0wl');
  await page.locator('#rows').getByRole('button',{name:'Delete scores and block browser',exact:true}).click();await expect(page.locator('#rows')).toBeEmpty();expect((await store.person('browser-admin-test'))!.blocked).toBe(1);expect((await store.list(0,50)).total).toBe(0);
 }finally{await page.unrouteAll({behavior:'wait'});await local.dispose();}
});
