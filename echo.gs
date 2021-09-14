function doPost(e) {

  var CHANNEL_ACCESS_TOKEN = 'qLSEsWXwwpJimnvgUD1I+b4A/Uekw1vK6PAde227DsgyE11iLFyTuOvUBXTX4wfleN+DIYc0qYNEr1nz1NDJ+pDoRj+RYmgWr3kFOZqgFff8BKGTAqCObiCwnmbA+oeNuTiJky/j4GsdlLoz70L55gdB04t89/1O/w1cDnyilFU=';
  var msg = JSON.parse(e.postData.contents);
  console.log(msg);

  // 取出 replayToken 和發送的訊息文字
  var replyToken = msg.events[0].replyToken;
  var userMessage = msg.events[0].message.text;

  if (typeof replyToken === 'undefined') {
    return;
  }
  Logger.log("tset");
  
  var url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, {
      'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': userMessage+' ( hello )',
      }],
    }),
  });
}