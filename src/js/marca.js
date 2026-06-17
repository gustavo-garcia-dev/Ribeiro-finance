let paginaAtual = window.location.pathname.split("/").pop();

if (paginaAtual === "") {
    paginaAtual = "index.html";
}

document.querySelectorAll(".side-item a").forEach(link => {
    if (link.getAttribute("href") === paginaAtual) {
        link.parentElement.classList.add("active");
    }
});
