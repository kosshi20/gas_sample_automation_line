/**
 * タイトル行の項目名の列のインデックス(列番号 -1)を取得
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - タイトル行の項目名の列のインデックスを取得するシート
 * @param {number} headerRow - ヘッダーの列番号
 * @param {number} lastCol - 最終列の番号
 * @param {Object} header - ヘッダーの項目が入ったオブジェクト
 * @return {Object} - ヘッダーのタイトル名と列番号のオブジェクト
 */
function getColumnMap(sheet, headerRow, lastCol, header) {
  // タイトルの項目を取得
  const headers = sheet.getRange(headerRow, 1, 1, lastCol).getValues().flat();

  const map = {};

  for (const [key, value] of Object.entries(header)) {
    // 表のタイトルに対応した位置をオブジェクトで使用できるようにする
    // 表のタイトルが何番目にあるか取得
    const index = headers.indexOf(value);

    if (index !== -1) {
      // 該当のタイトルがあれば、そのタイトルが何列目かをオブジェクトにする
      map[key] = index;
    }
  }
  return map;
}


/**
 * 補助関数：エラー通知
 * @param {Object} props - スクリプトプロパティ
 * @param {Object} err - エラー時のメッセージ
 */
function sendErrorToSlack(props, err) {
  const url = props[CONFIG.PROPS.ERR_SLACK_WEBHOOK_URL];
  if (!url) return;

  const message = `【LINE自動送信】エラーが発生しました:\n${err.stack}`;

  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify({ "text": message })
  };

  try {
    UrlFetchApp.fetch(url, options);

  } catch (e) {
    console.error(`Slackへのメッセージ送信時にエラーが発生しました: ${e.message}`);
  }
}