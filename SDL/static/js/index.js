// Constants
const ODA_ORDER_CHARGE = 600;

const Per_KG_Charge_of_Zone_North_East = 35;
const Per_KG_Charge_of_Zone_West = 25;
const Per_KG_Charge_of_Zone_South = 28;
const Per_KG_Charge_of_Zone_Rest_of_India = 28;

const Minimum_Charge_of_Zone_North_East = 550;
const Minimum_Charge_of_Zone_West = 350;
const Minimum_Charge_of_Zone_South = 500;
const Minimum_Charge_of_Zone_Rest_of_India = 450;

const State_of_Zone_North_East = ["Assam", "Mizoram", "Manipur", "Nagaland", "Jammu & Kashmir", "Arunachal Pradesh", "Meghalaya", "Tripura", "Sikkim", "Andaman & Nicobar"];
const State_of_Zone_West = ["Gujarat", "Maharashtra", "Goa", "Madhya Pradesh", "Chhattisgarh", "Dadra and Nagar Haveli", "Rajasthan"];
const State_of_Zone_South = ["Andhra Pradesh", "Karnataka", "Telangana", "Pondicherry", "Tamil Nadu", "Kerala"];
const State_of_Zone_Rest_of_India = ["Delhi", "Uttar Pradesh", "Chandigarh", "Daman & Diu", "Punjab", "Orissa", "Himachal Pradesh", "Uttarakhand", "Haryana", "Bihar", "Jharkhand", "West Bengal"];


