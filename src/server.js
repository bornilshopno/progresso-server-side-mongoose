// server.js
import app from "./app.js";
import { connectDB } from "./config/mongoose.js";

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const bootstrap = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

bootstrap();
