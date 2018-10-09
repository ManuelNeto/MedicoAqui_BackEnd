'use strict';
const mongoose = require("mongoose");
const User = mongoose.model('User');

describe('API Tests', function() {
    var user = {};

    var credencials = {
        "email": "manuel@ccc.ufcg.edu.br",
         "password": "123456"
    };

    before((done) => {
        user = new User({
            "_id": new mongoose.mongo.ObjectId('56cb91bdc3499f14678934ca'),
            name: 'integration test',
            email: 'manuel@ccc.ufcg.edu.br',
            password: '123456',
            userKind: 'Patient',
            age: 22
            });
        user.save();
        done();
    });
  
    //excluindo o usuario do bd
    after((done) => {
        User.findOneAndRemove({name: user.name}).then((result) => {
            done();
        });
    });

    describe('Router User - POST /login', () => {
        it('should login user', (done) => {
            request
            .post('/login')
            .set("Content-type", 'application/json')
            .send(credencials)
            .end(function(err, res) {
                expect(200).to.be.equal(res.body.status)
                //expect('Usuario Logado!').to.equal(res.body.message);
                done();
            });
        });
    });



});