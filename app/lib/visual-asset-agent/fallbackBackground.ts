import type { VisualDirection } from "./visualDirection";

export function composeFallbackBackground(direction: VisualDirection) {
  const { primary, secondary, surface } = direction.palette;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1024"><defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${surface}"/><stop offset="1" stop-color="#fff"/></linearGradient><radialGradient id="r"><stop stop-color="${primary}" stop-opacity=".46"/><stop offset="1" stop-color="${primary}" stop-opacity="0"/></radialGradient></defs><rect width="1536" height="1024" fill="url(#b)"/><circle cx="1280" cy="180" r="430" fill="url(#r)"/><circle cx="1120" cy="790" r="360" fill="none" stroke="${secondary}" stroke-opacity=".14" stroke-width="100"/><path d="M720 1024C900 710 1110 580 1536 530V1024Z" fill="${primary}" fill-opacity=".09"/></svg>`);
}
