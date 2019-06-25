import * as assert from "assert";
import {RedisClient} from "../src/client";

describe('RedisClient', function() {
  var client = new RedisClient();
  describe('get', async function() {
    var v = await client.get("abc")
    it('should return 123', function() {
      assert.equal(v, "123");
    });
  });
});