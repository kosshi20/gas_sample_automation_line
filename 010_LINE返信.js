/**
 * @param {Object} e - LINE受信時のイベントオブジェクト
 */
function doPost(e) {
  const props = PropertiesService.getScriptProperties().getProperties();

  try {
    // 送られてきたイベントデータを取得
    const event = JSON.parse(e.postData.contents).events[0];

    // イベントタイプを取得
    const eventType = event.type;

    if (eventType !== "message") return;

    // 各関数間で持ち回る共通のデータを定義
    const config = {
      props: props,
      event: event
    };

    if (event.message.type === "text") {
      // イベントタイプがメッセージの場合
      MessageEvent.handleMessageEvent(config);
    }

  } catch (err) {
    sendErrorToSlack(props, err);
  }
}