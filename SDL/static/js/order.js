window.addEventListener('load', (event) => {
    // Retrieve data from localStorage
    const weight = localStorage.getItem('weight');
    const courier_charge = localStorage.getItem('courier_charge');
    const ODA = localStorage.getItem('ODA');
    const finalCharge = localStorage.getItem('finalCharge');
    const pincode = localStorage.getItem('pincode');
    const per_kg_charge = localStorage.getItem('per_kg_charge');

    // Update modal fields with retrieved data
    document.getElementById('order_weight').value = weight;
    document.getElementById('order_courier').value = courier_charge;
    document.getElementById('order_ODA').value = ODA;
    document.getElementById('order_finalCharge').value = finalCharge;
    document.getElementById('order_pincode').value = pincode;
    document.getElementById('order_per_kg_charge').value = per_kg_charge;
});