/**
 * @typedef {Object} MessageEventConfig
 * @property {Object} props
 * @property {Object} event
 * @property {Object} colMap
 */

const MessageEvent = {
  /**
   * メッセージ(message)イベントを処理する
   * @param {MessageEventConfig} config
   */
  handleMessageEvent(config) {
    // メッセージを取得
    const userMessage = config.event.message.text;

    // 語句一覧のシートを取得
    const ss = SpreadsheetApp.openById(config.props[CONFIG.PROPS.LINE_SS_ID]);
    const sheet = ss.getSheetByName(CONFIG.SHEETS.WORDS_LIST);

    const lastCol = sheet.getLastColumn();

    config.colMap = getColumnMap(sheet, CONFIG.TABLE.WORDS_LIST.HEADER_ROW, lastCol, CONFIG.HEADER.WORDS_LIST);

    const lastRow = sheet.getLastRow();

    const wordsList = sheet.getRange(CONFIG.TABLE.WORDS_LIST.DATA_START_ROW, 1, lastRow - CONFIG.TABLE.WORDS_LIST.HEADER_ROW, lastCol).getValues();

    const lineMessages = [];

    // 語句一覧のループ
    for (const words of wordsList) {
      // 語句が最大値に達したら終了
      if (lineMessages.length >= CONFIG.LABELS.MAX_REPLY_MESSAGES) break;

      const keyword = words[config.colMap.KEYWORD];
      const isMatchType = words[config.colMap.MATCH_TYPE];

      // 完全一致または部分一致の判定
      const isMatch = (userMessage === keyword) || (isMatchType && userMessage.includes(keyword));
      if (!isMatch) continue;

      // メッセージオブジェクトの組み立て
      const replyObj = this._buildMessageObject(config, words);

      if (replyObj) {
        lineMessages.push(replyObj);
      }
    }

    // 該当するメッセージがなければオウム返し
    if (lineMessages.length === 0) {

      const replyObj = { "type": CONFIG.LABELS.MESSAGE_TYPE.TEXT_V2, "text": userMessage };

      lineMessages.push(replyObj);
    }

    this._sendLineReply(config, lineMessages);
  },

  /**
   * 各メッセージタイプに応じたLINE専用のオブジェクトを組み立てる (内部関数)
   * @param {MessageEventConfig} config
   * @param {Object[]} words - 該当語句の情報
   * @return {Object} - LINE送信するためのオブジェクト
   */
  _buildMessageObject(config, words) {
    // ドライブのメディア直リンク生成用の関数
    const getDlUrl = (id) => `https://drive.google.com/uc?export=download&id=${id}`;

    const type = words[config.colMap.MESSAGE_TYPE];

    switch (type) {
      case CONFIG.LABELS.MESSAGE_TYPE.TEXT: {
        // テキストメッセージ
        return words[config.colMap.QUICK_REPLY] ? { "type": type, "text": words[config.colMap.REPLY_TEXT], "quickReply": JSON.parse(words[config.colMap.QUICK_REPLY]) } : { "type": type, "text": words[config.colMap.REPLY_TEXT] };
      }

      case CONFIG.LABELS.MESSAGE_TYPE.TEXT_V2: {
        // テキストメッセージ(新バージョン)
        return words[config.colMap.SUBSTITUTION] ? { "type": type, "text": words[config.colMap.REPLY_TEXT], "substitution": JSON.parse(words[config.colMap.SUBSTITUTION]) } : { "type": type, "text": words[config.colMap.REPLY_TEXT] };
      }

      case CONFIG.LABELS.MESSAGE_TYPE.TEMPLATE: {
        // テンプレートメッセージ
        return { "type": type, "altText": "テンプレートメッセージ", "template": JSON.parse(words[config.colMap.REPLY_TEXT]) };
      }

      case CONFIG.LABELS.MESSAGE_TYPE.STICKER: {
        // スタンプメッセージ
        return { "type": type, "packageId": words[config.colMap.STAMP_PACKAGE_ID], "stickerId": words[config.colMap.STAMP_STICKER_ID] };
      }


      case CONFIG.LABELS.MESSAGE_TYPE.IMAGE:
      case CONFIG.LABELS.MESSAGE_TYPE.VIDEO: {
        // 画像または動画メッセージ
        return { "type": type, "originalContentUrl": getDlUrl(words[config.colMap.FILE_ID]), "previewImageUrl": getDlUrl(words[config.colMap.PREVIEW_IMAGE_ID]) };
      }

      case CONFIG.LABELS.MESSAGE_TYPE.AUDIO: {
        // 音声メッセージ
        return { "type": type, "originalContentUrl": getDlUrl(words[config.colMap.FILE_ID]), "duration": words[config.colMap.DURATION] };
      }

      case CONFIG.LABELS.MESSAGE_TYPE.LOCATION: {
        // 位置情報メッセージ
        return { "type": type, "title": words[config.colMap.MAP_INFO_TITLE], "address": words[config.colMap.ADDRESS], "latitude": words[config.colMap.LATITUDE], "longitude": words[config.colMap.LONGITUDE] };
      }

      default: {
        console.error(`未知のメッセージタイプです: ${type}`);
        return null;
      }
    }
  },

  /**
   * LINE返信 (内部関数)
   * @param {MessageEventConfig} config
   * @param {Object[]} lineMessages - LINE返信用のオブジェクトを入れた配列
   */
  _sendLineReply(config, lineMessages) {
    // Messaging APIのチャネルアクセストークン(長期)を取得
    const channelAccessToken = config.props[CONFIG.PROPS.LINE_CHANNEL_ACCESS_TOKEN];

    // 応答用Tokenを取得
    const replyToken = config.event.replyToken;

    // Messaging APIを利用するためのURLを取得
    const url = "https://api.line.me/v2/bot/message/reply";

    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${channelAccessToken}`
    };

    const payload = {
      "replyToken": replyToken,
      "messages": lineMessages
    };

    const options = {
      "method": "post",
      "headers": headers,
      "payload": JSON.stringify(payload)
    };

    try {
      UrlFetchApp.fetch(url, options);

    } catch (e) {
      console.error(`LINE返信時にエラーが発生しました: ${e.stack}`);
    }
  }
};