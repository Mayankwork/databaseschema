const size = 5;
function printPattern(size) {
    for (let i = size; i > 0; i--) {
      let row = "";
      for (let j = 0; j < i; j++) {
        if (j === i - 1 || i === size || j === 0) {
          row += "*";
        } else {
          row += " ";
        }
      }
      console.log(row);
    }
  }
  
  printPattern(size);