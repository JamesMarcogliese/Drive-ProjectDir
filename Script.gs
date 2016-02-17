
/***********************************************************************************************************************




      ==================================================
      
       Google Drive Project Folder Directory Generator
      
      ==================================================
      
      
      Written by James Marcogliese on 10/02/2016
      
      This is a standalone Google Apps script that generates a project 
<<<<<<< HEAD
      folder directory based on any structure you provide. In addition to folders, the 
      script is also able to generate empty labelled docs and spreadsheets.
=======
      folder directory based on any structure you desire. In addition to folders, the 
      script is also able to generate empty docs and spreadsheets labeled to whatever you desire.
>>>>>>> 40107a93ba171ec801a839cbe25b8ea66ffc8663
      
      - - -   - -   - - -        
      H O W   T O   U S E
      - - -   - -   - - - 
      
      1. Move this script to the folder where you would like the root of the  
         folder directory to start.
      
      2. Go to the Run menu above and choose "createTemplateSheet". Run. A spreadsheet will be created 
         in the same folder as this script.
      
      3. Configure the folder structure in the provided spreadsheet to suit your fancy.
      
      4. Once done, go to the Run menu above and choose "generateFolderStructureFromSheet". Run. 
         The folder structure will generate!
<<<<<<< HEAD
         
         IMPORTANT: For the script to function, only ONE copy of it should exist in your drive when run.
                    DO NOT CREATE DUPLICATES IN YOUR DRIVE. This is a limitation of the Google Script API.
=======
>>>>>>> 40107a93ba171ec801a839cbe25b8ea66ffc8663
      
      
      contact  :  james.marcogliese@gmail.com
      GitHub   :  https://github.com/JamesMarcogliese/Drive-ProjectDir
      
      
      

*************************************************************************************************************************/

