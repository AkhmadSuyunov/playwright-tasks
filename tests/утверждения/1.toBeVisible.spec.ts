import { test, expect } from '@playwright/test';

test.describe('Тестирование видимости элементов с toBeVisible()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/assertion_tobevisible');
  });

  test('Базовый тест видимости элемента', async ({ page }) => {
    // Задание 1: Проверка видимости элемента
    // 1. Найти элемент с id "always-visible"
    // 2. Проверить что элемент видим с помощью toBeVisible()
    // 3. Проверить что элемент содержит текст "Всегда видимый элемент"
    const elem = page.locator('#always-visible');
    await expect(elem).toBeVisible();
    await expect(elem).toHaveText('Всегда видимый элемент');
  });

  test('Тест элементов с разными типами скрытия', async ({ page }) => {
    // Задание 2: Проверка скрытых элементов
    // 1. Найти три элемента с разными способами скрытия:
    //    - #toggle-display (display: none)
    //    - #toggle-visibility (visibility: hidden)
    //    - #toggle-opacity (opacity: 0)
    // 2. Проверить что #toggle-display и #toggle-visibility не видны с помощью not.toBeVisible()
    // 3. Проверить что #toggle-opacity виден с помощью toBeVisible()
    const displayElem = page.locator('#toggle-display');
    const visibilityElem = page.locator('#toggle-visibility');
    const opacityElem = page.locator('#toggle-opacity');

    await expect(displayElem).not.toBeVisible();
    await expect(visibilityElem).not.toBeVisible();
    await expect(opacityElem).toBeVisible();
  });

  test('Тест изменения видимости элементов', async ({ page }) => {
    // Задание 3: Проверка изменения видимости
    // 1. Найти три кнопки для показа элементов:
    //    - #show-display
    //    - #show-visibility
    //    - #show-opacity
    // 2. Кликнуть по каждой кнопке
    // 3. После каждого клика проверить:
    //    - что соответствующий элемент стал видимым (toBeVisible())
    //    - что CSS свойства изменились на:
    //      - display: block
    //      - visibility: visible
    //      - opacity: 1
    const displayElem = page.locator('#toggle-display');
    const visibilityElem = page.locator('#toggle-visibility');
    const opacityElem = page.locator('#toggle-opacity');

    await page.locator('#show-display').click();
    await expect(displayElem).toBeVisible();
    await expect(displayElem).toHaveCSS('display', 'block');

    await page.locator('#show-visibility').click();
    await expect(visibilityElem).toBeVisible();
    await expect(visibilityElem).toHaveCSS('visibility', 'visible');

    await page.locator('#show-opacity').click();
    await expect(opacityElem).toBeVisible();
    await expect(opacityElem).toHaveCSS('opacity', '1');
  });

  test('Тест элемента с задержкой появления', async ({ page }) => {
    // Задание 4: Проверка элемента с задержкой
    // 1. Найти элемент #delayed-element
    // 2. Проверить что он не видим
    // 3. Найти кнопку #show-delayed и кликнуть по ней
    // 4. С таймаутом 3 секунды дождаться появления элемента
    // 5. Проверить что элемент содержит текст "Элемент с задержкой появления"
    const delayedElem = page.locator('#delayed-element');

    await expect(delayedElem).not.toBeVisible();
    await page.locator('#show-delayed').click();
    await expect(delayedElem).toBeVisible({ timeout: 3000 });
    await expect(delayedElem).toHaveText('Элемент с задержкой появления');
  });
});
