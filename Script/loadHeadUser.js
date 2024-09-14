document.addEventListener('DOMContentLoaded',function(){
      
    const parameters=(new URL(window.location).searchParams);
    const id=parameters.get('id').split("/")[0];
    const userName=parameters.get('id').split("/")[1].toUpperCase();
 
    async function fetchHead()
    {
        const head=await  fetch('userNav.html');
        const headData=await head.text();
        document.querySelector(".header").innerHTML=headData;
        document.dispatchEvent(new Event('navLoaded'));
      
        
       const cartLink=document.getElementById("cart")
   
       cartLink.addEventListener('click',function()
      {
          window.location.href=`userCart.html?id=${id}/${userName}`;
      })

      const orderLink=document.getElementById("order")
   
      orderLink.addEventListener('click',function()
     {
         window.location.href=`userOrder.html?id=${id}/${userName}`;
     })



      const logOutLink=document.getElementById("logOut")
      
      logOutLink.addEventListener('click',function()
     {
        Swal.fire({
            icon: 'success',
            title: 'Logout Successful',
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(()=>
        {   window.location.href="index.html";
        
        },1000)
        
     })
     const homePageLink=document.getElementById("homeLink");
     console.log(homePageLink)
    
     homePageLink.addEventListener('click',function()
    {
        window.location.href=`userHome.html?id=${id}/${userName}`;
    })
    const profileLink=document.querySelector(".user");
 
    profileLink.addEventListener('mouseover',function()
{
    const profileName=document.querySelector("#userName");
    
    profileName.innerHTML=`<span id="name">${userName}</span>`;
})

profileLink.addEventListener('mouseout',function()
{
    const prfileName=document.querySelector("#userName");
    
    prfileName.innerText="";
})
    
           
   
    }
    fetchHead();
    
 
}
)