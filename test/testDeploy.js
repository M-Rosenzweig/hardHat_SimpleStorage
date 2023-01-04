const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let SimpleStorageFactory, simpleStorage;

  beforeEach(async function () {
    SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
  });

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = 0;
    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue).to.equal(0);
  });

  it("Should Update when we call store)", async function () {
    const expectedValue = 770;
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue).to.equal(expectedValue);
  });

  it("should add a person to the people array with params and set a mapping of name to favorite number", async function () {
    const expectedName = "John";
    const expectedFavoriteNumber = 770;
    const transactionResponse = await simpleStorage.addPerson(
      expectedName,
      expectedFavoriteNumber
    );
    await transactionResponse.wait(1);
    const person = await simpleStorage.people(0);
    const addedNameToFaveNumber = await simpleStorage.nameToFavoriteNumber(
      expectedName
    );
    assert.equal(person.name, expectedName);
    assert.equal(person.favoriteNumber, expectedFavoriteNumber);
    assert.equal(addedNameToFaveNumber, expectedFavoriteNumber);
  });

  //   function addPerson(string memory _name, uint256 _favoriteNumber) public {
  //     people.push(People(_favoriteNumber, _name));
  //     nameToFavoriteNumber[_name] = _favoriteNumber;
  // }
});
