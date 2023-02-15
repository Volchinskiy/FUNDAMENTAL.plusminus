/**
 * Function that count operation values of specific ticker.
 */
function F_GET_TICKERS(name) {
  var heapName = getSheetName("getHeapName")(name)
  var heapSheet = getAS().getSheetByName(heapName)
  var plusOperations = heapSheet.getRange(3, 5, heapSheet.getLastRow() - getTopPadding(), 2).getValues()
  var minusOperations = heapSheet.getRange(3, 10, heapSheet.getLastRow() - getTopPadding(), 2).getValues()
  var projection1 = (operationType) => (box, operation) => {
    var [ operationValue, tickersString ] = operation
    if (!operationValue) return box
    var tickers = tickersString.split(" ")
    var filteredTickers = tickers.filter((ticker) => ticker != heapName && ticker != operationType)
    if (!filteredTickers.length) return box
    filteredTickers.forEach((ticker) => box[ticker] = box[ticker] ? box[ticker] + operationValue : operationValue)
    return box
  }
  var prjection2 = (tickers) => Object.entries(tickers).map(([ticker, value]) => [`${ticker}: ${value}`])
  var plusResult = prjection2(plusOperations.reduce(projection1("p"), {}))
  var minusResult = prjection2(minusOperations.reduce(projection1("m"),{}))
  return [...plusResult, [], ...minusResult]
}
