import downloadedData from './data.json';
import downloadedData2 from './data_add.json';

type IndexedObj = {
  [index: string]: string | string[] | {};
};

const data: any = downloadedData;
const dataAdd: any = downloadedData2;

// function to check if array of objects is empty
const isEmpty = (arrayToCheck: {}[]): boolean =>
  arrayToCheck.filter(el => Object.keys(el).length !== 0).length === 0;

const result: IndexedObj = {};
const keys = Object.keys(data).filter(key => !key.match(/Shee/));

// process data keys
keys.sort().map(key => {
  const headOfColumn = Object.keys(data[key][0])[0];
  let locationArray: string[] = [];

  // if there is a 1st line, treated as header - add it
  if (headOfColumn) locationArray.push(headOfColumn.trim());

  // if array is empty > use dataAdd otherwise use data
  if (isEmpty(data[key])) {
    const moreData = Object.keys(dataAdd[key]).map(el => el.trim());
    locationArray = moreData;
  } else {
    data[key].forEach((el: IndexedObj) => {
      const element = Object.values(el)[0] as string;
      if (element) locationArray.push(element.trim());
    });
  }
  // add array of strings to result
  result[key.trim()] = locationArray.sort();
});

// getting the results
console.log('Result:');
console.log(result);

const app: HTMLElement = document.getElementById('app') as HTMLElement;
app.innerText = JSON.stringify(result);
