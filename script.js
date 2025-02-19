"use strict";

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// functions

const displayMovements = function (movements, sort = false) {
  // Clearing the previous list
  containerMovements.innerHTML = '';
const movs = sort ? movements.slice().sort((a, b) => a-b) : movements ;
  movs.forEach(function (mov, i) {

    const type = mov > 0 ? "deposit" : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};


const calcDisplayBalance = function(acc) {
 acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
}; 


// Computing Username
const creatUserName = function(accs) {
  accs.forEach(function(acc) {
  acc.username = acc.owner
.toLowerCase()
.split(' ')
.map(name => name[0])
.join('');
  })
};
creatUserName(accounts);

const updateUI = function(acc){
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

};

//----------------------------------------------------

// Event Handler
let currentAcc;

btnLogin.addEventListener('click', function(e) {
  //Prevent form from sunmitting
  e.preventDefault();

  currentAcc = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAcc);

  if(currentAcc?.pin === Number(inputLoginPin.value)) {
      // Display UI and message
      labelWelcome.textContent = `Welcome back, ${
        currentAcc.owner.split(' ')[0]
      }`;
      containerApp.style.opacity = 1;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    // Update UI
    updateUI(currentAcc);
  }
  });

   btnClose.addEventListener('click', function(e) {
    e.preventDefault();
    
    if(inputCloseUsername.value === currentAcc.username && +inputClosePin.value === currentAcc.pin) {
    
      const index = accounts.findIndex(acc => acc.username === currentAcc.username);
      console.log(index);

      // Delete Acc
      accounts.splice(index, 1);
      // Hide UI
      containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';
   })
  btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = +inputTransferAmount.value;
    const receiverAcc = accounts.find( acc => acc.username === inputTransferTo.value);
    inputTransferAmount.value = inputTransferTo.value = '';

    if( amount> 0 && receiverAcc && currentAcc.balance >= amount &&
      receiverAcc?.username !== currentAcc.username)
      {
        // Doing the transer
        currentAcc.movements.push(-amount);
        receiverAcc.movements.push(+amount);
        // Update UI
    updateUI(currentAcc);
    }
  });

  btnLoan.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = +inputLoanAmount.value;
    if(amount > 0 && currentAcc.movements.some(
      mov => mov >= amount * 0.1)) {
        // Add movement
        currentAcc.movements.push(amount);

        // Update UI
        updateUI(currentAcc);
    }
    inputLoanAmount.value = '';
  });

  let sorted = false;
  btnSort.addEventListener('click', function(e){
    e.preventDefault();
    displayMovements(currentAcc.movements, !sorted);
    sorted = !sorted;
  });


//---------------------------------------------------------------------

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits  = movements.filter(function(mov){
 return mov > 0 ;
});
const withdrawals = movements.filter(function(mov){
  return mov < 0 ;
});

const balance= movements.reduce((acc, curr) => acc + curr);
console.log(balance);

// ---------------------------------------------------------------------

// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,

//   movementsDates: [
//     '2019-11-18T21:31:17.178Z',
//     '2019-12-23T07:42:02.383Z',
//     '2020-01-28T09:15:04.904Z',
//     '2020-04-01T10:17:24.185Z',
//     '2020-05-08T14:11:59.604Z',
//     '2020-05-27T17:01:17.194Z',
//     '2020-07-11T23:36:17.929Z',
//     '2020-07-12T10:51:36.790Z',
//   ],
//   currency: 'EUR',
//   locale: 'pt-PT', // de-DE
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,

//   movementsDates: [
//     '2019-11-01T13:15:33.035Z',
//     '2019-11-30T09:48:16.867Z',
//     '2019-12-25T06:04:23.907Z',
//     '2020-01-25T14:18:46.235Z',
//     '2020-02-05T16:33:06.386Z',
//     '2020-04-10T14:43:26.374Z',
//     '2020-06-25T18:49:59.371Z',
//     '2020-07-26T12:01:20.894Z',
//   ],
//   currency: 'USD',
//   locale: 'en-US',
// };

// const accounts = [account1, account2];
