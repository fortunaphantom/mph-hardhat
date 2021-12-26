const { expect } = require('chai')
const { ethers } = require('hardhat')
const contractConfig = require('../export/contracts/config.json')

let owner, addr1, addr2, addr3
let mphToken, mphPresaleToken

let provider = ethers.getDefaultProvider()

function getInfo(transaction) {
  return {
    hash: transaction.hash,
    from: transaction.from,
    to: transaction.to,
    'value(eth)': ethers.utils.formatUnits(transaction.value, 18),
    'gasPrice(eth)': ethers.utils.formatUnits(transaction.gasPrice, 18),
    gasLimit: ethers.utils.formatUnits(transaction.gasLimit, 0),
    gasUsed: ethers.utils.formatUnits(transaction.gasUsed, 0),
    'limit fee(eth)': ethers.utils.formatUnits(
      transaction.gasPrice.mul(transaction.gasLimit),
      18
    ),
    'real fee(eth)': ethers.utils.formatUnits(
      transaction.gasPrice.mul(transaction.gasUsed),
      18
    ),
  }
}

beforeEach(async function () {
  try {
    ;[owner, addr1, addr2, addr3] = await ethers.getSigners()
    this.timeout(20000)
    mphToken = await ethers.getContractAt(
      'MPH',
      contractConfig.contractAddress
    )
    mphPresaleToken = await ethers.getContractAt(
      'MPHPresale',
      contractConfig.contractAddress
    )
    // const presaleRet = await mphPresaleToken.addPresalers([owner.address], [4])
    // console.log(owner)
  } catch (e) {
    console.log('beforeEach exception: ', e)
  }
})

describe('Token contract', async function () {
  this.timeout(120000)
  it('MPHNft token test', async function () {
    const tx = await mphToken.mint(1, {
      value: ethers.utils.parseEther('0.08'),
    })

    const receipt = await tx.wait()
    tx.gasUsed = receipt.gasUsed
    // console.log("base info: ", tx)
    console.log('calculated: ', getInfo(tx))
  })
})