function createTemplateSheet() {
  
  function searchDrive(fileToSearch) {
<<<<<<< HEAD
=======
    //var folderToSearch = "FolderName";
    //var folders = DriveApp.getFoldersByName(folderToSearch);
    //Logger.log(folders);
>>>>>>> 40107a93ba171ec801a839cbe25b8ea66ffc8663
    var files = DriveApp.getFilesByName(fileToSearch);
    return files;
  }
  
<<<<<<< HEAD
  function checkSpaceAvailable(bufferSize) {
    var storageLimit = DriveApp.getStorageLimit();
    var storageUsed = DriveApp.getStorageUsed();
    if (storageUsed >= storageLimit-bufferSize) {
=======
  function checkSpaceAvailable(bufferSize){
    var storageLimit = DriveApp.getStorageLimit();
    var storageUsed = DriveApp.getStorageUsed();
    if (storageUsed >= storageLimit-bufferSize){
>>>>>>> 40107a93ba171ec801a839cbe25b8ea66ffc8663
      return false;
    } else {
      return true;
    }
  }
  
  function moveFileToFolder(fileId, targetFolderId) {
    var file = DriveApp.getFileById(fileId);
    var targetFolder = DriveApp.getFolderById(targetFolderId);
    targetFolder.addFile(file);
    DriveApp.removeFile(file);
    return;
  }
<<<<<<< HEAD
  // Check if space exists for file generation.
  var bufferSize = 5242880;
  if (!checkSpaceAvailable(bufferSize)) {
    return;
  } 
  
  //Create a Template Sheet and format it.
  var ssNew = SpreadsheetApp.create("ProjectDir Template Sheet");
=======
  
  var bufferSize = 5242880;
  if (!checkSpaceAvailable(bufferSize))
  {
    return;
  } 
  
  //Create a Template Sheet
  var ssNew = SpreadsheetApp.create("Template Sheet");
>>>>>>> 40107a93ba171ec801a839cbe25b8ea66ffc8663
  var ss = SpreadsheetApp.openById(ssNew.getId());
  var sheet = ss.getSheets()[0];
  var values = [
    [ "NOTE: Use this sheet to template your folder structure. Below is an example you may use.", "", "", "", "", "" ],
    [ "The structure will also generate documents and spreadsheets if you require them.", "", "", "", "", "" ],
    [ "All folders MUST start with '/'. Documents MUST end with '.gdoc'. Spreadsheets MUST end with '.gsheet'.", "", "", "", "", "" ],
<<<<<<< HEAD
    [ "Nested folders can be placed one row below and one column over to the right as shown below.", "", "", "", "", "" ],
=======
    [ "", "", "", "", "", "" ],
>>>>>>> 40107a93ba171ec801a839cbe25b8ea66ffc8663
    [ "FirstFolderLevel", "SecondFolderLevel", "ThirdFolderLevel", "FourthFolderLevel", "FifthFolderLevel", "..." ],
    [ "Project Team.gdoc", "", "", "", "", "" ],
    [ "Meeting Notes.gdoc", "", "", "", "", "" ],
    [ "Lessons Learned.gdoc", "", "", "", "", "" ],
    [ "Ideas-Proposal.gdoc", "", "", "", "", "" ],
    [ "/Project Managment", "", "", "", "", "" ],
    [ "", "/Requirements", "", "", "", "" ],
    [ "", "", "Requirements.gsheet", "", "", "" ],
    [ "", "/Project Schedule-WBS", "", "", "", "" ],
    [ "", "/Financial Information", "", "", "", "" ],
    [ "", "/Communications", "", "", "", "" ],
    [ "/Project Development", "", "", "", "", "" ],
    [ "", "/Design", "", "", "", "" ],
    [ "", "/Dev", "", "", "", "" ],
    [ "", "/Testing", "", "", "", "" ],
    [ "", "/Reference", "", "", "", "" ],
    [ "", "/Src", "", "", "", "" ],
    [ "/Workarea", "", "", "", "", "" ],
    [ "", "/Team Member 1", "", "", "", "" ],
    [ "", "/Team Member 2", "", "", "", "" ]
  ];
  var range = sheet.getRange("A1:F24");
  range.setValues(values);
  range = sheet.getRange("A5:F5");
  range.setBackground("#D0D0D0");
  range = sheet.getRange("A1:F4");
  range.setBackground("#FFFF00");
  range = sheet.getRange("A5:F24");
  sheet.setFrozenRows(5);
  for (var i = 1; i<6;i++){
    sheet.setColumnWidth(i, 150);
  }
  var files = searchDrive("Drive-ProjectDir");
  var scriptCount = 0;
<<<<<<< HEAD
  var scriptId, scriptParent;
=======
  var scriptId;
  var scriptParent;
>>>>>>> 40107a93ba171ec801a839cbe25b8ea66ffc8663
  while (files.hasNext()) {
    var file = files.next();
    scriptCount++;
    scriptId = file.getId();
    scriptParent = file.getParents().next();
  }
  if (scriptCount > 1) {
    return;
  }
  moveFileToFolder(ssNew.getId(), scriptParent.getId());
  return;
}

function generateFolderStructureFromSheet() {
  function checkSpaceAvailable(bufferSize){
    var storageLimit = DriveApp.getStorageLimit();
    var storageUsed = DriveApp.getStorageUsed();
    if (storageUsed >= storageLimit-bufferSize){
      return false;
    } else {
      return true;
    }
  }
  
  function moveFileToFolder(fileId, targetFolderId) {
    var file = DriveApp.getFileById(fileId);
    var targetFolder = DriveApp.getFolderById(targetFolderId);
    targetFolder.addFile(file);
    DriveApp.removeFile(file);
    return;
  }
  
  var bufferSize = 5242880;
  if (!checkSpaceAvailable(bufferSize)) {
    return;
  } 
  function searchDrive(fileToSearch) {
    var files = DriveApp.getFilesByName(fileToSearch);
    return files;
  }
  var files = searchDrive("ProjectDir Template Sheet");
  var sheetCount = 0;
  var sheetId, sheetParent;
  while (files.hasNext()) {
    var file = files.next();
    sheetCount++;
    sheetId = file.getId();
    sheetParent = file.getParents().next();
  }
  if (sheetCount > 1) {
    return;
  }
  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var currentParent = sheetParent;
  for (var i = 5; i < data.length; i++) {
   //var row = "";
   for (var j = 0; j < data[i].length; j++) {
     if (data[i][j]) {
       //row = row + data[i][j];
       var stub = data[i][j].toString().trim();
       if(stub.indexOf("/") == 0){
         if(j == 0){
           currentParent = sheetParent;
         } else if (data[i-1][j]){
           currentParent = currentParent.getParents().next();
         }
         stub = stub.substr(1);
         currentParent.createFolder(stub);
         currentParent = currentParent.getFoldersByName(stub).next();
       } else if(stub.search(".gdoc") != -1) {
         stub = stub.replace(".gdoc", "");
         var ssNew = DocumentApp.create(stub);
         moveFileToFolder(ssNew.getId(),currentParent.getId());
       } else if(stub.search(".gsheet") != -1){
         stub = stub.replace(".gsheet", "");
         var ssNew = SpreadsheetApp.create(stub);
         moveFileToFolder(ssNew.getId(),currentParent.getId());
       }
       
     }
     //row = row + ",";
   }
   //Logger.log(row);
 }
}
