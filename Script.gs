
/***********************************************************************************************************************




      ==================================================
      
       Google Drive Project Folder Directory Generator
      
      ==================================================
      
      
      Written by James Marcogliese on 10/02/2016
      
      This is a standalone Google Apps script that generates a project 
      folder directory based on any structure you provide. In addition to folders, the 
      script is also able to generate empty labelled docs and spreadsheets.
      
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
         
         IMPORTANT: For the script to function, only ONE copy of it should exist in your drive when run.
                    DO NOT CREATE DUPLICATES IN YOUR DRIVE AND DO NOT RENAME THE SCRIPT. This is a limitation of the Google Script API.
      
      
      contact  :  james.marcogliese@gmail.com
      GitHub   :  https://github.com/JamesMarcogliese/Drive-ProjectDir
      
      
      

*************************************************************************************************************************/


































// First Major Function. Generates Template Sheet.
function createTemplateSheet(){
  // Std function to search the drive for a file.
  function searchDrive(fileToSearch){
    var files = DriveApp.getFilesByName(fileToSearch);
    return files;
  }
  // Function to check if a certain amount of space is avaiable for file generation.
  function checkSpaceAvailable(bufferSize){
    var storageLimit = DriveApp.getStorageLimit();
    var storageUsed = DriveApp.getStorageUsed();
    if (storageUsed >= storageLimit-bufferSize){
      return false;
    } else {
      return true;
    }
  }
  // Std function to move a file to a specified folder.
  function moveFileToFolder(fileId, targetFolderId){
    var file = DriveApp.getFileById(fileId);
    var targetFolder = DriveApp.getFolderById(targetFolderId);
    targetFolder.addFile(file);
    DriveApp.removeFile(file);
    return;
  }
  // Beginning of script. Check if space exists for file generation.
  var bufferSize = 5242880;
  if (!checkSpaceAvailable(bufferSize)){
    Logger.log("Insufficient Space!");
    return;
  } 
  
  var files = searchDrive("Copy of Drive-ProjectDir");
  if (files.hasNext()){
  files.next().setName("Drive-ProjectDir");
  }
  //Create a Template Sheet and format it.
  var ssNew = SpreadsheetApp.create("ProjectDir Template Sheet");
  var ss = SpreadsheetApp.openById(ssNew.getId());
  var sheet = ss.getSheets()[0];
  var values = [
    [ "NOTE: Use this sheet to template your folder structure. Below is an example you may use.", "", "", "", "", "" ],
    [ "The structure will also generate documents and spreadsheets if you require them.", "", "", "", "", "" ],
    [ "All folders MUST start with '/'. Documents MUST end with '.gdoc'. Spreadsheets MUST end with '.gsheet'.", "", "", "", "", "" ],
    [ "Nested folders can be placed one row below and one column over to the right as shown below.", "", "", "", "", "" ],
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
  // Move the sheet to the same folder as the script.
  var files = searchDrive("Drive-ProjectDir");
  var scriptCount = 0;
  var scriptId, scriptParent;
  while (files.hasNext()) {
    var file = files.next();
    scriptCount++;
    scriptId = file.getId();
    scriptParent = file.getParents().next();
  }
  if (scriptCount > 1) {
    Logger.log("More than one script of the same name was discovered. Aborted!");
    return;
  }
  moveFileToFolder(ssNew.getId(), scriptParent.getId());
  return;
}
// Second Major Function. Creates folder/file structure from sheet.
function generateFolderStructureFromSheet(){
  // Std function to search the drive for a file.
  function checkSpaceAvailable(bufferSize){
    var storageLimit = DriveApp.getStorageLimit();
    var storageUsed = DriveApp.getStorageUsed();
    if (storageUsed >= storageLimit-bufferSize){
      return false;
    } else {
      return true;
    }
  }
  // Std function to move a file to a specified folder.
  function moveFileToFolder(fileId, targetFolderId){
    var file = DriveApp.getFileById(fileId);
    var targetFolder = DriveApp.getFolderById(targetFolderId);
    targetFolder.addFile(file);
    DriveApp.removeFile(file);
    return;
  }
  // Check if space exists for files to be created.
  var bufferSize = 5242880;
  if (!checkSpaceAvailable(bufferSize)){
    Logger.log("Insufficient Space!");
    return;
  } 
  // Calls search drive
  function searchDrive(fileToSearch){
    var files = DriveApp.getFilesByName(fileToSearch);
    return files;
  }
  // Finds the Template Sheet from the previous Major Function.
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
    Logger.log("More than one script of the same name was discovered. Aborted!");
    return;
  }
  // Go through every row and generate accordingly.
  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var currentParent = sheetParent;
  var lastlvl, lastitm;
  for (var i = 5; i < data.length; i++){ // Row
    for (var j = 0; j < data[i].length; j++){ //Column
      if (data[i][j]) { // If cell is filled...
        if (j == 0){    // If in root, reset parent folder to root.
          currentParent = sheetParent;
        } else if (lastlvl == j && lastitm === "folder"){ // If previous level = current, rollback folder.
          currentParent = currentParent.getParents().next();
        } else if (lastlvl > j){ // If previous level was deeper, rollback until we are on the same level.
          while (lastlvl > j){
            lastlvl--;  
            currentParent = currentParent.getParents().next();
          }
        }
        var stub = data[i][j].toString().trim(); // If folder, create in currentDir and enter.
        if(stub.indexOf("/") == 0){
          stub = stub.substr(1);
          currentParent.createFolder(stub);
          currentParent = currentParent.getFoldersByName(stub).next();
          lastlvl = j;
          lastitm = "folder";
        } else if(stub.search(".gdoc") != -1) { // If doc, create and move to current level.
          stub = stub.replace(".gdoc", "");
          var ssNew = DocumentApp.create(stub);
          moveFileToFolder(ssNew.getId(),currentParent.getId());
          lastlvl = j;
          lastitm = "file";
        } else if(stub.search(".gsheet") != -1){
          stub = stub.replace(".gsheet", "");
          var ssNew = SpreadsheetApp.create(stub);
          moveFileToFolder(ssNew.getId(),currentParent.getId());
          lastlvl = j;
          lastitm = "file";
        } 
      }
    }
  }
}
