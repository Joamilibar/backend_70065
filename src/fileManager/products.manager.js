// const path = require("path");
import path from "path";
// const fs = require("fs").promises;
import fs from "fs/promises";
import __dirname from "../utils.js"; // __dirname con ES modules


const prodFilePath = path.join(__dirname, "/data/products.json");

// Clase para manejar archivos
class FileManager {
    constructor(filePath) {
        this.filePath = path.join(__dirname, "/data/products.json");
    }

    // Función para leer archivo 

    async readFile() {
        try {
            const data = await fs.readFile(this.filePath, "utf-8");
            return data ? JSON.parse(data) : [];
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("El archivo no existe");
                return [];
            } else {
                console.error("Error al leer el archivo", error);
                return [];
                throw error;
            }
        }
    }

    // Función para escribir archivo

    async writeFile(content) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(content, null, 2), "utf-8");
            console.log("Datos actualizados correctamente");
        } catch (error) {
            console.error("Error al crear el archivo", error);
        }
    }


}


export const prodFileManager = new FileManager(prodFilePath);

