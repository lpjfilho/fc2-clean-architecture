import express, {Request, Response} from "express";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository())

    try {
        const output = await useCase.execute({
            name: req.body.name,
            price: req.body.price,
        })
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})

productRoute.get('/', async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository())

    try {
        const output = await useCase.execute()
        res.send(output)
    } catch (err) {
        res.status(500).send(err)
    }
})