//intentional for the purpose of making qu globally scoped at function CT
let qu = 0;

//function that gets the arrivalTime and burstTime (array)
function FCFS(arrivalTime, burstTime){
  let output = 'P\tAT\tBT\tCT\tTT\tWT\n',
      objCollection = [],
      AT = [],
      BT = [],
      completion,
      turnaround,
      waiting,
      att = [],
      awt = [];

  //Making an object to be sorted later.
  for(var x = 0; x < arrivalTime.length; x++)
    objCollection.push({ A: arrivalTime[x], B: burstTime[x] });

  //Sorting begins with its corresponding Arrival Time and Burst Time
  //No interchanging of partner happens
  objCollection.sort(function(a, b){
    return a.A - b.A;
  });


  for(var x = 0; x < objCollection.length; x++){
    //pushing to array AT and BT for later purposes.
    AT.push(objCollection[x].A);
    BT.push(objCollection[x].B);

    //calling these functions and store the values
    completion = CT(BT[x]);
    turnaround = TT(completion,AT[x]);
    waiting = WT(turnaround,BT[x]);

    //storing values in output string, AT and BT array are used.
    output += `${x+1}\t${AT[x]}\t${BT[x]}\t${completion}\t${turnaround}\t${waiting}\n`;

    //pushing to array att and awt for later purposes.
    att.push(turnaround);
    awt.push(waiting);
  }

  //Passing att and awt arrays to these functions
  output += `Average Turnaround Time: ${averageTT(att, objCollection.length)}\nAverage Waiting Time: ${averageWT(awt, objCollection.length)}`
  return output;
}

//Calculating for completion time.
function CT(bt){
  //qu must be globally scoped so that it starts initially at zero
  //and incrementing it every function invocation.
  qu += bt;
  return qu;
}

//Calculating for turnaround time.
function TT(ct, at){
  return ct - at;
}

//calculating for waiting time.
function WT(tt,bt){
  return tt - bt;
}

//calculating the average turnaround time and average waiting time
//using the reduce method to find the sum of its array and dividing
//by the number of elements in the array.
function averageTT (ttValues, noOfValues) {
  return ttValues.reduce(function(total, num){
    return total + num;
  }) / noOfValues;
}

function averageWT (wtValues, noOfValues) {
  return wtValues.reduce(function(total, num){
    return total + num;
  }) / noOfValues;
}

//Calling main function FCFS, parameters are just for tests.
//You can play around for the values.
console.log(FCFS([0, 1, 2, 3, 4], [10, 3, 5, 2, 1]));
