const { assert, expect } = require('chai')
const { ethers } = require('hardhat')

describe('SimpleStorage', () => {
    let simpleStorageFactory, simpleStorage
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
        simpleStorage = await simpleStorageFactory.deploy()
    })
    it('Should start with a favorite number of 0', async () => {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it('Should update when we call store', async () => {
        const transactionResponse = await simpleStorage.store(7)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "7"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it('Should update when we call addPerson', async () => {
        const transactionResponse = await simpleStorage.addPerson('stark', 20)
        await transactionResponse.wait(1)
        const nameToFavoriteNumberOfStark = await simpleStorage.nameToFavoriteNumber('stark')
        const { favoriteNumber, name } = await simpleStorage.people(0)
        assert.typeOf(name, 'string')
        assert.equal(nameToFavoriteNumberOfStark.toString(), '20')
        expect(favoriteNumber).to.equal('20')
    })
})

// In real projects. You can use Waffle for the test.
// Waffle is a library for writing and testing smart contracts. (More advance)