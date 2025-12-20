import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { getBaseUrl } from './helpers/getBaseUrl.js';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function () {
    return JSON.parse(open('./data/login.test.data.json'))
});

export let options = {
    VUS: 3,
    iterations: 3,
    thresholds: {
        http_req_duration: ['p(95)<2000'],
    },

};


export default function () {
    const user = users[(__VU - 1) % users.length];
    const username = user.username;
    const password = user.password;
    const favorecido = true;

    group('Registrar usuário DDT', function () {
        console.log("REGISTRO DDT", user);
        console.log("----------------------");
        const url = `${getBaseUrl()}/users/register`;
        const payload = JSON.stringify({ username, password, favorecido });
        const params = { headers: { 'Content-Type': 'application/json' } };
        const res = http.post(url, payload, params);
        check(res, { 'register status 201': (r) => r.status === 201 });
        console.log(res);
    });

    group('Login com Data-Driven Testing', function () {
        console.log("Login DDT", user);
        const res = http.post(`${getBaseUrl()}/users/login`,
            JSON.stringify({ username, password }),
            { headers: { 'Content-Type': 'application/json' } });
        check(res, { 'login status 200': (r) => r.status === 200 });
    });

    sleep(1);
}
