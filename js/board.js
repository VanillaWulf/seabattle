let userBoard = document.getElementById('user-board');
let userBoardContext = userBoard.getContext('2d');

let computerBoard = document.getElementById('computer-board');

let board = new Image();

board.src='img/bg_play_field.png';

function draw(){
//  userBoardContext.drawImage(board,0,0);
}

board.onload = draw;

let userBoardArray = [];
let computerBoardArray = [];

let userShips = [];
let computerShips=[];

for (var i = 0; i < 10; i++){
  userBoardArray[i] = [];
  computerBoardArray[i] = [];
    for (var j = 0; j < 10; j++){
        userBoardArray[i][j] = 0;
        computerBoardArray[i][j] = 0;
}}

function generateShip(board,length){

  let testBoard = board;

  let startCoord={
    x: false,
    y: false
  };
  let endCoord=[];
  //let vector = Math.floor(Math.random() * (3 + 1))

  let vector = 0;
  //0 1 2 3 - 0 - 12 часов

while(startCoord.x === false || startCoord.y=== false){
  if(vector === 0){
    startCoord.x = Math.floor(Math.random() * (9 + 1));
    startCoord.y = Math.floor(Math.random() * (9 + 1));
    console.log('length '+ length);
    if(startCoord.y+1 >= length){
      console.log('genereate');
      let coord=[];
      for(let i=0; i<length;i++){
        coord.push([startCoord.x, startCoord.y--]);
      }
      let nowBoard = checkFreeSpace(testBoard, coord, vector, length);
      if(nowBoard!=false){
        console.log('success');
        return testBoard;
      }else{
        startCoord.x = false;
        startCoord.y = false;
        console.log('not space');
      }
    }else{
      startCoord.x = false;
      startCoord.y = false;
      console.log('not space')
    }
  }else if(vector === 1){
    startCoord.x = Math.floor(Math.random() * (9 + 1));
    startCoord.y = Math.floor(Math.random() * (9 + 1));
    console.log('x coord');
    console.log(startCoord.x+1);
    console.log('freespace');
    console.log(10-startCoord.x);
    console.log('length '+ length);
    if(10-startCoord.x >= length){
      console.log('genereate');
      let coord=[];
      for(let i=0; i<length;i++){
        coord.push([startCoord.x++, startCoord.y]);
      }
      console.log(coord);
      if(checkFreeSpace(board, coord, vector, length)!=false){
         console.log('success');
         return board;
       }else{
         startCoord.x = false;
         startCoord.y = false;
         console.log('not space');
       }
    }else{
      startCoord.x = false;
      startCoord.y = false;
      console.log('not space');
    }
  }if(vector === 2){
    startCoord.x = Math.floor(Math.random() * (9 + 1));
    startCoord.y = Math.floor(Math.random() * (9 + 1));
    console.log('y coord');
    console.log(startCoord.y+1);
    console.log('freespace');
    console.log(10-startCoord.y);
    console.log('length '+ length);
    if(10-startCoord.y >= length){
      console.log('genereate');
      let coord=[];
      for(let i=0; i<length;i++){
        coord.push([startCoord.x, startCoord.y++]);
      }
      console.log(coord);
      if(checkFreeSpace(board, coord, vector, length)!=false){
         console.log('success');
         return board;
       }else{
         startCoord.x = false;
         startCoord.y = false;
         console.log('not space');
       }
    }else{
      startCoord.x = false;
      startCoord.y = false;
      console.log('not space');
    }
  }else if(vector === 3){
      startCoord.x = Math.floor(Math.random() * (9 + 1));
      startCoord.y = Math.floor(Math.random() * (9 + 1));
      startCoord.x = 3;
      startCoord.y = 3;
      console.log(startCoord.x);
      console.log('length '+ length);
      if(startCoord.x+1 >= length){
        console.log('genereate');
        let coord=[];
        for(let i=0; i<length;i++){
          coord.push([startCoord.x--, startCoord.y]);
        }
        console.log(coord);
        if(checkFreeSpace(board, coord, vector, length)!=false){
           console.log('success');
           return board;
         }else{
           startCoord.x = false;
           startCoord.y = false;
           console.log('not space');
         }
      }else{
        startCoord.x = false;
        startCoord.y = false;
        console.log('not space');
      }
    }
  }
};

