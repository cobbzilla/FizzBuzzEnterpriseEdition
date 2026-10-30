import { request, config, scope } from './runtime';
const byId = <T extends HTMLElement = HTMLElement>(id: string): T => document.getElementById(id) as T;
const operations = byId('api-operations');
const search = byId<HTMLInputElement>('api-search');
const status = byId('api-status');
const sections = byId('api-sections');
let cards: {card: HTMLElement; department: HTMLElement; searchText: string}[] = [];

function element<K extends keyof HTMLElementTagNameMap>(tag: K, className = '', value?: unknown): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = String(value);
  return node;
}

function resolve(spec: Spec, value?: Schema): Schema | undefined {
  if (!value?.$ref) return value;
  if (!value.$ref.startsWith('#/')) return undefined;
  let node: unknown = spec; for (const key of value.$ref.slice(2).split('/')) node = (node as Record<string, unknown>)?.[key]; return node as Schema | undefined;
}

function table(headers: string[], rows: (string | undefined)[][]) {
  const wrap = element('div', 'api-table-wrap');
  const grid = element('table', 'api-table');
  const heading = element('thead');
  const headerRow = element('tr');
  headers.forEach((name) => headerRow.append(element('th', '', name)));
  heading.append(headerRow);
  grid.append(heading);
  const body = element('tbody');
  rows.forEach((row) => {
    const line = element('tr');
    row.forEach((value) => line.append(element('td', '', value)));
    body.append(line);
  });
  grid.append(body);
  wrap.append(grid);
  return wrap;
}

function schemaFields(spec: Spec, response: Schema) {
  const content = response.content || {};
  const media = Object.keys(content)[0];
  const schema = resolve(spec, content[media]?.schema);
  if (!schema?.properties) return undefined;
  const detail = element('details', 'api-schema-detail');
  detail.append(element('summary', '', `Response fields · ${media}`));
  const required = new Set(schema.required || []);
  detail.append(table(['Field', 'Type', 'Meaning'], Object.entries(schema.properties).map(([name, field]) => [
    `${name}${required.has(name) ? ' *' : ''}`,
    field.type || (field.$ref ? 'object' : 'value'),
    field.description || (field.enum ? field.enum.join(' · ') : field.const === undefined ? '—' : String(field.const)),
  ])));
  return detail;
}

function tryDesk(path: string, method: string, operation: Operation) {
  const panel = element('div', 'api-try');
  panel.append(element('h4', '', 'Live request desk'));
  const hasLimit = (operation.parameters || []).some((parameter) =>
    parameter.$ref?.endsWith('/Limit') || parameter.name === 'limit');
  const requestedPath = hasLimit ? `${path}?limit=15` : path;
  const command = method === 'post'
    ? `curl -i -X POST '${config.mode === 'server' ? new URL(config.apiBaseUrl || '/', location.origin).href.replace(/\/$/, '') : 'http://localhost:18089'}${path}'`
    : `curl -i '${config.mode === 'server' ? new URL(config.apiBaseUrl || '/', location.origin).href.replace(/\/$/, '') : 'http://localhost:18089'}${requestedPath}'`;
  panel.append(element('p', '', 'Server deployment example (cURL cannot call an in-browser runtime):'));
  panel.append(element('code', '', command));
  const controls = element('div', 'api-try-controls');
  let input: HTMLInputElement | null = null;
  if (hasLimit) {
    const label = element('label', '', 'Upper limit');
    input = element('input');
    input.type = 'number';
    input.min = '0'; input.max = '1000'; input.step = '1'; input.value = '15';
    label.append(input);
    controls.append(label);
  }
  const button = element('button', '', method === 'post' ? 'Send POST request' : 'Send GET request');
  button.type = 'button';
  controls.append(button);
  panel.append(controls);
  const report = element('p', 'api-try-status', method === 'post'
    ? 'This explicit action may update process-local state or add audit entries.'
    : 'The response comes from the configured runtime.');
  report.setAttribute('role', 'status');
  report.setAttribute('aria-live', 'polite');
  panel.append(report);
  const output = element('pre', 'api-try-output');
  output.hidden = true;
  output.tabIndex = 0;
  output.setAttribute('role', 'region');
  output.setAttribute('aria-label', `${method.toUpperCase()} ${path} response`);
  panel.append(output);
  button.addEventListener('click', async () => {
    if (input && (!/^\d+$/.test(input.value) || Number(input.value) > 1000)) {
      report.textContent = 'Enter a whole number from 0 through 1000.';
      input.focus();
      return;
    }
    const url = input ? `${path}?limit=${input.value}` : path;
    button.disabled = true;
    report.textContent = 'The desk is reviewing your request…';
    const started = performance.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const reply = await request(url, { method: method.toUpperCase(), cache: 'no-store', signal: controller.signal });
      const body = await reply.text();
      const elapsed = Math.round(performance.now() - started);
      const trace = reply.headers.get('X-SlopBuzz-Trace-Id') || 'unavailable';
      const span = reply.headers.get('X-SlopBuzz-Span-Id') || 'unavailable';
      report.textContent = `HTTP ${reply.status} · ${elapsed} ms · ${reply.headers.get('content-type') || 'unknown type'} · receipt ${trace.slice(0, 12)}`;
      const visibleBody = body.length > 16000 ? `${body.slice(0, 16000)}\n… response shortened in this view` : body || '(empty body)';
      output.textContent = `X-SlopBuzz-Trace-Id: ${trace}\nX-SlopBuzz-Span-Id: ${span}\n\n${visibleBody}`;
      output.hidden = false;
    } catch (error) {
      report.textContent = error.name === 'AbortError' ? 'The desk did not answer within eight seconds.'
        : `The request failed: ${error.message}`;
    } finally {
      clearTimeout(timer);
      button.disabled = false;
    }
  });
  return panel;
}

