document.addEventListener('DOMContentLoaded', function () {
    const parameters = (new URL(window.location)).searchParams;
    const userId = parameters.get('id').split("/")[0];
    const tableBody = document.querySelector("#table tbody");
    const total = document.querySelector("#totalValue");
    let cartTableRowCount=0;
    tableBody.innerHTML = "<tr><td colspan='6'>No Cart Data Found!!!</td></tr>";


    total.innerText = '0';

    getCartData();

    async function getCartData() {
        const serverUrl = "http://localhost:8080/Tomato/webapi/myresource/getCartData";
        try {
            const cartResponse = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: userId
            });
            const jsonData = await cartResponse.json();
            console.log(jsonData)
            renderTableData(jsonData);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    }

    function renderTableData(data) {
        let tableData = ``;
      
        data.forEach(item => {
            cartTableRowCount++;
           
            tableData += `
                <tr foodId="${item.foodId}" coupon-found="${item.couponFound}">
                    <td><img src="data:image/jpeg;base64,${item.foodImage}" id="tableImage"></td>
                    <td>${item.foodName}</td>
                    <td>${item.shopName}</td>
                    <td>${item.foodPrice}</td>
                    <td>
                        <i class="fa-solid fa-minus minus"></i>
                        <span>${item.foodQuantity}</span>
                        <i class="fa-solid fa-plus plus"></i>
                    </td>
                    <td><i class="fa-solid fa-trash delete"></i></td>
                </tr>`;
        });
        tableBody.innerHTML = tableData;
        addAction();
        totalValue(1);
        console.log("data",data);
        if(data.length==0)
            {
                tableBody.innerHTML = "<tr><td colspan='6'>No Cart Data Found!!!</td></tr>";
                total.innerText=0;

            }
    }

    function addAction() {
        const plusButtons = document.querySelectorAll('.plus');
        const minusButtons = document.querySelectorAll('.minus');
        const deleteButtons = document.querySelectorAll('.delete');

        plusButtons.forEach(plusBtn => {
            plusBtn.addEventListener('click', function () {
                const parent = plusBtn.closest('tr');
                const changeValue = parent.querySelector('td:nth-child(5) span');
                let value = Number(changeValue.innerText);
                value++;
                changeValue.innerText = value;
                changeQuantity(parent.getAttribute('foodId'), value.toString());
            });
        });

        minusButtons.forEach(minusBtn => {
            minusBtn.addEventListener('click', function () {
                const parent = minusBtn.closest('tr');
                const changeValue = parent.querySelector('td:nth-child(5) span');
                let value = Number(changeValue.innerText);
                value--;
                if (value <= 0) value = 1;
                changeValue.innerText = value;
                changeQuantity(parent.getAttribute('foodId'), value.toString());
            });
        });

        deleteButtons.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', function () {
                const parent = deleteBtn.closest('tr');
                deleteItem(parent.getAttribute('foodId'));
            });
        });
    }

    async function changeQuantity(foodId, quantity) {
        const obj = { userId, foodId, quantity };
        const serverUrl = "http://localhost:8080/Tomato/webapi/myresource/updateCart";
        try {
            await fetch(serverUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            // await getCartData();
            totalValue(2);
        } catch (error) {
            console.error('Error updating cart:', error);
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    async function deleteItem(foodId) {
        const obj = { userId, foodId };
        const serverUrl = "http://localhost:8080/Tomato/webapi/myresource/deleteCart";
        try {
            const response = await fetch(serverUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            const data = await response.json();
            await getCartData();
            totalValue(2);
            if (data.message === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Cart item deleted!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    function totalValue(toPayAction) {
        let totalValue = 0;
        
        const tableBodyRows = document.querySelectorAll('tbody tr');
       let cartRowCount=0;
        const orderData = [];
        var couponFound;

        tableBodyRows.forEach(row => {
             couponFound=row.getAttribute('coupon-found');
            const foodId = row.getAttribute('foodId');
            const foodName = row.children[1].innerText;
            const shopName = row.children[2].innerText;
            const price = Number(row.children[3].innerText);
            const quantity = Number(row.children[4].children[1].innerText);
            totalValue += price * quantity;
            orderData.push({ foodId, foodName, quantity: quantity.toString(), price: price.toString(), shopName });
        });

        const totalValueString = totalValue.toString();
        orderData.push({ orderValue: totalValueString });

        total.innerText = totalValue;
        console.log(orderData)
         
                payBtnAction(totalValue, userId, couponFound,orderData);

    
      
    }

    function payBtnAction(totalValue, userId,couponFound, orderData) {
        const payBtn = document.querySelector("#payBtn");
        payBtn.addEventListener('click', () => payBtnActionWithCoupon(totalValue, userId,couponFound, orderData));
    }

    async function payBtnActionWithCoupon(totalValue, userId,couponFound, orderData) {

      console.log("payButonAction Called")
        if ((couponFound!=="undefined")) {
            Swal.fire({
                title: 'Coupon Found!  18% Discount!!!',
                text: `You have a coupon  - ${couponFound}`,
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Use Coupon',
                cancelButtonText: 'Do Not Use Coupon'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let discountedTotal = totalValue * 0.82;
                    Swal.fire({
                        title: 'Order Placed!',
                        html: 'New Total After Discount: $' + discountedTotal.toFixed(2),
                        icon: 'success'
                    });
                    orderData[orderData.length - 1] = { orderValue: discountedTotal.toFixed(2).toString() };
                    await processOrder(userId, orderData);
                    await deleteCoupon(userId, couponFound);
                } else {
                    Swal.fire({
                        title: 'Order Placed!',
                        text: 'Total Amount: $' + totalValue.toFixed(2),
                        icon: 'success'
                    });
                    await processOrder(userId, orderData);
                }
            });
        } else {
            Swal.fire({
                title: 'Order Placed!',
                text: 'Total Amount: $' + totalValue.toFixed(2),
                icon: 'success'
            });

            await processOrder(userId, orderData);
           
        }
        if (totalValue >= 1000) {
            await deleteCartFully(userId, "yes");
        } else {
            await deleteCartFully(userId, "no");
        }
          
        
    }

    async function processOrder(userId, orderData) {

        console.log("process Order Called")
        let currentDateTime=new Date();
        const currentDate = currentDateTime.toISOString().split('T')[0];
        const currentTime = currentDateTime.toTimeString().split(' ')[0];
        currentDateTime=currentDate+","+currentTime
        const orderObj = { userId, orderData,currentDateTime };
        
        try {
            await fetch("http://localhost:8080/Tomato/webapi/myresource/addOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderObj)
            });
        } catch (error) {
            console.error('Error adding order data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to add order data!',
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }

    async function deleteCoupon(userId, couponId) {
        console.log("DeleteCoupon Called")
        const couponObj = { userId, couponId };
        try {
            await fetch("http://localhost:8080/Tomato/webapi/myresource/deleteCoupon", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(couponObj)
            });
        } catch (error) {
            console.error('Error deleting coupon:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to delete coupon!',
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }

    async function deleteCartFully(userId, coupon) {
        console.log("DeleteCartFully Called")
        const sendObj = { userId, coupon };
        const serverUrlLink = "http://localhost:8080/Tomato/webapi/myresource/deleteCartFully";
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
                tableBody.innerHTML = "<tr><td colspan='6'>No Cart Data Found!!!</td></tr>";
                const total = document.querySelector("#totalValue");
                total.innerHTML="0";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Problem with the order!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error deleting cart:', error);
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    $('#tableData').DataTable({
        paging: false,
        searching: false,
        ordering: true,
        info: true,
        lengthMenu: [5, 10, 25, 50],
        pageLength: 10,
        language: {
            search: "Filter records:",
            lengthMenu: "Display _MENU_ records per page",
            info: "Showing _START_ to _END_ of _TOTAL_ entries"
        },
        columnDefs: [
            { orderable: false, targets: [2, 5, 6] },
        ],
    });
});
