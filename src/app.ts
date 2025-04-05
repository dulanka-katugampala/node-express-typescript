import "module-alias/register";
import { envs } from './core/config/env';
import { Server, ServerOptions } from './server';

const options: ServerOptions = {
    port: envs.PORT,
    prefix: envs.API_PREFIX
}

async function main(): Promise<void> {
    const server = new Server(options);
    void server.start();
}

main();