async function get_pincode_json_data(pincode_number) {
    try {
        API_url = '/pincode/' + pincode_number.toString();
        const response = await axios.get(API_url);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Fumction to find zone data by pincode
function find_zone_by_pincode(weight, pincode_data) {
    const Facility_State = pincode_data["Facility State"];

    if (State_of_Zone_North_East.includes(Facility_State)) {
        var minimum_weight = Minimum_Charge_of_Zone_North_East / Per_KG_Charge_of_Zone_North_East;
        var minimum_charge = Minimum_Charge_of_Zone_North_East;
        var charge = Per_KG_Charge_of_Zone_North_East;
    } else if (State_of_Zone_West.includes(Facility_State)) {
        var minimum_weight = Minimum_Charge_of_Zone_West / Per_KG_Charge_of_Zone_West;
        var minimum_charge = Minimum_Charge_of_Zone_West;
        var charge = Per_KG_Charge_of_Zone_West;
    } else if (State_of_Zone_South.includes(Facility_State)) {
        var minimum_weight = Minimum_Charge_of_Zone_South / Per_KG_Charge_of_Zone_South;
        var minimum_charge = Minimum_Charge_of_Zone_South;
        var charge = Per_KG_Charge_of_Zone_South;
    } else if (State_of_Zone_Rest_of_India.includes(Facility_State)) {
        var minimum_weight = Minimum_Charge_of_Zone_Rest_of_India / Per_KG_Charge_of_Zone_Rest_of_India;
        var minimum_charge = Minimum_Charge_of_Zone_Rest_of_India;
        var charge = Per_KG_Charge_of_Zone_Rest_of_India;
    }

    return [charge, minimum_weight, minimum_charge];
}

// Event listener for pincode input, shows red flag for incorrect pin
document.getElementById("pincode").addEventListener("input", function () {
    const pincodeInput = document.getElementById("pincode");
    const is_ODAElement = document.getElementById("is_ODA");
    const myAlert = document.getElementById("myAlert");

    const pincode = this.value;
    if (pincode.length == 6){
        async function fetchData() {
            const pincode_details_json = await get_pincode_json_data(pincode);

            if (Object.keys(pincode_details_json).length == 0){
                pincodeInput.classList.add("is-invalid");
            } else {
                pincodeInput.classList.remove("is-invalid");

                const is_ODA = pincode_details_json["ODA"];
                if (is_ODA === "TRUE") {
                    is_ODAElement.classList.remove("hide_element");
                } else {
                    is_ODAElement.classList.add("hide_element");
                }
            }

            if (Object.keys(pincode_details_json).length == 0){
                myAlert.style.display = "block";
        
                // Hide the alert after 5 seconds
                setTimeout(function () {
                    myAlert.style.display = "none";
                }, 10000);
            } else {
                myAlert.style.display = "none";
            }
        }        
        fetchData();
    }
});

// Event listener for quantity input, add/remove input fields dynamically
document.getElementById("quantity").addEventListener("input", function () {
    const quantity = parseInt(this.value);
    const dynamicInputFieldsContainer = document.getElementById("dynamicInputFields");

    // Clear existing dynamic input fields
    dynamicInputFieldsContainer.innerHTML = '';

    // Create and append new input fields based on quantity
    for (let i = 1; i <= quantity; i++) {
        const fieldGroup = document.createElement("div");
        fieldGroup.classList.add("form-row", "form-group");
        
        // mimimum charges if weight below minimum weight
        const minimum_weightFieldGroup = document.createElement("div");
        minimum_weightFieldGroup.classList.add("form-group", "hide_element");
        minimum_weightFieldGroup.setAttribute('id',`minimum_weight_${i}`)

        const minimum_weightInput = document.createElement("div");
        minimum_weightInput.classList.add("col");
        minimum_weightInput.innerHTML = `
            <span id="minimum_weight_${i}" class="new_line hide_element"></span>
        `;
        minimum_weightFieldGroup.appendChild(minimum_weightInput);

        // input fields for weight, length, height, width
        const weightInput = document.createElement("div");
        weightInput.classList.add("col");
        weightInput.innerHTML = `
            <label for="weight_${i}">Weight ${i} (Kg):</label>
            <input type="number" id="weight_${i}" class="form-control" required />
        `;
        fieldGroup.appendChild(weightInput);

        const lengthInput = document.createElement("div");
        lengthInput.classList.add("col");
        lengthInput.innerHTML = `
            <label for="length_${i}">Length ${i} (cm) :</label>
            <input type="number" id="length_${i}" class="form-control" required />
        `;
        fieldGroup.appendChild(lengthInput);

        const heightInput = document.createElement("div");
        heightInput.classList.add("col");
        heightInput.innerHTML = `
            <label for="height_${i}">Height ${i} (cm) :</label>
            <input type="number" id="height_${i}" class="form-control" required />
        `;
        fieldGroup.appendChild(heightInput);

        const widthInput = document.createElement("div");
        widthInput.classList.add("col");
        widthInput.innerHTML = `
            <label for="width_${i}">Width ${i} (cm) :</label>
            <input type="number" id="width_${i}" class="form-control" required />
        `;
        fieldGroup.appendChild(widthInput);

        // input field to display weight by dimensions
        const dynamicWeightByDimensionFieldGroup = document.createElement("div");
        dynamicWeightByDimensionFieldGroup.classList.add("form-group", "hide_element");
        dynamicWeightByDimensionFieldGroup.setAttribute('id',`dimensionWeight_${i}`)

        const dimensionWeightInput = document.createElement("div");
        dimensionWeightInput.innerHTML = `
            <label>Weight by Dimension ${i} (Kg):</label> <i class=font-weight-light>(Length * Height * Width) / 5000</i><br>
            <input tabindex="-1" type="number" class="form-control" id="dimensionWeightInput_${i}" readonly>
            <hr>
        `;
        dynamicWeightByDimensionFieldGroup.appendChild(dimensionWeightInput);

        dynamicInputFieldsContainer.appendChild(minimum_weightFieldGroup);
        dynamicInputFieldsContainer.appendChild(fieldGroup);
        dynamicInputFieldsContainer.appendChild(dynamicWeightByDimensionFieldGroup);
    }
});

// Event listener for form submission,  submit only when all the information is correct 
document.getElementById("calculateForm").addEventListener("submit", function (e) {
    e.preventDefault();   
    calculateCharge();
});

// Function to calculate the charge
function calculateCharge() {
    const pincodeInput = document.getElementById("pincode");
    const pincode = pincodeInput.value;

    async function fetchData() {
        const pincode_details = await get_pincode_json_data(pincode);
        
        const quantity = parseInt(document.getElementById("quantity").value);
        var Final_amount = 0;
        var Final_weight = 0;
        
        for (let i = 1; i <= quantity; i++) {
            const weightInput = document.getElementById(`weight_${i}`);
            const weight = parseFloat(weightInput.value);
            const lengthInput = document.getElementById(`length_${i}`);
            const length = parseFloat(lengthInput.value);
            const heightInput = document.getElementById(`height_${i}`);
            const height = parseFloat(heightInput.value);
            const widthInput = document.getElementById(`width_${i}`);
            const width = parseFloat(widthInput.value);
            const dimension_weight_element = document.getElementById(`dimensionWeight_${i}`);
            const dimension_weight_input_element = document.getElementById(`dimensionWeightInput_${i}`);
        
            console.log("Items Data:");
            
            const weight_dimension = Math.ceil((length * height * width) / 5000);

            dimension_weight_element.style.display = "block"; // unhide the weight by dimension element
            dimension_weight_input_element.value = `${weight_dimension}`; // display data in weight by dimension element

            if (weight > weight_dimension) {
                var new_weight = weight;
                weightInput.classList.add("bg-warning");
                dimension_weight_input_element.classList.remove("bg-warning");
            } else {
                var new_weight = weight_dimension;
                dimension_weight_input_element.classList.add("bg-warning");
                weightInput.classList.remove("bg-warning");
            }

            const [zone_charge, minimum_zone_weight, minimum_zone_charge] = find_zone_by_pincode(new_weight, pincode_details);

            const Minimum_WeightElement = document.getElementById(`minimum_weight_${i}`);
            if (new_weight < Math.ceil(minimum_zone_weight)) {
                Minimum_WeightElement.classList.remove("hide_element");
                Minimum_WeightElement.textContent = `*Below ${Math.ceil(minimum_zone_weight)}Kg minimum charges will apply.`;
                var per_kg_charge = 0;
                var total_amount = minimum_zone_charge;
            } else {
                Minimum_WeightElement.classList.add("hide_element");
                var per_kg_charge = zone_charge;
                var total_amount = new_weight * per_kg_charge;
            }

            console.log("per_kg_charge", per_kg_charge);
            console.log("total_amount", total_amount);

            const is_ODA = pincode_details["ODA"];
            if (is_ODA === 'TRUE') {
                var ODA_charge = ODA_ORDER_CHARGE;
            } else {
                var ODA_charge = 0;
            }


            var Final_amount = Final_amount + total_amount;
            var Final_weight = Final_weight + new_weight;

        }

        const Final_amount_with_ODA = Final_amount + ODA_charge;
        const totalElement = document.getElementById("finalAmount");
        totalElement.textContent = `Rs ${Final_amount_with_ODA}/-`;

        console.log(Final_amount_with_ODA)

        const resultDiv = document.getElementById("resultDiv");
        resultDiv.classList.remove("hide_element");

        const place_order_element = document.getElementById("place_order_button");
        place_order_element.classList.remove("hide_element");

        // Store data in localStorage
        localStorage.setItem('weight', Final_weight);
        localStorage.setItem('courier_charge', Final_amount);
        localStorage.setItem('ODA', ODA_charge);
        localStorage.setItem('finalCharge', Final_amount_with_ODA);
        localStorage.setItem('pincode', pincode);
        localStorage.setItem('per_kg_charge', per_kg_charge);
    }        
    fetchData();
}
