const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: false }));
    describe("Title", () => {
      it("Should throw an error if title is null", (done) => {
        Recipe.create({
          summary: "Churrascos de carne rebosados en pan rayado con guebo,se hace frito o al horno",
        })
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });
      it("Should throw an error if summary is null", () => {
        Recipe.create({ title: "Milanesa de posho" })
          .then(() => done(new Error("It requires a summary")))
          .catch(() => done());
      });
    });
    describe("Add Likes", () => {
      it("Shouldn't work with a string in aggregateLikes", (done) => {
        Recipe.create({
          title: "Milanesa de carne de vaca moerta",
          summary: "churrasco de carne rebosado en pan rayado con guevo, se puede hacer frito o al horno",
          aggregateLikes: "This is invalid data",
        })
          .then(() => done("Should not be created"))
          .catch(() => done());
      });
    });

    describe("Health Score", () => {
      it("Shouldn't work with a string in healthScore", (done) => {
        Recipe.create({
          title: "Milanesa de carne",
          summary: "churrasco de carne rebosado en pan rayado con guevo, se puede hacer frito o al horno",
          healthScore: "This is invalid data",
        })
          .then(() => done("Should not be created"))
          .catch(() => done());
      });
    });
  });
});
