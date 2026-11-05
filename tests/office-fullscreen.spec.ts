import {test, expect, type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {demoNavigator} from '../scripts/demo-navigation';
import type {OfficeDiagnostics} from '../web/office-world';

const errors = new WeakMap<Page, string[]>();
test.beforeEach(async ({page}, info) => {
  test.skip(info.project.metadata.engine === 'js', 'Shared presentation ownership is covered once per browser.');
  errors.set(page, []);
  page.on('pageerror', error => errors.get(page)!.push(error.message));
});
test.afterEach(async ({page}) => {expect(errors.get(page) || []).toEqual([]);});

async function fallback(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(document, 'fullscreenEnabled', {configurable: true, value: true});
    Element.prototype.requestFullscreen = () => Promise.reject(new DOMException('Browser declined full-screen', 'NotAllowedError'));
  });
}
async function reception(page: Page) {
  await page.goto('/demo/');
  await expect(page.locator('#health-value')).toHaveText('LIVE');
}
async function facilities(page: Page) {
  await demoNavigator(page).desk('facilities');
  await page.click('#office-enter');
  await expect(page.locator('#office-canvas')).toHaveAttribute('data-rendered', 'true');
}
async function enableOffice(page: Page) {
  await demoNavigator(page).options(() => page.check('#executive-hovering'));
  await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered', 'true');
}
async function audit(page: Page) {
  return page.evaluate(async () => {
    const module = await import(new URL('/assets/tribunal.js', location.href).href);
    const client = new module.BrowserRuntimeClient();
    try {return await (await client.request('/audit/evidence')).json();} finally {client.close();}
  });
}
async function diagnostics(page: Page): Promise<OfficeDiagnostics> {
  return page.evaluate(async () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#office-canvas')!;
    const module = await import(canvas.dataset.module!);
    return module.inspectOffice(canvas);
  });
}
async function exit(page: Page, trigger = '#office-fullscreen-enter') {
  await page.click('#office-fullscreen-exit');
  await expect(page.locator('#office-fullscreen')).not.toBeVisible();
  await expect(page.locator(trigger)).toBeFocused();
}

test('Facilities full-screen retains its actual building, opens picked stories, and returns from an enlarged visit', async ({page}) => {
  await fallback(page); await page.emulateMedia({reducedMotion: 'reduce'}); await reception(page);
  await demoNavigator(page).run(); const before = await audit(page);
  await facilities(page);
  await page.locator('#office-canvas').evaluate(canvas => {canvas.dataset.retained = 'same-canvas';});
  await page.click('#office-enlarge');
  await page.click('#office-fullscreen-enter');
  await expect(page.locator('#office-fullscreen-exit')).toBeFocused();
  await expect(page.locator('#office-modal')).not.toBeVisible();
  await expect(page.locator('#office-fullscreen-status')).toContainText('unavailable');
  await expect(page.locator('#office-fullscreen-drawer')).toBeHidden();
  const scene = await page.locator('#office-canvas').boundingBox();
  expect(scene!.width).toBeGreaterThan(1200); expect(scene!.height).toBeGreaterThan(700);
  await page.click('#office-fullscreen-inspect');
  await page.locator('#office-directory').getByRole('button', {name: /Reception$/}).click();
  await page.click('#office-fullscreen-drawer-close');
  const prop = (await diagnostics(page)).props.find(prop => prop.id === 'ticket-machine')!;
  await page.mouse.click(scene!.x + prop.x, scene!.y + prop.y);
  await expect(page.locator('#office-fullscreen-drawer')).toBeVisible();
  await expect(page.locator('#office-story-title')).toHaveText('The ticket machine');
  await page.locator('#office-story-actions button').first().click();
  await expect(page.locator('#office-story-answer')).not.toBeEmpty();
  await page.click('#office-fullscreen-drawer-close');
  await page.click('#office-walk');
  await expect(page.locator('#office-walking-controls')).toBeVisible();
  const position = (await diagnostics(page)).camera;
  await page.locator('#office-walking-controls').getByRole('button', {name: 'Move forward', exact: true}).click();
  await expect.poll(async () => {const next = (await diagnostics(page)).camera; return Math.hypot(next.x - position.x, next.z - position.z);}).toBeGreaterThan(.1);
  await exit(page);
  await expect(page.locator('#office-home-slot #office-canvas')).toHaveAttribute('data-retained', 'same-canvas');
  await expect(page.locator('#office-modal')).not.toBeVisible();
  const after = await audit(page);
  expect(after.journalEntries).toBe(before.journalEntries); expect(after.headDigest).toBe(before.headDigest);
});

