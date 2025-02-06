//select all the current elements in the page
let formElement = document.querySelector("form");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let creditCardInput = document.getElementById("cc-num");
let zipcodeInput = document.getElementById("zip");
let ccvInput = document.getElementById("cvv");

let otherJob = document.getElementById("other-job-role");
let jobTitle = document.getElementById("title");
let design = document.getElementById("design");
let colorSelect = document.getElementById("color");
let colorOptions = document.querySelectorAll("option[data-theme]");
let totalCost = document.getElementById("activities-cost");
let activities = document.getElementById("activities");
let ccfieldset = document.querySelector(".payment-methods");
let activitiesLegend = document.querySelector("#activities legend");

let activityCheckboxes = document.querySelectorAll("input[type='checkbox']");
let paymentSelect = document.getElementById("payment");
let creditCardDiv = document.getElementById("credit-card");
let paypalDiv = document.getElementById("paypal");
let bitCoinDiv = document.getElementById("bitcoin");

let paymentOptions = paymentSelect.children;

function focusName() {
  /*When the page first loads, the first text field should have
the focus state by default to prompt the use*/
  //name should start wit
  nameInput.focus();
}

function jobHandler() {
  //hide the other job input text by defaultotherJob.hidden=true;
  otherJob.disabled = true;
  otherJob.hidden = true;

  jobTitle.addEventListener("change", (e) => {
    //collect the target value
    let titleValue = e.target.value;

    if (titleValue === "other") {
      otherJob.hidden = false;
      otherJob.disabled = true;
    } else {
      otherJob.hidden = true;
      otherJob.disabled = true;
    }
  });
}

function handleColor() {
  colorSelect.disabled = true;
  design.addEventListener("change", (e) => {
    for (let i = 0; i < colorOptions.length; i++) {
      if (design.value !== colorOptions[i].getAttribute("data-theme")) {
        colorOptions[i].hidden = true;
        colorOptions[i].disabled = true;
      } else {
        colorSelect.disabled = false;
        colorOptions[i].hidden = false;
        colorOptions[i].disabled = false;
      }
    }
    if (colorSelect.value !== "") {
      colorSelect.selectedIndex = 0;
    }
  });
}

function addActivitiesCost() {
  let totalActivitiesCost = 0;

  activities.addEventListener("change", (e) => {
    let targetCost = Number(e.target.getAttribute("data-cost"));
    let targetDate = e.target.getAttribute("data-day-and-time");

    if (e.target.checked) {
      totalActivitiesCost += targetCost;
      totalCost.innerHTML = `$${totalActivitiesCost}`;
      for (let i = 0; i < activityCheckboxes.length; i++) {
        let targetActivityDate =
          activityCheckboxes[i].getAttribute("data-day-and-time");
        if (
          !activityCheckboxes[i].checked &&
          targetDate === targetActivityDate
        ) {
          activityCheckboxes[i].disabled = true;
          activityCheckboxes[i].parentElement.className = "disabled";
        }
      }
    } else {
      totalActivitiesCost -= targetCost;
      totalCost.innerHTML = `$${totalActivitiesCost}`;
      for (let i = 0; i < activityCheckboxes.length; i++) {
        let targetActivityDate =
          activityCheckboxes[i].getAttribute("data-day-and-time");
        if (targetActivityDate === targetDate) {
          activityCheckboxes[i].disabled = false;
          activityCheckboxes[i].parentElement.className = "";
        }
      }
    }
  });
}

function handlePayment() {
  //page loads
  //load credit card
  let ccPayment = (paymentOptions[1].selected = true);
  paypalDiv.hidden = true;
  paypalDiv.disabled = true;
  bitCoinDiv.hidden = true;
  bitCoinDiv.disabled = true;

  paymentSelect.addEventListener("change", (e) => {
    if (paymentSelect.value === "bitcoin") {
      creditCardDiv.hidden = true;
      creditCardDiv.disabled = true;
      paypalDiv.hidden = true;
      paypalDiv.disabled = true;
      bitCoinDiv.hidden = false;
      bitCoinDiv.disabled = false;
    } else if (paymentSelect.value === "paypal") {
      creditCardDiv.hidden = true;
      creditCardDiv.disabled = true;
      bitCoinDiv.hidden = true;
      bitCoinDiv.disabled = true;
      paypalDiv.hidden = false;
      paypalDiv.disabled = false;
    } else {
      paypalDiv.hidden = true;
      paypalDiv.disabled = true;
      bitCoinDiv.hidden = true;
      bitCoinDiv.disabled = true;
      creditCardDiv.hidden = false;
    }
  });
}

