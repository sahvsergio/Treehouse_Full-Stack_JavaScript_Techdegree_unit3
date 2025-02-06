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

if (isValidZIp(zipValue)) {
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
}

if (isValidCcv) {
  //check if the CC number is a valid one

  ccvInput.parentElement.classList.add("valid");
} else {
  ccvInput.parentElement.classList.add("not-valid);
  ccvHint.style.display = "block";
  e.preventDefault();
}
