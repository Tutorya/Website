import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const widths = [320, 390, 768, 1024, 1440];
const expertiseDomains = ['Informatique', 'Mécanique', 'Intelligence artificielle', 'Gestion de projet', 'Cybersécurité', 'Biotechnologie', 'Santé'];

async function openHome(page) {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
}

test('la page expose le bon service et les quatre étapes', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await openHome(page);
  await expect(page).toHaveTitle(/Tutorat académique pour écoles d’ingénieurs/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('Un suivi académique attentif');
  await expect(page.locator('[data-method-step]')).toHaveCount(4);
  for (const name of ['Diagnostic', 'Accompagnement', 'Suivi continu', 'Reporting école']) {
    await expect(page.locator('[data-method-step] h3').filter({ hasText: name })).toBeVisible();
  }
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  expect(errors).toEqual([]);
});

test('le volume de suivi fourni est visible dès l’accueil sans compteur animé', async ({ page }) => {
  await openHome(page);
  const proof = page.locator('.hero-copy .hero-proof');
  await expect(proof).toHaveCount(1);
  await expect(proof).toBeVisible();
  await expect(proof).toHaveText('Plus de 300 apprentis déjà suivis');
  await expect(proof).toHaveCSS('animation-name', 'none');
  await expect(proof).not.toHaveAttribute('aria-live');
});

test('l’équipe pluridisciplinaire et ses spécialités sont explicites', async ({ page }) => {
  await openHome(page);
  await expect(page.locator('.hero-description')).toContainText('équipe pluridisciplinaire');
  const team = page.locator('#equipe');
  await expect(team.getByRole('heading', { level: 2 })).toContainText('Une équipe élargie.');
  await expect(team).toContainText('Informatique, mécanique et autres domaines de l’ingénierie');
  await expect(team).toContainText('adapter l’accompagnement aux filières');
  const domains = team.getByRole('list', { name: 'Domaines de l’équipe' });
  await expect(domains.getByRole('listitem')).toHaveText([...expertiseDomains, 'Et d’autres domaines de l’ingénierie']);
  for (const domain of expertiseDomains) {
    await expect(domains.getByText(domain, { exact: true })).toBeVisible();
  }
  await expect(domains.locator('svg[aria-hidden="true"][focusable="false"]')).toHaveCount(expertiseDomains.length);
  const specialty = page.locator('.faq-list details').filter({ has: page.locator('summary', { hasText: 'Quelles spécialités d’ingénierie accompagnez-vous' }) });
  await specialty.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(specialty.locator('p')).toBeVisible();
  for (const domain of expertiseDomains) {
    await expect(specialty.locator('p')).toContainText(domain.toLocaleLowerCase('fr-FR'));
  }
});

test('les ancres et liens internes pointent vers des destinations existantes', async ({ page, request }) => {
  await openHome(page);
  const brokenAnchors = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')]
    .map((a) => a.getAttribute('href')).filter((href) => href.length < 2 || !document.getElementById(href.slice(1))));
  expect(brokenAnchors).toEqual([]);
  for (const route of ['/', '/mentions-legales.html', '/confidentialite.html', '/assets/favicon.svg', '/robots.txt']) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
  }
  const response = await request.get('/une-page-inexistante/test');
  expect(response.status()).toBe(404);
  await page.goto('/une-page-inexistante/test');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Retrouvons le fil.');
  await page.getByRole('link', { name: 'Revenir à l’accueil' }).click();
  await expect(page).toHaveURL(/\/$/);
});

