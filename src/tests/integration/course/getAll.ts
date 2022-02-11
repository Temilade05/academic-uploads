import chai from "chai";
import chaiHttp from "chai-http";
const { assert } = chai;

chai.use(chaiHttp);

describe("Get all Courses Integration", () => {
  it("Sample test 1", (done) => {
    assert.equal(1 + 3, 4);
    done();
  });
});
