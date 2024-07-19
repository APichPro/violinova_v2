import $ from "jquery";
const { vertaal } = require("@/lib/xml2abc");

var gMusicXMLImportOptions = {
  b: 4,
  n: 0,
  c: 0,
  v: 0,
  d: 4,
  x: 0,
  noped: 0,
  p: "",
  v1: 0,
  stm: 0,
  s: 0,
  t: 0,
  u: 0,
  mnum: -1,
  m: 1,
  addq: 1,
  q: 100,
  addstavenum: 0,
};

export function importMusicXML(theXML: string, fileName: string) {
  // abc_code is a (unicode) string with one abc tune.
  var xmldata = $.parseXML(theXML);
  // var options = { u:0, b:4, n:0,  // unfold repeats (1), bars per line, chars per line
  //                 c:0, v:0, d:0,  // credit text filter level (0-6), no volta on higher voice numbers (1), denominator unit length (L:)
  //                 m:0, x:0, t:0,  // no midi, minimal midi, all midi output (0,1,2), no line breaks (1), perc, tab staff -> voicemap (1)
  //                 v1:0, noped:0,  // all directions to first voice of staff (1), no pedal directions (1)
  //                 stm:0,          // translate stem elements (stem direction)
  //                 p:'', s:0,   // page format: scale (1.0), width, left- and right margin in cm, shift note heads in tablature (1)
  //                 addstavenum:1 };  // Add stave numbers at the end of the staves

  // Suppress stave measure numbers if doing linebreaks
  var replacedStaveNum = false;

  if (
    gMusicXMLImportOptions.x == 0 &&
    gMusicXMLImportOptions.addstavenum == 1
  ) {
    replacedStaveNum = true;
    gMusicXMLImportOptions.addstavenum = 0;
  }

  var result = vertaal(xmldata, gMusicXMLImportOptions);

  if (replacedStaveNum) {
    gMusicXMLImportOptions.addstavenum = 1;
  }

  var abcText = result[0]; // the translation (string)

  // Strip out extra clef indications
  abcText = abcText.replaceAll("[K:treble]", "");
  abcText = abcText.replaceAll("[K:alto]", "");
  abcText = abcText.replaceAll("[K:alto1]", "");
  abcText = abcText.replaceAll("[K:alto2]", "");
  abcText = abcText.replaceAll("[K:tenor]", "");
  abcText = abcText.replaceAll("[K:bass]", "");
  abcText = abcText.replaceAll("[K:bass3]", "");

  // Inject Q: tag?
  if (gMusicXMLImportOptions.addq == 1) {
    var theTempoToInject = gMusicXMLImportOptions.q;

    abcText = InjectQTag(abcText, theTempoToInject);
  }

  // If no title in the XML after conversion, inject the filename instead
  if (abcText.indexOf("T:Title") != -1) {
    // Strip the extension
    fileName = fileName.replace(".mxl", "");
    fileName = fileName.replace(".xml", "");
    fileName = fileName.replace(".musicxml", "");
    fileName = fileName.replace(".MXL", "");
    fileName = fileName.replace(".XML", "");
    fileName = fileName.replace(".MUSICXML", "");

    // Replace any _ or - with spaces
    fileName = fileName.replaceAll("_", " ");
    fileName = fileName.replaceAll("-", " ");
    fileName = fileName.replaceAll("  ", " ");

    // Intelligent title capitalize
    fileName = doTitleCaps(fileName);

    abcText = abcText.replace("T:Title", "T:" + fileName);
  }

  // MAE 15 Jun 2024 - Is there a linebreak character request
  var searchRegExp = /^I:linebreak.*$/m;

  // Detect linebreak character request
  var doLBReplacement = false;
  var gotLineBreakRequest = abcText.match(searchRegExp);
  var theLBchar = "";

  if (gotLineBreakRequest && gotLineBreakRequest.length > 0) {
    theLBchar = gotLineBreakRequest[0].replace("I:linebreak", "");

    theLBchar = theLBchar.trim();

    if (theLBchar.length > 0 && (theLBchar == "!" || theLBchar == "$")) {
      doLBReplacement = true;
      theLBchar = theLBchar[0];
    }
  }

  // Do the line break replacement?
  if (doLBReplacement) {
    //console.log("Doing LB replacement, theLBchar: "+theLBchar);
    abcText = replaceLineBreaks(abcText, theLBchar);
  }

  // Remove the linebreak request from the ABC
  abcText = removeLinesStartingWithILinebreak(abcText);

  return abcText;
}

