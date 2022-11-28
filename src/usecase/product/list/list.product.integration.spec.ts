import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";
import {OutputListProductDto} from "./list.product.dto";


describe('Integration test list product use case', () => {

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

    it('should list all products', async () => {
        const productRepository = new ProductRepository()

        let output: OutputListProductDto

        const listProductUseCase = new ListProductUseCase(productRepository)
        output = await listProductUseCase.execute()

        expect(output.products).toHaveLength(0)

        const createProductUseCase = new CreateProductUseCase(productRepository)
        const product1 = await createProductUseCase.execute({ 'name': 'Product 1', price: 10 })
        const product2 = await createProductUseCase.execute({ 'name': 'Product 2', price: 20 })

        output = await listProductUseCase.execute()

        expect(output.products).toHaveLength(2)

        expect(output.products[0]).toEqual(product1)
        expect(output.products[1]).toEqual(product2)
    })
})