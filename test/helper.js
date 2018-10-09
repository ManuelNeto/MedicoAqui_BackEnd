const supertest = require("supertest");
const chai = require("chai");
const app = require("../app");


global.request = supertest(app);
global.app = app;
global.expect = chai.expect;