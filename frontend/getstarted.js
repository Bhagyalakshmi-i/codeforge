const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const username =
    document.getElementById("displayName").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value.trim();

  // VALIDATION
  if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  if (password.length < 4) {
    alert("Password must be at least 4 characters");
    return;
  }

  try {

    const response = await fetch ( "https://codeforge-backend.onrender.com/api/auth/signup" , 
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username,
          email,
          password
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    // SAVE LOGIN INFO
    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    alert("Signup successful!");

    // REDIRECT
    window.location.href = "browse.html";

  } catch (error) {

    console.log(error);

    alert("Server error");

  }

});