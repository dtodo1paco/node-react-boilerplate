import { createTheme } from './util';
/* COLORS AVAILABLE */
import DEFAULT_COLORS from './default_theme';
import MATERIAL_COLORS from './material';

export const DEFAULT_THEME = createTheme('default', 'dark', DEFAULT_COLORS);
export const MATERIAL_THEME = createTheme('material', 'light', MATERIAL_COLORS);
export const THEMES = {
  default: DEFAULT_THEME,
  material: MATERIAL_THEME,
};

export const findThemeOrDefault = themeId =>
  THEMES[themeId] ? THEMES[themeId] : DEFAULT_THEME;
