// Function to fetch a random quote
function fetchQuote() {
  const url = "https://api.api-ninjas.com/v1/quotes"; // API URL
  const apiKey = "hU5L8xMoXjrQxozgXwkveA==9VZtrsnrPGutzf0w"; // Replace with your actual API key

  console.log(`Fetching quote from: ${url}`); // Log the URL to make sure it's correct

  // Use the fetch API to get data
  fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey, // Pass the API key in the header
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Check if the API returns a valid quote and author
      if (data && data[0]) {
        console.log("Quote fetched successfully:", data[0]); // Log the fetched data
        document.getElementById(
          "quote-text"
        ).textContent = `"${data[0].quote}"`;
        document.getElementById(
          "quote-author"
        ).textContent = `- ${data[0].author}`;
      } else {
        document.getElementById("quote-text").textContent =
          "Failed to load quote.";
        document.getElementById("quote-author").textContent = "";
      }
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
      document.getElementById("quote-text").textContent =
        "Failed to load quote.";
      document.getElementById("quote-author").textContent = "";
    });
}

// Initialize fetch when the page loads
document.addEventListener("DOMContentLoaded", function () {
  fetchQuote(); // Get a random quote on page load

  // Handle "New Quote" button click
  document.getElementById("new-quote").addEventListener("click", function () {
    fetchQuote(); // Fetch a new random quote
  });
});
