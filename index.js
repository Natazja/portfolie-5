const cafeList = document.querySelector("#all-cafes");
const submitButton = document.querySelector("#submit");

// Fetch all cafes
fetch("http://localhost:3000/cafes")
    .then(response => response.json())
    .then(data => {
        data.forEach(cafe => {
            const newElement = document.createElement("li");
            newElement.innerText = `${cafe.cafe_name} - ${cafe.address}, ${cafe.postal_code}, ${cafe.area}, ${cafe.city} (${cafe.stars} stars)`;
            cafeList.appendChild(newElement);
        });
    });

// Example of submitting new cafe data
submitButton.addEventListener("click", () => {
    const newCafe = {
        cafe_name: "New Cafe",
        address: "New Address",
        postal_code: "12345",
        area: "New Area",
        city: "New City",
        stars: 4
        // Add other attributes as needed
    };

    fetch("http://localhost:3000/cafes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCafe)
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response if needed
            console.log("New cafe added:", data);
        })
        .catch(error => {
            console.error("Error adding new cafe:", error);
        });
});

