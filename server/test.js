import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { server, stop } from "./app.js";

chai.use(chaiHttp);
chai.should();

describe("POST /", () => {
  it("should receive 500 status due to payload dbeing empty", (done) => {
    chai
      .request(server)
      .post("/")
      .send({})
      .end((err, res) => {
        expect(res.should.have.status(500));
        done();
      });
  });
  it("should receive 422 status due to payload does not contain Google url", (done) => {
    chai
      .request(server)
      .post("/")
      .send({
        location: {
          href: "https://gokhanarkan.com",
        },
      })
      .end((err, res) => {
        expect(res.should.have.status(422));
        done();
      });
  });
  it("should receive 200 status as the data sent properly", (done) => {
    chai
      .request(server)
      .post("/")
      .send({
        location: {
          href: "https://www.google.com/search?q=hello+world&rlz=1C5CHFA_enGB965GB965&oq=hello+world&aqs=chrome.0.69i59j46i433i512j0i512l3j46i512j0i512l4.1533j0j9&sourceid=chrome&ie=UTF-8",
        },
      })
      .end((err, res) => {
        expect(res.should.have.status(200));
        done();
      });
  });
});

stop();
