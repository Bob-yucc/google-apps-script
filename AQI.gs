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

  //向政府資料平台取AQI 
  var url = 'https://api.line.me/v2/bot/message/reply';  
  var site = [32,33];  
  var AQIurl = "https://data.epa.gov.tw/api/v1/aqx_p_432?limit=1000&api_key=9be7b239-557b-4c10-9775-78cadfc555e9&sort=ImportDate%20desc&format=json";
  
  var res = callAQI(AQIurl,site);
  var lineResponse="" ;
  for(var item in res)
  {
    lineResponse =lineResponse+res[item]+"\n";
  }
  
  
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
        'text': lineResponse.trim(),
      }],
    }),
  });
}




function callAQI(url,site){
  
//return  string  -> SiteName,AQI,Status,PublishTime
// site 選址    , ex: [32,33]
// 基隆=0
// 汐止=1
// 萬里=2
// 新店=3
// 土城=4
// 板橋=5
// 新莊=6
// 菜寮=7
// 林口=8
// 淡水=9
// 士林=10
// 中山=11
// 萬華=12
// 古亭=13
// 松山=14
// 大同=15
// 桃園=16
// 大園=17
// 觀音=18
// 平鎮=19
// 龍潭=20
// 湖口=21
// 竹東=22
// 新竹=23
// 頭份=24
// 苗栗=25
// 三義=26
// 豐原=27
// 沙鹿=28
// 大里=29
// 忠明=30
// 西屯=31
// 彰化=32
// 線西=33
// 二林=34
// 南投=35
// 斗六=36
// 崙背=37
// 新港=38
// 朴子=39
// 臺西=40
// 嘉義=41
// 新營=42
// 善化=43
// 安南=44
// 臺南=45
// 美濃=46
// 橋頭=47
// 仁武=48
// 鳳山=49
// 大寮=50
// 林園=51
// 楠梓=52
// 左營=53
// 前金=54
// 前鎮=55
// 小港=56
// 屏東=57
// 潮州=58
// 恆春=59
// 臺東=60
// 花蓮=61
// 陽明=62
// 宜蘭=63
// 冬山=64
// 三重=65
// 中壢=66
// 竹山=67
// 永和=68
// 復興=69
// 埔里=70
// 馬祖=71
// 金門=72
// 馬公=73
// 關山=74
// 麥寮=75
// 富貴角=76
// 大城=77
// 臺南(麻豆)=78
// 屏東(琉球)=79
// 新北(樹林)=80
// 臺南(學甲)=81
// 屏東(枋寮)]=82


  var response = UrlFetchApp.fetch(url);
  
  var json = response.getContentText();
  var data = JSON.parse(json); 
  var tempArr = [];

  
  for(var i=0;i<site.length;i++){
    var siteName =data["records"][site[i]]["SiteName"] ;
    var AQI = data["records"][site[i]]["AQI"];
    var status = data["records"][site[i]]["Status"];
    var publishTime=data["records"][site[i]]["PublishTime"] ; 
    
    tempArr.push(siteName+",AQI:"+AQI+","+status+","+publishTime);
    }
  return tempArr;  
 
}