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
