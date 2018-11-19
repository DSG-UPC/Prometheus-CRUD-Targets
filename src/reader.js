const fs = require("file-system")

/**
 * Reader class for CRUD operations 
 */
class Reader {

    constructor(filename) {
        this.filename = filename
    }

    read() {
        try {
            this.targets = JSON.parse(fs.readFileSync(this.filename).toString())
        } catch (err) {
            return -2
        }
        return [0, JSON.stringify(this.targets)]
    }

    create(data) {
        try {
            this.targets = JSON.parse(fs.readFileSync(this.filename).toString())
        } catch {
            return -2
        }
        if (!this.targets[0].targets.includes(data)) {
            this.targets[0].targets.push(data)
            fs.writeFileSync(this.filename, JSON.stringify(this.targets))
            return 0;
        } else {
            return [-1, "The target to be added already exists"]
        }
    }

    delete(old) {
        try {
            this.targets = JSON.parse(fs.readFileSync(this.filename).toString())
        } catch {
            return -2
        }
        var index = this.targets[0].targets.indexOf(old)
        if (index != -1) {
            this.targets[0].targets.splice(index, 1)
            fs.writeFileSync(this.filename, JSON.stringify(this.targets))
            return 0
        } else {
            return [-3, "The element to be deleted doesn't exist"]
        }
    }

    update(old, data) {
        try {
            this.targets = JSON.parse(fs.readFileSync(this.filename).toString())
        } catch {
            return -2
        }
        var index = this.targets[0].targets.indexOf(old)
        if (index != -1) {
            this.targets[0].targets[index] = data
            fs.writeFileSync(this.filename, JSON.stringify(this.targets))
            return 0
        } else {
            return [-3, "The element to be updated doesn't exist"]
        }
    }
}

module.exports = Reader