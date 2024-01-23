// theme.js
export function loadTheme(themeDB) {
    if (!themeDB) {
      console.log('No theme set');
      document.documentElement.setAttribute('class', 'sunriseSunset-theme');
    } else {
      document.documentElement.setAttribute('class', themeDB);
      console.log('Theme set to', themeDB);
    }
  }