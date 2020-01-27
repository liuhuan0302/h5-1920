function quickSork(arr){
    let 
        midIndex = parseInt(arr.length / 2),
        midValue = arr[midIndex],
        leftArr = [],
        rightArr = [];
    if(arr.length <= 1){
        return arr;
    }
    for(let i = 0,k = arr.length; i < k ; i++){
        if(i == midIndex){
            continue
        }
        if(arr[i] <= midValue){
            leftArr.push(arr[i]);
        }else{
            rightArr.push(arr[i]);
        }
    } 
    return quickSork(leftArr).concat(midValue).concat(quickSork(rightArr));       
}


arr = [2,4,1,3,4,6,7,8,9];
console.log(quickSork(arr));