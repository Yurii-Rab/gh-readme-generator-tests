import { test, expect } from "@playwright/test";
import { ReadmeGeneratorPage } from "./pages/readme-generator.page";

const profile = {
  name: "Yurii",
  subtitle: "Automation QA Engineer",
  currentWork: "test-automation-framework",
  currentWorkLink: "https://github.com/Yurii-Rab/test-automation-framework",
  collaborateOn: "playwright-projects",
  collaborateOnLink: "https://github.com/Yurii-Rab/playwright-projects",
};

const socials = {
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
  const generator = new ReadmeGeneratorPage(page);
  await generator.open();

  await generator.fillProfile(profile);
  await generator.selectSkills(skills);
  await generator.fillSocials(socials);
  await generator.enableTopSkills(cyan);

  for (const skill of skills) {
    await expect(generator.skillCheckbox(skill)).toBeChecked();
  }

  await generator.generate();

  await expect(generator.markdown).toContainText(profile.subtitle);
  await expect(generator.markdown).toContainText("typescript");
  await expect(generator.markdown).toContainText(
    `title_color=${cyan.replace("#", "")}`,
  );
});
