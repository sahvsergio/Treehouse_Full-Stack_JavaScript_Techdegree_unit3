//select all the current elements in the page 
let formElement=document.querySelector('form');
let nameInput=document.getElementById('name');
let otherJob=document.getElementById('other-job-role');
let jobTitle=document.getElementById('title');
let design=document.getElementById('design');
let colorSelect=document.getElementById('color');

function focusName(){
    /*When the page first loads, the first text field should have 
the focus state by default to prompt the use*/
    //name should start wit
    nameInput.focus();
}
function jobHandler(){
    //hide the other job input text by default  
   otherJob.hidden=true;
   jobTitle.addEventListener('change',(e)=>{
    //collect the target value
    let titleValue=e.target.value;
    console.log(titleValue);
    if (titleValue==='other'){
        otherJob.hidden=false;


    }else{
        otherJob.hidden=true;
      



    }
  
    
    
   });
}

   

function handleColor(){
    colorSelect.disabled=true;
    
     design.addEventListener('change',(e)=>{
            let designValue=e.target.value;
            console.log(designValue);
            //js puns or heart js
            if (designValue){
                colorSelect.disabled=false;

            }else{
                colorSelect.disabled=true;
            }
            
        
     });


}  




   
     

    




   
    


 

focusName();
jobHandler();
handleColor();