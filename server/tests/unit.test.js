import request from 'supertest';
import { app } from '../app.js';

describe("Server Health Monitor", () => {
    test("health 200", async () => {
        const response = await request(app).get("/api/health");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ status: "ok" });
    });
});

