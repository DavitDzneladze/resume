import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule,} from "@nestjs/swagger";

import { AppModule } from "./App.module";

const start = async () => {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Resume Swagger")
    .setDescription("Rest API documentation")
    .setVersion("1.0.0")
    .addTag("Davit Dzneladze")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
