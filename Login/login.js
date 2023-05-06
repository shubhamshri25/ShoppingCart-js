const loginbtn = document.getElementById("login-btn");
const emailVal = document.getElementById("email");
const passVal = document.getElementById("pass");
const form = document.querySelector("form");
const errmsg = document.querySelector("#err-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (emailVal.value == "" || passVal.value == "") {
    errmsg.innerText = "Error : All the fields are mandatory";
    errmsg.style.color = "#FF4F4F";
    errmsg.style.display = "block";
    errmsg.style.margin = "1rem";
    return;
  }

  if (!localStorage.getItem("users")) {
    errmsg.innerText = `${emailVal.value} is not available You must sign in first`;
    errmsg.style.color = "#FF4F4F";
    errmsg.style.display = "block";
    errmsg.style.margin = "1rem";
    return;
  } else {
    let usersarr = JSON.parse(localStorage.getItem("users"));
    console.log(usersarr);

    for (let userobj of usersarr) {
      if (
        userobj.email == emailVal.value &&
        userobj.password == passVal.value
      ) {
        localStorage.setItem("currentuser", JSON.stringify(userobj));

        errmsg.innerText = "Successfully Logged in!";
        errmsg.style.color = "#7ECD71";
        errmsg.style.display = "block";
        errmsg.style.margin = "1rem";

        setTimeout(() => {
          window.location.href = "../shop/shop.html";
        }, 1000);
        return;
        
      }
    }

    errmsg.innerText = `${emailVal.value} is not available You must sign in first or wrong password entered`;
    errmsg.style.color = "#FF4F4F";
    errmsg.style.display = "block";
    errmsg.style.margin = "1rem";
    return;
  }
});
