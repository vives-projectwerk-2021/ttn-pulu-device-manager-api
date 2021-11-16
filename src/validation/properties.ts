export default {
  device_id: {
    type: "string",
    pattern: "^([a-z0-9]){24}$",
  },

  device_id_custom: {
    type: "string",
    pattern: "^[a-z0-9](?:[-]?[a-z0-9]){2,35}$",
  },

  name: {
    type: "string",
    pattern: "^[a-zA-Z0-9 _-]{0,50}$",
  },

  dev_eui: {
    type: "string",
    pattern: "^[A-F0-9]{16}",
  },

  app_eui: {
    type: "string",
    pattern: "^[A-F0-9]{16}",
  },

  app_key: {
    type: "string",
    pattern: "^[A-F0-9]{32}",
  },

  description: {
    type: "string",
    pattern: "^[a-zA-Z0-9 _-]{0,2000}$",
  },
};
