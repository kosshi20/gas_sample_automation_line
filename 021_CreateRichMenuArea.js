/**
 * @typedef {Object} CreateRichMenuConfig
 * @property {Object} props
 * @property {string} channelAccessToken
 * @property {string} lineId
 * @property {string} richMenuName
 * @property {string} imageId
 * @property {Object} areas
 * @property {string} richMenuId
 */

const CreateRichMenuArea = {
  /**
   * デフォルトのリッチメニューエリア
   * @param {CreateRichMenuConfig} config
   */
  defaultRichMenuArea(config) {
    // タップ領域郡の作成
    // xに左からの地点、yに上からの地点、widthにpx単位で幅、heightにpx単位で高さ
    config.areas = [
      {
        // 1つ目の領域
        "bounds": {
          "x": 0,
          "y": 0,
          "width": 833,
          "height": 843
        },
        // タップ時のアクション
        "action": {
          "type": "message",
          "text": "ヘルプ"
        }
      },
      {
        // 2つ目の領域
        "bounds": {
          "x": 833,
          "y": 0,
          "width": 833,
          "height": 843
        },
        // タップ時のアクション
        "action": {
          "type": "message",
          "text": "アクセス"
        }
      },
      {
        // 3つ目の領域
        "bounds": {
          "x": 1666,
          "y": 0,
          "width": 834,
          "height": 843
        },
        // タップ時のアクション
        "action": {
          "type": "uri",
          "uri": config.props[CONFIG.PROPS.GIT_HUB_URL]
        }
      }
    ];
  }
}