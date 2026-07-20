// リッチメニューを作成して表示するために実行する関数
function createRichMenu() {
  const props = PropertiesService.getScriptProperties().getProperties();

  // リッチメニューの名前
  const richMenuName = CONFIG.LABELS.RICH_MENU_NAME.DEFAULT;

  // 画像ファイルのIDを取得
  const imageId = props[CONFIG.PROPS.DEFAULT_IMAGE_ID];

  // Messaging APIのチャネルアクセストークン(長期)を取得
  const channelAccessToken = props[CONFIG.PROPS.LINE_CHANNEL_ACCESS_TOKEN];

  // LINE IDを取得
  const lineId = props[CONFIG.PROPS.LINE_ID];

  // 各関数間で持ち回る共通のデータを定義
  const config = {
    props: props,
    channelAccessToken: channelAccessToken,
    lineId: lineId,
    richMenuName: richMenuName,
    imageId: imageId
  };

  // デフォルトのリッチメニューのエリアを作成する
  CreateRichMenuArea.defaultRichMenuArea(config);

  // リッチメニューを作成してIDを取得する
  CreateRichMenu.getRichMenuId(config, CONFIG.LABELS.RICH_MENU_SIZE.SMALL);

  // リッチメニュー用の画像をアップロードする
  CreateRichMenu.imageUpload(config);

  // メインのリッチメニューをデフォルトにする
  CreateRichMenu.defaultRichMenu(config);
}