test('full-screen observation keeps its clock, publishes exact output, and respects a Chronicle reader', async ({page}) => {
  test.setTimeout(180000);
  await fallback(page); await reception(page);
  await page.fill('#limit', '1'); await page.check('#authorize-executive-hovering'); await page.click('#run-button');
  await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered', 'true');
  await page.click('#supervision-fullscreen');
  await expect(page.locator('#pause-reading')).toHaveAttribute('aria-label', 'Pause reading');
  await expect(page.locator('#office-fullscreen #run-status')).toHaveAttribute('aria-live', 'polite');
  await expect(page.locator('#office-fullscreen #run-status')).toBeVisible();
  await expect(page.locator('#office-fullscreen-output #output')).toBeVisible();
  await expect(page.locator('#office-fullscreen-log #chronicle-scroll')).toBeVisible();
  await page.click('#pause-reading');
  const before = await audit(page);
  expect(before.journalEntries).toBe(1);
  const heldDecision = await page.locator('#supervision-pane').getAttribute('data-observed-steps');
  await page.click('#watch-settings-toggle'); await page.click('#watch-reorganize');
  await expect(page.locator('#watch-waive')).toBeVisible();
  await expect(page.locator('#watch-waive')).toBeHidden({timeout: 45000});
  expect(await page.locator('#supervision-pane').getAttribute('data-observed-steps')).toBe(heldDecision);
  await expect(page.locator('#office-fullscreen')).toBeVisible();
  let published = false;
  for (let index = 0; index < 65; index++) {
    if (await page.locator('#supervision-next').getAttribute('aria-disabled') === 'true') break;
    const previous = Number(await page.locator('#supervision-pane').getAttribute('data-observed-steps'));
    await page.click('#supervision-next');
    await expect.poll(async () => Number(await page.locator('#supervision-pane').getAttribute('data-observed-steps')), {intervals: [20, 35, 50]}).toBeGreaterThan(previous);
    if (!published && await page.locator('#output').textContent() === '1\n') {
      published = true;
      await expect(page.locator('#chronicle-scroll')).toContainText('One has reported for duty');
      await page.locator('#chronicle-scroll').evaluate(element => {element.scrollTop = 0;});
      await expect.poll(() => page.locator('#chronicle-scroll').evaluate(element => element.scrollTop)).toBe(0);
    }
  }
  expect(published).toBe(true);
  await expect(page.locator('#run-status')).toContainText('Mandate complete');
  await expect(page.locator('#output')).toHaveText('1\n');
  expect(await page.locator('#chronicle-scroll').evaluate(element => element.scrollTop)).toBe(0);
  const after = await audit(page);
  expect(after.journalEntries).toBe(before.journalEntries); expect(after.headDigest).toBe(before.headDigest);
  await exit(page, '#supervision-fullscreen');
  await expect(page.locator('#mandate-output #output')).toHaveText('1\n');
  await expect(page.locator('#evidence-chronicle-slot #chronicle-scroll')).toHaveCount(1);
});

