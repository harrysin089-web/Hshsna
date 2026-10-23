/* =========================================
   PERFECT FITNESS GYM
   Main JavaScript
========================================= */


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header =
  document.getElementById("site-header");

const nav =
  document.querySelector(".nav");

const menu =
  document.querySelector(".menu-toggle");


window.addEventListener(
  "scroll",
  () => {

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

  },
  {
    passive: true
  }
);


/* =========================================
   MOBILE MENU
========================================= */

menu?.addEventListener(
  "click",
  () => {

    const open =
      nav.classList.toggle("open");

    menu.setAttribute(
      "aria-expanded",
      String(open)
    );

  }
);


document
  .querySelectorAll(".nav-links a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        nav.classList.remove("open");

        menu.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );

  });


/* =========================================
   SCROLL REVEAL
========================================= */

const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach((element, index) => {

    element.style.transitionDelay =
      `${Math.min(index % 5, 4) * 70}ms`;

    observer.observe(element);

  });


/* =========================================
   GALLERY LIGHTBOX
========================================= */

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightbox-image");

const closeLightbox =
  () => {

    lightbox.classList.remove(
      "open"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";

  };


document
  .querySelectorAll(".gallery-item")
  .forEach((item) => {

    item.addEventListener(
      "click",
      () => {

        lightboxImage.src =
          item.dataset.image;

        lightboxImage.alt =
          item.querySelector("img")?.alt ||
          "Gallery image";

        lightbox.classList.add(
          "open"
        );

        lightbox.setAttribute(
          "aria-hidden",
          "false"
        );

        document.body.style.overflow =
          "hidden";

      }
    );

  });


document
  .querySelector(".lightbox-close")
  ?.addEventListener(
    "click",
    closeLightbox
  );


lightbox?.addEventListener(
  "click",
  (event) => {

    if (
      event.target === lightbox
    ) {
      closeLightbox();
    }

  }
);


document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {
      closeLightbox();
    }

  }
);


/* =========================================
   FREE TRIAL FORM
========================================= */

const form =
  document.getElementById(
    "trial-form"
  );

const message =
  document.getElementById(
    "form-message"
  );


form?.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();

    const data =
      new FormData(form);

    const name =
      (
        data.get("name") ||
        "there"
      )
      .toString()
      .trim();


    message.textContent =
      `Thanks, ${name}. Our team will contact you shortly.`;


    form.reset();

  }
);


/* =========================================
   SMOOTH INTERNAL LINKS
========================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const selector =
          link.getAttribute("href");

        const target =
          document.querySelector(
            selector
          );

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* =========================================
   DESKTOP MAGNETIC BUTTON EFFECT
========================================= */

if (
  window.matchMedia(
    "(pointer:fine)"
  ).matches &&

  !window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
) {

  document
    .querySelectorAll(".button")
    .forEach((button) => {

      button.addEventListener(
        "pointermove",
        (event) => {

          const rect =
            button.getBoundingClientRect();

          const x =
            (
              event.clientX -
              rect.left -
              rect.width / 2
            ) * 0.06;

          const y =
            (
              event.clientY -
              rect.top -
              rect.height / 2
            ) * 0.06;


          button.style.transform =
            `translate(${x}px, ${y}px)`;

        }
      );


      button.addEventListener(
        "pointerleave",
        () => {

          button.style.transform = "";

        }
      );

    });

}
