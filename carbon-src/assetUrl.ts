export const assetUrl = (relativePath: string): string =>
  `${import.meta.env.BASE_URL}${relativePath.replace(/^\//, '')}`;
