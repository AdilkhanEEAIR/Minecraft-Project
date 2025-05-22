// Рекурсивный лабиринт
let maze = [];
let path = []; 
function start() {
    let rows = parseInt(document.getElementById('rows').value);
    let cols = parseInt(document.getElementById('cols').value);
    if (rows % 2 === 0) rows++;
    if (cols % 2 === 0) cols++;
    maze = makeMaze(rows, cols); 
    drawMaze(rows, cols);
    path = [];                
    go(1, 1, rows, cols); 
    show(0);            
}

function makeMaze(r,c){
    let m =[];
    for(let i=0;i<r;i++){
       let row = [];
       for (let j = 0; j < c; j++) {
        row.push(1); 
        }
        m.push(row); 
    }
    maze = m;
    function makePaths(x,y){
        let dirs = shuffle([[0, -2], [0, 2], [-2, 0], [2, 0]]); 
        for (let i = 0; i < dirs.length; i++) {
            let dx = dirs[i][0]; 
            let dy = dirs[i][1]; 
            let nx = x + dx; 
            let ny = y + dy; 
            if (nx > 0 && ny > 0 && nx < r - 1 && ny < c - 1 && maze[nx][ny] === 1) {
                maze[nx - dx / 2][ny - dy / 2] = 0; // Убираем стену 
                maze[nx][ny] = 0; // Ставим путь
                makePaths(nx, ny);
            }
        }
    }
    maze[1][1] = 0; 
    makePaths(1, 1); 
    maze[r - 2][c - 2] = 0; 
    return maze; 
}
function shuffle(array) {
    for(let i = array.length - 1; i>0; i--){
        let j = Math.floor(Math.random() * (i + 1)); 
        let tmp = array[i]; 
        array[i] = array[j];
        array[j] = tmp;
    }
    return array;
}
function drawMaze(rows, cols) {
    let mazeDiv = document.getElementById('maze'); 
    mazeDiv.innerHTML = ''; 
    mazeDiv.style.gridTemplateColumns = `repeat(${cols}, 20px)`; 
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell'); 
            if (maze[i][j] === 0) cell.classList.add('path'); 
            if (i === 1 && j === 1) cell.classList.add('start'); 
            if (i === rows - 2 && j === cols - 2) cell.classList.add('end'); 
            cell.id = `cell-${i}-${j}`; 
            mazeDiv.appendChild(cell); 
        }
    }
}
function go(x, y, rows, cols, visited = {}) {
    if (x < 0 || y < 0 || x >= rows || y >= cols) return false; // Чтобы не выйти за пределы
    if (maze[x][y] === 1) return false; // стена
    let key = `${x},${y}`; 
    if (visited[key]) return false; 
    visited[key] = true; 
    path.push([x, y]);
    if (x === rows - 2 && y === cols - 2) return true; 
    let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (let i = 0; i < dirs.length; i++) {
        let dx = dirs[i][0];
        let dy = dirs[i][1];
        if (go(x + dx, y + dy, rows, cols, visited)) return true; 
    }
    path.pop(); 
    return false;
}
function show(i) {
    if (i >= path.length) {
        alert("Лабиринт пройден!"); 
        return;
    }
    let [x, y] = path[i];
    let cell = document.getElementById(`cell-${x}-${y}`); 
    if (cell) {
        cell.classList.add('player'); 
        setTimeout(() => {
            cell.classList.remove('player'); 
            show(i + 1); 
        }, 100);
    }
}

/// Cards get
async function fetchPosts() {
  const container = document.getElementById('cardsContainer');
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    posts.forEach(post => {
      const imageUrl = `../images/index.imgs/card_img.jpg`;
      const postCard = document.createElement('div');
      postCard.className = 'post-card';

      postCard.innerHTML = `
        <img src="${imageUrl}">
        <div class="post-content">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `;
      container.innerHTML += postCard.outerHTML;
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = '<p>Ошибка загрузки данных.</p>';
  }
}
fetchPosts();