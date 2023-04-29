'use strict';

// Required User Data
const account1 = {
    owner: 'Freedom',
    movements: [20000, 45000, -4000, 30000, -6500, -1300, 100000, -13000],
    interestRate: 1,
    pin: 1111,
  };
  
  const account2 = {
    owner: 'Kumar',
    movements: [50000, 3400, -15000, -7900, -3210, -1000, 8500, 100000],
    interestRate: 1,
    pin: 2222,
  };
  
  const account3 = {
    owner: 'Suresh',
    movements: [20000, -2000, 100000, -3000, -2000, 5000, 4000, -4600],
    interestRate: 1,
    pin: 3333,
  };
  
  const account4 = {
    owner: 'Virat',
    movements: [43000, 100000, -7000, 5000, -9000, 30000, -7000, 10000],
    interestRate: 1,
    pin: 4444,
  };

  const account5 = {
    owner: 'Ajith',
    movements: [23000, -1000, 7000, -5500, 100000, 6000, -4000, 7000],
    interestRate: 1,
    pin: 5555,
  };

  const accounts = [account1, account2, account3, account4, account5];

  const transactionDates=['6/1/2023', '14/1/2023', '27/1/2023', '8/2/2023', '21/2/2023', '25/2/2023', '1/3/2023', '4/3/2023'];

// DOM Elements
// Transaction Display
const transactionField = document.querySelector('.transaction-left');
const balanceAmount = document.querySelector('.balance-amount');
const currentDayTime = document.querySelector('.day-time-now');
const newDate = document.querySelector('.transactionDate');

// Header
const greet = document.querySelector('.greetMessage');
const logoutButton = document.querySelector('.logout-button');

// Transaction Details
const transactionList = document.querySelector('.transactionDetails');

// Summary
const inAmount = document.querySelector('.in-amount-value');
const outAmount = document.querySelector('.out-amount-value');
const interestAmount = document.querySelector('.interest-amount-value');

// Transfer Amount
const transferUserId = document.querySelector('#transfer-userid');
const transferAmount = document.querySelector('#transfer-amount');
const transferButton = document.querySelector('.transfer-button');

// Loan Amount
const loanAmount = document.querySelector('#loan-amount');
const loanButton = document.querySelector('.loan-button');

// Close Account
const closeUserId = document.querySelector('#close-userid');
const closePassword = document.querySelector('#close-password');
const closeButton = document.querySelector('.close-button');

// Login DOMS
const logInId = document.querySelector('.log-id');
const logInPassword = document.querySelector('.log-password');
const logInButton = document.querySelector('.log-button');

// Toggle Displays
const loginField = document.querySelector('.before-login');
const mainField = document.querySelector('.after-login');



// Functions

  const currencyFormat = (num) => {
    
    const curr = num.toLocaleString('en-IN', {
       style: 'currency',
       currency: 'INR'
    });
   return curr;

   };

  const date = function(){

    const demo = new Date();
    const date = `${demo.getDate()}/${demo.getMonth()+1}/${demo.getFullYear()}`;
    return date;

  } 

  const transactionMovements = function (movs) {

    transactionField.innerHTML = '';
  
    movs.forEach(function (mov,i) {
      const type = mov > 0 ? 'deposit' : 'withdrawal';

      let dateDetails =transactionDates[i];

      const html = 
      ` <div class="transaction d-flex justify-content-between align-items-center mb-2 mt-2 pt-3">
      <div class="details">
        <p class="transactionDetails transaction-${type} p-1" style="background-color: ${mov>0?  'rgb(0, 206, 127)' : 'rgb(240, 99, 99)'} ;">${type}</p>
      </div>
      <div class="date">
        <p class="transactionDate">${dateDetails}</p>
      </div>
      <div class="amount">
        <p class="transactionAmount">${currencyFormat(mov)}</p>
      </div>
    </div>
      `;

      transactionField.insertAdjacentHTML('afterbegin', html);
    });

  };

  const remainingBalance = function (acc) {

    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    balanceAmount.textContent = `${currencyFormat(acc.balance)}`;

  };

  const summaryDisplay = function (acc) {

    const incomes = acc.movements
      .filter(mov => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
    inAmount.textContent = `${currencyFormat(incomes)}`;
  
    const out = acc.movements
      .filter(mov => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    outAmount.textContent = `${currencyFormat(Math.abs(out))}`;
  
    const interest = acc.movements
      .filter(mov => mov > 0)
      .map(deposit => (deposit * acc.interestRate) / 100)
      .filter((int) => {
        return int >= 1;
      })
      .reduce((acc, int) => acc + int, 0);
    interestAmount.textContent = `${currencyFormat(interest)}`;

  };

  const createUsernames = function (acc) {

      acc.username = 
      acc.owner;
      return acc.username;

  };

  const updateUI = function (acc) {

    // Display movements
    transactionMovements(acc.movements);
  
    // Display balance
    remainingBalance(acc);
  
    // Display summary
    summaryDisplay(acc);

    // Currrent Date Display
    currentDayTime.innerText=date();

    // Greeting User
    greet.innerText=createUsernames(acc);

  };

  const toggleDisplay = function(){

    loginField.classList.toggle('hidden');
    mainField.classList.toggle('hidden');
    
  };


// CLick Events
  let currentId;

  logInButton.addEventListener('click',function(){
    
    accounts.forEach(acc=>
    { 
        const name = createUsernames(acc);
        const pin = acc.pin;
        if(logInId.value === name && +logInPassword.value === pin){
        currentId=acc;
        return currentId;
  } 
});

// Clear Input values
logInId.value = logInPassword.value = '';

// Update UI
updateUI(currentId);

// Toggle Displays
toggleDisplay();

});

  logoutButton.addEventListener('click',function(){

  transferAmount.value = transferUserId.value = '';
  loanAmount.value = '';
  closeUserId.value = closePassword.value  = ``;
  
  currentId='';
  toggleDisplay();

}); 

  transferButton.addEventListener('click',function(){
    
    let recieverId;
    accounts.forEach(acc=>
      { 
          let name = createUsernames(acc);
          if(transferUserId.value === name){
          recieverId=acc;
          return recieverId;
    }});

    const amount = +transferAmount.value;

    transferAmount.value = transferUserId.value = '';

    if(
      amount>0 && recieverId && recieverId.username!==currentId.username && amount<=currentId.balance
      ){

      recieverId.movements.push(amount);
      currentId.movements.push(-amount);
      transactionDates.push(date());

      updateUI(currentId);

      }
});

  loanButton.addEventListener('click',function(){

    // Maximum loan amount will be 50% of current balance
  const loanLimit = currentId.balance * 0.5;
  const loanRequest = +loanAmount.value;

  loanAmount.value = '';

  if( loanRequest<=loanLimit && loanRequest>=1000 ){

  currentId.movements.push(loanRequest);
  transactionDates.push(date());

  updateUI(currentId);

  }

});

  closeButton.addEventListener('click',function(){

const closeUser = closeUserId.value;
const closePin = +closePassword.value;

closeUserId.value = closePassword.value  = ``;

if(closeUser===currentId.username && closePin===currentId.pin){

  const index = accounts.findIndex(
    acc => acc.username === currentId.username
  );

  // Delete account
  accounts.splice(index, 1);
  currentId='';
  toggleDisplay();

}

});