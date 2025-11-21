
let lang = localStorage.getItem("site-lang") || "en";
let page = window.location.pathname.split("/").pop();
if (page === "") {
    page = "index.html";
}

if (lang === "ar" && !page.includes("Ar")) {
    window.location.href = page.replace(".html", "Ar.html");
}
if (lang === "en" && page.includes("Ar")) {
    window.location.href = page.replace("Ar.html", ".html");
}

