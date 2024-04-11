function registerUser(event) {
    event.preventDefault();
  
    // Retrieve form input values
    const fullName = document.getElementById("fullName").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const agreedTerms = document.querySelector('input[type="checkbox"]').checked;
  
    // Simple validation checks
    if (!fullName || !username || !email || !password || !confirmPassword || !agreedTerms) {
      alert("Please fill in all fields and agree to the terms.");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    // If all validations pass, simulate registration (you can send data to server here)
    alert(`Registration successful!\n\nName: ${fullName}\nUsername: ${username}\nEmail: ${email}`);
    // Clear form inputs after successful registration
    document.getElementById("registrationForm").reset();
  }




  //Marka
  async function handleFormSubmission() {
  try {
    const form = document.querySelector("#Register-form");

    const formData = new FormData(form);

    const response = await fetch(`${baseUrl}register`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    if (responseData.success) {
      window.location.href = `${baseUrl}login`;
    } else if (responseData.validation) {
      backendValidation(responseData.validation);
    } else {
      console.error("Unexpected response from the server");
    }
  } catch (error) {
    console.error("An error occurred during the request:", error);
  }
}