const { test, expect } = require("@playwright/test");

test("móvil: cabecera visible, cursos, cuestionario y progreso persistente", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".mobile-brand")).toBeVisible();
  await page.getByRole("navigation", {name: "Navegación móvil"})
    .getByRole("link", {name:"Cursos"}).click();
  await expect(page.getByRole("heading", {name:"Explora las unidades"})).toBeVisible();
  await page.goto("/leccion/celula");
  await page.getByRole("button", {name:/Comenzar cuestionario/}).click();
  const sets=page.locator(".quiz fieldset");
  await sets.nth(0).getByText("La célula",{exact:true}).click();
  await sets.nth(1).getByText("Ribosomas",{exact:true}).click();
  await sets.nth(2).getByText("Cloroplasto",{exact:true}).click();
  await page.getByRole("button", {name:/Comprobar respuestas/}).click();
  await expect(page.locator(".result")).toContainText("3 / 3");
  await page.reload();
  await page.goto("/progreso");
  await expect(page.locator(".stats-grid")).toContainText("7%");
  await expect(page.locator(".stats-grid")).toContainText("1");
});

test("plan Pro: activar, abrir flashcard, desactivar y bloquear", async ({ page }) => {
  await page.goto("/plan");
  await page.getByRole("button", {name:/Activar demostración Pro/}).click();
  await page.goto("/herramientas/flashcards");
  await expect(page.getByRole("button",{name:"Girar tarjeta"})).toBeVisible();
  await page.getByRole("button",{name:"Girar tarjeta"}).click();
  await expect(page.locator(".flashcard")).not.toContainText("Pulsa para revelar");
  await page.goto("/plan");
  await page.getByRole("button",{name:/Desactivar demostración Pro/}).click();
  await page.goto("/herramientas/flashcards");
  await expect(page.getByText("Esta herramienta es exclusiva de Pro")).toBeVisible();
});

test("desafío cronometrado se registra al vencer el plazo", async ({page})=>{
  await page.clock.install();
  await page.goto("/plan");
  await page.getByRole("button",{name:/Activar demostración Pro/}).click();
  await page.goto("/herramientas/desafios");
  await page.getByRole("button",{name:/Comenzar desafío/}).click();
  await expect(page.getByRole("timer")).toContainText("90s");
  await page.clock.fastForward(91000);
  await expect(page.locator(".result")).toContainText("Desafío registrado en tu historial.");
});

for(const width of [360,390,768,1440]){
  test("sin desbordamiento horizontal a "+width+"px",async ({page})=>{
    await page.setViewportSize({width,height:900});
    for(const route of ["/","/cursos","/leccion/celula","/plan","/progreso","/perfil"]){
      await page.goto(route);
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
      expect(overflow,route+" en "+width+"px").toBe(false);
    }
  });
}
