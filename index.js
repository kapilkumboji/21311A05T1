const express = require('express');
const app = express();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const PORT = 8000;
const myURL = "http://20.244.56.144/test/companies/";

var clientID = 'd725bfa7-965c-4f98-8a38-8c02cab48ac4';
var clientSecret = 'RAivBWlmelJwJAzU';
var authenticationToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3ODMyNzU1LCJpYXQiOjE3MTc4MzI0NTUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ3MjViZmE3LTk2NWMtNGY5OC04YTM4LThjMDJjYWI0OGFjNCIsInN1YiI6IjIxMzExQTA1VDFAc3JlZW5pZGhpLmVkdS5pbiJ9LCJjb21wYW55TmFtZSI6IkFmZm9yZE1lZGljYWwiLCJjbGllbnRJRCI6ImQ3MjViZmE3LTk2NWMtNGY5OC04YTM4LThjMDJjYWI0OGFjNCIsImNsaWVudFNlY3JldCI6IlJBaXZCV2xtZWxKd0pBelUiLCJvd25lck5hbWUiOiJLYXBpbCIsIm93bmVyRW1haWwiOiIyMTMxMUEwNVQxQHNyZWVuaWRoaS5lZHUuaW4iLCJyb2xsTm8iOiIyMTMxMUEwNVQxIn0.7aEWR4xScFpGdFdcAAqK-8Ks-qevgvswJ3HxrDeR8J8";

app.get('/:company/categories/:category/products', async (req, res) => {
    const top = req.query.top;
    const minP = req.query.minP;
    const maxP = req.query.maxP;
    const url = `${myURL}${company}`;
    const company = req.params.company;
    const cat = req.params.cat;
    const n = parseInt(req.query.n) || 10;
    const page = parseInt(req.query.page) || 1;
    const sortB = req.query.sort_by;
    const sortO = req.query.sort_order || 'asc';
    const pro = await fP(url, cat, top, minP, maxP);
    pro.forEach(pro => {
        pro.id = uuidv4();
    });
    const sortPage = SnP(pro, sortB, sortO, page, n);
    res.json(sortPage);
});

const SnP = (pro, sortB, sortO, page, n) => {
    if (sortB) {
        pro.sort((a, b) => {
            if (sortO === 'desc') {
                return b[sortB] - a[sortB];
            } else {
                return a[sortB] - b[sortB];
            }
        });
    }
    const start = (page - 1) * n;
    const end = start + n;
    return pro.slice(start, end);
};

const fP = async (url, cat, t, minP, maxP) => {
    const response = await axios.get(`${url}/${cat}/products`, {
        params: { top: t, minP: minP, maxP: maxP },
        headers: { Authorization: `Bearer ${authenticationToken}` }
    });
    return response.data;
};