function loadComponent(id, file) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
      })
      .catch(err => console.error("Error loading " + file + ": " + err));
  }
  
  // Load header and footer
  document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "header.html");
    loadComponent("footer", "footer.html");
  });
  
  console.log("Site scripts loaded");