import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductInterface from "../entity/product.interface";
import * as yup from 'yup'

export default class ProductYupValidator implements ValidatorInterface<ProductInterface> {
    validate(entity: ProductInterface): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().trim().required('Id is required'),
                    name: yup.string().trim().required('Name is required'),
                    price: yup.number().positive('Price must be greater than zero')
                })
                .validateSync(
                    {
                        id: entity.id,
                        name: entity.name,
                        price: entity.price,
                    },
                    {
                        abortEarly: false
                    }
                )
        } catch (errors) {
            const e = errors as yup.ValidationError
            e.errors.map(error => entity.notification.add({
                context: 'Product',
                message: error,
            }))
        }
    }
}