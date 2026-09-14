// Visor de imágenes a pantalla completa con zoom
(function () {
    const viewer = document.getElementById("viewer");
    if (viewer) {
        const img = viewer.querySelector("img");
        const zoomBtn = viewer.querySelector("[data-zoom]");

        const setZoom = (on) => viewer.classList.toggle("is-zoomed", on);

        document.querySelectorAll("[data-view]").forEach((trigger) => {
            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                img.src = trigger.dataset.view;
                img.alt = trigger.dataset.alt || "";
                setZoom(false);
                viewer.showModal();
            });
        });

        img.addEventListener("click", () => setZoom(!viewer.classList.contains("is-zoomed")));
        zoomBtn.addEventListener("click", () => setZoom(!viewer.classList.contains("is-zoomed")));
        viewer.querySelector("[data-close]").addEventListener("click", () => viewer.close());
        viewer.addEventListener("click", (e) => {
            if (e.target.classList.contains("viewer-stage")) viewer.close();
        });
    }

    // Aparición suave al hacer scroll
    const items = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        items.forEach((el) => io.observe(el));
    } else {
        items.forEach((el) => el.classList.add("is-visible"));
    }

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
})();
