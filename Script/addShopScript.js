document.addEventListener('DOMContentLoaded', function () {
    const breakFasts = document.querySelector(".breakFasts");
    const lunches = document.querySelector(".lunches");
    const dinners = document.querySelector(".dinners");
    const addBreakfastBtn = document.querySelector("#addMoreBreakfast");
    const addLunchBtn = document.querySelector("#addMoreLunch");
    const addDinnerBtn = document.querySelector("#addMoreDinner");

    let breakfastCount = 1;
    let lunchCount = 1;
    let dinnerCount = 1;

    
    addBreakfastBtn.addEventListener('click', () => {
        breakfastCount = addFoodItem(breakFasts, breakfastCount, 'breakfast');
    });

    addLunchBtn.addEventListener('click', () => {
        lunchCount = addFoodItem(lunches, lunchCount, 'lunch');
    });

    addDinnerBtn.addEventListener('click', () => {
        dinnerCount = addFoodItem(dinners, dinnerCount, 'dinner');
    });

    
    function addFoodItem(container, count, type) {
        count++;
        const newItem = document.createElement('div');
        newItem.classList.add(type);
        newItem.innerHTML = `
            <h3 id="itemTitle">Item-${count}</h3>
            <div class="input-groups">
                <label for="foodName">Enter The Food Item</label>
                <input type="text" id="foodName" value="">
                <span class="hidden error-message"></span>
            </div>
            <div class="input-groups">
                <label for="foodImage">Enter The Food Image</label>
                <input type="file" id="foodImage">
                <span class="hidden error-message"></span>
            </div>
            <div class="input-groups">
                <label for="foodQuantity">Enter The Food Quantity</label>
                <input type="text" id="foodQuantity" value="">
                <span class="hidden error-message"></span>
            </div>
            <div class="input-groups">
                <label for="foodPrice">Enter The Food Price</label>
                <input type="text" id="foodPrice" value="">
                <span class="hidden error-message"></span>
            </div>
            <div class="input-groups">
                <label for="foodCategory">Food Category</label>
                <select id="foodCategory">
                    <option selected>Choose</option>
                    <option value="veg">Veg</option>
                    <option value="Non-veg">NonVeg</option>
                </select>
                <span class="hidden error-message"></span>
            </div>
            <button class="deleteItem">Delete item</button>`;

        container.appendChild(newItem);

       
        newItem.querySelector('.deleteItem').addEventListener('click', function () {
            newItem.remove();
        });

        return count;
    }
    const form = document.querySelector("#addShopForm");
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const shopNameElement = document.querySelector("#shopName");
        const shopLocationElement = document.querySelector("#shopLocation");
        const shopOpeningsElement = document.querySelector("#openTimings");
        const openAm = document.querySelector("#amPmOpen").value;
        const closeAm = document.querySelector("#amPmClose").value;
        const shopClosingElement = document.querySelector("#closeTimings");
        const shopPhotos = document.querySelector("#shopPhotos");
        const shopCuisineElement = document.querySelector("#cuisineSelect");

        const shopName = shopNameElement.value.trim();
        const shopLocation = shopLocationElement.value.trim();
        const shopOpenings = shopOpeningsElement.value + " " + openAm;
        const shopClosing = shopClosingElement.value + " " + closeAm;
        const shopCuisine = shopCuisineElement.value;
        const allDatas = [shopNameElement, shopLocationElement, shopCuisineElement];
        requiredCheck(allDatas);
        const allCheck = nameCheck(shopNameElement) && nameCheck(shopLocationElement) &&
            timeCheck(shopOpeningsElement) && timeCheck(shopClosingElement) &&
            cuisineCheck(shopCuisineElement) && fileCheck(shopPhotos) && shopOpenCloseCheck(shopOpenings,shopClosing);
          
        const hasBreakfast = breakFasts.children.length > 0;
        const hasLunch = lunches.children.length > 0;
        const hasDinner = dinners.children.length > 0;

        if (!hasBreakfast && !hasLunch && !hasDinner) {
            Swal.fire({
                icon: 'error',
                title: 'No Items Added',
                text: 'Please add at least one item for Breakfast, Lunch, or Dinner.',
                showConfirmButton: true,
            });
            return;
        }

        if (allCheck) {
            getData();
        }

        async function getData() {
            if (shopPhotos.files && shopPhotos.files[0]) {
                const file = shopPhotos.files[0];
                const base64Image = await readFileAsBase64(file);
                const shopImage = base64Image.split(',')[1];
    
                const shopObj = {
                    shopName, shopLocation, shopOpenings, shopClosing, shopImage, shopCuisine
                };
    
                const breakfastItems= await collectItems('.breakfast');
                const lunchItems = await collectItems('.lunch');
                const dinnerItems = await collectItems('.dinner');
                
                if(breakfastItems==null || lunchItems==null || dinnerItems==null  )
                    {
                        return null;
                    }
                const allObj = {
                    shop: [shopObj], breakFast: breakfastItems, lunch: lunchItems, dinner: dinnerItems
                };
                console.log(allObj);

                $.ajax({
                    url: "http://localhost:8080/Tomato/webapi/myresource/addShop",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(allObj),
                    success: function(data) {
                        if (data.message === "success") {
                            Swal.fire({
                                icon: 'success',
                                title: 'Shop Added',
                                text: 'You have successfully added the shop!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            const form = document.querySelector("#addShopForm");
                            form.reset();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Add Shop Failed',
                                text: "Something went wrong!",
                                showConfirmButton: true,
                                timer: 1500
                            });
                        }
                    },
                    error: function(xhr, status, error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Add Shop Failed',
                            text: "Something went wrong!",
                            showConfirmButton: true,
                            timer: 1500
                        });
                    }
                });
            }
        }
    });

    async function collectItems(selector) {
        const itemsElement = document.querySelectorAll(selector);
        const items = [];
       
       
        for (const item of itemsElement) {
            const itemNameElement = item.querySelector('#foodName');
            const itemQuantityElement = item.querySelector('#foodQuantity');
            const itemPriceElement = item.querySelector('#foodPrice');
            const itemCategoryElement = item.querySelector("#foodCategory");
            const foodImage = item.querySelector('#foodImage');
            const allCheckFood = validateFoodName(itemNameElement) && validateFoodPrice(itemPriceElement) && validateFoodQuantity(itemQuantityElement) && fileCheck(foodImage);
           
            if(!allCheckFood)
                {
                    return null;
                    
                }
            if (foodImage.files && foodImage.files[0]) {
                const file = foodImage.files[0];
                const base64Image = await readFileAsBase64(file);

                const itemImage = base64Image.split(',')[1];
                const itemName = item.querySelector('#foodName').value;
                const itemQuantity = item.querySelector('#foodQuantity').value;
                const itemPrice = item.querySelector('#foodPrice').value;
                const itemCategory = item.querySelector("#foodCategory").value;

                if (allCheckFood) {
                    const itemObj = {
                        itemName, itemQuantity, itemPrice, itemImage, itemCategory
                    };
                    items.push(itemObj);
                }
            }
        }
        return items;
    }


    function readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    function errorMessageRemove(input) {
        const parent = input.parentElement;
        const errorElement = parent.children[2];
        errorElement.classList.remove("error");
        errorElement.classList.add("hidden");
        errorElement.innerText = "sadf";
    }

    function eventToThatElement(input) {
        input.addEventListener('keydown', function () {
            errorMessageRemove(input);
        });
    }

    function requiredCheck(datas) {
        datas.forEach(data => {
            if (data.value === "") {
                errorMessage(data, "This field is required!");
                eventToThatElement(data);
            }
        });
    }

    function errorMessage(input, message) {
        const parent = input.parentElement;
        const errorElement = parent.children[2];
        errorElement.innerText = message;
        errorElement.classList.remove('hidden');
        errorElement.classList.add("error")
    }

    function errorTimeMessage(input, message) {
        const parent = input.parentElement;
        const errorElement = parent.children[3];
        errorElement.innerText = message;
        errorElement.classList.remove('hidden');
        errorElement.classList.add("error")
    }
    function shopOpenCloseCheck(shopOpenings,shopClosing){
        const shopOpen=shopOpenings.split(" ");
        const shopClose=shopClosing.split(" ");
        const shopOpenTime=shopOpen[0];
        const shopOpenAm=shopOpen[1];
        const shopCloseTime=shopClose[0];
        const shopCloseAm=shopClose[1];
        if(shopOpenings==shopClosing)
            {
                Swal.fire({
                    icon: 'error',
                    title: 'Opening Closing Time Same!!!',
                    text: "Change It!!!",
                    timer: 1500
                });
                return false;
            }
            if(shopOpenAm==shopCloseAm)
                {
                    if(shopOpenTime=='12')
                        console.log(shopOpenTime);
                    else
                    {
                        swal.fire({
                            icon:'error',
                            title:'Mismatch Between Opening And Closing Time!',
                            timer:1000
                        })
                        return false;
                    }
                }
        return true;
    }
    function nameCheck(input) {
        let check = /^[a-zA-Z\s,]+$/.test(input.value.trim());
        if (!check) {
            errorMessage(input, "Shop Name must be alphabetic.");
        }
        eventToThatElement(input);
        return check;
    }

    function fileCheck(fileInput) {
        let check = fileInput.files && fileInput.files.length > 0;
        if (!check) {
            errorMessage(fileInput, "Need a shop image.");
        }
        return check;
    }

    function timeCheck(timeInput) {
        const timeValue = timeInput.value;
        const [hours, minutes] = timeValue.split(':').map(Number);

        let check = hours >= 0 && hours <= 12 && minutes >= 0 && minutes <= 59;
        if (!check) {
            errorTimeMessage(timeInput, "Time must Be HH is 0-12 and MM is 0-59.");
        }
        return check;
    }

    function cuisineCheck(selectInput) {
        let check = selectInput.value !== "Choose";
        if (!check) {
            errorMessage(selectInput, "Please select a cuisine.");
        }
        return check;
    }

    function validateFoodName(input) {
        let check = input.value.trim() !== "";
        if (!check) {
            errorMessage(input, "Food name is required.");
        }
        eventToThatElement(input);
        return check;
    }

    function validateFoodQuantity(input) {
        let check = input.value.trim() !== "";
        if (!check) {
            errorMessage(input, "Food quantity is required.");
        }
        eventToThatElement(input);
        return check;
    }

    function validateFoodPrice(input) {
        let check = input.value.trim() !== "";
        if (!check) {
            errorMessage(input, "Food price is required.");
        }
        eventToThatElement(input);
        return check;
    }

    function validateFoodImage(input) {
        let check = input.files && input.files.length > 0;
        if (!check) {
            errorMessage(input, "Food image is required.");
        }
        eventToThatElement(input);
        return check;
    }

    function validateFoodCategory(input) {
        let check = input.value !== "Choose";
        if (!check) {
            errorMessage(input, "Please select a food category.");
        }
        eventToThatElement(input);
        return check;
    }
});

