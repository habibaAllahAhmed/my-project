
let clockBox = document.querySelector(".clock-box .clock"),
clockMessage = document.createElement("div"),
hoverTimeout;

// loading page
  window.addEventListener("DOMContentLoaded", () => {
    let loading = document.querySelector(".loading");
    document.body.classList.add("no-scroll");

setTimeout(() => {
    document.body.classList.remove("no-scroll");
}, 4000);

    loading.style.display = "flex";
    loading.style.opacity = "1";

    setTimeout(() => {
      loading.style.transition = "opacity 0.6s ease";
      loading.style.opacity = "0";

      setTimeout(() => {
        loading.style.display = "none";
      }, 600);

    }, 4000);
  });

// function to show time
function updateClock() {
    let now = new Date(),
    hours = now.getHours(),
    minutes = String(now.getMinutes()).padStart(2, '0'),
    seconds = String(now.getSeconds()).padStart(2, '0'),
    ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    document.querySelector('#Home .clock .time').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

setInterval(updateClock, 1000);

updateClock();

// --------- show message --------
document.querySelector(".clock-box").appendChild(clockMessage);
clockMessage.classList.add("message-text");

$(".message .img img").hover(
  function () {
    clearTimeout(hoverTimeout); 
    let text = $(this).closest(".message").find("p").text();
    let clockBox = $(".clock-box");
    let clockContent = clockBox.find(".clock");
    let messageBox = clockBox.find(".message-text");

    messageBox.removeClass("show-message");

    clockContent.css("opacity", "0");

    hoverTimeout = setTimeout(() => {
      messageBox.text(text);
      messageBox.addClass("show-message");
    }, 400);
  },
  function () {
    clearTimeout(hoverTimeout);
    let clockBox = $(".clock-box");
    let clockContent = clockBox.find(".clock");
    let messageBox = clockBox.find(".message-text");

    messageBox.removeClass("show-message");

    hoverTimeout = setTimeout(() => {
      if (!$(".message .img img:hover").length) {
        clockContent.css("opacity", "1");
      }
    }, 400);
  }
);

// function gets instructions by api
(function () {
  let path = window.location.pathname;
  let apiURL = "";
  let isArabic = false;

  if (path.includes("Ar")) {
    apiURL = "https://jsonkeeper.com/b/O5XVB";
    isArabic = true;
  } else {
    apiURL = "https://jsonkeeper.com/b/YH2XK"; 
  }

  fetch(apiURL)
    .then((response) => response.json())
    .then(function (data) {
      let instructions = data;
      instructions.forEach(function (instruction, i) {
        let pointsHTML = "";
        instruction.point.forEach(function (p) {
          pointsHTML += `<li>${p}</li>`;
        });

        if(isArabic){
          $("#Instructions .instructions-grid .card").eq(i).append(`
                  <h3 dir="rtl">${instruction.title}</h3>
            <ol dir="rtl" style="direction: rtl; list-style-position: inside;">${pointsHTML}</ol>
          `);
        } else {
          $("#Instructions .instructions-grid .card").eq(i).append(`
            <h3>${instruction.title}</h3>
            <ol>${pointsHTML}</ol>
          `);
        }
      });
    });
})();

// button to show instruction
$(".enter-btn").click(function() {
  $("#Instructions").addClass("active");
  $("#Home #Instructions .ourPlace").css("opacity", "0");
  $(".intro").css("opacity", "0");
  setTimeout(() => {
    $(".instructions-grid").addClass("active");
      setTimeout(() => {
    $(".instructions-grid").addClass("show");
    $(".instructions-grid .card").each((i, el) => {
      setTimeout(() => $(el).addClass("visible"), i * 200);
    });
  }, 500);
  }, 500);
});

// button to hide instruction again
$(".back").click(function() {
  $(".instructions-grid").removeClass("show");
  
  setTimeout(() => {
    $("#Instructions").removeClass("active");

      setTimeout(() => {
            $(".instructions-grid").removeClass("active");
    $(".instructions-grid .card").removeClass("visible");
  }, 10);

    $(".instructions-grid").removeClass("active");
    $(".instructions-grid .card").removeClass("visible");
  setTimeout(() => {
      $("#Home #Instructions .ourPlace").css("opacity", "1");
  $(".intro").css("opacity", "1");
  }, 500);
  }, 500);

});







