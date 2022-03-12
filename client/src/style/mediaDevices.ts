const sizes = {
  // make breakpoint relative to broswser default font-size
  mobile: `${600 / 16}em`, //37.5em
  tabPort: `${900 / 16}em`, //56.25em
  tabLand: `${1200 / 16}em`, //75.5em
  bigDesktop: `${1800 / 16}em`, //112.5em
};

const mediaDevices = {
  mobile: `(max-width:${sizes.mobile})`,
  tabPort: `(max-width:${sizes.tabPort})`,
  tabLand: `(max-width:${sizes.tabLand})`,
  bigDesktop: `(min-width:${sizes.bigDesktop})`,
};

export default mediaDevices;
