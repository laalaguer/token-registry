const path = require('path')
const file = require('file-system')
const { getTokens, redFont, greenFont, yellowFont } = require('./utils')
const NET_FOLDERS = require('./const').NETS

function checkFolderName(folderName) {
  if (folderName.toLowerCase() !== folderName) {
    // invalid
  }

  if (/^0x[a-f0-9]{40}$/.test(folderName)) {
    // invalid
  }
}

function checkInfo(info) {
  if (!checkName(info.name)) {
    console.log('name')
  }
  if (!checkSymbol(info.symbol)) {
    console.log('symbol')
  }
  if (!checkDecimals(info.decimals)) {
    console.log('decimals')
  }
}

function checkName(name) {
  return !(name === null || name === undefined || name.length === 0)
}

function checkSymbol(symbol) {
  return !(symbol === null || symbol === undefined || symbol.length === 0)
}

function checkDecimals(decimals) {
  return !(decimals === null || decimals === undefined)
}

function checkAddress(folderName, address) {
  return !(
    folderName !== address.toLowerCase() ||
    !/^0x[a-f0-9]{40}$/.test(address.toLowerCase())
  )
}

function checkImg(path) {
  // const img = require(path)
  console.log('todo')
}

function validate(net, folder) {
  checkFolderName(folder)
  const tokenFolder = path.join(
    __dirname,
    `./tokens/${NET_FOLDERS[net]}/${folder}`
  )
  const files = file.readdirSync(tokenFolder)
  if (files.length !== 2) {
    // invalid
  }
  const info = require(path.join(tokenFolder, 'info.json'))
  checkAddress(folder, info.address)
  checkInfo(info)
  checkImg(path.join(tokenFolder, 'token.png'))
}

module.exports = {
  lint: function(net) {
    const tokens = getTokens(
      path.join(__dirname, `./tokens/${NET_FOLDERS[net]}`)
    )

    tokens.forEach(item => {
      validate(net, item)
    })
  }
}