
let characterLinks = document.querySelectorAll("#Characters ul li "),
    characterLiLinks = document.querySelectorAll("#Characters ul li "),
    characterLiElements = document.querySelectorAll("#Characters ul li"),
    characterLiActive = document.querySelector("#Characters ul li.active"),
    currentCharacterLiItem = document.querySelector("#Characters .container .row .item.show"),
    Family1Link = document.querySelector("#Characters ul li:nth-of-type(1)"),
    Family2Link = document.querySelector("#Characters ul li:nth-of-type(2)"),
    Family3Link = document.querySelector("#Characters ul li:nth-of-type(3)"),
    Family4Link = document.querySelector("#Characters ul li:nth-of-type(4)");


// function that change active of links
function activateLinks(elements, activeElement) {
    elements.forEach((el) => {
        el.addEventListener("click", function() {
            elements.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });
}

//change active in character li links
activateLinks(characterLiElements, characterLiActive);

// prevent default action of character links in li 
characterLiLinks.forEach(function (characterLiLink) {
    characterLiLink.addEventListener("click", function (e) {
        e.preventDefault();
    });
})

// show the Family1 character
Family1Link.addEventListener("click", function () {
    showFamily(Family1 ,"Family1");
});

// show the Family2 character
Family2Link.addEventListener("click", function () {
    showFamily(Family2, "Family2");
});

// show the Family3 character
Family3Link.addEventListener("click", function () {
    showFamily(Family3 , "Family3");
});

// show the Family4 character
Family4Link.addEventListener("click", function () {
    showFamily(Family4 , "Family4");
});

// show the Family1 character
showFamily(Family1 , "Family1");

// show character Section
function showFamily(families , nameOfSection) {
    let popupSection = nameOfSection;
    document.querySelector("#Characters .container .row").innerHTML = "";

    families.forEach(function (character , index) {
        document.querySelector("#Characters .container .row").innerHTML += `
                        <div class=" character col-sm-6 col-md-4 ${character.name}">
                        <div class="item">
                            <div class="img" style="background-image: url('images/characters/moons/${character.image}') ; 
                            width: ${character.width}; height : ${character.height} ; margin-top : ${character.marginTop};" 
                            onclick="openPopup('character');showFamilyPopup( ${index},${popupSection})">
                            </div>
                  <p style="transform: translateY(${character.translateY});">${character.name}</p>
                        </div>
                    </div>
                `;
    });

    let newItems = document.querySelectorAll("#Characters .container .row .item");
    setTimeout(() => {
        newItems.forEach(item => item.classList.add("show"));
    }, 1);

}

// show the popup of the  character
function showFamilyPopup(index , popupSection) {
    function showItemOfIndex(){
        let popupCharacter = popupSection[index];

        document.querySelector('.popup[data-popup-name="character"] .box').innerHTML = `
                        <div class="character-img ${popupCharacter.name}" style="background-image: url('images/characters/img/${popupCharacter.img}') ;"></div>
                <div class="their-words">
                    <p>${popupCharacter.words}</p>
                </div>
                `;
    }

    showItemOfIndex();
        }

