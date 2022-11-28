import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe('Integration test create product use case', () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            database: ':memory:',
            logging: false,
            sync: { force: true }
        })

        await sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a product', async () => {
        const input = {
            name: 'Product',
            price: 10
        }

        const createProductUseCase = new CreateProductUseCase(new ProductRepository())
        const product = await createProductUseCase.execute(input)

        expect(product).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        })
    })

    it('should not create a product because name is empty', async () => {
        const input = {
            name: '',
            price: 10
        }

        const createProductUseCase = new CreateProductUseCase(new ProductRepository())

        await expect(async () => {
            await createProductUseCase.execute(input)
        }).rejects.toThrow('Name is required')
    })

    it('should not create a product because price is not valid', async () => {
        const input = {
            name: 'Product',
            price: -10
        }

        const createProductUseCase = new CreateProductUseCase(new ProductRepository())

        await expect(async () => {
            await createProductUseCase.execute(input)
        }).rejects.toThrow('Price must be greater than zero')
    })
})