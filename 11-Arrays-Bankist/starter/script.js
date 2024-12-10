'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Display Main Balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => (acc += curr), 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// Display Balance Summary
const displayBalanceSummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => (acc += cur));
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => (acc += curr), 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, deposit) => (acc += deposit), 0);
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc, i) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  //Display Balance
  displayBalanceSummary(acc);
  //Display movements
  displayMovements(acc.movements);
  //Display Summary
  calcDisplayBalance(acc);
};

// Event Handler

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // loose focus on PIN
    inputLoginPin.blur();
    //Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //push the loan amount
    currentAccount.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
  inputTransferAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    console.log(index);

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    console.log(accounts);
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  // displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
  // updateUI(currentAccount);
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(function(mov){
//   return mov > 0;
// })

// // const withdrawals = movements.filter(function(move){
// //   return move < 0;
// // })

// const withdrawals = movements.filter(move => move < 0)

// console.log(deposits);
// console.log(withdrawals);

// reduce
// works like a SNOWBALL to accumalate
// const balance = movements.reduce(function(acc, curr, i, arr){
//   console.log(`Iteration ${i}: Current balance is ${acc}`);

//   return acc+curr;
// },0)

// const balance = movements.reduce((acc,curr) => acc += curr)
// console.log(balance);

/////////////////////////////////////////////////

// let arr = ['a','b','c','d','e'];

// console.log(arr.slice(2));
// console.log(arr.slice(2,4));
// // shallow copy - will not mutate the original copy
// console.log(arr.slice());
// const a = [...arr]
// console.log(a);

// //SPLICE , to remove elements from an array
// console.log(arr);
// arr.splice(1,2,5);
// console.log(arr);

// const months = ['Jan', 'March', 'April', 'June'];
// months.splice(1, 0, 'Feb');
// // Inserts at index 1
// console.log(months);
// // Expected output: Array ["Jan", "Feb", "March", "April", "June"]

// months.splice(4, 1, 'May');
// // Replaces 1 element at index 4
// console.log(months);
// // Expected output: Array ["Jan", "Feb", "March", "April", "May"]

// //Reverse array method
// const arr_reverse = ['a', 'b', 'c', 'd', 'e', 'f']
// arr_reverse.reverse()
// console.log("reverse", arr_reverse);

// //concat
// const letters = arr.concat(arr_reverse)
// console.log(letters);

// //join
// console.log(letters.join(' & '))

// console.log("at method");
// const arr_at = [23, 11, 64]
// console.log(arr_at.at(0));

// const str = 'JONAS'
// for(const i in str){
//   console.log(str.at(i));
// }

// const mvms = [200,450,-400, 3000, -650, -130, 70, 1300];

// // for(const mvm of mvms){
// //   if(mvm > 0){
// //     console.log(`You deposited ${mvm}`);
// //   } else {
// //     console.log(`You withdrew ${Math.abs(mvm)}`);
// //   }
// // }

// for(const [i,mvm] of movements.entries())
// {
//   if(mvm > 0){
//     console.log(`movement ${i+1}: You deposited ${mvm}`);
//   } else {
//     console.log(`movement ${i+1}: You withdrew ${mvm}`);
//   }

// }

// console.log('----For Each-----');

// mvms.forEach(function(mvm, i, arr){
//   if(mvm > 0){
//     console.log(`movement ${i+1}: You deposited ${mvm}`);
//   } else {
//     console.log(`movement ${i+1}: You withdrew ${mvm}`);
//   }
// }
// )

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = function(dogsJulia, dogsKate){
//   const dogsJuliaCorrected = dogsJulia.slice(); //Create a shallow copy of dogsJulia
//   dogsJuliaCorrected.splice(0,1);
//   dogsJuliaCorrected.splice(-2);

//   // const dogs = [...dogsJuliaCorrected,...dogsKate];
//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogs);

//   dogs.forEach(function(dog,i){
//     if(dog>=3){
//       console.log(`Dog number ${i+1} is an adult, and is ${dog} years old`);
//     } else{
//       console.log(`Dog number ${i+1} is still a puppy 🐶`);
//     }
//   }
// )}

// // checkDogs([3, 5, 2, 12, 7],[4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3],[10, 5, 6, 1, 4])

// const eurToUsd = 1.1
// const movementUSD = movements.map(function(move){
//   return move * eurToUsd
// });

// const movementUSDArrow = movements.map(move => move * eurToUsd)

// console.log('original', movements);
// console.log('function', movementUSD);
// console.log('arrow', movementUSDArrow);

// // using the same method as forEach in map method
// const movementsDescriptions = movements.map((mov,i) => {

//   // ternary method
//   const msg = `Movement ${i + 1}: You ${mov>0?'deposited':'withdrew'} ${mov}`;

//   // if method
//   // if(mov>0){
//   //   return `Movement ${i + 1}: You deposited ${mov}`;
//   // } else{
//   //   return `Movement ${i + 1}: You You withdrew ${Math.abs(mov)}`;
//   // }
// })

// console.log(movementsDescriptions);

// maximum value in Array
// const max = movements.reduce((acc,cur) => {
//   if(acc>cur){
//     return acc;
//   }else{
//     return cur;
//   }
// })

// const max = movements.reduce((acc,cur) => {
//   return acc>cur? acc:cur;
// })
// console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// console.log(`
//   Coding Challenge 2.0
//   Array Method -  map, filter and reduce
//   `);

// const dogAgeData1 = [5, 2, 4, 1, 15, 8, 3]
// const dogAgeData2 = [16, 6, 10, 5, 6, 1, 4]

// const calcAverageHumanAge1 = function(ages){
//   const humanAges = ages.map(dogAge => (dogAge <= 2 ? dogAge*2 : 16 + dogAge * 4))

//   const adultDog = humanAges.filter(age => age>=18);

//   const avgAdultAge = adultDog.reduce((acc,curr) => acc+=curr/adultDog.length,0)

//   console.log('Human Age :' , humanAges);
//   console.log('Adult Age :' , adultDog);
//   console.log('Average Adult Age 1 :' , avgAdultAge);

// }

// const calcAverageHumanAge2 = function(ages){
//   const avgAdultAge2 = ages.map(dogAge => (dogAge <= 2 ? dogAge*2 : 16 + dogAge * 4)).filter(age => age>=18).reduce((acc,curr,i,arr) => acc+=curr/arr.length,0);
//   console.log('Average Adult Age 2 :' , avgAdultAge2);
// }

// calcAverageHumanAge1(dogAgeData2)
// calcAverageHumanAge2(dogAgeData2)

//Find Method
// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis')
// console.log(account);

//  const eurToUsd = 1.1;

// // PIPELINE
// const totalDepositUSD = movements.filter((mov) => mov > 0).map((mov,i, arr) => mov*eurToUsd).reduce((acc,mov,i) => acc+=mov )
// console.log(totalDepositUSD);

//Flat method - to flatten the array default at zero depth
// const overallBalance = accounts.map(acc => acc.movements).flat(1).reduce((curr,mov)=>mov+=curr,0)
// console.log(overallBalance);

// // Sorting Array
// //  String
// const owners = ['Jonas', 'Zack', 'Adam', 'Martha']
// console.log(owners.sort());

// // numbers
// // console.log(account1.movements);
// // console.log(account1.movements.sort());

// console.log(account1.movements);
// const sortMovement = account1.movements.sort((a,b) => a-b)
// console.log('asc', sortMovement);

// const sortMovement2 = account1.movements.sort((a,b) => b-a)
// console.log('desc', sortMovement2);

// programmable array
// const arr = new Array(7);
// console.log(arr);

// arr.fill(1,2,3)
// console.log(arr);

// arr.fill(2,1,3) - //new fill will replace current array in location
// console.log(arr);

// const y = Array.from({length:7}, () => 1);
// console.log('y',y);

// const z = Array.from({length:7}, (curr, i) => i+1 )
// console.log('z',z);

// // generate 100 dice rolls number must be 1 to 6
// // const randNum =  Math.round(Math.random()*10)
// const randArr = Array.from({length:100}, (_,i) =>  Math.round(Math.random()*10))
// console.log(randArr);

// labelBalance.addEventListener('click', function(e){
//   e.preventDefault();
//   const arrMovementsUI = Array.from(document.querySelectorAll('.movements__value'), el=> Number(el.textContent.replace('€','')) )
//   console.log(arrMovementsUI);
//   const newArr = arrMovementsUI.map(arr => arr*4)
//   console.log(newArr);

// })

//Array method practice
// Exercise No. 1
// checking all movements across the bank
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((accu, curr, i) => (accu += curr), 0);
// console.log(bankDepositSum);

// // Exercise No. 2
// // const numMov1000 = accounts.flatMap(acc => acc.movements).filter(mov=>mov>=1000).reduce((accu,curr,i) => i+1,0)
// const numMov1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((accu, curr, i) => (curr >= 1000 ? accu + 1 : accu), 0);
// console.log(numMov1000);

// // Exercise No. 2
// const { deposit, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sum, curr) => {
//       curr > 0 ? (sum.deposit += curr) : (sum.withdrawals += curr);
//       return sum;
//     },
//     { deposit: 0, withdrawals: 0 }
//   );
// console.log(deposit, withdrawals);

// // Exercise No 4
// // this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
//   const upperWord = word =>
//     exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1);

//   const arrWord = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => upperWord(word))
//     .join(' ');
//   return upperWord(arrWord);
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));

//////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// // 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

// console.log(dogs);
// const doggy = dogs.forEach(dog => {
//   dog.recommendedFood = Math.trunc(Math.pow(dog.weight, 0.75) * 28);
// });
// console.log('add recommended food', dogs);

// // 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

// const sarahsDog = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log("Sarah's dog", sarahsDog);
// console.log(
//   `Sarah's dog is eating too ${
//     sarahsDog.curFood >= sarahsDog.recommendedFood ? 'much' : 'little'
//   } food`
// );

// // 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle')

// const ownersToMuch = dogs
//   .filter(dog => dog.curFood > dog.recommendedFood)
//   .map(dog => dog.owners)
//   .flat(1);

// console.log('owners to much', ownersToMuch);

// const ownersToLittle = dogs
//   .filter(dog => dog.curFood < dog.recommendedFood)
//   .map(dog => dog.owners)
//   .flat(1);

// console.log('owners to little', ownersToLittle);

// // // 4. Sort the array of owners in 'ownersEatTooLittle' alphabetically and reverse
// // 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// console.log(`${ownersToMuch.sort().join(' and ')}'s dogs eat too much!`);
// console.log(
//   `${ownersToLittle.sort().reverse().join(' and ')}'s dogs eat too little!`
// );

// // 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// console.log(dogs.find(dog => (dog.curFood = dog.recommendedFood)));
// // some
// console.log(dogs.some(dogs => dogs.curFood === dogs.recommendedFood));
// // 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// console.log(
//   dogs.some(
//     dogs =>
//       dogs.curFood > dogs.recommendedFood * 0.9 &&
//       dogs.curFood < dogs.recommendedFood * 1.1
//   )
// );

// // 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

// const checkOkDog = dog =>
//   dog.curFood > dog.recommendedFood * 0.9 &&
//   dog.curFood < dog.recommendedFood * 1.1;

// const okayDogs = dogs.filter(checkOkDog);
// console.log(okayDogs);

// // 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

// const dogsCopy = [...dogs].sort(
//   (a, b) => a.recommendedFood - b.recommendedFood
// );

// console.log('sort a', dogsCopy);

// const dogsCopy2 = dogs
//   .slice()
//   .sort((a, b) => a.recommendedFood - b.recommendedFood);
// console.log('sort b', dogsCopy);
