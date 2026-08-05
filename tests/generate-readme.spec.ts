import { test, expect } from "@playwright/test";

const profile = {
  name: "Yurii",
  subtitle: "Automation QA Engineer",
  currentWork: "test-automation-framework",
  currentWorkLink: "https://github.com/Yurii-Rab/test-automation-framework",
  collaborateOn: "playwright-projects",
  collaborateOnLink: "https://github.com/Yurii-Rab/playwright-projects",
  linkedin: "yurii-rabishchuk",
  github: "Yurii-Rab",
};

// two skills from three categories
const skills = [
  "javascript",
  "typescript",
  "selenium",
  "cypress",
  "docker",
  "jenkins",
];

const cyan = "#34ebdb";

test("generates a README from the filled in profile", async ({ page }) => {
  await page.goto("./");

  await page.locator("#title-name").fill(profile.name);
  await page.locator("#subtitle").fill(profile.subtitle);

  await page.locator("#currentWork").fill(profile.currentWork);
  await page.locator("#currentWork-link").fill(profile.currentWorkLink);
  await page.locator("#collaborateOn").fill(profile.collaborateOn);
  await page.locator("#collaborateOn-link").fill(profile.collaborateOnLink);

  for (const skill of skills) {
    await page.locator(`label[for="${skill}"]`).click();
    await expect(page.locator(`#${skill}`)).toBeChecked();
  }

  await page.locator("#linkedin").fill(profile.linkedin);
  await page.locator("#github").fill(profile.github);

  await page.locator('label[for="top-languages"]').click();
  await page.locator("#top-languages-open-btn").click();
  await page.locator("#top-lang-title-color").fill(cyan);

  await page.getByRole("button", { name: "Generate README" }).click();

  const markdown = page.locator("#markdown-content");
  await expect(markdown).toContainText(profile.subtitle);
  await expect(markdown).toContainText("typescript");
  await expect(markdown).toContainText(`title_color=${cyan.replace("#", "")}`);
});
