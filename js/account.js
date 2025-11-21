
let accountSection = document.getElementById("Account"),
    profileSection = document.getElementById("Your-profile"),
    profileName = document.querySelector(".profile h3"),
    profilePic = document.querySelector(".profile-pic"),
    setting = document.querySelector("nav ul .setting"),
    langBtn = document.querySelector("nav ul li:nth-of-type(7)"),
    orbit = document.querySelector('.orbit'),
    previewImg = document.getElementById("previewImg"),
    fileInput = document.getElementById("profileImage");

// language switch
document.querySelectorAll(".btn-lang").forEach(btn => {
    btn.addEventListener("click", () => {
        let lang = localStorage.getItem("site-lang") || "en";
        lang = (lang === "en") ? "ar" : "en";
        localStorage.setItem("site-lang", lang);
        window.location.reload();
    });
});

// form switch
document.getElementById('showSignin').onclick = () => switchForm(180);
document.getElementById('showSignup').onclick = () => switchForm(0);

function switchForm(rotation) {
    orbit.style.transform = `rotateY(${rotation}deg)`;
    resetForms();
}

// function that resets forms
function resetForms() {
    document.querySelectorAll("form").forEach(f => f.reset());
    document.querySelectorAll(".alert, .alert-msg").forEach(a => a.classList.add("d-none"));
    previewImg.src = "";
    previewImg.classList.add("d-none");
    fileInput.value = "";
}

// preview image of profile
fileInput.addEventListener("change", function () {
    let file = this.files[0];
    if (file) {
        previewImg.src = URL.createObjectURL(file);
        previewImg.style.display = "block";
    }
});

// function that checks input validation
function checkInput(input) {
    let value = input.value.trim(),
    alertEle = input.nextElementSibling,
    regex,
    message;

    switch(input.name) {
        case "username":
            regex = /^[\u0621-\u064A\u0660-\u0669A-Za-z0-9_]{3,}$/;
            message = "Username is invalid. Only letters and underscores (_) are allowed.";
            break;
        case "email":
            regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            message = "Email address is invalid.";
            break;
        case "password":
            regex = /^.{8,}$/;
            message = "Password must be at least 8 characters long.";
            break;
    }

    if (!value) {
        alertEle.textContent = "This field is required";
        alertEle.classList.remove("d-none");
        input.dataset.valid = false;
    } else if (regex && !regex.test(value)) {
        alertEle.textContent = message;
        alertEle.classList.remove("d-none");
        input.dataset.valid = false;
    } else {
        alertEle.classList.add("d-none");
        input.dataset.valid = true;
    }
}

// check input's validation at blur except file
document.querySelectorAll("form input").forEach(input => {
    if (input.type !== "file") {
        input.addEventListener("blur", () => checkInput(input));
    }
});

// actions at loading / and save last section in local storage
window.addEventListener("load", () => {
    let current = localStorage.getItem("currentScreen"),
    savedName = localStorage.getItem("username"),
    savedImage = localStorage.getItem("profileImage");

    if (current === "profile" && savedName) {
        profileName.textContent = savedName;
        if (savedImage) {
            profilePic.style.backgroundImage = `url(${savedImage})`;
            profilePic.style.backgroundSize = "cover";
            profilePic.style.backgroundPosition = "center";
        }
        setting.classList.remove("d-none");
        langBtn.classList.add("me-4");
        accountSection.style.display = "none";
        profileSection.style.display = "block";
    } else {
        accountSection.style.display = "flex";
        profileSection.style.display = "none";
    }
});

// sing up
document.querySelector(".signup-form").addEventListener("submit", function(e) {
    e.preventDefault();
    if (!fileInput.files[0]) {
        let fileAlert = fileInput.nextElementSibling;
        fileAlert.textContent = "This field is required";
        fileAlert.classList.remove("d-none");
        return;
    }

    let username = this.querySelector("#UserName").value.trim(),
    email = this.querySelector("#Email").value.trim(),
    password = this.querySelector("#Password").value.trim(),
    reader = new FileReader();

    reader.onload = () => {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("profileImage", reader.result);
        localStorage.setItem("currentScreen", "profile");

        profileName.textContent = username;
        profilePic.style.backgroundImage = `url(${reader.result})`;
        profilePic.style.backgroundSize = "cover";
        profilePic.style.backgroundPosition = "center";

        setting.classList.remove("d-none");
        langBtn.classList.add("me-4");
        accountSection.style.display = "none";
        profileSection.style.display = "block";
    };

    reader.readAsDataURL(fileInput.files[0]);
});


// sign in 
document.querySelector(".signin-form").addEventListener("submit", function(e) {
    e.preventDefault();
    let usernameInput = this.querySelector("#UserName").value.trim(),
    emailInput = this.querySelector("#Email").value.trim(),
    passwordInput = this.querySelector("#Password").value.trim(),
    savedName = localStorage.getItem("username"),
    savedEmail = localStorage.getItem("email"),
    savedPass = localStorage.getItem("password"),
    savedImage = localStorage.getItem("profileImage"),
    userAlert = document.getElementById("signinUserAlert"),
    emailAlert = document.getElementById("signinEmailAlert"),
    passAlert = document.getElementById("signinPassAlert");

    let valid = true;
    if (usernameInput !== savedName) { userAlert.classList.remove("d-none"); valid = false; } else userAlert.classList.add("d-none");
    if (emailInput !== savedEmail) { emailAlert.classList.remove("d-none"); valid = false; } else emailAlert.classList.add("d-none");
    if (passwordInput !== savedPass) { passAlert.classList.remove("d-none"); valid = false; } else passAlert.classList.add("d-none");

    if (!valid) return;

    profileName.textContent = savedName;
    profilePic.style.backgroundImage = `url(${savedImage})`;
    profilePic.style.backgroundSize = "cover";
    profilePic.style.backgroundPosition = "center";
    setting.classList.remove("d-none");
    langBtn.classList.add("me-4");
    localStorage.setItem("currentScreen", "profile");
    accountSection.style.display = "none";
    profileSection.style.display = "block";
});

// alert hide and show
document.querySelectorAll(".signin-form input").forEach(input => {
    input.addEventListener("input", () => {
        let savedName = localStorage.getItem("username"),
        savedEmail = localStorage.getItem("email"),
        savedPass = localStorage.getItem("password");

        if (document.querySelector(".signin-form #UserName").value.trim() === savedName)
            document.getElementById("signinUserAlert").classList.add("d-none");
        if (document.querySelector(".signin-form #Email").value.trim() === savedEmail)
            document.getElementById("signinEmailAlert").classList.add("d-none");
        if (document.querySelector(".signin-form #Password").value.trim() === savedPass)
            document.getElementById("signinPassAlert").classList.add("d-none");
    });
});


document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("deleteAccountBtn").addEventListener("click", deleteAccount);

// function to logout
function logout() {
    profileSection.style.display = "none";
    accountSection.style.display = "flex";
    resetForms();
    localStorage.setItem("currentScreen", "account");
    setting.classList.add("d-none");
    langBtn.classList.remove("me-4");
}

// function to delete account
function deleteAccount() {
    localStorage.clear();
    localStorage.setItem("currentScreen", "account");
    resetForms();
    profileSection.style.display = "none";
    accountSection.style.display = "flex";
    setting.classList.add("d-none");
    langBtn.classList.remove("me-4");
    alert("Your account has been deleted.");
}

// menutabs list in profile section 
let tabs = document.querySelectorAll("#menuTabs li"),
    contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        contents.forEach(c => c.classList.add("d-none"));
        document.getElementById(tab.dataset.target).classList.remove("d-none");
    });
});
