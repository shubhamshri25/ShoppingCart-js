const signupBtn = document.getElementById("signup-btn");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const pass = document.getElementById("pass");
const confpass = document.getElementById("cnf-pass");
const form = document.querySelector("form");
const errmsg = document.querySelector("#err-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    fname.value == "" ||
    lname.value == "" ||
    email.value == "" ||
    pass.value == "" ||
    confpass.value == ""
  ) {
    errmsg.innerText = "Error : All the fields are mandatory";
    errmsg.style.color = "#FF4F4F";
    errmsg.style.display = "block";
    errmsg.style.margin = "1rem";
    return;
  }

  if (pass.value != confpass.value) {
    errmsg.innerText = "Password not matching";
    errmsg.style.color = "#FF4F4F";
    errmsg.style.display = "block";
    errmsg.style.margin = "1rem";
    return;
  }

  let user = {
    firstname: fname.value,
    lastname: lname.value,
    email: email.value,
    password: pass.value,
  };

  console.log(user);

  if (!localStorage.getItem("users")) {
    let usersarr = [];
    usersarr.push(user);

    localStorage.setItem("users", JSON.stringify(usersarr));
  } else {
    let usersarr = JSON.parse(localStorage.getItem("users"));
    console.log(usersarr);

    for (let userobj of usersarr) {
      if (userobj.email === email.value) {
        console.log("hi");
        errmsg.innerText = `User with email ${userobj.email} already exists`;
        errmsg.style.color = "#FF4F4F";
        errmsg.style.display = "block";
        errmsg.style.margin = "1rem";
        found = true;
        return;
      }
    }

    usersarr.push(user);
    localStorage.setItem("users", JSON.stringify(usersarr));
  }

  localStorage.setItem("currentuser", JSON.stringify(user));

  errmsg.innerText = "Successfully Signed Up!";
  errmsg.style.color = "#7ECD71";
  errmsg.style.display = "block";
  errmsg.style.margin = "1rem";
});
