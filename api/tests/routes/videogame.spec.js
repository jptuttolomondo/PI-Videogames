/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const { LandingPage } = require('../../../client/src/components/landing/landingPage.js');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

 const agent = session(app);

describe("Genre GET", () => {
  it("should get status 200", () => agent.get("/genres").expect(200))
  it('should return array', () => agent.get("/genres").then((res) => {
    expect(res.body instanceof Array).to.be.true;
  }))
})
 
describe("Platforms GET", () => {
  it("should get status 200", () => agent.get("/platforms").expect(200))
  it('should return array', () => agent.get("/platforms").then((res) => {
    expect(res.body instanceof Array).to.be.true;
  }))
})

