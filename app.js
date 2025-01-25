document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const monthSlect = document.getElementById("month");
  const yearSlect = document.getElementById("year");
  const amountInput = document.getElementById("amount");
  const expenseChart = document.getElementById("expense-chart");

  let selectedMonth;
  let selectedYear;
  let myChart;

  // Generate year

  for (let year = 2020; year <= 2040; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSlect.appendChild(option);
  }

  // Tinitialize expenses
  const expenses = {
    January: {
      Housing: 0,
      Food: 0,
      Transportation: 0,
      Bills: 0,
      Miscellaneous: 0,
    },
    February: {
      Housing: 0,
      Food: 0,
      Transportation: 0,
      Bills: 0,
      Miscellaneous: 0,
    },
    March: {
      Housing: 0,
      Food: 0,
      Transportation: 0,
      Bills: 0,
      Miscellaneous: 0,
    },
    April: {
      Housing: 0,
      Food: 0,
      Transportation: 0,
      Bills: 0,
      Miscellaneous: 0,
    },
    May: {
      Housing: 0,
      Food: 0,
      Transportation: 0,
      Bills: 0,
      Miscellaneous: 0,
    },
    June: {
      Housing: 0,
      Food: 0,
      Transportation: 0,
      Bills: 0,
      Miscellaneous: 0,
    },
    July: {
      Housing: 0,
      Food: 0,
      Transportation: 0,
      Bills: 0,
      Miscellaneous: 0,
    },
    August: {
      Housing: 0,
      Food: 0,
      Transportation: 0,
      Bills: 0,
      Miscellaneous: 0,
    },
    September: {
      Housing: 0,
      Food: 0,
      Transportation: 0,
      Bills: 0,
      Miscellaneous: 0,
    },
    October: {
      Housing: 0,
      Food: 0,
      Transportation: 0,
      Bills: 0,
      Miscellaneous: 0,
    },
    November: {
      Housing: 1020,
      Food: 0,
      Transportation: 0,
      Bills: 0,
      Miscellaneous: 0,
    },
    December: {
      Housing: 0,
      Food: 0,
      Transportation: 0,
      Bills: 0,
      Miscellaneous: 0,
    },
  };

  // load expenses

  function getExpensesFormLocalStorage(month, year) {
    const key = `${month}-${year}`;
    return JSON.parse(localStorage.getItem(key)) || {};
  }

  // get select month and year

  function getSelectedMonthYear() {
    selectedMonth = monthSlect.value;
    selectedYear = yearSlect.value;
    if (!selectedMonth || !selectedYear) {
      alert("Month or year not selected");
      return;
    }
    if (!expenses[selectedMonth]) {
      expenses[selectedMonth] = {
        Housing: 0,
        Food: 0,
        Transportation: 0,
        Bills: 0,
        Miscellaneous: 0,
      };
    }
  }

  // save xpenses

  function saveExpensesFormLocalStorage(month, year) {
    const key = `${month}-${year}`;
    localStorage.setItem(key, JSON.stringify(expenses[month]));
  }

  // Handle Form submission

  function HandleSebmit(event) {
    event.preventDefault();
    getSelectedMonthYear();
    const category = event.target.category.value;
    const amount = parseFloat(event.target.amount.value);

    const currentAmount = expenses[selectedMonth][category] || 0;

    if (amount > 0) {
      expenses[selectedMonth][category] = currentAmount + amount;
    } else if (amount < 0 && currentAmount >= Math.abs(amount)) {
      expenses[selectedMonth][category] = currentAmount + amount;
    } else {
      alert("invlid amount: Cannot reduce the category below zero.");
    }

    amountInput.value = "";
    saveExpensesFormLocalStorage(selectedMonth, selectedYear);
    updateChart();
  }

  expenseForm.addEventListener("submit", HandleSebmit);
  monthSlect.addEventListener("change", updateChart);
  yearSlect.addEventListener("change", updateChart);

  // set default month and year

  function setDefaultMonthYear() {
    const now = new Date();
    const intialMonth = now.toLocaleString("defalult", { month: "long" });
    const intialYear = now.getFullYear();
    monthSlect.value = intialMonth;
    yearSlect.value = intialYear;
  }
  setDefaultMonthYear();
  updateChart();

  function updateChart() {
    getSelectedMonthYear();
    const expenseData = getExpensesFormLocalStorage(
      selectedMonth,
      selectedYear
    );
    Object.assign(expenses[selectedMonth], expenseData);
    const ctx = expenseChart.getContext("2d");
    if (myChart) {
      myChart.destroy();
    }
    myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(expenses[selectedMonth]),
        datasets: [
          {
            data: Object.values(expenses[selectedMonth]),

            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: $${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });
  }
});