function checkFreeSpace(checkBoard, coordinates, vector, length){

  console.log(coordinates);

  let oldBoard = checkBoard;
  console.log('old board '+ oldBoard);

  console.log(oldBoard);

  let startCoord = {
    x: coordinates[0].slice(0,1),
    y: coordinates[0].slice(1,2)
  }

  let endCoord = {
    x: coordinates[coordinates.length-1].slice(0,1),
    y: coordinates[coordinates.length-1].slice(1,2)
  }

  //запись корабля

  for(let i=0;i<length; i++){
    let nowCoord={
      x: coordinates[i].slice(0,1),
      y: coordinates[i].slice(1,2)
    }
    if(vector===0 || vector===2){
      //проверяем по ox свободные клетки
      if(checkBoard[nowCoord.y][nowCoord.x]===0){
        console.log(nowCoord.y + nowCoord.x);
        checkBoard[nowCoord.y][nowCoord.x]=1;
        if(parseInt(nowCoord.x)===9){
          if(checkBoard[nowCoord.y][8]===0){
            checkBoard[nowCoord.y][8]=6;
            console.log('checked left');
          }else{
            checkBoard = oldBoard;
            return false;
          }
        }else if(parseInt(nowCoord.x)===0){
          if(checkBoard[nowCoord.y][1]===0){
            checkBoard[nowCoord.y][1]=6;
            console.log('checked right');
          }else{
            checkBoard = oldBoard;
            return false;
          }
        }else{
            console.log('rightCoord '+checkBoard[nowCoord.y][parseInt(nowCoord.x)+1]);
            console.log('leftcoord '+checkBoard[nowCoord.y][parseInt(nowCoord.x)-1]);
            if(checkBoard[nowCoord.y][parseInt(nowCoord.x)+1]===0 &&
              checkBoard[nowCoord.y][parseInt(nowCoord.x)-1]===0){
                checkBoard[nowCoord.y][parseInt(nowCoord.x)+1]=6;
                checkBoard[nowCoord.y][parseInt(nowCoord.x)-1]=6;
                console.log('not corner');
              }else{
                console.log('full ox');
                checkBoard = oldBoard;
                return false;
              }
            }
          }
        if(vector===0)
        {//проверяем по oy свободные клетки - веткор на 12 часов
          if(parseInt(startCoord.y)===9){
            if(checkBoard[endCoord.y-1][endCoord.x]===0){
              checkBoard[endCoord.y-1][endCoord.x]=6;
              console.log('checked up');
            }else{
              checkBoard = oldBoard;
              return false;
            }
          }else if(parseInt(endCoord.y)===0){
            if(checkBoard[parseInt(startCoord.y)+1][startCoord.x]===0){
              checkBoard[parseInt(startCoord.y)+1][startCoord.x]=6;
              console.log('checked down');
            }else{
              checkBoard = oldBoard;
              return false;
            }
          }else{
            if(i===0){
              //чекаем оба края
              if(checkBoard[parseInt(startCoord.y)+1][startCoord.x]===0 &&
                 checkBoard[endCoord.y-1][endCoord.x]===0 ){
                  checkBoard[parseInt(startCoord.y)+1][startCoord.x]=6;
                  checkBoard[endCoord.y-1][endCoord.x]=6;
                  console.log('not corner');
                }else{
                  console.log('full oy');
                  checkBoard = oldBoard;
                  return false;
                }
              }
            }
        }else{
          //проверяем по oy свободные клетки - веткор на 6 часов
          if(parseInt(endCoord.y)===9){
            if(checkBoard[startCoord.y-1][startCoord.x]===0){
              checkBoard[startCoord.y-1][startCoord.x]=6;
              console.log('checked up');
            }else{
              checkBoard = oldBoard;
              return false;
            }
          }else if(parseInt(startCoord.y)===0){
            if(checkBoard[parseInt(endCoord.y)+1][endCoord.x]===0){
              checkBoard[parseInt(endCoord.y)+1][endCoord.x]=6;
              console.log('checked down');
            }else{
              checkBoard = oldBoard;
              return false;
            }
          }else{
            if(i===0){
              //чекаем оба края
              if(checkBoard[parseInt(endCoord.y)+1][endCoord.x]===0 &&
                 checkBoard[startCoord.y-1][startCoord.x]===0){
                  checkBoard[parseInt(endCoord.y)+1][endCoord.x]=6;
                  checkBoard[startCoord.y-1][startCoord.x]=6;
                  console.log('not corner');
                }else{
                  console.log('full oy');
                  checkBoard = oldBoard;
                  return false;
                }
              }
            }
          }
        }else{
          if(vector===1 || vector===3){
            if(checkBoard[nowCoord.y][nowCoord.x]===0){
              checkBoard[nowCoord.y][nowCoord.x]=1;
              if(parseInt(nowCoord.y)===9){
                if(checkBoard[8][nowCoord.x]===0){
                  checkBoard[8][nowCoord.x]=6;
                  console.log('checked up');
                }else{
                  checkBoard = oldBoard;
                  return false;
                }
              }else if(parseInt(nowCoord.y)===0){
                if(checkBoard[1][nowCoord.x]===0){
                  checkBoard[1][nowCoord.x]=6;
                  console.log('checked down');
                }else{
                  checkBoard = oldBoard;
                  return false;
                }
              }else{
                  if(checkBoard[parseInt(nowCoord.y)+1][nowCoord.x]===0 &&
                    checkBoard[parseInt(nowCoord.y)-1][nowCoord.x]===0){
                      checkBoard[parseInt(nowCoord.y)+1][nowCoord.x]=6;
                      checkBoard[parseInt(nowCoord.y)-1][nowCoord.x]=6;
                      console.log('not corner');
                    }else{
                      console.log('full oy');
                      checkBoard = oldBoard;
                      return false;
                    }
                  }
                }
            }

            if(vector===3)
            {//проверяем по oy свободные клетки - веткор на 3 часов
                if(parseInt(startCoord.x)===9){
                  if(checkBoard[endCoord.y][endCoord.x-1]===0){
                    checkBoard[endCoord.y][endCoord.x-1]=6;
                    console.log('checked left');
                  }else{
                    checkBoard = oldBoard;
                    return false;
                  }
                }else if(parseInt(endCoord.x)===0){
                  if(checkBoard[startCoord.y][parseInt(startCoord.x)+1]===0){
                    checkBoard[startCoord.y][parseInt(startCoord.x)+1]=6;
                    console.log('checked right');
                  }else{
                    checkBoard = oldBoard;
                    return false;
                  }
                }else{
                  if(i===0){
                    //чекаем оба края
                    if(checkBoard[startCoord.y][parseInt(startCoord.x)+1]===0 &&
                       checkBoard[endCoord.y][endCoord.x-1]===0){
                        checkBoard[startCoord.y][parseInt(startCoord.x)+1]=6;
                        checkBoard[endCoord.y][endCoord.x-1]=6;
                        console.log('not corner');
                      }else{
                        console.log('full oy');
                        checkBoard = oldBoard;
                        return false;
                      }
                    }
                  }
              }else{
                //проверяем по oy свободные клетки - веткор на 6 часов
                if(parseInt(endCoord.x)===9){
                  if(checkBoard[startCoord.y][startCoord.x-1]===0){
                    checkBoard[startCoord.y][startCoord.x-1]=6;
                    console.log('checked left');
                  }else{
                    checkBoard = oldBoard;
                    return false;
                  }
                }else if(parseInt(startCoord.x)===0){
                  if(checkBoard[endCoord.y][parseInt(endCoord.x)+1]===0){
                    checkBoard[endCoord.y][parseInt(endCoord.x)+1]=6;
                    console.log('checked right');
                  }else{
                    checkBoard = oldBoard;
                    return false;
                  }
                }else{
                  if(i===0){
                    //чекаем оба края
                    if(checkBoard[endCoord.y][parseInt(endCoord.x)+1]===0 &&
                       checkBoard[startCoord.y][startCoord.x-1]===0){
                        checkBoard[endCoord.y][parseInt(endCoord.x)+1]=6;
                        checkBoard[startCoord.y][startCoord.x-1]=6;
                        console.log('not corner');
                      }else{
                        console.log('full oy');
                        checkBoard = oldBoard;
                        return false;
                      }
                    }
                  }
                }
        }
    }
    return checkBoard;
}

userBoardArray = generateShip(userBoardArray,4);


console.log(userBoardArray);
