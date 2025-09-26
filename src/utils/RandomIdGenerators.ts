import crypto from "node:crypto";

class RandomIdGenerators {
    genUUID(): string {
        return crypto.randomUUID();
    }
    genUserId(prefix: string): string {
        return prefix + "-" + crypto.randomBytes(2).toString("hex") + "-" + crypto.randomBytes(4).toString("hex");
    }
}

export default new RandomIdGenerators();