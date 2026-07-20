const CreateRichMenu = {
  /**
   * リッチメニューを作成してIDを取得する
   * @param {CreateRichMenuConfig} config
   * @param {String} size - リッチメニューのサイズ
   */
  getRichMenuId(config, size) {
    let height;
    try {
      switch (size) {
        case CONFIG.LABELS.RICH_MENU_SIZE.BIG:
          height = 1686;
          break;

        case CONFIG.LABELS.RICH_MENU_SIZE.SMALL:
          height = 843;
          break;

        default:
          throw new Error("大サイズを作成する場合は\"大サイズ\"、小サイズを作成する場合は\"小サイズ\"をこのメソッドに引数に設定してください。");
      }

    } catch (e) {
      throw e;
    }

    // リッチメニューを作成するためのURLを取得
    const url = "https://api.line.me/v2/bot/richmenu";

    const headers = {
      "Authorization": `Bearer ${config.channelAccessToken}`,
      "Content-Type": "application/json"
    };

    const payload = {
      // リッチメニューのサイズ
      "size": {
        "width": 2500,
        "height": height
      },

      // デフォルトでメニューを表示するのか
      "selected": true,

      // リッチメニュー管理用の名前
      "name": config.richMenuName,

      // トークルームメニューに表示されるテキスト
      "chatBarText": "タップで開閉",

      // タップ領域群
      "areas": config.areas
    };

    const options = {
      "method": "post",
      "headers": headers,
      "payload": JSON.stringify(payload)
    };

    try {
      const response = UrlFetchApp.fetch(url, options);

      // JSON形式で取得したHTTPレスポンスを解析
      const json = JSON.parse(response);

      // 作成したリッチメニューのIDを取得
      config.richMenuId = json.richMenuId;

      return config.richMenuId;

    } catch (e) {
      console.error(`リッチメニューIDの取得に失敗しました: ${e.stack}`);

      throw e;
    }
  },

  /**
   * リッチメニュー用の画像をアップロードする
   * @param {CreateRichMenuConfig} config
   */
  imageUpload(config) {
    // 画像をアップロードするためのURLを取得
    const url = `https://api-data.line.me/v2/bot/richmenu/${config.richMenuId}/content`;

    //　GoogleDriveからファイルIDで画像ファイルを開く
    const image = DriveApp.getFileById(config.imageId);

    //　開いた画像ファイルをJPEG形式・BLOBに変換
    const payload = image.getAs(MimeType.JPEG);

    const headers = {
      "Authorization": `Bearer ${config.channelAccessToken}`,
      "Content-Type": "image/jpeg"
    };

    const options = {
      "method": "post",
      "headers": headers,
      "payload": payload
    };

    try {
      UrlFetchApp.fetch(url, options);

    } catch (e) {
      console.error(`画像のアップロードに失敗しました: ${e.stack}`);

      throw e;
    }
  },

  /**
   * メインのリッチメニューをデフォルトのリッチメニューにする
   * @param {CreateRichMenuConfig} config
   */
  defaultRichMenu(config) {
    // デフォルトのリッチメニューを設定するためのURLを取得
    const url = `https://api.line.me/v2/bot/user/all/richmenu/${config.richMenuId}`;

    const headers = {
      "Authorization": `Bearer ${config.channelAccessToken}`
    };

    const options = {
      "method": "post",
      "headers": headers
    };

    try {
      UrlFetchApp.fetch(url, options);

    } catch (e) {
      console.error(`デフォルトのリッチメニューの設定に失敗しました: ${e.stack}`);

      throw e;
    }
  }
};