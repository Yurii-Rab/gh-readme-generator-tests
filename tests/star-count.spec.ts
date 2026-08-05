import { test, expect } from "@playwright/test";

const repoUrl =
  "https://github.com/rahuldkjain/github-profile-readme-generator";

// GitHub shortens anything over a thousand, e.g. 24381 -> 24.4k
function toGitHubDisplay(stars: number): string {
  if (stars < 1000) return String(stars);
  return `${(stars / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

test("star count on the generator matches the count shown on GitHub", async ({
  page,
}) => {
  await page.goto("./");

  const counter = page.locator('a[aria-label^="Star"] .github-count');
  await expect(counter).not.toHaveText("0");

  const stars = Number(await counter.textContent());
  expect(stars).toBeGreaterThan(0);

  await page.goto(repoUrl);
  const displayed = await page
    .locator("#repo-stars-counter-star")
    .textContent();

  expect(displayed?.trim()).toBe(toGitHubDisplay(stars));
});
