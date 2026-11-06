import {expect,type Page,type Locator} from '@playwright/test';
import {demoNavigator,paintedControl} from '../scripts/demo-navigation';
async function mounted(page:Page){if(new URL(page.url()).pathname.endsWith('/demo/'))await expect(page.locator('body')).toHaveAttribute('data-desk',/^(authorize|observe|experiment|facilities|evidence)$/);}
/** Navigate the actual desks before using a relocated control in the regression suites. */
export async function demoControl(page:Page,selector:string):Promise<Locator>{
 if(!new URL(page.url()).pathname.endsWith('/demo/'))return page.locator(selector);
 await mounted(page);
 let target=selector;
 if(/^#precedent-(scenario|submit|form)$/.test(selector))target=selector.replace('#','#experiment-');
 const desk=await page.locator('body').getAttribute('data-desk');
 if(/^#(display-speed|emoji-companions|companion-strategy|require-companion-roll-call|executive-hovering)$/.test(selector)&&desk==='authorize')target=selector.replace('#','#authorize-');
 const scope=await page.locator(target).first().evaluate(e=>({desk:e.closest('[id^="desk-"]')?.id.slice(5),experiment:e.closest<HTMLElement>('[data-experiment]')?.dataset.experiment,record:e.closest<HTMLElement>('[data-record]')?.dataset.record,settings:!!e.closest('#watch-settings'),chronicle:!!e.closest('.chronicle'),roll:!!e.closest('#companion-roll'),supervision:!!e.closest('#supervision-pane')})).catch(()=>undefined);
 if(!scope)return page.locator(target);
 if(await page.locator('dialog[open]').count())return page.locator(target);
 if(scope.chronicle){await department(page,'observe');await page.selectOption('#watch-view','commentary');}
 else if(scope.roll){await department(page,'observe');await page.selectOption('#watch-view','companions');}
 else if(scope.desk)await department(page,scope.desk);
 if(scope.experiment)await page.selectOption('#experiment-view',scope.experiment);
 if(scope.record&&!scope.chronicle)await page.selectOption('#evidence-view',scope.record);
 if(scope.supervision){await page.selectOption('#watch-view','office');}
 if(scope.settings){if(await page.locator('#watch-settings').isHidden())await page.locator('#watch-settings-toggle').click();}
 else if(!selector.startsWith('#watch-settings')&&await page.locator('#watch-settings').isVisible())await page.locator('#watch-settings-close').click();
 if(selector==='#pause-reading'&&await page.locator('#pause-reading').isHidden())target='#supervision-pause';
 return page.locator(target);
}
export async function department(page:Page,desk:string){await demoNavigator(page).desk(desk);}
export async function watch(page:Page,view='overview'){await department(page,'observe');await page.selectOption('#watch-view',view);await expect(page.locator('#watch-view')).toHaveValue(view);}
export async function demoAction(page:Page,action:'click'|'fill'|'selectOption'|'check'|'uncheck'|'focus'|'press'|'hover'|'tap',selector:string,...args:unknown[]):Promise<unknown>{
 await mounted(page);
 // These legacy ordinary-reading scenarios explicitly opt out of the default office.
 if(action==='selectOption'&&selector==='#display-speed'&&await page.locator('body').getAttribute('data-desk')==='authorize')await (await paintedControl(page,page.locator('#authorize-executive-hovering'))).uncheck();
 const control=await demoControl(page,selector);if(['click','fill','selectOption','check','uncheck','hover','tap'].includes(action))await paintedControl(page,control);const result=await Reflect.apply(control[action],control,args);if(['selectOption','check','uncheck'].includes(action)&&await page.locator('#watch-settings').isVisible()&&!await page.locator('dialog[open]').count())await page.locator('#watch-settings-close').click();return result;
}
