import path from "path";
import { test, expect } from "@playwright/test";
import data from "./test-data/data.json";

const dataFile = path.join(__dirname, "test-data", "data.json");

test("restores the form from an uploaded json file", async ({ page }) => {
  await page.goto("./");

  await page.locator('input[type="file"]').setInputFiles(dataFile);
  await page.getByRole("button", { name: "Restore" }).click();

  await expect(page.locator("#funFact-prefix")).toHaveValue(
    data.prefix.funFact,
  );
  await expect(page.locator("#currentWork")).toHaveValue(data.data.currentWork);
});
