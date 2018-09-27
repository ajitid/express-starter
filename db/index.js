import { createConnection } from "typeorm";

const connection = await createConnection({
    type: 'postgres',
    url: "postgres://aujgqvxfzssfiw:322ed3b6c053d62f9fbf6c906cd1201f1380a46484847b3343bbe45bdc736435@ec2-23-23-253-106.compute-1.amazonaws.com:5432/db0g68jge47tmq"
}).connect();