function doTitleCaps(title: any) {
  var small =
    "(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)";
  var punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";

  function titleCaps(title: string) {
    var parts = [],
      split = /[:.;?!] |(?: |^)["Ò]/g,
      index = 0;

    while (true) {
      var m = split.exec(title);

      parts.push(
        title
          .substring(index, m ? m.index : title.length)
          .replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, function (all: string) {
            return /[A-Za-z]\.[A-Za-z]/.test(all) ? all : upper(all);
          })
          .replace(RegExp("\\b" + small + "\\b", "ig"), lower)
          .replace(
            RegExp("^" + punct + small + "\\b", "ig"),
            function (all: any, punct: any, word: any) {
              return punct + upper(word);
            }
          )
          .replace(RegExp("\\b" + small + punct + "$", "ig"), upper)
      );

      index = split.lastIndex;

      if (m) parts.push(m[0]);
      else break;
    }

    return parts
      .join("")
      .replace(/ V(s?)\. /gi, " v$1. ")
      .replace(/(['Õ])S\b/gi, "$1s")
      .replace(/\b(AT&T|Q&A)\b/gi, function (all) {
        return all.toUpperCase();
      });
  }

  function lower(word: string) {
    return word.toLowerCase();
  }

  function upper(word: string) {
    return word.substr(0, 1).toUpperCase() + word.substr(1);
  }

  return titleCaps(title);
}

function InjectQTag(theTune: string, theTempo: number) {
  var theLines = theTune.split("\n");

  var nLines = theLines.length;

  // Does the tune already have a Q: tag at the start of a line?
  for (var j = 0; j < nLines; ++j) {
    if (theLines[j].trim().indexOf("Q:") == 0) {
      // Yes, nothing to inject
      return theTune;
    }
  }

  // No Q: tag found, find the M: tag, and inject there

  // Find the Meter
  var theMeterLine = "";

  var bFoundMeter = false;

  // Find the first line of the tune that has measure separators
  for (var j = 0; j < nLines; ++j) {
    theMeterLine = theLines[j];

    if (theMeterLine.trim().indexOf("M:") == 0) {
      bFoundMeter = true;

      // Put it after the M: tag line if not at the end of the ABC
      if (j < nLines - 1) {
        theMeterLine = theLines[j + 1];
      }
      break;
    }
  }

  if (bFoundMeter) {
    var meterIndex = theTune.indexOf(theMeterLine);

    var leftSide = theTune.substring(0, meterIndex);
    var rightSide = theTune.substring(meterIndex);

    theTune = leftSide + "Q:" + theTempo + "\n" + rightSide;
  } else {
    // Just in case there is no M: tag. Almost certainly never will happen.
    // In this case, put it behind the K: tag
    // If no K: tag, just punt

    // Find the Key
    var theKeyLine = "";

    var bFoundKey = false;

    // Find the first line of the tune that has measure separators
    for (var j = 0; j < nLines; ++j) {
      theKeyLine = theLines[j];

      if (theKeyLine.trim().indexOf("K:") == 0) {
        bFoundKey = true;
        break;
      }
    }

    if (bFoundKey) {
      var keyIndex = theTune.indexOf(theKeyLine);

      var leftSide = theTune.substring(0, keyIndex);
      var rightSide = theTune.substring(keyIndex);

      theTune = leftSide + "Q:" + theTempo + "\n" + rightSide;
    }
  }

  return theTune;
}

function replaceLineBreaks(input: string, lbChar: string) {
  // Split the input text into an array of lines
  const lines = input.split("\n");

  // Initialize an array to hold the combined lines
  let combinedLines = [];
  let currentLine = "";

  var gotLB = false;
  // Loop through each line in the input text
  for (let line of lines) {
    // Check if the line starts with a tag
    if (
      !/^(X:|T:|M:|K:|L:|Q:|W:|Z:|R:|C:|A:|O:|P:|N:|G:|H:|B:|D:|F:|S:|I:|V:|w:|%)/.test(
        line
      )
    ) {
      if (line.indexOf(lbChar) != -1) {
        gotLB = true;
        break;
      }
    }
  }

  // Line breaks requested, but none detected, just return the original split text
  if (!gotLB) {
    return input;
  }

  // Line breaks detected, pass through the tag lines but combine and split the ABC notes

  // Loop through each line in the input text
  for (let line of lines) {
    // Check if the line starts with A:, B:, C:, or %
    if (
      /^(X:|T:|M:|K:|L:|Q:|W:|Z:|R:|C:|A:|O:|P:|N:|G:|H:|B:|D:|F:|S:|I:|V:|w:|%)/.test(
        line
      )
    ) {
      // If currentLine is not empty, push it to combinedLines and reset it
      if (currentLine) {
        combinedLines.push(currentLine);
        currentLine = "";
      }
      // Push the current line as it starts with a tag
      combinedLines.push(line);
    } else {
      // Append the line to currentLine if it doesn't start with a tag
      currentLine += (currentLine ? " " : "") + line;
    }
  }

  // Push the last combined line if it exists
  if (currentLine) {
    combinedLines.push(currentLine);
  }

  var newLines: any[] = [];

  // Iterate over each line
  const modifiedLines = combinedLines.map((line) => {
    // Check if the line is a tag
    if (isTagLine(line)) {
      // Return the line unchanged if it matches the condition
      return newLines.push(line);
    } else {
      var theSplits = splitTextAtLineBreak(line, lbChar);

      var nSplits = theSplits.length;

      for (var j = 0; j < nSplits; ++j) {
        var thisSplit = theSplits[j];
        thisSplit = thisSplit.trim();
        if (thisSplit != "") {
          // Include the split marks at the end of the lines
          newLines.push(thisSplit);
        }
      }
    }
  });

  return newLines.join("\n");
}

function removeLinesStartingWithILinebreak(text: string) {
  // Split the text into an array of lines
  let lines = text.split("\n");

  // Filter out lines that start with 'I:linebreak'
  lines = lines.filter((line: string) => !line.startsWith("I:linebreak"));

  // Join the remaining lines back into a single string
  return lines.join("\n");
}

function splitTextAtLineBreak(input: string, lbChar: any) {
  // Split the input text at each $ character
  const splits = input.split(lbChar);

  // Initialize an array to hold the resulting substrings
  let resultArray = [];

  // Loop through each split substring
  for (let split of splits) {
    // Trim the split substring to remove any leading or trailing whitespace
    let trimmedSplit = split.trim();

    // Push the trimmed substring to the result array if it's not empty
    if (trimmedSplit) {
      resultArray.push(trimmedSplit);
    }
  }

  return resultArray;
}

function isTagLine(text: string) {
  const prefixes = [
    "X:",
    "T:",
    "M:",
    "K:",
    "L:",
    "Q:",
    "W:",
    "Z:",
    "R:",
    "C:",
    "A:",
    "O:",
    "P:",
    "N:",
    "G:",
    "H:",
    "B:",
    "D:",
    "F:",
    "S:",
    "I:",
    "V:",
    "%",
  ];
  for (const prefix of prefixes) {
    if (text.startsWith(prefix)) {
      return true;
    }
  }
  return false;
}

export function sendMIDIToWebService(midiData: any, file: any) {
  return new Promise<string>((resolve, reject) => {
    // Create a Blob from the ArrayBuffer
    var blob = new Blob([midiData]);

    // Create a FormData object
    var formData = new FormData();
    formData.append("array_buffer", blob, "midi.mid");

    fetch(`https://seisiuneer.pythonanywhere.com/midi2xml`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        //debugger;

        if (!response.ok) {
          if (!response.ok) {
            throw new Error("Failed to upload MIDI file");
          }
        }

        return response.text();
      })
      .then((data) => {
        // Strip the extension
        var fileName = file.name.replace(".midi", "");
        fileName = fileName.replace(".MIDI", "");
        fileName = fileName.replace(".mid", "");
        fileName = fileName.replace(".MID", "");

        // Replace any _ or - with spaces
        fileName = fileName.replaceAll("_", " ");
        fileName = fileName.replaceAll("-", " ");
        fileName = fileName.replaceAll("  ", " ");

        // Intelligent title capitalize
        fileName = doTitleCaps(fileName);

        data = data.replaceAll("Music21 Fragment", fileName);
        data = data.replaceAll("Music21", "");

        // Handle response from server
        var abc = importMusicXML(data, fileName);

        resolve(abc);
      })
      .catch((error) => {
        // Reject the promise with the error
        reject(error);
      });
  });
}
