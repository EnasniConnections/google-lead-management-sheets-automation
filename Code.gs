function onEdit(e) {
    Logger.log("Script triggered");

    var allowedSpreadsheetId = "1-tNTCfl-jeBWPFDHBuWzZC5oLn4ul-ist3nNnGNzVgk";

    if (!e || !e.source) {
        Logger.log("Error: Event object is undefined");
        return;
    }

    if (e.source.getId() !== allowedSpreadsheetId) {
        Logger.log("Wrong Spreadsheet: " + e.source.getId());
        return;
    }

    var sheet = e.source.getActiveSheet();
    var range = e.range;
    
    Logger.log("Edited Sheet: " + sheet.getName());

    var coldCallingSheet = "Making Contact"; // Update if necessary
    var directorySheet = "Directory"; // Update if necessary

    if (sheet.getName() === coldCallingSheet || sheet.getName() === directorySheet) {
        Logger.log("✅ " + sheet.getName() + " Sheet Triggered");
        
        if (range.getColumn() == 1 && range.getRow() > 1) { // Check if editing Column A
            Logger.log("Editing Column A in " + sheet.getName());
            var dateCell = sheet.getRange(range.getRow(), 9); // Column I (or J if needed)
            
            if (!range.getValue()) { 
                dateCell.setValue(""); // Clear timestamp if Column A is empty
                Logger.log("⚠️ Timestamp cleared in " + sheet.getName());
            } else if (!dateCell.getValue()) {
                dateCell.setValue(new Date()); // Add timestamp if missing
                Logger.log("✅ Timestamp added to " + sheet.getName());
            }
        }
    }
}
