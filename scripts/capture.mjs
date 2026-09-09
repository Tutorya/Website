import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const directory = fileURLToPath(new URL('../.impeccable/review/reading/', import.meta.url));
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
try {
  for (const [name, width, height, colorScheme] of [
    ['desktop', 1440, 1000, 'light'],
    ['mobile', 390, 844, 'light'],
    ['small-mobile', 320, 780, 'light'],
    ['tablet', 768, 1024, 'light'],
    ['small-desktop', 1024, 768, 'light'],
    ['user-865', 865, 1000, 'light'],
    ['dark', 1440, 1000, 'dark'],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, colorScheme, reducedMotion: 'reduce', locale: 'fr-FR' });
    const response = await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    if (response?.status() !== 200) throw new Error(`Aperçu indisponible : HTTP ${response?.status()}. Redémarrer le serveur après une modification des outils de build.`);
    await expect(page.locator('#hero-title')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('#hero-title')).toHaveCSS('font-family', /Libre Bodoni/);
    await page.screenshot({ path: join(directory, `${name}.png`), fullPage: true });
    if (name === 'desktop' || name === 'mobile') {
      await page.screenshot({ path: join(directory, `${name}-hero.png`) });
    }
    console.log(`[capture] ${name}: ${width} × ${height}`);
    await page.close();
  }
} finally {
  await browser.close();
}