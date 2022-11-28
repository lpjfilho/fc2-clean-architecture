import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";


describe('Integration test update product use case', () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            database: ':memory:',
            logging: false,
            sync: { force: true },
        })

        await sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should update a product', async () => {
        const productRepository = new ProductRepository()

        const createProductUseCase = new CreateProductUseCase(productRepository)
        const product = await createProductUseCase.execute({ 'name': 'Product 1', price: 10 })

        product.name = 'Updated'
        product.price = 20

        const updateProductUseCase = new UpdateProductUseCase(productRepository)
        const output = await updateProductUseCase.execute(product)

        expect(output).toEqual(product)
    })

    it('should not update a product', async () => {

        const input = {
            id: '123',
            name: 'Updated',
            price: 20,
        }

        const updateProductUseCase = new UpdateProductUseCase(new ProductRepository())

        await expect(async () => {
            await updateProductUseCase.execute(input)
        }).rejects.toThrow('Product not found')
    })
})