
/***********************************************************************************************************************




      ==================================================
      
       Google Drive Project Folder Directory Generator
      
      ==================================================
      
      
      Written by James Marcogliese on 10/02/2016
      
      This is a standalone Google Apps script that generates a project 
      folder directory based on any structure you desire. In addition to folders, the 
      script is also able to generate empty docs and spreadsheets labeled to whatever you desire.
      
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
      
      
      contact  :  james.marcogliese@gmail.com
      GitHub   :  https://github.com/JamesMarcogliese/Drive-ProjectDir
      
      
      

*************************************************************************************************************************/

function createTemplateSheet() {
  
  function searchDrive(fileToSearch) {
    //var folderToSearch = "FolderName";
    //var folders = DriveApp.getFoldersByName(folderToSearch);
    //Logger.log(folders);
    var files = DriveApp.getFilesByName(fileToSearch);
    return files;
  }
  
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
  if (!checkSpaceAvailable(bufferSize))
  {
    return;
  } 
  
  //Create a Template Sheet
  var ssNew = SpreadsheetApp.create("Template Sheet");
  var ss = SpreadsheetApp.openById(ssNew.getId());
  var sheet = ss.getSheets()[0];
  var values = [
    [ "NOTE: Use this sheet to template your folder structure. Below is an example you may use.", "", "", "", "", "" ],
    [ "The structure will also generate documents and spreadsheets if you require them.", "", "", "", "", "" ],
    [ "All folders MUST start with '/'. Documents MUST end with '.gdoc'. Spreadsheets MUST end with '.gsheet'.", "", "", "", "", "" ],
    [ "", "", "", "", "", "" ],
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
  var scriptId;
  var scriptParent;
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
  
}
