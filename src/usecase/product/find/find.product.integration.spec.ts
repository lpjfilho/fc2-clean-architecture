import FindProductUseCase from "./find.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe('Integration test find product use case', () => {

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

    it('should find all products', async () => {
        const productRepository = new ProductRepository()

        const createProductUseCase = new CreateProductUseCase(productRepository)
        const product = await createProductUseCase.execute({
            name: 'Product',
            price: 10
        })

        const findProductUseCase = new FindProductUseCase(productRepository)
        const output = await findProductUseCase.execute({ id: product.id })

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        })
    })

    it('should find all products', async () => {
        const findProductUseCase = new FindProductUseCase(new ProductRepository())

        await expect(async () => {
            await findProductUseCase.execute({id: '999'})
        }).rejects.toThrow('Product not found')
    })
})