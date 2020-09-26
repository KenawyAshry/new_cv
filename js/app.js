window.addEventListener("load", function () {
  document.querySelector(".preloader").classList.add("opacity-0");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 1000);
});

// Portfolio item filter

const filterContainer = document.querySelector(".port-filter"),
  filterBtns = filterContainer.children,
  totalFilterBtn = filterBtns.length,
  portItems = document.querySelectorAll(".port-item"),
  totalPortItems = portItems.length;
console.log(totalPortItems);
for (let i = 0; i < totalFilterBtn; i++) {
  filterBtns[i].addEventListener("click", function () {
    filterContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");

    const folterVal = this.getAttribute("data-filter");
    for (let index = 0; index < totalPortItems; index++) {
      if (folterVal === portItems[index].getAttribute("data-cat")) {
        portItems[index].classList.remove("hide");
        portItems[index].classList.add("show");
      } else {
        portItems[index].classList.remove("show");
        portItems[index].classList.add("hide");
      }

      if (folterVal === "all") {
        portItems[index].classList.remove("hide");
        portItems[index].classList.add("show");
      }
    }
  });
}

/////// slider lightbox Show
const lightBox = document.querySelector(".lightbox"),
  lightBoxImg = document.querySelector(".lighbox-img"),
  lightBoxText = document.querySelector(".caption-text"),
  lightBoxCount = document.querySelector(".caption-count"),
  closeLightbox = document.querySelector(".lightbox-close");

let itemIndex = 0;

for (let i = 0; i < totalPortItems; i++) {
  portItems[i].addEventListener("click", function () {
    itemIndex = i;
    changeItem();
    toggleLighbox();
  });
}

function toggleLighbox() {
  lightBox.classList.toggle("open");
}

function changeItem() {
  imgSrc = portItems[itemIndex]
    .querySelector(".port-img > img")
    .getAttribute("src");
  lightBoxImg.src = imgSrc;
  lightBoxText.innerHTML = portItems[itemIndex].querySelector(
    ".port-item-info h4"
  ).innerHTML;
  lightBoxCount.innerHTML = itemIndex + 1 + " of " + totalPortItems;
}

function prevItem() {
  if (itemIndex === 0) {
    itemIndex = totalPortItems - 1;
  } else {
    itemIndex--;
  }
  changeItem();
}

function nextItem() {
  if (itemIndex === totalPortItems - 1) {
    itemIndex = 0;
  } else {
    itemIndex++;
  }
  changeItem();
}

/// close light box
closeLightbox.addEventListener("click", function () {
  lightBox.classList.remove("open");
});
lightBox.addEventListener("click", function (event) {
  if (event.target === closeLightbox || event.target === lightBox) {
    lightBox.classList.remove("open");
  }
});

/////////

/// check if there is color in loclal storge
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  document.querySelectorAll(".color").forEach((element) => {
    element.classList.remove("active");

    /// add active
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}
// ################################################
const skinBox = document.querySelector(".skins");
document.querySelector(".fa-o").onclick = function () {
  skinBox.classList.toggle("open");
};

const colorsLi = document.querySelectorAll(".color");

const ul = document.querySelector(".skins ul");
colorsLi.forEach((item) => {
  item.addEventListener("click", function (e) {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    ul.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
  });
});

///////

////// Aside Navbar
const nav = document.querySelector(".links"),
  navList = nav.querySelectorAll(".link-item"),
  totalNavList = navList.length,
  allSEctions = document.querySelectorAll(".section");

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    for (let i = 0; i < totalNavList; i++) {
      allSEctions[i].classList.remove("back_section");
    }
    // loooooop to remove active class
    for (let s = 0; s < totalNavList; s++) {
      if (navList[s].querySelector("a").classList.contains("active")) {
        allSEctions[s].classList.add("back_section");
      }
      navList[s].querySelector("a").classList.remove("active");
    }
    /// add active class on target
    this.classList.add("active");

    showSection(this);

    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}

function showSection(element) {
  for (let i = 0; i < allSEctions.length; i++) {
    allSEctions[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];

  document.querySelector("#" + target).classList.add("active");
}

////// Body Skin Theme

///////

//// #############################################%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// let skinBody = localStorage.getItem("body-Skin");
// if (skinBody !== null) {
//     document.body.className = "dark"

//     document.body.querySelectorAll(".dark").forEach(element => {
//         element.classList.remove("dark");

//         /// add active
//         if (element.className === skinBody) {
//             element.classList.add("dark");
//         }
//     })
// }
let darkMode = localStorage.getItem("darkMode");
const bulleSwitch = document.querySelector(".switch");
const bodyTheme = document.querySelector(".body-theme");
/////////

bodyTheme.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    bulleSwitch.classList.add("move");
    bodyTheme.classList.add("dark");
    enableDarkMode();
  } else {
    disabledDarkMode();
    bulleSwitch.classList.remove("move");
    bodyTheme.classList.remove("dark");
  }
});

//
const enableDarkMode = () => {
  // 1- add class
  document.body.classList.add("dark");
  // 2- save in local storge
  localStorage.setItem("darkMode", "enabled");
  bulleSwitch.classList.add("move");
  bodyTheme.classList.add("dark");
};
// disabled
const disabledDarkMode = () => {
  // 1- add class
  document.body.classList.remove("dark");
  // 2- save in local storge
  localStorage.setItem("darkMode", null);
  bulleSwitch.classList.remove("move");
  bodyTheme.classList.remove("dark");
};

if (darkMode === "enabled") {
  enableDarkMode();
}
///////

const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", function () {
  asideSectionTogglerBtn();
});
function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for (let i = 0; i < allSEctions.length; i++) {
    allSEctions[i].classList.toggle("open");
  }
}