for (const width of widths) {
  test(`confort de lecture et panneau bleu à ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await openHome(page);
    const floors = {
      '.nav-link': 15, '.button--small': 15, '.hero-actions .button': 16,
      '.hero-description': 16, '.hero-proof span': 16,
      '.path-link strong': 16, '.path-link small': 14, '.folio-top p': 14,
      '.folio-footer': 14, '.role-list dd': 16, '.step-content > p': 16,
      '.step-title p': 14, '.step-outcome': 14, '.report-preview dd': 14,
      '.faq-list summary': 16, '.faq-list details p': 16,
      '.demo-note': 14, '.field label': 16, '.field input': 16,
      '.field-hint': 14, '.privacy-note': 14, '.footer-links a': 14,
    };
    const sizes = await page.evaluate((selectors) => Object.fromEntries(selectors.map((selector) => [
      selector, parseFloat(getComputedStyle(document.querySelector(selector)).fontSize),
    ])), Object.keys(floors));
    for (const [selector, minimum] of Object.entries(floors)) {
      expect(sizes[selector], selector).toBeGreaterThanOrEqual(minimum);
    }
    const folio = await page.locator('.hero-path').evaluate((element) => {
      const panel = element.getBoundingClientRect();
      const links = [...element.querySelectorAll('.path-link')].map((link) => link.getBoundingClientRect());
      const content = [...element.querySelectorAll('.path-link strong, .path-link small')];
      return {
        contained: content.every((item) => {
          const bounds = item.getBoundingClientRect();
          return bounds.left >= panel.left && bounds.right <= panel.right && bounds.bottom <= panel.bottom && item.scrollWidth <= item.clientWidth + 1;
        }),
        overlap: links.some((a, index) => links.slice(index + 1).some((b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top)),
      };
    });
    expect(folio.contained).toBe(true);
    expect(folio.overlap).toBe(false);
  });

  test(`mise en page sans débordement à ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await openHome(page);
    const result = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
      overflowing: [...document.querySelectorAll('main *')].filter((element) => {
        if (!element.getClientRects().length) return false;
        const rect = element.getBoundingClientRect();
        return rect.right > innerWidth + 1 || rect.left < -1;
      }).map((element) => `${element.tagName}.${element.className}`).slice(0, 10),
    }));
    expect(result.document).toBeLessThanOrEqual(result.viewport + 1);
    expect(result.overflowing).toEqual([]);
    // Un mot long ne doit pas élargir la grille jusque dans la gouttière,
    // même si le document entier ne présente pas de défilement horizontal.
    const teamBounds = await page.locator('.team-layout').evaluate((element) => ({
      right: element.getBoundingClientRect().right,
      childrenRight: Math.max(...[...element.children].map((child) => child.getBoundingClientRect().right)),
    }));
    expect(teamBounds.childrenRight).toBeLessThanOrEqual(teamBounds.right + 1);
    const expertiseLayout = await page.locator('.expertise-list').evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const items = [...element.children].map((item) => item.getBoundingClientRect());
      return {
        columns: getComputedStyle(element).gridTemplateColumns.split(' ').length,
        contained: items.every((item) => item.left >= bounds.left - 1 && item.right <= bounds.right + 1 && item.bottom <= bounds.bottom + 1),
        overlaps: items.some((item, index) => items.slice(index + 1).some((other) => item.left < other.right && item.right > other.left && item.top < other.bottom && item.bottom > other.top)),
      };
    });
    expect(expertiseLayout.columns).toBe(width <= 640 ? 1 : width <= 1120 ? 2 : 4);
    expect(expertiseLayout.contained).toBe(true);
    expect(expertiseLayout.overlaps).toBe(false);
    if (width <= 896) {
      const headerHeight = await page.locator('.site-header').evaluate((element) => element.getBoundingClientRect().height);
      expect(headerHeight).toBeLessThanOrEqual(82);
    }
    await expect(page.locator('[data-demo-form]')).toBeVisible();
  });
}

