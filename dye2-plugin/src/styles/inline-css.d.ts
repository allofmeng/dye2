// Vite returns the raw CSS text for `?inline` imports.
declare module "*.css?inline" {
  const css: string;
  export default css;
}
