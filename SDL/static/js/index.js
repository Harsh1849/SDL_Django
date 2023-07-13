// Constants
const ODA_ORDER_CHARGE = 600;

const Per_KG_Charge_of_Zone_North_East = 35;
const Per_KG_Charge_of_Zone_West = 15;
const Per_KG_Charge_of_Zone_South = 28;
const Per_KG_Charge_of_Zone_Rest_of_India = 25;

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

    const pincode = this.value;
    if (pincode.length == 6){
        async function fetchData() {
            const pincode_details_json = await get_pincode_json_data(pincode);

            if (typeof pincode_details_json !== 'object'){
                pincodeInput.classList.add("is-invalid");
            } else {
                pincodeInput.classList.remove("is-invalid");
            }
        }        
        fetchData();
    }
});

// Event listener for form submission,  submit only when all the information is correct 
document.getElementById("calculateForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission and page reload
    const pincodeInput = document.getElementById("pincode");
    
    const pincode = pincodeInput.value;
    if (pincode.length == 6){
        async function fetchData() {
            const pincode_details_json = await get_pincode_json_data(pincode);
            
            const myAlert = document.getElementById("myAlert");
    
            if (typeof pincode_details_json !== 'object'){
                console.log("###")
                myAlert.style.display = "block";
        
                // Hide the alert after 5 seconds
                setTimeout(function () {
                    myAlert.style.display = "none";
                }, 10000);
            } else {
                myAlert.style.display = "none";
                calculateCharge();
            }
        }        
        fetchData();
    }
});

// Function to calculate the charge
function calculateCharge() {
    const weightInput = document.getElementById("weight");
    const weight = weightInput.value;

    const pincodeInput = document.getElementById("pincode");
    const pincode = pincodeInput.value;

    async function fetchData() {
        const pincode_details = await get_pincode_json_data(pincode);
        
        const lengthInput = document.getElementById("length");
        const length = lengthInput.value;

        const heightInput = document.getElementById("height");
        const height = heightInput.value;

        const widthInput = document.getElementById("width");
        const width = widthInput.value;

        const weight_dimension = Math.ceil((length * height * width) / 5000);

        const dimension_weight_element = document.getElementById("dimensionWeight");
        dimension_weight_element.style.display = "block";

        const dimension_weight_input_element = document.getElementById("dimensionWeightInput");
        dimension_weight_input_element.value = `${weight_dimension}`;

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

        const resultElement = document.getElementById("charge");
        const Minimum_WeightElement = document.getElementById("minimum_weight");
        if (new_weight < Math.ceil(minimum_zone_weight)) {
            Minimum_WeightElement.classList.remove("hide_element");
            Minimum_WeightElement.textContent = `*Below ${Math.ceil(minimum_zone_weight)}Kg minimum charges will apply.`;
            var per_kg_charge = 0;
            var total_amount = minimum_zone_charge;
            resultElement.textContent = `Rs ${total_amount}/-`;
        } else {
            Minimum_WeightElement.classList.add("hide_element");
            var per_kg_charge = zone_charge;
            var total_amount = new_weight * per_kg_charge;
            resultElement.textContent = `Rs ${total_amount}/- (${new_weight} Kg * ${zone_charge} Rs)`;
        }

        const is_ODA = pincode_details["ODA"];
        const is_ODAElement = document.getElementById("is_ODA");
        if (is_ODA === true) {
            var ODA_charge = ODA_ORDER_CHARGE;
            var Final_amount = total_amount + ODA_charge;
            is_ODAElement.classList.remove("hide_element");
        } else {
            var ODA_charge = 0;
            var Final_amount = total_amount;
            is_ODAElement.classList.add("hide_element");
        }

        const ODA_chargeElement = document.getElementById("ODA_charge");
        ODA_chargeElement.textContent = `Rs ${ODA_charge}/-`;

        const totalElement = document.getElementById("finalAmount");
        totalElement.textContent = `Total Charge: Rs ${Final_amount}/-`;

        const resultDiv = document.getElementById("resultDiv");
        resultDiv.style.display = "block";

        // Store data in localStorage
        localStorage.setItem('weight', new_weight);
        localStorage.setItem('courier_charge', total_amount);
        localStorage.setItem('per_kg_charge', per_kg_charge);
        localStorage.setItem('ODA', ODA_charge);
        localStorage.setItem('finalAmount', Final_amount);
        localStorage.setItem('pincode', pincode);
    }        
    fetchData();
}
