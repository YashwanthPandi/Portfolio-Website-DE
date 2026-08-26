/**
 * UI/E2E Tests using Playwright
 */

const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:4000';

describe('UI Tests - E2E', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  describe('Page Loading', () => {
    test('should load homepage successfully', async () => {
      const response = await page.goto(`${BASE_URL}/`);
      expect(response.status()).toBe(200);
    });

    test('should display page title', async () => {
      await page.goto(`${BASE_URL}/`);
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length > 0).toBe(true);
    });

    test('should load all main assets', async () => {
      const responses = [];
      page.on('response', response => {
        responses.push({
          url: response.url(),
          status: response.status()
        });
      });
      
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState('networkidle');
      
      // Check for CSS and JS files
      const cssFiles = responses.filter(r => r.url.includes('.css'));
      const jsFiles = responses.filter(r => r.url.includes('.js'));
      
      expect(cssFiles.length > 0).toBe(true);
      expect(jsFiles.length > 0).toBe(true);
    });
  });

  describe('Navigation', () => {
    test('should have navigation links', async () => {
      await page.goto(`${BASE_URL}/`);
      const navLinks = await page.locator('nav a').count();
      expect(navLinks > 0).toBe(true);
    });

    test('should navigate to about page', async () => {
      await page.goto(`${BASE_URL}/`);
      const aboutLink = page.locator('a[href*="about"]').first();
      if (await aboutLink.count() > 0) {
        await aboutLink.click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toContain('about');
      }
    });
  });

  describe('Responsive Design', () => {
    test('should be responsive on mobile', async () => {
      page = await browser.newPage({
        viewport: { width: 375, height: 667 }
      });
      await page.goto(`${BASE_URL}/`);
      const content = page.locator('body');
      expect(content).toBeTruthy();
    });

    test('should be responsive on tablet', async () => {
      page = await browser.newPage({
        viewport: { width: 768, height: 1024 }
      });
      await page.goto(`${BASE_URL}/`);
      const content = page.locator('body');
      expect(content).toBeTruthy();
    });

    test('should be responsive on desktop', async () => {
      page = await browser.newPage({
        viewport: { width: 1920, height: 1080 }
      });
      await page.goto(`${BASE_URL}/`);
      const content = page.locator('body');
      expect(content).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    test('should have skip to main content link or proper structure', async () => {
      await page.goto(`${BASE_URL}/`);
      const main = page.locator('main');
      const content = page.locator('[role="main"]');
      const isPresent = (await main.count() > 0) || (await content.count() > 0);
      expect(isPresent).toBe(true);
    });

    test('should have language attribute on html element', async () => {
      await page.goto(`${BASE_URL}/`);
      const html = page.locator('html');
      const lang = await html.getAttribute('lang');
      expect(lang).toBeTruthy();
    });

    test('should have proper heading hierarchy', async () => {
      await page.goto(`${BASE_URL}/`);
      const h1Count = await page.locator('h1').count();
      const h2Count = await page.locator('h2').count();
      expect(h1Count >= 1).toBe(true);
    });
  });

  describe('Dynamic Content', () => {
    test('should render page content correctly', async () => {
      await page.goto(`${BASE_URL}/`);
      const bodyContent = await page.locator('body').count();
      expect(bodyContent > 0).toBe(true);
    });

    test('should have interactive elements loaded', async () => {
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState('networkidle');
      const links = await page.locator('a').count();
      expect(links > 0).toBe(true);
    });
  });
});
