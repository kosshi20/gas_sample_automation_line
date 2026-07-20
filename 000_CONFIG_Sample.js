/**
 * =====================================================================
 * 【設定エリア】ここを変更することでプログラムの動きを調整できます
 * ■ 変更のルール
 * ・変更するのは、コロン(:)の「右側」にある、""(ダブルクォーテーション)で囲まれた文字や数字だけです。
 * ・コロンの「左側」や「{」「}」などの記号はプログラムの構造ですので、変更しないように注意してください。
 * 例：AFFILIATION: "所属" ←"所属"の部分だけを書き換えます
 * =====================================================================
 */

const CONFIG = {
  // スプレッドシートの見出し名 (タイトルと完全に一致させる)
  // これにより、列の順番が変わっても自動で変更可
  HEADER: {
    // 語句一覧
    WORDS_LIST: {
      KANA: "かな",
      KEYWORD: "受信語句",
      MATCH_TYPE: "部分一致",
      MESSAGE_TYPE: "タイプ",
      REPLY_TEXT: "返信語句",
      SUBSTITUTION: "テキストの置換え",
      QUICK_REPLY: "クイックリプライ",
      STAMP_PACKAGE_ID: "スタンプのパッケージID",
      STAMP_STICKER_ID: "スタンプのステッカーID",
      FILE_ID: "画像・動画・音声ファイルのID",
      PREVIEW_IMAGE_ID: "プレビュー画像のID",
      DURATION: "音声ファイルの長さ(ミリ秒)",
      MAP_INFO_TITLE: "地図情報のタイトル",
      ADDRESS: "住所",
      LATITUDE: "緯度",
      LONGITUDE: "経度"
    }
  },

  // スプレッドシートのレイアウト(列番号)の設定
  TABLE: {
    // 語句一覧
    WORDS_LIST: {
      // 見出し(タイトル)がある行
      HEADER_ROW: 1,
      // データが始まる(表の開始)行
      DATA_START_ROW: 2
    }
  },

  // ルールの設定
  LABELS: {
    // 語句一覧最大数
    MAX_REPLY_MESSAGES: 5,
    // メッセージのタイプ
    MESSAGE_TYPE: {
      TEXT: "text",
      TEXT_V2: "textV2",
      TEMPLATE: "template",
      STICKER: "sticker",
      IMAGE: "image",
      VIDEO: "video",
      AUDIO: "audio",
      LOCATION: "location"
    },
    // リッチメニューの名前
    RICH_MENU_NAME: {
      DEFAULT: "default"
    },
    // リッチメニューのサイズ
    RICH_MENU_SIZE: {
      BIG: "大サイズ",
      SMALL: "小サイズ"
    }
  },

  // 各シート名
  SHEETS: {
    WORDS_LIST: "語句一覧"
  },

  // スクリプトプロパティのプロパティ名
  // 【注意】
  // ・通常は「スクリプトプロパティ画面」の値(右側)を変更してください。
  // ・画面側の「プロパティ名」(左側)そのものを変えた時のみ、ここ(右側)を書き換えます。
  PROPS: {
    // LINE用のスプレッドシートのID
    LINE_SS_ID: "***",
    // LINEのID
    LINE_ID: "***",
    // LINEチャンネルアクセストークン
    LINE_CHANNEL_ACCESS_TOKEN: "***",
    // デフォルトのリッチメニュー画像のID
    DEFAULT_IMAGE_ID: "***",
    // GitHubのURL
    GIT_HUB_URL: "***",
    // エラー時のSlackのWebhookのURL
    ERR_SLACK_WEBHOOK_URL: "***"
  }
};

/**
 * =====================================================================
 * 設定エリアはここまでです。これより下のコードはエンジニア専用です。
 * =====================================================================
 */