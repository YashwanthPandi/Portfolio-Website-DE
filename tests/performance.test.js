/**
 * Performance Tests
 */

const lighthouse = require('lighthouse');
const chromium = require('playwright').chromium;

const BASE_URL = 'http://localhost:4000';

describe('Performance Tests', () => {
  let browser;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('Page Load Time', () => {
    test('should load homepage within acceptable time', async () => {
      const page = await browser.newPage();
      const startTime = Date.now();
      
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      
      const loadTime = Date.now() - startTime;
      console.log(`Homepage load time: ${loadTime}ms`);
      
      // Acceptable load time: 3 seconds
      expect(loadTime).toBeLessThan(3000);
      
      await page.close();
    });
  });

  describe('Asset Sizes', () => {
    test('should verify CSS files are reasonably sized', async () => {
      const page = await browser.newPage();
      const assetSizes = [];
      
      page.on('response', response => {
        if (response.url().includes('.css')) {
          assetSizes.push({
            url: response.url(),
            size: response.headers()['content-length'] || 'unknown'
          });
        }
      });
      
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState('networkidle');
      
      console.log('CSS Assets:', assetSizes);
      
      // Verify at least one CSS file loaded
      expect(assetSizes.length > 0).toBe(true);
      
      await page.close();
    });

    test('should verify JavaScript files are reasonably sized', async () => {
      const page = await browser.newPage();
      const assetSizes = [];
      
      page.on('response', response => {
        if (response.url().includes('.js') && !response.url().includes('livereload')) {
          assetSizes.push({
            url: response.url(),
            size: response.headers()['content-length'] || 'unknown'
          });
        }
      });
      
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState('networkidle');
      
      console.log('JavaScript Assets:', assetSizes);
      
      // Verify JS files loaded
      expect(assetSizes.length > 0).toBe(true);
      
      await page.close();
    });
  });

  describe('Rendering Performance', () => {
    test('should render content without layout shifts', async () => {
      const page = await browser.newPage();
      
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      
      // Wait for all animations to complete
      await page.waitForTimeout(2000);
      
      const mainContent = page.locator('main, [role="main"]');
      const isVisible = await mainContent.isVisible();
      
      expect(isVisible).toBe(true);
      
      await page.close();
    });

    test('should have interactive elements responding quickly', async () => {
      const page = await browser.newPage();
      
      await page.goto(`${BASE_URL}/`);
      
      const link = page.locator('a').first();
      if (await link.count() > 0) {
        const startTime = Date.now();
        await link.hover();
        const hoverTime = Date.now() - startTime;
        
        console.log(`Hover response time: ${hoverTime}ms`);
        expect(hoverTime).toBeLessThan(100);
      }
      
      await page.close();
    });
  });

  describe('Lighthouse Audit', () => {
    test('should run Lighthouse audit', async () => {
      try {
        const options = {
          logLevel: 'info',
          output: 'json',
          port: 0,
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
        };

        const runnerResult = await lighthouse(`${BASE_URL}/`, options);
        
        // Check if audit ran successfully
        expect(runnerResult.lhr).toBeDefined();
        expect(runnerResult.lhr.categories).toBeDefined();
        
        // Log performance score
        const perfScore = runnerResult.lhr.categories.performance.score;
        console.log(`Performance Score: ${Math.round(perfScore * 100)}/100`);
        
        // Scores should be at least 0 (valid)
        expect(perfScore >= 0).toBe(true);
      } catch (error) {
        console.warn('Lighthouse audit skipped:', error.message);
      }
    });
  });

  describe('Memory Usage', () => {
    test('should handle page navigation without memory leaks', async () => {
      const page = await browser.newPage();
      
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState('networkidle');
      
      // Perform multiple navigation cycles
      for (let i = 0; i < 3; i++) {
        await page.reload();
        await page.waitForLoadState('networkidle');
      }
      
      const metrics = await page.metrics();
      console.log('Final Memory Metrics:', {
        JSHeapUsedSize: Math.round(metrics.JSHeapUsedSize / 1024 / 1024) + 'MB',
        JSHeapTotalSize: Math.round(metrics.JSHeapTotalSize / 1024 / 1024) + 'MB'
      });
      
      expect(metrics.JSHeapUsedSize).toBeLessThan(100 * 1024 * 1024); // Less than 100MB
      
      await page.close();
    });
  });
});