test('navigation mobile : ouverture, Échap et fermeture après un lien', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHome(page);
  // Le nom accessible devient « Fermer » lorsque le menu est ouvert.
  const toggle = page.locator('[data-menu-toggle]');
  const nav = page.getByRole('navigation', { name: 'Navigation principale' });
  await expect(nav).toBeHidden();
  await toggle.click();
  await expect(nav).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await nav.getByRole('link', { name: 'Notre méthode', exact: true }).click();
  await expect(nav).toBeHidden();
  await expect(page).toHaveURL(/#methode$/);
  await expect(page.locator('#methode')).toBeFocused();
  const top = await page.locator('#methode').evaluate((el) => el.getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(80);
});

test('le lien d’évitement est accessible au clavier', async ({ page }) => {
  await openHome(page);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('les questions fréquentes fonctionnent au clavier', async ({ page }) => {
  await openHome(page);
  const first = page.locator('.faq-list details').first();
  await first.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(first).toHaveAttribute('open', '');
  await expect(first.locator('p')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(first).not.toHaveAttribute('open');
});

test('formulaire : erreurs liées, résumé focalisé et aucune requête d’envoi', async ({ page }) => {
  const posts = [];
  page.on('request', (request) => { if (request.method() !== 'GET') posts.push(request.method()); });
  await openHome(page);
  await page.getByRole('button', { name: 'Tester le formulaire' }).click();
  await expect(page.locator('[data-error-summary]')).toBeFocused();
  await expect(page.locator('[data-error-summary] li')).toHaveCount(2);
  await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#message-error')).toBeVisible();
  await page.locator('[data-error-summary] a').first().click();
  await expect(page.locator('#email')).toBeFocused();
  await page.locator('#email').fill('adresse-invalide');
  await page.locator('#message').fill('Court');
  await page.getByRole('button', { name: 'Tester le formulaire' }).click();
  await expect(page.locator('#email-error')).toContainText('adresse e-mail valide');
  await expect(page.locator('#message-error')).toContainText('20 caractères');
  expect(posts).toEqual([]);
});

test('formulaire valide : résultat honnête, pas de stockage ni de perte de saisie', async ({ page }) => {
  const requests = [];
  await openHome(page);
  page.on('request', (request) => requests.push(request.url()));
  await page.locator('#email').fill('contact@example.com');
  const message = 'Nous souhaitons échanger sur le suivi académique de notre école.';
  await page.locator('#message').fill(message);
  await page.getByRole('button', { name: 'Tester le formulaire' }).click();
  await expect(page.getByRole('status')).toContainText('Aucun message n’a été envoyé ni enregistré');
  await expect(page.locator('#message')).toHaveValue(message);
  await expect(page.locator('[data-error-summary]')).toBeHidden();
  const storage = await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length, cookies: document.cookie }));
  expect(storage).toEqual({ local: 0, session: 0, cookies: '' });
  expect(requests).toEqual([]);
  expect(page.url()).not.toContain('example.com');
  await expect(page.getByRole('button', { name: 'Prendre rendez-vous' })).toBeDisabled();
});

test('le site charge uniquement des ressources locales', async ({ page }) => {
  const external = [];
  const failures = [];
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:4174/')) external.push(request.url());
  });
  page.on('response', (response) => { if (response.status() >= 400) failures.push(response.url()); });
  await openHome(page);
  expect(external).toEqual([]);
  expect(failures).toEqual([]);
  const fonts = await page.evaluate(() => {
    const loaded = [...document.fonts].filter((font) => font.status === 'loaded').map((font) => font.family.replaceAll('"', ''));
    return { loaded, heading: getComputedStyle(document.querySelector('h1')).fontFamily, body: getComputedStyle(document.body).fontFamily };
  });
  expect(fonts.loaded).toEqual(expect.arrayContaining(['Libre Bodoni', 'Public Sans']));
  expect(fonts.heading).toContain('Libre Bodoni');
  expect(fonts.body).toContain('Public Sans');
});

test('sans JavaScript : contenu, navigation et FAQ restent disponibles, aucun envoi', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, colorScheme: 'light' });
  const page = await context.newPage();
  await page.goto(baseURL);
  await expect(page.getByRole('navigation', { name: 'Navigation principale' })).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.hero-proof')).toHaveText('Plus de 300 apprentis déjà suivis');
  await expect(page.getByRole('button', { name: 'Tester le formulaire' })).toBeDisabled();
  await expect(page.locator('#email')).toBeDisabled();
  await page.locator('.faq-list summary').first().click();
  await expect(page.locator('.faq-list details').first()).toHaveAttribute('open', '');
  await context.close();
});

test('thèmes : préférence système et surcharge explicite', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await openHome(page);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.goto('/?scoutTheme=light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.goto('/?scoutTheme=inconnu');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('mouvement réduit : le défilement n’est pas animé', async ({ page }) => {
  await openHome(page);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await expect(page.locator('.trace')).toHaveCSS('animation-name', 'none');
});

test('le folio premium relie les quatre chapitres sans photo ni données métier fictives', async ({ page }) => {
  await openHome(page);
  await expect(page.locator('.hero-path')).toBeVisible();
  const anchors = page.locator('.hero-path .path-link');
  await expect(anchors).toHaveCount(4);
  for (const [index, id] of ['diagnostic', 'tutorat', 'suivi', 'reporting'].entries()) {
    await expect(anchors.nth(index)).toHaveAttribute('href', `#${id}`);
  }
  await expect(page.locator('img, picture, video, iframe')).toHaveCount(0);
  const geometry = await page.locator('.hero-path').evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return [...element.querySelectorAll('.path-link')].every((link) => {
      const rect = link.getBoundingClientRect();
      return rect.left >= bounds.left && rect.right <= bounds.right && rect.height >= 44;
    });
  });
  expect(geometry).toBe(true);
  await anchors.first().click();
  await expect(page).toHaveURL(/#diagnostic$/);
});

for (const theme of ['light', 'dark']) {
  test(`accessibilité automatisée accueil, thème ${theme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await openHome(page);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
  });
}

for (const route of ['/mentions-legales.html', '/confidentialite.html', '/404.html']) {
  test(`page secondaire accessible : ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toHaveCount(1);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('le contact en erreur reste accessible sur mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHome(page);
  await page.getByRole('button', { name: 'Tester le formulaire' }).click();
  const results = await new AxeBuilder({ page }).include('[data-demo-form]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(results.violations).toEqual([]);
});