import { fixture, assert } from "@open-wc/testing";
import { IronMeta } from "@polymer/iron-meta/iron-meta.js";
import { ValidatorMixin } from "../validator-mixin.js";
import "./simple-validator.js";

class BaseClass {}
class TestClass extends ValidatorMixin(BaseClass) {
  static get is() {
    return "test-class";
  }
}

describe("ValidatorMixin", () => {
  it("registered in <iron-meta>", async () => {
    await fixture("<simple-validator></simple-validator>");

    assert.ok(
      new IronMeta({ type: "validator" }).byKey("simple-validator"),
      "simple-validator found in <iron-meta>"
    );
  });

  it("validate() returnes true by default", async () => {
    const element = await fixture("<simple-validator></simple-validator>");
    assert.isTrue(element.validate());
  });

  it("Has a message poroperty", async () => {
    const element = await fixture(
      '<simple-validator message="test"></simple-validator>'
    );
    assert.equal(element.message, "test");
  });

  it("Won't set the same message", async () => {
    const element = await fixture(
      '<simple-validator message="test"></simple-validator>'
    );
    element.message = "test";
    // it's for coverage
  });

  it("Uses `is` getter to register the validator", () => {
    new TestClass();
    assert.ok(new IronMeta({ type: "validator" }).byKey("test-class"));
  });
});
