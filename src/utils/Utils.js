import React, { Component } from 'react'

/* Utility for making strings without diacritic characters, eg. Å Ä Ö Á etc */
export function replaceSpecialCharacters(inputStr) {
  inputStr = inputStr.toLowerCase()
  let outPutStr = inputStr.replace(/[åäáãâ]/g,'a');
  outPutStr = outPutStr.replace(/[öó]/g,'o');
  outPutStr = outPutStr.replace(/[éëê]/g,'e');
  outPutStr = outPutStr.replace(/[íïî]/g,'i');
  outPutStr = outPutStr.replace(/[úüû]/g,'u');
  outPutStr = outPutStr.replace(/[ýÿ]/g,'y');
  outPutStr = outPutStr.replace(/\s+/g,'');
  outPutStr = outPutStr.replace(/[,.-_'´"#$&%()!?+<>{}¨*/]/g,'');
  return outPutStr
}
export function replaceSpecialCharactersURLs(inputStr) {
  inputStr = inputStr.toLowerCase()
  let outPutStr = inputStr.replace(/[åäáãâ]/g,'a');
  outPutStr = outPutStr.replace(/[öó]/g,'o');
  outPutStr = outPutStr.replace(/[éëê]/g,'e');
  outPutStr = outPutStr.replace(/[íïî]/g,'i');
  outPutStr = outPutStr.replace(/[úüû]/g,'u');
  outPutStr = outPutStr.replace(/[ýÿ]/g,'y');
  outPutStr = outPutStr.replace(/\s+/g,'');
  return outPutStr
}
/* Creates a <br> tag where there suppose to be a line break */
export function createLineBreak(text) {
  let formattedText = []
  {text.split(/\r?\n/).map(function(item, i) {
      formattedText.push(<span key={i}>{item}<br/></span>)
  })}
  return formattedText
}
/* Generates an unique id with three digits at the end */
export function uniqueId(name) {
  return name + new Date().valueOf().toString().slice(10,13)
}
/* Capitalize the first letter of a string */
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
