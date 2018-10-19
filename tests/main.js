<<<<<<< HEAD
import assert from "assert";

describe("scu-alumni-businesses", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "scu-alumni-businesses");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
=======
import { Meteor } from 'meteor/meteor';
import assert from 'assert';

describe('software-engineering-lab', function () {
  it('package.json has correct name', async function () {
    const { name } = await import('../package.json');
    assert.strictEqual(name, 'software-engineering-labBBBBBB');
  });

  if (Meteor.isClient) {
    it('client is not server', function () {
>>>>>>> dd558da0d8015212b7c80fa877617628608603a4
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
<<<<<<< HEAD
    it("server is not client", function () {
=======
    it('server is not client', function () {
>>>>>>> dd558da0d8015212b7c80fa877617628608603a4
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
