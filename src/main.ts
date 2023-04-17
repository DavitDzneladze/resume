import { NestFactory } from "@nestjs/core";

import { AppModule } from "./App.module";

const start = async () => {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
