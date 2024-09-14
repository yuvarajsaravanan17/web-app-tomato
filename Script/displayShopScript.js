document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector(".container");

  async function displayData(timesOfTable) {
      const response = await fetch("http://localhost:8080/Tomato/webapi/myresource/getShopData", {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      const jsonData = await response.json();
      console.log(jsonData);
      container.innerHTML = "";

      jsonData.forEach(data => {
          const shop = data.shop[0];
          const breakFast = data.breakFasts;
          const lunch = data.lunches;
          const dinner = data.dinners;

          container.innerHTML += `
              <div class="shop">
                  <div class="shopImages">
                      <div class="shopImageDiv">
                          <img src="data:image/jpeg;base64,${shop.shopImage}" class="shopImage">
                      </div>
                      <div class="foodImages">
                          <div class="foodImageDiv"><img src="data:image/jpeg;base64,${dinner[0].foodImage}" class="foodImage"></div>
                          <div class="foodImageDiv"><img src="data:image/jpeg;base64,${lunch[0].foodImage}" class="foodImage"></div>
                      </div>
                  </div>
                  <div class="shopData">
                      <div id="shopName">${shop.shopName}</div>
                      <div class="shopDescription">
                          <div id="shopCuisine">${shop.shopCuisine}</div>
                          <div id="shopLocation">${shop.shopLocation}</div>
                          <div id="shopTimings">${shop.shopOpeningTime}<span id="timing-hypen">-</span>${shop.shopClosingTime}</div>
                      </div>
                  </div>
                  <div class="foodData">
                      <table id="tableData" class="display responsive nowrap" shop-id="${shop.shopId}" >
                          <thead>
                              <tr>
                                  <th>Category</th>
                                  <th>FoodName</th>
                                  <th>FoodImage</th>
                                  <th>FoodQuantity</th>
                                  <th>FoodPrice</th>
                                  <th>Delete</th>
                              </tr>
                          </thead>
                          <tbody class="tableBody" shop-id="${shop.shopId}">
                              <!-- Table rows will be inserted here -->
                          </tbody>
                      </table>
                  </div>
              </div>`;

          const tableBody = document.querySelector(`tbody[shop-id="${shop.shopId}"]`);
          let bodyData = ``;

          if (breakFast.length > 0) {
              breakFast.forEach(element => {
                  bodyData += `<tr data-id="${element.foodId}" food-category="${element.foodCategory}" food-time="breakFast">
                      <td>BreakFast</td>
                      <td>${element.foodName}</td>
                      <td><img src="data:image/jpeg;base64,${element.foodImage}" id="tableImage"></td>
                      <td>${element.foodQuantity}</td>
                      <td>${element.foodPrice}</td>
                      <td id="deleteBtn"><i class="fa fa-trash" aria-hidden="true"></i></td>
                  </tr>`;
              });
          }

          lunch.forEach(element => {
              bodyData += `<tr data-id="${element.foodId}" food-category="${element.foodCategory}" food-time="lunch">
                  <td>Lunch</td>
                  <td>${element.foodName}</td>
                  <td><img src="data:image/jpeg;base64,${element.foodImage}" id="tableImage"></td>
                  <td>${element.foodQuantity}</td>
                  <td>${element.foodPrice}</td>
                  <td id="deleteBtn"><i class="fa fa-trash" aria-hidden="true"></i></td>
              </tr>`;
          });

          dinner.forEach(element => {
              bodyData += `<tr data-id="${element.foodId}" food-category="${element.foodCategory}" food-time="dinner">
                  <td>Dinner</td>
                  <td>${element.foodName}</td>
                  <td><img src="data:image/jpeg;base64,${element.foodImage}" id="tableImage"></td>
                  <td>${element.foodQuantity}</td>
                  <td>${element.foodPrice}</td>
                  <td id="deleteBtn"><i class="fa fa-trash" aria-hidden="true"></i></td>
              </tr>`;
          });

          tableBody.innerHTML = bodyData;

          tableShow(shop);
          deleteBtnAction();
      });
  }

  displayData(1);

  function tableShow(shop) {
      $(`table[shop-id="${shop.shopId}"]`).DataTable({
          paging: false,
          responsive: true,
          searching: false,
          ordering: true,
          info: true,
          lengthMenu: [5, 10, 25, 50],
          pageLength: 10,
          language: {
              search: "Filter records:",
              lengthMenu: "Display _MENU_ records per page",
              info: "Showing _START_ to _END_ of _TOTAL_ entries",
          },
          columnDefs :[
            { responsivePriority: 1, targets: [0, 1, 3, 4] },
            { responsivePriority: 2, targets: -1 }
        ],
          columnDefs: [
              { orderable: false, targets: [2, 5] },
          ],
      });
  }

  async function deleteItem(foodId, foodCategory, foodTime) {
      console.log("deleteActivate")
      const obj = { foodId, foodCategory, foodTime };
      console.log(obj);
      const serverUrl = "http://localhost:8080/Tomato/webapi/myresource/deleteFoodItem";
      try {
          const response = await fetch(serverUrl, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(obj)
          });
          const data = await response.json();
          console.log(data);
          await displayData(2);

          if (data.message === 'success') {
              Swal.fire({
                  icon: 'success',
                  title: 'Food item deleted!',
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

  function deleteBtnAction() {
      const deleteButtons = document.querySelectorAll('#deleteBtn');
      console.log("DeleteBTns Called!")
      console.log(deleteButtons)
      deleteButtons.forEach(deleteBtn => {
          deleteBtn.addEventListener('click', function() {
              const parent = deleteBtn.closest('tr');
              deleteItem(parent.getAttribute('data-id'), parent.getAttribute('food-category'), parent.getAttribute('food-time'));
          });
      });
  }
});
