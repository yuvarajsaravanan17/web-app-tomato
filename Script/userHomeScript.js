document.addEventListener('DOMContentLoaded',function()
{
    const parameters=(new URL(window.location).searchParams);
    const userId=parameters.get('id').split("/")[0];
    let timeNow = new Date();
    let hours = timeNow.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const changeTimeBtn=document.getElementById("timeLogo");
    let current=Number(hours);
    
    changeTimeFood(current,ampm);
    const search=document.querySelector("#search");

    
    changeTimeBtn.addEventListener('click',function()
{
    const changeElementParent=document.querySelector("#timeDiv");
    changeElementParent.classList.remove('hidden')
    const changeTimeOk=document.querySelector("#timeChange");
    changeTimeOk.addEventListener('click',function(){
        const parent=changeTimeOk.parentElement;
        const changeTime=document.querySelector("#changeTimeValue").value.split(":")[0];
        const changeAmPm=document.querySelector("#amPm").value;
        changeTimeFood(changeTime,changeAmPm);
        console.log(changeTime,changeAmPm);
        changeElementParent.classList.add('hidden')
        
    })
})
function changeTimeFood(current,ampm)
{
    console.log("cureet",current,ampm)
    if(current>=6 && current <12 && ampm=="AM" )
        {
            console.log("morning");
            callFoodData("breakFast");
        }
    else if((current>=12 && current <13 && ampm=='PM' )|| current<=6 && ampm=='PM')
            {
                console.log("afternoon");
                callFoodData("lunch");
            }
            
    else if(current>=6 && current<12 && ampm=='PM')
                    {
                        console.log("night");
                        callFoodData("dinner");
                    }
                    console.log("called")

}





async function callFoodData( timeNotation)
 {
    const params = {
        param1: timeNotation,
        userId
       
    };
    console.log(params)
    
   
    const queryString = new URLSearchParams(params).toString();
    const baseUrl="http://localhost:8080/Tomato/webapi/myresource/getFoodUserData";
    
    const fullUrl = `${baseUrl}?${queryString}`;
    

                    const response= await fetch(fullUrl,{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
    
            const jsonData=await response.json();
            console.log(jsonData);
            const container=document.querySelector(".container");
            let shopData=``;
            jsonData.shop.forEach(shopElement=>
                {
                 shopData+=`<div class="shopImageAlign">
                 <div class="shopImage">
                 <img src="data:image/jpeg;base64,${shopElement.shopImage}" title="Location : ${shopElement.shopLocation}\nOpening : ${shopElement.shopOpeningTime}\nClosing   : ${shopElement.shopClosingTime}">
                 
                 </div><span class="shopName">${shopElement.shopName}</span>
                 </div>`
                }
            )
            let foodData=``;
            jsonData.allFood.forEach(data=>{
                foodData+=`<div class="outerFoodDiv" >
                <div class="food">
                <img src="data:image/jpeg;base64,${data.foodImage}" title="${data.foodCategory}">
                <div class="foodData" foodId="${data.foodId}" shopId=${data.shopId}>
                <div class="shopNameInFood">${data.shopName}</div>
                <div class="foodNamePriceDiv">
                <span class="foodName">${data.foodName}</span>
                 <span class="foodPrice"><i class="fa-solid fa-indian-rupee-sign"></i>${data.foodPrice} for one</span>
                 </div>
                 <div id="cartIconDiv"><i class="fa-solid fa-cart-plus cartIcon"></i></div> 

                </div>
                </div>
                </div>`

            })
            let innerContent=`<h2 class="allShopHeader">Your Preferred Near Shops</h2>
            `;
            container.innerHTML=innerContent;
            const outerShopDiv=document.querySelector(".outerShopDiv");
            const foodDatasDiv=document.querySelector(".foodDatasOuterDiv");
            outerShopDiv.innerHTML=shopData;
            foodDatasDiv.innerHTML=foodData;
            addCartIconAction();


                
        
        }
        function  addCartIconAction(){
            const cartBtns=document.querySelectorAll(".cartIcon");
            cartBtns.forEach(cartBtn=>{
                cartBtn.addEventListener('click',function()
            { const grandParent=cartBtn.parentElement.parentElement.parentElement;
                const parent=cartBtn.parentElement.parentElement;
                const foodId=parent.getAttribute("foodId");
                const shopId=parent.getAttribute("shopId");
                 
                const image=grandParent.children[0].getAttribute("src").split(",")[1];
                const shopName=parent.children[0].innerText;
                const foodName=parent.children[1].children[0].innerText;
                const foodQuantity="1";
                const foodPrice=parent.children[1].children[1].innerText.split(" ")[0];
                
                const cartObj={
                    userId,foodData:`${shopId},${shopName},${foodId},${foodName},${foodPrice},${foodQuantity}`
                }
                console.log(cartObj)
              
              
                const serverUrl="http://localhost:8080/Tomato/webapi/myresource/addToCart";
                fetch(serverUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cartObj)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if(data.message=='success')
                        {
                        Swal.fire({
                        icon: 'success',
                        title: 'Food Added',
                        showConfirmButton: false,
                        timer: 1500
                    });  
                }
                    if(data.message=='failure')
                        {
                        Swal.fire({
                        icon: 'error',
                        title: 'Food Already Exists!!!',
                        showConfirmButton: false,
                        timer: 1500
                    });  
                } 
                })
                .catch((error) => {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Food Not Added!!!Something Wrong!!!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
                




   
    
   



            })
            })
        }

        document.addEventListener('navLoaded', attachNavEventListeners);
        function attachNavEventListeners()
        {
          
        const searchElement = document.querySelector("#search");
        searchElement.addEventListener('input', function(event) {
            const searchValue = event.target.value.toLowerCase();
            const foodItems = document.querySelectorAll('.outerFoodDiv');
            foodItems.forEach(item => {
                const foodName = item.querySelector('.foodName').innerText.toLowerCase();
                if (foodName.includes(searchValue)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
           
        }
    
    

})