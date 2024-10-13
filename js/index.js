var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var tBody = document.getElementById("tBody");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var bookMarks = [];
var bookMarkUpdate;

if (localStorage.getItem("bookMarks")) {
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"))
    displayData(bookMarks)
} else {
    bookMarks=[]
}



function addBookMark() {

    if (validateUrl() == true && siteNameInput.value != "") {
        
    var newBookMark = {
        siteName: siteNameInput.value,
        siteUrl:siteUrlInput.value
    }

    bookMarks.push(newBookMark);
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks))
    console.log(bookMarks);
    displayData(bookMarks)
    clearInput() 

    } else {
        Swal.fire({
          title: "Invalid",
            text: `${siteNameInput.value == "" ? "please enter site name" : ""}
          ${validateUrl() == true ? "" : "and enter valid url"}`,
          icon: "question"
        });
    }



}

function displayData(arr) {
   var cartoona =""
    for (var i = 0; i < arr.length; i++) {
        cartoona += `
         <tr>
        <td>${i}</td>
        <td>${arr[i].siteName}</td>
        <td><a class="btn btn-primary" href="${arr[i].siteUrl}" target="_blank">
        <i class="fa-solid fa-eye"></i>
        Visite</a></td>
        <td><button class="btn btn-success" onclick="update(${i})">
        <i class="fa-solid fa-upload"></i>
        Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteBookMark (${i})">
        <i class="fa-solid fa-trash"></i>
        Delete</button></td>
        </tr>        
        `
    }

    tBody.innerHTML = cartoona;
}

function update(index) {
    bookMarkUpdate = index;
    siteNameInput.value = bookMarks[index].siteName;
    siteUrlInput.value = bookMarks[index].siteUrl;
    displayUpdateBtn() 
}

function displayUpdateBtn() {

    document.getElementById("submitBtn").classList.replace("d-block", "d-none");
    document.getElementById("updateBtn").classList.replace("d-none", "d-block");

}

function displaySubmitBtn() {

    document.getElementById("submitBtn").classList.replace("d-none", "d-block");
    document.getElementById("updateBtn").classList.replace("d-block", "d-none");

}

function finalUpdate() {
    var newBookMarkk = {
        siteName: siteNameInput.value,
        siteUrl:siteUrlInput.value
    }
    bookMarks.splice(bookMarkUpdate, 1, newBookMarkk)
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks))
    displayData(bookMarks)
    displaySubmitBtn()
}


function deleteBookMark (index){
    bookMarks.splice(index, 1)
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    displayData(bookMarks)
}

function clearInput() {
    siteNameInput.value = null;

    siteUrlInput.value = null
}

 function validateUrl() {
     var pattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  
     return pattern.test(siteUrlInput.value)
 }