function formSubmission() {
  formElement.addEventListener("submit", (e) => {
    let nameRegEx = /^[A-ZÁÉÍÓÚÑa-záéíóúñ]+(?: [A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/;
    let emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let ccRegEx = /^\d{13,16}$/;
    let zipRegEx = /^\d{5}$/;
    let ccvReGex = /^\d{3}$/;

    //Assing values
    let nameValue = nameInput.value;
    let emailValue = emailInput.value;
    let ccValue = creditCardInput.value;
    let zipValue = zipcodeInput.value;
    let ccvValue = ccvInput.value;

    // identify hints for all required fields
    let nameHint = document.querySelector("#name-hint");
    let emailHint = document.querySelector("#email-hint");
    let checkboxesHint = document.querySelector("#activities-hint");
    let ccHint = document.querySelector("#cc-hint");
    let zipHint = document.querySelector("#zip-hint");
    let ccvHint = document.querySelector("#cvv-hint");

    //regexes testing variables
    let isValidName = nameRegEx.test(nameValue);
    let isValidEmail = emailRegEx.test(emailValue);
    let isValidCc = ccRegEx.test(ccValue);
    let isValidZIp = zipRegEx.test(zipValue);
    let isValidCcv = ccvReGex.test(ccvValue);

    // Validations for name value
    if (nameValue === "") {
      e.preventDefault();
      nameHint.style.display = "block";
      nameHint.parentNode.classList.add("not-valid");
    } else {
      //check if the name is a valid one
      if (isValidName) {
        nameInput.parentElement.classList.add("valid");
      } else {
        nameHint.style.display = "block";
        nameHint.parentNode.classList.add("not-valid");
        nameHint.innerText = `${nameValue} is not a valid name`;
      }
    }
    //Validations for email value
    if (emailValue === "") {
      e.preventDefault();

      emailHint.style.display = "block";
    }
    if (isValidEmail) {
      //check if the name is a valid one

      emailInput.parentElement.classList.add("valid");
    } else {
      emailHint.innerText = "This is not a valid email";
      emailHint.parentElement.classList.add("not-valid");
      emailHint.style.display = "block";
    }
    let tickedOn = 0;
    //Checkbox validations
    for (let i = 0; i < activityCheckboxes.length; i++) {
      if (activityCheckboxes[i].checked) {
        tickedOn += 1;
      }
    }
    if (tickedOn === 0) {
      e.preventDefault();
      activities.classList.add("not-valid");

      checkboxesHint.style.display = "block";
    } else {
      activities.classList.add("valid");
    }

    //CC number validation
    if (paymentOptions[1].selected === true) {
      if (ccValue === "") {
        ccHint.style.display = "block";

        creditCardInput.parentElement.classList.add("not-valid");
      }
      if (isValidCc) {
        //check if the CC number is a valid one

        creditCardInput.parentElement.classList.add("valid");
      } else {
        e.preventDefault();
        creditCardInput.parentElement.classList.add("not-valid");
        ccHint.style.display = "block";
      }
      //Zipcode validator

      if (zipValue === "") {
        e.preventDefault();
        zipHint.style.display = "block";
        zipcodeInput.parentElement.classList.add("not-valid");
      }

      if (isValidZIp) {
        //check if the CC number is a valid one

        zipHint.innerText = "This is a valid zip number";

        zipHint.style.display = "block";
      } else {
        e.preventDefault();
        zipcodeInput.parentElement.classList.add("not-valid");
        zipHint.style.display = "block";
      }

      //CVV validator
      if (ccvValue === "") {
        e.preventDefault();
        ccvHint.style.display = "block";
        ccvInput.parentElement.classList.add("not-valid");
        ccvHint.innerText = "Cvv cannot be blank";
      }

      if (isValidCcv) {
        //check if the CC number is a valid one

        ccvInput.parentElement.classList.add("valid");
      } else {
        e.preventDefault();
        ccvInput.parentElement.classList.add("not-valid");
        ccvHint.style.display = "block";
      }
    } else {
      creditCardDiv.hidden = true;
    }
  });
}
function checkboxAccessibility() {
  //loop through the activities checkboxes
  for (let i = 0; i < activityCheckboxes.length; i++) {
    activityCheckboxes[i].addEventListener("focus", (e) => {
      activityCheckboxes[i].parentElement.classList.add("focus");
    });
    activityCheckboxes[i].addEventListener("blur", (e) => {
      activityCheckboxes[i].parentElement.classList.remove("focus");
    });
  }
}

focusName();
jobHandler();
handleColor();
addActivitiesCost();
handlePayment();
formSubmission();
checkboxAccessibility();

