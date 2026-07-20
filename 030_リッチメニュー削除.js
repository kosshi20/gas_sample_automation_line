// すべてのリッチメニューを削除するために実行する関数
function deleteRichMenu() {
  const props = PropertiesService.getScriptProperties().getProperties();

  // Messaging APIのチャネルアクセストークン(長期)を取得
  const channelAccessToken = props[CONFIG.PROPS.LINE_CHANNEL_ACCESS_TOKEN];

  // リッチメニューの数を取得する
  const numRichMenu = DeleteRichMenu.getNumRichMenu(channelAccessToken);

  // リッチメニューが0のときは処理を終える
  if (!numRichMenu) {
    return;
  }

  // デフォルトのリッチメニューを解除するためのメソッドを呼び出す
  DeleteRichMenu.cancellationDefaultRichMenu(channelAccessToken);

  for (let i = numRichMenu - 1; i >= 0; i--) {
    // リッチメニュー分の数だけIDを取得して、リッチメニューを削除する
    // 削除するリッチメニューのIDを取得する
    const richMenuId = DeleteRichMenu.getRichMenuId(channelAccessToken, i);

    // リッチメニューを削除するためのメソッドを呼び出す
    DeleteRichMenu.deleteRichMenu(channelAccessToken, richMenuId);
  }
}