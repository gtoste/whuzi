import fs from 'fs/promises';
import path from 'path';
import type {Product} from "$lib/types/Product";


const DATA_DIR = path.resolve('data');
const DATA_FILE = path.join(DATA_DIR, 'products.json');

async function readData(): Promise<Product[]> {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data) as Product[];
    } catch (error) {
        return []; //
    }
}

async function writeData(products: Product[]): Promise<void> {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

export async function getProducts(): Promise<Product[]> {
    return await readData();
}

export async function getProduct(id: number): Promise<Product | undefined> {
    const products = await readData();
    return products.find((p) => p.id === id);
}

export async function addProduct(product: Product): Promise<void> {
    const products = await readData();
    products.push(product);
    await writeData(products);
}

export async function updateProduct(updatedProduct: Product): Promise<boolean> {
    let products = await readData();
    const index = products.findIndex((p) => p.id === updatedProduct.id);
    if (index === -1) return false;
    products[index] = updatedProduct;
    await writeData(products);
    return true;
}

export async function deleteProduct(id: number): Promise<boolean> {
    let products = await readData();
    const filteredProducts = products.filter((p) => p.id !== id);
    if (filteredProducts.length === products.length) return false;
    await writeData(filteredProducts);
    return true;
}