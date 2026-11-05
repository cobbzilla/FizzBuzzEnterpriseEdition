import {expect,type Page} from '@playwright/test';
/** User-facing navigation shared by deployed and preview release checks. */
export function demoNavigator(page:Page){
 const desk=async(name:string)=>{await expect(page.locator('body')).toHaveAttribute('data-desk',/^(authorize|observe|experiment|facilities|evidence)$/);if(await page.locator('body').getAttribute('data-desk')!==name)await page.locator('[data-desk-link="'+name+'"]').click();};
 return {
  desk,
  watch:async(view:string)=>{await desk('observe');await page.selectOption('#watch-view',view);},
  experiment:async(kind:string)=>{await desk('experiment');await page.selectOption('#experiment-view',kind);},
  evidence:async(kind:string)=>{await desk('evidence');await page.selectOption('#evidence-view',kind);},
  options:async(change:()=>Promise<unknown>)=>{await desk('observe');if(await page.locator('#watch-settings').isHidden())await page.click('#watch-settings-toggle');await change();if(await page.locator('#watch-settings').isVisible())await page.click('#watch-settings-close');},
  run:async(limit='15')=>{await desk('authorize');await page.fill('#limit',limit);await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');}
 };
}
