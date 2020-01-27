module.exports = [
  {
    expected: {
      statusCode: 200,
      responseBody: [{key: 'messeage', value: 'RANDOM'}],
    },
    option: {
      host: 'localhost',
      port: 3000,
      path: '/random',
      method: 'GET',
      headers: {
        authorization: 'Basic QW5kcmlpOjEyMzMyMQ==',
      },
    },
  },
  {
    expected: {
      statusCode: 401,
      responseBody: [{key: 'messeage', value: 'Unauthorized'}],
    },
    option: {
      host: 'localhost',
      port: 3000,
      path: '/metrics',
      method: 'GET',
    },
  },
  // {
  //   expected: {
  //     statusCode: 404,
  //     responseBody: [{key: 'messeage', value: 'rout no found'}],
  //   },
  //   option: {
  //     host: 'localhost',
  //     port: 3000,
  //     path: '/somerouts',
  //     method: 'GET',
  //     headers: {
  //       authorization: 'Basic QW5kcmlpOjEyMzMyMQ==',
  //     },
  //   },
  // },
  // {
  //   expected: {
  //     statusCode: 200,
  //     responseBody: [
  //       {key: 'total', value: 'number'},
  //       {key: 'free', value: 'number'},
  //       {key: 'allocated', value: 'number'},
  //     ],
  //   },
  //   option: {
  //     host: 'localhost',
  //     port: 3000,
  //     path: '/metrics',
  //     method: 'GET',
  //     headers: {
  //       authorization: 'Basic QW5kcmlpOjEyMzMyMQ==',
  //     },
  //   },
  // },
  // {
  //   expected: {
  //     statusCode: 200,
  //     responseBody: [{key: 'total', value: 'number'}],
  //   },
  //   option: {
  //     host: 'localhost',
  //     port: 3000,
  //     path: '/metrics?filter=total',
  //     method: 'GET',
  //     headers: {
  //       authorization: 'Basic QW5kcmlpOjEyMzMyMQ==',
  //     },
  //   },
  // },
  // {
  //   expected: {
  //     statusCode: 200,
  //     responseBody: [{key: 'free', value: 'number'}],
  //   },
  //   option: {
  //     host: 'localhost',
  //     port: 3000,
  //     path: '/metrics?filter=free',
  //     method: 'GET',
  //     headers: {
  //       authorization: 'Basic QW5kcmlpOjEyMzMyMQ==',
  //     },
  //   },
  // },
  // {
  //   expected: {
  //     statusCode: 200,
  //     responseBody: [{key: 'allocated', value: 'number'}],
  //   },
  //   option: {
  //     host: 'localhost',
  //     port: 3000,
  //     path: '/metrics?filter=allocated',
  //     method: 'GET',
  //     headers: {
  //       authorization: 'Basic QW5kcmlpOjEyMzMyMQ==',
  //     },
  //   },
  // },
  // {
  //   expected: {
  //     statusCode: 400,
  //     responseBody: [{key: 'messeage', value: 'Filter value is not valid'}],
  //   },
  //   option: {
  //     host: 'localhost',
  //     port: 3000,
  //     path: '/metrics?filter=unrealkey',
  //     method: 'GET',
  //     headers: {
  //       authorization: 'Basic QW5kcmlpOjEyMzMyMQ==',
  //     },
  //   },
  // },
  // {
  //   expected: {
  //     statusCode: 200,
  //     responseBody: [
  //       {
  //         key: 'messeage',
  //         value: 'Minimum free memory limit is successfully set to 1000 MB',
  //       },
  //     ],
  //   },
  //   option: {
  //     host: 'localhost',
  //     port: 3000,
  //     path: '/limit',
  //     method: 'POST',
  //     headers: {
  //       authorization: 'Basic QW5kcmlpOjEyMzMyMQ==',
  //       'Content-Type': 'application/json',
  //       'Content-Length': Buffer.byteLength(
  //         JSON.stringify({
  //           limit: 1000,
  //         }),
  //       ),
  //     },
  //   },
  //   body: JSON.stringify({
  //     limit: 1000,
  //   }),
  // },
];
