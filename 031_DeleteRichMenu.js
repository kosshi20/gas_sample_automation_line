const DeleteRichMenu = {
  /**
   * リッチメニュー数を取得する
   * @param {Stirng} channelAccessToken - Messaging APIのチャネルアクセストークン
   */
  getNumRichMenu(channelAccessToken) {
    // リッチメニューのリストを取得するためのURLを取得
    const url = "https://api.line.me/v2/bot/richmenu/list";

    const headers = {
      "Authorization": `Bearer ${channelAccessToken}`
    };

    const options = {
      "method": "get",
      "headers": headers,
    };

    try {
      const response = UrlFetchApp.fetch(url, options);

      // JSON形式で取得したHTTPレスポンスを解析
      const json = JSON.parse(response);

      // HTTPレスポンスからリッチメニューの数を戻り値とする
      return json.richmenus.length;

    } catch (e) {
      console.error(`リッチメニュー数の取得に失敗しました: ${e.stack}`);

      throw e;
    }
  },


  /**
   * デフォルトのリッチメニューを解除する
   * @param {Stirng} channelAccessToken - Messaging APIのチャネルアクセストークン
   */
  cancellationDefaultRichMenu(channelAccessToken) {
    // リッチメニューを削除するために必要なURLを取得
    const url = "https://api.line.me/v2/bot/user/all/richmenu";

    const headers = {
      "Authorization": `Bearer ${channelAccessToken}`
    };

    const options = {
      "method": "delete",
      "headers": headers,
    };

    try {
      UrlFetchApp.fetch(url, options);

    } catch (e) {
      console.error(`デフォルトのリッチメニュー解除に失敗しました: ${e.stack}`);

      throw e;
    }
  },

  /**
   * リッチメニューのIDを取得する
   * @param {Stirng} channelAccessToken - Messaging APIのチャネルアクセストークン
   * @param {number} i - 取得したリッチメニューの番号
   * @return {string} - LINEのリッチメニューID
   */
  getRichMenuId(channelAccessToken, i) {
    // リッチメニューのリストを取得するためのURLを取得
    const url = "https://api.line.me/v2/bot/richmenu/list";

    const headers = {
      "Authorization": `Bearer ${channelAccessToken}`
    };

    const options = {
      "method": "get",
      "headers": headers,
    };

    try {
      const response = UrlFetchApp.fetch(url, options);

      // JSON形式で取得したHTTPレスポンスを解析
      const json = JSON.parse(response);

      // HTTPレスポンスからリッチメニューのIDを取得する
      const richMenuId = json.richmenus[i].richMenuId;

      return richMenuId;

    } catch (e) {
      console.error(`リッチメニューIDの取得に失敗しました: ${e.stack}`);

      throw e;
    }
  },

  /**
   * 設定したリッチメニューを削除する
   * @param {Stirng} channelAccessToken - Messaging APIのチャネルアクセストークン
   * @param {string} richMenuId - LINEのリッチメニューID
   */
  deleteRichMenu(channelAccessToken, richMenuId) {
    // リッチメニューを削除するために必要なURLを取得
    const url = `https://api.line.me/v2/bot/richmenu/${richMenuId}`;

    const headers = {
      "Authorization": `Bearer ${channelAccessToken}`
    };

    const options = {
      "method": "delete",
      "headers": headers,
    };

    try {
      UrlFetchApp.fetch(url, options);

    } catch (e) {
      console.error(`リッチメニューの削除に失敗しました: ${e.stack}`);

      throw e;
    }
  }
};