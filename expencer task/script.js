document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function renderExpenses() {
        expenseList.innerHTML = '';
        let total = 0;

        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.name} - $${expense.amount}
                <span class="delete-btn" data-index="${index}">X</span>
            `;
            expenseList.appendChild(li);
            total += parseFloat(expense.amount);
        });

        totalAmount.innerText = total;
    }

    function addExpense(event) {
        event.preventDefault();
        const name = expenseNameInput.value;
        const amount = expenseAmountInput.value;

        if (name && amount) {
            const expense = { name, amount };
            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            expenseForm.reset();
        }
    }

    function deleteExpense(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
        }
    }

    expenseForm.addEventListener('submit', addExpense);
    expenseList.addEventListener('click', deleteExpense);

    renderExpenses();
});
