import { Page, Locator } from "@playwright/test";

export type Profile = {
  name: string;
  subtitle: string;
  currentWork: string;
  currentWorkLink: string;
  collaborateOn: string;
  collaborateOnLink: string;
};

export class ReadmeGeneratorPage {
  readonly markdown: Locator;
  readonly starCount: Locator;
  readonly currentWork: Locator;
  readonly funFactPrefix: Locator;

  private readonly fileInput: Locator;

  constructor(private readonly page: Page) {
    this.markdown = page.locator("#markdown-content");
    this.starCount = page.locator('a[aria-label^="Star"] .github-count');
    this.currentWork = page.locator("#currentWork");
    this.funFactPrefix = page.locator("#funFact-prefix");
    this.fileInput = page.locator('input[type="file"]');
  }

  async open() {
    await this.page.goto("./");
  }

  async fillProfile(profile: Profile) {
    await this.page.locator("#title-name").fill(profile.name);
    await this.page.locator("#subtitle").fill(profile.subtitle);
    await this.currentWork.fill(profile.currentWork);
    await this.page.locator("#currentWork-link").fill(profile.currentWorkLink);
    await this.page.locator("#collaborateOn").fill(profile.collaborateOn);
    await this.page
      .locator("#collaborateOn-link")
      .fill(profile.collaborateOnLink);
  }

  // the checkboxes sit under a styled span, so the label is what a user clicks
  async selectSkills(skills: string[]) {
    for (const skill of skills) {
      await this.page.locator(`label[for="${skill}"]`).click();
    }
  }

  skillCheckbox(skill: string): Locator {
    return this.page.locator(`#${skill}`);
  }

  async fillSocials(socials: Record<string, string>) {
    for (const [field, value] of Object.entries(socials)) {
      await this.page.locator(`#${field}`).fill(value);
    }
  }

  // the colour input is only rendered once the options panel is open
  async enableTopSkills(titleColor: string) {
    await this.page.locator('label[for="top-languages"]').click();
    await this.page.locator("#top-languages-open-btn").click();
    await this.page.locator("#top-lang-title-color").fill(titleColor);
  }

  async generate() {
    await this.page.getByRole("button", { name: "Generate README" }).click();
  }

  async restoreFrom(file: string) {
    await this.fileInput.setInputFiles(file);
    await this.page.getByRole("button", { name: "Restore" }).click();
  }
}
