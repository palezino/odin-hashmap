function hash(string, arrLength) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < string.length; i++) {
    hashCode = (primeNumber * hashCode + string.charCodeAt(i)) % arrLength;
  }

  return hashCode;
}

class HashMap {
  storage = new Array(16);
  numItems = 0;

  set(key, value) {
    let hashKey = hash(key, this.storage.length);
    this.storage[hashKey] = value;
  }
  get(key) {
    let hashKey = hash(key, this.storage.length);

    if (!this.storage[hashKey]) {
      return null;
    }
    return this.storage[hashKey];
  }
}

let newMap = new HashMap();
newMap.set("Surname", "Teller");
console.log(newMap.storage);
console.log(newMap.get("Surname"));
