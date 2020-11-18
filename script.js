let rows = document.querySelectorAll('.row'), matrix = [];
[...rows].map(e => {
  const clm = [];
  [...e.children].map((c, i) => clm.push(''))
  matrix.push(clm)
  return matrix;
})

const fill = matrix => matrix.map((e, i) => e.map((k, t) => {
 if (k !== '') {
   [...rows[i].children][t].innerHTML = `<div class='cell'>${k}</div>`
 } else {
   [...rows[i].children][t].innerHTML = ``
 }
  return [...rows]
}))

function randomTwoes(matrix, b) {
  let rndmRow = Math.floor(Math.random() * 3);
  if (matrix[rndmRow].some(e => e == '')) {
    let emptyCell = matrix[rndmRow].findIndex(e => e == '');
    matrix[rndmRow][emptyCell] = b
    return fill(matrix)
  }
}
randomTwoes(matrix, 2);
randomTwoes(matrix, 2);

function reverseArr(pos, arr) {
  let x = [...arr], move = false;
  x.map((e, k) => {
    while (pos == 'right' && e.some((h, g) => h !== '' && e[g + 1] == '')) { //check if position is right and if there is numbers that has empty string after it
      let ind = e.findIndex((a, b) => a !== '' && e[b + 1] == '');
      e.splice(ind + 1, 1);
      e.unshift('');
      move = true;
    }
    while (pos == 'left' && e.some((h, g) => h !== '' && e[g - 1] == '')) {
      let ind = e.findIndex((a, b) => a !== '' && e[b - 1] == '');
      e.splice(ind - 1, 1);
      e.push('');
      move = true;
    }
    if (pos == 'up' || pos == 'down') {
      move = false;
      e.forEach((n, t) => {
        let index = e.findIndex((a, b) => pos == 'up' ? x[b + 1] && x[b + 1][k] !== ''
          && x[b][k] == '' : x[b - 1] && x[b - 1][k] !== '' && x[b][k] == '');
        if (index > -1) {
          move = true;
          if (pos == 'up') {
            x[index][k] = x[index + 1][k];
            x[index + 1][k] = '';
          }
          if (pos == 'down') {
            x[index][k] = x[index - 1][k];
            x[index - 1][k] = '';
          }
        }

      });
      console.log(move);

    }
    return e;
  });
  if (move) randomTwoes(matrix, 2);
  return x;
}

function sum(arr, pos) {
  let copy = [...arr];
  [...arr].map((e, k) => {
    let v = [];
    if (pos == 'right') e.reverse();
    e.map((q, r) => {
      if (pos == 'up' || pos == 'down') v.push(arr[r][k])
      if (pos == 'right' || pos == 'left') {
        if (q !== '' && q == e[r + 1]) {
          copy[k].splice(r, 2, 2 * q);
          copy[k].push('')
        }
      }
    })
    let horizontal = [...v]
    if (pos == 'up' || pos == 'down') {
      v.forEach((y, i) => {
        if (y !== '' && y == v[i + 1] && pos == 'up') {
          horizontal.splice(i, 2, 2 * y);
          horizontal.push('')
        }
        if (y !== '' && y == v[i - 1] && pos == 'down') {
          horizontal.splice(i-1, 2, 2 * y);
          horizontal.unshift('')
        }
      })
      horizontal.map((i, n) => copy[n][k] = i)
      return copy
    }

    if (pos == 'right') copy[k].reverse();
  })

  return copy

}

window.addEventListener('keydown', e => {
  if (e.key == 'ArrowDown') {
    matrix = reverseArr('down', matrix);
    sum(matrix, 'down')

  }
  if (e.key == 'ArrowUp') {
    matrix = reverseArr('up', matrix);
    sum(matrix, 'up')

  }
  if (e.key == 'ArrowRight') {
    matrix = reverseArr('right', matrix);
    sum(matrix, 'right')

  }
  if (e.key == 'ArrowLeft') {
    matrix = reverseArr('left', matrix);
    sum(matrix, 'left')

  }
  fill(matrix)
})