<h1 align="center">Minesweeper</h1>

**Task:** [RSS Minesweeper](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/minesweeper/README.md)

**Deploy:** [Minesweeper](https://kzhukow.github.io/minesweeper/)

**Evaluation criteria:**
- [x] Basic scope
> - [x] layout, design, responsive UI
> - [x] at the beginning state of the game, the frame has size 10x10 and is filled with unopened cells. Should be 10 mines on field by default
> - [x] when user click on cells - it should be opened and marked as one of the following state: empty cell, cell with number, or cell with mine
> - [x] the game should end when the player reveals all cells that do not contain mines (win) or clicks on mine (lose) and related message is displayed at the end of the game

- [x] Advanced scope
> - [x] mines are placed after the first move, so that user cannot lose on the first move.
> - [x] user can mark “mined” cells using flags so as not to accidentally open them displaying the number of mines remaining and displaying number of used flags
> - [x] the game should use color coding (using numbers and colors) to indicate the number of mines surrounding a revealed cell
> - [x] the game can be restarted without reloading the page
> - [x] game duration and number of clicks are displayed
> - [x] when user opens a square that does not touch any mines, it will be empty and the adjacent squares will automatically open in all directions until reaching squares that contain numbers

- [x] Hacker scope
> - [x] sound accompaniment (on/off) when clicking on cell and at the end of the game
> - [x] implement ability to change the size (easy - 10x10, medium - 15x15, hard - 25x25) and number of mines for each size of the field (from 10 to 99):
> - [x] implemented saving the latest 10 results using LocalStorage
> - [x] implemented saving the state of the game
> - [x] option to choose different themes for the game board (dark/light themes)