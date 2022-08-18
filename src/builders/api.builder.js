export default class ApiBuilder {
    constructor() {
        this.__api = []
    }

    add(path, controller) {
        this.__api.push({ path, controller })

        return this
    }

    addApi(path, controller) {
        return this.add(`/api/${path}`, controller)
    }

    addApiV1(path, controller) {
        return this.add(`/api/v1/${path}`, controller)
    }

    build() {
        return Object.freeze(this.__api)
    }
}
