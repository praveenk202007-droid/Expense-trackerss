
const form = document.getElementById("transaction-form");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");

const transactionList = document.getElementById("transaction-list");

let transactions = [];

function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function(transaction) {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    let balance = totalIncome - totalExpense;

    balanceDisplay.textContent = "₹" + balance.toLocaleString("en-IN");
    incomeDisplay.textContent = "₹" + totalIncome.toLocaleString("en-IN");
    expenseDisplay.textContent = "₹" + totalExpense.toLocaleString("en-IN");
}

function displayTransactions() {
    transactionList.innerHTML = "";

    if (transactions.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "empty";
        emptyMessage.textContent = "No transactions yet.";
        transactionList.appendChild(emptyMessage);
        return;
    }

    transactions.forEach(function(transaction) {
        const li = document.createElement("li");

        const name = document.createElement("span");
        name.textContent = transaction.description;

        const amount = document.createElement("strong");
        amount.textContent =
            (transaction.type === "income" ? "+" : "-") +
            "₹" + transaction.amount.toLocaleString("en-IN");

        amount.style.color =
            transaction.type === "income" ? "#16a34a" : "#dc2626";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            transactions = transactions.filter(function(item) {
                return item.id !== transaction.id;
            });

            updateSummary();
            displayTransactions();
        });

        li.appendChild(name);
        li.appendChild(amount);
        li.appendChild(deleteButton);

        transactionList.appendChild(li);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (description === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        id: Date.now() + Math.random(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    updateSummary();
    displayTransactions();

    form.reset();
});

updateSummary();
displayTransactions();
