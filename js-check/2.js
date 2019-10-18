const user = {
  firstName: "John", // string
  lastName: "Doe", // string
  rate: 0.86, // number in range 0..1
  address: {
    // not empty object or null
    line1: "15 Macon St", // string
    line2: "", // string
    city: "Gotham" // string
  },
  phoneNumbers: [
    // array containing at least 1 element
    {
      type: "MOBILE", // string, limited to MOBILE | LINE | VOIP
      number: "(555) 555-1234" // string in specific format
    },
    {
      type: "LINE",
      number: "(555) 555-5678"
    }
  ]
};

function validateObject(user) {
  if (typeof user.firstName !== "string" || typeof user.lastName !== "string") {
    return false;
  }
  if (typeof user.rate !== "number" || (user.rate < 0 || user.rate > 1)) {
    return false;
  }
  if (!user.address) {
    return false;
  } else {
    for (key of Object.keys(user.address)) {
      if (typeof user.address[key] !== "string") {
        return false;
      }
    }
  }
  if (user.phoneNumbers.length < 1) {
    return false;
  } else {
    for (element of user.phoneNumbers) {
      if (typeof element.type !== "string") {
        return false;
      } else {
        const defs = ["MOBILE", "LINE", "VOIP"];
        const found = defs.find(function(elem) {
          return elem == element.type;
        });
        if (!found) {
          return false;
        }
      }
      if (typeof element.number !== "string") {
          return false;
      } else {
          if (!/^\(\d{3}\)\s\d{3}\-\d{4}$/.test(element.number)) {
            return false;
          }
      }
    }
  }
  return true;
}

if (validateObject(user)) {
  console.log("valid");
} else console.log("NOT valid");

// const Ajv = require("ajv");
// const ajv = new Ajv({ allErrors: true });

// const schema = {
//   required: ["firstName", "lastName", "rate", "address", "phoneNumbers"],
//   properties: {
//     firstName: { type: "string" },
//     lastName: { type: "string" },
//     rate: { type: "number", minimum: 0, maximum: 1 },
//     address: {
//       type: "object",
//       required: ["line1", "line2", "city"],
//       properties: {
//         line1: { type: "string" },
//         line2: { type: "string" },
//         city: { type: "string" }
//       }
//     },
//     phoneNumbers: {
//       type: "array",
//       minItems: 1,
//       items: {
//         type: "object",
//         properties: {
//           type: {
//             type: "string",
//             enum: ["MOBILE", "LINE", "VOIP"]
//           },
//           number: {
//               type: "string",
//               pattern: "^\\(\\d{3}\\)\\s\\d{3}\\-\\d{4}$"
//           }
//         }
//       }
//     }
//   }
// };
// const validate = ajv.compile(schema);

// validator(user);

// function validator(data) {
//   const valid = validate(data);
//   if (valid) {
//     console.log("Valid!");
//   } else console.log("Invalid: " + ajv.errorsText(validate.errors));
// }
