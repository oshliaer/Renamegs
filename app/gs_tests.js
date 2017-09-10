function tests_run() {
  
  if ((typeof GasTap)==='undefined') {
    var cs = CacheService.getScriptCache().get('gast');
    if(!cs){
      cs = UrlFetchApp.fetch('https://raw.githubusercontent.com/zixia/gast/master/src/gas-tap-lib.js').getContentText();
      CacheService.getScriptCache().put('gast', cs, 21600);
    }
    eval(cs);
  }
  
  var test = new GasTap();
  
  test.finish();
  
}
