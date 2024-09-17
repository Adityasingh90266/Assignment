document.addEventListener("DOMContentLoaded", () => {
    fetch('/tickers')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('tbody');
            data.forEach((ticker, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${ticker.name}</td>
                    <td>${ticker.last}</td>
                    <td>${ticker.buy}</td>
                    <td>${ticker.sell}</td>
                    <td>${ticker.volume}</td>
                    <td>${ticker.base_unit}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(err => console.error('Error fetching tickers:', err));
});
