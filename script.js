// Function to open the modal
function openModal() {
    document.getElementById('mobileModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('mobileModal').style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("mobileModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

// Event listener for form submission
document.getElementById('mobileForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const mobileNumber = document.getElementById('mobileNumber').value;
    await sendDataToZapier(mobileNumber);
});

// Function to send data to Zapier
async function sendDataToZapier(mobileNumber) {
    const destination = document.querySelector('[name="destination"]').value;
    const date = document.querySelector('[name="date"]').value;

    const formData = {
        mobileNumber,
        destination,
        date
    };

    try {
        const response = await fetch('https://hooks.zapier.com/hooks/catch/19961036/2td9oqx/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: Object.keys(formData).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`).join('&')
        });

        if (response.ok) {
            alert('Your data has been submitted successfully!');
            closeModal(); // Close the modal on successful submission
        } else {
            const errorResponse = await response.json();
            console.error('Error submitting data:', errorResponse);
            alert('There was an error submitting your data. Please try again.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred: ' + error.message);
    }
}


// Event listener for the mobile number form submission
document.getElementById('mobileForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const mobileNumber = document.getElementById('mobileNumber').value;
    const destination = document.querySelector('[name="destination"]').value;
    const date = document.querySelector('[name="date"]').value;

    await sendDataToZapier(mobileNumber, destination, date);
});

// Function to handle booking form submission
async function handleBooking() {
    // Get values from booking form
    const destination = document.querySelector('[name="destination"]').value;
    const date = document.querySelector('[name="date"]').value;

    // Perform validation if needed
    if (!destination || !date) {
        alert('Please fill in all fields.');
        return;
    }

    // Get mobile number (you might need to get this value from somewhere, e.g., a modal or a hidden field)
    const mobileNumber = document.getElementById('mobileNumber') ? document.getElementById('mobileNumber').value : '';

    // Send data to Zapier
    await sendDataToZapier(mobileNumber, destination, date);

    // Optionally, you can reset the form or clear the fields
    document.getElementById('bookingForm').reset();
}

// Event listener for the booking form
document.getElementById('bookingForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    handleBooking(); // Call the function to handle the booking
});
