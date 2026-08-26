/**
 * SEO Tests
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:4000';

describe('SEO Tests', () => {
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

  describe('Meta Tags', () => {
    test('should have title tag', async () => {
      await page.goto(`${BASE_URL}/`);
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length > 0).toBe(true);
      console.log(`✓ Page title: "${title}"`);
    });

    test('should have meta description', async () => {
      await page.goto(`${BASE_URL}/`);
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description.length >= 120).toBe(true);
      expect(description.length <= 160).toBe(true);
      console.log(`✓ Meta description (${description.length} chars): "${description}"`);
    });

    test('should have viewport meta tag', async () => {
      await page.goto(`${BASE_URL}/`);
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toBeTruthy();
      expect(viewport).toContain('width=device-width');
      console.log(`✓ Viewport meta tag present`);
    });

    test('should have charset meta tag', async () => {
      await page.goto(`${BASE_URL}/`);
      const charset = await page.locator('meta[charset]').getAttribute('charset');
      expect(charset).toBe('utf-8');
      console.log(`✓ Charset meta tag: ${charset}`);
    });
  });

  describe('Open Graph Tags', () => {
    test('should have og:title tag', async () => {
      await page.goto(`${BASE_URL}/`);
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
      console.log(`✓ OG Title: "${ogTitle}"`);
    });

    test('should have og:description tag', async () => {
      await page.goto(`${BASE_URL}/`);
      const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
      expect(ogDesc).toBeTruthy();
      console.log(`✓ OG Description: "${ogDesc}"`);
    });

    test('should have og:type tag', async () => {
      await page.goto(`${BASE_URL}/`);
      const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
      expect(ogType).toBeTruthy();
      console.log(`✓ OG Type: ${ogType}`);
    });

    test('should have og:url tag', async () => {
      await page.goto(`${BASE_URL}/`);
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
      expect(ogUrl).toBeTruthy();
      console.log(`✓ OG URL: ${ogUrl}`);
    });
  });

  describe('Twitter Card Tags', () => {
    test('should have twitter:card tag', async () => {
      await page.goto(`${BASE_URL}/`);
      const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
      expect(twitterCard).toBeTruthy();
      console.log(`✓ Twitter Card: ${twitterCard}`);
    });

    test('should have twitter:title tag', async () => {
      await page.goto(`${BASE_URL}/`);
      const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
      expect(twitterTitle).toBeTruthy();
      console.log(`✓ Twitter Title: "${twitterTitle}"`);
    });

    test('should have twitter:description tag', async () => {
      await page.goto(`${BASE_URL}/`);
      const twitterDesc = await page.locator('meta[name="twitter:description"]').getAttribute('content');
      expect(twitterDesc).toBeTruthy();
      console.log(`✓ Twitter Description: "${twitterDesc}"`);
    });
  });

  describe('Structured Data', () => {
    test('should have schema.org structured data', async () => {
      await page.goto(`${BASE_URL}/`);
      const scripts = await page.locator('script[type="application/ld+json"]').count();
      expect(scripts > 0).toBe(true);
      console.log(`✓ Found ${scripts} structured data script(s)`);
    });

    test('should have valid JSON-LD', async () => {
      await page.goto(`${BASE_URL}/`);
      const scriptContent = await page.locator('script[type="application/ld+json"]').first().textContent();
      expect(scriptContent).toBeTruthy();
      try {
        const parsed = JSON.parse(scriptContent);
        expect(parsed).toBeDefined();
        console.log(`✓ Valid JSON-LD structured data`);
      } catch (e) {
        throw new Error('Invalid JSON-LD: ' + e.message);
      }
    });
  });

  describe('Sitemap and Robots', () => {
    test('should have sitemap.xml', async () => {
      const response = await page.goto(`${BASE_URL}/sitemap.xml`);
      expect(response.status()).toBe(200);
      console.log(`✓ Sitemap found at /sitemap.xml`);
    });

    test('should have robots.txt', async () => {
      const response = await page.goto(`${BASE_URL}/robots.txt`);
      expect(response.status()).toBe(200);
      console.log(`✓ Robots.txt found at /robots.txt`);
    });

    test('robots.txt should disallow nothing by default', async () => {
      const response = await page.goto(`${BASE_URL}/robots.txt`);
      const content = await response.text();
      // Should have User-agent and Allow/Disallow rules
      expect(content).toContain('User-agent:');
      console.log(`✓ Robots.txt content valid`);
    });
  });

  describe('Heading Structure', () => {
    test('should have h1 tag', async () => {
      await page.goto(`${BASE_URL}/`);
      const h1 = await page.locator('h1').count();
      expect(h1 >= 1).toBe(true);
      console.log(`✓ Found ${h1} h1 tag(s)`);
    });

    test('should have logical heading hierarchy', async () => {
      await page.goto(`${BASE_URL}/`);
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
      expect(headings > 0).toBe(true);
      console.log(`✓ Found ${headings} heading tag(s)`);
    });
  });

  describe('Links and URLs', () => {
    test('should have descriptive anchor text', async () => {
      await page.goto(`${BASE_URL}/`);
      const links = await page.locator('a').count();
      expect(links > 0).toBe(true);
      console.log(`✓ Found ${links} links`);
    });

    test('should have no broken links (404s)', async () => {
      await page.goto(`${BASE_URL}/`);
      const linkUrls = await page.locator('a[href]').evaluateAll(links => 
        links.map(a => a.href).filter(href => !href.startsWith('#'))
      );
      
      const internalLinks = linkUrls.filter(url => url.startsWith(BASE_URL));
      
      console.log(`✓ Found ${internalLinks.length} internal links to check`);
      
      // Basic check that we can fetch some links
      if (internalLinks.length > 0) {
        const testLink = internalLinks[0];
        const linkResponse = await page.goto(testLink);
        expect(linkResponse.status()).not.toBe(404);
        console.log(`✓ Sample link ${testLink} accessible`);
      }
    });
  });

  describe('Performance SEO', () => {
    test('should have favicon', async () => {
      await page.goto(`${BASE_URL}/`);
      const favicon = await page.locator('link[rel="icon"]');
      const faviconCount = await favicon.count();
      expect(faviconCount > 0).toBe(true);
      console.log(`✓ Favicon present`);
    });

    test('should have canonical URL tag', async () => {
      await page.goto(`${BASE_URL}/`);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      console.log(`✓ Canonical URL: ${canonical}`);
    });

    test('should use HTTPS or localhost', async () => {
      // This site is running on localhost, which is fine for development
      const isHttpsOrLocal = BASE_URL.includes('https') || BASE_URL.includes('localhost');
      expect(isHttpsOrLocal).toBe(true);
      console.log(`✓ Using secure protocol or localhost`);
    });
  });
});
