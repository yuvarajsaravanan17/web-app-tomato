document.addEventListener('DOMContentLoaded',function(){
      
    
 console.log("footeCalleds")
    async function fetchFoot()
    {
        const head=await  fetch('footer.html');
        const headData=await head.text();
        document.querySelector("#footerDiv").innerHTML=headData;

    }
    fetchFoot();
})