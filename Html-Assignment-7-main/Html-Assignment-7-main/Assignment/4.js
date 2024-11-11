$(document).ready(function () {
  const popularCryptos = [
    "bitcoin",
    "ethereum",
    "ripple",
    "litecoin",
    "dogecoin",
    "cardano",
    "polkadot",
  ];

  function fetchCryptoData() {
    $.ajax({
      url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr",
      method: "GET",
      success: function (data) {
       
        $("#crypto-list").empty();

        const filteredData = data.filter((coin) =>
          popularCryptos.includes(coin.id)
        );

        filteredData.forEach(function (coin) {
          const cryptoItem = `
                        <div class="crypto-item">
                            <span class="name">${
                              coin.name
                            } (${coin.symbol.toUpperCase()})</span>
                            <span class="price">₹${coin.current_price.toLocaleString()}</span>
                        </div>
                    `;
          $("#crypto-list").append(cryptoItem);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching cryptocurrency data:", error);
        $("#crypto-list").html(
          "<p>Failed to load data. Please try again later.</p>"
        );
      },
    });
  }

  fetchCryptoData();

  $("#refresh").click(function () {
    fetchCryptoData();
  });

  $("#search").on("input", function () {
    const searchValue = $(this).val().toLowerCase();
    $("#crypto-list .crypto-item").each(function () {
      const name = $(this).find(".name").text().toLowerCase();
      if (name.includes(searchValue)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
