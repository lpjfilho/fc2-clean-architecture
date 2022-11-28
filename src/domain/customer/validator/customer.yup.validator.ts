import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from 'yup'

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().trim().required('Id is required'),
                    name: yup.string().trim().required('Name is required'),
                })
                .validateSync(
                    {
                        id: entity.id,
                        name: entity.name
                    },
                    {
                        abortEarly: false,
                    }
                )
        } catch (errors) {
            const e = errors as yup.ValidationError
            e.errors.map(error => entity.notification.add({
                context: 'Customer',
                message: error,
            }))
        }
    }
}