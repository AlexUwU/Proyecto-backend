let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
chai.use(chaiHttp);
const url = "http://localhost:8009";

describe("Inicio Sesion :", () => {
  it("Test de inicio de sesion", (done) => {
    chai
      .request(url)
      .post("/petroll/login")
      .send({ Usuario: 'AlexUwU', Contrasena: 'AlexUwU' })
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Bienvenido");
        done();
      });
  });
});

describe("Inicio Sesion :", () => {
  it("Test de usuario/password fallido", (done) => {
    chai
      .request(url)
      .post("/petroll/login")
      .send({ Usuario: 'AlexUwU', Contrasena: 'AlexUwU1' })
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Credenciales incorrectas");
        done();
      });
  });
});

describe("Registro:", () => {
  it("Test de registro de usuario", (done) => {
    chai
      .request(url)
      .post("/petroll/register")
      .send({ Usuario: '111AlexUwU1', Contrasena: 'AlexUwU1' })
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Usuario creado");
        done();
      });
  });
});

describe("Registro:", () => {
  it("Test de registro de usuario", (done) => {
    chai
      .request(url)
      .post("/petroll/register")
      .send({ Usuario: 'AlexUwU', Contrasena: 'AlexUwU' })
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Usuario ya existe");
        done();
      });
  });
});

describe("Solicitud:", () => {
  it("Test de crear solicitud", (done) => {
    chai
      .request(url)
      .post("/petroll/crearsolicitud")
      .send({ titulo: 'Unit Testing Alex', descripcion: 'AlexUwU'})
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Solicitud iniciada correctamente!");
        done();
      });
  });
});

describe("Solicitud:", () => {
  it("Test de aceptar solicitud", (done) => {
    chai
      .request(url)
      .post("/petroll/rechazarsolicitud")
      .send({ _id: '6095964e083b0234e470b0c8'})
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Solicitud rechazada correctamente!");
        done();
      });
  });
});

describe("Solicitud:", () => {
  it("Test de rechazar solicitud", (done) => {
    chai
      .request(url)
      .post("/petroll/aceptarsolicitud")
      .send({ _id: '6095964e083b0234e470b0c8'})
      .end((err, res) => {
        expect(res.body.mensaje).to.equals("Solicitud aceptada correctamente!");
        done();
      });
  });
});