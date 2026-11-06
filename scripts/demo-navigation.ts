import {expect,type Page,type Locator} from '@playwright/test';
/** Paint the scrolled control before sending native input through the browser. */
export async function paintedControl(page:Page,control:Locator){
 await control.scrollIntoViewIfNeeded();
 await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
 return control;
}
/** User-facing navigation shared by deployed and preview release checks. */
export function demoNavigator(page:Page){
 const desk=async(name:string)=>{
  await expect(page.locator('body')).toHaveAttribute('data-desk',/^(authorize|observe|experiment|facilities|evidence)$/);
  if(await page.locator('body').getAttribute('data-desk')===name)return;
  await (await paintedControl(page,page.locator('[data-desk-link="'+name+'"]').first())).click();
  await expect(page.locator('body')).toHaveAttribute('data-desk',name);
  // Desk changes restore scroll and resize the footer before the next paint.
  // Let that rendered view settle before sending another pointer interaction.
  await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
 };
 return {
  desk,
  watch:async(view:string)=>{await desk('observe');await page.selectOption('#watch-view',view);},
  experiment:async(kind:string)=>{await desk('experiment');await page.selectOption('#experiment-view',kind);},
  evidence:async(kind:string)=>{await desk('evidence');await page.selectOption('#evidence-view',kind);},
  options:async(change:()=>Promise<unknown>)=>{await desk('observe');if(await page.locator('#watch-settings').isHidden())await page.click('#watch-settings-toggle');await change();if(await page.locator('#watch-settings').isVisible())await page.click('#watch-settings-close');},
  run:async(limit='15')=>{await desk('authorize');await (await paintedControl(page,page.locator('#limit'))).fill(limit);await (await paintedControl(page,page.locator('#authorize-executive-hovering'))).uncheck();await (await paintedControl(page,page.locator('#authorize-display-speed'))).selectOption('0');await (await paintedControl(page,page.locator('#run-button'))).click();await expect(page.locator('body')).toHaveAttribute('data-desk','observe');await expect(page.locator('#run-status')).toContainText('Mandate complete');}
 };
}
