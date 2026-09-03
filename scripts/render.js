#!/usr/bin/env node
// Renderea un template de mdo-templates/ a PNG.
//
// Uso:
//   node scripts/render.js \
//     --template sq-12 \
//     --out out/test.png \
//     --slots '{"CATEGORIA":"Impuestos","TITULAR":"...","BAJADA":"...","FUENTE":"...","FECHA":"...","HANDLE":"@mdoconsultores"}'

const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    if (k.startsWith('--')) out[k.slice(2)] = argv[++i];
  }
  return out;
}

const SIZES = {
  square:   { w: 1080, h: 1080 },
  portrait: { w: 1080, h: 1350 },
  story:    { w: 1080, h: 1920 },
  linkedin: { w: 1200, h: 628 },
};

function sizeForTemplate(id) {
  if (id.startsWith('st-') || id.startsWith('hl-')) return SIZES.story;
  if (id.startsWith('li-')) return SIZES.linkedin;
  // (sq-12d se retiró del catálogo: era idéntica a sq-12)
  if (id.startsWith('sq-')) return SIZES.square;
  // nv-/sv-/in- son las tres familias del kit 4.4: todas 4:5, como las del manual.
  if (id.startsWith('po-') || id.startsWith('cb-') || id.startsWith('mn-')
    || id.startsWith('nv-') || id.startsWith('sv-') || id.startsWith('in-')) return SIZES.portrait;
  return SIZES.square;
}

async function render({ template, slots, outPath }) {
  const templatesDir = path.resolve(__dirname, '..', 'mdo-templates');
  const renderHtml = path.join(templatesDir, 'render.html');
  if (!fs.existsSync(renderHtml)) throw new Error(`No existe ${renderHtml}`);

  const { w, h } = sizeForTemplate(template);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none',
      '--ignore-certificate-errors',
      '--disable-web-security',
      '--allow-file-access-from-files',
    ],
    ignoreHTTPSErrors: true,
    defaultViewport: { width: w, height: h, deviceScaleFactor: 1 },
  });

  try {
    const page = await browser.newPage();
    page.on('pageerror', (e) => console.error('pageerror:', e.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') console.error('console.error:', msg.text());
    });

    const url = `file://${renderHtml}#t=${encodeURIComponent(template)}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    await page.waitForFunction(() => window.__mdoReady === true, { timeout: 30000 });

    // render.html cae en sq-01 cuando el id no existe, para aguantar que un
    // host de preview le agregue su propio `t`. Acá eso no sirve: si la
    // plantilla no está, hay que frenar, no publicar la placa equivocada.
    const faltante = await page.evaluate(() => window.__mdoTemplateFaltante);
    if (faltante) {
      const ids = await page.evaluate(() => Object.keys(window.__mdoTemplates || {}));
      throw new Error(
        `La plantilla "${faltante}" no existe.` +
        (ids.length ? ` Hay ${ids.length} disponibles; ver mdo-templates/PLACEHOLDERS.md.` : '')
      );
    }

    await page.evaluate(() => document.fonts && document.fonts.ready);

    if (slots && Object.keys(slots).length) {
      await page.evaluate((data) => {
        const stage = document.getElementById('stage');
        stage.innerHTML = Object.entries(data).reduce(
          (html, [k, v]) => html.replaceAll(`[${k}]`, v),
          stage.innerHTML
        );
      }, slots);
    }

    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    await page.screenshot({
      path: outPath,
      type: 'png',
      clip: { x: 0, y: 0, width: w, height: h },
      omitBackground: false,
    });
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  const args = parseArgs(process.argv);
  if (!args.template) {
    console.error('Falta --template (ej: sq-12)');
    process.exit(1);
  }
  const slots = args.slots ? JSON.parse(args.slots) : {};
  const outPath = path.resolve(args.out || `out/${args.template}.png`);
  render({ template: args.template, slots, outPath })
    .then(() => console.log('OK →', outPath))
    .catch((err) => { console.error('ERROR:', err); process.exit(1); });
}

module.exports = { render };
