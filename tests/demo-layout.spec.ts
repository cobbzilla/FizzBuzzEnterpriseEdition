import {test,expect} from '@playwright/test';

test('dedicated demo navigates from home and preserves desktop and mobile reading order',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Layout is covered once per browser; functionality exercises both compiled engines.');
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/');await expect(page.locator('#health-value')).toHaveText('LIVE');
 await expect(page.locator('#run-form')).toHaveCount(0);
 await page.getByRole('link',{name:'Convene the demo'}).click();await expect(page).toHaveURL(/\/demo\/$/);
 await expect(page.locator('#health-value')).toHaveText('LIVE');
 await expect(page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name:'Live demo'})).toHaveAttribute('aria-current','page');
 await expect(page.locator('main h1')).toHaveText('Issue a numerical mandate');
 const controls=page.locator('#mandate-controls'),output=page.locator('#mandate-output'),advisory=page.locator('#advisory-inventory');
 await page.setViewportSize({width:1280,height:900});
 const left=(await controls.boundingBox())!,right=(await output.boundingBox())!,below=(await advisory.boundingBox())!;
 expect(left.x+left.width).toBeLessThan(right.x);expect(Math.abs(left.y-right.y)).toBeLessThan(2);
 expect(below.y).toBeGreaterThanOrEqual(Math.max(left.y+left.height,right.y+right.height));
 for(const width of [390,320]){
  await page.setViewportSize({width,height:844});
  const top=(await controls.boundingBox())!,middle=(await output.boundingBox())!,bottom=(await advisory.boundingBox())!;
  expect(middle.y).toBeGreaterThanOrEqual(top.y+top.height);expect(bottom.y).toBeGreaterThanOrEqual(middle.y+middle.height);
  expect(Math.abs(top.x-middle.x)).toBeLessThan(2);expect(Math.abs(middle.x-bottom.x)).toBeLessThan(2);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
 await page.selectOption('#display-speed','0');await page.fill('#limit','15');await page.click('#run-button');
 await expect(page.locator('#run-status')).toContainText('Mandate complete');
 await expect(page.locator('#output')).toContainText('FizzBuzz');await expect(page.locator('#forecast-joint')).toHaveText('1');
 await page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name:'Operations'}).click();
 await expect(page.locator('#health-value')).toHaveText('LIVE');
 await expect(page.locator('#audit-committed')).toHaveText('15');
 expect(errors).toEqual([]);
});
