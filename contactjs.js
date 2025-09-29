document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop page reload for now

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !phone || !message) {
      showPopup("Please fill in all fields.", "error");
      return;
    }

    if (!validateEmail(email)) {
      showPopup("Enter a valid email address.", "error");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      showPopup("Enter a valid 10-digit phone number.", "error");
      return;
    }

    // If all validations pass
    showPopup("Thank you! Your message has been submitted.", "success");

    form.reset(); // clear form
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showPopup(message, type) {
    let popup = document.createElement("div");
    popup.className = `popup ${type}`;
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    setTimeout(() => {
      popup.classList.remove("show");
      setTimeout(() => popup.remove(), 300);
    }, 3000);
  }
});
