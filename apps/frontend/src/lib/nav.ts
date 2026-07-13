// Shared site-chrome link data. The landing and login screens render these in
// visually distinct nav/footer layouts, but the link sets themselves are the
// same — keep them defined once here.
export const NAV_LINKS = ['Features', 'Docs', 'Pricing', 'Changelog'] as const;
export const FOOTER_LINKS = ['Privacy', 'Terms', 'GitHub', 'Status'] as const;
