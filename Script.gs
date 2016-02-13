
/***********************************************************************************************************************




      ==================================================
      
       Google Drive Project Folder Directory Generator
      
      ==================================================
      
      
      Written by James Marcogliese on 10/02/2016
      
      This is a standalone Google Apps script that 
      
      
      - - -   - -   - - -        
      H O W   T O   U S E
      - - -   - -   - - - 
      
      1. 
      
      2. 
      
      3. 
      
      
      contact  :  james.marcogliese@gmail.com
      GitHub   :  https://github.com/JamesMarcogliese/Drive-ProjectDir
      
      
      

*************************************************************************************************************************/

function createTemplateSheet() {
  
  function getThisScriptInDrive() {
    return DriveApp.find("KreikxhGuoOMkUUvnqn1")[0];
  }
  
  var storageLimit = DriveApp.getStorageLimit();
  var storageUsed = DriveApp.getStorageUsed();
  if (storageUsed >= storageLimit-5242880){
    return;
  }
  //Create a Template Sheet
  //var ssNew = SpreadsheetApp.create("Template Sheet");
  var test = getThisScriptInDrive();
  Logger.log(test);
  //var thisFile = DocsList.getFileById(ssId);
  //var parentFolder = thisFile.getParents()[0].getName();
  /*
  var ss = SpreadsheetApp.openByUrl(ssNew.getUrl());
  var sheet = ss.getSheets()[0];
  var values = [
    [ "RootDir", "LevelTwo", "LevelThree", "FourthLevel", "..." ],
    [ "Project Team.gdoc", "", "", "", "" ],
    [ "Meeting Notes.gdoc", "", "", "", "" ],
    [ "Lessons Learned.gdoc", "", "", "", "" ],
    [ "Ideas-Proposal.gdoc", "", "", "", "" ],
    [ "\Project Managment", "", "", "", "" ],
    [ "", "\Requirements", "", "", "" ],
    [ "", "\Project Schedule-WBS", "", "", "" ],
    [ "", "\Financial Information", "", "", "" ],
    [ "", "\Communications", "", "", "" ],
    [ "\Project Development", "", "", "", "" ],
    [ "", "\Design", "", "", "" ],
    [ "", "\Dev", "", "", "" ],
    [ "", "\Testing", "", "", "" ],
    [ "", "\Reference", "", "", "" ],
    [ "", "\Src", "", "", "" ],
    [ "\Workarea", "", "", "", "" ],
    [ "", "\Team Member 1", "", "", "" ],
    [ "", "\Team Member 2", "", "", "" ],
    [ "####", "####", "####", "####", "####" ]
  ];
  var range = sheet.getRange("A1:E20");
  range.setValues(values);
  */
  //Fill the sheet
  
}

function generateFolderStructureFromSheet() {
  
}
