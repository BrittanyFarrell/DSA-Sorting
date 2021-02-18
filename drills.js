/* eslint-disable strict */


const dataSet=[
  89, 30, 25, 32, 72, 70, 51, 42, 25, 24,
  53, 55, 78, 50, 13, 40, 48, 32, 26,  2, 
  14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 
  15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 
  65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 
  9,  70, 81, 27, 97, 82,  6, 88,  3,  7, 
  46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 
  17, 69, 90,  1,  6,  7, 64, 43,  9, 73, 
  80, 98, 46, 27, 22, 87, 49, 83,  6, 39, 
  42, 51, 54, 84, 34, 53, 78, 40, 14,  5
];

//3. Implementing quicksort
function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end-1, j);
  return j;
}

function qSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = qSort(array, start, middle);
  array = qSort(array, middle + 1, end);
  return array;
}

//console.log('qSort Output: ', qSort(dataSet));


//4. Implementing merge sort

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

function mSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mSort(left);
  right = mSort(right);
  return merge(left, right, array);
}

//console.log('mSort Output: ', mSort(dataSet));
class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  size() {
    let currNode = this.head;
    let count = 0;
    while (currNode !== null) {
      count = count + 1;
      currNode = currNode.next;
    }
    return count;
  }

  findMiddle() {
    let currNode = this.head;
    let count = 0;

    while(currNode !== null) {
      currNode = currNode.next;
      count = count + 1;
    }
    let idx = (count / 2) - (count % 2);
    let middle = this.findByIdx(idx - 1);
    return this.findBefore(middle.value);
    
  }

  findMiddleIdx() {
    let currNode = this.head;
    let count = 0;

    while(currNode !== null) {
      currNode = currNode.next;
      count = count + 1;
    }
    let idx = (count / 2) - (count % 2);
    return idx;
  }

  listLength() {
    let currNode = this.head;
    let count = 0;

    while(currNode !== null) {
      currNode = currNode.next;
      count = count + 1;
    }
    return count;
  }

  threeFromEnd() { 
    let currNode = this.head;
    let prevNode = null;
    
    if (!this.head) {
      return null;
    }
    
    while (currNode.value !== null) {
      if (currNode.next.next === null) {
        return prevNode;
      }
      else {
        prevNode = currNode; 
        currNode = currNode.next;
      }
    }
  }
  
  insertBefore(item, key) {
    let currNode = this.find(key);
    let prevNode = this.findBefore(key);
    let newNode = new Node(item, currNode);
    prevNode.next = newNode;
  }

  insertAfter(item, key) {
    let currNode = this.find(key);
    let nextNode = currNode.next;
    let newNode = new Node(item, nextNode);
    currNode.next = newNode;
  }

  findByIdx(idx) {
    let currNode = this.head;
    let location = 0;

    while(location < idx) {
      currNode = currNode.next;
      location = location + 1;
    }
    return currNode;
  }

  insertAt(item, idx) {
    let currNode = this.findByIdx(idx);
    let nextNode = currNode.next;
    let newNode = new Node(item, nextNode);

    currNode.next = newNode;
  }

  findBefore(item) { 
    let currNode = this.head;
    let prevNode = null;
    
    if (!this.head) {
      return null;
    }
    
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      }
      else {
        prevNode = currNode; 
        currNode = currNode.next;
      }
    }
    
    return prevNode;
  }

  find(item) { 
    // Start at the head
    let currNode = this.head;
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // Check for the item 
    while (currNode.value !== item) {
      /* Return null if it's the end of the list 
           and the item is not on the list */
      if (currNode.next === null) {
        return null;
      }
      else {
        // Otherwise, keep looking 
        currNode = currNode.next;
      }
    }
    // Found it
    return currNode;
  }

  //pointing the head to the node item
  insertFirst(item) {
    this.head = new Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new Node(item, null);
    }
  }

  remove(item){ 
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // If the node to be removed is head, make the next node head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    // Start at the head
    let currNode = this.head;
    // Keep track of previous
    let previousNode = this.head;

    while ((currNode !== null) && (currNode.value !== item)) {
      // Save the previous node 
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }

  peek() {
    return this.head.value;
  }

  pop() {
    const node = this.head;
    this.head = node.next;
    return node.value;
  }
}

const testList = new LinkedList(null);
dataSet.forEach(item => {
  testList.insertLast(item);
});

const test = new LinkedList();
test.insertLast(9);
test.insertLast(3);
test.insertLast(7);
test.insertLast(2);
test.insertLast(4);
test.insertLast(1);
test.insertLast(5);

//console.dir(testList, {depth: null});


//5. Sorting a linked list using merge sort


function listMerge(left, right) {
  let newList = new LinkedList();
  let node;

  while (left.size() > 0 && right.size() > 0) {
    if (left.peek() > right.peek()) {
      node = right.pop();
    } else {
      node = left.pop();
    }
    newList.insertLast(node);
  }

  while (left.head !== null) {
    newList.insertLast(left.pop());
  }

  while (right.head !== null) {
    newList.insertLast(right.pop());
  }

  return newList;
}

function listSlice(list, start, end) {
  let x = start;
  let node = list.findByIdx(x);
  let newList = new LinkedList();

  while (x < end) {
    if (node !== null) {
      newList.insertLast(node.value);
      node = node.next;
      x = x + 1;
    } else {
      return newList;
    }
  }
  return newList;
}

function mListSort(list) {
  if (list.listLength() <= 1) {
    return list;
  }

  const middle = list.findMiddleIdx();
  let left = listSlice(list, 0, middle);
  let right = listSlice(list, middle, list.size());

  left = mListSort(left);
  right = mListSort(right);
  
  return listMerge(left, right);
}


const sorted = mListSort(test);

console.dir(sorted, {depth: null});