test('live options, nested companion stories, Evidence navigation and autonomy work in full-screen', async ({page}) => {
  await reception(page); await demoNavigator(page).run('3'); const before = await audit(page);
  await enableOffice(page); await page.click('#supervision-fullscreen');
  await page.click('#spotlight-open');
  await expect(page.locator('#companion-dialog')).toBeVisible();
  await expect(page.locator('#companion-dialog')).toContainText('Mandate: 3.');
  await page.locator('[data-companion-close]').click();
  await expect(page.locator('#spotlight-open')).toBeFocused();
  await expect(page.locator('#office-fullscreen')).toBeVisible();
  await page.click('#watch-settings-toggle'); await page.uncheck('#require-companion-roll-call');
  await expect(page.locator('#office-fullscreen-companion')).toBeHidden();
  await page.uncheck('#executive-hovering');
  await expect(page.locator('#office-fullscreen')).not.toBeVisible();
  await expect(page.locator('#executive-hovering')).toBeFocused();
  await expect(page.locator('#display-speed')).toHaveValue('0');
  await page.check('#executive-hovering'); await page.click('#watch-settings-close');
  await page.click('#supervision-fullscreen');
  await page.locator('#office-fullscreen [data-evidence="chronicle"]').click();
  await expect(page.locator('#office-fullscreen')).not.toBeVisible();
  await expect(page.locator('body')).toHaveAttribute('data-desk', 'evidence');
  await expect(page.locator('#evidence-chronicle-slot #chronicle-scroll')).toBeVisible();
  const after = await audit(page);
  expect(after.journalEntries).toBe(before.journalEntries); expect(after.headDigest).toBe(before.headDigest);
});

test('full-screen overlays leave the building visible, fit mobile and enlarged text, and provide keyboard exits', async ({page}, info) => {
  await fallback(page); await reception(page); await demoNavigator(page).run(); await enableOffice(page);
  for (const [width, height] of [[1280, 800], [390, 844], [320, 667], [844, 390]]) {
    await page.setViewportSize({width, height}); await page.click('#supervision-fullscreen');
    await expect(page.locator('#office-fullscreen-exit')).toBeInViewport();
    const geometry = await page.evaluate(() => {
      const stage = document.querySelector('#supervision-canvas')!.getBoundingClientRect();
      const areas = [...document.querySelectorAll<HTMLElement>('.immersive-overlay')].filter(element => !element.closest('[hidden]')).map(element => element.getBoundingClientRect()).filter(rect => rect.width && rect.height);
      return {width: stage.width, height: stage.height, share: areas.reduce((area, rect) => area + rect.width * rect.height, 0) / (innerWidth * innerHeight), overflow: document.querySelector('#office-fullscreen')!.scrollWidth > innerWidth + 1};
    });
    expect(geometry.width).toBe(width); expect(geometry.height).toBe(height);
    expect(geometry.share).toBeLessThan(.49); expect(geometry.overflow).toBe(false);
    if (width === 1280) await page.screenshot({path: info.outputPath('full-screen-desktop.png')});
    await page.selectOption('#office-fullscreen-panels', 'output'); await expect(page.locator('#output')).toBeVisible();
    await page.selectOption('#office-fullscreen-panels', 'log'); await expect(page.locator('#chronicle-scroll')).toBeVisible();
    await page.selectOption('#office-fullscreen-panels', 'none'); await expect(page.locator('#office-fullscreen-output')).toBeHidden(); await expect(page.locator('#office-fullscreen-log')).toBeHidden();
    await page.keyboard.press('Escape'); await expect(page.locator('#supervision-fullscreen')).toBeFocused();
  }
  await page.setViewportSize({width: 390, height: 844}); await page.click('#supervision-fullscreen');
  await page.screenshot({path: info.outputPath('full-screen-mobile.png')});
  const audit = await new AxeBuilder({page}).include('#office-fullscreen').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
  expect(audit.violations).toEqual([]);
  await exit(page, '#supervision-fullscreen');
  await page.setViewportSize({width: 320, height: 667});
  await page.evaluate(() => {for (const rule of ['html{font-size:200% !important}', '*{letter-spacing:.12em !important;word-spacing:.16em !important;line-height:1.5 !important}']) document.styleSheets[0].insertRule(rule);});
  await page.click('#supervision-fullscreen');
  await expect(page.locator('#office-fullscreen-exit')).toBeInViewport();
  expect(await page.locator('#office-fullscreen').evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
  await expect(page.locator('#office-fullscreen-panels')).toHaveValue('none');
  expect((await page.locator('#office-fullscreen-panels').boundingBox())!.width).toBeGreaterThan(100);
  await page.selectOption('#office-fullscreen-panels', 'output'); await expect(page.locator('#output')).toBeVisible();
  const occupied = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>('.immersive-overlay')].filter(element => !element.closest('[hidden]')).map(element => element.getBoundingClientRect()).reduce((area, rect) => area + rect.width * rect.height, 0) / (innerWidth * innerHeight));
  expect(occupied).toBeLessThan(.49);
  await page.screenshot({path: info.outputPath('full-screen-enlarged.png')});
  const enlarged = await new AxeBuilder({page}).include('#office-fullscreen').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
  expect(enlarged.violations).toEqual([]);
  await exit(page, '#supervision-fullscreen');
});

