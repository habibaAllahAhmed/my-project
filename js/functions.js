
// function that opens popup
function openPopup(popupName){
  document.body.classList.add("no-scroll");
            $("nav").addClass("d-none");
    $(`.popup[data-popup-name='${popupName}']`).addClass("active");
    $(`.popup[data-popup-name='${popupName}']`).delay(10).addClass("show");
    $(`.popup[data-popup-name='${popupName}'] .box`).click(function(e){
    e.stopPropagation();
 });
}

// function that closes popup
function closePopup(popupName){
       document.body.classList.remove("no-scroll");
                $("nav").removeClass("d-none");
            $("body").removeClass("stop-scroll");
    $(`.popup[data-popup-name='${popupName}']`).removeClass("show");
    $(`.popup[data-popup-name='${popupName}']`).delay(10).removeClass("active");
}

