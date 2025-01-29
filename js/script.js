//select all the current elements in the page 
let formElement=document.querySelector('form');
let nameInput=document.getElementById('name');
let otherJob=document.getElementById('other-job-role');
let jobTitle=document.getElementById('title');
let design=document.getElementById('design');
let colorSelect=document.getElementById('color');
let colorOptions=document.querySelectorAll('option[data-theme]');
let totalCost=document.getElementById('activities-cost');
let activities=document.getElementById('activities');

let activityCheckboxes=document.querySelectorAll("input[type='checkbox']");



function focusName(){
    /*When the page first loads, the first text field should have
the focus state by default to prompt the use*/
    //name should start wit
    nameInput.focus();
}

function jobHandler(){
    //hide the other job input text by defaultotherJob.hidden=true;
    otherJob.disabled=true; 
    otherJob.hidden=true;
   
   jobTitle.addEventListener('change',(e)=>{
    //collect the target value
    let titleValue=e.target.value;
    console.log(titleValue);
    if (titleValue==='other'){
        otherJob.hidden=false;
        otherJob.disabled=true;

    }else{
        otherJob.hidden=true;
        otherJob.disabled=true;
    }
});
}


function handleColor(){
    colorSelect.disabled=true;
    design.addEventListener('change',(e)=>{
        
        for(let i=0;i<colorOptions.length;i++){
            if(design.value!==colorOptions[i].getAttribute("data-theme")){
                colorOptions[i].hidden=true;
                colorOptions[i].disabled=true;  
            }
            else{
                
                colorSelect.disabled=false;
                colorOptions[i].hidden=false;
                colorOptions[i].disabled=false;
                
                
            
            }
        }
        if(colorSelect.value!==''){
           colorSelect.selectedIndex=0;
        }

           
    });
}

function addActivitiesCost() {
  let totalActivitiesCost = 0;

  activities.addEventListener('change', (e) => {
    let targetCost = Number(e.target.getAttribute('data-cost'));
    let targetDate = e.target.getAttribute('data-day-and-time')


    if (e.target.checked) {
      totalActivitiesCost += targetCost
      totalCost.innerHTML=`$${totalActivitiesCost}`;
      for (let i = 0; i < activityCheckboxes.length; i++) {
        let targetActivityDate = activityCheckboxes[i].getAttribute('data-day-and-time');
        if (!activityCheckboxes[i].checked && targetDate === targetActivityDate) {
          activityCheckboxes[i].disabled = true;
          activityCheckboxes[i].parentElement.className = 'disabled';
        }
      }
    } else {
      totalActivitiesCost -= targetCost
      totalCost.innerHTML=`$${totalActivitiesCost}`;
      for (let i = 0; i < activityCheckboxes.length; i++) {
        let targetActivityDate = activityCheckboxes[i].getAttribute('data-day-and-time');
        if (targetActivityDate === targetDate) {
          activityCheckboxes[i].disabled = false;
          activityCheckboxes[i].parentElement.className = '';
        }
      }
    }
  });
}




    
    
focusName();
jobHandler();
handleColor();
addActivitiesCost();