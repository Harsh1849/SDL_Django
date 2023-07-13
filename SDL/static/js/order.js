window.addEventListener('load', (event) => {
    // Retrieve data from localStorage
    const weight = localStorage.getItem('weight');
    const per_kg_charge = localStorage.getItem('per_kg_charge');
    const ODA = localStorage.getItem('ODA');
    const courier_charge = localStorage.getItem('courier_charge');
    const finalAmount = localStorage.getItem('finalAmount');
    const pincode = localStorage.getItem('pincode');

    // Update modal fields with retrieved data
    document.getElementById('order_weight').value = weight;
    document.getElementById('order_charge').value = per_kg_charge;
    document.getElementById('order_courier').value = courier_charge;
    document.getElementById('order_ODA').value = ODA;
    document.getElementById('order_total_amount').value = finalAmount;
    document.getElementById('order_pincode').value = pincode;
});