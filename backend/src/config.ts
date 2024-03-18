const CONFIG = Object.freeze({
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
});

function validateConfig() {
  Object.entries(CONFIG).forEach(([key, value]) => {
    if (value === undefined) {
      console.log(`Missing config: ${key}`);
      process.exit(0);
    }
  });
}

validateConfig();

export default CONFIG;
