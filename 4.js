let classSelector = ".chessboard";
let classElements = document.getElementsByTagName("td");

let startActive = function() {
  //Инициализируем пустой массив возможных ходов конем
  let possibleCoordinates = [];

  //Текущая выбранная клетка
  var cell = this.id;
  console.log(cell);

  //Удаляем предыдущие выделенные клетки
  for (var i = 0; i < classElements.length; i++) {
    classElements[i].classList.remove("chessboard-current");
    classElements[i].classList.remove("chessboard-blue");
    classElements[i].classList.add("chessboard");
  }

  //Выделяем нажатую клетку
  this.classList.remove("chessboard");
  this.classList.add("chessboard-blue");

  //Массив координат по оси Х
  const xCoordinates = ["A", "B", "C", "D", "E", "F", "G", "H"];

  //Берем первый символ введенного значения (букву),
  //смотрим, каков индекс этой буквы в массиве xCoordinates
  //добавляем единицу и получаем цифровую координату этой буквы
  const cellX = xCoordinates.indexOf(cell[0]) + 1;
  const cellY = parseInt(cell[1]); //Координата по оси Y

  //Запишем все возможные позиции по оси Х в массив
  //Позиция по оси Х должна быть больше нуля и меньше 9
  //Поэтому фильтруем массив из всех возможных значений
  let cellXpositions = [cellX + 2, cellX - 2, cellX + 1, cellX - 1].filter(
    cellPosition => cellPosition > 0 && cellPosition < 9
  );

  //Проделаем то же самое по оси Y
  var cellYpositions = [cellY + 2, cellY - 2, cellY + 1, cellY - 1].filter(
    cellPosition => {
      return cellPosition > 0 && cellPosition < 9;
    }
  );

  //Теперь у нас 2 разных массива: для оси Х и Y
  //Нужно перебрать в циклах все возможные комбинации и записать их в окончательный массив
  //Но так как конь не может сходить на 2 клетки вправа и на 2 вверх, или на одну влево
  //и на одну вниз, нужно отфильтровать лишние варианты при помощи суммы перемещений по оси Х и Y
  //Сумма перемещений за один ход должна быть строго 3 клетки
  for (let i = 0; i < cellXpositions.length; i++) {
    for (let j = 0; j < cellYpositions.length; j++) {
      if (
        Math.abs(cellX - cellXpositions[i]) +
          Math.abs(cellY - cellYpositions[j]) ===
        3
      ) {
        //Записываем только те координаты, которых еще нет в массиве
        if (
          !possibleCoordinates.includes([cellXpositions[i], cellYpositions[j]])
        )
          possibleCoordinates.push(
            [
              xCoordinates[cellXpositions[i] - 1], //сразу конвертируем цифры в буквы
              cellYpositions[j]
            ].join("") //объединяем оси X и Y
          );
      }
    }
  }
  // alert(`Возможные варианты хода: ${possibleCoordinates}`);

  //Отображаем возможные варианты хода
  for (let i = 0; i < possibleCoordinates.length; i++) {
    document
      .getElementById(possibleCoordinates[i])
      .classList.remove("chessboard");

    document
      .getElementById(possibleCoordinates[i])
      .classList.add("chessboard-current");
  }
};

for (let i = 0; i < classElements.length; i++) {
  classElements[i].addEventListener("mousedown", startActive);
}

function knightMove() {}
