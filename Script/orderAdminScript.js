document.addEventListener('DOMContentLoaded', function () {
    const parameters = (new URL(window.location)).searchParams;
    const adminId = parameters.get('id').split("/")[0];
   

    const dataNotFound=document.querySelector("#orderOuterBox");
    dataNotFound.innerHTML=`<h2>Order Data Not Found!!!</h2>`;
getOrderData();

async function getOrderData() {
    const serverUrl = "http://localhost:8080/Tomato/webapi/myresource/getOrderAllData";
    try {
        const cartResponse = await fetch(serverUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
          
        });
        const jsonData = await cartResponse.json();
        console.log(jsonData);
      
        orderDataFunction(jsonData);
    } catch (error) {
        console.error('Error fetching cart data:', error);
    }
}
 function orderDataFunction(jsonData)
{    const dataNotFound=document.querySelector("#orderOuterBox");
    dataNotFound.innerHTML=``;
    const orderOuterBox=document.querySelector("#orderOuterBox");
    let boxCount=1;
    let orderString="";
    if(jsonData.length==0)
        {
            const dataNotFound=document.querySelector("#orderOuterBox");
            dataNotFound.innerHTML=`<h2>Order Data Not Found!!!</h2>`;
        }
         jsonData.forEach(order=>{
            console.log(jsonData)
            
           
            let boxString="";
            const orderId=order.orderId;
            const orderValue=order.foodItems[0].orderAmount;
            const userId=order.foodItems[0].userId;
            boxString+=`<div class="orderHeadDiv">
             <span class="orderValue">USER ID :${userId}</span>
            <span class="orderId">ORDER ID : ${orderId}</span>
            <span class="orderValue">ORDER AMOUNT :${orderValue}</span>
             <span class="orderValue">ORDER DATE/TIME :${order.orderDateTime}</span>
            </div>
            <div class="orderInnerBox box box${boxCount}" >
            </div>`
            orderOuterBox.innerHTML+=boxString;
          
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
                console.log(orderItem)
                
                
            })
            boxCount++;
          
         
         })
}








})





// function renderTableData(data) {
//     let tableData = ``;
//     data.forEach(item => {
//         cartTableRowCount++;
       
//         tableData += `
//             <tr foodId="${item.foodId}" coupon-found="${item.couponFound}">
//                 <td><img src="data:image/jpeg;base64,${item.foodImage}" id="tableImage"></td>
//                 <td>${item.foodName}</td>
//                 <td>${item.shopName}</td>
//                 <td>${item.foodPrice}</td>
//                 <td>
//                     <i class="fa-solid fa-minus minus"></i>
//                     <span>${item.foodQuantity}</span>
//                     <i class="fa-solid fa-plus plus"></i>
//                 </td>
//                 <td><i class="fa-solid fa-trash delete"></i></td>
//             </tr>`;
//     });
//     tableBody.innerHTML = tableData;
//     addAction();
//     totalValue();
// }