# 구글 시트 연동 앱스 스크립트 설정 가이드

구글 스프레드시트에 저장하기 위한 API 엔드포인트를 만드는 과정입니다. 아래 단계를 천천히 따라해 주세요.

## 1. 스크립트 에디터 열기
1. 알려주신 스프레드시트(`https://docs.google.com/spreadsheets/d/1Lx1AjLj1o0uj8mTyEZKDMGXekIXbx3rKQI9yO7zdeM8/edit`)를 엽니다.
2. 상단 메뉴에서 **[확장 프로그램]** > **[Apps Script]** 를 클릭합니다.
   *(새 탭으로 Apps Script 에디터 화면이 열립니다)*

## 2. 코드 붙여넣기
1. 열린 스크립트 에디터(Code.gs)의 모든 기본 코드를 지웁니다.
2. 아래 코드를 복사해서 붙여넣습니다:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 시트가 비어있다면 헤더 추가
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'Verse', 'Meditation Note']);
    sheet.getRange("A1:C1").setFontWeight("bold");
  }
  
  try {
    // 묵상 사이트에서 보내는 JSON 데이터 파싱
    var postData = JSON.parse(e.postData.contents);
    var date = postData.date || new Date().toISOString();
    var verse = postData.verse || "";
    var note = postData.note || "";
    
    // 시트의 마지막 줄에 새 데이터 추가
    sheet.appendRow([date, verse, note]);
    
    return ContentService.createTextOutput(JSON.stringify({"result":"success", "data": "saved"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. 위쪽 파란색 **저장(디스켓) 버튼** 아이콘을 눌러 코드를 저장합니다.

## 3. 웹 앱으로 배포하기
1. 오른쪽 상단의 파란색 **[배포]** 버튼을 클릭하고 **[새 배포]**를 선택합니다.
2. 왼쪽의 톱니바퀴 아이콘(유형 선택)을 클릭하여 **'웹 앱'**을 선택합니다.
3. 설정을 다음과 같이 변경합니다:
   - **설명**: `Daily Manna API` (원하시는 이름 아무거나 입력)
   - **웹 앱 실행 권한**: `나` (기본값)
   - **액세스할 수 있는 사용자**: **`모든 사용자`** (중요: 이렇게 해야 사이트에서 접근 가능합니다) 
4. **[배포]** 버튼을 누릅니다.
5. *(권한 부여 팝업이 뜨면)* **[액세스 승인]**을 누르고, 본인 구글 계정을 선택합니다. 그 다음 **[고급]**을 눌러 `Daily Manna API(으)로 이동(안전하지 않음)`을 클릭한 후, **[허용]**을 누릅니다.

## 4. 웹 앱 URL 복사
배포가 성공적으로 완료되면 **"웹 앱 URL" (https://script.google.com/... 로 시작하는 긴 주소)** 이 나타납니다. 

이 **웹 앱 URL** 을 복사하셔서 제게 채팅창으로 알려주세요! 그 주소를 연동해 드리겠습니다.
