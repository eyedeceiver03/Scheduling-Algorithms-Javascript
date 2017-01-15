let qu = 0;

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

  for(var x = 0; x < arrivalTime.length; x++)
    objCollection.push({ A: arrivalTime[x], B: burstTime[x] });

  objCollection.sort(function(a, b){
    return a.A - b.A;
  });

  for(var x = 0; x < objCollection.length; x++){
    AT.push(objCollection[x].A);
    BT.push(objCollection[x].B);
    completion = CT(BT[x]);
    turnaround = TT(completion,AT[x]);
    waiting = WT(turnaround,BT[x]);
    output += `${x+1}\t${AT[x]}\t${BT[x]}\t${completion}\t${turnaround}\t${waiting}\n`;
    att.push(turnaround);
    awt.push(waiting);
  }
  output += `Average Turnaround Time: ${averageTT(att, objCollection.length)}\nAverage Waiting Time: ${averageWT(awt, objCollection.length)}`
  return output;
}

function CT(bt){
  qu += bt;
  return qu;
}

function TT(ct, at){
  return ct - at;
}

function WT(tt,bt){
  return tt - bt;
}

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

console.log(FCFS([0, 1, 2, 3, 4], [10, 3, 5, 2, 1]));
