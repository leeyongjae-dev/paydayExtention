// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // 현재 날짜를 생성합니다.
  var currentDate = new Date();

  // 다음 달의 날짜를 계산합니다.
  var nextMonth =
    currentDate.getDate() > 10
      ? currentDate.getMonth() + 1
      : currentDate.getMonth();
  var nextMonthDate = new Date(currentDate.getFullYear(), nextMonth, 1); // 다음 달의 1일을 구합니다.

  // 다음 달의 해당 날짜를 설정합니다. (예: 10일로 설정) 0 : 일 / 6: 토
  let payday;
  if (nextMonthDate.getDay() === 0) {
    payday = 8;
  } else if (nextMonthDate.getDay() === 6) {
    payday = 9;
  } else {
    payday = 10;
  }
  nextMonthDate.setDate(payday);

  // 다음 달의 해당 날짜까지의 시간 차이를 계산합니다.
  var timeDifference = Math.abs(
    nextMonthDate.getTime() - currentDate.getTime()
  );

  // 날짜 차이를 일로 변환합니다.
  var secondsDifference = Math.floor(timeDifference / 1000);
  var minutesDifference = Math.floor(secondsDifference / 60);
  var hoursDifference = Math.floor(minutesDifference / 60);
  var daysDifference = Math.floor(hoursDifference / 24);

  let message;
  if (currentDate.getDate() === payday) {
    message = "[P A Y D A Y]";
  } else {
    message = "[다음 월급까지 " + daysDifference + "일 남았습니다.]";
  }

  let disposable = vscode.commands.registerCommand("lee.payday", function () {
    // The code you place here will be executed every time your command is executed
    vscode.window.setStatusBarMessage(message);

    setTimeout(function () {
      vscode.window.setStatusBarMessage("");
    }, 5000);
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
