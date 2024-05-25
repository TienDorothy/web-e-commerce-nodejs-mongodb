export function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const addToListLocalStorage = (key, value) => {
  let list = getFromStorage(key) ? getFromStorage(key) : [];
  let updateList = [];
  // find Index in Arr
  let findIndex = list.findIndex((item) => item.product._id === value.product._id);
  // If don't have : push
  if (findIndex < 0) {
    updateList = [...list, value];
    list = updateList;
    // If have: change
  } else {
    let oldQuantity = parseInt(list[findIndex].quantity);
    let newQuantity = oldQuantity + value.quantity;
    list[findIndex].quantity = newQuantity;
   }
  setLocalStorage(key, list);
 return list; 
};
