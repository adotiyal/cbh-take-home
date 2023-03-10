const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const functions = {

  getCandidate: (event) => {
    let candidate;
    if (event) {
      if (event.partitionKey) {
        candidate = event.partitionKey;
      } else {
        const data = JSON.stringify(event);
        candidate = crypto.createHash("sha3-512").update(data).digest("hex");
      }
    }
    return candidate;
  },


  deterministicPartitionKey: (event) => {

    let candidate = functions.getCandidate(event);

    if (candidate) {
      if (typeof candidate !== "string") {
        candidate = JSON.stringify(candidate);
      }
    } else {
      candidate = TRIVIAL_PARTITION_KEY;
    }
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
    return candidate;
  }

}

module.exports = functions
