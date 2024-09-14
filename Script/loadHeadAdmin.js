document.addEventListener('DOMContentLoaded',function(){
      
    const parameters=(new URL(window.location).searchParams);
    const id=parameters.get('id')
    async function fetchHead()
    {
        const head=await  fetch('homeHead.html');
        const headData=await head.text();
        document.querySelector(".header").innerHTML=headData;
        const addShopLinks=document.getElementsByClassName("addShop")
        
       for(const addShopLink of addShopLinks)
        {
            addShopLink.addEventListener('click',function()
            {
                window.location.href=`addShop.html?id=${id}`;
            })
        }
       
       
      
       const displayShopLinks=document.getElementsByClassName("displayShop")
   
       for(const displayShopLink of displayShopLinks)
        {
            displayShopLink.addEventListener('click',function()
            {
                window.location.href=`displayShop.html?id=${id}`;
            })
        }
    

      const orderLinks=document.getElementsByClassName("viewOrder")
      for(const orderLink of orderLinks)
        {
            orderLink.addEventListener('click',function()
                    {
                        window.location.href=`orderAdmin.html?id=${id}`;
                    })
        }
     
      const logOutLinks=document.getElementsByClassName("logOut")
      for(const logOutLink of logOutLinks)
        {  logOutLink.addEventListener('click',function()
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
           
        }
    
     const homePageLinks=document.getElementsByClassName("homeLink");
     for(const homePageLink of homePageLinks)
        {
            
                homePageLink.addEventListener('click',function()
                {
                    window.location.href=`adminHome.html?id=${id}`;
                })

        }
    
    const profileLinks=document.querySelectorAll(".Profile");
   for(const profileLink of profileLinks)
    {
        profileLink.addEventListener('mouseover',function()
        {
            const profileName=document.querySelector("#userName");
            
            profileName.innerHTML=`<span id="name">${id}</span>`;
        })
        profileLink.addEventListener('mouseout',function()
        {
            const prfileName=document.querySelector("#userName");
            
            prfileName.innerText="";
        })

    }
    

    const sideBarImage=document.querySelector("#sideMenuImage");
    console.log(sideBarImage)
    const sideBar=document.querySelector(".sideBarContent")
    sideBarImage.addEventListener('click',function()
{    console.log("clicked")
    console.log(sideBar)
      sideBar.classList.remove("moveLeft");
})
   const sideBarClose=document.querySelector(".closeIcon");
   sideBarClose.addEventListener('click',function()
{
    sideBar.classList.add("moveLeft");

})
  
           
   
    }
    fetchHead()

    





   

}
)
