import React from "react";

/**
 * Test One: Find an ID in a simple tree
 * 
 * Given a tree of items with the interface `TreeNode` above,
 * Implement a method which returns the ID of the first node where `values`
 * in the node matches `value` passed into the method
 * 

Example tree:

const items = [
  {id: 1, values: [100, 101], children: [
    {id: 10, values: [1000, 1001]}
  ]},
  {id: 2, values: [200, 201]},
  {id: 3, values: [300, 301], children: [
    {id: 11, values: [1100, 1101]},
    {id: 9, values: [900, 901]},
    {id: 8, values: [800, 801], children: [
      {id: 7, values: [700, 701]},
      {id: 6, values: [600, 601]}
    ]}
  ]}
]

findIdInTreeByValue(items, 601) // => 6

 * See `index.spec.tsx` for basic test cases
 */

export interface TreeNode {
  id: number;
  values: number[];
  children?: TreeNode[];
}

export function findIdInTreeByValue(
  items: TreeNode[],
  value: number
): number | undefined {
  // implement me
  const found: number | undefined = SearchTree(items, value);
  return found;
  
}

export function SearchTree( items: TreeNode[],
  value: number
): number | undefined {
  for(let node of items){
    if(node.values.includes(value)){
      return node.id;
    }
    else if (node.children && node.children.length) {
      return SearchTree(node.children, value);
  }}
}


/**
 * Test Two: Consecutive numbers in an array
 * Given an array of unsorted numbers, find the longest sequence
 * of consective numbers in the array

Examples:

consecutiveNumbersLength([8, 4, 2, 1, 6, 5]) // => 3 (4,5,6)
consecutiveNumbersLength([5, 5, 3, 1]) // => 1

 * See `index.spec.tsx` for basic test cases
 */

export function consecutive(numbers: number[]): number {
  // implement me
  let SortedNumbers = numbers.sort((a, b) => a - b);
  let longest = 0;
  let temporary = 1;

  for (let i = 0; i < SortedNumbers.length - 1; i++) {
    if (SortedNumbers[i + 1] - SortedNumbers[i] !== 1) {
      temporary = 1;
    }
    else
      temporary++;
    if (temporary > longest) {
      longest = temporary;
    }
  }

  return longest;
}

/**
 * Test Three: Highlight a text match
 * Implement a method which highlights the portion of text which matches
 * a given substring (case-insensitive) by returning a ReactNode that
 * wraps the matches in <strong> tags
 * 

Example:
highlightMatch('Micheal Rosen', 'ros') =>

As JSX
<>
  Micheal <strong>Ros</strong>en
</>

As an array of JSX
[
  <React.Fragment key={0}>Micheal </React.Fragment>,
  <strong key={1}>Ros</strong>,
  <React.Fragment key={2}>en</React.Fragment>
]

 * See `index.spec.tsx` for test cases
 */

export function highlightMatch(
  text: string,
  matchString: string
): React.ReactNode {
  // implement me

  let regexExpression = new RegExp(matchString, 'gi');

  let combine = [];
  let match = text.match(new RegExp(matchString, 'gi'));
  if (!match) {
    combine.push(<React.Fragment key={0}>{text}</React.Fragment>);
    return combine;
  }

  let split = [];
  let startIndex = 0;
  let endIndex = text.length;
  while(startIndex < endIndex){
    let index = text.toLowerCase().indexOf(matchString, startIndex);
    if(index !== -1){
      if(index === 0){
        split.push(text.substring(startIndex, matchString.length));
      }
      else{
      split.push(text.substring(startIndex, index));
      split.push(text.substring(index, index + matchString.length));
    }
      startIndex = index  + matchString.length;
    }
    else{
      split.push(text.substring(startIndex, endIndex));
      startIndex = endIndex;
    }
  }


  let i = 0;
  for (let i = 0; i < split.length; i++) {
    if (split[i].match(regexExpression)) {
      combine.push(<strong key={i}>{split[i]}</strong>);
    }
    else
      combine.push(<React.Fragment key={i}>{split[i]}</React.Fragment>);

  }

return combine;
 
}