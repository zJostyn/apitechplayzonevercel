"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const productos_service_1 = require("./productos.service");
describe('ProductosService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(productos_service_1.ProductosService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
