
//#region VARIABLES

function variables1(){
  
  // var lze deklarovat znovu
  var var3 = 55;
  var var3 = 66;

  // let nikoliv
  let var2 = 10;
  // let var2 = 5;

  // ale lze priradit novou hodnotu
  // var2 = 8;

  // console.log(var2);

  const var1 = 5;

  // u const ne
  // var1 = 8;

  // var je function scoped, i definice v jinem "bloku" je citelna venku
  for (var i = 0; i < 4; i++){
    var aa = i+1;
  }
  
  console.log('aa' + aa)


  // let je block scoped
  for (var i = 0; i < 4; i++){
    let bb = i+1;
  }

  console.log('bb' + bb)


  // console.log('DONE');
}


function variables2(){
  let funcs = [];

  for (let i = 0; i < 3; i++) { // nahradit za let
    funcs[i] = function() {
      console.log("My value: " + i);
    };
  }

  for (var j = 0; j < 3; j++) {
    funcs[j]();
  }
}
//#endregion 

//#region CLASSES

  class Shape {
    constructor(props){
      this.name = props;
    }

    logName = function(){
      console.log(this.name);
    }

    static logThis = function(thisWrite){
      console.log(thisWrite);
    }
  }

  class Circle extends Shape {
    constructor(props){
      super(props.name);
      this.radius = props.radius;
    }

    countCircumference = function(){
      return Math.PI * 2 * this.radius;
    }
  }

  function class1(){    
   var shape = new Shape("New shape");
   shape.logName();
    // shape.
   Shape.logThis('hello');

   var circle = new Circle({name: 'circle1', radius: 5})
   circle.logName();

   var circumference = circle.countCircumference();
   console.log(circumference);

  }

  function callShapeLog(shape){
    //no intellisense
    // shape.logName();
  }

//#endregion

//#region ARROW FUNCTIONS

  function arrowf1() {
   let additionOld = function(a,b){
     return a + b;
   }

   let additionArrow = (a,b) => {
     return a+b;
   }

   let additionArrowConcise = (a,b) => a + b;

   console.log(additionOld(1,2), '-',additionArrow(1,2),'-',additionArrowConcise(1,2));
  }

//#endregion

//#region ARRAY OPERATIONS
{
  const array = [1,2,3,4,5,6,7,8,9];
  const arrayWords = ["aaa","bbeee","cccee","dadee","eeeef"];

  function arraysFilter() {
    let divisibleByThree = array.filter(function(value) {
      return value % 3 === 0;
    })

    let divisibleByThreeArrowConcise = array.filter(x => x % 3 === 0);

    console.log('divisible by three', divisibleByThree,
    '\ndivisible by three concise', divisibleByThreeArrowConcise);
  }

  function arraysMap() {
    let timesTwo = array.map(x => x * 2);

    let moduloAndAddedNumber = array.map(x => {
      let result;

      if (x % 2 === 0){
        result = 'Delitelne dvema ' + x;
      }
      else if (x % 3 === 0){
        result = 'A tremi ' + x;
      }
      else {
        result = 'NEZAJEM';
      }

      return result;
    })

    console.log('times two', timesTwo, '\nmodulo addes number', moduloAndAddedNumber);
  }

  function arraysReduce() {
    var reducedWords = arrayWords.reduce((prev, current) => {
      prev[current] = current.indexOf('a') !== -1;

      return prev;
    },{})

    console.log('reduced words', reducedWords);

    var reduced = array.reduce((prev, current) => {
      // console.log(prev, current);
      
      prev[current] = current * 2;

      return prev;
    },{})

    console.log('reduced', reduced);

    var reduced2 = array.reduce((prev, current) => {
      return prev + current;
    },0)

    console.log('reduced2', reduced2);
  }
}
//#endregion

//#region OBJECT AND ARRAY DESTRUCTURING
  const person = {
    name: 'Petr',
    surname: 'Petrovič',
    age: 24
  }

  const contact = {
    phone: '+420608194881',
    email: 'petr.petrovic@centrum.cz'
  }

  function objectDestructuring1(){
    const { surname : mySurname, age } = person;

    console.log(`Name ${mySurname} and age ${age} of the person`);

    const combinedPersonObj = {
      ...person,
      ...contact
    }

    console.log('combined', combinedPersonObj);

    printSurname(person);

    const { phone, ...restOfPerson} = combinedPersonObj;

    console.log(`Phone ${phone} and rest of the person`, restOfPerson);
  }

  function printSurname({surname}) {
    console.log(`the surname of aforementioned person is ${surname}`)
  }

  const array1 = [1,2,3,4,5];

  const array2 = [6,7,8,9];

  function arrayDestructuring(){
    const combinedArr = [...array1, ...array2];

    // console.log('combined arr', combinedArr);

    const [arr1, arr2, ...restOfArr] = combinedArr;

    const [arr3, , , , arr4, ...restOfArr2] = combinedArr;

    console.log('Arr 1 ', arr1, ' |-|Arr 2 ', arr2, '\nrest of arr ', restOfArr);
    console.log('-----------------------------')
    console.log('Arr 3 ', arr3, ' |-|Arr 4 ', arr4, '\nrest of arr2 ', restOfArr2);
  }

//#endregion

//#region PROMISES 
  function msgAfterTimeout (msg, who, timeout, onDone) {
    setTimeout(function () {
        onDone(msg + " Hello " + who + "!");
    }, timeout);
  }

  function msgAfterTimeout2(msg, who, timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout)
    })
  }
 
//#endregion

// VARIABLES
// variables1();
// variables2();

// CLASSES
// class1();

// ARROW FUNCTIONS
// arrowf1();

// ARRAYS
// arraysFilter();
// arraysMap();
// arraysReduce();

// OBJECT AND ARRAY DESTRUCTURING
// objectDestructuring1();
// arrayDestructuring();

// PROMISES
msgAfterTimeout("", "Foo", 100, function (msg) {
  msgAfterTimeout(msg, "Bar", 200, function (msg) {
    console.log("done after 300ms:" + msg);
  });
});

msgAfterTimeout2("", "Foo", 100)
  .then((msg) => msgAfterTimeout2(msg, "Bar", 200))
  .then((msg) => {
    console.log(`done after 300ms:${msg}`)
});

Promise.all([msgAfterTimeout2("First", "Foo", 100), msgAfterTimeout2("Second", "Foo", 500), msgAfterTimeout2("Third", "Foo", 2000)])
  .then(x => console.log('Done', x))
