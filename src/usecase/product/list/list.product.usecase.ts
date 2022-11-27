import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import {OutputListProductDto} from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository
    }

    async execute(): Promise<OutputListProductDto> {
        const output = await this.productRepository.findAll()

        return {
            products: output.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                }
            })
        }
    }
}