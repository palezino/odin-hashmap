function hashStringToInt(string, mapSize) {
  let hash = 5381; // Choose a prime initial value

  for (let i = 0; i < string.length; i++) {
    hash = (33 * hash + string.charCodeAt(i)) % mapSize; // Update hash value
  }

  return hash;
}

class HashMap {
  map = new Array(17);
  numItems = 0;

  resize = () => {
    const newMap = new Array(this.map.length * 2);
    // because we use the map length as an argument in hash function
    // we need to change all the hashes
    this.map.forEach((item) => {
      if (item) {
        item.forEach(([key, value]) => {
          const idx = hashStringToInt(key, newMap.length);
          if (this.map[idx]) {
            const item = this.map[idx].find((x) => x[0] === key);

            if (item) {
              item[1] = value;
            } else {
              this.map[idx].push([key, value]);
            }
          } else {
            this.map[idx] = [[key, value]];
          }
        });
      }
    });
    this.map = newMap;
  };

  has = (key) => {
    const idx = hashStringToInt(key, this.map.length);
    // console.log("map", this.map);
    // console.log("key idx", key, idx);
    if (this.map[idx]) {
      return true;
    } else {
      return false;
    }
  };

  set = (key, value) => {
    this.numItems++;
    const loadFactor = this.numItems / this.map.length;
    // resize the map it the load factor is too big
    if (loadFactor > 0.8) {
      this.resize();
    }

    const idx = hashStringToInt(key, this.map.length);
    // check if there is already a value at this position
    if (this.map[idx]) {
      const item = this.map[idx].find((x) => x[0] === key);

      if (item) {
        item[1] = value;
      } else {
        this.map[idx].push([key, value]);
      }
    } else {
      this.map[idx] = [[key, value]];
    }
  };

  get = (key) => {
    const idx = hashStringToInt(key, this.map.length);
    // if the index doesn't exist - return null
    if (!this.map[idx]) {
      return null;
    }
    // gor through the index and find the key we need
    return this.map[idx].find((x) => x[0] === key)[1];
  };

  remove = (key) => {
    const idx = hashStringToInt(key, this.map.length);
    // console.log("map", this.map);
    // console.log("key idx", key, idx);
    if (this.map[idx]) {
      delete this.map[idx];
      return true;
    } else {
      return false;
    }
  };

  clear = () => {
    this.map = new Array(17);
  };

  keys = () => {
    let result = [];
    this.map.forEach((item) => {
      if (item) {
        result.push(item[0][0]);
      }
    });
    return result;
  };

  values = () => {
    let result = [];
    this.map.forEach((item) => {
      if (item) {
        result.push(item[0][1]);
      }
    });
    return result;
  };

  entries = () => {
    let result = [];
    this.map.forEach((item) => {
      if (item) {
        result.push(item[0]);
      }
    });
    return result;
  };
}

const myMap = new HashMap();
myMap.set("firstName", "bob");
myMap.set("lastName", "tim");
myMap.set("age", 5);
myMap.set("birthday", "1/2/3");

// console.log(hashStringToInt("firstName", 17));

console.log(myMap.map.length);
console.log(myMap.get("firstName"));
console.log(myMap.get("lastName"));
console.log(myMap.get("age"));
console.log(myMap.get("birthday"));
console.log("has", myMap.has("birthday"));
console.log("has", myMap.has("genders"));
// console.log("remove", myMap.remove("age"));
// console.log(myMap.map);
// console.log("remove", myMap.remove("job"));
// console.log(myMap.map);
console.log(myMap.keys());
// console.log(myMap.clear());
console.log(myMap.values());
console.log(myMap.entries());
