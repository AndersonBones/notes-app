
import request from 'supertest'
import app from '../app'

describe('Testing endpoints',()=>{
    it('should main',(done)=>{
        request(app).get('/').then(response=>{
            expect(response.statusCode).not.toBe(401)
            return done();
        })
    })
})