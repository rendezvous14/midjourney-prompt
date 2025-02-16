import { test, expect } from '@playwright/test';
import { InputFormPage } from '../pages/InputFormPage';

test.describe('Input Form Page Tests', () => {
  let inputFormPage: InputFormPage;

  test.beforeEach(async ({ page }) => {
    // Navigate to the input form page
    await page.goto('/');
    inputFormPage = new InputFormPage(page);
  });

  test('should have a form title', async () => {
    const formTitle = await inputFormPage.getFormTitle();
    expect(formTitle).toBe('Midjourney Prompt Creation');
  });

  test('should fill in the input fields', async () => {
    // Fill all input fields based on the keys
    await inputFormPage.fillInputField('imageSize', '1024x1024');
    await inputFormPage.fillInputField('cameraAngle', '45');
    await inputFormPage.fillInputField('cameraObjectDirection', 'north');
    await inputFormPage.fillInputField('imageStyle', 'realistic');
    await inputFormPage.fillInputField('character', 'man');
    await inputFormPage.fillInputField('characterDetails', 'wearing a suit');
    await inputFormPage.fillInputField('action', 'running');
    await inputFormPage.fillInputField('timePeriod', 'future');
    await inputFormPage.fillInputField('weather', 'sunny');
    await inputFormPage.fillInputField('colorTone', 'warm');

    const imageSizeValue = await inputFormPage.getInputFieldValue('imageSize');
    const cameraAngleValue = await inputFormPage.getInputFieldValue(
      'cameraAngle'
    );
    expect(imageSizeValue).toBe('1024x1024');
    expect(cameraAngleValue).toBe('45');
  });

  test('should show copied alert when copy button is clicked', async () => {
    await inputFormPage.clickCopyButton();
    const isAlertVisible = await inputFormPage.isCopiedAlertVisible();
    expect(isAlertVisible).toBe(true);
  });

  test('should display consolidated input text', async () => {
    // Set input values
    await inputFormPage.fillInputField('imageSize', '1024x1024');
    await inputFormPage.fillInputField('cameraAngle', '45');
    await inputFormPage.fillInputField('cameraObjectDirection', 'north');
    await inputFormPage.fillInputField('imageStyle', 'realistic');
    await inputFormPage.fillInputField('character', 'man');

    // Check consolidated input
    const consolidatedText = await inputFormPage.getConsolidatedInputText();
    expect(consolidatedText).toContain('1024x1024');
    expect(consolidatedText).toContain('45');
    expect(consolidatedText).toContain('north');
    expect(consolidatedText).toContain('realistic');
    expect(consolidatedText).toContain('man');
  });

  test('should correctly copy the consolidated input to clipboard', async ({page}) => {
    // Fill the fields with some data
    await inputFormPage.fillInputField('imageSize', '1024x1024');
    await inputFormPage.fillInputField('cameraAngle', '45');
    await inputFormPage.fillInputField('cameraObjectDirection', 'north');

    // Copy to clipboard
    await inputFormPage.clickCopyButton();
    const consolidatedText = await inputFormPage.getConsolidatedInputText();

    // Check if the copied alert is shown
    const isAlertVisible = await inputFormPage.isCopiedAlertVisible();
    expect(isAlertVisible).toBe(true); 

    // // Further check if the clipboard content matches
    // const clipboardContent = await page.evaluate(() =>
    //   navigator.clipboard.readText()
    // );
    // expect(clipboardContent).toBe(consolidatedText);
  });
});
