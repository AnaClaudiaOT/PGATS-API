import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { getBaseUrl } from './helpers/getBaseUrl.js';
import { login } from './helpers/login.js';
import faker from 'k6/x/faker';

export let options = {
     thresholds: {
        http_req_duration: ['p(95)<2000'],
        'register_duration': ['p(95)<2000'],
    },
    stages: [
        { duration: '3s', target: 10 }, // Ramp up
        { duration: '15s', target: 10 }, // Average 
        { duration: '2s', target: 100 }, // Spike
        { duration: '3s', target: 100 }, // Spike
        { duration: '5s', target: 10 }, // Average
        { duration: '5s', target: 0 }, // Ramp down
    ],
};

const registerDuration = new Trend('register_duration');

export default function () {
    let username, password, favorecido, token;

    group('Registrar usuário', function () {
        // Gera nome de usuário único com timestamp
        const baseName = faker.person.firstName();
        const timestamp = Date.now();
        username = `${baseName}_${timestamp}`;
        password = faker.internet.password();
        favorecido = true;
        const url = `${getBaseUrl()}/users/register`;
        const payload = JSON.stringify({ username, password, favorecido });
        const params = { headers: { 'Content-Type': 'application/json' } };
        const res = http.post(url, payload, params);
        check(res, { 'register status 201': (r) => r.status === 201 });
        registerDuration.add(res.timings.duration);
        console.log("REGISTRO", res)
    });

    group('Login com reaproveitamento de resposta', function () {
        token = login(username, password);

    });

    sleep(1);
}
