
const path = require("path");
const fs = require("fs").promises;


const prodFilePath = path.join(__dirname, "../data/products.json");
const cartsFilePath = path.join(__dirname, "../data/carts.json");


class FileManager {
    constructor(filePath) {
        this.filePath = path.join(__dirname, "../data/products.json");
    }

    // Función para leer archivo 

    async readFile() {
        try {
            const data = await fs.readFile(this.filePath, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("El archivo no existe");
                return [];
            } else {
                console.error("Error al leer el archivo", error);
                throw error;
            }
        }
    }

    // Función para escribir archivo

    async writeFile(content) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(content, null, 2), "utf-8");
            console.log("Archivo creado correctamente");
        } catch (error) {
            console.error("Error al crear el archivo", error);
        }
    }

    // Función para actualizar archivo

    async appendFile(dataAdicional) {
        try {
            await fs.appendFile(this.filePath, dataAdicional);
            console.log("Información actualizada correctamente");
        } catch (error) {
            console.error("Error al actualizar el archivo", error);
        }
    }

}

module.exports = {
    prodFileManager: new FileManager(prodFilePath),
    cartsFileManager: new FileManager(cartsFilePath)
};


/* 
// Función para leer archivo 


async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf-8")
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer el archivo", error);

    }
}

// Función para escribir archivo

async function writeFile(filePath, content) {
    try {
        await fs.writeFile(filePath, JSON.stringify(content, null, 2), "utf-8")
        console.log("Archivo creado correctamente");
    } catch (error) {
        console.error("Error al crear el archivo", error);
    }
}

// Función para actualizar archivo

async function appendFile() {
    const dataAdicional = "Más información para agregar!";
    try {
        await fs.appendFile("archivo.txt", dataAdicional);
        console.log("Información actualizada correctamente");
    } catch (error) {
        console.error("Error al actualizar el archivo", error);
    }
}
 */
