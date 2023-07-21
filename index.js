var bookmarks = [];

var siteNameInput = document.getElementById("bookmarkName");
var siteURLInput = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var deleteBtn;
var visitBtn;
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.getElementById("box-info");

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
  }
}

//  Clear form Function

function clearInput() {
  siteNameInput.value = "";
  siteURLInput.value = "";
}


function displayBookmark(indexOfWebsite) {
  var userURL = bookmarks[indexOfWebsite].siteURLInput;
  var httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
      .split("")
      .splice(validURL.match(httpsRegex)[0].length)
      .join("");
  } else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
  }
  var newBookmark = `
              <tr>
                <td>${indexOfWebsite + 1}</td>
                <td>${
                  bookmarks[indexOfWebsite].siteNameInput
                }</td>              
                <td>
                  <button  id="deleteBtn" onclick="deleteBtn()" class="btn btn-visit" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button id="visitBtn" onclick="visitBtn()" class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  tableContent.innerHTML += newBookmark;

    visitBtn = document.querySelectorAll(".btn-visit");
    if (visitBtn) {
      for (var l = 0; l < visitBtn.length; l++) {
        visitBtn[l].addEventListener("click", function (e) {
          visitWebsite(e);
        });
      }
    }

  deleteBtn = document.querySelectorAll(".btn-delete");
  if (deleteBtn) {
    for (var k = 0; k < deleteBtn.length; k++) {
      deleteBtn[k].addEventListener("click", function (e) {
        deleteBookmark(e);
      });
    }
  }


}

//  Submit Function

submitBtn.addEventListener("click", function () {
  if (
    siteNameInput.classList.contains("valid") &&
    siteURLInput.classList.contains("valid")
  ) {
    var bookmark = {
      siteNameInput: capitalize(siteNameInput.value),
      siteURLInput: siteURLInput.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
    siteNameInput.classList.remove("valid");
    siteURLInput.classList.remove("valid");
  } else {
    boxModal.classList.remove("d-none");
  }
});


//  Capitalize Function

function capitalize(str) {
  var strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}


//  Visit Function

function visitWebsite(e) {
  var websiteIndex = e.target.dataset.index;
  var httpsRegex =
    /[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/g;
  if (httpsRegex.test(bookmarks[websiteIndex].siteURLInput)) {
    open(bookmarks[websiteIndex].siteURLInput);
  } else {
    open(`https://${bookmarks[websiteIndex].siteURLInput}`);
  }
}

//  Delete Function

function deleteBookmark(e) {
  tableContent.innerHTML = "";
  var deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  for (var x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

// enter the correct data

var nameRegex = /^\w{4,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteNameInput.addEventListener("input", function () {
  validate(siteNameInput, nameRegex);
});

siteURLInput.addEventListener("input", function () {
  validate(siteURLInput, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("valid");
    element.classList.remove("invalid");
  } else {
    element.classList.add("invalid");
    element.classList.remove("valid");
  }
}

//Close  Function

function closeModal() {
  boxModal.classList.add("d-none");
}

closeBtn.addEventListener("click", closeModal);
