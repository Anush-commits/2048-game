let rows = document.querySelectorAll('.row'), matrix = [], score = 0, clearall = document.querySelector('.cached');
[...rows].map(e => {
  const clm = [];
  [...e.children].map((c, i) => clm.push(''))
  matrix.push(clm)
  return matrix;
})

const fill = matrix => matrix.map((e, i) => e.map((k, t) => {
  const colors = {
    2: '#33A1C9', 4: '#9aa7c1', 8: '#e2a6a6', 16: '#c37b7b', 32: '#9aa7c1', 64: '#cebcb4',
    128: '#854442', 256: '#CD9B9B', 512: '#D66F62', '1024': '#DB9370', '2048': '#8B8B7A'
  }
  if (k !== '') {
    if (k >= 126) {
      [...rows[i].children][t].innerHTML = `<div class='cell' style="background-color:${colors[k]}"><a class="CellNumber">${k}</a></div>`
    }
    else {
      [...rows[i].children][t].innerHTML = `<div class='cell' style="background-color:${colors[k]}">${k}</div>`
    }
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
          AddScore()
        }
      }
    })
    let horizontal = [...v]
    if (pos == 'up' || pos == 'down') {
      v.forEach((y, i) => {
        if (y !== '' && y == v[i + 1] && pos == 'up') {
          horizontal.splice(i, 2, 2 * y);
          horizontal.push('')
          AddScore()
        }
        if (y !== '' && y == v[i - 1] && pos == 'down') {
          horizontal.splice(i - 1, 2, 2 * y);
          horizontal.unshift('')
          AddScore()
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
  matrix.map(e => {
    if (e.includes(2048) || e.every(k => k!== '')) {
      let x = ShowModal(` Game is over and the score is ${score}`);
      let restartBtn = document.querySelector('#restart');
      restartBtn.addEventListener('click', () => { // starts new game
        ShowModal().style.display = 'none'
        clearMatrix() // makes new board
        AddScore(true); // new score from zero
      })

    }
  })
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

//get and change score
function AddScore(makeZero) {
  score = score + 5;
  const currentScore = document.getElementById('Current_score');
  currentScore.innerHTML = score
  if (makeZero == true) {
    score = 0
    currentScore.innerHTML = score
  }
}

// clear matrix

clearall.addEventListener('click', () => {
  let x = alert('Do you want to exit?')
  clearMatrix()
})
function clearMatrix() { // clears the mtrix and restarts 
  matrix = matrix.map(e => e.map(k => k = ''))
  randomTwoes(matrix, 2)
  randomTwoes(matrix, 2)
  fill(matrix)
  return matrix;
}

function ShowModal(msg) {
  const modal = document.querySelector('#modal'), modal_txt = document.querySelector('#modal_txt');
  modal.style.display = 'block'
  if (modal_txt.textContent !== '') {
    modal_txt.innerHTML = ''
  }
  modal_txt.innerHTML += msg;
  return modal;
}