import request from "supertest";
import app from "../src/app";
import { expect } from "chai";

describe("Get /search", () => {
    it("should return 200 OK", (done) => {
        return request(app).get("/search?serviceName=Massage&geoLocation=59.40411099999999,18.109118499999962")
            .expect(200)
            .end(function(err, res) {
                expect(200);
                done();
            });

    });
});
describe("Get /search", () => {
    it("should return 200 OK with results", (done) => {
        return request(app).get("/search?serviceName=Massage&geoLocation=59.40411099999999,18.109118499999962")
            .expect(200)
            .end(function(err, res) {
                expect(res.body.results).not.to.be.empty;
                done();
            });

    });
});
describe("Get /search", () => {
    it("should return some error on missign query parameters", (done) => {
        return request(app).get("/search")
            .expect(400)
            .end(function(err, res) {
                expect(res.error).not.to.be.undefined;
                done();
            });

    });
});

describe("POST /search", () => {
    it("should return 200 OK with search results", (done) => {
        return request(app).post("/search")
            .send({serviceName: "Massage", geoLocation: "59.40411099999999,18.109118499999962"})
            .expect(200)
            .end(function(err, res) {
                expect(res.body.results).not.to.be.empty;
                done();
            });

    });
});

describe("POST /search", () => {
    it("should return 200 OK with empty results", (done) => {
        return request(app).post("/search")
            .send({serviceName: "ZZ", geoLocation: "59.40411099999999,18.109118499999962"})
            .expect(200)
            .end(function(err, res) {
                expect(res.body.results).to.be.empty;
                done();
            });
    });
});

describe("POST /search", () => {
    it("should return some error on missign parameters", (done) => {
        return request(app).post("/search")
            .field("serviceName", "Massage")
            .expect(400)
            .end(function(err, res) {
                expect(res.error).not.to.be.undefined;
                done();
            });

    });
});
