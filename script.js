document.addEventListener("DOMContentLoaded", () => {

  const emailjsConfig = {
    publicKey: "yd0kX9aLI7ZaxqsPX",
    serviceId: "service_ofei9aj",
    templateId: "template_2oi7zuu"
  };

  if (window.emailjs) {
    window.emailjs.init({
      publicKey: emailjsConfig.publicKey
    });
  }

  /* =========================
     HEADER
  ========================= */

  const header = document.querySelector(".site-header");

  const updateHeader = () => {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =========================
     MOBILE MENU
  ========================= */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const nav =
    document.querySelector(".main-nav");

  if (menuToggle && header && nav) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        header.classList.toggle("menu-open");

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Cerrar menú"
          : "Abrir menú"
      );

    });

  }


  document
    .querySelectorAll(".main-nav a")
    .forEach(link => {

      link.addEventListener("click", () => {

        header?.classList.remove("menu-open");

        document.body.classList.remove(
          "menu-open"
        );

        menuToggle?.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle?.setAttribute(
          "aria-label",
          "Abrir menú"
        );

      });

    });


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );

    revealElements.forEach(element => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =========================
     CURSOR GLOW
  ========================= */

  const cursorGlow =
    document.querySelector(".cursor-glow");

  if (
    cursorGlow &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    let mouseX =
      window.innerWidth / 2;

    let mouseY =
      window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener(
      "mousemove",
      event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorGlow.style.opacity = "1";

      }
    );

    const animateCursor = () => {

      currentX +=
        (mouseX - currentX) * 0.08;

      currentY +=
        (mouseY - currentY) * 0.08;

      cursorGlow.style.left =
        `${currentX}px`;

      cursorGlow.style.top =
        `${currentY}px`;

      requestAnimationFrame(
        animateCursor
      );

    };

    animateCursor();

    document.addEventListener(
      "mouseleave",
      () => {
        cursorGlow.style.opacity = "0";
      }
    );

  }


  /* =========================
     SERVICE CARD TILT
  ========================= */

  const cards =
    document.querySelectorAll(
      ".service-card"
    );

  if (
    cards.length &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    cards.forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateY =
            ((x / rect.width) - 0.5) * 5;

          const rotateX =
            ((y / rect.height) - 0.5) * -5;

          card.style.transform = `
            translateY(-10px)
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
          `;

        }
      );

      card.addEventListener(
        "mouseleave",
        () => {
          card.style.transform = "";
        }
      );

    });

  }


  /* =========================
     HERO PARALLAX
  ========================= */

  const heroVisual =
    document.querySelector(".hero-visual");

  if (
    heroVisual &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    heroVisual.addEventListener(
      "mousemove",
      event => {

        const rect =
          heroVisual.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width -
          0.5;

        const y =
          (event.clientY - rect.top) /
          rect.height -
          0.5;

        const chips =
          heroVisual.querySelectorAll(
            ".floating-chip"
          );

        chips.forEach((chip, index) => {

          const strength =
            8 + index * 5;

          chip.style.transform = `
            translate(
              ${x * strength}px,
              ${y * strength}px
            )
          `;

        });

      }
    );

    heroVisual.addEventListener(
      "mouseleave",
      () => {

        heroVisual
          .querySelectorAll(".floating-chip")
          .forEach(chip => {
            chip.style.transform = "";
          });

      }
    );

  }


  /* =========================
     FORM
  ========================= */

  const form =
    document.querySelector("#project-form");

  const status =
    document.querySelector(".form-status");

  if (form && status) {

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const submitButton =
          form.querySelector(
            ".form-submit"
          );

        const submitText =
          submitButton?.querySelector(
            "span"
          );

        const name =
          form
            .querySelector(
              '[name="name"]'
            )
            ?.value
            .trim() || "";

        const email =
          form
            .querySelector(
              '[name="email"]'
            )
            ?.value
            .trim() || "";

        const message =
          form
            .querySelector(
              '[name="message"]'
            )
            ?.value
            .trim() || "";

        if (
          !name ||
          !email ||
          !message
        ) {

          status.textContent =
            "Completa los campos obligatorios.";

          return;

        }

        if (!submitButton) {
          return;
        }

        submitButton.disabled = true;

        if (submitText) {
          submitText.textContent =
            "Preparando mensaje...";
        }

        const company =
          form
            .querySelector(
              '[name="company"]'
            )
            ?.value
            .trim() || "";

        const project =
          form
            .querySelector(
              '[name="project"]:checked'
            )
            ?.value ||
            "Otro proyecto";

        if (
          !window.emailjs ||
          Object.values(emailjsConfig).some(
            value => value.startsWith("TU_")
          )
        ) {
          status.textContent =
            "Configura EmailJS para poder enviar el formulario.";
          submitButton.disabled = false;
          if (submitText) {
            submitText.textContent = "Enviar proyecto";
          }
          return;
        }

        const templateParams = {
          to_email: "contacto@trazostudio.es",
          subject: `Nuevo proyecto — ${project}`,
          name,
          company,
          project,
          message,
          email
        };

        window.emailjs
          .send(
            emailjsConfig.serviceId,
            emailjsConfig.templateId,
            templateParams
          )
          .then(() => {
            status.textContent =
              "Mensaje enviado correctamente. Nos pondremos en contacto contigo.";
            form.reset();
          })
          .catch(() => {
            status.textContent =
              "No se ha podido enviar el mensaje. Inténtalo de nuevo.";
          })
          .finally(() => {
            submitButton.disabled = false;

            if (submitText) {
              submitText.textContent = "Enviar proyecto";
            }
          });

      }
    );

  }


  /* =========================
     SMOOTH ANCHOR
  ========================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          const headerHeight =
            header?.offsetHeight || 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }
      );

    });


  /* =========================
     CURRENT YEAR
  ========================= */

  const yearElement =
    document.querySelector(
      ".footer-bottom span"
    );

  if (yearElement) {

    yearElement.textContent =
      `© ${new Date().getFullYear()} TRAZO. Studio`;

  }

});