test('browser full-screen exit also restores the original website view', async ({page}) => {
  await reception(page); await facilities(page);
  await page.click('#office-fullscreen-enter'); await expect(page.locator('#office-fullscreen')).toBeVisible();
  await expect.poll(() => page.evaluate(() => !!document.fullscreenElement || document.querySelector('#office-fullscreen-status')!.textContent!.includes('unavailable') || !document.fullscreenEnabled)).toBe(true);
  if (await page.evaluate(() => !!document.fullscreenElement)) {
    test.info().annotations.push({type: 'native-fullscreen', description: 'Browser granted native full-screen; external browser exit restored the website.'});
    expect(await page.evaluate(() => document.fullscreenElement?.id)).toBe('office-fullscreen-surface');
    await page.evaluate(() => document.exitFullscreen());
    await expect(page.locator('#office-fullscreen')).not.toBeVisible();
    await expect(page.locator('#office-fullscreen-enter')).toBeFocused();
  } else {test.info().annotations.push({type: 'native-fullscreen', description: 'Browser declined native full-screen; tab-sized view and exit remained usable.'}); await exit(page);}
  await expect(page.locator('#office-home-slot #office-canvas')).toBeVisible();
});

test('a refused GPU still provides full-screen room inspections and a usable return path', async ({page}) => {
  await fallback(page);
  await page.addInitScript(() => {
    const native = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(this: HTMLCanvasElement, kind: string, ...args: unknown[]) {
      if (kind.includes('webgl')) return null;
      return Reflect.apply(native, this, [kind, ...args]);
    } as typeof native;
  });
  await reception(page); await demoNavigator(page).desk('facilities'); await page.click('#office-enter');
  await expect(page.locator('#office-canvas')).toHaveAttribute('data-renderer', 'directory');
  await page.click('#office-fullscreen-enter'); await page.click('#office-fullscreen-inspect');
  await page.locator('#office-directory').getByRole('button', {name: /Executive$/}).click();
  await page.locator('#office-props').getByRole('button', {name: 'The Exit Strategy', exact: true}).click();
  await page.locator('#office-story-actions').getByRole('button', {name: 'Inspect the strategy'}).click();
  await expect(page.locator('#office-story-answer')).toContainText('cupboard');
  await page.click('#office-fullscreen-drawer-close');
  await page.locator('#office-loading').getByRole('button', {name: 'Try the 3D display again'}).click();
  await expect(page.locator('#office-canvas')).toHaveAttribute('data-renderer', 'directory');
  await expect(page.locator('#office-fullscreen-exit')).toBeFocused();
  await exit(page);
});
