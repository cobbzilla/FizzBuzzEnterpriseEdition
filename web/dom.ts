export const byId = <T extends HTMLElement = HTMLElement>(id: string): T => { const node = document.getElementById(id); if (!node) throw new Error(`Missing element ${id}`); return node as T; };
export function setText(id: string, value: unknown) {
  byId(id).textContent = String(value);
}
