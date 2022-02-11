import chai from "chai";
import chaiHttp from "chai-http";
const { assert } = chai;

chai.use(chaiHttp);

describe("Get all Courses Unit test", () => {
  it("Sample test 2", (done) => {
    assert.equal(1 + 1, 2);
      done();
  });
});
