import type { AssetBrief } from "../contracts";
import type { VisualDirection } from "../visualDirection";

export function composeLogoSvg(brief: AssetBrief, direction: VisualDirection) {
  const name = escapeXml(brief.companyContext.name);
  const tagline = escapeXml(brief.companyContext.tagline);
  const { primary, secondary, ink } = direction.palette;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 320" role="img" aria-labelledby="title desc"><title id="title">${name} logo</title><desc id="desc">Typographic logo for ${name}</desc><defs><linearGradient id="mark" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${primary}"/><stop offset="1" stop-color="${secondary}"/></linearGradient></defs><g transform="translate(32 32)"><rect width="256" height="256" rx="80" fill="url(#mark)"/><circle cx="178" cy="78" r="34" fill="white" opacity=".35"/><path d="M70 178c34-74 80-94 126-108-10 64-42 118-126 142Z" fill="white"/></g><text x="332" y="156" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="700" letter-spacing="-2" fill="${ink}">${name}</text><text x="336" y="214" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="${ink}" opacity=".66">${tagline}</text></svg>`);
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character] ?? character);
}
