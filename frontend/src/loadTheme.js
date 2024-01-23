// theme.js
export function loadTheme(themeDB) {
    if (!themeDB) {
      document.documentElement.setAttribute('class', 'sunriseSunset-theme');
    } else {
      document.documentElement.setAttribute('class', themeDB);
    }
  }