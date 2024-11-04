let nameEl = document.getElementById("name");
let emailEl = document.getElementById("email");

let nameErr = document.getElementById("nameErr");
let emailErr = document.getElementById("emailErr");

let formEl = document.getElementById("myForm");

formEl.addEventListener("submit",function(event){
    event.preventDefault();
    submitFormData(formData);
    validationFormData();
});

//form data//
let formData = {
    name:"",
    email:"",
    status:"Active",
    gender:"Male"
}
//Working status//
let statusEl = document.getElementById("status");

statusEl.addEventListener("change",function(event){
    formData.status = event.target.value; 
    console.log(formData)
})

//Gender Male//
let genderMale = document.getElementById("genderMale");
genderMale.addEventListener("change",function(event){
    formData.gender = event.target.value;
})

//Gender Female//
let genderFemale = document.getElementById("genderFemale");
genderFemale.addEventListener("change",function(event){
    formData.gender = event.target.value;
})

//name Element//
nameEl.addEventListener("change",function(event){
    if(event.target.value == ""){
        nameErr.innerText = "*Required"
    }else{
        nameErr.innerText = ""
    }
    formData.name = event.target.value
})

//email Element//
emailEl.addEventListener("change",function(event){
    if(event.target.value == ""){
        emailErr.innerText = "*Required"
    }else{
        emailErr.innerText = ""
    }
    formData.email = event.target.value
})

//validate Form Data//

function validationFormData(){
    let userNameVal = nameEl.value;
    let emailElVal = emailEl.value;
    if(userNameVal === ""){
        nameErr.textContent="*Required";
    }
    if(emailElVal === ""){
        emailErr.textContent="*Required";
    }
}
function submitFormData(formData){
    let options = {
        method:"POST",
        headers:{
            'Content-Type':"application/json",
            Accept:"application/json",
            Authorization:"Bearer cf18adcbe6af88274f2df7f3c1483d79bf18d34a0ef496bdbe7c667f8fd74bf0"
        },
        body:JSON.stringify(formData)
    }
    let url = "https://gorest.co.in/public-api/users";
    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        console.log(jsonData); 
        if(jsonData.code === 422){
            if(jsonData.data[0].message === "has already been taken"){
                emailErr.textContent = "Email already exists";
            }
        }
    })
}
