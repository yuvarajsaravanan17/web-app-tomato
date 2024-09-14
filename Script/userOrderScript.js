document.addEventListener('DOMContentLoaded', function () {
    const parameters = (new URL(window.location)).searchParams;
    const userId = parameters.get('id').split("/")[0];
    const noDataFound=document.querySelector("#noDataFound");

getOrderData();

async function getOrderData() {
    const serverUrl = "http://localhost:8080/Tomato/webapi/myresource/getOrderData";
    try {
        const cartResponse = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userId
        });
        const jsonData = await cartResponse.json();
        console.log(jsonData);
      
        orderDataFunction(jsonData);
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}
 function orderDataFunction(jsonData)
{   
    const orderOuterBox=document.querySelector("#orderOuterBox");
    let boxCount=1;
    if(jsonData.length==0)
        {
            orderOuterBox.innerHTML=""

        }
    
    let orderString="";
         jsonData.forEach(order=>{
            let boxString="";
            const orderId=order.orderId;
            const orderValue=order.foodItems[0].orderAmount;
            boxString+=`<div class="orderHeadDiv">
            <span class="orderId">ORDER ID : ${orderId}</span>
            <span class="orderValue">ORDER AMOUNT :${orderValue}</span>
            <span class"orderTime">ORDERED DATE TIME :${order.orderDateTime}</span>
            </div>
            <div class="orderInnerBox box box${boxCount}" >
            </div>`
            orderOuterBox.innerHTML+=boxString;
            noDataFound.innerHTML=""
            let orderItems=order.foodItems;
            let orderBoxItemCount=1;
            let innerBox=document.querySelector(`.box${boxCount}`);
            let boxInnerString="";
            orderItems.forEach(orderItem=>{
                let boxInnerString="";
                console.log("boxCount",boxCount)
                boxInnerString+=`<div class="orderItemBox ${orderBoxItemCount++}">
                <div class="itemImage"><img src="data:image/jpeg;base64,${orderItem.foodImage}"></div>
                <div class="itemContent">
                        <div>
                        <span class="shopName">${orderItem.shopName}</span>
                        <div>
                        <span class="foodName"><i class="fa-solid fa-bowl-food icon"></i>${orderItem.foodName}</span>
                        <span class="foodQuantity"><i class="fa-solid fa-clipboard-list icon"></i>${orderItem.foodQuantity}</span>
                        <span class="foodPrice"><i class="fa-solid fa-indian-rupee-sign icon"></i>${orderItem.foodPrice}</span>
                    </div>
                </div>`;
                innerBox.innerHTML+=boxInnerString;
                
                
                
            })
            boxCount++;
          
         
         })
}


let timeNow = new Date();
let hours = timeNow.getHours();
let minutes=timeNow.getMinutes();
let ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12; 
const changeTimeBtn=document.getElementById("timeLogo");
let current=Number(hours);

setTimeout(()=>{
    deleteOrderByUserId(userId)
},10*60*1000);



changeTimeBtn.addEventListener('click',function()
{
const changeElementParent=document.querySelector("#timeDiv");
changeElementParent.classList.remove('hidden')
const changeTimeOk=document.querySelector("#timeChange");
changeTimeOk.addEventListener('click',function(){
    const parent=changeTimeOk.parentElement;
    const changeTimeHours=document.querySelector("#changeTimeValue").value.split(":")[0];
    const changeTimeMinutes=document.querySelector("#changeTimeValue").value.split(":")[1];
    const changeAmPm=document.querySelector("#amPm").value;
    if(changeTimeHours>hours || changeTimeMinutes>minutes+10 || ampm !=changeAmPm)
    deleteOrderByUserId(userId);
    console.log(changeTimeHours,changeAmPm);
    changeElementParent.classList.add('hidden')
    
})
})

async function deleteOrderByUserId(userId) {
     
    const sendObj = { userId };
    const serverUrlLink = "http://localhost:8080/Tomato/webapi/myresource/deleteOrder";
    try {
        const response = await fetch(serverUrlLink, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendObj)
        });
        const data = await response.json();
        if (data.message !== "failure") {
            noDataFound.innerHTML="<h2>No Orders Found!!!!</h2>"
            getOrderData();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Problem with the Deleting Order!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        console.error('Error deleting Order:', error);
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
        });
    }
}





})



