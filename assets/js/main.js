(() => {
  "use strict";

  const menuButton = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  const mobileQuery = window.matchMedia("(max-width: 56rem)");

  if (menuButton && navigation) {
    const setMenu = (open, restoreFocus = false) => {
      menuButton.setAttribute("aria-expanded", String(open));
      navigation.classList.toggle("is-open", open);
      menuButton.querySelector("[data-menu-label]").textContent = open ? "Fermer" : "Menu";
      if (restoreFocus) menuButton.focus();
    };

    menuButton.addEventListener("click", () => {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    navigation.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link || !mobileQuery.matches) return;
      setMenu(false);
      const hash = new URL(link.href).hash;
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      // Ne pas laisser le focus clavier dans la navigation désormais masquée.
      if (target) target.focus({ preventScroll: true });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenu(false, true);
      }
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".site-header")) setMenu(false);
    });

    mobileQuery.addEventListener("change", () => setMenu(false));
    // La navigation n’est repliée qu’après l’installation de ses gestionnaires.
    document.documentElement.classList.add("js");
  }

  // Le fil indique uniquement le passage en cours de lecture, jamais le statut
  // d’un apprenti. Tout le contenu est lisible sans cette amélioration.
  if ("IntersectionObserver" in window) {
    const steps = [...document.querySelectorAll("[data-method-step]")];
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      steps.forEach((step) => step.classList.toggle("is-current", step === current.target));
    }, { rootMargin: "-18% 0px -35% 0px", threshold: [0, 0.2, 0.5] });
    steps.forEach((step) => observer.observe(step));
  }

  const form = document.querySelector("[data-demo-form]");
  if (!form) return;

  const fieldset = form.querySelector("fieldset");
  const submitButton = form.querySelector("[type='submit']");
  const summary = form.querySelector("[data-error-summary]");
  const errorList = summary.querySelector("ul");
  const status = form.querySelector("[data-form-status]");
  const fields = [...form.querySelectorAll("input, textarea")];
  let hasValidated = false;

  const errorFor = (field) => {
    const value = field.value.trim();
    if (field.required && !value) {
      return field.id === "email" ? "Indiquez votre adresse e-mail professionnelle." : "Décrivez brièvement le besoin de votre école.";
    }
    if (field.id === "email" && value && field.validity.typeMismatch) {
      return "Indiquez une adresse e-mail valide, par exemple nom@ecole.fr.";
    }
    if (field.maxLength > 0 && value.length > field.maxLength) {
      return `Limitez ce champ à ${field.maxLength} caractères.`;
    }
    if (field.id === "message" && value && value.length < 20) {
      return "Ajoutez quelques précisions : votre message doit contenir au moins 20 caractères.";
    }
    return "";
  };

  const showFieldError = (field, message) => {
    const error = document.getElementById(`${field.id}-error`);
    error.textContent = message;
    error.hidden = !message;
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  };

  const validate = () => {
    const errors = fields.map((field) => ({ field, message: errorFor(field) }));
    errors.forEach(({ field, message }) => showFieldError(field, message));
    return errors.filter(({ message }) => message);
  };

  const updateSummary = (errors) => {
    errorList.replaceChildren();
    for (const { field, message } of errors) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${field.id}`;
      link.textContent = message;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        field.focus();
        field.scrollIntoView({ block: "center", behavior: "instant" });
      });
      item.append(link);
      errorList.append(item);
    }
    summary.hidden = errors.length === 0;
  };

  form.addEventListener("submit", (event) => {
    // Démonstration uniquement : aucun fetch, envoi, stockage ou journalisation.
    event.preventDefault();
    hasValidated = true;
    status.textContent = "";
    const errors = validate();
    updateSummary(errors);
    if (errors.length) {
      summary.focus();
      return;
    }
    status.textContent = "Les champs sont valides. Aucun message n’a été envoyé ni enregistré : ceci est une démonstration locale.";
  });

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      status.textContent = "";
      if (!hasValidated) return;
      showFieldError(field, errorFor(field));
      updateSummary(fields.map((item) => ({ field: item, message: errorFor(item) })).filter(({ message }) => message));
    });
  });

  form.noValidate = true;
  fieldset.disabled = false;
  submitButton.disabled = false;
})();