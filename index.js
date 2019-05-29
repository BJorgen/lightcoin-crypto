
// ==============================================================
//                          REQIUREMENTS
// ==============================================================
// Allow multiple accounts to be created
// Each account can have many transactions
// Allow withdrawals and deposits into accounts
// Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
// Allow us to retrieve the current balance of the account at any time
// Don't allow withdrawals that exceed the remaining balance of the account
// ==============================================================

// Account Class

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    this.transactions.forEach(x => {
      balance +=x.value;
    })
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

// Transaction Class

class Transaction {
  
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    } else {
      return false;
    }
  }
}

// Withdrawal

class  Withdrawal extends Transaction {
  isAllowed() {
    return (this.amount <= this.account.balance)
  }

  get value() {
    return -this.amount;
  }
}

// Deposit

class Deposit extends Transaction{
  isAllowed(){
    return true;
  }
  get value() {
    return this.amount;
  }
}



// ==============================================================
//                          DIVER CODE
// ==============================================================

const myAccount = new Account("snow-patrol");

console.log(myAccount)
console.log('Starting balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

console.log(myAccount)
console.log('Current balance:', myAccount.balance);

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log(myAccount)
console.log('Final balance:', myAccount.balance);

console.log(`==============================================`)

const myOtherAccount = new Account();

console.log('Starting Account Balance: ', myOtherAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1A = new Withdrawal(1.00, myOtherAccount);
console.log('Commit result:', t1A.commit());
console.log('Account Balance: ', myOtherAccount.balance);

console.log('Depositing should succeed...');
const t2A = new Deposit(9.99, myOtherAccount);
console.log('Commit result:', t2A.commit());
console.log('Account Balance: ', myOtherAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3A = new Withdrawal(9.99, myOtherAccount);
console.log('Commit result:', t3A.commit());

console.log('Ending Account Balance: ', myOtherAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myOtherAccount.transactions);