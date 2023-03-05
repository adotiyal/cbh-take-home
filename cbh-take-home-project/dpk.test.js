const functions = require("./dpk");


// test for the case when no input is given. getCandidate should return undefined
describe("getCandidate", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = functions.getCandidate();
    expect(trivialKey == undefined).toBe(true);
  });
});


// test for the case when no input is input is {"partitionKey": 10}.
//getCandidate should return 10
describe("getCandidate", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = functions.getCandidate({"partitionKey": 10});
    expect(trivialKey).toBe(10);
  });
});


// test for the case when no input is input is {"partitionKey": "10"}.
//getCandidate should return "10"
describe("getCandidate", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = functions.getCandidate({"partitionKey": "10"});
    expect(trivialKey).toBe("10");
  });
});


// test for the case when no input is given. deterministicPartitionKey should return "0"
// as result will be equal to TRIVIAL_PARTITION_KEY
describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = functions.deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});


// test for the case when the input {"partitionKey": "-1"}. deterministicPartitionKey should return "0"
// as result will be equal to TRIVIAL_PARTITION_KEY
describe("deterministicPartitionKey", () => {
  it("Returns the literal '-1' when given -1 as partitionKey", () => {
    const trivialKey = functions.deterministicPartitionKey({"partitionKey": "-1"});
    expect(trivialKey).toBe("-1");
  });
});


// test for the case when the input is {"partitionKey": 10}. deterministicPartitionKey should return "10"
// as result will be equal to JSON.stringify(10)
describe("deterministicPartitionKey", () => {
  it("Returns the literal '10' when given as partitionKey", () => {
    const trivialKey = functions.deterministicPartitionKey({"partitionKey": 10});
    expect(trivialKey).toBe("10");
  });
});

// test for the case when the input is 10. deterministicPartitionKey should return the correct
// crypto hash as 10 is not a string and it can be hashed
describe("deterministicPartitionKey", () => {
  it("Returns the correct deterministicPartitionKey when given 10 input", () => {
    const trivialKey = functions.deterministicPartitionKey(10);
    expect(trivialKey).toBe("0af1abec626b095704a5b03c13e47c3c18bcedb78566b6cadc4d5201cdb27691ce62fe60835587d41c8290616ad4ff1018b14dac6f83ff005922b25925fa4e6a");
  });
});


// test for the case when the input is "10". deterministicPartitionKey should return the correct
// crypto hash as "10" can be hashed.
describe("deterministicPartitionKey", () => {
  it("Returns the correct deterministicPartitionKey when given \"10\" input", () => {
    const trivialKey = functions.deterministicPartitionKey("10");
    expect(trivialKey).toBe("55ebb70e3dc648aea84bb369d287f73b35548122a938dccb56d85ef0513e6d7a303cee8791fa8d74e3cb499e4100194a1dfdfc0e338e3ec9762c8b1a4070dbb8");
  });
});


// test for the case when the input is a random string. deterministicPartitionKey should return the correct
// crypto hash as for any random string.
describe("deterministicPartitionKey", () => {
  it("Returns the correct deterministicPartitionKey when given \"10\" input", () => {
    const trivialKey = functions.deterministicPartitionKey("0x7338cdhc983njen3jknjdnjdnc30cjdnjcndj309839340!@##*#&&#(");
    expect(trivialKey).toBe("a03928d2319fecb54d5caf066b413b6f83b96dcf8c31d32dec806036c27cea84496969a5f2ac4be89ebd6db0557c3e2d962157a2035f34d3297751f7b47e657d");
  });
});
