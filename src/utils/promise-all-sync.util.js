import { GeneralValidator } from '../validators'

export default function PromiseAllSync(promises) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!GeneralValidator(promises).isArray()) {
                throw new String('promises must be an array of promise')
            }

            const result = []

            for (let i = 0; i < promises.length; i++) {
                if (!(promises[i] instanceof Promise)) {
                    throw new String('promises must be an array of promise')
                }

                result.push(await promises[i])
            }

            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}
