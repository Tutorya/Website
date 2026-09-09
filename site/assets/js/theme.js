(() => {
  const param = new URLSearchParams(window.location.search).get("scoutTheme");
  const theme =
    param || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();

// Ignore les valeurs de thème inconnues sans les injecter dans du HTML ou du CSS.
if (!["light", "dark"].includes(document.documentElement.dataset.theme)) {
  document.documentElement.dataset.theme = "light";
}