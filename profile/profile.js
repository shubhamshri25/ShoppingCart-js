// Write your script here

if (!localStorage.getItem("currentuser")) {
  alert("you need to signup or login first");
  setTimeout(() => {
    window.location.href = "../signup/signup.html";
  }, 1000);
}

const fname = document.getElementById("fname");
const lname = document.getElementById("lname");

const saveInfoBtn = document.getElementById("save-btn");
const changePassBtn = document.getElementById("changepass-btn");
const logOutBtn = document.getElementById("logout-btn");

const oldPass = document.getElementById("old-pass");
const newPass = document.getElementById("new-pass");
const cnfNewPass = document.getElementById("cnf-new-pass");

const errmsg1 = document.getElementById("err-msg1");
const errmsg2 = document.getElementById("err-msg2");

const form1 = document.getElementById("profile");

let currentuser = JSON.parse(localStorage.getItem("currentuser"));
fname.value = currentuser.firstname;
lname.value = currentuser.lastname;

// saving the info the current user
saveInfoBtn.addEventListener("click", () => {
  let usersarr = JSON.parse(localStorage.getItem("users"));
  console.log(usersarr);

  for (let i = 0; i < usersarr.length; i++) {
    if (usersarr[i].email == currentuser.email) {
      currentuser = {
        firstname: fname.value,
        lastname: lname.value,
        email: usersarr[i].email,
        password: usersarr[i].password,
      };

      usersarr.splice(i, 1, currentuser);
      break;
    }
  }

  localStorage.setItem("users", JSON.stringify(usersarr));
  localStorage.setItem("currentuser", JSON.stringify(currentuser));
});

// changing the password if needed
changePassBtn.addEventListener("click", () => {
  if (oldPass.value == "" || newPass.value == "" || cnfNewPass.value == "") {
    errmsg2.innerText = "Error : All the fields are mandatory";
    errmsg2.style.color = "#FF4F4F";
    errmsg2.style.display = "block";
    errmsg2.style.margin = "1rem";
    return;
  }

  if (oldPass.value == newPass.value) {
    errmsg2.innerText =
      "New Password matching with old password make sure it is different";
    errmsg2.style.color = "#FF4F4F";
    errmsg2.style.display = "block";
    errmsg2.style.margin = "1rem";
    return;
  }

  if (newPass.value != cnfNewPass.value) {
    errmsg2.innerText = "confirm password not matching with new password";
    errmsg2.style.color = "#FF4F4F";
    errmsg2.style.display = "block";
    errmsg2.style.margin = "1rem";
    return;
  }

  let usersarr = JSON.parse(localStorage.getItem("users"));
  console.log(usersarr);

  for (let i = 0; i < usersarr.length; i++) {
    if (
      usersarr[i].email == currentuser.email &&
      usersarr[i].password == oldPass.value
    ) {
      currentuser = {
        firstname: usersarr[i].firstname,
        lastname: usersarr[i].lastname,
        email: usersarr[i].email,
        password: newPass.value,
      };

      usersarr.splice(i, 1, currentuser);

      localStorage.setItem("users", JSON.stringify(usersarr));
      localStorage.setItem("currentuser", JSON.stringify(currentuser));

      errmsg2.innerText = "Password changed successfully";
      errmsg2.style.color = "#7ECD71";
      errmsg2.style.display = "block";
      errmsg2.style.margin = "1rem";
      return;
    }
  }

  errmsg2.innerText = "old password not matching with existing password";
  errmsg2.style.color = "#FF4F4F";
  errmsg2.style.display = "block";
  errmsg2.style.margin = "1rem";
});

logOutBtn.addEventListener("click", () => {
  alert("Are you sure you will be logged out and sent to home page?");

  fname.value = "";
  lname.value = "";
  oldPass.value = "";
  newPass.value = "";
  cnfNewPass.value = "";

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);

  localStorage.removeItem("currentuser");
});
