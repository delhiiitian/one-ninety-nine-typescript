// Chapter 6.5 - Working with file paths
// Run: npx tsx chapter-06-files-io/05-paths.ts
//
// Real-world picture: a postal address. Country, city, street and house number,
// joined in the right order with the right separators, lead to one door.

import path from "node:path";
import os from "node:os";

// join: glue pieces with the correct separator for this operating system
const reportPath = path.join("reports", "2026", "october", "sales.csv");
console.log("Joined:", reportPath);

// resolve: turn a relative path into a full (absolute) path
console.log("Absolute:", path.resolve("reports", "summary.txt"));

// Taking a path apart
const photo = "/home/meera/pictures/goa/beach-sunset.jpg";
console.log("Folder:   ", path.dirname(photo));
console.log("File name:", path.basename(photo));
console.log("Extension:", path.extname(photo));
console.log("Name only:", path.basename(photo, path.extname(photo)));
console.log("Parsed:", path.parse(photo));

// Where is this script? import.meta.dirname is the folder of the current file.
console.log("This script lives in:", path.basename(import.meta.dirname));

// Useful system locations
console.log("Home folder exists:", os.homedir().length > 0);
console.log("Temp folder:", os.tmpdir());

// Changing an extension, a common real task
const csvName = "sales-report.xlsx".replace(path.extname("sales-report.xlsx"), ".csv");
console.log("Converted name:", csvName);
