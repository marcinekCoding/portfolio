/**
 * Prefix public asset paths for GitHub Pages (basePath /portfolio).
 * next/image with unoptimized export does not auto-apply basePath to public files.
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
