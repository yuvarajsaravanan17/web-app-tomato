document.addEventListener('DOMContentLoaded',function()
{
     const adminBtn=document.querySelector(".admin");
     const userBtn=document.querySelector(".user");
     const adminForm=document.querySelector('.admin-login');
     const userForm=document.querySelector('.user-login');
     const passWordEye=document.querySelectorAll('.eye');
     const userPassWord=document.querySelector('#userPassword');
     
     const adminPassWord=document.querySelector('#adminPassword');
    passWordEye.forEach(eye=>{
        eye.addEventListener('mousedown',function(){
            const type =  userPassWord.getAttribute('type') === 'password' ? 'text' : 'password';
            userPassWord.setAttribute('type', type);
            const adminType =  adminPassWord.getAttribute('type') === 'password' ? 'text' : 'password';
            adminPassWord.setAttribute('type', adminType);
            
            
         })
         eye.addEventListener('mouseup',function(){
            const type =  userPassWord.getAttribute('type') === 'password' ? 'text' : 'password';
            userPassWord.setAttribute('type', type);
            const adminType =  adminPassWord.getAttribute('type') === 'password' ? 'text' : 'password';
            adminPassWord.setAttribute('type', adminType);
            
         })

    })
    
     

     adminBtn.addEventListener('click',function()
    {
        adminBtn.classList.add('selected');
        userBtn.classList.remove('selected');
        userForm.classList.add('move');
        adminForm.classList.remove('move');

    })
    userBtn.addEventListener('click',function()
    {
        adminBtn.classList.remove('selected');
        userBtn.classList.add('selected');
        userForm.classList.remove('move');
        adminForm.classList.add('move');
        
    })

   const registerBtn=document.querySelector(".registerBtn");
   registerBtn.addEventListener('click',function()
{
    window.location.href='userLogin.html';
})


    const adminDataBtn=document.querySelector(".adminLoginBtn");
    
    adminDataBtn.addEventListener('click',function()
{
    
    const adminIdElement=document.querySelector("#adminId");
    const adminPasswordElement=document.querySelector("#adminPassword");
    const resultCheck=requiredCheck([adminIdElement,adminPasswordElement]);
    const adminId=document.querySelector("#adminId").value;
    const adminPassword=document.querySelector("#adminPassword").value;
    const allDatas=[adminIdElement,adminPasswordElement]
    const body=document.querySelector("body");
    body.addEventListener('mousedown',function()
    {
         errorMessageRemove(allDatas);
    })
    console.log("Amin",resultCheck)
    if(resultCheck)
        {    
            const adminDataObj={
                adminId,adminPassword
            }
        
        
        $.ajax({
            url: "http://localhost:8080/Tomato/webapi/myresource/checkAdmin",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(adminDataObj),
            success: function(data) {
               
                //form.reset();
                
                if(data.message=="success"){
                            Swal.fire({
                                icon: 'success',
                                title: 'Login Successful',
                                // text: 'You have successfully Registered!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setTimeout(() => {
                                window.location.href=`adminHome.html?id=${adminId}`;
                                
                            }, 1000);
                       
            }
            else
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: "Wrong Credentials!!!",
                        showConfirmButton: false,
                        timer:1500
                    });
                    
            }
            },
            error: function(xhr, status, error) {
                console.log(error);}   
        })

        }
    
})
const userDataBtn=document.querySelector(".userLoginBtn");
    
userDataBtn.addEventListener('click',function()
{
    const userEmailElement=document.querySelector("#userEmail");
    const userPasswordElement=document.querySelector("#userPassword");
const userEmail=document.querySelector("#userEmail").value;
const userPassword=document.querySelector("#userPassword").value;
const allDatas=[userEmailElement,userPasswordElement];
const resultCheck=requiredCheck(allDatas);
const body=document.querySelector("body");
body.addEventListener('mousedown',function()
{
     errorMessageRemove(allDatas);
})

if(resultCheck && emailCheck(userEmailElement))
    {
        const userDataObj={
            userEmail,userPassword
        }
        console.log(userDataObj)
        
        $.ajax({
        url: "http://localhost:8080/Tomato/webapi/myresource/checkUser",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(userDataObj),
        success: function(data) {
            console.log(data)
            //form.reset();
            
            if(data.userId!="notFound"){
                        Swal.fire({
                            icon: 'success',
                            title: 'Login Successful',
                            // text: 'You have successfully Registered!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            window.location.href=`userHome.html?id=${data.userId}`;
                            
                        }, 1000);
                   
        }
        else
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: "Wrong Credentials!!!",
                    showConfirmButton: false,
                    timer:1500
                });
                
        }
        },
        error: function(xhr, status, error) {
            console.log(error);}   
        })
    }

})



function errorMessageRemove(datas)
{
    let errorElementCount=1;
   datas.forEach(data=>{
       let parent=data.parentElement;
       if(errorElementCount!=2)
        {
            parent.children[2].classList.remove("error");
       let errorElement=parent.children[2];
       errorElement.innerText="Error";
       errorElement.classList.add("hideError");
       errorElementCount++;
        }
        else{

            parent.children[3].classList.remove("error");
            let errorElement=parent.children[3];
            errorElement.innerText="Error";
            errorElement.classList.add("hideError");
            errorElementCount++;
        }
     


   })

}
 
function requiredCheck(datas)
{
    console.log(datas)
    var check=1;
    var checkValue=true;
    datas.forEach(data=>{
        if(data.value.trim()==="")
            {
                errorMessage(data,"This Field Is Required!!!",check);
                checkValue=false;
               
            }
            check++;
    })
    return checkValue;

}
function errorMessage(input,message,checkElement)
{
    console.log(input)
    var parent=input.parentElement;
    var errorElement;
    console.log(parent)
    if(checkElement==2)
        {parent.children[3].classList.add("error");
             errorElement=parent.children[3];
             errorElement.classList.remove("hideError");

        }
        else
        {
            parent.children[2].classList.add("error");
             errorElement=parent.children[2];
             errorElement.classList.remove("hideError");
        }
   
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
console.log("emailValid")
console.log(check)
return check;
}
    




})