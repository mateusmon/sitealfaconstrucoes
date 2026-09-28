/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require(
  "C:/Users/perei/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright"
);

const baseUrl = "http://127.0.0.1:3000";
const outputDir = path.join(process.cwd(), "artifacts", "qa");

async function inspectViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport });
  const issues = [];

  page.on("console", (message) => {
    if (message.type() === "error") issues.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => issues.push(`page: ${error.message}`));

  const response = await page.goto(baseUrl, { waitUntil: "networkidle" });
  if (!response?.ok()) issues.push(`home: HTTP ${response?.status() ?? "sem resposta"}`);
  if (name === "desktop") {
    await page.screenshot({ path: path.join(outputDir, "hero-initial.png") });
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.45));
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outputDir, "hero-expanded.png") });
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });
  try {
    await page.waitForFunction(
      () => Array.from(document.images).every((image) => {
        const rect = image.getBoundingClientRect();
        const onScreen = rect.bottom > 0 && rect.top < window.innerHeight;
        return !onScreen || (image.complete && image.naturalWidth > 0);
      }),
      null,
      { timeout: 10000 }
    );
  } catch {
    const incompleteImages = await page.locator("img").evaluateAll((images) =>
      images
        .filter((image) => {
          const rect = image.getBoundingClientRect();
          const onScreen = rect.bottom > 0 && rect.top < window.innerHeight;
          return onScreen && (!image.complete || image.naturalWidth === 0);
        })
        .map((image) => image.getAttribute("src"))
    );
    issues.push(`imagens não carregadas: ${incompleteImages.join(", ")}`);
  }

  await page.screenshot({
    path: path.join(outputDir, `home-${name}.png`),
    fullPage: true,
  });

  const carousel = page.locator(".building-carousel");
  const firstProject = await carousel.locator(".building-carousel-card[aria-hidden='false'] h3").textContent();
  await carousel.getByRole("button", { name: "Próximo projeto" }).click();
  const nextProject = await carousel.locator(".building-carousel-card[aria-hidden='false'] h3").textContent();
  if (!firstProject || !nextProject || firstProject === nextProject) issues.push("carrossel de obras prediais não avançou");

  if (name === "mobile") {
    await page.getByRole("button", { name: "Abrir menu" }).click();
    const menuVisible = await page.locator("#mobile-navigation").isVisible();
    if (!menuVisible) issues.push("menu móvel não abriu");
    await page.screenshot({ path: path.join(outputDir, "menu-mobile.png") });
    await page.locator("#mobile-navigation").getByRole("link", { name: /Obras/ }).click();
    await page.waitForLoadState("networkidle");
  } else {
    await page.goto(`${baseUrl}/projetos`, { waitUntil: "networkidle" });
  }

  await page.getByRole("button", { name: "Infraestrutura" }).click();
  const visibleProjects = await page.locator(".project-card:visible").count();
  if (visibleProjects !== 4) issues.push(`filtro Infraestrutura exibiu ${visibleProjects} projetos`);

  await page.goto(`${baseUrl}/contato`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Preparar e-mail/ }).click();
  const errorSummary = page.locator(".error-summary");
  if (!(await errorSummary.isVisible())) issues.push("resumo de erros do formulário não apareceu");
  if (!(await errorSummary.evaluate((element) => element === document.activeElement))) {
    issues.push("foco não foi movido para o resumo de erros");
  }

  await page.screenshot({
    path: path.join(outputDir, `contact-${name}.png`),
    fullPage: true,
  });

  await page.close();
  return issues;
}

(async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const desktopIssues = await inspectViewport(browser, "desktop", { width: 1440, height: 1000 });
  const mobileIssues = await inspectViewport(browser, "mobile", { width: 390, height: 844 });
  await browser.close();

  const issues = [...desktopIssues, ...mobileIssues];
  console.log(JSON.stringify({ screenshots: outputDir, issues }, null, 2));
  process.exitCode = issues.length ? 1 : 0;
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
