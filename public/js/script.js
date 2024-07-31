document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/summary')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('total-income').textContent = `$${data.total_income.toFixed(2)}`;
            document.getElementById('total-expense').textContent = `$${data.total_expense.toFixed(2)}`;
            document.getElementById('current-balance').textContent = `$${data.current_balance.toFixed(2)}`;
            
            // Initialize chart
            const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Income', 'Expenses'],
                    datasets: [{
                        label: 'Amount',
                        data: [data.total_income, data.total_expense],
                        backgroundColor: ['#4caf50', '#f44336']
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching summary:', error);
        });
});
