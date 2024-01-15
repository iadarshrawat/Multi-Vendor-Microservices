import { DBClient } from "./../utility/databaseClient";

export class DBOperation {
    constructor() {}

    async executeOuery(queryString: string, values: unknown[]) {
        const client = await DBClient();
        await client.connect();
        const result = await client.query(queryString, values);
        await client.end();
        return result;
    }
}