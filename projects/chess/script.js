import {
  pieceLoacation,
  piecesImages,
  currPieceLoacation,
  tiles,
} from "./json.js";

let selected = null;
let count = 0;
let temp = pieceLoacation;
let removed;
let blackKing = 15;
let whiteKing = 85;
let blackKingMoved = false;
let whiteKingMoved = false;
let blackBool;
let whiteBool;
console.log(window.innerWidth)
function gei(id) {
  return document.getElementById(id);
}

function load(flag) {
  // if (count % 2 == 0) {
  //   gei("WHITE_TURN").style.textShadow =
  //     "0 0 10px #fff, 0 0 20px #fff, 0 0 42px #0fa, 0 0 82px #0fa,0 0 92px #0fa";
  //   gei("WHITE_TURN").style.color = "white";

  //   gei("BLACK_TURN").style.textShadow = "none";
  //   gei("BLACK_TURN").style.color = "black";
  // } else {
  //   gei("BLACK_TURN").style.textShadow =
  //     "0 0 10px #fff, 0 0 20px #fff, 0 0 42px #0fa, 0 0 82px #0fa,0 0 92px #0fa";
  //   gei("BLACK_TURN").style.color = "white";

  //   gei("WHITE_TURN").style.textShadow = "none";
  //   gei("WHITE_TURN").style.color = "black";
  // }

  let num = 0;
  let container = gei("container");
  container.innerHTML = "";
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      let square = document.createElement("div");
      square.setAttribute("id", `${i}${j}`);

      if (num % 2 !== 0) square.classList.add("black-box");
      else square.classList.add("white-box");

      num++;
      container.appendChild(square);

      var piecetype = currPieceLoacation[`${i}${j}`];

      if (piecesImages[piecetype] != undefined) {
        let img = document.createElement("img");
        img.setAttribute("src", piecesImages[piecetype]);
        img.setAttribute("id", piecetype);
        img.setAttribute("draggable", false);
        gei(`${i}${j}`).appendChild(img);
      }
      if (selected == null) {
        try {
          gei(`${i}${j}`).addEventListener("click", () => {
            checkPiece(`${i}${j}`);
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
    num++;
  }

  pawnPromotion();

  if (blackCheck()) {
    gei(blackKing).style.boxShadow = "0px 0px 0px 0.6vw #8B0000 inset";
    if (flag == true) {
      blackCheckMate();
      if (blackBool == true) {
        document.querySelector(".white-wins").style.display = "block";
      }
    }
  } else {
    document.querySelector(".white-wins").style.display = "none";

    gei(blackKing).style.boxShadow = "none";
  }

  if (whiteCheck()) {
    gei(whiteKing).style.boxShadow = "0px 0px 0px 0.6vw #8B0000 inset";
    if (flag == true) {
      whiteCheckMate();
      if (whiteBool == true) {
        document.querySelector(".black-wins").style.display = "block";
      }
    }
  } else if (flag == true) {
    document.querySelector(".black-wins").style.display = "none";
    gei(whiteKing).style.boxShadow = "none";
  }
}

function checkPiece(id) {
  if (currPieceLoacation[id] != undefined) {
    let pieceType = currPieceLoacation[id];
    let temp = pieceType.split("_");
    let side = temp[0];
    if (count % 2 != 0 && side == "black") {
      eval(`${pieceType}(${id})`);
    } else if (count % 2 == 0 && side == "white") {
      eval(`${pieceType}(${id})`);
    } else {
      console.log("wrong-turn");
    }
  }
}

function checkColor(id) {
  let pieceType = currPieceLoacation[id];
  let temp = pieceType.split("_");
  return temp[0];
}

function white_pawn(id) {
  selected = null;
  load(false);
  if (
    currPieceLoacation[id] == pieceLoacation[id] &&
    selected == null &&
    currPieceLoacation[1 * id - 10] == undefined &&
    currPieceLoacation[1 * id - 20] == undefined
  ) {
    selected = id;

    currPieceLoacation[1 * id - 10] = currPieceLoacation[id];
    temp = currPieceLoacation[id];
    delete currPieceLoacation[id];
    count++;
    if (!whiteCheck()) {
      gei(1 * id - 10).style.boxShadow = "0px 0px 0px 0.6vw aqua inset";
      gei(1 * id - 10).addEventListener("click", () => {
        currPieceLoacation[1 * id - 10] = currPieceLoacation[id];
        temp = currPieceLoacation[id];
        delete currPieceLoacation[id];
        selected = null;
        count++;
        load(true);
      });
    }

    currPieceLoacation[id] = temp;
    delete currPieceLoacation[1 * id - 10];
    count--;

    currPieceLoacation[1 * id - 20] = currPieceLoacation[id];
    temp = currPieceLoacation[id];
    delete currPieceLoacation[id];
    count++;
    if (!whiteCheck()) {
      gei(1 * id - 20).style.boxShadow = "0px 0px 0px 0.6vw aqua inset";
      gei(1 * id - 20).addEventListener("click", () => {
        currPieceLoacation[1 * id - 20] = currPieceLoacation[id];
        temp = currPieceLoacation[id];
        delete currPieceLoacation[id];
        selected = null;
        count++;
        load(true);
      });
    }
    currPieceLoacation[id] = temp;
    delete currPieceLoacation[1 * id - 20];
    count--;
  } else if (selected == null && currPieceLoacation[1 * id - 10] == undefined) {
    selected = id;

    currPieceLoacation[1 * id - 10] = currPieceLoacation[id];
    temp = currPieceLoacation[id];
    delete currPieceLoacation[id];
    count++;
    if (!whiteCheck()) {
      gei(1 * id - 10).style.boxShadow = "0px 0px 0px 0.6vw aqua inset";
      gei(1 * id - 10).addEventListener("click", () => {
        currPieceLoacation[1 * id - 10] = currPieceLoacation[id];
        temp = currPieceLoacation[id];
        delete currPieceLoacation[id];

        selected = null;
        count++;
        load(true);
      });
    }

    currPieceLoacation[id] = temp;
    delete currPieceLoacation[1 * id - 10];
    count--;
  }
  selected = id;
  pawnAttack(id);
}

function black_pawn(id) {
  selected = null;
  load(false);

  if (
    currPieceLoacation[id] == pieceLoacation[id] &&
    selected == null &&
    currPieceLoacation[1 * id + 10] == undefined &&
    currPieceLoacation[1 * id + 20] == undefined
  ) {
    selected = id;
    currPieceLoacation[1 * id + 10] = currPieceLoacation[id];
    temp = currPieceLoacation[id];
    delete currPieceLoacation[id];
    count++;
    if (!blackCheck()) {
      gei(1 * id + 10).style.boxShadow = "0px 0px 0px 0.6vw aqua inset";
      gei(1 * id + 10).addEventListener("click", () => {
        currPieceLoacation[1 * id + 10] = currPieceLoacation[id];
        temp = currPieceLoacation[id];
        delete currPieceLoacation[id];
        selected = null;
        count++;
        load(true);
      });
    }
    currPieceLoacation[id] = temp;
    delete currPieceLoacation[1 * id + 10];

    count--;

    currPieceLoacation[1 * id + 20] = currPieceLoacation[id];
    temp = currPieceLoacation[id];
    delete currPieceLoacation[id];
    count++;

    if (!blackCheck()) {
      gei(1 * id + 20).style.boxShadow = "0px 0px 0px 0.6vw aqua inset";
      gei(1 * id + 20).addEventListener("click", () => {
        currPieceLoacation[1 * id + 20] = currPieceLoacation[id];
        temp = currPieceLoacation[id];
        delete currPieceLoacation[id];
        selected = null;
        count++;
        load(true);
      });
    }
    currPieceLoacation[id] = temp;
    delete currPieceLoacation[1 * id + 20];
    selected = null;
    count--;
  } else if (selected == null && currPieceLoacation[1 * id + 10] == undefined) {
    selected = id;
    currPieceLoacation[1 * id + 10] = currPieceLoacation[id];
    temp = currPieceLoacation[id];
    delete currPieceLoacation[id];
    count++;
    if (!blackCheck()) {
      gei(1 * id + 10).style.boxShadow = "0px 0px 0px 0.6vw aqua inset";
      gei(1 * id + 10).addEventListener("click", () => {
        currPieceLoacation[1 * id + 10] = currPieceLoacation[id];
        temp = currPieceLoacation[id];
        delete currPieceLoacation[id];
        count++;
        selected = null;
        load(true);
      });
    }

    currPieceLoacation[id] = temp;
    delete currPieceLoacation[1 * id + 10];
    selected = null;
    count--;
  }
  selected = id;
  pawnAttack(id);
}

function pawnAttack(id) {
  if (count % 2 != 0 && selected == id) {
    if (currPieceLoacation[1 * id + 9] != undefined) {
      if (checkColor(1 * id + 9) == "white") {
        removed = currPieceLoacation[1 * id + 9];
        currPieceLoacation[1 * id + 9] = currPieceLoacation[id];
        temp = currPieceLoacation[id];
        delete currPieceLoacation[id];
        count++;
        if (!blackCheck()) {
          gei(1 * id + 9).style.boxShadow = "0px 0px 0px 0.6vw red inset";
          gei(1 * id + 9).addEventListener("click", () => {
            removed = currPieceLoacation[1 * id + 9];
            currPieceLoacation[1 * id + 9] = currPieceLoacation[id];
            temp = currPieceLoacation[id];
            delete currPieceLoacation[id];
            selected = null;
            count++;
            load(true);
          });
        }

        currPieceLoacation[id] = temp;
        currPieceLoacation[1 * id + 9] = removed;
        count--;
      }
    }

    if (currPieceLoacation[1 * id + 11] != undefined) {
      checkColor(1 * id + 11);
      if (checkColor(1 * id + 11) == "white") {
        removed = currPieceLoacation[1 * id + 11];
        currPieceLoacation[1 * id + 11] = currPieceLoacation[id];
        temp = currPieceLoacation[id];
        delete currPieceLoacation[id];
        count++;
        if (!blackCheck()) {
          gei(1 * id + 11).style.boxShadow = "0px 0px 0px 0.6vw red inset";
          gei(1 * id + 11).addEventListener("click", () => {
            removed = currPieceLoacation[1 * id + 11];
            currPieceLoacation[1 * id + 11] = currPieceLoacation[id];
            temp = currPieceLoacation[id];
            delete currPieceLoacation[id];
            selected = null;
            count++;
            load(true);
          });
        }

        currPieceLoacation[id] = temp;
        currPieceLoacation[1 * id + 11] = removed;
        count--;
      }
    }
  } else if (selected == id) {
    if (currPieceLoacation[1 * id - 9] != undefined) {
      checkColor(1 * id - 9);
      if (checkColor(1 * id - 9) == "black") {
        removed = currPieceLoacation[1 * id - 9];
        currPieceLoacation[1 * id - 9] = currPieceLoacation[id];
        temp = currPieceLoacation[id];
        delete currPieceLoacation[id];
        count++;
        if (!whiteCheck()) {
          gei(1 * id - 9).style.boxShadow = "0px 0px 0px 0.6vw red inset";
          gei(1 * id - 9).addEventListener("click", () => {
            removed = currPieceLoacation[1 * id - 9];
            currPieceLoacation[1 * id - 9] = currPieceLoacation[id];
            temp = currPieceLoacation[id];
            delete currPieceLoacation[id];

            selected = null;
            count++;
            load(true);
          });
        }
        currPieceLoacation[id] = temp;
        currPieceLoacation[1 * id - 9] = removed;
        count--;
      }
    }

    if (currPieceLoacation[1 * id - 11] != undefined) {
      if (checkColor(1 * id - 11) == "black") {
        removed = currPieceLoacation[1 * id - 11];
        currPieceLoacation[1 * id - 11] = currPieceLoacation[id];
        temp = currPieceLoacation[id];
        delete currPieceLoacation[id];
        count++;
        if (!whiteCheck()) {
          gei(1 * id - 11).style.boxShadow = "0px 0px 0px 0.6vw red inset";
          gei(1 * id - 11).addEventListener("click", () => {
            removed = currPieceLoacation[1 * id - 11];
            currPieceLoacation[1 * id - 11] = currPieceLoacation[id];
            temp = currPieceLoacation[id];
            delete currPieceLoacation[id];

            selected = null;
            count++;
            load(true);
          });
        }
        currPieceLoacation[id] = temp;
        currPieceLoacation[1 * id - 11] = removed;
        count++;
      }
    }
  }
}

function black_rook(id) {
  selected = null;
  load(false);

  for (let i = 1; i <= 8; i++) {
    if (blackRookMovement(1 * id + i * 10, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (blackRookMovement(1 * id + i, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (blackRookMovement(1 * id - i, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (blackRookMovement(1 * id - i * 10, id) == 0) {
      break;
    }
  }
}
  

function blackRookMovement(id, curr) {
  if (tiles[id] != undefined) {
    if (currPieceLoacation[id] == undefined) {
      selected = curr;

      currPieceLoacation[id] = currPieceLoacation[curr];
      temp = currPieceLoacation[curr];
      delete currPieceLoacation[curr];
      count++;
      if (!blackCheck()) {
        gei(id).style.boxShadow = "0px 0px 0px 0.6vw aqua inset";
        gei(id).addEventListener("click", () => {
          currPieceLoacation[id] = currPieceLoacation[curr];
          temp = currPieceLoacation[curr];
          delete currPieceLoacation[curr];
          if (curr == 18) blackKingMoved = true;

          selected = null;
          count++;
          load(true);
        });
      }

      currPieceLoacation[curr] = temp;
      delete currPieceLoacation[id];
      count--;
    } else if (
      currPieceLoacation[id] != undefined &&
      checkColor(id) == "white"
    ) {
      selected = curr;
      removed = currPieceLoacation[id];
      currPieceLoacation[id] = currPieceLoacation[curr];
      temp = currPieceLoacation[curr];
      delete currPieceLoacation[curr];
      count++;

      if (!blackCheck()) {
        gei(id).style.boxShadow = "0px 0px 0px 0.6vw red inset";
        gei(id).addEventListener("click", () => {
          removed = currPieceLoacation[id];
          currPieceLoacation[id] = currPieceLoacation[curr];
          temp = currPieceLoacation[curr];
          delete currPieceLoacation[curr];
          if (curr == 18) blackKingMoved = true;
          selected = null;
          count++;
          load(true);
        });
      }
      currPieceLoacation[curr] = temp;
      currPieceLoacation[id] = removed;
      // if (curr == 18) blackKingMoved = false;
      count--;

      return 0;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
  return 1;
}

function whiteRookMovement(id, curr) {
  if (tiles[id] != undefined) {
    if (currPieceLoacation[id] == undefined) {
      selected = curr;

      currPieceLoacation[id] = currPieceLoacation[curr];
      temp = currPieceLoacation[curr];
      delete currPieceLoacation[curr];
      count++;
      if (!whiteCheck()) {
        gei(id).style.boxShadow = "0px 0px 0px 0.6vw aqua inset";
        gei(id).addEventListener("click", () => {
          currPieceLoacation[id] = currPieceLoacation[curr];
          temp = currPieceLoacation[curr];
          delete currPieceLoacation[curr];
          if (curr == 18) blackKingMoved = true;

          selected = null;
          count++;
          load(true);
        });
      }

      currPieceLoacation[curr] = temp;
      delete currPieceLoacation[id];
      count--;
    } else if (
      currPieceLoacation[id] != undefined &&
      checkColor(id) == "black"
    ) {
      selected = curr;
      removed = currPieceLoacation[id];
      currPieceLoacation[id] = currPieceLoacation[curr];
      temp = currPieceLoacation[curr];
      delete currPieceLoacation[curr];
      count++;

      if (!whiteCheck()) {
        gei(id).style.boxShadow = "0px 0px 0px 0.6vw red inset";
        gei(id).addEventListener("click", () => {
          removed = currPieceLoacation[id];
          currPieceLoacation[id] = currPieceLoacation[curr];
          temp = currPieceLoacation[curr];
          delete currPieceLoacation[curr];
          if (curr == 18) blackKingMoved = true;
          selected = null;
          count++;
          load(true);
        });
      }
      currPieceLoacation[curr] = temp;
      currPieceLoacation[id] = removed;
      count--;

      return 0;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
  return 1;
}

function pawnPromotion() {
  let color = count % 2 == 0 ? "black" : "white";

  for (const key in currPieceLoacation) {
    if (currPieceLoacation[key] == `${color}_pawn`) {
      if (
        (1 * key >= 81 && 1 * key <= 88) ||
        (1 * key >= 11 && 1 * key <= 18)
      ) {
        let value = prompt(
          "ENTER A NUMBER : \n1.bishop\n 2.rook\n3.queen\n4.knight"
        );

        if (value == 1) {
          currPieceLoacation[key] = `${color}_bishop`;
          load(true);
          break;
        }
        if (value == 2) {
          currPieceLoacation[key] = `${color}_rook`;
          load(true);
          break;
        }
        if (value == 3) {
          currPieceLoacation[key] = `${color}_queen`;
          load(true);

          break;
        }
        if (value == 4) {
          currPieceLoacation[key] = `${color}_knight`;
          load(true);
          break;
        }
      }
    }
  }
}

function white_bishop(id) {
  selected = null;
  load(false);
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id + i * 11, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id - i * 11, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id + i * 9, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id - i * 9, id) == 0) {
      break;
    }
  }
}

function black_bishop(id) {
  selected = null;
  load(false);
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id + i * 11, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id - i * 11, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id + i * 9, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id - i * 9, id) == 0) {
      break;
    }
  }
}

function black_queen(id) {
  selected = null;
  load(false);
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id + i * 11, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id - i * 11, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id + i * 9, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id - i * 9, id) == 0) {
      break;
    }
  }
  selected = null;

  for (let i = 1; i <= 8; i++) {
    if (blackRookMovement(1 * id + i * 10, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (blackRookMovement(1 * id + i, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (blackRookMovement(1 * id - i, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (blackRookMovement(1 * id - i * 10, id) == 0) {
      break;
    }
  }
}

function white_queen(id) {
  selected = null;
  load(false);
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id + i * 11, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id - i * 11, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id + i * 9, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (bishopMovement(1 * id - i * 9, id) == 0) {
      break;
    }
  }
  selected = null;
  for (let i = 1; i <= 8; i++) {
    if (whiteRookMovement(1 * id + i * 10, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (whiteRookMovement(1 * id + i, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (whiteRookMovement(1 * id - i, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (whiteRookMovement(1 * id - i * 10, id) == 0) {
      break;
    }
  }
}

function black_king(id) {
  selected = null;
  load(false);

  if (
    currPieceLoacation[12] == undefined &&
    currPieceLoacation[13] == undefined &&
    currPieceLoacation[14] == undefined
  ) {
    let king = currPieceLoacation[id];
    currPieceLoacation[14] = currPieceLoacation[11];
    currPieceLoacation[13] = king;
    delete currPieceLoacation[id];
    delete currPieceLoacation[11];
    count++;
    if (!blackCheck() && !blackKingMoved) {
      gei(id).style.boxShadow = "0px 0px 0px 0.6vw green inset";
      gei(11).style.boxShadow = "0px 0px 0px 0.6vw green inset";
      gei(11).addEventListener("click", () => {
        let king = currPieceLoacation[id];
        currPieceLoacation[14] = currPieceLoacation[11];
        currPieceLoacation[13] = king;
        delete currPieceLoacation[id];
        delete currPieceLoacation[11];
        count++;
        blackKingMoved = true;
        blackKing = 13;

        load(true);
      });
    }

    currPieceLoacation[11] = currPieceLoacation[14];
    currPieceLoacation[id] = king;
    delete currPieceLoacation[14];
    delete currPieceLoacation[13];

    count--;
  }

  if (
    currPieceLoacation[16] == undefined &&
    currPieceLoacation[17] == undefined
  ) {
    let king = currPieceLoacation[id];
    currPieceLoacation[16] = currPieceLoacation[18];
    currPieceLoacation[17] = king;
    delete currPieceLoacation[id];
    delete currPieceLoacation[18];
    count++;
    if (!blackCheck() && !blackKingMoved) {
      gei(id).style.boxShadow = "0px 0px 0px 0.6vw green inset";
      gei(18).style.boxShadow = "0px 0px 0px 0.6vw green inset";
      gei(18).addEventListener("click", () => {
        let king = currPieceLoacation[id];
        currPieceLoacation[16] = currPieceLoacation[18];
        currPieceLoacation[17] = king;
        delete currPieceLoacation[id];
        delete currPieceLoacation[18];
        selected = null;
        count++;
        blackKingMoved = true;
        blackKing = 17;

        load(true);
      });
    }

    currPieceLoacation[18] = currPieceLoacation[16];
    currPieceLoacation[id] = king;
    delete currPieceLoacation[16];
    delete currPieceLoacation[17];

    count--;
  }

  kingMovement(1 * id + 10, id);
  kingMovement(1 * id - 10, id);
  kingMovement(1 * id + 1, id);
  kingMovement(1 * id - 1, id);
  kingMovement(1 * id + 11, id);
  kingMovement(1 * id - 11, id);
  kingMovement(1 * id + 9, id);
  kingMovement(1 * id - 9, id);
}

function white_king(id) {
  selected = null;
  load(false);
  if (
    currPieceLoacation[86] == undefined &&
    currPieceLoacation[87] == undefined
  ) {
    let king = currPieceLoacation[id];
    currPieceLoacation[86] = currPieceLoacation[88];
    currPieceLoacation[87] = king;
    delete currPieceLoacation[id];
    delete currPieceLoacation[88];
    count++;
    if (!whiteCheck() && !whiteKingMoved) {
      gei(id).style.boxShadow = "0px 0px 0px 0.6vw green inset";
      gei(88).style.boxShadow = "0px 0px 0px 0.6vw green inset";
      gei(88).addEventListener("click", () => {
        let king = currPieceLoacation[id];
        currPieceLoacation[86] = currPieceLoacation[88];
        currPieceLoacation[87] = king;
        delete currPieceLoacation[id];
        delete currPieceLoacation[88];
        selected = null;
        count++;
        whiteKingMoved = true;
        whiteKing = 87;

        load(true);
      });
    }

    currPieceLoacation[88] = currPieceLoacation[86];
    currPieceLoacation[id] = king;
    delete currPieceLoacation[86];
    delete currPieceLoacation[87];

    count--;
  }
  if (
    currPieceLoacation[82] == undefined &&
    currPieceLoacation[83] == undefined &&
    currPieceLoacation[84] == undefined
  ) {
    let king = currPieceLoacation[id];
    currPieceLoacation[84] = currPieceLoacation[81];
    currPieceLoacation[83] = king;
    delete currPieceLoacation[id];
    delete currPieceLoacation[81];
    count++;
    if (!whiteCheck() && !whiteKingMoved) {
      gei(id).style.boxShadow = "0px 0px 0px 0.6vw green inset";
      gei(81).style.boxShadow = "0px 0px 0px 0.6vw green inset";
      gei(81).addEventListener("click", () => {
        let king = currPieceLoacation[id];
        currPieceLoacation[84] = currPieceLoacation[81];
        currPieceLoacation[83] = king;
        delete currPieceLoacation[id];
        delete currPieceLoacation[81];
        count++;
        whiteKingMoved = true;
        whiteKing = 83;

        load(true);
      });
    }

    currPieceLoacation[81] = currPieceLoacation[84];
    currPieceLoacation[id] = king;
    delete currPieceLoacation[84];
    delete currPieceLoacation[83];

    count--;
  }
  kingMovement(1 * id + 10, id);
  kingMovement(1 * id - 10, id);
  kingMovement(1 * id + 1, id);
  kingMovement(1 * id - 1, id);
  kingMovement(1 * id + 11, id);
  kingMovement(1 * id - 11, id);
  kingMovement(1 * id + 9, id);
  kingMovement(1 * id - 9, id);
}

function kingMovement(id, curr) {
  let pieceType;
  let temp;
  let side;
  let color = count % 2 == 0 ? "black" : "white";
  let COLOR = count % 2 == 0 ? "white" : "black";

  if (currPieceLoacation[id] == undefined && tiles[id] != undefined) {
    selected = curr;
    temp = currPieceLoacation[curr];
    currPieceLoacation[id] = currPieceLoacation[curr];
    delete currPieceLoacation[curr];
    count++;
    if (COLOR == "white") whiteKing = id;
    else blackKing = id;
    if (!eval(`${COLOR}Check()`)) {
      gei(id).style.boxShadow = "0px 0px 0px 0.6vw aqua inset";
      gei(id).addEventListener("click", () => {
        pieceType = currPieceLoacation[curr];
        temp = pieceType.split("_");
        side = temp[0];
        temp = currPieceLoacation[curr];
        currPieceLoacation[id] = currPieceLoacation[curr];
        delete currPieceLoacation[curr];
        if (side == "white") (whiteKingMoved = true), (whiteKing = id);
        else (blackKing = id), (blackKingMoved = true);

        selected = null;
        count++;
        load(true);
      });
    }
    currPieceLoacation[curr] = temp;
    delete currPieceLoacation[id];
    count--;
    if (COLOR == "white") whiteKing = curr;
    else blackKing = curr;
  } else if (currPieceLoacation[id] != undefined && checkColor(id) == color) {
    selected = id;
    temp = currPieceLoacation[curr];
    removed = currPieceLoacation[id];
    currPieceLoacation[id] = currPieceLoacation[curr];
    delete currPieceLoacation[curr];
    count++;
    if (COLOR == "white") whiteKing = id;
    else blackKing = id;
    if (COLOR == "white") whiteKing = id;
    else blackKing = id;

    if (!eval(`${COLOR}Check()`)) {
      gei(id).style.boxShadow = "0px 0px 0px 0.6vw red inset";
      gei(id).addEventListener("click", () => {
        temp = currPieceLoacation[curr];
        removed = currPieceLoacation[id];
        currPieceLoacation[id] = currPieceLoacation[curr];
        delete currPieceLoacation[curr];
        pieceType = currPieceLoacation[id];
        temp = pieceType.split("_");
        side = temp[0];
        if (side == "white") (whiteKingMoved = true), (whiteKing = id);
        else (blackKing = id), (blackKingMoved = true);
        selected = null;
        count++;
        load(true);
      });
    }
    currPieceLoacation[curr] = temp;
    currPieceLoacation[id] = removed;
    count++;
    if (COLOR == "white") whiteKing = curr;
    else blackKing = curr;
  }
}

function bishopMovement(id, curr) {
  let color = count % 2 == 0 ? "black" : "white";
  let COLOR = count % 2 == 0 ? "white" : "black";

  if (tiles[id] != undefined) {
    if (currPieceLoacation[id] == undefined) {
      selected = curr;

      temp = currPieceLoacation[curr];
      currPieceLoacation[id] = currPieceLoacation[curr];
      delete currPieceLoacation[curr];
      count++;

      if (!eval(`${COLOR}Check()`)) {
        gei(id).style.boxShadow = "0px 0px 0px 0.6vw aqua inset";
        gei(id).addEventListener("click", () => {
          temp = currPieceLoacation[curr];
          currPieceLoacation[id] = currPieceLoacation[curr];
          delete currPieceLoacation[curr];

          selected = null;
          count++;
          load(true);
        });
      }
      currPieceLoacation[curr] = temp;
      delete currPieceLoacation[id];
      count--;
    } else if (currPieceLoacation[id] != undefined && checkColor(id) == color) {
      selected = curr;
      temp = currPieceLoacation[curr];
      removed = currPieceLoacation[id];
      currPieceLoacation[id] = currPieceLoacation[curr];
      delete currPieceLoacation[curr];
      count++;
      if (!eval(`${COLOR}Check()`)) {
        gei(id).style.boxShadow = "0px 0px 0px 0.6vw red inset";
        gei(id).addEventListener("click", () => {
          temp = currPieceLoacation[curr];
          removed = currPieceLoacation[id];
          currPieceLoacation[id] = currPieceLoacation[curr];
          delete currPieceLoacation[curr];
          selected = null;
          count++;
          load(true);
        });
      }
      currPieceLoacation[curr] = temp;
      currPieceLoacation[id] = removed;
      count--;

      return 0;
    } else {
      return 0;
    }
  } else {
    return 0;
  }

  return 1;
}

function white_rook(id) {
  selected = null;
  load(false);

  for (let i = 1; i <= 8; i++) {
    if (whiteRookMovement(1 * id + i * 10, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (whiteRookMovement(1 * id + i, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (whiteRookMovement(1 * id - i, id) == 0) {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (whiteRookMovement(1 * id - i * 10, id) == 0) {
      break;
    }
  }
}

function black_knight(id) {
  selected = null;
  load(false);

  selected = null;

  knightMovement(1 * id - 12, id);
  knightMovement(1 * id - 8, id);
  knightMovement(1 * id - 21, id);
  knightMovement(1 * id - 19, id);
  knightMovement(1 * id + 12, id);
  knightMovement(1 * id + 8, id);
  knightMovement(1 * id + 21, id);
  knightMovement(1 * id + 19, id);
}

function white_Knight(id) {
  selected = null;
  load(false);

  knightMovement(1 * id - 12, id);
  knightMovement(1 * id - 8, id);
  knightMovement(1 * id - 21, id);
  knightMovement(1 * id - 19, id);
  knightMovement(1 * id + 12, id);
  knightMovement(1 * id + 8, id);
  knightMovement(1 * id + 21, id);
  knightMovement(1 * id + 19, id);
}

function knightMovement(id, curr) {
  let color = count % 2 == 0 ? "black" : "white";
  let COLOR = count % 2 == 0 ? "white" : "black";
  if (tiles[id] != undefined) {
    if (currPieceLoacation[id] == undefined) {
      selected = curr;
      temp = currPieceLoacation[curr];
      currPieceLoacation[id] = currPieceLoacation[curr];
      delete currPieceLoacation[curr];
      count++;

      if (!eval(`${COLOR}Check()`)) {
        gei(id).style.boxShadow = "0px 0px 0px 0.6vw aqua inset";
        gei(id).addEventListener("click", () => {
          temp = currPieceLoacation[curr];
          currPieceLoacation[id] = currPieceLoacation[curr];
          delete currPieceLoacation[curr];

          selected = null;
          count++;
          load(true);
        });
      }
      currPieceLoacation[curr] = temp;
      delete currPieceLoacation[id];
      count--;
    } else if (currPieceLoacation[id] != undefined && checkColor(id) == color) {
      selected = curr;

      temp = currPieceLoacation[curr];
      removed = currPieceLoacation[id];
      currPieceLoacation[id] = currPieceLoacation[curr];
      delete currPieceLoacation[curr];
      count++;
      if (!eval(`${COLOR}Check()`)) {
        gei(id).style.boxShadow = "0px 0px 0px 0.6vw red inset";
        gei(id).addEventListener("click", () => {
          temp = currPieceLoacation[curr];
          removed = currPieceLoacation[id];
          currPieceLoacation[id] = currPieceLoacation[curr];
          delete currPieceLoacation[curr];

          selected = null;
          count++;
          load(true);
        });
      }

      currPieceLoacation[curr] = temp;
      currPieceLoacation[id] = removed;
      count--;
    }
  }
}

function blackCheck() {
  let id = blackKing;

  let index = [-12, -8, -21, -19, 12, 8, 21, 19];
  for (const i of index) {
    if (
      tiles[1 * id + i * 1] != undefined &&
      currPieceLoacation[1 * id + i * 1] != undefined
    ) {
      if (currPieceLoacation[1 * id + i * 1] == "white_Knight") return true;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id + i * 11] != undefined) {
      if (currPieceLoacation[1 * id + i * 11] == undefined) {
      } else if (
        currPieceLoacation[1 * id + i * 11] != undefined &&
        checkColor(1 * id + i * 11) == "white"
      ) {
        let pieceType = currPieceLoacation[1 * id + i * 11];
        if (pieceType == "white_queen") {
          return true;
        }

        if (
          pieceType == "white_bishop" ||
          (pieceType == "white_pawn" && id - (1 * id + i * 11) == -9) ||
          id - (1 * id + i * 11) == -11
        )
          return true;
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id + i * 9] != undefined) {
      if (currPieceLoacation[1 * id + i * 9] == undefined) {
      } else if (
        currPieceLoacation[1 * id + i * 9] != undefined &&
        checkColor(1 * id + i * 9) == "white"
      ) {
        let pieceType = currPieceLoacation[1 * id + i * 9];

        if (
          pieceType == "white_queen" ||
          pieceType == "white_bishop" ||
          (pieceType == "white_pawn" && id - (1 * id + i * 11) == -9) ||
          id - (1 * id + i * 11) == -11
        ) {
          return true;
        }
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id + i * 10] != undefined) {
      if (currPieceLoacation[1 * id + i * 10] == undefined) {
      } else if (
        currPieceLoacation[1 * id + i * 10] != undefined &&
        checkColor(1 * id + i * 10) == "white"
      ) {
        let pieceType = currPieceLoacation[1 * id + i * 10];

        if (pieceType == "white_queen" || pieceType == "white_rook")
          return true;
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id - i * 10] != undefined) {
      if (currPieceLoacation[1 * id - i * 10] == undefined) {
      } else if (
        currPieceLoacation[1 * id - i * 10] != undefined &&
        checkColor(1 * id - i * 10) == "white"
      ) {
        let pieceType = currPieceLoacation[1 * id - i * 10];

        if (pieceType == "white_queen" || pieceType == "white_rook")
          return true;
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id - i * 11] != undefined) {
      if (currPieceLoacation[1 * id - i * 11] == undefined) {
      } else if (
        currPieceLoacation[1 * id - i * 11] != undefined &&
        checkColor(1 * id - i * 11) == "white"
      ) {
        let pieceType = currPieceLoacation[1 * id - i * 11];

        if (pieceType == "white_queen" || pieceType == "white_bishop")
          return true;
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id - i * 9] != undefined) {
      if (currPieceLoacation[1 * id - i * 9] == undefined) {
      } else if (
        currPieceLoacation[1 * id - i * 9] != undefined &&
        checkColor(1 * id - i * 9) == "white"
      ) {
        let pieceType = currPieceLoacation[1 * id - i * 9];

        if (pieceType == "white_queen" || pieceType == "white_bishop")
          return true;
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id + i] != undefined) {
      if (currPieceLoacation[1 * id + i] == undefined) {
      } else if (
        currPieceLoacation[1 * id + i] != undefined &&
        checkColor(1 * id + i) == "white"
      ) {
        let pieceType = currPieceLoacation[1 * id + i];

        if (pieceType == "white_queen" || pieceType == "white_rook")
          return true;
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id - i] != undefined) {
      if (currPieceLoacation[1 * id - i] == undefined) {
      } else if (
        currPieceLoacation[1 * id - i] != undefined &&
        checkColor(1 * id - i) == "white"
      ) {
        let pieceType = currPieceLoacation[1 * id - i];

        if (pieceType == "white_queen" || pieceType == "white_rook")
          return true;
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return false;
}

function whiteCheck() {
  let id = whiteKing;

  let index = [-12, -8, -21, -19, 12, 8, 21, 19];
  for (const i of index) {
    if (
      tiles[1 * id + i] != undefined &&
      currPieceLoacation[1 * id + i] != undefined
    ) {
      if (currPieceLoacation[1 * id + i] == "black_knight") return true;
    }
  }

  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id + i * 11] != undefined) {
      if (currPieceLoacation[1 * id + i * 11] == undefined) {
      } else if (
        currPieceLoacation[1 * id + i * 11] != undefined &&
        checkColor(1 * id + i * 11) == "black"
      ) {
        let pieceType = currPieceLoacation[1 * id + i * 11];

        if (pieceType == "black_queen" || pieceType == "black_bishop")
          return true;

        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id + i * 9] != undefined) {
      if (currPieceLoacation[1 * id + i * 9] == undefined) {
      } else if (
        currPieceLoacation[1 * id + i * 9] != undefined &&
        checkColor(1 * id + i * 9) == "black"
      ) {
        let pieceType = currPieceLoacation[1 * id + i * 9];

        if (pieceType == "black_queen" || pieceType == "black_bishop")
          return true;

        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id + i * 10] != undefined) {
      if (currPieceLoacation[1 * id + i * 10] == undefined) {
      } else if (
        currPieceLoacation[1 * id + i * 10] != undefined &&
        checkColor(1 * id + i * 10) == "black"
      ) {
        let pieceType = currPieceLoacation[1 * id + i * 10];

        if (pieceType == "black_queen" || pieceType == "black_rook")
          return true;

        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id - i * 10] != undefined) {
      if (currPieceLoacation[1 * id - i * 10] == undefined) {
      } else if (
        currPieceLoacation[1 * id - i * 10] != undefined &&
        checkColor(1 * id - i * 10) == "black"
      ) {
        let pieceType = currPieceLoacation[1 * id - i * 10];

        if (pieceType == "black_queen" || pieceType == "black_rook")
          return true;
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id - i * 11] != undefined) {
      if (currPieceLoacation[1 * id - i * 11] == undefined) {
      } else if (
        currPieceLoacation[1 * id - i * 11] != undefined &&
        checkColor(1 * id - i * 11) == "black"
      ) {
        let pieceType = currPieceLoacation[1 * id - i * 11];

        if (pieceType == "black_queen" || pieceType == "black_bishop")
          return true;
        // 85   -> 76 74
        if (
          (pieceType == "black_pawn" && id - (1 * id - i * 11) == 11) ||
          id - (1 * id - i * 11) == 9
        )
          return true;
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id - i * 9] != undefined) {
      if (currPieceLoacation[1 * id - i * 9] == undefined) {
      } else if (
        currPieceLoacation[1 * id - i * 9] != undefined &&
        checkColor(1 * id - i * 9) == "black"
      ) {
        let pieceType = currPieceLoacation[1 * id - i * 9];
        if (pieceType == "black_queen" || pieceType == "black_bishop")
          return true;
        if (
          (pieceType == "black_pawn" && id - (1 * id - i * 11) == 9) ||
          id - (1 * id - i * 11) == 11
        )
          return true;
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id + i] != undefined) {
      if (currPieceLoacation[1 * id + i] == undefined) {
      } else if (
        currPieceLoacation[1 * id + i] != undefined &&
        checkColor(1 * id + i) == "black"
      ) {
        let pieceType = currPieceLoacation[1 * id + i];

        if (pieceType == "black_queen" || pieceType == "black_rook")
          return true;
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i <= 8; i++) {
    if (tiles[1 * id - i] != undefined) {
      if (currPieceLoacation[1 * id - i] == undefined) {
      } else if (
        currPieceLoacation[1 * id - i] != undefined &&
        checkColor(1 * id - i) == "black"
      ) {
        let pieceType = currPieceLoacation[1 * id - i];

        if (pieceType == "black_queen" || pieceType == "black_rook")
          return true;
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return false;
}

function recreateNode(el, withChildren) {
  if (withChildren) {
    el.parentNode.replaceChild(el.cloneNode(true), el);
  } else {
    var newEl = el.cloneNode(false);
    while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
    el.parentNode.replaceChild(newEl, el);
  }
}

function blackCheckMate() {
  blackBool = undefined;
  for (const key in currPieceLoacation) {
    if (currPieceLoacation[key] != undefined) {
      let piecetype = currPieceLoacation[key];
      if (
        piecetype == "black_pawn" ||
        piecetype == "black_rook" ||
        piecetype == "black_knight" ||
        piecetype == "black_bishop" ||
        piecetype == "black_queen" ||
        piecetype == "black_king"
      ) {
        gei(key).click();

        for (let i = 1; i <= 8; i++) {
          for (let j = 1; j <= 8; j++) {
            if (
              gei(`${i}${j}`).style.boxShadow == "aqua 0px 0px 0px 0.6vw inset" ||
              gei(`${i}${j}`).style.boxShadow == "red 0px 0px 0px 0.6vw inset"
            ) {
              gei(`${i}${j}`).style.boxShadow = "none";
              recreateNode(document.getElementById(`${i}${j}`), true);
              blackBool = false;
            }
          }
        }
      }
    }
  }

  selected = null;

  if (blackBool == undefined) blackBool = true;
}

function whiteCheckMate() {
  whiteBool = undefined;
  for (const key in currPieceLoacation) {
    if (currPieceLoacation[key] != undefined) {
      let piecetype = currPieceLoacation[key];
      if (
        piecetype == "white_pawn" ||
        piecetype == "white_rook" ||
        piecetype == "white_knight" ||
        piecetype == "white_bishop" ||
        piecetype == "white_queen" ||
        piecetype == "white_king"
      ) {
        gei(key).click();

        for (let i = 1; i <= 8; i++) {
          for (let j = 1; j <= 8; j++) {
            if (
              gei(`${i}${j}`).style.boxShadow == "aqua 0px 0px 0px 0.6vw inset" ||
              gei(`${i}${j}`).style.boxShadow == "red 0px 0px 0px 0.6vw inset"
            ) {
              gei(`${i}${j}`).style.boxShadow = "none";
              recreateNode(document.getElementById(`${i}${j}`), true);
              whiteBool = false;
            }
          }
        }
      }
    }
  }

  selected = null;

  if (whiteBool == undefined) whiteBool = true;
}

load(false);

gei("btn").addEventListener("click", () => {
  location.reload();
});
