import {expect,type Page} from '@playwright/test';
import {demoNavigator} from './demo-navigation.ts';

/** Exercise an actual automatic departure using only ordinary demo controls. */
export async function naturalFlight(page:Page,{limit='150',view='output'}:{limit?:string;view?:string}={}){
 const demo=demoNavigator(page);
 await demo.desk('authorize');await page.fill('#limit',limit);
 await page.uncheck('#authorize-executive-hovering');await page.check('#authorize-emoji-companions');
 await page.check('#authorize-paper-flights');await page.check('#authorize-stamp-heists');
 await page.selectOption('#authorize-display-speed','225');await page.click('#run-button');
 await expect.poll(async()=>Number((await page.locator('#output-count').textContent())!.split(' ')[0]),{timeout:30000}).toBeGreaterThanOrEqual(24);
 await page.click('#pause-reading',{timeout:10000});
 await expect(page.locator('#pause-reading')).toHaveAttribute('aria-pressed','true');
 await demo.options(async()=>{await page.check('#executive-hovering');await page.selectOption('#display-speed','0');});
 await page.selectOption('#watch-view',view);
 await page.click('#supervision-pause');
 await expect(page.locator('#supervision-flight')).toBeVisible({timeout:120000});
 await expect(page.locator('#supervision-flight')).toContainText('-30');
}
