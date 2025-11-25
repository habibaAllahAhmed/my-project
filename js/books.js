
books.forEach(function (book, index) {

    let isArabic = window.location.pathname.includes("Ar");

    let exploreText = isArabic ? "استكشف" : "Explore",
    readText = isArabic ? "قراءة" : "Read",
    chekLang = isArabic ? ' dir="rtl"' :  'dir="ltr"';

    $("#Books .books-section .row").append(`
        <div class="part mb-5 mb-lg-0 col-lg-3 m-auto">
            <div class="book-card">
                <div class="img" style="background-image: url('images/books/${book.img}');"></div>
                <div class="book-info">
                    <h3>${book.bookName}</h3>
                    <p  ${chekLang}>${book.sentence}</p>
                    <div class="buttons">
                                                <button class="read-btn me-3" onclick="openPopup('books');showBookPopup(${index})">
                            ${readText}
                        </button>
                    <a href="#${book.class}">
                            <button class="read-btn explore">${exploreText}</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `);
});

// function that prepares number of parts in book
function prepareParts(parts) {
    let htmlContent = ``;

    parts.forEach(function(part, index) {
        htmlContent += `<li>
            <p class="text-start fs-6 fw-4">${part}</p>`;
        if (index !== parts.length - 1) {
            htmlContent += `<hr>`;
        }
        htmlContent += `</li>`;
    });

    return htmlContent;
}

// function that show the popup of the book
function showBookPopup(index) {
    let bookPopup = books[index];

        let isArabic = window.location.pathname.includes("Ar");

    let exploreText = isArabic ? "عرض الكل" : "See All";
    chekLang = isArabic ? ' dir="rtl"' :  'dir="ltr"';

    function showItemOfIndex(){

        document.querySelector('.popup[data-popup-name="books"] .box').innerHTML = `
                                <div class="item1 mb-md-4">
                <div class="img mb-4" style="background-image: url('images/books/${bookPopup.img}');"></div>
                <p ${chekLang}>${bookPopup.sentence}</p>
                <div class="status ${bookPopup.status} mt-3">${bookPopup.status}</div>
            </div>
            <div class="item2">
            <div class="parts p-4 d-flex align-items-center">
                    <i class="fa-solid fa-list-ul me-3"></i>
                    <h5 class="m-0 p-0">${bookPopup.partsNumber}</h5>
                    <button class="seeAllBtn ${bookPopup.class} ms-auto my-0">${exploreText}</button>
                </div>
                <ul type="none">
                ${prepareParts(bookPopup.parts)}
                </ul>
            </div>
            </div>
                `;

                    $(".popup[data-popup-name='books'] .box ul li:gt(3)").hide();
$(".popup[data-popup-name='books'] .box ul hr:gt(3)").hide();
$(".popup[data-popup-name='books'] .box .seeAllBtn").show();

$(".popup[data-popup-name='books'] .box .seeAllBtn").click(function(){
    $(".popup[data-popup-name='books'] .box ul li:gt(3)").slideDown();
    $(".popup[data-popup-name='books'] .box ul hr:gt(3)").slideDown();
    $(this).hide();
});
    }
    showItemOfIndex();
        }


  // --- scroll to Brief overview of the Books --------
let heightOfNav = $("nav").outerHeight(true);

$(".explore").click(function(e){

    let targetId = $(this).closest("a").attr("href").substring(1); 

    let targetOffset = $("#" + targetId).offset().top;

    let scrollTo = targetOffset - heightOfNav - 100;

    $("html, body").animate({
        scrollTop: scrollTo
    }, 100);
});


//------------ page turning ------------
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains('turn')) {
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 2 - index;
            }, 500);
        } else {
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 2 + index;
            }, 500);
        }
    };
});

const coversRight = document.querySelectorAll('.cover.cover-right');

setTimeout(() => {
    coversRight.forEach(c => c.classList.add('turn'));
}, 2100);

setTimeout(() => {
    coversRight.forEach(c => c.style.zIndex = -1);
}, 2800);

// ------- Family Choice Section ------------
let family = document.querySelector("#Explore .wrapper .book .familyChoice"),
    paragraph = document.querySelector("#Explore .wrapper .book .hidepara"),
    closeBtn = document.querySelector("#Explore .wrapper .book .back-btn"),
    buttons = document.querySelector("#Explore .wrapper .book .buttons");

    // function that resets family choice
function resetFamilyChoice() {
    family.classList.remove("show", "firstchoice", "secondchoice", "thirdchoice");
    buttons.classList.remove("hide");
    paragraph.classList.remove("hide");
    closeBtn.classList.remove("showbtn");
    family.querySelectorAll("h3.textlight, p.textlight").forEach(el => el.remove());
}

// function that shows your choice
function handleFamilyChoice(choice) {
    family.classList.add("show", choice.className);
    buttons.classList.add("hide");
    paragraph.classList.add("hide");
    closeBtn.classList.add("showbtn");

    const h3 = document.createElement("h3");
    h3.classList.add("textlight");
    h3.textContent = choice.title;

    const p = document.createElement("p");
    p.classList.add("textlight");
    p.textContent = choice.text;

    // -------- ضبط الاتجاه حسب اللغة --------
    let lang = localStorage.getItem("site-lang") || "en";

    if (lang === "ar") {
        family.style.direction = "rtl";
        family.style.textAlign = "right";
    } else {
        family.style.direction = "ltr";
        family.style.textAlign = "left";
    }

    family.append(h3, p);
}

choices.forEach(choice => {
    const el = document.querySelector(`#Explore .wrapper .book .${choice.el}`);
    el.addEventListener("click", () => handleFamilyChoice(choice));
});

closeBtn.addEventListener("click", resetFamilyChoice);


