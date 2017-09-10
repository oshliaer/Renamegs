function rename(folderId, action, type, substr, newSubstr){
  
  var res = {};
  
  var root = DriveApp.getFolderById(folderId);
  
  var callback = action === 'rename' ? renameItem_ : renameItemFake_;
  
  substr = new RegExp(substr);
  
  if(type.indexOf('file') > -1){
    var files = root.getFiles();
    var res_ = iterator_(files, callback, {data: [], substr: substr, newSubstr: newSubstr});
    if(res_.data.length)
      res.files = res_.data;
  }
  
  if(type.indexOf('folder') > -1){
    var folders = root.getFolders();
    var res_ = iterator_(folders, callback, {data: [], substr: substr, newSubstr: newSubstr});
    if(res_.data.length)
      res.folders = res_.data;
  }
  
  return res;
  
}
/**
* It iterates any object that has the methods next() and hasNext().
* Requires a callback whose result returns the next iteration. Like the reduce function. 
* @param {Object.<next(), hasNext()>} items Iterated object.
* @param {Object} callback. The received data is processed in the function.
* @param {*} initialValue. The first init data for accumulator.
* @return {*} The last value of accumulator.
* @private
*/
function iterator_(items, callback, initialValue){
  var accumulator = initialValue;
  var i_ = 0;
  while(items.hasNext()){
    var item = items.next();
    accumulator = callback(item, i_, accumulator);
    i_++;
  }
  return accumulator;
}

/**
*
* @private
*/
function renameItemFake_(item, i, acc){
  
  var newItemName = getDriveItemNewName_(item, acc.substr, acc.newSubstr);
  if(newItemName)
    acc.data.push(newItemName);
  return acc;
}

/**
*
* @private
*/
function renameItem_(item, i, acc){
  var newItemName = renameDriveItem_(item, acc.substr, acc.newSubstr);
  if(newItemName)
    acc.data.push(newItemName);
  return acc;
}

/**
*
* @private
*/
function renameDriveItem_(item, substr, newSubstr) {
  var name_ = getDriveItemNewName_(item, substr, newSubstr);
  
  if(!name_)
    return undefined;
  
  item.setName(name_.newName);
  return name_;
}

/**
*
* @private
*/
function getDriveItemNewName_(item, substr, newSubstr){
  var name = item.getName();
  
  if(!substr.test(name))
    return undefined;
  
  var newName = name.replace(substr, newSubstr);
  return {
    id: item.getId(),
    name: name,
    newName: newName
  }
}
