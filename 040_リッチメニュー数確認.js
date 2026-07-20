// リッチメニュー数を取得するための関数
function getNumRichMenu() {
  const props = PropertiesService.getScriptProperties().getProperties();

  // Messaging APIのチャネルアクセストークン(長期)を取得
  const channelAccessToken = props[CONFIG.PROPS.LINE_CHANNEL_ACCESS_TOKEN];

  // リッチメニューの数を取得する
  const numRichMenu = DeleteRichMenu.getNumRichMenu(channelAccessToken);

  console.log(numRichMenu);
}