function renderOperation(spec: Spec, path: string, method: string, operation: Operation, index: number) {
  const card = element('details', 'api-card');
  card.id = `operation-${operation.operationId || index}`;
  const header = element('summary', 'api-card-header');
  header.append(element('span', `api-method ${method}`, method.toUpperCase()));
  header.append(element('code', 'api-path', path));
  header.append(element('span', 'api-summary', operation.summary || path));
  card.append(header);
  const body = element('div', 'api-card-body');
  body.append(element('p', 'api-description', operation.description || 'No additional guidance.'));
  const parameters = (operation.parameters || []).map((parameter) => resolve(spec, parameter)).filter((value): value is Schema => !!value);
  if (parameters.length) {
    body.append(element('h4', '', 'Parameters'));
    body.append(table(['Name', 'Location', 'Requirement'], parameters.map((parameter) => [
      parameter.name, parameter.in, `${parameter.required ? 'Required' : 'Optional'} · ${parameter.description || ''}`,
    ])));
  }
  body.append(element('h4', '', 'Responses'));
  const responses = element('div', 'api-responses');
  Object.entries(operation.responses || {}).forEach(([code, responseValue]) => {
    const response = resolve(spec, responseValue)!;
    const row = element('div', 'api-response');
    row.append(element('strong', '', code));
    const description = element('p', '', response.description || 'Response');
    const media = Object.keys(response.content || {})[0];
    if (media) description.append(element('small', '', media));
    row.append(description);
    responses.append(row);
    if (response.headers && Object.keys(response.headers).length) {
      const headerDetail = element('details', 'api-schema-detail');
      headerDetail.append(element('summary', '', `HTTP ${code} response headers`));
      headerDetail.append(table(['Header', 'Meaning'], Object.entries(response.headers).map(([name, value]) => [
        name, resolve(spec, value)?.description || 'See the machine-readable charter.',
      ])));
      responses.append(headerDetail);
    }
    const fields = schemaFields(spec, response);
    if (fields) responses.append(fields);
  });
  body.append(responses);
  body.append(tryDesk(path, method, operation));
  card.append(body);
  return card;
}

function filterCards() {
  const needle = search.value.trim().toLocaleLowerCase();
  let visible = 0;
  document.querySelectorAll<HTMLElement>('.api-department').forEach((department) => {
    let groupVisible = 0;
    cards.filter((item) => item.department === department).forEach((item) => {
      const match = !needle || item.searchText.includes(needle);
      item.card.hidden = !match;
      if (match) groupVisible++;
    });
    department.hidden = groupVisible === 0;
    visible += groupVisible;
  });
  status.textContent = `${visible} of ${cards.length} operations shown${needle ? ` for “${search.value.trim()}”` : ''}.`;
}

function render(spec: Spec) {
  byId('api-version').textContent = spec.openapi;
  operations.replaceChildren();
  sections.replaceChildren();
  cards = [];
  const entries = Object.entries(spec.paths).flatMap(([path, methods]) =>
    Object.entries(methods).filter(([method]) => ['get', 'post', 'put', 'patch', 'delete'].includes(method))
      .map(([method, operation]) => ({ path, method, operation })));
  (spec.tags || []).forEach((tag, tagIndex) => {
    const members = entries.filter(({ operation }) => (operation.tags || []).includes(tag.name));
    if (!members.length) return;
    const department = element('section', 'api-department');
    department.id = `department-${tagIndex}`;
    department.append(element('h2', '', tag.name));
    department.append(element('p', '', tag.description || ''));
    const link = element('a', '', tag.name);
    link.href = `#${department.id}`;
    sections.append(link);
    members.forEach(({ path, method, operation }, index) => {
      const card = renderOperation(spec, path, method, operation, index);
      department.append(card);
      cards.push({ card, department,
        searchText: `${tag.name} ${path} ${method} ${operation.summary || ''} ${operation.description || ''}`.toLocaleLowerCase() });
    });
    operations.append(department);
  });
  byId('api-total').textContent = `${cards.length} ratified operations · ${Object.keys(spec.paths).length} paths`;
  filterCards();
}

search.addEventListener('input', filterCards);
try {
  const reply = await fetch(new URL('openapi.json', scope), { cache: 'no-cache' });
  if (!reply.ok) throw new Error(`HTTP ${reply.status}`);
  render(await reply.json());
} catch (error) {
  status.textContent = `The charter could not be loaded: ${error.message}. Open the raw JSON link or try again.`;
}

interface Schema { $ref?: string; type?: string; description?: string; enum?: string[]; const?: unknown; properties?: Record<string, Schema>; required?: string[]; content?: Record<string, {schema: Schema}>; headers?: Record<string, Schema>; name?: string; in?: string }
interface Operation { operationId?: string; summary?: string; description?: string; tags?: string[]; parameters?: Schema[]; responses?: Record<string, Schema> }
interface Spec { openapi: string; paths: Record<string, Record<string, Operation>>; tags?: {name: string; description?: string}[] }
