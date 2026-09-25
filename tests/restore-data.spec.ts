import path from "path";
import { test, expect } from "@playwright/test";
import { ReadmeGeneratorPage } from "./pages/readme-generator.page";
import data from "./test-data/data.json";

const dataFile = path.join(__dirname, "test-data", "data.json");

test("restores the form from an uploaded json file", async ({ page }) => {
  const generator = new ReadmeGeneratorPage(page);
  await generator.open();

  await generator.restoreFrom(dataFile);

  await expect(generator.funFactPrefix).toHaveValue(data.prefix.funFact);
  await expect(generator.currentWork).toHaveValue("deliberately wrong value");
});
