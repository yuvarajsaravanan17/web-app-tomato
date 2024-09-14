document.addEventListener('DOMContentLoaded',function()
{
   

    const formData=document.querySelector("#form-data");
    
  
 function errorMessageRemove(datas)
 {
    datas.forEach(data=>{
        let parent=data.parentElement;
        parent.classList.remove("error");
        let errorElement=parent.querySelector("div");
        errorElement.innerText="Error";
        errorElement.classList.add("hiddenLogin");

    })

 }
  
 function requiredCheck(datas)
 {
     datas.forEach(data=>{
         if(data.value.trim()==="")
             {
                 errorMessage(data,"This Field Is Required!!!")
             }
     })

 }
 function errorMessage(input,message)
 {
     let parent=input.parentElement;
     parent.classList.add("error");
     let errorElement=parent.querySelector("div");
     errorElement.classList.remove("hiddenLogin");
     errorElement.innerText=message;
 }
 function nameCheck(input) {

    let check= /^[a-zA-Z]+$/.test(input.value.trim());
    if(!check)
        errorMessage(input,"Name must Be Alpha!")
    return check;
}

function emailCheck(email) {
    const check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    if(!check)
    errorMessage(email,"Email is not valid!")
return check;
}

function phoneCheck(phone) {
    const check = /^\d{10}$/.test(phone.value);  
    if(!check)
        errorMessage(phone,'Phone number must be 10 digit!')
    return check;
}


function passwordCheck(password) {

    const check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.value.trim());;
    if(!check)
        errorMessage(password,'password is not valid ("Ab1*">8 Characters');
    return check;
}

    formData.addEventListener('submit',function(e)
{
    e.preventDefault();
    const userNameElement=document.querySelector("#userName");
    console.log(userNameElement)
    const userEmailElement=document.querySelector("#userEmail");
    const userPhoneElement=document.querySelector("#userPhone");
    const userPreferElement=document.querySelector("#select-type");
    const userPasswordElement=document.querySelector("#userPassword");
    const userCityElement=document.querySelector("#userLocation");
    const userName=userNameElement.value.trim();
    const userEmail=userEmailElement.value.trim();
    const userPhone=userPhoneElement.value.trim();
    const userPrefer=userPreferElement.value.trim();
    const userPassword=userPasswordElement.value.trim();
    const userCity=userCityElement.value.trim();
    console.log(userName,userEmail,userPhone,userPrefer,userPassword)
    const allDatas=[userNameElement,userCityElement,userEmailElement,userCityElement,userPhoneElement,userPasswordElement];
    requiredCheck(allDatas);
    const body=document.querySelector("body");
    body.addEventListener('mousedown',function()
    {
         errorMessageRemove(allDatas);
    })
    allCheck=nameCheck(userNameElement) && nameCheck(userCityElement)&&phoneCheck(userPhoneElement) && passwordCheck(userPasswordElement) &&emailCheck(userEmailElement) ;
    console.log(allCheck)
    if(allCheck)
        
        {
    const obj={
       userName,userPhone,userEmail,userPrefer,userCity,userPassword
    }
    console.log(obj);
    $.ajax({
        url: "http://localhost:8080/Tomato/webapi/myresource/userData",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: function(data) {
            console.log(data)
            formData.reset();
            console.log(data.message)
            if(data.message=="Success"){
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'You have successfully Registered!',
                showConfirmButton: false,
                timer: 1500
            });
            window.location.href="index.html";
        }
        else
            {
                
        }
        },
        error: function(xhr, status, error) {
            console.error('Error', error);
            console.log(status)
            console.log(xhr)
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: "Something Wrong!!!",
                showConfirmButton:true,
                timer:1500
            });
        }
    
    })
            
    
    
    
     
}

})
})