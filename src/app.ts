import "module-alias/register";
import { envs } from './core/config/env';
import { start, ServerOptions } from './server';

const options: ServerOptions = {
    port: envs.PORT,
    prefix: envs.API_PREFIX
}

async function main(): Promise<void> {
    await start(options);
}

main();