require('dotenv').config({ path: '../.env' });
const express = require('express');
const morgan = require('morgan')

const { createProxyMiddleware } = require('http-proxy-middleware');

const PATH_V1 = '/proxy/v1/';

const PORT = process.env.PROXY_APP_PORT || 4000;
const API_BACKEND_URL = process.env.API_BACKEND_URL || 'http://172.28.128.7:5000';

const app = express();
app.use(morgan('combined'));

app.use(
  PATH_V1,
  createProxyMiddleware({
    target: API_BACKEND_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^${PATH_V1}`]: '/v1/',
    },
    onProxyRes: (proxyRes, req, res) => {
	    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
	  },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Access-Control-Allow-Origin', '*');
      proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
      proxyReq.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    },
  })
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
